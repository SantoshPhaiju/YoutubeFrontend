import { devtools, persist } from "zustand/middleware";
import { create } from "zustand/react";

export type User = {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  coverImage?: string;
};

export type UserState = {
  user: User | null;
};

type UserActions = {
  setUser: (user: User) => void;
  deleteUser: () => void;
};

type UserStore = UserState & UserActions;

const userStore = (set: (fn: Partial<UserStore>) => void): UserStore => ({
  user: null,
  setUser: (user: User) => {
    return set({ user });
  },
  deleteUser: () => {
    return set({ user: null });
  },
});

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: "user-storage",
    }),
  ),
);

export default useUserStore;
