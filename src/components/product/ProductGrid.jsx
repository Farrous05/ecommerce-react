import { Boundary, MessageDisplay } from '@/components/common';
import { useBasket, useFadeInAnimation } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/actions/miscActions';
import ProductItem from './ProductItem';

const ProductGrid = ({ products }) => {
  const { addToBasket, isItemOnBasket } = useBasket();
  const dispatch = useDispatch();
  
  // Enable fade-in animation for product cards
  useFadeInAnimation({
    targetSelector: '.product-card-wrapper',
    threshold: 0.1
  });

  useEffect(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <Boundary>
      <div className="product-grid">
        {products.length === 0 ? (
          new Array(12).fill({}).map((product, index) => (
            <div 
              // eslint-disable-next-line react/no-array-index-key
              key={`product-skeleton-${index}`}
              className="fade-in-section product-card-wrapper"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <ProductItem product={product} />
            </div>
          ))
        ) : (
          products.map((product, index) => (
            <div 
              key={product.id}
              className="fade-in-section product-card-wrapper"
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <ProductItem
                isItemOnBasket={isItemOnBasket}
                addToBasket={addToBasket}
                product={product}
              />
            </div>
          ))
        )}
      </div>
    </Boundary>
  );
};

ProductGrid.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  products: PropType.array.isRequired
};

export default ProductGrid;
