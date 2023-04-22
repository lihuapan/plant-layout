import { Anchor, Breadcrumbs } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'

const lookUpTable: Record<string, string> = {
  retailer: 'Retailers',
  datasource: 'Data Sources',
  product: 'Products'
}

export default function SmartBreadCrumb() {
  const breadcrumbItems = decodeURI(useRouter().asPath)
    .split('/')
    .filter(x => x.length > 0)
    .map((item, index, arr) => (
      <Link
        key={index}
        href={`/${arr.slice(0, index + 1).join('/')}`}
        legacyBehavior
        passHref
      >
        <Anchor>{lookUpTable[item] || item.toLocaleUpperCase()}</Anchor>
      </Link>
    ))

  return <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>
}
