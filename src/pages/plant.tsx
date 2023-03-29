import {
  Box,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme
} from '@mantine/core'
import PlantImg from '../asset/plant.png'
import { MachineProp, mockMachines } from '@data/machine'

export default function Plant() {
  return (
    <Stack
      w="100%"
      h="100%"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem'
      }}
    >
      <Title order={1}>Plant Layout Demo</Title>
      <PlantLayout />
    </Stack>
  )
}

const PlantLayout = () => {
  return (
    <Box
      sx={{
        background: `url(${PlantImg.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        width: 'min(850px, 100%)',
        aspectRatio: '850/559',
        position: 'relative'
      }}
    >
      {mockMachines().map((m, i) => (
        <Machine {...m} key={i} />
      ))}
    </Box>
  )
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <Text span>
      {k.charAt(0).toUpperCase() + k.slice(1)}
      {': '}
      <Text span fw={700}>
        {v}
      </Text>
    </Text>
  )
}

type Void = { [k: string]: never }

const Empty: Void = {}

function Machine<T extends object>(data: MachineProp<T>) {
  const t = useMantineTheme()
  const i = t.fn.primaryShade()
  let color
  switch (data.datum?.status) {
    case undefined: {
      color = t.colors.gray[i]
      break
    }
    case 'ok': {
      color = t.colors.green[i]
      break
    }
    case 'warning': {
      color = t.colors.yellow[i]
      break
    }
    case 'error': {
      color = t.colors.orange[i]
      break
    }
  }
  return (
    <Tooltip.Floating
      label={
        <Stack spacing={0}>
          <Line k="ID" v={data.id} />
          {Object.entries(data.datum ?? Empty).map(([k, v], i) => (
            <Line k={k} v={v} key={i} />
          ))}
        </Stack>
      }
    >
      <Box
        sx={{
          position: 'absolute',
          top: `${data.y}%`,
          left: `${data.x}%`,
          height: `${data.height}%`,
          width: `${data.width}%`,
          background: color,
          opacity: 0.75,
          boxShadow: '0 0 0 1px black',
          fontSize: '70%',
          fontWeight: 'bold',
          color: 'black',
          cursor: 'pointer',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {data.id}
      </Box>
    </Tooltip.Floating>
  )
}
