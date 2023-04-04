import ahold from '../../public/Ahold.json'

export interface Retailer {
  website?: string
  data?: RetailerDetail[]
}

export interface RetailerDetail {
  fscl_wk_mn_val: string
  IRI_TSA_CATEGORY: string
  IRI_TSA_PARENT: string
  POS_DT: string
  IRI_TSA_MANUF: string
  IRI_TSA_BRAND: string
  STATE: string
  STORE_OOS_IND: number | string
  STORE_ON_HAND_UNITS: number | null
  STORE_TYPE: null
  STORE_SALES_UNITS: number | null
  STOR_ID: string
  STORE_SALES_AMOUNT: number | null
  CITY: string
  IRI_TSA_TYPE: string
  STORE_ON_ORDER_UNITS: null
  ZIP: string
  fscl_wk_nm: string
  dow_nm: string
  STORE_RECEIPT_UNITS: number | null
  RSI_PRODUCT_ID_13: string
  RETAILER_NAME: string
  fscl_prd_mn_val: string
  COUNTRY_CODE: string
  RSI_PRODUCT_KEY: string
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
    website: '',
    data: ahold
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

export interface SkuPerformance {}
export interface RetailerSummary {
  value: string
  aop?: string
  hover?: string
}

export interface RetailerStat {
  summary: Record<string, RetailerSummary>
  skuPerf: Record<string, SkuPerformance>
}

export function buildStat(data: RetailerDetail[]): RetailerStat {
  return {
    summary: {
      'Total Sales': {
        value: '0123123102309'
      },
      'TBG Share': {
        value: 'MSC SPJ'
      },
      'YTD': {
        value: '341,954'
      },
      'Last Period': {
        value: '103.2'
      },
      'Gallon Volume': {
        value: '654,313,442'
      },
      'Service Level': {
        value: '99.9%'
      }
    },
    skuPerf: {}
  }
}
