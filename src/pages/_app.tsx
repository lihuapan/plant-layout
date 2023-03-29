import { MantineProvider } from '@mantine/core'
import { AppProps } from 'next/app'
import Layout from '../component/Layout'
// import Layout from '../component/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  )
}
