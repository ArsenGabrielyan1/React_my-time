import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./routing/router-factory";
import "./index.css";

 type RoutingStrategy = "memory" | "browser";

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
  storeState,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
  storeState?: Object|undefined;
}) => {
  const router = createRouter({
    strategy: routingStrategy,
    initialPathname,
  });

  const root = createRoot(mountPoint);
  root.render(<RouterProvider router={router} />);

  return () => root.unmount();
};

export { mount };
