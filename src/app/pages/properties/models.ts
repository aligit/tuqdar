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
