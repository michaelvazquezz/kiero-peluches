'use client';

import {
    LogOut,
    Package,
    DollarSign,
    ShoppingBag,
    TrendingUp,
    Calendar,
    Edit,
    Trash2,
    Plus,
    Filter,
    Users,
    BarChart3
} from 'lucide-react';
import { Product, Sale, FilterType } from '@/types';

interface AdminDashboardProps {
    products: Product[];
    sales: Sale[];
    stats: {
        totalSales: number;
        totalItems: number;
        averageSale: number;
        dailyAverage: number;
    };
    filter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    onAddProduct: (product: Omit<Product, 'id'>) => void;
    onUpdateProduct: (id: number, product: Omit<Product, 'id'>) => void;
    onDeleteProduct: (id: number) => void;
    onAddSale?: (sale: Omit<Sale, 'id'>) => void;
    onLogout: () => void;
    formatGuaranies: (amount: number) => string;
}

export default function AdminDashboard({
    products,
    sales,
    stats,
    filter,
    onFilterChange,
    onAddProduct,
    onUpdateProduct,
    onDeleteProduct,
    onLogout,
    formatGuaranies
}: AdminDashboardProps) {
    return (
        <div className="min-h-screen bg-secondary">
            {/* Header */}
            <header className="bg-primary shadow-soft">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">📊</span>
                            <div>
                                <h1 className="font-comic text-2xl font-bold text-dark">Panel de Administración</h1>
                                <p className="text-sm text-text/80">Kiero Peluches</p>
                            </div>
                        </div>

                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-dark rounded-full hover:bg-accent hover:text-white transition-all"
                        >
                            <LogOut size={18} />
                            <span className="font-semibold">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-xl">
                                <DollarSign className="text-dark" size={24} />
                            </div>
                            <div>
                                <h3 className="text-text/70 text-sm">Ventas Totales</h3>
                                <p className="text-2xl font-bold text-dark">{formatGuaranies(stats.totalSales)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-xl">
                                <Package className="text-dark" size={24} />
                            </div>
                            <div>
                                <h3 className="text-text/70 text-sm">Productos Vendidos</h3>
                                <p className="text-2xl font-bold text-dark">{stats.totalItems}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-soft">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/20 rounded-xl">
                                <TrendingUp className="text-dark" size={24} />
                            </div>
                            <div>
                                <h3 className="text-text/70 text-sm">Venta Promedio</h3>
                                <p className="text-2xl font-bold text-dark">{formatGuaranies(Math.round(stats.averageSale))}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtros */}
                <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Filter size={20} className="text-dark" />
                        <h2 className="text-xl font-bold text-dark">Filtrar Ventas</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {(['all', 'today', 'week', 'month', 'year'] as FilterType[]).map((filterType) => (
                            <button
                                key={filterType}
                                onClick={() => onFilterChange(filterType)}
                                className={`px-4 py-2 rounded-full transition-all ${filter === filterType
                                        ? 'bg-accent text-white'
                                        : 'bg-primary text-dark hover:bg-accent/20'
                                    }`}
                            >
                                {filterType === 'all' && 'Todas'}
                                {filterType === 'today' && 'Hoy'}
                                {filterType === 'week' && 'Esta Semana'}
                                {filterType === 'month' && 'Este Mes'}
                                {filterType === 'year' && 'Este Año'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tabla de Ventas */}
                <div className="bg-white rounded-2xl p-6 shadow-soft mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Calendar size={20} className="text-dark" />
                            <h2 className="text-xl font-bold text-dark">Ventas Recientes</h2>
                        </div>
                        <span className="text-sm text-text/70">
                            {sales.length} ventas encontradas
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-primary">
                                    <th className="text-left p-3 text-dark font-semibold">Fecha</th>
                                    <th className="text-left p-3 text-dark font-semibold">Producto</th>
                                    <th className="text-left p-3 text-dark font-semibold">Cantidad</th>
                                    <th className="text-left p-3 text-dark font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.slice(0, 10).map((sale) => (
                                    <tr key={sale.id} className="border-b border-primary/20 hover:bg-primary/10">
                                        <td className="p-3">{sale.date}</td>
                                        <td className="p-3">{sale.product}</td>
                                        <td className="p-3">{sale.quantity}</td>
                                        <td className="p-3 font-semibold">{formatGuaranies(sale.total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {sales.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-text/70">No hay ventas en este período</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Gestión de Productos */}
                <div className="bg-white rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Package size={20} className="text-dark" />
                            <h2 className="text-xl font-bold text-dark">Gestión de Productos</h2>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-full hover:bg-dark transition-all">
                            <Plus size={18} />
                            <span className="font-semibold">Nuevo Producto</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="border-2 border-primary/30 rounded-xl p-4 hover:border-accent transition-all">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />

                                <div className="mb-4">
                                    <h3 className="font-bold text-dark mb-1">{product.name}</h3>
                                    <p className="text-sm text-text/70 mb-2 line-clamp-2">{product.description}</p>
                                    <p className="text-lg font-bold text-accent">{formatGuaranies(product.price)}</p>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-dark rounded-lg hover:bg-accent hover:text-white transition-all">
                                        <Edit size={16} />
                                        <span className="text-sm font-semibold">Editar</span>
                                    </button>
                                    <button
                                        onClick={() => onDeleteProduct(product.id)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <Trash2 size={16} />
                                        <span className="text-sm font-semibold">Eliminar</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-text/70">No hay productos registrados</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}