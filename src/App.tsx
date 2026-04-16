import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomeScreen } from '@/screens/auth/Welcome';
import { SignUpScreen } from '@/screens/auth/SignUp';
import { VerificationScreen } from '@/screens/auth/Verification';
import { LoginScreen } from '@/screens/auth/Login';
import { WarningScreen } from '@/screens/onboarding/Warning';
import { CameraScreen } from '@/screens/onboarding/Camera';
import { MedsScreen } from '@/screens/onboarding/Meds';
import { DoubtsScreen } from '@/screens/onboarding/Doubts';
import { ProfileSelectionScreen } from '@/screens/onboarding/ProfileSelection';
import { HealthProfileIntroScreen } from '@/screens/onboarding/HealthProfileIntro';
import { PersonalDataScreen } from '@/screens/onboarding/PersonalData';
import { MedicationScreen } from '@/screens/onboarding/Medication';
import { AllergiesScreen } from '@/screens/onboarding/Allergies';
import { ConditionsScreen } from '@/screens/onboarding/Conditions';
import { LifestyleScreen } from '@/screens/onboarding/Lifestyle';
import { SummaryScreen } from '@/screens/onboarding/Summary';
import { HomeScreen } from '@/screens/home/Home';
import { CameraPermissionScreen } from '@/screens/scan/CameraPermission';
import { ScanScreen } from '@/screens/scan/Scan';
import { IdentifyScreen } from '@/screens/scan/Identify';
import { MedInfoScreen } from '@/screens/chat/MedInfo';
import { VoiceScreen } from '@/screens/chat/Voice';
import { SearchScreen } from '@/screens/search/Search';
import { ProfileScreen } from '@/screens/profile/Profile';
import { GuestHomeScreen } from '@/screens/home/GuestHome';
import { AuthOverlay } from '@/components/overlays/AuthOverlay';
import { OnboardingProvider } from '@/context/OnboardingContext';

export default function App() {
  return (
    <HashRouter>
      <OnboardingProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route
          path="/sign-up"
          element={
            <WelcomeScreen>
              <AuthOverlay title="Criar conta na MedaBot" emailRoute="/sign-up/email" />
            </WelcomeScreen>
          }
        />
        <Route
          path="/login"
          element={
            <WelcomeScreen>
              <AuthOverlay title="Iniciar sessão na MedaBot" emailRoute="/login/email" socialRoute="/home" socialState={{ from: 'login' }} />
            </WelcomeScreen>
          }
        />
        {/* Placeholder routes — implementadas nas fases seguintes */}
        <Route path="/sign-up/email" element={<SignUpScreen />} />
        <Route
          path="/sign-up/verification"
          element={<VerificationScreen origin="signup" nextRoute="/onboarding" />}
        />
        <Route path="/onboarding" element={<WarningScreen />} />
        <Route path="/onboarding/camera" element={<CameraScreen />} />
        <Route path="/onboarding/meds" element={<MedsScreen />} />
        <Route path="/onboarding/doubts" element={<DoubtsScreen />} />
        <Route path="/onboarding/profile-selection" element={<ProfileSelectionScreen />} />
        <Route path="/onboarding/profile-intro" element={<HealthProfileIntroScreen />} />
        <Route path="/onboarding/medication" element={<MedicationScreen />} />
        <Route path="/onboarding/profile-form" element={<PersonalDataScreen />} />
        <Route path="/onboarding/allergies" element={<AllergiesScreen />} />
        <Route path="/onboarding/conditions" element={<ConditionsScreen />} />
        <Route path="/onboarding/lifestyle" element={<LifestyleScreen />} />
        <Route path="/onboarding/summary" element={<SummaryScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/camera-permission" element={<CameraPermissionScreen />} />
        <Route path="/scan" element={<ScanScreen />} />
        <Route path="/identify" element={<IdentifyScreen />} />
        <Route path="/med-info" element={<MedInfoScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/voice" element={<VoiceScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        {/* Add profile flow — reuses onboarding screens with profile routes */}
        <Route path="/profile/personal-data" element={<PersonalDataScreen showName nextRoute="/profile/medication" />} />
        <Route path="/profile/medication" element={<MedicationScreen nextRoute="/profile/allergies" />} />
        <Route path="/profile/allergies" element={<AllergiesScreen nextRoute="/profile/conditions" />} />
        <Route path="/profile/conditions" element={<ConditionsScreen nextRoute="/profile/lifestyle" />} />
        <Route path="/profile/lifestyle" element={<LifestyleScreen nextRoute="/profile/summary" />} />
        <Route path="/profile/summary" element={<SummaryScreen doneRoute="/home" />} />
        <Route path="/login/email" element={<LoginScreen />} />
        <Route
          path="/login/verification"
          element={<VerificationScreen origin="login" nextRoute="/home" />}
        />
        <Route path="/guest" element={<GuestHomeScreen />} />
        <Route
          path="/guest/sign-up"
          element={
            <GuestHomeScreen>
              <AuthOverlay title="Criar conta na MedaBot" emailRoute="/sign-up/email" dismissRoute="/guest" />
            </GuestHomeScreen>
          }
        />
      </Routes>
      </OnboardingProvider>
    </HashRouter>
  );
}
