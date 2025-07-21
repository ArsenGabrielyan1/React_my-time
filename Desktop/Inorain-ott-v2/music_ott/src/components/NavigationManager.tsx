import React, { ReactElement, useEffect } from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routing/routes";

interface NavigationManagerProps {
  children: ReactElement;
}

export function NavigationManager({ children }: NavigationManagerProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for navigation events from the shell
  useEffect(() => {
    const shellNavigationHandler = (event: Event) => {
      const pathname = (event as CustomEvent<string>).detail;

      // Prevent navigating to the same path
      if (location.pathname === pathname) {
        return;
      }

      // Check if the route exists
      const matchedRoutes = matchRoutes(routes, { pathname });
      if (!matchedRoutes) {
        return;
      }

      // Navigate to the new path
      navigate(pathname);
    };

    // Add the event listener
    window.addEventListener("[shell] navigated", shellNavigationHandler);

    // Clean up the event listener
    return () => {
      window.removeEventListener("[shell] navigated", shellNavigationHandler);
    };
  }, [location.pathname, navigate]);

  // Notify the shell about current navigation
  useEffect(() => {
    const eventDetail = location.pathname;
    window.dispatchEvent(
      new CustomEvent("[auth] navigated", { detail: eventDetail })
    );
  }, [location.pathname]);

  return children;
}
