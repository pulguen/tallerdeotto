import { createContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'tdo_cart_v1';

const CartContext = createContext();

function getItemKey(item) {
  return `${item.productId}:${item.color}:${item.size}`;
}

function readStoredItems() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStoredItems());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item) => {
    const normalizedQuantity = Math.max(1, Number(item.quantity) || 1);

    setItems((currentItems) => {
      const itemKey = getItemKey(item);
      const existingItem = currentItems.find((entry) => getItemKey(entry) === itemKey);

      if (existingItem) {
        return currentItems.map((entry) =>
          getItemKey(entry) === itemKey
            ? { ...entry, quantity: entry.quantity + normalizedQuantity }
            : entry
        );
      }

      return [...currentItems, { ...item, quantity: normalizedQuantity }];
    });

    setIsOpen(true);
  };

  const updateItemQuantity = (itemKey, quantity) => {
    const normalizedQuantity = Math.max(1, Number(quantity) || 1);

    setItems((currentItems) =>
      currentItems.map((item) =>
        getItemKey(item) === itemKey
          ? { ...item, quantity: normalizedQuantity }
          : item
      )
    );
  };

  const removeItem = (itemKey) => {
    setItems((currentItems) => currentItems.filter((item) => getItemKey(item) !== itemKey));
  };

  const clearCart = () => setItems([]);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        isOpen,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
