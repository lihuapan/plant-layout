export interface ProductCategory {
  image?: string[]
}

export const productCategories: Record<string, ProductCategory> = {
  tropicana: {
    image: []
  },
  naked: {
    image: [
            'naked_detail_1.png',
            'naked_detail_2.png'
    ]
  },
  izze: {
    image: [
            'izze_detail_1.png',
            'izze_detail_2.png'
    ]
  }
}
