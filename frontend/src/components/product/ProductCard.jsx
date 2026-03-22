import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product, viewMode = 'grid' }) => {
    const { addToCart } = useCart();

    const productId = product.id ?? product._id;

    // Get the primary image URL
    const imageUrl = product.primary_image || product.image_url || 'https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=400&h=400&fit=crop';
    
    // Get rating value
    const rating = product.average_rating || product.rating || 0;
    
    // Get discount percentage
    const discountPercent = product.discount_percent || 0;

    if (viewMode === 'list') {
        return (
            <Card className="group overflow-hidden border transition-all hover:shadow-lg">
                <div className="flex flex-col sm:flex-row">
                    <Link to={`/product/${productId}`} className="sm:w-48 shrink-0">
                        <div className="relative aspect-square sm:h-48 overflow-hidden bg-muted">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {discountPercent > 0 && (
                                <div className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
                                    -{discountPercent}%
                                </div>
                            )}
                        </div>
                    </Link>
                    <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                            <Link to={`/product/${productId}`}>
                                <h3 className="text-lg font-semibold hover:text-primary transition-colors mt-1">{product.name}</h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-bold">₹{product.discounted_price || product.price}</span>
                                    {discountPercent > 0 && (
                                        <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                                    )}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{rating}</span>
                                    {product.review_count > 0 && (
                                        <span className="ml-1">({product.review_count})</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button onClick={() => addToCart(product)}>
                                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card className="group overflow-hidden border-none bg-card transition-all hover:shadow-xl">
            <Link to={`/product/${productId}`}>
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                    {discountPercent > 0 && (
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute left-2 top-2 rounded-full bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground"
                        >
                            -{discountPercent}%
                        </motion.div>
                    )}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                            <Heart className="h-4 w-4" />
                        </Button>
                    </motion.div>
                </div>
            </Link>
            <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{product.brand}</p>
                <Link to={`/product/${productId}`}>
                    <h3 className="line-clamp-1 text-sm font-semibold hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                         <span className="text-lg font-bold">₹{product.discounted_price || product.price}</span>
                         {discountPercent > 0 && (
                             <span className="text-xs text-muted-foreground line-through">₹{product.price}</span>
                         )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{rating}</span>
                        {product.review_count > 0 && (
                            <span className="ml-1">({product.review_count})</span>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full" onClick={() => addToCart(product)}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                </motion.div>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
