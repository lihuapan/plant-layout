import SmartBreadCrumb from '@comp/SmartBreadCrumb'
import { Stack, Text } from '@mantine/core'

export default function BJs() {
  return (
    <Stack spacing='2rem'>
      <SmartBreadCrumb />
      <Text span color='dark'>
        {`BJ's Wholesale Club is a leading warehouse club operator on the
East Coast of the United States. We deliver significant value to our
members, consistently offering 25% or more savings on a representative
basket of manufacturer-branded groceries compared to traditional
supermarket competitors.`}
      </Text>
    </Stack>
  )
}
