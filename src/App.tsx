import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { HabitCard } from './components/HabitCard';
import { NewHabitForm } from './components/NewHabitForm';
import type { Habit } from './types';

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#8B5CF6', // purple
  '#F59E0B', // yellow
  '#EF4444', // red
];

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, goal: number, unit: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      goal,
      unit,
      progress: 0,
      color: COLORS[habits.length % COLORS.length],
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id: string, progress: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, progress } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Habit Tracker</h1>
          </div>
          <p className="text-gray-600">Track your daily habits and achieve your goals</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="grid gap-4">
              {habits.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-6 text-center text-gray-500">
                  No habits yet. Add your first habit to get started!
                </div>
              ) : (
                habits.map(habit => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onUpdate={updateHabit}
                    onDelete={deleteHabit}
                  />
                ))
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <NewHabitForm onAdd={addHabit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;