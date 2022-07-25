export type Currency = {
  label: string;
  symbol: string;
  __typename: string;
};

export type Price = {
  amount: number;
  currency: Currency;
  __typename: string;
};

export type Categorie = {
  name: string;
  __typename: string;
};

export type AttributeItem = {
  displayValue: string;
  id: string;
  value: string;
};

export type AttributeType = {
  id: string;
  items: Array<AttributeItem>;
  name: string;
  type: string;
};

export type ProductContain = {
  attributes: Array<AttributeType>;
  brand: string;
  category: string;
  description: string;
  gallery: Array<string>;
  id: string;
  inStock: string;
  name: string;
  prices: Array<Price>;
  __typename: string;
};

export type CartProduct = {
  Size?: string;
  Capacity?: string;
  "Touch ID in keyboard"?: string;
  "With USB 3 ports"?: string;
  Color?: string;
  attributes: Array<AttributeType>;
  brand: string;
  gallery: Array<string>;
  id: string;
  name: string;
  prices: Array<Price>;
  quantity: number;
};

export type AttributeValues = {
  Size?: string;
  Capacity?: string;
  "Touch ID in keyboard"?: string;
  "With USB 3 ports"?: string;
  Color?: string;
};

export type MainState = {
  Size?: string;
  Capacity?: string;
  "Touch ID in keyboard"?: string;
  "With USB 3 ports"?: string;
  Color?: string;
  currency: string;
  changeCurrency: (newCurrency: string) => void;
  addToCart: (product: any) => void;
  myCart: Array<CartProduct>;
  filter: string;
  isProductOpen: boolean;
  isMiniCartOpen: boolean;
  changeCategory: (newFilter: string) => void;
  showMiniCartHandler: () => void;
  changeProductQuantity: (productId: string, action: string) => void;
  toggleProductWindow: (toggler: boolean) => void;
  changeChoosenAttributes: (attribute: any, type: string) => void;
};

export type ProductState = {
  currentPicture: string;
};

export type GalleryState = {
  choosingImage: string;
  counter: number;
}

export type CartProps = {
  cart: Array<CartProduct>;
  currency: string;
  isMiniCartOpen: boolean;
  changeProductQuantity: (productId: string, action: string) => void;
  showMiniCartHandler: () => void;
};

export type MiniCartProps = {
  cart: Array<CartProduct>;
  currency: string;
  changeProductQuantity: (productId: string, action: string) => void;
  closeMiniCart: () => void;
};

export type Sizes = {
  displayValue: string;
  value: string;
  id: string;
};

export type ProductProps = {
  choosenProduct: ProductContain;
  currency: string;
  addToCart: (product: any) => void;
  changeChoosenAttributes: (attribute: any, type: string) => void;
};

export type AttributeBlockProps = {
  attribute: AttributeType;
  product: CartProduct;
  type: string;
}

export type ProductAttributeProps = {
  attribute: AttributeType;
  changeAttr: (attribute: { value: string }, type: string) => void;
  type: string;
}


export type GalleryProps = {
  gallery: Array<string>;
}
