import { gql } from "apollo-boost";

export const categoriesQuery = gql`
query {
  category {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`;


export const categoriesName = gql`
query {
  categories {
    name
  }
}
`;
