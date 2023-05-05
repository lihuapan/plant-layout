import { PlantLayout, plantlayouts } from '@data/plantlayout'
import {
  Card,
  Container,
  SimpleGrid,
  Stack,
  Title,
  useMantineTheme
} from '@mantine/core'
import Link from 'next/link'

export default function Retailer() {
  const t = useMantineTheme()

  return (
    <Container my='2rem'>
      <Stack>
        <Title order={2} mb='lg'>
        Plant Layout Demo
        </Title>
        <SimpleGrid
          breakpoints={[
            { maxWidth: t.breakpoints.xs, cols: 1 },
            { maxWidth: t.breakpoints.sm, cols: 2 },
            { minWidth: t.breakpoints.sm, cols: 3 }
          ]}
        >
          {Object.entries(plantlayouts).map(([k, v]) => {
            return <PlantCard key={k} id={k} {...v} />
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

function PlantCard({ id }: PlantLayout & { id: string }) {
  return (
    <Link href={`/plantlayout/${id}`} passHref legacyBehavior>
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
        <Title order={5} align="center">
        {id}
        </Title>
      </Card>
    </Link>
  )
}
