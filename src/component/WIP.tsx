import { Center, Title } from '@mantine/core'
import colors from '../data/color'

export default function WIP() {
  return (
    <Center w="100%" mih="20vh">
      <Title order={2} color={colors['orange']}>
        Working in progress
      </Title>
    </Center>
  )
}
