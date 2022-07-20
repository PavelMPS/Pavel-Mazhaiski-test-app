import React from "react";
import { Link } from "react-router-dom";

import withHocs from "./HeaderHOC";
import { Categorie, Currency } from "../../types";
import MiniCart from "../MiniCart/MiniCart";
import { getHeaderLabel, getProductQuantity } from "../../utils/utilites";

import "./header.css";

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.showMiniCart = this.showMiniCart.bind(this);
    this.selectCurrencyHandler = this.selectCurrencyHandler.bind(this);
    this.changeCategoryHadler = this.changeCategoryHadler.bind(this);
  }

  changeCategoryHadler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    if (target.id) this.props.changeCategory(target.id);
  }

  selectCurrencyHandler(e: React.SyntheticEvent): void {
    const target = e.target as HTMLInputElement;
    this.props.changeCurrency(target.value);
  }

  showMiniCart(): void {
    this.props.showMiniCartHandler();
  }

  render(): JSX.Element {
    const headerProps = this.props;

    return (
      <>
        <header>
          <div className="header-container">
            <div className="navigation-container">
              <div className="navigation" onClick={this.changeCategoryHadler}>
                {headerProps.data.loading
                  ? ""
                  : headerProps.data.categories.map(
                      (categorie: Categorie): JSX.Element => {
                        return (
                          <Link
                            to={"/"}
                            className="navigation-link"
                            id={categorie.name}
                            key={categorie.name}
                            style={{
                              color: `${
                                headerProps.filter === categorie.name
                                  ? "#5ECE7B"
                                  : "black"
                              }`,
                              borderBottom: `${
                                headerProps.filter === categorie.name
                                  ? "2px solid #5ece7b"
                                  : "none"
                              }`,
                            }}
                          >
                            {categorie.name}
                          </Link>
                        );
                      }
                    )}
              </div>
            </div>
            <div className="header-logo"></div>
            <div className="header-utils">
              <div>
                {headerProps.data.loading ? (
                  ""
                ) : (
                  <>
                    <div className="label-currency">
                      {getHeaderLabel(
                        headerProps.data.currencies,
                        this.props.currency
                      )}
                    </div>
                    <div className="select-arrow"></div>
                    <select
                      className="currency"
                      name="currency"
                      id="currency"
                      onChange={this.selectCurrencyHandler}
                    >
                      {headerProps.data.currencies.map(
                        (item: Currency): JSX.Element => {
                          return (
                            <option key={item.label} value={item.label}>
                              {item.symbol} {item.label}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </>
                )}
              </div>
              <div className="cart" onClick={this.showMiniCart}>
                {headerProps.myCart.length ? (
                  <div className="cart-indicator">
                    <div>{getProductQuantity(this.props.myCart)}</div>
                  </div>
                ) : (
                  " "
                )}
              </div>
            </div>
          </div>
        </header>
        {this.props.isMiniCartOpen ? (
          <MiniCart
            cart={headerProps.myCart}
            currency={headerProps.currency}
            changeProductQuantity={headerProps.changeProductQuantity}
            closeMiniCart={this.props.showMiniCartHandler}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withHocs(Header);
