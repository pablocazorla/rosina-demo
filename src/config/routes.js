export const PUBLIC_ROUTES = {
  DEFAULT: {
    title: "signIn",
    path: "/sign-in",
  },
  SIGN_IN: {
    title: "signIn",
    path: "/sign-in",
  },
};

const privateRoot = "/team";

export const PRIVATE_ROUTES = {
  DEFAULT: {
    title: "turns",
    path: privateRoot,
  },
  HOME: {
    title: "turns",
    path: privateRoot,
  },
  // SIGN_IN_MATHTRADE: {
  //   title: "signInMathtrade",
  //   path: "/sign-in-mathtrade",
  // },
  CLIENTS: {
    title: "clients",
    path: privateRoot + "/clients",
  },
  SERVICES_PRODUCTS: {
    title: "services_products",
    path: privateRoot + "/services-products",
  },
  CHARGES: {
    title: "charges",
    path: privateRoot + "/charges",
  },
};
