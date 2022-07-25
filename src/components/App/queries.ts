import { gql } from "apollo-boost";

export const categories = gql`
query {
  categories {
    name
  }
}
`