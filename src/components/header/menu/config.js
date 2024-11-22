import { PRIVATE_ROUTES } from "@/config/routes";

export const MenuList = [
  {
    title: `menu.${PRIVATE_ROUTES.HOME.title}`,
    path: PRIVATE_ROUTES.HOME.path,
    // disabled: true,
  },
  {
    title: `menu.${PRIVATE_ROUTES.CLIENTS.title}`,
    path: PRIVATE_ROUTES.CLIENTS.path,
    // disabled: true,
  },
  {
    title: `menu.${PRIVATE_ROUTES.SERVICES_PRODUCTS.title}`,
    path: PRIVATE_ROUTES.SERVICES_PRODUCTS.path,
    // disabled: true,
  },
  {
    title: `menu.${PRIVATE_ROUTES.CHARGES.title}`,
    path: PRIVATE_ROUTES.CHARGES.path,
    // disabled: true,
  },
];
