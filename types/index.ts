export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: number;
  date: string;
  product: string;
  quantity: number;
  total: number;
}

export interface AdminStats {
  totalSales: number;
  totalItems: number;
  averageSale: number;
  dailyAverage: number;
}

export type FilterType = 'all' | 'today' | 'week' | 'month' | 'year';