import { GetStaticProps } from 'next'
import { forwardRef, useEffect } from 'react'
import useFitText, { TOptions } from 'use-fit-text'

import WIP from '@comp/WIP'
import {
  buildStat,
  Retailer as IRetailer,
  RetailerDetail,
  retailers,
  RetailerStat as IRetailerStat,
  RetailerSummary
} from '@data/retailer'
import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextProps,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core'
import { SkuPerformance } from '@data/retailer'

interface Props {
  id: string
  content: IRetailer
  stat: IRetailerStat | null
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
> = async context => {
  if (!context.params) {
    return {
      notFound: true
    }
  }

  const id = context.params.id

  return {
    // Passed to the page component as props
    props: {
      id: id,
      content: retailers[id],
      stat: retailers[id]?.data
        ? buildStat(retailers[id].data as RetailerDetail[])
        : null
    }
  }
}

export default function Retailer({ id, content, stat }: Props) {
  const breadcrumbItems = [
    { title: 'Retailers', href: '/retailer' },
    { title: id }
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ))

  useEffect(() => {
    console.log(content)
  })

  return (
    <Stack spacing="2rem">
      <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
      {stat ? <StatSummary summary={stat.summary} /> : <WIP />}
      {stat ? <SKUPerformance performance={stat.skuPerf} /> : <WIP />}
    </Stack>
  )
}

function StatSummary({
  summary
}: {
  summary: Record<string, RetailerSummary>
}) {
  const t = useMantineTheme()

  return (
    <SimpleGrid
      spacing="md"
      breakpoints={[
        { maxWidth: t.breakpoints.sm, cols: 2 },
        { minWidth: t.breakpoints.sm, cols: 4 },
        { minWidth: '100em', cols: 8 }
      ]}
    >
      {Object.entries(summary).map(([key, item], i) => {
        return (
          <Tooltip
            label={item.hover ?? key}
            key={i}
            position="bottom"
            withArrow
            color="dark"
          >
            <Box bg="green" display={'inline-block'} pos="relative">
              <Box
                sx={{
                  marginTop: 'min(80%, 12rem)'
                }}
              />
              <Stack
                pos="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                p="md"
                spacing={0}
              >
                <Text
                  span
                  color="light"
                  size="clamp(0.8em, 4vmin, 1.5em)"
                  align="center"
                  sx={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  {key}
                </Text>
                <FitText
                  text={item.value}
                  color="light"
                  align="center"
                  my="auto"
                  sx={{
                    whiteSpace: 'nowrap'
                  }}
                  option={{
                    maxFontSize: 300
                  }}
                />

                {item.aop && (
                  <Text span color="light" align="center">
                    {item.aop}
                  </Text>
                )}
              </Stack>
            </Box>
          </Tooltip>
        )
      })}
    </SimpleGrid>
  )
}

function SKUPerformance({
  performance
}: {
  performance: Record<string, SkuPerformance>
}) {
  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' }
  ]
  const rows = elements.map(element => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ))
  return (
    <>
      <Title order={2}>Key SKU Performance</Title>

      <Table>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  )
}

const FitText = ({
  text,
  option,
  ...rest
}: {
  text: string
  option?: TOptions
} & import('@mantine/utils').PolymorphicComponentProps<'div', TextProps>) => {
  const { ref, fontSize } = useFitText(option)

  return (
    <Text ref={ref} style={{ fontSize }} {...rest}>
      {text}
    </Text>
  )
}
