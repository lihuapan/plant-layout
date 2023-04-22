import SmartBreadCrumb from '@comp/SmartBreadCrumb'
import { Stack, Text } from '@mantine/core'

export default function BJs() {
  return (
    <Stack spacing='2rem'>
      <SmartBreadCrumb />
      <Text span color='dark'>
        {`Target is a general merchandise retailer with stores in all 50 U.S. states and the District of Columbia. Our tagline is "Expect More. Pay Less." We've been using it since 1994! The Target Corporation also owns Shipt and Roundel.`}
      </Text>
    </Stack>
  )
}
