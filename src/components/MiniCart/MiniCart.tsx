import React from "react";
import { Link } from "react-router-dom";

import {
  add,
  hundredIndex,
  miniCartSettings,
  remove,
} from "../../constants/constant";
import { AttributeType, CartProduct, MiniCartProps } from "../../types";
import { getAmount, getLabel, getProductQuantity } from "../../utils/utilites";
import AttributesBlock from "../Attributes/CartAttributes";

import "./miniCart.css";

class MiniCart extends React.Component<MiniCartProps, {}> {
  constructor(props: MiniCartProps) {
    super(props);

    this.miniCartClose = this.miniCartClose.bind(this);
    this.addQuantityHandler = this.addQuantityHandler.bind(this);
    this.removeQuantityHandler = this.removeQuantityHandler.bind(this);
  }

  miniCartClose(e: React.SyntheticEvent): void {
    if (e.currentTarget === e.target) this.props.closeMiniCart();
  }

  addQuantityHandler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    this.props.changeProductQuantity(target.id, add);
  }

  removeQuantityHandler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    this.props.changeProductQuantity(target.id, remove);
  }

  viewCartHandler(): void {
    this.props.closeMiniCart();
  }

  render(): JSX.Element {
    const { cart, currency } = this.props;
    let totalPrice: number = 0;
    let label: string = "";
    if (cart[0]) {
      label = getLabel(cart[0].prices, currency);
    }

    return (
      <div className="mini-cart-overlay" onClick={this.miniCartClose}>
        <div className="mini-cart">
          <div className="mini-cart-container">
            <h2 className="mini-cart-title">
              <span className="my-bag">{miniCartSettings.title}</span>{" "}
              {getProductQuantity(cart)} {miniCartSettings.subtitle}
            </h2>
            {cart.length ? (
              <div>
                <div className="mini-cart-product-container">
                  {cart.map((product: CartProduct): JSX.Element => {
                    const price = getAmount(product.prices, currency);
                    totalPrice += +price * product.quantity;
                    return (
                      <div className="mini-cart-product" key={product.id}>
                        <div className="mini-cart-info">
                          <div className="mini-cart-product-title">
                            <div className="mini-cart-product-brand">
                              {product.brand}
                            </div>
                            <div className="mini-cart-product-name">
                              {product.name}
                            </div>
                          </div>

                          <div className="mini-cart-price-container">
                            <div className="mini-cart-symbol">
                              {getLabel(product.prices, currency)}
                            </div>
                            <div className="mini-cart-amount">{price}</div>
                          </div>

                          <div className="mini-cart-attributes">
                            {product.attributes.map(
                              (attribute: AttributeType): JSX.Element => {
                                return (
                                  <div
                                    className="attributes-container"
                                    key={attribute.id}
                                  >
                                    <div className="attribute-title">
                                      {attribute.name}
                                    </div>
                                    <div className="attributes-items-container">
                                      <AttributesBlock
                                        attribute={attribute}
                                        product={product}
                                        type={"Mini cart"}
                                      />
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                        <div className="mini-cart-quantity">
                          <div
                            className="plus-square"
                            id={product.id}
                            onClick={this.addQuantityHandler}
                          ></div>
                          <div className="product-quantity">
                            {product.quantity}
                          </div>
                          <div
                            className="minus-square"
                            id={product.id}
                            onClick={this.removeQuantityHandler}
                          ></div>
                        </div>
                        <div
                          className="mini-cart-image-container"
                          style={{
                            backgroundImage: `url(${product.gallery[0]})`,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            {!cart.length ? (
              ""
            ) : (
              <div className="bottom-container">
                <div className="total-price">
                  <div className="total-title">{miniCartSettings.total}</div>
                  <div className="total-price-amount">
                    {label}
                    {Math.round(totalPrice * hundredIndex) / hundredIndex}
                  </div>
                </div>
                <div className="buttons-container">
                  <Link to={"/cart"}>
                    <button className="view-bag-btn">
                      {miniCartSettings.viewBag}
                    </button>
                  </Link>
                  <button className="check-out-btn">
                    {miniCartSettings.checkOut}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCart;
