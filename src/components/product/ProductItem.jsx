import { CheckOutlined, EyeOutlined, HeartOutlined, ShoppingOutlined } from '@ant-design/icons';
import { ImageLoader, Badge as StatusBadge } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { useImageOrientation } from '@/hooks';

const ProductItem = ({ product, isItemOnBasket, addToBasket }) => {
  const history = useHistory();
  const { orientationClass } = product && product.image 
    ? useImageOrientation(product.image) 
    : { orientationClass: 'product-card--square' };
  
  const [currentImage, setCurrentImage] = useState(product?.image || '');
  const [isHovered, setIsHovered] = useState(false);

  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      history.push(`/product/${product.id}`);
    }
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(product.id) : false;

  const handleAddToBasket = (e) => {
    e.stopPropagation();
    if (addToBasket) addToBasket({ ...product, selectedSize: product.sizes[0] });
  };
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImage(product.image);
  };
  
  const handleVariantHover = (e, variantImage) => {
    e.stopPropagation();
    setCurrentImage(variantImage);
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`product-card ${orientationClass} ${!product.id ? 'product-loading' : ''} ${isHovered ? 'is-hovered' : ''}`}
        style={{
          border: product && itemOnBasket ? '1px solid #a6a5a5' : '',
          boxShadow: product && itemOnBasket ? '0 15px 30px rgba(0, 0, 0, .1)' : ''
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {itemOnBasket && <CheckOutlined className="fa fa-check product-card-check" />}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {product.image ? (
              <>
                <ImageLoader
                  alt={product.name}
                  className="product-card-img"
                  src={currentImage || product.image}
                />
                
                {isHovered && (
                  <div className="product-card-actions">
                    <button 
                      type="button"
                      className="product-card-action"
                      onClick={handleAddToBasket}
                    >
                      <ShoppingOutlined />
                    </button>
                    <button 
                      type="button"
                      className="product-card-action"
                      onClick={onClickItem}
                    >
                      <EyeOutlined />
                    </button>
                    <button 
                      type="button"
                      className="product-card-action"
                    >
                      <HeartOutlined />
                    </button>
                  </div>
                )}

                {/* Product badges */}
                {product.onSale && (
                  <div className="product-card-badge product-card-badge--sale">
                    Sale
                  </div>
                )}
                
                {product.isNew && (
                  <div className="product-card-badge product-card-badge--new">
                    New
                  </div>
                )}
                
                {product.isBestSeller && (
                  <div className="product-card-badge product-card-badge--best">
                    Best Seller
                  </div>
                )}
              </>
            ) : <Skeleton width="100%" height="100%" />}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {product.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {product.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {product.price ? (
                <>
                  {product.onSale && product.salePrice ? (
                    <>
                      <span className="product-card-price--del">{displayMoney(product.price)}</span>
                      &nbsp;{displayMoney(product.salePrice)}
                    </>
                  ) : (
                    displayMoney(product.price)
                  )}
                </>
              ) : <Skeleton width={40} />}
            </h4>
            
            {/* Variant Preview */}
            {product.variants && product.variants.length > 0 && (
              <div className="product-card-variants">
                {product.variants.slice(0, 4).map((variant, index) => (
                  <div 
                    key={index}
                    className="product-card-variant"
                    style={{ backgroundColor: variant.color || '#000' }}
                    onMouseEnter={(e) => handleVariantHover(e, variant.image)}
                    role="presentation"
                  />
                ))}
                {product.variants.length > 4 && (
                  <div className="product-card-variant product-card-variant--more">
                    +{product.variants.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {product.id && (
          <button
            className={`product-card-button button-small button button-block ${itemOnBasket ? 'button-border-gray' : ''}`}
            onClick={handleAddToBasket}
            type="button"
          >
            {itemOnBasket ? 'Remove from basket' : 'Add to basket'}
          </button>
        )}
      </div>
    </SkeletonTheme>
  );
};

ProductItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined
};

ProductItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func
};

export default ProductItem;
