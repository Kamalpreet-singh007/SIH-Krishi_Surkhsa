// import { Switch, Route, Redirect } from "react-router-dom";
// import { AuthProvider } from "./contexts/auth-context";
// import { RecommendedCropsProvider } from './contexts/recommended_crops';
import ProtectedRoute from "./components/protected-route";

// // Pages
// import LandingPage from "./pages/landing"; // ✅ new landing page
// import LoginPage from "./pages/login";
// import SignupPage from "./pages/signup";
// import LocationPermissionPage from "./pages/location-permission";
// import DashboardPage from "./pages/dashboard";
// import CropRecommendationPage from "./pages/crop-recommendation";
// import DetailedGuidePage from "./pages/DetailedGuidePage"; // ✅ new detailed guide page
// import SoilTestPage from "./pages/soil-test";
// import DiagnosisPage from "./pages/diagnosis";
// import VoiceAssistantPage from "./pages/voice-assistant";
// import GovernmentSchemesPage from "./pages/government-schemes";
// import CommunityPage from "./pages/community"; // ✅ existing

// export default function App() {
//   return (
//     <AuthProvider>
//       <Switch>
//         {/* Public Routes */}
//         <Route exact path="/" component={LandingPage} /> {/* ✅ Landing first */}
//         <Route path="/login" component={LoginPage} />
//         <Route path="/signup" component={SignupPage} />

//         {/* Protected Routes */}
//         <ProtectedRoute
//           path="/location-permission"
//           component={LocationPermissionPage}
//         />
//         <ProtectedRoute path="/dashboard" component={DashboardPage} />
//         <ProtectedRoute
//           path="/crop-recommendation"
//           component={CropRecommendationPage}
//         />
//         <ProtectedRoute
//           path="/detailed-guide"
//           component={DetailedGuidePage}
//         />
//         <ProtectedRoute path="/soil-test" component={SoilTestPage} />
//         <ProtectedRoute path="/diagnosis" component={DiagnosisPage} />
//         <ProtectedRoute
//           path="/voice-assistant"
//           component={VoiceAssistantPage}
//         />
//         <ProtectedRoute
//           path="/government-schemes"
//           component={GovernmentSchemesPage}
//         />
//         <ProtectedRoute path="/community" component={CommunityPage} />

//         {/* Fallback */}
//         <Redirect to="/" />
//       </Switch>
//     </AuthProvider>
//   );
// }
import React from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/auth-context";

// Pages
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import LocationPermissionPage from "./pages/location-permission";
import DashboardPage from "./pages/dashboard";
import CropRecommendationPage from "./pages/crop-recommendation";
import DetailedGuidePage from "./pages/DetailedGuidePage";
import SoilTestPage from "./pages/soil-test";
import DiagnosisPage from "./pages/diagnosis";
import VoiceAssistantPage from "./pages/voice-assistant";
import GovernmentSchemesPage from "./pages/government-schemes";
import CommunityPage from "./pages/community";

// Protected Route
const ProtectedRoute: React.FC<RouteProps & { component: React.ComponentType<any> }> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <RecommendedCropsProvider>
        <Switch>
          {/* Public Routes */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
  
        {/* Protected Routes */}
        <ProtectedRoute
            path="/location-permission"
            component={LocationPermissionPage}
          />
          <ProtectedRoute path="/dashboard" component={DashboardPage} />
          <ProtectedRoute
            path="/crop-recommendation"
            component={CropRecommendationPage}
          />
          <ProtectedRoute
          path="/detailed-guide"
          component={DetailedGuidePage}
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
          <ProtectedRoute path="/community" component={CommunityPage} />

        {/* Fallback */}
        <Redirect to="/" />
        </Switch>
      </RecommendedCropsProvider>
    </AuthProvider>
  );
}
