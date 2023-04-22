import { FitText } from '@comp/FitText'
import SmartBreadCrumb from '@comp/SmartBreadCrumb'
import WIP from '@comp/WIP'
import {
  RetailerDetail,
  RetailerStat as IRetailerStat,
  RetailerSummary,
  StatePerformance,
  buildStat,
  retailers
} from '@data/retailer'
import { SkuPerformance } from '@data/retailer'

import {
  Box,
  Card,
  MantineTheme,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core'
import { Line } from '@pages/plant'
import centroid from '@turf/centroid'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Point,
  ZoomableGroup
} from 'react-simple-maps'

interface Props {
  id: string
  stat: IRetailerStat | null
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(retailers).map(id => {
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

  const id = context.params.id

  return {
    // Passed to the page component as props
    props: {
      id: id,
      stat: retailers[id]?.data
        ? buildStat(retailers[id].data as RetailerDetail[])
        : null
    }
  }
}

export default function Retailer({ id, stat }: Props) {
  return (
    <Stack spacing='2rem'>
      <SmartBreadCrumb />
      {stat ? (
        <>
          <StatSummary data={stat.summary} />
          <SKUPerformance data={stat.skuPerf} />
          <Map data={stat.mapPerf} />
        </>
      ) : (
        <WIP />
      )}
    </Stack>
  )
}

function StatSummary({ data }: { data: Record<string, RetailerSummary> }) {
  const t = useMantineTheme()

  return (
    <SimpleGrid
      spacing='md'
      breakpoints={[
        { maxWidth: t.breakpoints.sm, cols: 2 },
        { minWidth: t.breakpoints.sm, cols: 4 },
        { minWidth: '100em', cols: 8 }
      ]}
    >
      {Object.entries(data).map(([key, item], i) => {
        return (
          <Tooltip
            label={item.hover ?? key}
            key={i}
            position='bottom'
            withArrow
            color='dark'
          >
            <Card
              bg='green'
              display={'inline-block'}
              pos='relative'
              shadow='sm'
            >
              <Box
                sx={{
                  marginTop: 'min(80%, 12rem)'
                }}
              />
              <Stack
                pos='absolute'
                top={0}
                bottom={0}
                left={0}
                right={0}
                p='md'
                spacing={0}
              >
                <Text
                  span
                  color='light'
                  size='clamp(1.2rem, 4vw - 1rem, 1.5rem)'
                  align='center'
                  sx={{
                    whiteSpace: 'nowrap'
                  }}
                >
                  {key}
                </Text>
                <FitText
                  color='light'
                  align='center'
                  my='auto'
                  sx={{
                    whiteSpace: 'nowrap'
                  }}
                  option={{
                    maxFontSize: 300
                  }}
                >
                  {item.value}
                </FitText>
                {item.aop && (
                  <Text span color='light' align='center'>
                    {item.aop}
                  </Text>
                )}
              </Stack>
            </Card>
          </Tooltip>
        )
      })}
    </SimpleGrid>
  )
}

function SKUPerformance({ data }: { data: Record<string, SkuPerformance> }) {
  return (
    <>
      <Title order={2}>Key SKU Performance</Title>
      <Box
        sx={{
          overflow: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        <Table highlightOnHover miw='960px'>
          <thead>
            <tr>
              <th>IRI TSA Category</th>
              <th>Retail</th>
              <th>Store# / Possible#</th>
              <th>Revenue</th>
              <th>Volume Trend</th>
              <th>Shared Trend</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(
              ([
                cat,
                { retail, capacityPercentage, revenue, volTrend, sharedTrend }
              ]) => (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td>{retail.toFixed(2)}</td>
                  <td>{capacityPercentage}</td>
                  <td>{revenue.toFixed(2)}</td>
                  <td>{volTrend.toFixed(2)}</td>
                  <td>{sharedTrend.toFixed(2)}</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </Box>
    </>
  )
}

function Map({ data }: { data: Record<string, StatePerformance> }) {
  interface Zoom {
    coordinates: Point
    zoom: number
  }
  const geoUrl =
    'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json'
  const t = useMantineTheme()
  const [position, setPosition] = useState<Zoom>({
    coordinates: [0, 0],
    zoom: 1
  })

  function handleZoomIn() {
    if (position.zoom >= 4) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }))
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }))
  }

