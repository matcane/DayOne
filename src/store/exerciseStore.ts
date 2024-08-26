import { create } from "zustand";

export type TSet = {
  id: number;
  reps: number;
  weight: number;
};

export type TExercise = {
  id: number;
  name: string;
  sets: TSet[];
};

type TExerciseStore = TExercise & {
  setExerciseName: (name: string) => void;
  addSet: () => void;
  deleteSet: () => void;
  updateSetReps: (id: number, newReps: number) => void;
  updateSetWeight: (id: number, newWeight: number) => void;
  vipeData: () => void;
};

const initialState = {
  id: 1,
  name: "",
  sets: [],
};

const useExerciseStore = create<TExerciseStore>((set) => ({
  ...initialState,
  setExerciseName: (newName) => {
    set({ name: newName });
  },
  addSet: () => {
    set((state) => ({
      sets: [...state.sets, { id: state.id, reps: 0, weight: 0 }],
      id: state.id + 1,
    }));
  },
  deleteSet: () => {
    set((state) => ({ sets: state.sets.slice(0, -1), id: state.id - 1 }));
  },
  updateSetReps: (id, newReps) => {
    set((state) => ({
      sets: state.sets.map((d) => (d.id === id ? { ...d, reps: newReps } : d)),
    }));
  },
  updateSetWeight: (id, newWeight) => {
    set((state) => ({
      sets: state.sets.map((d) => (d.id === id ? { ...d, weight: newWeight } : d)),
    }));
  },
  vipeData: () => {
    set({ ...initialState });
  },
}));

export default useExerciseStore;
