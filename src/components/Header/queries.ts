import { gql } from "apollo-boost";

export const currencies = gql`
query {
  categories {
    name
  }
  currencies {
    label
    symbol
  }
}
`
