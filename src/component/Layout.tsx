import { Box, Group, Tabs } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import colors from '../data/color'
// import { ClassName } from '../font'

const ClassName = ''

export default function Layout(props: { children: ReactNode }) {
  const router = useRouter()

  return (
    <Box className={`${ClassName}`}>
      <Group
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          background: colors.white,
          zIndex: 100,
          color: colors.white
        }}
      >
        <Box maw={'200px'} ml={'md'} py={'md'}>
          <Link
            href="https://www.tropicanabrandsgroup.com/"
            rel="home"
            aria-current="page"
          >
            <Image
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              width="408"
              height="45"
              src="https://www.tropicanabrandsgroup.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-408x116.webp"
              alt="Tropicana Brands"
            />
          </Link>
        </Box>
        <Tabs
          value={router.asPath}
          onTabChange={val => router.push(val as string)}
          variant="outline"
          radius="xs"
          style={{
            flexGrow: 1
          }}
          h={'77px'}
          styles={{
            tab: {
              'color': colors.dark,
              'border': 'none',
              'borderBottom': `4px solid transparent`,
              'fontSize': '1rem',
              ':hover': {
                color: colors['orange']
              },
              '&[data-active]': {
                borderColor: colors.orange
              }
            },
            tabsList: {
              height: '100%',
              borderBottom: 'none',
              alignItems: 'stretch',
              alignContent: 'stretch'
            }
          }}
        >
          <Tabs.List pr="1rem">
            <Tabs.Tab value="/">Homepage</Tabs.Tab>
            <Tabs.Tab value="/power_bi">Power BI</Tabs.Tab>
            <Tabs.Tab value="/plant">Plant</Tabs.Tab>
            <Tabs.Tab value="/retailer">Retailer</Tabs.Tab>
            {/* <Tabs.Tab value="/chain">Supply Chain</Tabs.Tab> */}
            {/* <Tabs.Tab
              value="https://w.amazon.com/bin/view/AP_DAPP/Engagement_model/#HOncallTickets28SIM-T29"
              ml="auto"
              rightSection={<IconExternalLink size={14} />}
            >
              Contact
            </Tabs.Tab> */}
          </Tabs.List>
        </Tabs>
      </Group>

      <Box component="main" mb="xl" mih="calc(100vh - 100px)">
        {props.children}
      </Box>
    </Box>
  )
}
