import { create } from "zustand";

interface UserState {
  user: any;
  setUser: (user: any) => void;
  removeUser: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export { useUserStore };
