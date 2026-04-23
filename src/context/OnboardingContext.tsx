import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import type { MedDraft } from '@/components/overlays/AddMedOverlay';
import avatarMaleA from '@/assets/avatar-male-a.svg';
import avatarMaleB from '@/assets/avatar-male-b.svg';
import avatarFemaleA from '@/assets/avatar-female-a.svg';
import avatarFemaleB from '@/assets/avatar-female-b.svg';
import avatarFemaleC from '@/assets/avatar-female-c.svg';

const MALE_AVATARS = [avatarMaleA, avatarMaleB];
const FEMALE_AVATARS = [avatarFemaleA, avatarFemaleB, avatarFemaleC];

export interface OnboardingData {
  /* 5.9 Medication */
  meds: MedDraft[];
  /* 5.7 Personal Data */
  name: string;
  age: string;
  weight: string;
  height: string;
  sex: 'M' | 'F' | 'I';
  /* 5.11 Allergies */
  allergies: string[];
  /* 5.12 Conditions */
  conditions: string[];
  /* 5.13 Lifestyle */
  alcohol: string;
  tobacco: string;
  activity: string;
  supplements: string;
}

/** Empty profile for new profile creation */
const EMPTY: OnboardingData = {
  meds: [],
  name: '',
  age: '',
  weight: '',
  height: '',
  sex: 'M',
  allergies: [],
  conditions: [],
  alcohol: '',
  tobacco: '',
  activity: '',
  supplements: '',
};

/** Bruno's pre-filled data (simulates existing account) */
const INITIAL: OnboardingData = {
  meds: [
    { name: 'Atenolol 50mg', dosage: '50mg', frequency: '1x/dia' },
    { name: 'Sinvastatina 20mg', dosage: '20mg', frequency: '1x/dia' },
  ],
  name: 'Bruno',
  age: '32',
  weight: '78',
  height: '180',
  sex: 'M',
  allergies: ['Penicilina'],
  conditions: ['Hipertensão', 'Doença Hepática Grave'],
  alcohol: 'Ocasional',
  tobacco: 'Não fumo',
  activity: 'Moderado',
  supplements: 'Vitamina D',
};

export interface RecentMed {
  name: string;
  subtitle: string;
  date: string;
}

export interface SavedProfile {
  name: string;
  sex: 'M' | 'F' | 'I';
  avatarSrc: string;
  data: OnboardingData;
  recentMeds: RecentMed[];
}

type Ctx = {
  data: OnboardingData;
  update: (partial: Partial<OnboardingData>) => void;
  /** Save current active profile into the inactive list, then reset data for a new profile */
  shelveAndReset: () => void;
  /** Start adding a new profile: snapshot current state, clear data for new entry */
  startNewProfile: () => void;
  /** Cancel new profile creation: restore the snapshot taken by startNewProfile */
  cancelNewProfile: () => void;
  savedProfiles: SavedProfile[];
  loadProfile: (index: number) => void;
  cameraPermitted: boolean;
  grantCamera: () => void;
  recentMeds: RecentMed[];
  addRecentMed: (med: RecentMed) => void;
  seedRecentMeds: (meds: RecentMed[]) => void;
  avatarSrc: string | null;
  setAvatarSrc: (src: string) => void;
};

const OnboardingCtx = createContext<Ctx>({
  data: EMPTY,
  update: () => {},
  shelveAndReset: () => {},
  startNewProfile: () => {},
  cancelNewProfile: () => {},
  savedProfiles: [],
  loadProfile: () => {},
  cameraPermitted: false,
  grantCamera: () => {},
  recentMeds: [],
  addRecentMed: () => {},
  seedRecentMeds: () => {},
  avatarSrc: null,
  setAvatarSrc: () => {},
});

const ALL_AVATARS = [...MALE_AVATARS, ...FEMALE_AVATARS];

export function pickAvatar(sex: 'M' | 'F' | 'I', usedAvatars: string[] = []): string {
  const preferred = sex === 'F' ? FEMALE_AVATARS : MALE_AVATARS;
  const available = preferred.filter((a) => !usedAvatars.includes(a));
  if (available.length > 0) return available[Math.floor(Math.random() * available.length)];
  // Fallback: pick from all avatars not yet used
  const anyAvailable = ALL_AVATARS.filter((a) => !usedAvatars.includes(a));
  if (anyAvailable.length > 0) return anyAvailable[Math.floor(Math.random() * anyAvailable.length)];
  // All used — pick random from preferred
  return preferred[Math.floor(Math.random() * preferred.length)];
}

