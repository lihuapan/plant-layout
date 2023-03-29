import { GetStaticProps } from 'next'

import { Retailer as IRetailer, retailers } from '@data/retailer'
import WIP from '@comp/WIP'

interface Props {
  id: string
  content: IRetailer
}

export async function getStaticPaths() {
  return {
    paths: Object.entries(retailers).map(([key, value]) => {
      return {
        params: {
          id: key
        }
      }
    }),
    fallback: false // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<
  Props,
  { id: string }
> = context => {
  if (!context.params) {
    return {
      notFound: true
    }
  }
  return {
    // Passed to the page component as props
    props: {
      id: context.params.id,
      content: retailers[context.params.id]
    }
  }
}

export default function Retailer({ id }: Props) {
  return <WIP />
}
