import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Star, TrendingUp, Shield, Truck, ChevronDown, Zap, Gift, Sparkles, Tag, Package, Percent } from 'lucide-react';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product/ProductCard';
import AccessoriesSection from '../components/product/AccessoriesSection';
import { productService } from '../services/api';
import { motion } from 'framer-motion';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const newLaunches = [
        {
            name: 'iPhone 16 Pro Max',
            tag: 'New Launch',
            highlight: 'A18 Bionic • ProMotion • Titanium',
            image: 'https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=500&h=500&fit=crop'
        },
        {
            name: 'Samsung Galaxy S25 Ultra',
            tag: 'Just Arrived',
            highlight: '200MP Camera • S Pen • 5G',
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop'
        },
        {
            name: 'OnePlus 13 Pro',
            tag: '5G Flagship',
            highlight: '120Hz AMOLED • Hasselblad Camera',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
        },
        {
            name: 'Google Pixel 10',
            tag: 'AI First',
            highlight: 'Pixel AI • Best-in-class camera',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop'
        }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.getAll({ limit: 8 });
                setFeaturedProducts(response.data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const mobileCategories = [
        { 
            name: 'Mobiles', 
            category: 'mobiles',
            icon: Smartphone, 
            color: 'bg-gradient-to-br from-slate-500 to-slate-700',
            image: 'https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=400&h=400&fit=crop',
            description: 'Latest smartphones'
        },
        { 
            name: 'Headphones', 
            category: 'headphones',
            icon: Smartphone, 
            color: 'bg-gradient-to-br from-purple-500 to-purple-700',
            image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
            description: 'Premium audio'
        },
        { 
            name: 'Mobile Cases', 
            category: 'mobile_cases',
            icon: Shield, 
            color: 'bg-gradient-to-br from-green-500 to-green-700',
            image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
            description: 'Protect your device'
        },
        { 
            name: 'Screen Guards', 
            category: 'screen_guards',
            icon: Shield, 
            color: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
            image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
            description: 'Crystal clear protection'
        },
        { 
            name: 'Chargers', 
            category: 'chargers',
            icon: Zap, 
            color: 'bg-gradient-to-br from-red-500 to-red-700',
            image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
            description: 'Fast charging solutions'
        },
        { 
            name: 'Mobile Holders', 
            category: 'mobile_holders',
            icon: Package, 
            color: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
            image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
            description: 'Convenient mounting'
        },
    ];

    const accessories = [
        { name: 'Cases & Covers', icon: Shield, count: '500+' },
        { name: 'Screen Guards', icon: Shield, count: '300+' },
        { name: 'Chargers', icon: Zap, count: '200+' },
        { name: 'Power Banks', icon: Package, count: '150+' },
    ];

    return (
        <div className="space-y-20">
            {/* Hero Section - Mobile Focus */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 px-6 py-20 text-primary-foreground md:px-12 md:py-24 shadow-[0_24px_80px_rgba(15,23,42,0.45)]"
                style={{
                    boxShadow: '0 0 0 20px rgba(255, 255, 255, 0), 0 0 0 40px rgba(255, 255, 255, 0.02), 0 0 0 60px rgba(255, 255, 255, 0.01)',
                    height: '550px'
                }}
            >
                {/* Gradient fade edges for merging effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-20 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-20 pointer-events-none"></div>
                
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
                
                {/* Floating Phone Images */}
                <motion.div 
                    animate={{ 
                        y: [0, -30, 0],
                        rotate: [0, 8, 0]
                    }}
                    transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute right-10 top-20 hidden lg:block"
                >
                    <div className="h-48 w-36 rounded-3xl bg-white/10 backdrop-blur-sm p-2 shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=300&h=600&fit=crop" alt="iPhone" className="h-full w-full object-cover rounded-2xl" />
                    </div>
                </motion.div>
                
                <motion.div 
                    animate={{ 
                        y: [0, 25, 0],
                        rotate: [0, -8, 0]
                    }}
                    transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute left-10 bottom-20 hidden lg:block"
                >
                    <div className="h-44 w-32 rounded-3xl bg-white/10 backdrop-blur-sm p-2 shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=600&fit=crop" alt="Samsung" className="h-full w-full object-cover rounded-2xl" />
                    </div>
                </motion.div>

                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm backdrop-blur-sm"
                    >
                        <Sparkles className="h-5 w-5" />
                        <span className="font-semibold">Latest Flagship Phones Now Available</span>
                    </motion.div>
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-balance leading-tight"
                    >
                        Premium Smartphones
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto font-light"
                    >
                        Discover the latest iPhone, Samsung, OnePlus, and more. Unbeatable prices, genuine products, and fast delivery.
                    </motion.p>
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex items-center justify-center gap-4 flex-wrap"
                    >
                        <Link to="/shop">
                            <Button size="lg" variant="secondary" className="h-12 px-8 text-base sm:text-lg hover:-translate-y-0.5 hover:scale-[1.02] transition-transform shadow-xl">
                                Shop Mobiles <ArrowRight className="ml-2 h-6 w-6" />
                            </Button>
                        </Link>
                        <Link to="/special-offers">
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base sm:text-lg bg-white/10 border-white/20 text-white hover:bg-white/20 hover:-translate-y-0.5 hover:scale-[1.02] transition-transform">
                                <Tag className="mr-2 h-5 w-5" />
                                View Offers
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* New Launches continuous banner */}
                <div className="absolute left-0 right-0 bottom-5">
                    <div className="pointer-events-none mx-auto max-w-5xl overflow-hidden rounded-2xl bg-black/10 backdrop-blur-sm border border-white/10">
                        <motion.div
                            className="flex"
                            animate={{ x: ['0%', '-50%'] }}
                            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                        >
                            {[...newLaunches, ...newLaunches].map((phone, index) => (
                                <div
                                    key={`${phone.name}-${index}`}
                                    className="flex min-w-[240px] max-w-xs items-center gap-3 px-4 py-3 border-r border-white/10"
                                >
                                    <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/10">
                                        <img
                                            src={phone.image}
                                            alt={phone.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold uppercase tracking-wide text-amber-200">
                                                {phone.tag}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-white leading-snug">
                                            {phone.name}
                                        </p>
                                        <p className="text-[11px] text-white/80 line-clamp-1">
                                            {phone.highlight}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Discount Poster / Limited Time Offer */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-sky-500/10 px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row items-center gap-6"
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
                    <div className="absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />
                </div>
                <div className="relative flex-1 space-y-2">
                    <p className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                        <Percent className="mr-1.5 h-3 w-3" /> Weekend Mega Mobile Sale
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                        Flat 10–30% off on premium smartphones
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
                        Limited-time offers on iPhone, Samsung, OnePlus and more. Genuine products with official
                        warranty and fast doorstep delivery.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center rounded-full bg-background/60 px-3 py-1">
                            ✅ No-cost EMI available
                        </span>
                        <span className="inline-flex items-center rounded-full bg-background/60 px-3 py-1">
                            🚚 Free same‑day delivery in select cities
                        </span>
                    </div>
                </div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="relative flex items-center justify-center"
                >
                    <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-500 text-white flex flex-col items-center justify-center shadow-2xl">
                        <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                            Up to
                        </span>
                        <span className="text-3xl sm:text-4xl font-black leading-none">
                            30%
                        </span>
                        <span className="mt-1 text-[10px] font-medium">
                            Instant discount
                        </span>
                    </div>
                </motion.div>
            </motion.section>

            {/* Trust Badges */}
            <section className="grid grid-cols-2 gap-4 md:grid-cols-4 px-4">
                {[
                    { icon: Shield, title: '100% Genuine', desc: 'Authentic Products' },
                    { icon: Truck, title: 'Free Delivery', desc: 'On Orders Above ₹500' },
                    { icon: Star, title: 'Warranty', desc: 'Official Warranty' },
                    { icon: Gift, title: 'Easy Returns', desc: '7 Days Return' },
                ].map((item, i) => (
                    <motion.div 
                        key={`trust-${i}-${item.title}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="flex flex-col items-center text-center p-6 rounded-xl bg-muted/50 border border-transparent hover:border-primary/20 transition-colors"
                    >
                        <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <item.icon className="h-8 w-8 mb-2 text-primary" />
                        </motion.div>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* Shop by Brand - Mobile Focus */}
            <section>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 text-center"
                >
                    <h2 className="text-4xl font-bold tracking-tight mb-3">Shop by Brand</h2>
                    <p className="text-muted-foreground text-lg">Choose from the world's leading smartphone brands</p>
                </motion.div>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                    {mobileCategories.map((cat, index) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -8 }}
                        >
                            <Link to={`/categories/${cat.category}`}>
                                <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 bg-card overflow-hidden h-full hover:border-primary transition-all">
                                    <div className="relative w-full aspect-square overflow-hidden">
                                        <img 
                                            src={cat.image} 
                                            alt={cat.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                        
                                        <motion.div 
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                            className={`absolute top-3 right-3 flex h-12 w-12 items-center justify-center rounded-full text-white ${cat.color} shadow-lg`}
                                        >
                                            <cat.icon className="h-6 w-6" />
                                        </motion.div>
                                    </div>
                                    
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                        <span className="relative font-bold text-white text-base text-center block">{cat.name}</span>
                                        <span className="relative text-white/80 text-xs text-center block mt-1">{cat.description}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Mobiles */}
            <section>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 text-center"
                >
                    <h2 className="text-4xl font-bold tracking-tight mb-3">Featured Smartphones</h2>
                    <p className="text-muted-foreground text-lg">Handpicked premium devices just for you</p>
                </motion.div>
                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div 
                                key={`skeleton-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="h-[400px] rounded-xl bg-muted animate-pulse"
                            ></motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.id || `product-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                )}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-10 text-center"
                >
                    <Link to="/shop">
                        <Button size="lg" variant="outline" className="h-12 px-8 hover:scale-105 transition-transform">
                            View All Mobiles <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            </section>

            {/* Accessories Section - Horizontal Scrollable */}
            <AccessoriesSection title="Mobile Accessories" />

            {/* FAQ Section */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-muted/30 rounded-3xl p-8 md:p-12"
            >
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground">Everything you need to know</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                q: 'Are all mobiles 100% genuine?',
                                a: 'Yes! We only sell 100% genuine smartphones with official warranty. All devices are sourced directly from authorized distributors and come with original packaging.'
                            },
                            {
                                q: 'What brands do you offer?',
                                a: 'We offer all major smartphone brands including iPhone, Samsung, OnePlus, Xiaomi, Google Pixel, Oppo, Vivo, and more. Check our Models page for the complete catalog.'
                            },
                            {
                                q: 'Do you provide warranty?',
                                a: 'All smartphones come with official manufacturer warranty. Warranty period varies by brand - typically 1 year for most devices. Extended warranty options are also available.'
                            },
                            {
                                q: 'What is your return policy?',
                                a: 'We offer a 7-day return policy for unopened devices. If you receive a defective product, we provide immediate replacement or full refund within 7 days of delivery.'
                            }
                        ].map((faq, i) => (
                            <motion.details 
                                key={`faq-${i}-${faq.q.substring(0, 10)}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group bg-card rounded-xl border p-6 hover:border-primary transition-colors cursor-pointer"
                            >
                                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                                    <span>{faq.q}</span>
                                    <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform" />
                                </summary>
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 text-muted-foreground leading-relaxed"
                                >
                                    {faq.a}
                                </motion.p>
                            </motion.details>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;
