import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Sun, Moon, Smartphone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { totalItems } = useCart();
    const [darkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3">
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 shadow-md">
                            <span className="text-xs font-extrabold tracking-[0.18em] text-white">
                                DM
                            </span>
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white/90">
                                <Smartphone className="h-3 w-3 text-sky-600" />
                            </span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            Daras<span className="text-sky-600">Mobiles</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                            Shop
                        </Link>
                        <Link to="/categories" className="text-sm font-medium transition-colors hover:text-primary">
                            Categories
                        </Link>
                        <Link to="/categories/mobiles" className="text-sm font-medium transition-colors hover:text-primary">
                            Mobiles
                        </Link>
                        <Link to="/categories/headphones" className="text-sm font-medium transition-colors hover:text-primary">
                            Headphones
                        </Link>
                        <Link to="/categories/mobile_cases" className="text-sm font-medium transition-colors hover:text-primary">
                            Cases
                        </Link>
                        <Link to="/categories/chargers" className="text-sm font-medium transition-colors hover:text-primary">
                            Chargers
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hidden sm:flex">
                            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        <Link to="/wishlist">
                            <Button variant="ghost" size="icon" className="hidden sm:flex">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </Link>

                        <Link to="/cart" className="relative">
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {user ? (
                            <div className="flex items-center space-x-2">
                                <Link to="/profile">
                                    <Button variant="ghost" size="icon" className="hidden sm:flex">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" onClick={logout} className="hidden sm:flex">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login">
                                <Button size="sm">Login</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
