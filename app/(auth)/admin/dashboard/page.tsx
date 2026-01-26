'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import { products as initialProducts, salesData } from '@/lib/data';
import { Product, Sale, FilterType } from '@/types';
import { formatGuaranies, getFilteredSales } from '@/lib/utils';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [sales, setSales] = useState<Sale[]>(salesData);
    const [filter, setFilter] = useState<FilterType>('all');
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('admin-authenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            router.push('/admin/login');
        }
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('admin-authenticated');
        router.push('/admin/login');
    };

    const addProduct = (newProduct: Omit<Product, 'id'>) => {
        const productWithId: Product = {
            ...newProduct,
            id: Date.now(),
        };
        setProducts([...products, productWithId]);
    };

    const updateProduct = (id: number, updatedProduct: Omit<Product, 'id'>) => {
        setProducts(products.map(p =>
            p.id === id ? { ...updatedProduct, id } : p
        ));
    };

    const deleteProduct = (id: number) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const addSale = (sale: Omit<Sale, 'id'>) => {
        const saleWithId: Sale = {
            ...sale,
            id: Date.now(),
        };
        setSales([saleWithId, ...sales]);
    };

    const filteredSales = getFilteredSales(sales, filter);

    const stats = {
        totalSales: filteredSales.reduce((sum, sale) => sum + sale.total, 0),
        totalItems: filteredSales.reduce((sum, sale) => sum + sale.quantity, 0),
        averageSale: filteredSales.length > 0
            ? filteredSales.reduce((sum, sale) => sum + sale.total, 0) / filteredSales.length
            : 0,
        dailyAverage: filteredSales.length > 0
            ? filteredSales.reduce((sum, sale) => sum + sale.total, 0) / 30
            : 0,
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <AdminDashboard
            products={products}
            sales={filteredSales}
            stats={stats}
            filter={filter}
            onFilterChange={setFilter}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onAddSale={addSale}
            onLogout={handleLogout}
            formatGuaranies={formatGuaranies}
        />
    );
}