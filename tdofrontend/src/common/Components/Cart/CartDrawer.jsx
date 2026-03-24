import React, { useMemo } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useCart } from '../../../context/useCart';
import './CartDrawer.css';

const WHATSAPP_NUMBER = '5491123321006';

function getItemKey(item) {
  return `${item.productId}:${item.color}:${item.size}`;
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateItemQuantity, removeItem, clearCart } = useCart();

  const whatsappHref = useMemo(() => {
    if (!items.length) {
      return `https://wa.me/${WHATSAPP_NUMBER}`;
    }

    const lines = [
      'Hola, quiero comprar estos productos de Basico Store:',
      '',
      ...items.map(
        (item) =>
          `- ${item.name} | Color: ${item.colorLabel} | Talle: ${item.size} | Cantidad: ${item.quantity}`
      ),
    ];

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [items]);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end" className="cart-drawer">
      <Offcanvas.Header closeButton className="cart-drawer__header">
        <Offcanvas.Title>Tu carrito</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="cart-drawer__body">
        {items.length ? (
          <>
            <div className="cart-drawer__items">
              {items.map((item) => {
                const itemKey = getItemKey(item);

                return (
                  <article key={itemKey} className="cart-item">
                    <div className="cart-item__media">
                      <img src={item.image} alt={item.name} className="cart-item__image" />
                    </div>

                    <div className="cart-item__content">
                      <div className="cart-item__top">
                        <div>
                          <h3 className="cart-item__title">{item.name}</h3>
                          <p className="cart-item__meta">
                            {item.colorLabel} | {item.size}
                          </p>
                        </div>

                        <button
                          type="button"
                          className="cart-item__remove"
                          onClick={() => removeItem(itemKey)}
                          aria-label={`Eliminar ${item.name} del carrito`}
                        >
                          x
                        </button>
                      </div>

                      <label className="cart-item__qty">
                        <span>Cantidad</span>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          inputMode="numeric"
                          value={item.quantity}
                          onChange={(event) => updateItemQuantity(itemKey, event.target.value)}
                          aria-label={`Cantidad para ${item.name}`}
                        />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="cart-drawer__actions">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="cart-drawer__checkout"
              >
                Finalizar compra por WhatsApp
              </a>
              <Button variant="outline-light" onClick={clearCart}>
                Vaciar carrito
              </Button>
            </div>
          </>
        ) : (
          <div className="cart-drawer__empty">
            <p>Tu carrito esta vacio.</p>
            <Button variant="light" onClick={closeCart}>
              Seguir viendo productos
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
