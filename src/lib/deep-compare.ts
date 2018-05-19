import { deepEquals } from './deep-equal'

export type ICompareable = [any, any]

export function deepCompare(...args: ICompareable[]) {
  return args.every(arg => deepEquals(arg[0], arg[1]))
}
