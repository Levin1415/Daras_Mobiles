import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="mt-8">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4 sm:p-6">
                                <div className="flex gap-4 sm:gap-6">
                                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border bg-muted sm:h-32 sm:w-32">
                                        <img src={(item.images && item.images[0]) || item.primary_image || item.image_url || 'https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=400&h=400&fit=crop'} alt={item.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">{item.brand}</p>
                                            </div>
                                            <p className="font-bold text-lg">₹{item.price}</p>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center rounded-md border">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-none"
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-none"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:bg-destructive/10"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Summary */}
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-lg font-bold">Order Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>
                            <Button className="w-full h-12 text-md" asChild>
                                <Link to="/checkout">
                                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Cart;
