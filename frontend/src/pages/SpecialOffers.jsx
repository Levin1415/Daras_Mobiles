import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, ArrowRight, Percent, CreditCard, RefreshCw, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { productService } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { Button } from '../components/ui/button';

const SpecialOffers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                // Fallback: reuse main list, backend can later add a real offers filter
                const { data } = await productService.getAll({ limit: 8 });
                setProducts(data || []);
            } catch (error) {
                console.error('Error loading offers', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    return (
        <div className="space-y-10">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-8 py-14 text-primary-foreground"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-transparent to-background/10 opacity-40" />
                <div className="relative max-w-3xl space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
                        <Sparkles className="h-4 w-4" />
                        <span>Handpicked deals on mobiles & accessories</span>
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                        Special Offers
                    </h1>
                    <p className="text-lg text-primary-foreground/90 max-w-xl">
                        Save more on your next smartphone purchase with limited-time discounts and value bundles.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2 text-xs">
                        <span className="inline-flex items-center rounded-full bg-background/10 px-3 py-1">
                            <Percent className="mr-1 h-3 w-3" /> Up to 30% instant discount
                        </span>
                        <span className="inline-flex items-center rounded-full bg-background/10 px-3 py-1">
                            <CreditCard className="mr-1 h-3 w-3" /> Extra 10% off with bank cards
                        </span>
                        <span className="inline-flex items-center rounded-full bg-background/10 px-3 py-1">
                            <Gift className="mr-1 h-3 w-3" /> Combo offers on accessories
                        </span>
                    </div>
                </div>
            </motion.section>

            {/* Highlighted offer types */}
            <section className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-card p-5 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <Percent className="h-3 w-3" /> Flat Discounts
                    </div>
                    <h3 className="text-sm font-semibold">Flat 10–30% off on select smartphones</h3>
                    <p className="text-xs text-muted-foreground">
                        Popular models from iPhone, Samsung, OnePlus, and more with direct price drops at checkout.
                    </p>
                </div>
                <div className="rounded-2xl border bg-card p-5 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700">
                        <CreditCard className="h-3 w-3" /> Bank & EMI Offers
                    </div>
                    <h3 className="text-sm font-semibold">No‑cost EMI & bank cashback</h3>
                    <p className="text-xs text-muted-foreground">
                        Use leading bank credit/debit cards to get instant cashback or convert your order to easy EMIs.
                    </p>
                </div>
                <div className="rounded-2xl border bg-card p-5 flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700">
                        <Gift className="h-3 w-3" /> Exchange & Combo Deals
                    </div>
                    <h3 className="text-sm font-semibold">Exchange bonus + accessory combos</h3>
                    <p className="text-xs text-muted-foreground">
                        Get an extra value when you exchange your old phone and save more with curated accessory bundles.
                    </p>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold tracking-tight">Top Picks on Offer</h2>
                    <Link to="/shop">
                        <Button variant="outline" size="sm">
                            View all products
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-[360px] rounded-xl bg-muted animate-pulse" />
                        ))}
                    </div>
                ) : products.length ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id || product._id || product.name} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed p-10 text-center text-muted-foreground">
                        No special offers available right now. Please check back soon.
                    </div>
                )}
            </section>
        </div>
    );
};

export default SpecialOffers;

