import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './contexts/auth-context';
import { RecommendedCropsProvider } from './contexts/recommended_crops';
import ProtectedRoute from './components/protected-route';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import LocationPermissionPage from './pages/location-permission';
import DashboardPage from './pages/dashboard';
import CropRecommendationPage from './pages/crop-recommendation';
import SoilTestPage from './pages/soil-test';
import DiagnosisPage from './pages/diagnosis';
import VoiceAssistantPage from './pages/voice-assistant';
import GovernmentSchemesPage from './pages/government-schemes';

export default function App() {
  return (
    <AuthProvider>
      <RecommendedCropsProvider>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <ProtectedRoute
            path="/location-permission"
            component={LocationPermissionPage}
          />
          <ProtectedRoute path="/dashboard" component={DashboardPage} />
          <ProtectedRoute
            path="/crop-recommendation"
            component={CropRecommendationPage}
          />
          <ProtectedRoute path="/soil-test" component={SoilTestPage} />
          <ProtectedRoute path="/diagnosis" component={DiagnosisPage} />
          <ProtectedRoute
            path="/voice-assistant"
            component={VoiceAssistantPage}
          />
          <ProtectedRoute
            path="/government-schemes"
            component={GovernmentSchemesPage}
          />
          <Redirect to="/" />
        </Switch>
      </RecommendedCropsProvider>
    </AuthProvider>
  );
}
