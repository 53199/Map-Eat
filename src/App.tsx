import { useState } from 'react';
import Map from './components/Map';
import Filters from './components/Filters';
import { restaurants } from './data/restaurants';
import { Category } from './types/restaurant';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [showHalalOnly, setShowHalalOnly] = useState(false);
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-500 rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Brussels Restaurant Finder
            </h1>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 flex overflow-hidden">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-96 p-6 overflow-y-auto"
        >
          <Filters
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            showHalalOnly={showHalalOnly}
            setShowHalalOnly={setShowHalalOnly}
            showOpenOnly={showOpenOnly}
            setShowOpenOnly={setShowOpenOnly}
          />
        </motion.div>
        <div className="flex-1 relative">
          <Map
            restaurants={restaurants}
            selectedCategories={selectedCategories}
            showHalalOnly={showHalalOnly}
            showOpenOnly={showOpenOnly}
          />
        </div>
      </main>
    </div>
  );
}