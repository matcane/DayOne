import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { create } from "zustand";

export type TUser = {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  errorData: string;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  clearError: () => void;
};

const initialState = {
  user: null,
  isLoading: false,
  errorData: "",
};

const useAuthStore = create<TUser>((set) => ({
  ...initialState,
  signUp: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      set({ isLoading: false });
    } catch (e: any) {
      const err = e as FirebaseError;
      set({ errorData: err.code });
      set({ isLoading: false });
      console.log(err);
    }
  },
  signIn: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      await auth().signInWithEmailAndPassword(email, password);
      set({ isLoading: false });
    } catch (e: any) {
      const err = e as FirebaseError;
      set({ errorData: err.code });
      set({ isLoading: false });
      console.log(err);
    }
  },
  clearError: () => {
    set({ errorData: "" });
  },
}));

export default useAuthStore;
