import { Box, Stack, Text, Title, Tooltip } from '@mantine/core'
import PlantImg from './asset/plant.png'
import { MachineProp, machines, mockMachines } from './data'

function App() {
  return (
    <Stack
      style={{
        minWidth: '100vw',
        minHeight: '95vh',
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
        background: `url(${PlantImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        width: 'min(850px, 100%)',
        aspectRatio: '850/559',
        position: 'relative'
      }}
    >
      {mockMachines().map(m => (
        <Machine {...m} />
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
  let color
  switch (data.datum?.status) {
    case undefined: {
      color = 'rgba(145, 145, 145, 0.6)'
      break
    }
    case 'ok': {
      color = 'rgba(0, 142, 230, 0.6)'
      break
    }
    case 'warning': {
      color = 'rgba(255, 193, 7, 0.6)'
      break
    }
    case 'error': {
      color = 'rgba(244, 67, 54, 0.6)'
      break
    }
  }
  return (
    <Tooltip.Floating
      label={
        <Stack spacing={0}>
          <Line k="ID" v={data.id} />
          {Object.entries(data.datum ?? Empty).map(([k, v]) => (
            <Line k={k} v={v} />
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

export default App
