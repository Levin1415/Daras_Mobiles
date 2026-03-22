import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';

const Models = () => {
    const brands = [
        'iPhone',
        'Samsung Galaxy',
        'OnePlus',
        'Xiaomi',
        'Google Pixel',
        'Realme',
        'Oppo',
        'Vivo',
    ];

    return (
        <div className="space-y-10">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border bg-card p-8 md:p-12"
            >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-4 max-w-xl">
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                            Popular Models
                        </h1>
                        <p className="text-muted-foreground">
                            Explore the most-loved smartphones that customers frequently choose. Use this list as
                            inspiration to find the right series for you.
                        </p>
                    </div>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex h-32 w-32 items-center justify-center rounded-3xl bg-primary/10 text-primary"
                    >
                        <Smartphone className="h-12 w-12" />
                    </motion.div>
                </div>
            </motion.section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Browse by popular series</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {brands.map((name, index) => (
                        <motion.div
                            key={name}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="rounded-2xl border bg-muted/40 p-4 text-center text-sm font-medium hover:border-primary hover:bg-background transition-colors"
                        >
                            {name}
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Models;

