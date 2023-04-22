export interface MachineProp<T extends object> {
  id: string
  // In percentage, float in [0, 100]
  x: number
  // In percentage, float in [0, 100]
  y: number
  // In percentage, float in [0, 100]
  width: number
  // In percentage, float in [0, 100]
  height: number
  // Radius
  radius?: number
  // Rotate
  rotate?: string

  // Data for the machine
  datum?: Datum<T>
}

export interface Datum<T extends object> {
  status: 'ok' | 'warning' | 'error'
  value?: T
}

const pair = (id: [string, string], x: number = 0, y: number = 0) => {
  return [
    {
      id: id[0],
      x: x + 7.4,
      y: y + 27.3,
      width: 2.8,
      height: 4.4
    },
    {
      id: id[1],
      x: x + 12.7,
      y: y + 27.3,
      width: 2.8,
      height: 4.4
    }
  ]
}

const quad = (
  id: [string, string, string, string],
  x: number = 0,
  y: number = 0
) => {
  return [...pair([id[0], id[1]], x, y), ...pair([id[2], id[3]], x, y + 5.7)]
}

export const machines: MachineProp<{}>[] = [
  // ...pair(['1', '2'], 10.4 * 0),
  // ...quad(['3', '4', '5', '6'], 10.4 * 1),
  // ...quad(['7', '8', '9', '10'], 10.4 * 2),
  // ...quad(['11', '12', '13', '14'], 10.4 * 3),
  // ...quad(['15', '16', '17', '18'], 10.4 * 1, 14.7),
  // ...quad(['19', '20', '21', '22'], 10.4 * 2, 14.7),
  // ...quad(['23', '24', '25', '26'], 10.4 * 3, 14.7)
  {
    id: 'Box Plant',
    x: 48.1,
    y: 53,
    width: 4,
    height: 10.2
  },
  {
    id: 'WHSE #17',
    x: 55,
    y: 50,
    width: 5.7,
    height: 6,
    rotate: '-15deg'
  },
  {
    id: 'Central Receiving',
    x: 58.9,
    y: 42.2,
    width: 6.3,
    height: 2.5,
    rotate: '-15deg'
  },

  {
    id: 'Cold Room #4',
    x: 35.9,
    y: 34,
    width: 2.5,
    height: 3.8
  },
  {
    id: 'Cold Room #5',
    x: 35.9 + 2.6,
    y: 34,
    width: 2.5,
    height: 3.8
  },
  {
    id: 'Cold Room #6',
    x: 35.9 + 2.6 * 2 + 0.9,
    y: 34,
    width: 5.3,
    height: 3.8
  },
  {
    id: 'Cold Room #7',
    x: 35.9 + 2.6 * 2 + 0.9 + 5.3,
    y: 34,
    width: 4.3,
    height: 3.8
  }
]

export const mockMachines = (): MachineProp<{}>[] => {
  return machines.map(m => {
    const rand = Math.random() * 100
    return {
      ...m,
      datum: {
        status: rand > 20 ? 'ok' : rand > 5 ? 'warning' : 'error'
      }
    }
  })
}
