import React from "react";

import withHocs from "./ProductListHOC";
import Product from "../Product/Product";
import { getAmount, getLabel } from "../../utils/utilites";
import { ProductContain } from "../../types";
import { productListSettings } from "../../constants/constant";

import "./productList.css";

class ProductList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = { choosingProduct: [] };

    this.handleToggle = this.handleToggle.bind(this);
    this.addToCartHandler = this.addToCartHandler.bind(this);
  }

  handleToggle(e: React.SyntheticEvent): void {
    const { toggleProductWindow, data } = this.props;
    
    toggleProductWindow(true);
    const choosingProduct = data.category.products.filter(
      (product: ProductContain): boolean => {
        const target = e.target as HTMLInputElement;
        return product.id === target.id;
      }
    );
    
    this.setState({ ...this.state, choosingProd: choosingProduct });
    
  }

  addToCartHandler(e: React.SyntheticEvent): void {
    const { addToCart, data } = this.props;
    e.stopPropagation();
    const choosingProduct = data.category.products.filter(
      (product: ProductContain): boolean => {
        const target = e.target as HTMLInputElement;
        return product.id === target.id;
      }
    )[0];
    addToCart(choosingProduct);
  }

  render(): JSX.Element {
    const {
      isProductOpen,
      data,
      filter,
      currency,
      addToCart,
      changeChoosenAttributes,
    } = this.props;

    return (
      <div className="products-list-container">
        {isProductOpen ? (
          <Product
            choosenProduct={this.state.choosingProd[0]}
            currency={currency}
            addToCart={addToCart}
            changeChoosenAttributes={changeChoosenAttributes}
          />
        ) : (
          <div>
            <h1 className="category-title">{filter.toUpperCase()}</h1>
            {data.loading ? (
              <div className="loading">{productListSettings.loading}</div>
            ) : (
              <div className="cards-container">
                {data.category.products
                  .filter((item: ProductContain) => {
                    if (filter === "all") {
                      return item;
                    } else {
                      return item.category === filter;
                    }
                  })
                  .map((product: ProductContain): JSX.Element => {
                    return (
                      <div
                        className="card"
                        key={product.id}
                        onClick={this.handleToggle}
                        id={product.id}
                        style={
                          product.inStock
                            ? {}
                            : { opacity: "0.5" }
                        }
                      >
                        {product.attributes.length ? (
                          ""
                        ) : (
                          <div
                            className="cart-on-card"
                            id={product.id}
                            onClick={this.addToCartHandler}
                          ></div>
                        )}
                        <div className="product-image">
                          {product.inStock ? (
                            ""
                          ) : (
                            <span className="out-of-stock">
                              {productListSettings.outOfStock}
                            </span>
                          )}
                          <img
                            className="image"
                            src={product.gallery[0]}
                            alt={product.name}
                          />
                        </div>
                        <div className="product-name">
                          {product.brand} {product.name}
                        </div>
                        <div className="product-price">
                          <div className="price-label">
                            {getLabel(product.prices, currency)}
                          </div>
                          <div className="price-amount">
                            {getAmount(product.prices, currency)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withHocs(ProductList);
