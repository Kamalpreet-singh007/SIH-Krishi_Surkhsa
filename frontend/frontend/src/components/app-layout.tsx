import React from 'react';
import { useHistory, useLocation, Link as RouterLink } from 'react-router-dom';
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
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="2xl" className="border-b border-divider">
        <NavbarBrand>
          <RouterLink
            to="/dashboard"
            className="flex items-center gap-2 text-primary"
          >
            <Icon icon="lucide:leaf" width={24} height={24} />
            <p className="font-semibold text-inherit">KrishiSuraksha</p>
          </RouterLink>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={isActive('/dashboard')}>
            <RouterLink
              color={isActive('/dashboard') ? 'primary' : 'foreground'}
              to="/dashboard"
            >
              Home
            </RouterLink>
          </NavbarItem>
          <NavbarItem isActive={isActive('/crop-recommendation')}>
            <RouterLink
              color={
                isActive('/crop-recommendation') ? 'primary' : 'foreground'
              }
              to="/crop-recommendation"
            >
              Crop Recommendation
            </RouterLink>
          </NavbarItem>
          <NavbarItem isActive={isActive('/diagnosis')}>
            <RouterLink
              color={isActive('/diagnosis') ? 'primary' : 'foreground'}
              to="/diagnosis"
            >
              Diagnosis
            </RouterLink>
          </NavbarItem>
          <NavbarItem isActive={isActive('/voice-assistant')}>
            <RouterLink
              color={isActive('/voice-assistant') ? 'primary' : 'foreground'}
              to="/voice-assistant"
            >
              Voice Assistant
            </RouterLink>
          </NavbarItem>
          <NavbarItem isActive={isActive('/government-schemes')}>
            <RouterLink
              color={isActive('/government-schemes') ? 'primary' : 'foreground'}
              to="/government-schemes"
            >
              Govt. Schemes
            </RouterLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                name={user?.name || 'User'}
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
        </NavbarContent>
      </Navbar>

      <main className="flex-grow">{children}</main>

      <footer className="py-4 px-6 border-t border-divider">
        <div className="max-w-7xl mx-auto text-center text-default-500 text-sm">
          &copy; {new Date().getFullYear()} KrishiSuraksha - Smart Agriculture
          Advisory
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
