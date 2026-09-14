import { Saree, CartItem, Order, CustomerInfo, OrderStatusType } from '../types';
import { STORAGE_KEYS } from '../config/authConfig';
import { INITIAL_SAREES } from '../data/sampleSarees';
import { calculateDeliveryDate } from './dateUtils';
import { generateOrderId } from './formatters';

// Safe localStorage wrapper
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// ==========================================
// SAREES STORAGE
// ==========================================

export const getSarees = (): Saree[] => {
  const sarees = getItem<Saree[]>(STORAGE_KEYS.SAREES, []);
  if (sarees.length === 0) {
    // Seed initial sample sarees if localStorage is empty
    setItem(STORAGE_KEYS.SAREES, INITIAL_SAREES);
    return INITIAL_SAREES;
  }
  return sarees;
};

export const getSareeById = (id: string): Saree | undefined => {
  const sarees = getSarees();
  return sarees.find(s => s.id === id);
};

export const addSaree = (newSareeData: Omit<Saree, 'id' | 'createdAt'>): Saree => {
  const sarees = getSarees();
  const id = `SAR-${Date.now().toString().slice(-4)}`;
  const newSaree: Saree = {
    ...newSareeData,
    id,
    createdAt: new Date().toISOString()
  };
  const updated = [newSaree, ...sarees];
  setItem(STORAGE_KEYS.SAREES, updated);
  return newSaree;
};

export const updateSaree = (id: string, updatedData: Partial<Saree>): Saree | null => {
  const sarees = getSarees();
  const index = sarees.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  const updatedSaree = { ...sarees[index], ...updatedData };
  sarees[index] = updatedSaree;
  setItem(STORAGE_KEYS.SAREES, sarees);
  return updatedSaree;
};

export const deleteSaree = (id: string): boolean => {
  const sarees = getSarees();
  const filtered = sarees.filter(s => s.id !== id);
  if (filtered.length === sarees.length) return false;
  
  setItem(STORAGE_KEYS.SAREES, filtered);
  // Also remove from cart if present
  removeFromCart(id);
  return true;
};

// ==========================================
// CART STORAGE
// ==========================================

export const getCart = (): CartItem[] => {
  return getItem<CartItem[]>(STORAGE_KEYS.CART, []);
};

export const addToCart = (saree: Saree, quantity: number = 1): CartItem[] => {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.saree.id === saree.id);
  
  let updated: CartItem[];
  if (existingIndex > -1) {
    updated = cart.map((item, idx) => 
      idx === existingIndex 
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    updated = [...cart, { saree, quantity }];
  }
  
  setItem(STORAGE_KEYS.CART, updated);
  return updated;
};

export const removeFromCart = (sareeId: string): CartItem[] => {
  const cart = getCart();
  const updated = cart.filter(item => item.saree.id !== sareeId);
  setItem(STORAGE_KEYS.CART, updated);
  return updated;
};

export const updateCartQuantity = (sareeId: string, quantity: number): CartItem[] => {
  if (quantity <= 0) {
    return removeFromCart(sareeId);
  }
  const cart = getCart();
  const updated = cart.map(item => 
    item.saree.id === sareeId ? { ...item, quantity } : item
  );
  setItem(STORAGE_KEYS.CART, updated);
  return updated;
};

export const clearCart = (): void => {
  setItem(STORAGE_KEYS.CART, []);
};

// ==========================================
// ORDERS STORAGE
// ==========================================

export const getOrders = (): Order[] => {
  return getItem<Order[]>(STORAGE_KEYS.ORDERS, []);
};

export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(o => o.id === id);
};

export const createOrder = (
  customer: CustomerInfo, 
  items: CartItem[], 
  subtotal: number, 
  total: number
): Order => {
  const orders = getOrders();
  const orderedAt = new Date().toISOString();
  const expectedDelivery = calculateDeliveryDate(orderedAt);
  const orderId = generateOrderId(orders.length);

  const newOrder: Order = {
    id: orderId,
    customer,
    items,
    subtotal,
    total,
    orderedAt,
    expectedDelivery,
    status: 'Order Placed'
  };

  const updatedOrders = [newOrder, ...orders];
  setItem(STORAGE_KEYS.ORDERS, updatedOrders);
  clearCart();
  return newOrder;
};

export const updateOrderStatus = (orderId: string, newStatus: OrderStatusType): Order | null => {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index === -1) return null;

  const updatedOrder = { ...orders[index], status: newStatus };
  orders[index] = updatedOrder;
  setItem(STORAGE_KEYS.ORDERS, orders);
  return updatedOrder;
};

// ==========================================
// AUTH STORAGE (sessionStorage based)
// ==========================================

export const getAdminAuthStatus = (): boolean => {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === "true";
  } catch {
    return false;
  }
};

export const setAdminAuthStatus = (isAuthenticated: boolean): void => {
  try {
    if (isAuthenticated) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, "true");
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  } catch (error) {
    console.error("Session storage error:", error);
  }
};

// ==========================================
// DEMO RESET
// ==========================================

export const resetDemoData = (): void => {
  setItem(STORAGE_KEYS.SAREES, INITIAL_SAREES);
  setItem(STORAGE_KEYS.CART, []);
  setItem(STORAGE_KEYS.ORDERS, []);
};
