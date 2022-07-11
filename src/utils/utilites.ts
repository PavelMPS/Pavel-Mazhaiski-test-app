import { hundredIndex } from "../constants/constant";
import { CartProduct, Price } from "../types";

export function getLabel(prices: Array<Price>, currentLabel: string): string {
  return prices.filter((el: Price): boolean => {
    return el.currency.label === currentLabel;
  })[0].currency.symbol;
}

export function getAmount(prices: Array<Price>, currentLabel: string): number {
  return prices.filter((el: Price): boolean => {
    return el.currency.label === currentLabel;
  })[0].amount;
}

export function cutTegs(str: string): string {
  const regex: RegExp = /( |<([^>]+)>)/gi,
    result = str.replace(regex, " ");
  return result;
}

export function getProductQuantity(cart: Array<CartProduct>): number {
  let count: number = 0;
  cart.map((item: CartProduct): void => {
    count = item.quantity + count;
  });
  return count;
}

export function getTaxingTotal(totalPrice: number, tax: number): number {
  return (
    Math.round((totalPrice / hundredIndex) * tax * hundredIndex) / hundredIndex
  );
}

export function checkTheSameProduct(
  cart: Array<CartProduct>,
  newCartObject: CartProduct
): CartProduct[] {
  return cart.filter((item: CartProduct): boolean => {
    return (
      item.name === newCartObject.name &&
      item["Size"] === newCartObject["Size"] &&
      item["Color"] === newCartObject["Color"] &&
      item["Capacity"] === newCartObject["Capacity"] &&
      item["With USB 3 ports"] === newCartObject["With USB 3 ports"] &&
      item["Touch ID in keyboard"] === newCartObject["Touch ID in keyboard"]
    );
  });
}
