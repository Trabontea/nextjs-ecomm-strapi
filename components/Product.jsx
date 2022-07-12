import { ProductStyle } from '../styles/ProductStyle'
import Link from 'next/link'

export default function Product({ product }) {
  // Extract the info from props
  const { title, price, image, slug } = product.attributes
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={image.data.attributes.formats.thumbnail.url} alt="" />
        </div>
      </Link>
      <h3>{title}</h3>
      <h3>{price}</h3>
    </ProductStyle>
  )
}
