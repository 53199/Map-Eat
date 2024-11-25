import { Category } from '../types/restaurant';
import { Filter, Search, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface FiltersProps {
  selectedCategories: Category[];
  setSelectedCategories: (categories: Category[]) => void;
  showHalalOnly: boolean;
  setShowHalalOnly: (show: boolean) => void;
  showOpenOnly: boolean;
  setShowOpenOnly: (show: boolean) => void;
}

export default function Filters({
  selectedCategories,
  setSelectedCategories,
  showHalalOnly,
  setShowHalalOnly,
  showOpenOnly,
  setShowOpenOnly,
}: FiltersProps) {
  const categories: Category[] = [
    'restaurant',
    'snack',
    'cafe',
    'fastfood',
    'pizzeria',
    'sushi',
    'burger',
    'asian',
    'mediterranean',
    'vegetarian',
    'bakery',
    'icecream'
  ];

  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 space-y-6"
    >
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <Filter className="w-5 h-5 text-primary-500" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search restaurants..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Categories</h3>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              isActive={selectedCategories.includes(category)}
              onClick={() => toggleCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Dietary Options</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showHalalOnly}
                onChange={(e) => setShowHalalOnly(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-6 w-6 border-2 border-gray-300 rounded transition-colors peer-checked:border-primary-500 peer-checked:bg-primary-500 group-hover:border-primary-400" />
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-700">Halal only</span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Opening Hours</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOpenOnly}
                onChange={(e) => setShowOpenOnly(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-6 w-6 border-2 border-gray-300 rounded transition-colors peer-checked:border-primary-500 peer-checked:bg-primary-500 group-hover:border-primary-400" />
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6L9 17l-5-5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Open now</span>
            </div>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Price Range</h3>
        <div className="flex gap-2">
          {['€', '€€', '€€€'].map((price) => (
            <Button
              key={price}
              variant="outline"
              size="sm"
              className="min-w-[60px]"
            >
              <DollarSign className="w-4 h-4 mr-1" />
              {price}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}