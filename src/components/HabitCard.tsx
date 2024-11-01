import React from 'react';
import { Target, Trash2 } from 'lucide-react';
import type { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onUpdate: (id: string, progress: number) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ habit, onUpdate, onDelete }: HabitCardProps) {
  const percentage = Math.min((habit.progress / habit.goal) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target size={16} />
            <span>{habit.goal} {habit.unit}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(habit.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mb-4">
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${percentage}%`,
              backgroundColor: habit.color,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">
          {habit.progress} / {habit.goal} {habit.unit}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate(habit.id, Math.max(0, habit.progress - 1))}
            className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            -
          </button>
          <button
            onClick={() => onUpdate(habit.id, habit.progress + 1)}
            className="px-2 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}