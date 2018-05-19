import { deepEnoughEquals } from '@rognstadragnar/deep-enough-equals'

export type ICompareable = [any, any]

export function deepCompare(...args: ICompareable[]) {
  return args.every(arg => deepEnoughEquals(arg[0], arg[1]))
}