/** Bruno's full profile — used to seed data on login flow */
export const BRUNO_PROFILE = INITIAL;

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(EMPTY);
  const [cameraPermitted, setCameraPermitted] = useState(false);
  const [recentMeds, setRecentMeds] = useState<RecentMed[]>([]);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const snapshotRef = useRef<{ data: OnboardingData; avatar: string | null; recents: RecentMed[] } | null>(null);
  const dataRef = useRef(data);
  dataRef.current = data;
  const avatarRef = useRef(avatarSrc);
  avatarRef.current = avatarSrc;
  const recentMedsRef = useRef(recentMeds);
  recentMedsRef.current = recentMeds;
  const savedProfilesRef = useRef(savedProfiles);
  savedProfilesRef.current = savedProfiles;
  const update = (partial: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...partial }));
  /** Confirm new profile: archive the snapshot (previous profile) into savedProfiles */
  const shelveAndReset = useCallback(() => {
    const snap = snapshotRef.current;
    if (!snap) return;
    const usedAvatars = savedProfilesRef.current.map((p) => p.avatarSrc);
    const snapAvatar = snap.avatar || pickAvatar(snap.data.sex, usedAvatars);
    const label = snap.data.name || 'Principal';
    setSavedProfiles((prev) => {
      if (prev.some((p) => p.name === label)) return prev;
      return [...prev, {
        name: label,
        sex: snap.data.sex,
        avatarSrc: snapAvatar,
        data: { ...snap.data },
        recentMeds: [...snap.recents],
      }];
    });
    snapshotRef.current = null;
  }, []);
  const startNewProfile = useCallback(() => {
    snapshotRef.current = {
      data: { ...dataRef.current },
      avatar: avatarRef.current,
      recents: [...recentMedsRef.current],
    };
    setData(EMPTY);
    setAvatarSrc(null);
    setRecentMeds([]);
  }, []);
  const cancelNewProfile = useCallback(() => {
    if (!snapshotRef.current) return;
    setData(snapshotRef.current.data);
    setAvatarSrc(snapshotRef.current.avatar);
    setRecentMeds(snapshotRef.current.recents);
    snapshotRef.current = null;
  }, []);
  const loadProfile = useCallback((index: number) => {
    const cur = dataRef.current;
    const usedAvatars = savedProfilesRef.current.map((p) => p.avatarSrc);
    const curAvatar = avatarRef.current || pickAvatar(cur.sex, usedAvatars);
    const curRecents = recentMedsRef.current;
    const target = savedProfilesRef.current[index];
    if (!target) return;
    // Swap in-place: replace target slot with current profile, keep order stable
    const currentEntry: SavedProfile = {
      name: cur.name || 'Principal',
      sex: cur.sex,
      avatarSrc: curAvatar,
      data: { ...cur },
      recentMeds: [...curRecents],
    };
    setSavedProfiles(savedProfilesRef.current.map((p, i) => i === index ? currentEntry : p));
    setData(target.data);
    setAvatarSrc(target.avatarSrc);
    setRecentMeds(target.recentMeds);
  }, []);
  const grantCamera = () => setCameraPermitted(true);
  const addRecentMed = (med: RecentMed) =>
    setRecentMeds((prev) => {
      const filtered = prev.filter((m) => m.name !== med.name);
      return [med, ...filtered];
    });
  const seedRecentMeds = (meds: RecentMed[]) =>
    setRecentMeds(meds);
  return (
    <OnboardingCtx.Provider value={{ data, update, shelveAndReset, startNewProfile, cancelNewProfile, savedProfiles, loadProfile, cameraPermitted, grantCamera, recentMeds, addRecentMed, seedRecentMeds, avatarSrc, setAvatarSrc }}>
      {children}
    </OnboardingCtx.Provider>
  );
}

export function useOnboarding() {
  return useContext(OnboardingCtx);
}