  function handleMoveEnd(position: Zoom) {
    setPosition(position)
  }

  interface Anno {
    con: Point
    text?: Point
  }

  const colors: Record<string, string> = {
    MA: t.colors.green[0],
    RI: t.colors.green[0],
    CT: t.colors.green[3],
    NY: t.colors.green[3],
    NJ: t.colors.green[5],
    PA: t.colors.yellow[5],
    DE: t.colors.yellow[7],
    MD: t.colors.yellow[7],
    VA: t.colors.orange[5]
  }

  const adjust: Record<string, Point | Anno> = {
    WA: [2, -0.5],
    ID: [0, -1.5],
    SD: [-1, 0],
    AZ: [1, 0],
    AK: [0, 2.5],
    CA: [1, 0],
    KY: [1, -0.3],
    OH: [-0.4, -0.5],
    TX: [-1, 1],
    LA: [-1.7, 0.5],
    FL: [1, 0],
    ME: [0, 1],
    NY: [-0.5, 0.5],
    MI: [1, -2],
    WI: [-1, 0],
    MN: [-1, 0],
    HI: {
      con: [10, -20],
      text: [-2, -4]
    },
    VT: {
      con: [-20, -30],
      text: [-2, -4]
    },
    NH: {
      con: [-10, -40],
      text: [-2, -4]
    },

    RI: {
      con: [20, 20],
      text: [10, 10]
    },
    MA: {
      con: [30, 15],
      text: [12, 12]
    },
    CT: {
      con: [15, 20],
      text: [7, 10]
    },
    NJ: {
      con: [20, 5],
      text: [8, 10]
    },
    DE: {
      con: [25, 10],
      text: [10, 10]
    },
    MD: {
      con: [30, 20],
      text: [10, 10]
    }
  }

  return (
    <ComposableMap
      projection='geoAlbersUsa'
      style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}
    >
      <ZoomableGroup
        zoom={position.zoom}
        center={position.coordinates}
        onMoveEnd={handleMoveEnd}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const state: string = geo.properties.iso_3166_2
              const stateData: StatePerformance = data[state] ?? {
                amount: 0,
                unit: 0,
                cities: []
              }
              let c = centroid(geo).geometry.coordinates as Point
              let o = adjust[state]
              const MarkerText = ({
                x = 0,
                y = 0
              }: {
                x?: number
                y?: number
              }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor='middle'
                  fill={t.colors.dark[t.fn.primaryShade()]}
                  fontSize={t.fontSizes.xs}
                >
                  {geo.properties.iso_3166_2}
                </text>
              )
              let marker
              if (Array.isArray(o)) {
                c = [c[0] + o[0], c[1] + o[1]]
                marker = (
                  <Marker coordinates={c}>
                    <MarkerText />
                  </Marker>
                )
              } else if (o?.con) {
                marker = (
                  <Annotation
                    subject={c}
                    dx={o.con[0]}
                    dy={o.con[1]}
                    connectorProps={{
                      stroke: t.colors.dark[t.fn.primaryShade()],
                      strokeWidth: 1,
                      strokeLinecap: 'round'
                    }}
                  >
                    <MarkerText x={o.text?.[0]} y={o.text?.[1]} />
                  </Annotation>
                )
              } else {
                marker = (
                  <Marker coordinates={c}>
                    <MarkerText />
                  </Marker>
                )
              }

              const fill = colors[state] ?? t.colors.light[t.fn.primaryShade()]

              return (
                <Tooltip.Floating
                  key={geo.rsmKey}
                  label={
                    <Stack spacing='0'>
                      <Line k='State' v={geo.properties.iso_3166_2}></Line>
                      <Line k='Amount' v={stateData.amount.toFixed(2)}></Line>
                      <Line k='Unit' v={stateData.unit.toFixed(2)}></Line>
                    </Stack>
                  }
                >
                  <g>
                    <Geography
                      geography={geo}
                      fill={fill}
                      stroke='#000000'
                      style={{
                        default: {
                          outline: 'none',
                          transition: 'all 0.3s ease-in-out'
                        },
                        hover: {
                          outline: 'none',
                          fill: t.fn.lighten(fill, 0.3)
                        },
                        pressed: { outline: 'none' }
                      }}
                    />
                    {marker}
                  </g>
                </Tooltip.Floating>
              )
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}
