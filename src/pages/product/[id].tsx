import { ProductCategory, productCategories } from '@data/product'
import SmartBreadCrumb from '@comp/SmartBreadCrumb'
import { Stack, Image, Container} from '@mantine/core'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import WIP from '@comp/WIP'

interface Props {
  id: string
  product: ProductCategory 
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(productCategories).map(id => {
      return {
        params: {
          id
        }
      }
    }),
    fallback: false // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<
  Props,
  { id: string }
> = async context => {
  if (!context.params) {
    return {
      notFound: true
    }
  }

  const id = context.params.id as string
  const product = productCategories[id]

  if (!product) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      id,
      product
    }
  }
}

function ProductCard({ id, product }: Props) {
  const size = product.image?.length;
  const noteItems = product.image?.map((image) =>
    <Image key={id} alt={`${id} logo`} src={`/image/product/${image}`} />
    );

  if (size){
    return <Stack>{noteItems}</Stack>;
  } else {
    return <WIP />
  }



}

export default function Product({ id, product}: Props) {
  const size = product.image?.length;
  return (
    <Stack>
      <SmartBreadCrumb />
      <Container>
      { size? (
          <ProductCard id={id} product={product} />
      ) : (
        <ProductCard id={id} product={product} />
      ) }
      </Container>
    </Stack>
  )

}

// export default function Product({ id }: Props) {
//   return (
//     <Stack>
//       <iframe
//         style={{
//           boxSizing: 'border-box',
//           width: '100%',

//           aspectRatio: '1920 / 1200'
//         }}
//         src='https://app.powerbi.com/view?r=eyJrIjoiZTUzZThhODMtNmZkZC00NmVlLWIxN2ItN2ZjN2FmZmYxNzc4IiwidCI6ImJkM2ZjNmFlLWE0NTUtNGFlYS1hM2RiLTI4NzlkMjI1MzM4NiIsImMiOjEwfQ%3D%3D'
//       />
//     </Stack>
//   )
// }
