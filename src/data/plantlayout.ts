export interface PlantLayout {
  ready?: boolean
}

export const plantlayouts: Record<string, PlantLayout> = {
  'CA1': {ready: false},
  CA2: {ready: false},
  Bradenton: {ready: true},
  FL2: {ready: false},
  DC: {ready: false},
  NJ: {ready: false},
  CA: {ready: false}
}

