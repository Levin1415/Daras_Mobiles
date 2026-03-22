import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Smartphone, 
    Headphones, 
    Shield, 
    Zap, 
    Grip, 
    ShoppingBag,
    ArrowRight,
    TrendingUp
} from 'lucide-react';
import { productService } from '../services/api';
import { Button } from '../components/ui/button';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryIcons = {
        'mobiles': Smartphone,
        'headphones': Headphones,
        'mobile_cases': Shield,
        'screen_guards': Shield,
        'chargers': Zap,
        'mobile_holders': Grip
    };

    const categoryColors = {
        'mobiles': 'from-blue-500 to-blue-700',
        'headphones': 'from-purple-500 to-purple-700',
        'mobile_cases': 'from-green-500 to-green-700',
        'screen_guards': 'from-yellow-500 to-yellow-700',
        'chargers': 'from-red-500 to-red-700',
        'mobile_holders': 'from-indigo-500 to-indigo-700'
    };

    const categoryDescriptions = {
        'mobiles': 'Latest smartphones from top brands',
        'headphones': 'Premium audio experience',
        'mobile_cases': 'Protect your device in style',
        'screen_guards': 'Crystal clear protection',
        'chargers': 'Fast and reliable charging',
        'mobile_holders': 'Convenient device mounting'
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await productService.getCategories();
                setCategories(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="text-center">
                    <div className="h-8 bg-muted animate-pulse rounded w-64 mx-auto mb-4"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-96 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 bg-muted animate-pulse rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold tracking-tight mb-4">Shop by Category</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Discover our complete range of mobile devices and accessories, 
                    carefully curated for the modern mobile lifestyle.
                </p>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => {
                    const IconComponent = categoryIcons[category.category] || ShoppingBag;
                    const colorClass = categoryColors[category.category] || 'from-gray-500 to-gray-700';
                    const description = categoryDescriptions[category.category] || 'Quality products for your needs';

                    return (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group"
                        >
                            <Link to={`/categories/${category.category}`}>
                                <div className="relative overflow-hidden rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-90`}></div>
                                    
                                    {/* Content */}
                                    <div className="relative p-8 text-white">
                                        <div className="flex items-center justify-between mb-4">
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"
                                            >
                                                <IconComponent className="h-8 w-8" />
                                            </motion.div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold">{category.count}</div>
                                                <div className="text-sm opacity-90">Products</div>
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold mb-2">{category.category_display}</h3>
                                        <p className="text-white/80 mb-4">{description}</p>
                                        
                                        <div className="flex items-center justify-between">
                                            <Button 
                                                variant="secondary" 
                                                size="sm"
                                                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                                            >
                                                Shop Now
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                            
                                            {category.count > 10 && (
                                                <div className="flex items-center text-sm opacity-90">
                                                    <TrendingUp className="h-4 w-4 mr-1" />
                                                    Popular
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Hover Effect */}
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>

            {/* Featured Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-muted/30 rounded-3xl p-8 text-center"
            >
                <h2 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Browse our complete product catalog or use our advanced search to find exactly what you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/shop">
                        <Button size="lg">
                            Browse All Products
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to="/search">
                        <Button variant="outline" size="lg">
                            Advanced Search
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Categories;