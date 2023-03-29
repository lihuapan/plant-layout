import { GetStaticProps } from 'next'

import { Retailer as IRetailer, retailers } from '@data/retailer'
import { Anchor, Breadcrumbs, Container, Stack } from '@mantine/core'

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

export default function Retailer({ id, content }: Props) {
  const items = [{ title: 'Retailers', href: '/retailer' }, { title: id }].map(
    (item, index) => (
      <Anchor href={item.href} key={index}>
        {item.title}
      </Anchor>
    )
  )
  return (
    <Container>
      <Stack>
        <Breadcrumbs>{items}</Breadcrumbs>
      </Stack>
    </Container>
  )
}
