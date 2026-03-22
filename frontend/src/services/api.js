import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: false
});

// Add token to headers if it exists in localStorage
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// Handle response format from Django
API.interceptors.response.use(
    (response) => {
        // Paginated list: { count, results: [...] }
        if (response.data && response.data.results) {
            return { ...response, data: response.data.results };
        }
        // Single-object wrapper: { success: true, data: {...} }
        if (response.data && response.data.success === true && response.data.data !== undefined) {
            return { ...response, data: response.data.data };
        }
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export const authService = {
    login: (data) => API.post('/auth/login/', data),
    register: (data) => API.post('/auth/register/', data),
    logout: () => API.post('/auth/logout/')
};

export const productService = {
    // Get all products with filters
    getAll: (params) => API.get('/products/', { params }),
    
    // Get product by ID
    getById: (id) => API.get(`/products/${id}/`),
    
    // Get categories with counts
    getCategories: () => API.get('/products/categories/'),
    
    // Get products by category
    getByCategory: (category, params) => API.get(`/products/categories/${category}/`, { params }),
    
    // Get featured products
    getFeatured: () => API.get('/products/featured/'),
    
    // Search products
    search: (params) => API.get('/products/search/', { params }),
    
    // Get brands
    getBrands: (params) => API.get('/products/brands/', { params }),
    
    // Create product (admin only)
    create: (data) => API.post('/products/', data),
    
    // Update product (admin only)
    update: (id, data) => API.put(`/products/${id}/`, data),
    
    // Delete product (admin only)
    delete: (id) => API.delete(`/products/${id}/`)
};

export const orderService = {
    create: (data) => API.post('/orders/', data),
    getMine: () => API.get('/orders/')
};

export default API;
