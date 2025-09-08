// import React from "react";
// import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Button,
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Avatar,
// } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { useAuth } from "../contexts/auth-context";

// interface AppLayoutProps {
//   children: React.ReactNode;
//   hideNavbar?: boolean;
//   hideFooter?: boolean;
// }

// const AppLayout: React.FC<AppLayoutProps> = ({
//   children,
//   hideNavbar = false,
//   hideFooter = false,
// }) => {
//   const { user, logout } = useAuth();
//   const history = useHistory();
//   const location = useLocation();

//   const isActive = (path: string) => location.pathname === path;

//   const handleLogout = () => {
//     logout();
//     history.push("/"); // redirect to landing
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-green-50">
//       {!hideNavbar && (
//         <Navbar maxWidth="2xl" className="border-b border-divider bg-white/70 backdrop-blur">
//           <NavbarBrand>
//             <RouterLink to="/" className="flex items-center gap-2 text-primary">
//               <Icon icon="lucide:leaf" width={24} height={24} />
//               <p className="font-semibold text-inherit">KrishiSuraksha</p>
//             </RouterLink>
//           </NavbarBrand>

//           <NavbarContent className="hidden sm:flex gap-4" justify="center">
//             {user && (
//               <>
//                 <NavbarItem isActive={isActive("/dashboard")}>
//                   <RouterLink
//                     to="/dashboard"
//                     className={isActive("/dashboard") ? "text-primary font-semibold" : "text-foreground"}
//                   >
//                     Dashboard
//                   </RouterLink>
//                 </NavbarItem>
//                 <NavbarItem isActive={isActive("/crop-recommendation")}>
//                   <RouterLink
//                     to="/crop-recommendation"
//                     className={isActive("/crop-recommendation") ? "text-primary font-semibold" : "text-foreground"}
//                   >
//                     Crop Recommendation
//                   </RouterLink>
//                 </NavbarItem>
//                 <NavbarItem isActive={isActive("/diagnosis")}>
//                   <RouterLink
//                     to="/diagnosis"
//                     className={isActive("/diagnosis") ? "text-primary font-semibold" : "text-foreground"}
//                   >
//                     Diagnosis
//                   </RouterLink>
//                 </NavbarItem>
//                 <NavbarItem isActive={isActive("/voice-assistant")}>
//                   <RouterLink
//                     to="/voice-assistant"
//                     className={isActive("/voice-assistant") ? "text-primary font-semibold" : "text-foreground"}
//                   >
//                     Voice Assistant
//                   </RouterLink>
//                 </NavbarItem>
//                 <NavbarItem isActive={isActive("/government-schemes")}>
//                   <RouterLink
//                     to="/government-schemes"
//                     className={isActive("/government-schemes") ? "text-primary font-semibold" : "text-foreground"}
//                   >
//                     Govt. Schemes
//                   </RouterLink>
//                 </NavbarItem>
//                 <NavbarItem isActive={isActive("/community")}>
//                   <RouterLink
//                     to="/community"
//                     className={isActive("/community") ? "text-primary font-semibold" : "text-foreground"}
//                   >
//                     Community
//                   </RouterLink>
//                 </NavbarItem>
//               </>
//             )}
//           </NavbarContent>

//           <NavbarContent justify="end">
//             {!user && location.pathname === "/dashboard" ? (
//               <div className="flex gap-2">
//                 <Button size="sm" variant="flat" onPress={() => history.push("/login")}>
//                   Login
//                 </Button>
//                 <Button size="sm" color="primary" onPress={() => history.push("/signup")}>
//                   Sign Up
//                 </Button>
//               </div>
//             ) : user ? (
//               <Dropdown placement="bottom-end">
//                 <DropdownTrigger>
//                   <Avatar
//                     as="button"
//                     className="transition-transform"
//                     name={user?.name || "User"}
//                     size="sm"
//                   />
//                 </DropdownTrigger>
//                 <DropdownMenu aria-label="Profile Actions" variant="flat">
//                   <DropdownItem key="profile" className="h-14 gap-2">
//                     <p className="font-semibold">Signed in as</p>
//                     <p className="font-semibold">{user?.email}</p>
//                   </DropdownItem>
//                   <DropdownItem key="settings">My Profile</DropdownItem>
//                   <DropdownItem key="soil_test" href="/soil-test">
//                     Soil Test Report
//                   </DropdownItem>
//                   <DropdownItem key="logout" color="danger" onPress={handleLogout}>
//                     Log Out
//                   </DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
//             ) : null}
//           </NavbarContent>
//         </Navbar>
//       )}

