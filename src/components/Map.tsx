import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Restaurant } from '../types/restaurant';
import { format } from 'date-fns';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import RestaurantCard from './RestaurantCard';

interface MapProps {
  restaurants: Restaurant[];
  selectedCategories: string[];
  showHalalOnly: boolean;
  showOpenOnly: boolean;
}

export default function Map({ restaurants, selectedCategories, showHalalOnly, showOpenOnly }: MapProps) {
  const isRestaurantOpen = (restaurant: Restaurant) => {
    const now = new Date();
    const day = format(now, 'EEE').toLowerCase();
    const time = format(now, 'HH:mm');
    
    const hours = restaurant.openingHours[day];
    if (!hours) return false;
    
    return time >= hours.open && time <= hours.close;
  };

  const createCustomIcon = (restaurant: Restaurant) => {
    const isOpen = isRestaurantOpen(restaurant);
    
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div class="marker-content ${isOpen ? 'open' : 'closed'}">
          <div class="marker-image" style="background-image: url(${restaurant.image})">
            <div class="marker-rating">
              <span>${restaurant.rating}</span>
              <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(restaurant.category)) {
      return false;
    }
    if (showHalalOnly && !restaurant.isHalal) {
      return false;
    }
    if (showOpenOnly && !isRestaurantOpen(restaurant)) {
      return false;
    }
    return true;
  });

  return (
    <MapContainer
      center={[50.8466, 4.3528]}
      zoom={13}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredRestaurants.map((restaurant) => (
        <Marker 
          key={restaurant.id} 
          position={restaurant.position}
          icon={createCustomIcon(restaurant)}
        >
          <Popup>
            <RestaurantCard restaurant={restaurant} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}