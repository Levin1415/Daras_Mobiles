import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, Star, ArrowLeft } from 'lucide-react';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import ProductCard from '../components/product/ProductCard';

const FALLBACK = 'https://images.unsplash.com/photo-1592286927505-b0501739c61b?w=600&h=600&fit=crop';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct]           = useState(null);
    const [loading, setLoading]           = useState(true);
    const [related, setRelated]           = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [added, setAdded]               = useState(false);

    // ── Fetch product ────────────────────────────────────────────────────────
    useEffect(() => {
        setLoading(true);
        setProduct(null);
        setRelated([]);
        setSelectedImage(null);

        productService.getById(id)
            .then(res => {
                const p = res.data;
                setProduct(p);
                // pick first image
                const imgs = resolveImages(p);
                setSelectedImage(imgs[0]);
            })
            .catch(err => console.error('Product fetch error:', err))
            .finally(() => setLoading(false));
    }, [id]);

    // ── Fetch related ────────────────────────────────────────────────────────
    useEffect(() => {
        if (!product?.category) return;
        productService.getAll({ category: product.category, limit: 8 })
            .then(res => {
                const list = Array.isArray(res.data) ? res.data : [];
                setRelated(list.filter(p => String(p.id) !== String(id)).slice(0, 4));
            })
            .catch(() => {});
    }, [product, id]);

    // ── Helpers ──────────────────────────────────────────────────────────────
    const resolveImages = (p) => {
        // images is an array of {image_url, ...} objects from the serializer
        if (Array.isArray(p.images) && p.images.length) {
            return p.images.map(img =>
                typeof img === 'string' ? img : (img.image_url || FALLBACK)
            );
        }
        return [p.primary_image || p.image_url || FALLBACK];
    };

    const handleAddToCart = () => {
        if (!product || product.stock === 0) return;
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    // ── Spec rows for mobiles ────────────────────────────────────────────────
    const mobileSpecs = product ? [
        ['RAM',          product.ram],
        ['Storage',      product.storage],
        ['Processor',    product.processor],
        ['Battery',      product.battery],
        ['Display',      product.display_size],
        ['Resolution',   product.display_resolution],
        ['Display Type', product.display_type],
        ['Rear Camera',  product.camera_rear],
        ['Front Camera', product.camera_front],
        ['OS',           product.os],
        ['Dimensions',   product.dimensions],
        ['Weight',       product.weight],
    ].filter(([, v]) => v) : [];

    const accessorySpecs = product ? [
        ['Compatible Devices', product.compatible_devices],
        ['Material',           product.material],
        ['Color',              product.color],
        ['Warranty',           product.warranty],
    ].filter(([, v]) => v) : [];

    const specs = mobileSpecs.length ? mobileSpecs : accessorySpecs;

    // ── Loading / not found ──────────────────────────────────────────────────
    if (loading) return (
        <div className="animate-pulse space-y-6 max-w-5xl mx-auto">
            <div className="h-8 w-32 bg-muted rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-2xl"></div>
                <div className="space-y-4">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-6 bg-muted rounded"></div>)}
                </div>
            </div>
        </div>
    );

    if (!product) return (
        <div className="text-center py-20 text-muted-foreground">Product not found.</div>
    );

    const images       = resolveImages(product);
    const displayImage = selectedImage || images[0];
    const rating       = Number(product.average_rating || product.rating || 0).toFixed(1);
    const reviewCount  = product.review_count || 0;
    const inStock      = product.stock > 0;
    const discountPct  = product.discount_percent || 0;

    return (
        <div className="space-y-14 pb-20 max-w-6xl mx-auto">

            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="h-4 w-4" /> Back
            </button>

            {/* ── Product section ── */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

                {/* Images */}
                <div className="space-y-3">
                    {/* Main image — fixed height, not full-bleed */}
                    <div className="overflow-hidden rounded-2xl border bg-muted/30 flex items-center justify-center"
                         style={{ height: '340px' }}>
                        <img
                            src={displayImage}
                            alt={product.name}
                            className="h-full w-full object-contain p-4"
                            onError={e => { e.target.src = FALLBACK; }}
                        />
                    </div>

                    {/* Thumbnails — only show if more than 1 */}
                    {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`flex-none w-16 h-16 rounded-xl border-2 overflow-hidden bg-muted/30 transition-colors ${
                                        displayImage === img ? 'border-primary' : 'border-transparent hover:border-muted-foreground/40'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="h-full w-full object-contain p-1"
                                        onError={e => { e.target.src = FALLBACK; }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-5">
                    {/* Brand + category */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            {product.brand}
                        </span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                            {product.category_display || product.category}
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight leading-snug">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center gap-1 text-amber-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-semibold">{rating}</span>
                        </div>
                        {reviewCount > 0 && (
                            <span className="text-muted-foreground">({reviewCount} reviews)</span>
                        )}
                        <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${
                            inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold">
                            ₹{discountPct > 0 ? Number(product.discounted_price).toFixed(2) : Number(product.price).toFixed(2)}
                        </span>
                        {discountPct > 0 && (
                            <>
                                <span className="text-lg text-muted-foreground line-through">
                                    ₹{Number(product.price).toFixed(2)}
                                </span>
                                <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                                    {discountPct}% off
                                </span>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <Button
                            className="flex-1 h-11"
                            disabled={!inStock}
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {added ? 'Added!' : inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11">
                            <Heart className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="grid grid-cols-3 gap-3 border-t pt-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4 text-primary" />
                            <span>Free Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                            <span>1 Year Warranty</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <RefreshCw className="h-4 w-4 text-primary" />
                            <span>7 Day Return</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Specifications ── */}
            {specs.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight">Specifications</h2>
                    <div className="rounded-2xl border overflow-hidden">
                        <table className="w-full text-sm">
                            <tbody>
                                {specs.map(([key, value], i) => (
                                    <tr key={key} className={i % 2 === 0 ? 'bg-muted/30' : 'bg-background'}>
                                        <td className="w-2/5 py-3 pl-5 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                                            {key}
                                        </td>
                                        <td className="py-3 pr-5 font-medium text-foreground">
                                            {value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* ── Reviews ── */}
            {Array.isArray(product.reviews) && product.reviews.length > 0 && (
                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-tight">Customer Reviews</h2>
                    <div className="space-y-3">
                        {product.reviews.map((review, i) => (
                            <div key={review.id || i} className="rounded-xl border p-4 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm">
                                        {review.user_name || 'Anonymous'}
                                    </span>
                                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                                        <Star className="h-3 w-3 fill-current" />
                                        <span>{review.rating}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ── Related products ── */}
            {related.length > 0 && (
                <section className="space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-tight">You may also like</h2>
                        <span className="text-sm text-muted-foreground">
                            More {product.category_display || product.category}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {related.map((p, i) => (
                            <ProductCard key={p.id || `rel-${i}`} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetail;
