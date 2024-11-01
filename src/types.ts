export interface Habit {
  id: string;
  name: string;
  goal: number;
  unit: string;
  progress: number;
  color: string;
}

export interface HabitProgress {
  date: string;
  value: number;
}