import { MantineProvider, Tuple } from '@mantine/core'
import { AppProps } from 'next/app'
import Layout from '../component/Layout'
// import Layout from '../component/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        components: {
          Title: {
            styles: theme => ({
              root: {
                color: theme.colors.dark[theme.fn.primaryShade()]
              }
            })
          },
          Text: {
            styles: theme => ({
              root: {
                ':is(div)': {
                  color: theme.colors.dark[theme.fn.primaryShade()]
                }
              }
            })
          }
        },
        colors: {
          light: [
            '#FEFDF8',
            '#FEFDF8',
            '#FEFDF8',
            '#FEFDF8',
            '#FEFAEE',
            '#FEF8E4',
            '#FFF6DA',
            '#FEF3D2',
            '#FCF0CA',
            '#FAEDC3'
          ],
          dark: [
            '#806176',
            '#7B5B71',
            '#76566C',
            '#715167',
            '#6D4D63',
            '#68485E',
            '#64445A',
            '#5E4155',
            '#593F51',
            '#543C4C'
          ],
          yellow: [
            '#E9CD6D',
            '#EACA5B',
            '#ECC84A',
            '#F0C738',
            '#F4C625',
            '#F9C613',
            '#FFC600',
            '#ECB906',
            '#DBAC0B',
            '#CBA110'
          ],

          green: [
            '#A1DE27',
            '#9DDD1C',
            '#97D716',
            '#91D210',
            '#8CCD0A',
            '#87C805',
            '#82C300',
            '#7AB505',
            '#72A709',
            '#6B9B0C'
          ],
          orange: [
            '#E9A76D',
            '#EA9F5B',
            '#EC964A',
            '#F08E38',
            '#F48625',
            '#F97F13',
            '#FF7800',
            '#EC7206',
            '#DB6D0B',
            '#CB6810'
          ]
        },
        primaryColor: 'orange'
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  )
}
