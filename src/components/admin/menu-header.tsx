import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';

import { navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { useLogout } from '@/hooks/auth/useLogout';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { useState } from 'react';
import { LoadingSpinner } from './loading-spinner';
import { useLoading } from './is-loading';

export default function MenuHeader() {
  const { logout } = useLogout();
  const { isLoading, setIsLoading } = useLoading();

  const handleLinkClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="shadow-lg border-b-1 py-2 border-gray-200 fixed w-full">
      <div className="container mx-auto px-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex">
            <NavigationMenuItem className="mr-10">
              <Link
                href="/admin/home"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={''}
                  onClick={handleLinkClick}
                >
                  <div className="py-1.5 relative flex items-center text-lg font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-6 w-6"
                    >
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    SmartCondo
                  </div>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/admin/condominium"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Condominio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/admin/ambient"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Ambientes
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/admin/cleanup"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Limpeza
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/admin/project"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Projetos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/admin/maintenance"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Manutenções
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="mx-1">
              <Link
                href="/admin/user"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  onClick={handleLinkClick}
                >
                  Usuários
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <NavigationMenuItem className="ml-auto">
                <ModeToggle />
              </NavigationMenuItem>
              <NavigationMenuItem
                className="ml-auto"
                onClick={handleLinkClick}
              >
                <Link
                  href="/auth/login"
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    onClick={() => {
                      logout();
                      console.log('foi');
                      window.location.href = '/auth/login';
                    }}
                  >
                    Sair
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <LoadingSpinner visible={isLoading} />
    </div>
  );
}
