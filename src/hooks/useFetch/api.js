import { create } from "apisauce";
import Qs from "qs";
import apiConfig, { COOKIE_AUTH_TOKEN } from "@/config/apiConfig";
import { getCookie } from "@/utils/cookies";

export const api = create({
  ...apiConfig,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export const signInApi = () => {
  if (!api.headers.Accesstoken) {
    const Accesstoken = getCookie(COOKIE_AUTH_TOKEN);
    api.setHeaders({
      Accesstoken,
    });
  }
};

export const signOutApi = () => {
  if (api.headers.Accesstoken) {
    api.setHeaders({
      Accesstoken: "",
    });
  }
};
