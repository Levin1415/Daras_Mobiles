import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { productService } from '../../services/api';
import ProductCard from './ProductCard';
import { Button } from '../ui/button';

const AccessoriesSection = ({ title = "Mobile Accessories", category = null }) => {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                let response;
                if (category) {
                    response = await productService.getByCategory(category, { limit: 12 });
                } else {
                    // Get accessories from multiple categories
                    response = await productService.getAll({ 
                        category: 'headphones,mobile_cases,screen_guards,chargers,mobile_holders',
                        limit: 12 
                    });
                }
                
                setAccessories(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Error fetching accessories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAccessories();
    }, [category]);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            return () => container.removeEventListener('scroll', checkScrollButtons);
        }
    }, [accessories]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320; // Width of one card plus gap
            const newScrollLeft = scrollContainerRef.current.scrollLeft + 
                (direction === 'left' ? -scrollAmount : scrollAmount);
            
            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    if (loading) {
        return (
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="h-8 bg-muted animate-pulse rounded w-64"></div>
                    <div className="h-10 bg-muted animate-pulse rounded w-32"></div>
                </div>
                <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex-none w-80 h-96 bg-muted animate-pulse rounded-xl"></div>
                    ))}
                </div>
            </section>
        );
    }

    if (accessories.length === 0) {
        return null;
    }

    return (
        <section className="space-y-6">
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between"
            >
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    <p className="text-muted-foreground mt-1">
                        Essential accessories for your mobile devices
                    </p>
                </div>
                <Link to={category ? `/categories/${category}` : '/categories'}>
                    <Button variant="outline">
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </motion.div>

            {/* Scrollable Container */}
            <div className="relative">
                {/* Scroll Buttons */}
                {canScrollLeft && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border rounded-full p-2 shadow-lg hover:bg-background transition-colors"
                        style={{ marginLeft: '-20px' }}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </motion.button>
                )}
                
                {canScrollRight && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border rounded-full p-2 shadow-lg hover:bg-background transition-colors"
                        style={{ marginRight: '-20px' }}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </motion.button>
                )}

                {/* Products Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitScrollbar: { display: 'none' }
                    }}
                >
                    {accessories.map((product, index) => (
                        <motion.div
                            key={product.id || product._id || `accessory-${index}`}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex-none w-80"
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>

                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
            </div>

            {/* Category Links */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 justify-center"
            >
                {[
                    { category: 'headphones', label: 'Headphones', emoji: '🎧' },
                    { category: 'mobile_cases', label: 'Cases', emoji: '📱' },
                    { category: 'screen_guards', label: 'Screen Guards', emoji: '🛡️' },
                    { category: 'chargers', label: 'Chargers', emoji: '🔌' },
                    { category: 'mobile_holders', label: 'Holders', emoji: '📱' }
                ].map((cat) => (
                    <Link key={cat.category} to={`/categories/${cat.category}`}>
                        <Button variant="ghost" size="sm" className="h-auto py-2 px-4">
                            <span className="mr-2">{cat.emoji}</span>
                            {cat.label}
                        </Button>
                    </Link>
                ))}
            </motion.div>
        </section>
    );
};

export default AccessoriesSection;