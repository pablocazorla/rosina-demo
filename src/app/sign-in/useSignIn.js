"use client";
import { useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";
import { COOKIE_AUTH_TOKEN, DAYS_EXPIRE_TOKEN } from "@/config/apiConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/utils/cookies";
import { PRIVATE_ROUTES } from "@/config/routes";
import { signInApi } from "@/hooks/useFetch/api";

const useSignIn = () => {
  const updateStore = useStore((state) => state.updateStore);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const afterLoad = useCallback(
    (data) => {
      const { access_token, user } = data;

      updateStore({
        user,
      });
      setCookie(COOKIE_AUTH_TOKEN, access_token, DAYS_EXPIRE_TOKEN);
      signInApi();
      router.push(redirectUrl || PRIVATE_ROUTES.DEFAULT.path);
    },
    [updateStore, router, redirectUrl]
  );

  const [login, , loading, error] = useFetch({
    method: "POST",
    endpoint: "LOGIN",
    afterLoad,
  });

  const onSubmit = useCallback(
    (params) => {
      login({
        params,
      });
    },
    [login]
  );

  return {
    validations: {
      username: ["required"],
      password: ["required"],
    },
    onSubmit,
    loading,
    error,
  };
};

export default useSignIn;
