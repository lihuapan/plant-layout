import { RetailerWithId, retailers } from '@data/retailer'
import {
  Card,
  Container,
  Image,
  SimpleGrid,
  Stack,
  Title,
  useMantineTheme
} from '@mantine/core'

export default function Retailer() {
  const t = useMantineTheme()

  return (
    <Container my="2rem">
      <Stack>
        <Title order={2} mb="lg">
          Retailer Dashboards
        </Title>
        <SimpleGrid
          breakpoints={[
            { maxWidth: t.breakpoints.xs, cols: 1 },
            { maxWidth: t.breakpoints.sm, cols: 2 },
            { minWidth: t.breakpoints.sm, cols: 3 }
          ]}
        >
          {Object.entries(retailers).map(([k, v]) => {
            return <RetailerCard key={k} id={k} {...v} />
          })}
        </SimpleGrid>
      </Stack>
    </Container>
  )
}

function RetailerCard({ id }: RetailerWithId) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      component="a"
      href={`/retailer/${id}`}
      sx={{
        'transition': 'transform 0.2s ease-in-out',
        ':hover': {
          transform: 'scale(1.02)'
        }
      }}
    >
      <Image
        alt={`${id} logo`}
        src={`/logos/${id}.svg`}
        height={80}
        fit="contain"
        p="md"
      />
    </Card>
  )
}
