import { motion } from 'framer-motion';
import { Star, Euro, Clock } from 'lucide-react';
import { Restaurant } from '../types/restaurant';
import { format } from 'date-fns';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const isRestaurantOpen = () => {
    const now = new Date();
    const day = format(now, 'EEE').toLowerCase();
    const time = format(now, 'HH:mm');
    
    const hours = restaurant.openingHours[day];
    if (!hours) return false;
    
    return time >= hours.open && time <= hours.close;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 space-x-2">
          {restaurant.isHalal && (
            <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
              Halal
            </span>
          )}
          <span className={`inline-block ${isRestaurantOpen() ? 'bg-green-500' : 'bg-red-500'} text-white text-xs px-2 py-1 rounded-full shadow-md`}>
            {isRestaurantOpen() ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{restaurant.address}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">{restaurant.rating}</span>
          </div>
          <div className="flex items-center text-gray-600">
            {Array.from({ length: restaurant.priceRange.length }).map((_, i) => (
              <Euro key={i} className="w-4 h-4" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}