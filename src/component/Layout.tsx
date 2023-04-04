import { Box, Burger, Container, Drawer, Group, Tabs, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconExternalLink } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

export default function Layout(props: { children: ReactNode }) {
  return (
    <Box mih='100vh' bg='light.0'>
      <Nav />
      <Box py='lg' px='clamp(1em, 5vw, 4em)'>
        {props.children}
      </Box>
    </Box>
  )
}

function Nav() {
  const [opened, setOpened] = useState(false)
  const router = useRouter()
  const theme = useMantineTheme()
  const nonSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`)

  const NavBar = (
    <Tabs
      value={router.asPath}
      onTabChange={val => {
        setOpened(false)
        router.push(val as string)
      }}
      variant='outline'
      radius='xs'
      orientation={nonSm ? 'horizontal' : 'vertical'}
      style={{
        flexGrow: 1
      }}
      color='orange'
      styles={t => ({
        tab: {
          color: t.colors.dark[t.fn.primaryShade()],
          border: 'none',
          fontSize: '1rem',
          ':hover': {
            color: t.colors.orange[t.fn.primaryShade()]
          },
          '&[data-active]': {
            borderColor: t.colors.orange[t.fn.primaryShade()]
          },
          minHeight: '77px',
          [t.fn.largerThan('sm')]: {
            borderBottom: `4px solid transparent`,
            transition: 'all 0.1s ease-in-out'
          },
          [t.fn.smallerThan('sm')]: {
            fontSize: t.fontSizes.xl,
            width: '100%'
          }
        },
        tabsList: {
          border: 'none',
          [t.fn.smallerThan('sm')]: {
            width: '100%'
          }
        }
      })}
    >
      <Tabs.List pr='1rem'>
        <Tabs.Tab value='/'>Homepage</Tabs.Tab>
        <Tabs.Tab value='/power_bi'>Power BI</Tabs.Tab>
        <Tabs.Tab value='/plant'>Plant</Tabs.Tab>
        <Tabs.Tab value='/retailer'>Retailers</Tabs.Tab>
        {/* <Tabs.Tab value="/chain">Supply Chain</Tabs.Tab> */}
        <Tabs.Tab
          sx={theme => ({
            [theme.fn.largerThan('sm')]: {
              marginLeft: 'auto'
            }
          })}
          value='https://www.tropicanabrandsgroup.com/contactus/'
          rightSection={<IconExternalLink size={14} />}
        >
          Contact
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )

  return (
    <Group
      bg='light'
      style={{
        gap: '0',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
      }}
    >
      <Box maw={'200px'} py='md'>
        <Link href='https://www.tropicanabrandsgroup.com/' rel='home'>
          <Image
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
            width='408'
            height='45'
            src='https://www.tropicanabrandsgroup.com/wp-content/uploads/2022/01/Tropicana-Brands-Group-408x116.webp'
            alt='Tropicana Brands'
          />
        </Link>
      </Box>

      {nonSm && NavBar}
      {!nonSm && (
        <>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            ml='auto'
            mr='lg'
          />
          <Drawer
            size={'100%'}
            opened={opened}
            onClose={() => setOpened(false)}
          >
            {NavBar}
          </Drawer>
        </>
      )}
    </Group>
  )
}
