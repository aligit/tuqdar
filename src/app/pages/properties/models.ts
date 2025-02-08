export type PropertyAttributes = {
  title: string;
  propertyId: string;
  description: string;
  coverImage: string;
  price: number;
  size: number;
  location: string;
  type: string;
};

export type FloorMaterial = 'سرامیک' | 'پارکت چوب' | 'پارکت لمینت' | 'سنگ' | 'موکت' | 'موزائیک';
export type ToiletType = 'ایرانی' | 'خارجی' | 'ایرانی و خارجی';
export type CoolingSystem = 'کولر آبی' | 'کولر گازی' | 'داکت اسپلیت' | 'اسپلیت' | 'فن کوئل' | 'ندارد';
export type HeatingSystem = 'بخاری' | 'شوفاژ' | 'فن کوئل' | 'از کف' | 'داکت اسپلیت' | 'اسپلیت' | 'شومینه' | 'ندارد';
export type WaterHeaterSystem = 'آبگرم‌کن' | 'موتورخانه' | 'پکیج' | 'ندارد';

export interface Property {
  propertyId: string;
  title: string;
  bedrooms?: number;
  bathrooms?: number;
  landscape?: boolean;
  plotArea: string;
  builtArea: string;
  price: string;
  location: string;
  coverImage: string;
  images: string[];
  videoUrl?: string;
  agent?: Agent;
  description: string;
  propertyInvestmentScore?: number;
  marketTrendPrediction?: string;
  similarPropertiesComparison?: string[];
  propertyHighlightFlags?: string[];
  neighborhoodFitScore?: number;
  priceTrend?: number[];
  rp?: number;
  numberOfRooms?: string;
  yearBuilt?: string;
  hasParking?: boolean;
  hasCellar?: boolean;
  hasBalcony?: boolean;
  floorMaterial?: FloorMaterial;
  toiletType?: ToiletType;
  coolingSystem?: CoolingSystem;
  heatingSystem?: HeatingSystem;
  waterHeaterSystem?: WaterHeaterSystem;
  propertyTitle?: string;
  totalFloors?: number;
}

export type Agent = {
  name: string;
  avatar: string;
};

export type Category = {
  id: string;
  name: string;
  properties: Property[];
};

export type PropertyResponse = {
  categories: Category[];
};
