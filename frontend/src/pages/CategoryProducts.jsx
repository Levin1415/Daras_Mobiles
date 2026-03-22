import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Search, 
    Filter, 
    Grid3x3, 
    List, 
    ArrowLeft,
    SlidersHorizontal,
    X
} from 'lucide-react';
import { productService } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const CategoryProducts = () => {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [brands, setBrands] = useState([]);
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid');

    const selectedBrand = searchParams.get('brand');
    const minPrice = searchParams.get('min_price');
    const maxPrice = searchParams.get('max_price');
    const ordering = searchParams.get('ordering') || '-created_at';

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            try {
                const params = Object.fromEntries([...searchParams]);
                const response = await productService.getByCategory(category, params);
                
                setProducts(Array.isArray(response.data) ? response.data : []);
                setCategoryInfo({
                    category: category,
                    category_display: category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                    count: Array.isArray(response.data) ? response.data.length : 0
                });
            } catch (error) {
                console.error('Error fetching category products:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await productService.getBrands({ category });
                setBrands(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        if (category) {
            fetchCategoryProducts();
            fetchBrands();
        }
    }, [category, searchParams]);

    const handleBrandClick = (brand) => {
        if (selectedBrand === brand) {
            searchParams.delete('brand');
        } else {
            searchParams.set('brand', brand);
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

    const handlePriceFilter = (min, max) => {
        if (min) searchParams.set('min_price', min);
        else searchParams.delete('min_price');
        
        if (max) searchParams.set('max_price', max);
        else searchParams.delete('max_price');
        
        setSearchParams(searchParams);
    };

    const handleOrderingChange = (newOrdering) => {
        searchParams.set('ordering', newOrdering);
        setSearchParams(searchParams);
    };

    const clearAllFilters = () => {
        setSearchParams({});
        setSearchQuery('');
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-8 w-8 bg-muted animate-pulse rounded"></div>
                    <div className="h-8 bg-muted animate-pulse rounded w-64"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="h-[400px] bg-muted animate-pulse rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
                <div className="flex items-center gap-4">
                    <Link to="/categories">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Categories
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {categoryInfo?.category_display || 'Products'}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {categoryInfo?.count || 0} products available
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    className="sm:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </motion.div>

            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Sidebar Filters */}
                <aside className={`w-full shrink-0 lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="sticky top-4 space-y-6 rounded-xl border bg-card p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold">Filters</h3>
                            {(selectedBrand || minPrice || maxPrice || searchQuery) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAllFilters}
                                    className="h-auto p-0 text-xs text-primary"
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>
                        
                        {/* Search */}
                        <div>
                            <h4 className="mb-3 text-sm font-semibold">Search</h4>
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="pl-9 h-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>

                        {/* Brands */}
                        {brands.length > 0 && (
                            <div>
                                <h4 className="mb-3 text-sm font-semibold">Brands</h4>
                                <div className="space-y-2">
                                    {brands.map((brand) => (
                                        <Button
                                            key={brand}
                                            variant={selectedBrand === brand ? 'default' : 'ghost'}
                                            className="w-full justify-start h-9"
                                            onClick={() => handleBrandClick(brand)}
                                        >
                                            {brand}
                                            {selectedBrand === brand && (
                                                <X className="ml-auto h-3 w-3" />
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Price Range */}
                        <div className="border-t pt-6">
                            <h4 className="mb-3 text-sm font-semibold">Price Range</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <Input 
                                    type="number" 
                                    placeholder="Min" 
                                    className="h-9"
                                    value={minPrice || ''}
                                    onChange={(e) => handlePriceFilter(e.target.value, maxPrice)}
                                />
                                <Input 
                                    type="number" 
                                    placeholder="Max" 
                                    className="h-9"
                                    value={maxPrice || ''}
                                    onChange={(e) => handlePriceFilter(minPrice, e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="border-t pt-6">
                            <h4 className="mb-3 text-sm font-semibold">Sort By</h4>
                            <div className="space-y-2">
                                {[
                                    { value: '-created_at', label: 'Newest First' },
                                    { value: 'created_at', label: 'Oldest First' },
                                    { value: 'price', label: 'Price: Low to High' },
                                    { value: '-price', label: 'Price: High to Low' },
                                    { value: '-rating', label: 'Highest Rated' },
                                    { value: 'name', label: 'Name: A to Z' }
                                ].map((option) => (
                                    <Button
                                        key={option.value}
                                        variant={ordering === option.value ? 'default' : 'ghost'}
                                        className="w-full justify-start h-9 text-sm"
                                        onClick={() => handleOrderingChange(option.value)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1 space-y-6">
                    {/* View Controls */}
                    <div className="flex items-center justify-between rounded-xl border bg-card p-4">
                        <span className="text-sm text-muted-foreground">
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

                    {/* Products */}
                    {products.length > 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`grid gap-6 ${
                                viewMode === 'grid' 
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                                    : 'grid-cols-1'
                            }`}
                        >
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ProductCard product={product} viewMode={viewMode} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed text-center p-8">
                            <div className="rounded-full bg-muted p-4 mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">No products found</h3>
                            <p className="text-muted-foreground mb-4">
                                Try adjusting your search or filters
                            </p>
                            <Button variant="outline" onClick={clearAllFilters}>
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryProducts;