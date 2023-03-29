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
  ...pair(['1', '2'], 10.4 * 0),
  ...quad(['3', '4', '5', '6'], 10.4 * 1),
  ...quad(['7', '8', '9', '10'], 10.4 * 2),
  ...quad(['11', '12', '13', '14'], 10.4 * 3),
  ...quad(['15', '16', '17', '18'], 10.4 * 1, 14.7),
  ...quad(['19', '20', '21', '22'], 10.4 * 2, 14.7),
  ...quad(['23', '24', '25', '26'], 10.4 * 3, 14.7)
]

export const mockMachines = (): MachineProp<{}>[] => {
  return machines.map(m => {
    const rand = Math.random() * 8
    return {
      ...m,
      datum: {
        status: rand > 2 ? 'ok' : rand > 1 ? 'warning' : 'error'
      }
    }
  })
}
