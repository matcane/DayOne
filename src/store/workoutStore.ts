import auth from "@react-native-firebase/auth";
import { create } from "zustand";

import { storage } from "@/MMKV";

import { TExercise } from "./exerciseStore";

export type TWorkout = {
  date: Date;
  exercises: TExercise[];
  addExercise: (exercise: TExercise) => void;
  updateDate: (newDate: Date) => void;
  deleteExercise: (id: number) => void;
  vipeData: () => void;
};

const currentUserUid = auth().currentUser?.uid;
const storageKey = currentUserUid + "exercises";

const jsonExercises = storage.getString(storageKey);
let ExercisesObject: TExercise[];

try {
  ExercisesObject = JSON.parse(jsonExercises!);
} catch {
  ExercisesObject = [];
}

const initialState = {
  date: new Date(),
  exercises: ExercisesObject,
};

const useWorkoutStore = create<TWorkout>((set) => ({
  ...initialState,
  addExercise: (exercise) => {
    set((state) => ({
      exercises: [...state.exercises, exercise],
    }));
    const exerciseList = useWorkoutStore.getState().exercises;
    storage.set(storageKey, JSON.stringify(exerciseList));
  },
  deleteExercise: (id) => {
    set((state) => ({
      exercises: state.exercises.filter((exercise) => exercise.id !== id),
    }));
    const exerciseList = useWorkoutStore.getState().exercises;
    storage.set(storageKey, JSON.stringify(exerciseList));
  },
  updateDate: (newDate: Date) => {
    set({ date: newDate });
  },
  vipeData: () => {
    storage.clearAll();
    set({ ...initialState });
  },
}));

export default useWorkoutStore;
