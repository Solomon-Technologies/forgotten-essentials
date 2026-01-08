import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { shopifyClient, CREATE_CART, ADD_TO_CART } from '../lib/shopify';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopifyCartId');
    if (savedCartId) {
      setCartId(savedCartId);
    }
  }, []);

  const createShopifyCart = async (product: Product) => {
    try {
      const variantId = `gid://shopify/ProductVariant/${product.id}`;
      const data: any = await shopifyClient.request(CREATE_CART, {
        lines: [{ merchandiseId: variantId, quantity: 1 }],
      });

      const cart = data.cartCreate.cart;
      setCartId(cart.id);
      setCheckoutUrl(cart.checkoutUrl);
      localStorage.setItem('shopifyCartId', cart.id);
      return cart;
    } catch (error) {
      console.error('Error creating Shopify cart:', error);
      return null;
    }
  };

  const addToShopifyCart = async (product: Product) => {
    if (!cartId) {
      await createShopifyCart(product);
      return;
    }

    try {
      const variantId = `gid://shopify/ProductVariant/${product.id}`;
      const data: any = await shopifyClient.request(ADD_TO_CART, {
        cartId,
        lines: [{ merchandiseId: variantId, quantity: 1 }],
      });

      const cart = data.cartLinesAdd.cart;
      setCheckoutUrl(cart.checkoutUrl);
    } catch (error) {
      console.error('Error adding to Shopify cart:', error);
      // If cart is invalid, create a new one
      await createShopifyCart(product);
    }
  };

  const addToCart = (product: Product) => {
    // Update local state immediately for UI responsiveness
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { product, quantity: 1 }];
    });

    // Sync with Shopify cart
    addToShopifyCart(product);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId));
    // Note: You can add Shopify REMOVE_FROM_CART mutation here if needed
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
    // Note: You can add Shopify UPDATE_CART_LINES mutation here if needed
  };

  const clearCart = () => {
    setItems([]);
    setCartId(null);
    setCheckoutUrl(null);
    localStorage.removeItem('shopifyCartId');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        checkoutUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
