import React from "react";

import { getAmount, getLabel } from "../../utils/utilites";
import {
  AttributeType,
  ProductContain,
  ProductProps,
  ProductState,
} from "../../types";
import { productSettings } from "../../constants/constant";
import Attribute from "../Attributes/ProductAttribute";

import "./product.css";

class Product extends React.Component<ProductProps, ProductState> {
  constructor(props: ProductProps) {
    super(props);

    this.state = { currentPicture: "" };

    this.changeGalleryImage = this.changeGalleryImage.bind(this);
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }

  componentDidMount(): void {
    const gallery: Array<string> = this.props.choosenProduct.gallery;
    this.setState({ currentPicture: gallery[0] });
  }

  addToCartHandler(e: React.SyntheticEvent): void {
    e.stopPropagation();
    let product: ProductContain = { ...this.props.choosenProduct };
    this.props.addToCart(product);
  }

  changeGalleryImage(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    this.setState({ currentPicture: target.id });
  }

  render(): JSX.Element {
    const { choosenProduct, currency, changeChoosenAttributes } = this.props;
    const isStock: string = this.props.choosenProduct.inStock;

    return (
      <div className="product-container">
        <div className="product-gallery">
          {choosenProduct.gallery.map((picture: string): JSX.Element => {
            return (
              <div
                className="gallery-image-container"
                key={picture}
                onClick={this.changeGalleryImage}
              >
                <img
                  id={picture}
                  className="gallery-image"
                  src={picture}
                  alt="gallery painting"
                />
              </div>
            );
          })}
        </div>
        <div className="product-page-image-container">
          <img
            className="product-page-image"
            src={this.state.currentPicture}
            alt="Product foto"
          />
        </div>
        <div className="product-info">
          <div className="product-title-container">
            <div className="product-page-brand">{choosenProduct.brand}</div>
            <div className="product-page-name">{choosenProduct.name}</div>
          </div>
          {choosenProduct.attributes.map(
            (attribute: AttributeType): JSX.Element => {
              return (
                <Attribute
                  type={attribute.id}
                  changeAttr={changeChoosenAttributes}
                  key={attribute.id}
                  attribute={attribute}
                />
              );
            }
          )}

          <div className="product-price-container">
            <div className="product-price-title">{productSettings.price}</div>
            <div className="product-price-wrapper">
              <p>{getLabel(choosenProduct.prices, currency)}</p>
              <p>{getAmount(choosenProduct.prices, currency)}</p>
            </div>
          </div>
          <button 
            onClick={this.addToCartHandler} 
            disabled={!isStock} 
            className={!isStock ? "add-to-cart-btn disabled" : "add-to-cart-btn"}
          >
            {productSettings.addToCart}
          </button>
          <div className="product-description">
            {`${choosenProduct.description}`}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
