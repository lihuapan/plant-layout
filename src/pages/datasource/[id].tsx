import SmartBreadCrumb from '@comp/SmartBreadCrumb'
import { DataSource, dataSources } from '@data/datasoruce'

import { Stack, Text } from '@mantine/core'
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
      <SmartBreadCrumb />
      <Text span color='dark' size={'lg'}>
        RSI EMPOWERS LEADING CPG MANUFACTURERS AND RETAILERS With the
        intelligence they need to flawlessly manage their on-shelf availability
        and retail sales across their product portfolio, delivering measurable
        ROI and increased profits to their organizations.
      </Text>
    </Stack>
  )
}
