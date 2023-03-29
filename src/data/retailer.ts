export interface Retailer {
  logo: string
  website?: string
}

export type RetailerWithId = Retailer & { id: string }

export type Retailers = Record<string, Retailer>

export const retailers: Retailers = {
  walmart: {
    logo: 'https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png',
    website: 'https://www.walmart.com'
  },
  target: {
    logo: 'https://www.denverchildrensfoundation.org/wp-content/uploads/2021/09/target-logo.png',
    website: 'https://www.target.com'
  },
  walgreens: {
    logo: 'https://1000logos.net/wp-content/uploads/2021/11/Walgreens-logo.png',
    website: 'https://www.walgreens.com'
  }
}
