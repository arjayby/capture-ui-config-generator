import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreType = {
  preview: boolean;
};

type StoreActionType = {
  invertPreview: () => void;
};

type AppStoreType = StoreType & StoreActionType;

const useAppStore = create<AppStoreType>()(
  persist(
    (set) => ({
      preview: true,
      invertPreview: () => set((state) => ({ preview: !state.preview })),
    }),
    { name: "app-store" }
  )
);

export default useAppStore;