//       <main className="flex-grow">{children}</main>

//       {!hideFooter && (
//         <footer className="py-4 px-6 border-t border-divider bg-white/70 backdrop-blur">
//           <div className="max-w-7xl mx-auto text-center text-default-500 text-sm">
//             &copy; {new Date().getFullYear()} SmartCrop - Smart Agriculture Advisory
//           </div>
//         </footer>
//       )}
//     </div>
//   );
// };

// export default AppLayout;

import React from "react";
import { useHistory, useLocation, Link as RouterLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/auth-context";

interface AppLayoutProps {
  children: React.ReactNode;
  hideNavbar?: boolean;
  hideFooter?: boolean;
  showLoginSignup?: boolean; // Landing page or forced login
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  hideNavbar = false,
  hideFooter = false,
  showLoginSignup = false,
}) => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    history.push("/"); // redirect to landing
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-green-50">
      {!hideNavbar && (
        <Navbar maxWidth="2xl" className="border-b border-divider bg-white/70 backdrop-blur">
          <NavbarBrand>
            <RouterLink to="/" className="flex items-center gap-2 text-primary">
              <Icon icon="lucide:leaf" width={24} height={24} />
              <p className="font-semibold text-inherit">KrishiSuraksha</p>
            </RouterLink>
          </NavbarBrand>

          {/* Center menu links */}
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {user && !showLoginSignup && (
              <>
                <NavbarItem isActive={isActive("/dashboard")}>
                  <RouterLink
                    to="/dashboard"
                    className={isActive("/dashboard") ? "text-primary font-semibold" : "text-foreground"}
                  >
                    Dashboard
                  </RouterLink>
                </NavbarItem>
                <NavbarItem isActive={isActive("/crop-recommendation")}>
                  <RouterLink
                    to="/crop-recommendation"
                    className={isActive("/crop-recommendation") ? "text-primary font-semibold" : "text-foreground"}
                  >
                    Crop Recommendation
                  </RouterLink>
                </NavbarItem>
                <NavbarItem isActive={isActive("/diagnosis")}>
                  <RouterLink
                    to="/diagnosis"
                    className={isActive("/diagnosis") ? "text-primary font-semibold" : "text-foreground"}
                  >
                    Diagnosis
                  </RouterLink>
                </NavbarItem>
                <NavbarItem isActive={isActive("/voice-assistant")}>
                  <RouterLink
                    to="/voice-assistant"
                    className={isActive("/voice-assistant") ? "text-primary font-semibold" : "text-foreground"}
                  >
                    Voice Assistant
                  </RouterLink>
                </NavbarItem>
                <NavbarItem isActive={isActive("/government-schemes")}>
                  <RouterLink
                    to="/government-schemes"
                    className={isActive("/government-schemes") ? "text-primary font-semibold" : "text-foreground"}
                  >
                    Govt. Schemes
                  </RouterLink>
                </NavbarItem>
                <NavbarItem isActive={isActive("/community")}>
                  <RouterLink
                    to="/community"
                    className={isActive("/community") ? "text-primary font-semibold" : "text-foreground"}
                  >
                    Community
                  </RouterLink>
                </NavbarItem>
              </>
            )}
          </NavbarContent>

          {/* Right navbar buttons */}
          <NavbarContent justify="end">
            {!user || showLoginSignup ? (
              <div className="flex gap-2">
                <Button size="sm" variant="flat" onPress={() => history.push("/login")}>
                  Login
                </Button>
                <Button size="sm" color="primary" onPress={() => history.push("/signup")}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    className="transition-transform"
                    name={user?.name || "User"}
                    size="sm"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Profile</DropdownItem>
                  <DropdownItem key="soil_test" href="/soil-test">
                    Soil Test Report
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </NavbarContent>
        </Navbar>
      )}

      <main className="flex-grow">{children}</main>

      {!hideFooter && (
        <footer className="py-4 px-6 border-t border-divider bg-white/70 backdrop-blur">
          <div className="max-w-7xl mx-auto text-center text-default-500 text-sm">
            &copy; {new Date().getFullYear()} © 2025 KrishiSuraksha - Smart Agriculture Advisory | Team HarvestIQ

          </div>
        </footer>
      )}
    </div>
  );
};

export default AppLayout;
