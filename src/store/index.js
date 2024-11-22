import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORE_DEFAULT = {
  data: {
    user: null,
  },
};

const STORAGE_NAME = "ROSINA_STORE";

export const useStore = create(
  persist(
    (set) => ({
      ...STORE_DEFAULT,
      updateStore: (data) =>
        set(() => {
          return { data };
        }),
      clearStore: () => set({ ...STORE_DEFAULT }),
    }),
    { name: STORAGE_NAME }
  )
);
