export const formatGuaranies = (amount: number): string => {
  return 'Gs. ' + amount.toLocaleString('es-PY');
};

export const calculateCartTotal = (cart: any[]): number => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const getFilteredSales = (sales: any[], filter: string) => {
  const now = new Date();
  
  switch(filter) {
    case 'today':
      const today = now.toISOString().split('T')[0];
      return sales.filter(sale => sale.date === today);
    
    case 'week':
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      return sales.filter(sale => new Date(sale.date) >= weekAgo);
    
    case 'month':
      return sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getMonth() === now.getMonth() && 
               saleDate.getFullYear() === now.getFullYear();
      });
    
    case 'year':
      return sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getFullYear() === now.getFullYear();
      });
    
    default:
      return sales;
  }
};