import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            <Navbar />
            <main className="container py-8 min-h-[calc(100vh-20rem)]">
                {children}
            </main>
            <footer className="border-t bg-muted/30 mt-16">
                <div className="container py-12">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        {/* Brand */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">DarasMobiles</h3>
                            <p className="text-sm text-muted-foreground">
                                Your trusted destination for premium smartphones and mobile accessories. Quality devices at unbeatable prices.
                            </p>
                            <div className="flex space-x-3">
                                <a href="#" className="rounded-full bg-primary/10 p-2 hover:bg-primary/20 transition-colors">
                                    <Facebook className="h-4 w-4" />
                                </a>
                                <a href="#" className="rounded-full bg-primary/10 p-2 hover:bg-primary/20 transition-colors">
                                    <Instagram className="h-4 w-4" />
                                </a>
                                <a href="#" className="rounded-full bg-primary/10 p-2 hover:bg-primary/20 transition-colors">
                                    <Twitter className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="mb-4 font-semibold">Shop</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">All Mobiles</Link></li>
                                <li><Link to="/models" className="text-muted-foreground hover:text-foreground transition-colors">Popular Models</Link></li>
                                <li><Link to="/new-arrivals" className="text-muted-foreground hover:text-foreground transition-colors">New Arrivals</Link></li>
                                <li><Link to="/special-offers" className="text-muted-foreground hover:text-foreground transition-colors">Special Offers</Link></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h4 className="mb-4 font-semibold">Customer Service</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Returns</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="mb-4 font-semibold">Contact</h4>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-2 text-muted-foreground">
                                    <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>support@darasmobiles.in</span>
                                </li>
                                <li className="flex items-start gap-2 text-muted-foreground">
                                    <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>+91 98765 43210</span>
                                </li>
                                <li className="flex items-start gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                    <span>Daras Mobiles, Vijayawada, Andhra Pradesh - 520001</span>
                                </li>
                                <li className="mt-3">
                                    <a
                                        href="https://www.google.com/maps?q=16.513433,80.630463"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block rounded-xl overflow-hidden border hover:opacity-90 transition-opacity group"
                                        title="Open Daras Mobiles in Google Maps"
                                    >
                                        <iframe
                                            title="Daras Mobiles Location"
                                            src="https://maps.google.com/maps?q=16.513433,80.630463&z=16&output=embed"
                                            width="100%"
                                            height="160"
                                            style={{ border: 0, display: 'block', pointerEvents: 'none' }}
                                            loading="lazy"
                                        />
                                        <div className="flex items-center gap-2 bg-muted/60 px-3 py-2 group-hover:bg-muted transition-colors">
                                            <MapPin className="h-4 w-4 text-red-500 shrink-0" />
                                            <span className="text-xs font-medium text-foreground">Daras Mobiles — Open in Google Maps →</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
                        <p>© 2026 DarasMobiles. All rights reserved. Your trusted mobile store.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
