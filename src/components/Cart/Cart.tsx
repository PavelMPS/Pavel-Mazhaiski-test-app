import React from "react";

import {
  getAmount,
  getLabel,
  getProductQuantity,
  getTaxingTotal,
} from "../../utils/utilites";
import CartGallery from "./CartGallery";
import AttributesBlock from "../Attributes/CartAttributes";
import { AttributeType, CartProduct, CartProps } from "../../types";
import {
  add,
  cartSettings,
  hundredIndex,
  remove,
} from "../../constants/constant";

import "./cart.css";

class Cart extends React.Component<CartProps, {}> {
  constructor(props: CartProps) {
    super(props);

    this.addQuantityHandler = this.addQuantityHandler.bind(this);
    this.removeQuantityHandler = this.removeQuantityHandler.bind(this);
  }

  componentDidMount(): void {
    if (this.props.isMiniCartOpen) this.props.showMiniCartHandler();
  }

  addQuantityHandler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    this.props.changeProductQuantity(target.id, add);
  }

  removeQuantityHandler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    this.props.changeProductQuantity(target.id, remove);
  }

  render(): JSX.Element {
    const { cart, currency } = this.props;
    let totalPrice: number = 0;
    let label: string = "";
    if (cart[0]) {
      label = getLabel(cart[0].prices, currency);
    }

    return (
      <>
        <div className="cart-container">
          <h1 className="cart-title">{cartSettings.name}</h1>
          <div className="cart-grey-line"></div>
          {!cart.length ? (
            <div className="no-products-msg">{cartSettings.noProduct}</div>
          ) : (
            cart.map((product: CartProduct): JSX.Element => {
              const price = getAmount(product.prices, currency);
              totalPrice += +price * product.quantity;
              return (
                <div key={product.id}>
                  <div className="cart-product">
                    <div className="cart-product-info">
                      <div className="cart-product-title">
                        <div className="cart-product-brand">
                          {product.brand}
                        </div>
                        <div className="cart-product-name">{product.name}</div>
                      </div>

                      <div className="cart-price-container">
                        <div className="cart-symbol">
                          {getLabel(product.prices, currency)}
                        </div>
                        <div className="cart-amount">{price}</div>
                      </div>

                      <div className="cart-attributes">
                        {product.attributes.map(
                          (attribute: AttributeType): JSX.Element => {
                            return (
                              <div
                                className="cart-attributes-container"
                                key={attribute.id}
                              >
                                <div className="cart-attribute-title">
                                  {attribute.name}
                                </div>
                                <div className="cart-attributes-items-container">
                                  <AttributesBlock
                                    attribute={attribute}
                                    product={product}
                                    type={"Cart"}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                    <div className="cart-right-side">
                      <div className="cart-quantity">
                        <div
                          className="cart-plus-square"
                          id={product.id}
                          onClick={this.addQuantityHandler}
                        ></div>
                        <div className="cart-product-quantity">
                          {product.quantity}
                        </div>
                        <div
                          className="cart-minus-square"
                          id={product.id}
                          onClick={this.removeQuantityHandler}
                        ></div>
                      </div>
                      <CartGallery gallery={product.gallery} />
                    </div>
                  </div>
                  <div className="cart-grey-line"></div>
                </div>
              );
            })
          )}
          {!cart.length ? (
            ""
          ) : (
            <div className="cart-order-container">
              <div className="tax-container">
                <div className="cart-tax">{cartSettings.taxTitle}</div>
                <div className="taxing-price">
                  {label}
                  {getTaxingTotal(totalPrice, cartSettings.taxCount)}
                </div>
              </div>

              <div className="big-cart-quantity">
                {cartSettings.quantity}
                <b>{getProductQuantity(cart)}</b>
              </div>

              <div className="cart-total-container">
                <div className="cart-total">{cartSettings.total}</div>
                <div className="cart-total-price">
                  {label}
                  {Math.round(totalPrice * hundredIndex) / hundredIndex}
                </div>
              </div>

              <button className="cart-order">{cartSettings.order}</button>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Cart;
