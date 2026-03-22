import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { productService } from '../services/api';
import ProductCard from '../components/product/ProductCard';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNew = async () => {
            try {
                // Fallback: ask for latest products from main list
                const { data } = await productService.getAll({ ordering: '-created_at', limit: 8 });
                setProducts(data || []);
            } catch (error) {
                console.error('Error loading new arrivals', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNew();
    }, []);

    return (
        <div className="space-y-10">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
            >
                <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                    New Arrivals
                </h1>
                <p className="text-muted-foreground max-w-xl">
                    Freshly added smartphones and accessories, so you can stay ahead with the latest technology.
                </p>
            </motion.section>

            <section>
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
                        No new arrivals yet. Please check back soon.
                    </div>
                )}
            </section>
        </div>
    );
};

export default NewArrivals;

