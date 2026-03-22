import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, X, Grid3x3, List } from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    const categories = [
        { value: 'mobiles', label: 'Mobiles' },
        { value: 'headphones', label: 'Headphones' },
        { value: 'mobile_cases', label: 'Mobile Cases' },
        { value: 'screen_guards', label: 'Screen Guards' },
        { value: 'chargers', label: 'Chargers' },
        { value: 'mobile_holders', label: 'Mobile Holders' }
    ];
    const selectedCategory = searchParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = Object.fromEntries([...searchParams]);
                const { data } = await productService.getAll(params);
                setProducts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchParams]);

    const handleCategoryClick = (category) => {
        if (selectedCategory === category) {
            searchParams.delete('category');
        } else {
            searchParams.set('category', category);
        }
        setSearchParams(searchParams);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            searchParams.set('search', searchQuery);
        } else {
            searchParams.delete('search');
        }
        setSearchParams(searchParams);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Shop All Products</h1>
                    <p className="text-muted-foreground mt-1">Discover our complete collection</p>
                </div>
                <Button
                    variant="outline"
                    className="sm:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Sidebar Filters */}
                <aside className={`w-full shrink-0 lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="sticky top-4 space-y-6 rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold">Filters</h3>
                            {selectedCategory && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchParams({})}
                                    className="h-auto p-0 text-xs text-primary"
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>
                        
                        <div>
                            <h4 className="mb-3 text-sm font-semibold">Categories</h4>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <Button
                                        key={cat.value}
                                        variant={selectedCategory === cat.value ? 'default' : 'ghost'}
                                        className="w-full justify-start h-9"
                                        onClick={() => handleCategoryClick(cat.value)}
                                    >
                                        {cat.label}
                                        {selectedCategory === cat.value && (
                                            <X className="ml-auto h-3 w-3" />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="border-t pt-6">
                            <h4 className="mb-3 text-sm font-semibold">Price Range</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <Input type="number" placeholder="Min" className="h-9" />
                                <Input type="number" placeholder="Max" className="h-9" />
                            </div>
                            <Button className="w-full mt-3 h-9" size="sm">Apply</Button>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1 space-y-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border bg-card p-4">
                        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="pl-9 h-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                                {products.length} {products.length === 1 ? 'product' : 'products'}
                            </span>
                            <div className="flex gap-1 border rounded-lg p-1">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => setViewMode('grid')}
                                >
                                    <Grid3x3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => setViewMode('list')}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className={`rounded-xl bg-muted animate-pulse ${viewMode === 'grid' ? 'h-[380px]' : 'h-[200px]'}`}></div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {products.map((product) => (
                                <ProductCard key={product.id || product._id || `product-${product.name}`} product={product} viewMode={viewMode} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed text-center p-8">
                            <div className="rounded-full bg-muted p-4 mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">No smartphones found</h3>
                            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                            <Button variant="outline" onClick={() => setSearchParams({})}>
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
