import { DataSource, dataSources } from '@data/datasoruce'

import { Stack } from '@mantine/core'
import { GetStaticProps } from 'next'

interface Props {
  id: string
  product: DataSource
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(dataSources).map(id => {
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
  const product = dataSources[id]

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

export default function PowerBI({ id }: Props) {
  return (
    <Stack>
      <iframe
        style={{
          boxSizing: 'border-box',
          width: '100%',

          aspectRatio: '1920 / 1200'
        }}
        src='https://app.powerbi.com/view?r=eyJrIjoiZTUzZThhODMtNmZkZC00NmVlLWIxN2ItN2ZjN2FmZmYxNzc4IiwidCI6ImJkM2ZjNmFlLWE0NTUtNGFlYS1hM2RiLTI4NzlkMjI1MzM4NiIsImMiOjEwfQ%3D%3D'
      />
    </Stack>
  )
}
