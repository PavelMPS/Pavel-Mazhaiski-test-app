import React from "react";
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";
import { Route, Routes } from "react-router-dom";

import withHocs from "./AppHOC"
import {
  AttributeType,
  CartProduct,
  MainState,
  ProductContain,
} from "../../types";
import Cart from "../Cart/Cart";
import Header from "../Header/Header";
import NotFound from "../NotFound/NotFound";
import ProductList from "../ProductList/ProductList";
import { checkTheSameProduct } from "../../utils/utilites";
import { add, remove } from "../../constants/constant";
import Welcome from "../Welcome/Welcome";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
// });

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.showMiniCartHandler = this.showMiniCartHandler.bind(this);
    this.toggleProductWindow = this.toggleProductWindow.bind(this);
    this.changeProductQuantity = this.changeProductQuantity.bind(this);
    this.changeChoosenAttributes = this.changeChoosenAttributes.bind(this);
   
    this.state = {
      currency: "USD",
      changeCurrency: this.changeCurrency,
      addToCart: this.addToCart,
      myCart: [],
      filter: localStorage.getItem('category') ? localStorage.getItem('category') : "all",
      changeCategory: this.changeCategory,
      isProductOpen: false,
      isMiniCartOpen: false,
      showMiniCartHandler: this.showMiniCartHandler,
      changeProductQuantity: this.changeProductQuantity,
      toggleProductWindow: this.toggleProductWindow,
      changeChoosenAttributes: this.changeChoosenAttributes,
    };
  }

  showMiniCartHandler(): void {
    this.setState({
      ...this.state,
      isMiniCartOpen: !this.state.isMiniCartOpen,
    });
  }

  changeCurrency(newCurrency: string): void {
    this.setState({ currency: newCurrency });
  }

  changeChoosenAttributes(attribute: string, type: string): void {
    this.setState((state: MainState) => ({...state, [type]: attribute }));
  }

  toggleProductWindow(toggler: boolean): void {
    this.setState({ ...this.state, isProductOpen: toggler });
  }

  changeProductQuantity(productId: string, action: string): void {
    let myNewCart: [] | Array<CartProduct>;
    const choosenProduct: CartProduct = this.state.myCart.filter(
      (item: CartProduct): boolean => {
        return productId === item.id;
      }
    )[0];
    if (
      choosenProduct.id &&
      choosenProduct.quantity === 1 &&
      action === remove
    ) {
      myNewCart = this.state.myCart.filter((item: CartProduct): boolean => {
        return !(productId === item.id);
      });
    } else {
      myNewCart = [...this.state.myCart];

      myNewCart.forEach((item: CartProduct): void => {
        if (productId === item.id && action === add) {
          item.quantity++;
        } else if (
          productId === item.id &&
          action === remove &&
          item.quantity > 1
        ) {
          item.quantity--;
        }
      });
    }

    this.setState((state: MainState) => ({ ...state, myCart: [...myNewCart] }));
  }

  addToCart(product: ProductContain): void {
    const newCartObject: any = {
      id: product.id + Math.random(),
      brand: product.brand,
      name: product.name,
      gallery: product.gallery,
      attributes: product.attributes,
      prices: product.prices,
      quantity: 1,
    };

    product.attributes.map((item: AttributeType): AttributeType => {
      if (this.state[item.id]) {
        newCartObject[item.id] = this.state[item.id].value;
        return item;
      } else {
        newCartObject[item.id] = "0";
        return item;
      }
    });

    const theSameProduct: CartProduct[] = checkTheSameProduct(
      this.state.myCart,
      newCartObject
    );

    if (theSameProduct.length) {
      let myNewCart: Array<CartProduct> = [...this.state.myCart];
      myNewCart.forEach((product: CartProduct, index: number): void => {
        if (
          product.name === newCartObject.name &&
          product["Size"] === newCartObject["Size"] &&
          product["Color"] === newCartObject["Color"] &&
          product["Capacity"] === newCartObject["Capacity"] &&
          product["With USB 3 ports"] === newCartObject["With USB 3 ports"] &&
          product["Touch ID in keyboard"] ===
            newCartObject["Touch ID in keyboard"]
        ) {
          myNewCart[index].quantity++;
        }
      });
      this.setState((state: MainState) => ({
        ...state,
        myCart: [...myNewCart],
      }));
    } else {
      this.setState((state: MainState) => ({
        ...state,
        myCart: [...state.myCart, newCartObject],
      }));
    }
  }

  changeCategory(newFilter: string): void {
    this.setState({ ...this.state, filter: newFilter, isProductOpen: false });
    localStorage.setItem('category', newFilter);
  }

  render(): JSX.Element {
    console.log(this.props)
    return (
      // <ApolloProvider client={client}>
        <>
        <Header {...this.state} />
        <main>
          <Routes>
            {this.props.data.loading ? '' : this.props.data.categories.map((item: any) => {
              return (
                <Route path={`/${item.name}`} element={<ProductList {...this.state} />}/>
              )
            })}
            <Route
              path="/cart"
              element={
                <Cart
                  cart={this.state.myCart}
                  currency={this.state.currency}
                  isMiniCartOpen={this.state.isMiniCartOpen}
                  changeProductQuantity={this.state.changeProductQuantity}
                  showMiniCartHandler={this.state.showMiniCartHandler}
                />
              }
            />
            <Route path="/" element={<Welcome />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        </>
      // </ApolloProvider>
    );
  }
}

export default withHocs(App);
