import { useMemo, useState } from 'react';
import basicBlack from '../../../assets/basicblack.png';
import basicWhite from '../../../assets/basicwhite.png';
import basicGrey from '../../../assets/basicgrey.png';
import basicTopo from '../../../assets/basictopo.png';
import { useCart } from '../../../context/useCart';
import './BasicoStoreBanner.css';

const SHIRTS = [
  { id: 'black', name: 'Negra', image: basicBlack, tone: 'dark' },
  { id: 'white', name: 'Blanca', image: basicWhite, tone: 'light' },
  { id: 'grey', name: 'Gris', image: basicGrey, tone: 'mid' },
  { id: 'topo', name: 'Topo', image: basicTopo, tone: 'mid' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const QUICK_QUANTITIES = [1, 2, 3, 6, 12];

const BasicoStoreBanner = () => {
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const { addItem } = useCart();

  const activeShirt = useMemo(
    () => SHIRTS.find((shirt) => shirt.id === selectedColor) || SHIRTS[0],
    [selectedColor]
  );

  const orderedShirts = useMemo(() => {
    const selected = SHIRTS.find((shirt) => shirt.id === selectedColor);
    const rest = SHIRTS.filter((shirt) => shirt.id !== selectedColor);
    return selected ? [selected, ...rest] : SHIRTS;
  }, [selectedColor]);

  const handleAddToCart = () => {
    const normalizedQuantity = Math.max(1, Number(selectedQuantity) || 1);

    addItem({
      productId: 'basico-store-remera',
      name: 'Remera Basico Store',
      color: activeShirt.id,
      colorLabel: activeShirt.name,
      size: selectedSize,
      quantity: normalizedQuantity,
      image: activeShirt.image,
    });

    setFeedbackMessage(
      `${normalizedQuantity} ${normalizedQuantity > 1 ? 'unidades agregadas' : 'unidad agregada'} al carrito`
    );
  };

  return (
    <section className="basico-banner">
      <div className="basico-banner__inner">
        <div className="basico-banner__content">
          <p className="basico-banner__eyebrow">Nuevo en el taller</p>
          <h2 className="basico-banner__title">Basico Store</h2>
          <p className="basico-banner__subtitle">
            Remeras lisas, listas para estampar, personalizar o revender.
          </p>

          <ul className="basico-banner__features">
            <li>Algodon premium y comodas al tacto</li>
            <li>Ideales para serigrafia, vinilo textil y DTF</li>
            <li>Stock continuo en talles y colores clave</li>
          </ul>

          <div className="basico-banner__selectors" aria-label="Configuracion rapida de basicos">
            <div className="basico-selector-group">
              <span className="basico-selector-label">Color</span>
              <div className="basico-pills" role="radiogroup" aria-label="Seleccion de color">
                {SHIRTS.map((shirt) => (
                  <button
                    key={shirt.id}
                    type="button"
                    className={`basico-pill ${selectedColor === shirt.id ? 'active' : ''}`}
                    onClick={() => setSelectedColor(shirt.id)}
                    role="radio"
                    aria-checked={selectedColor === shirt.id}
                  >
                    {shirt.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="basico-selector-group">
              <span className="basico-selector-label">Talle</span>
              <div className="basico-pills" role="radiogroup" aria-label="Seleccion de talle">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`basico-pill basico-pill--size ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    role="radio"
                    aria-checked={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="basico-selector-group">
              <span className="basico-selector-label">Cantidad</span>
              <div className="basico-pills" role="radiogroup" aria-label="Seleccion de cantidad">
                {QUICK_QUANTITIES.map((quantity) => (
                  <button
                    key={quantity}
                    type="button"
                    className={`basico-pill basico-pill--size ${Number(selectedQuantity) === quantity ? 'active' : ''}`}
                    onClick={() => setSelectedQuantity(quantity)}
                    role="radio"
                    aria-checked={Number(selectedQuantity) === quantity}
                  >
                    {quantity}
                  </button>
                ))}
              </div>

              <label className="basico-quantity-input">
                <span className="visually-hidden">Ingresar cantidad exacta</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  value={selectedQuantity}
                  onChange={(event) => setSelectedQuantity(event.target.value)}
                  onBlur={() => setSelectedQuantity((current) => Math.max(1, Number(current) || 1))}
                  aria-label="Cantidad exacta"
                />
              </label>
            </div>
          </div>

          <div className="basico-banner__actions">
            <button type="button" className="basico-banner__cta" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
            <span className="basico-banner__hint">
              Color seleccionado: {activeShirt.name} | Talle: {selectedSize} | Cantidad: {selectedQuantity}
            </span>
            {feedbackMessage ? (
              <span className="basico-banner__feedback">{feedbackMessage}</span>
            ) : null}
          </div>
        </div>

        <div className="basico-banner__visual">
          <div className="shirt-stack" aria-label="Vista previa de remeras basicas">
            {orderedShirts.map((shirt, index) => (
              <button
                key={shirt.id}
                type="button"
                className={`shirt shirt--layer-${index} ${selectedColor === shirt.id ? 'is-active' : ''}`}
                onClick={() => setSelectedColor(shirt.id)}
                aria-label={`Seleccionar remera ${shirt.name.toLowerCase()}`}
              >
                <img src={shirt.image} alt={`Remera basica ${shirt.name.toLowerCase()}`} className="shirt-image" />
              </button>
            ))}
          </div>

          <div className="basico-banner__tag">Remeras lisas</div>
        </div>
      </div>
    </section>
  );
};

export default BasicoStoreBanner;
