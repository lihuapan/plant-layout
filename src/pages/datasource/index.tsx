import { DataSource, dataSources } from '@data/datasoruce'
import {
  Card,
  Container,
  Image,
  SimpleGrid,
  Stack,
  Title,
  useMantineTheme
} from '@mantine/core'
import Link from 'next/link'

export default function DataSources() {
  const t = useMantineTheme()

  return (
    <Container my='2rem'>
      <Stack>
        <Title order={2} mb='lg'>
          Data Sources
        </Title>
        <SimpleGrid
          breakpoints={[
            { maxWidth: t.breakpoints.xs, cols: 1 },
            { maxWidth: t.breakpoints.sm, cols: 2 },
            { minWidth: t.breakpoints.sm, cols: 3 }
          ]}
        >
          {Object.entries(dataSources).map(([k, v]) => {
            return <ProductCard key={k} id={k} {...v} />
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

function ProductCard({ id }: DataSource & { id: string }) {
  return (
    <Link href={`/datasource/${id}`} passHref legacyBehavior>
      <Card
        shadow='sm'
        padding='lg'
        radius='md'
        withBorder
        component='a'
        sx={{
          'transition': 'transform 0.2s ease-in-out',
          ':hover': {
            transform: 'scale(1.02)'
          }
        }}
      >
        <Image
          alt={`${id} logo`}
          src={`/image/datasource/${id}.png`}
          height={80}
          fit='contain'
          p='md'
        />
      </Card>
    </Link>
  )
}
