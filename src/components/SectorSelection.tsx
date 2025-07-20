import React from 'react';
import { Code, Palette } from 'lucide-react';

interface SectorSelectionProps {
  onSectorSelect: (sector: 'IT' | 'Other') => void;
}

export const SectorSelection: React.FC<SectorSelectionProps> = ({ onSectorSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI Resume Builder
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            You are building an AI resume for which field?
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onSectorSelect('IT')}
            className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Code size={24} className="mr-3" />
            <span className="text-lg font-semibold">IT Sector</span>
          </button>
          
          <button
            onClick={() => onSectorSelect('Other')}
            className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Palette size={24} className="mr-3" />
            <span className="text-lg font-semibold">Other Sector</span>
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Choose your field to get tailored AI suggestions
          </p>
        </div>
      </div>
    </div>
  );
};