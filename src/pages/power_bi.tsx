import { Stack } from '@mantine/core'

export default function PowerBI() {
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
