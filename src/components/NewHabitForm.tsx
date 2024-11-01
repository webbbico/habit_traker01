import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle } from 'lucide-react';

interface NewHabitFormProps {
  onAdd: (name: string, goal: number, unit: string) => void;
}

export function NewHabitForm({ onAdd }: NewHabitFormProps) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('1');
  const [unit, setUnit] = useState('times');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && goal) {
      onAdd(name, Number(goal), unit);
      setName('');
      setGoal('1');
      setUnit('times');
      nameInputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Habit</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Habit Name
          </label>
          <input
            ref={nameInputRef}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Read Books"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">
              Daily Goal
            </label>
            <input
              type="number"
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
          
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="times">times</option>
              <option value="minutes">minutes</option>
              <option value="hours">hours</option>
              <option value="pages">pages</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          <PlusCircle size={20} />
          Add Habit
        </button>
      </div>
    </form>
  );
}