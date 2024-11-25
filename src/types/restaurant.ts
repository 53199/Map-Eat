export type Category = 
  | 'restaurant' 
  | 'snack' 
  | 'cafe' 
  | 'fastfood' 
  | 'pizzeria' 
  | 'sushi' 
  | 'burger' 
  | 'asian' 
  | 'mediterranean' 
  | 'vegetarian' 
  | 'bakery' 
  | 'icecream';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  category: Category;
  isHalal: boolean;
  position: [number, number];
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  image: string;
  rating: number;
  priceRange: string;
  cuisine?: string;
}