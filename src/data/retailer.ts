export interface Retailer {
  website?: string
}

export type RetailerWithId = Retailer & { id: string }

export type Retailers = Record<string, Retailer>

export const retailers: Retailers = {
  'Walmart': {
    website: 'https://www.walmart.com'
  },
  'Target': {
    website: 'https://www.target.com'
  },
  'Walgreens': {
    website: 'https://www.walgreens.com'
  },
  'Ahold': {
    website: ''
  },
  "BJ's": {
    website: ''
  },
  'Costco': {
    website: ''
  },
  'Meijer': {
    website: ''
  },
  "Sam's Club": {
    website: 'http://www.samsclub.com'
  },
  'Harris Teeter': {
    website: ''
  }
}
