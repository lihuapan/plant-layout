    import {
      Box,
      Button,
      Card,
      Container,
      Group,
      Input,
      MediaQuery,
      SimpleGrid,
      Stack,
      Text,
      Title,
      Image,
      useMantineTheme,
      Alert 
    } from '@mantine/core'
    import Link from 'next/link'
    import { IconSearch, IconAlertCircle } from '@tabler/icons-react'
    import { productCategories } from '@data/product'
    import { retailers } from '@data/retailer'
    import { dataSources } from '@data/datasoruce'
    import { useRouter } from 'next/router'
    import { KeyboardEvent, useRef } from 'react'
    // import colors from '../data/color'

    export default function Index() {
      const ref = useRef<HTMLInputElement>(null)
      const router = useRouter()
      const search = () => {
        if (ref.current) {
          router.push(`https://www.google.com/search?q=${ref.current.value}`)
        }
      }
      const t = useMantineTheme()

      return (
        
        <Stack spacing={36}>
          <Box w='100%' py='3rem'>
            <Container>
              <Stack>
                <SimpleGrid
                  breakpoints={[
                    { maxWidth: t.breakpoints.xs, cols: 1 },
                    { maxWidth: t.breakpoints.sm, cols: 2 },
                    { minWidth: t.breakpoints.sm, cols: 3 }
                  ]}
                >
                  <Link href="/retailer" passHref legacyBehavior>
                  <Stack>
                    <Card
                      shadow='sm'
                      padding='sm'
                      radius='md'
                      withBorder
                      component='a'
                      mih='10em'
                      sx={{
                        'transition': 'transform 0.2s ease-in-out',
                        ':hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                    >
            <SimpleGrid cols={3} spacing="xs" verticalSpacing="md">
            {Object.entries(retailers).map(([k, v]) => {
                return (<Image key={k} alt={`${k} logo`}  src={`/image/logos/${k}.svg`} height={30} fit='contain'/>)
              })}
            </SimpleGrid>
      
                    </Card>
                    <Title
                  style={{
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                >
                  Retailer Dashboards
                </Title>
                    </Stack>
                    </Link>
                    <Link href="/datasource" passHref legacyBehavior>
                    <Stack>
                    <Card
                      shadow='sm'
                      padding='xl'
                      radius='md'
                      withBorder
                      component='a'
                      mih='10em'
                      sx={{
                        'transition': 'transform 0.2s ease-in-out',
                        ':hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                    >
            <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
            {Object.entries(dataSources).map(([k, v]) => {
                return (<Image key={k} alt={`${k} logo`}  src={`/image/datasource/${k}.png`} height={80} fit='contain'/>)
              })}
            </SimpleGrid>
      
                    </Card>
                    <Title
                  style={{
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                >
                  Data Sources
                </Title>
              </Stack>
              </Link>
              <Link href="/product" passHref legacyBehavior>
                    <Stack>
                    <Card
                      shadow='sm'
                      padding='xl'
                      radius='md'
                      withBorder
                      component='a'
                      mih='10em'
                      sx={{
                        'transition': 'transform 0.2s ease-in-out',
                        ':hover': {
                          transform: 'scale(1.02)'
                        }
                      }}
                    >
                    
            <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
              {Object.entries(productCategories).map(([k, v]) => {
                      return  (<Image key={k} alt={`${k} logo`}  src={`/image/product/${k}.png`} height={80} fit='contain'/>)
              })}
            </SimpleGrid>
                    </Card>
                    <Title
                  style={{
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                >
                  Product Category
                </Title>
                    </Stack>
                    </Link>
                </SimpleGrid>
                <Box h='5em' />
                <Title order={1}>Tropicana Data Services</Title>
                <Text
                  style={{
                    fontSize: '1.1rem'
                  }}
                >
                  The portal to view, manage and consume datasets.
                </Text>

                <Group
                  align='flex-end'
                  w={`min(max(66%, ${t.breakpoints.sm}), 100%)`}
                  mt='2rem'
                  noWrap
                >
                  <Input
                    ref={ref}
                    size='md'
                    placeholder='Name or ID of the dataset'
                    icon={<IconSearch size={16} />}
                    style={{
                      flexGrow: 1,
                      boxShadow: '0 2px 4px hsl(0deg 0% 64% / 10%)'
                    }}
                    color='green'
                    onKeyUp={(e: KeyboardEvent<Element>) => {
                      if (e.key === 'Enter') {
                        search()
                      }
                    }}
                  />
                  <MediaQuery
                    smallerThan={'xs'}
                    styles={{
                      display: 'none'
                    }}
                  >
                    <Button
                      size='md'
                      color='yellow'
                      styles={{
                        root: {
                          boxShadow: '0 2px 4px hsl(0deg 0% 64% / 10%)'
                        }
                      }}
                      onClick={search}
                      leftIcon={<IconSearch size={14} />}
                    >
                      Search
                    </Button>
                  </MediaQuery>
                  <MediaQuery
                    largerThan={'xs'}
                    styles={{
                      display: 'none'
                    }}
                  >
                    <Button
                      size='md'
                      color='yellow'
                      styles={{
                        root: {
                          boxShadow: '0 2px 4px hsl(0deg 0% 64% / 10%)'
                        }
                      }}
                      onClick={search}
                    >
                      <IconSearch size={16} />
                    </Button>
                  </MediaQuery>
                </Group>
              </Stack>
            </Container>
          </Box>
          {/* <Divider my="sm" /> */}
          {/* <Container>
              <Stack spacing={'xl'}>
                {categories.map((c, i) => {
                  return (
                    <Stack key={i}>
                      <Title order={3} color={colors.ink.hex}>
                        {c.name}
                      </Title>
                      <SimpleGrid
                        breakpoints={[
                          { maxWidth: 1480, cols: 3, spacing: 'md' },
                          { maxWidth: 980, cols: 2, spacing: 'sm' },
                          { maxWidth: 600, cols: 1, spacing: 'sm' }
                        ]}
                        cols={3}
                      >
                        {c.data.map((cat, i) => {
                          return (
                            <Card
                              p="md"
                              radius="sm"
                              withBorder
                              miw={120}
                              key={i}
                              component={'a'}
                              href={cat.url}
                              target="popup"
                              sx={theme => ({
                                transition: 'all 0.2s',
                                [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
                                  ':hover': {
                                    transform: 'scale(1.02)',
                                    boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.05)'
                                  }
                                }
                              })}
                            >
                              <Stack h={'100%'}>
                                <Title order={5}>{cat.title}</Title>
                                <Text style={{ flexGrow: 1 }}>
                                  {cat.description ?? ''}
                                </Text>
                              </Stack>
                            </Card>
                          )
                        })}
                      </SimpleGrid>
                    </Stack>
                  )
                })}
              </Stack>
            </Container> */}
        </Stack>
      )
    }
