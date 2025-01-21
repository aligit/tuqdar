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

export type Property = {
  propertyId: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  landscape: number;
  plotArea: number;
  builtArea: number;
  price: number;
  location: string;
  coverImage: string;
  agent?: Agent;
};

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
