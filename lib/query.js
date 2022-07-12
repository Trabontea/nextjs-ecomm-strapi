export const PRODUCT_QUERY = `
  query {
    products {
      data {
        attributes {
          title
          description
          price
          slug
          image {
            data {
              attributes {
                formats
                url
              }
            }
          }
        }
      }
    }
  }
`

export const GET_PRODUCT_QUERY = `
  query getProduct($slug: String!) {
    products(filters: {slug: {eq: $slug}}) {
      data {
        attributes{
          title,
          slug,
          description,
          price,
          image{
            data{
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }
`
