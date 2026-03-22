import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, MapPin, Phone, User, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [ordered, setOrdered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '', phone: '', address: '', city: '', pincode: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number';
        if (!form.address.trim()) e.address = 'Address is required';
        if (!form.city.trim()) e.city = 'City is required';
        if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode';
        return e;
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        setLoading(true);
        setTimeout(() => {
            clearCart();
            setOrdered(true);
            setLoading(false);
        }, 1200);
    };

    if (cart.length === 0 && !ordered) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Link to="/shop" className="mt-6"><Button>Continue Shopping</Button></Link>
            </div>
        );
    }

    if (ordered) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-14 w-14 text-green-600" />
                </div>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Order Placed!</h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto">
                        Thank you, {form.name}. Your order has been placed successfully and will be delivered to {form.city}.
                    </p>
                </div>
                <div className="bg-muted/40 rounded-2xl px-8 py-5 text-sm text-muted-foreground space-y-1">
                    <p>We'll contact you on <span className="font-medium text-foreground">+91 {form.phone}</span></p>
                    <p>Delivery to: <span className="font-medium text-foreground">{form.address}, {form.city} - {form.pincode}</span></p>
                </div>
                <div className="flex gap-4">
                    <Link to="/shop"><Button variant="outline">Continue Shopping</Button></Link>
                    <Link to="/"><Button>Back to Home</Button></Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
                <Link to="/cart">
                    <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" /> Cart</Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                {/* Delivery Form */}
                <form onSubmit={handlePlaceOrder} className="lg:col-span-3 space-y-5">
                    <Card>
                        <CardContent className="p-6 space-y-5">
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> Delivery Details
                            </h2>

                            <div className="space-y-1">
                                <label className="text-sm font-medium flex items-center gap-1">
                                    <User className="h-3.5 w-3.5" /> Full Name
                                </label>
                                <Input name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5" /> Phone Number
                                </label>
                                <Input name="phone" placeholder="10-digit mobile number" value={form.phone} onChange={handleChange} maxLength={10} />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium">Address</label>
                                <Input name="address" placeholder="House no, Street, Area" value={form.address} onChange={handleChange} />
                                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">City</label>
                                    <Input name="city" placeholder="City" value={form.city} onChange={handleChange} />
                                    {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium">Pincode</label>
                                    <Input name="pincode" placeholder="6-digit pincode" value={form.pincode} onChange={handleChange} maxLength={6} />
                                    {errors.pincode && <p className="text-xs text-red-500">{errors.pincode}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-3">
                            <h2 className="font-semibold text-lg">Payment</h2>
                            <div className="flex items-center gap-3 rounded-lg border-2 border-primary bg-primary/5 p-4">
                                <div className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <span className="font-medium">Cash on Delivery</span>
                                <span className="ml-auto text-xs text-muted-foreground">Pay when delivered</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                        {loading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                </form>

                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h2 className="font-semibold text-lg">Order Summary</h2>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-muted border">
                                            <img
                                                src={item.image_url || item.primary_image || 'https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=100&h=100&fit=crop'}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold shrink-0">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span><span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between font-bold text-base border-t pt-2">
                                    <span>Total</span><span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
