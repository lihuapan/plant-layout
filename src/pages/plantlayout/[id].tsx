import SmartBreadCrumb from '@comp/SmartBreadCrumb'
import { PlantLayout, plantlayouts } from '@data/plantlayout'
import { Stack, Box, filterProps } from '@mantine/core'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import PlantImg from '../../../public/image/plant.svg'
import WIP from '@comp/WIP'

interface Props {
    id: string
    plantlayout: PlantLayout
  }
  
  export async function getStaticPaths() {
    return {
      paths: Object.keys(plantlayouts).map(id => {
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
  
    const id = context.params.id as string
    const plantlayout = plantlayouts[id]
  
    if (!plantlayout) {
      return {
        notFound: true
      }
    }
  
    return {
      props: {
        id,
        plantlayout
      }
    }
  }
  
  export default function Layout({ id, plantlayout }: Props) {
    return (
      <Stack spacing='2rem'>
        <SmartBreadCrumb />
        {plantlayout.ready ? (
          <>
            <Plant id={id}/>
          </>
        ) : (
          <WIP />
        )}
      </Stack>
    )
  }


  function Plant ({ id }: { id: string })  {
    return (
      <Box
        sx={{
          background: `url(/image/plantlayout/${id}.svg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          width: '100%',
          aspectRatio: '850/559',
          position: 'relative'
        }}
      >
      </Box>
    )
  }