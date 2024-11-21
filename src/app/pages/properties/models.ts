type PropertyAttributes = {
  title: string;
  propertyId: string;
  description: string;
  coverImage: string;
  price: number;
  size: number;
  location: string;
  type: string;
};

type Property = {
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
};

type Category = {
  id: string;
  name: string;
  properties: Property[];
};

type PropertyResponse = {
  categories: Category[];
};

export { PropertyAttributes, Property, Category, PropertyResponse };
