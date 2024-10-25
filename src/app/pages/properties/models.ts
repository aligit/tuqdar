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

type PropertyCategory = {
  name: string;
  properties: PropertyAttributes[];
};

type PropertyData = {
  categories: PropertyCategory[];
};

type Property = {
  propertyId: string;
  title: string;
  size: number;
  price: number;
  location: string;
  coverImage: string;
};

type Category = {
  name: string;
  properties: Property[];
};

type PropertyResponse = {
  categories: Category[];
};


export { PropertyAttributes, PropertyCategory, PropertyData, Property, Category, PropertyResponse };
