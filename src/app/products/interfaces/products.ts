export interface Product {
  _id:         string;
  name:        string;
  description: string;
  imageUrl:    string;
  price:       number;
  sku:         string;
  stock:       number;
  tags:        string[];
  createdAt:   Date;
  updatedAt:   Date;
}

export interface CreateProduct {
  name:        string;
  description: string;
  image:       File;
  price:       number;
  sku:         string;
  stock:       number;
  tags:        string[] | [];
}

export interface UpdateProduct {
  name:        string;
  description: string;
  image:       File | null;
  price:       number;
  sku:         string;
  stock:       number;
  tags:        string[] | [];
}

export interface GetProducts {
  filterBy?: string;
  orderBy?: string;
  search?: string;
}
