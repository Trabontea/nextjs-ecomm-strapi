import { useQuery } from 'urql'
import { GET_PRODUCT_QUERY } from '../../lib/query'
import { useRouter } from 'next/router'
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from '../../styles/ProductDetails'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { useStateContext } from '../../lib/context'
import toast from 'react-hot-toast'

export default function ProductDetails() {
  // use State
  const { qty, increaseQty, decreaseQty, onAdd } = useStateContext()
  console.log(qty)

  //Fetch Slug
  const { query } = useRouter()
  //console.log(query)

  // Fetch Graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  })

  const { data, fetching, error } = results

  //Check for the data coming in
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no ...{error.message}</p>
  // extract Data
  console.log('data', data)
  const { title, description, image, price } = data.products.data[0].attributes

  // Create a toast
  const notify = () => {
    toast.success(`${title} added to your cart`, { duration: 1500 })
  }

  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{price}</p>

        <Quantity>
          <span>Quantity:</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty)
            notify()
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  )
}
