export function deepEquals(a: any, b: any): boolean {
  if (a === b) {
    return true
  }

  if (typeof a !== typeof b) {
    return false
  }

  if (typeof a === 'object') {
    if (Array.isArray(a)) {
      if (Array.isArray(b)) {
        if (a.length !== b.length) {
          return false
        }

        const everyItemEqual = a.every((aItem, idx) => {
          return deepEquals(aItem, b[idx])
        })
        return everyItemEqual
      }
      return false
    }

    if (a instanceof Map) {
      if (b instanceof Map) {
        return compareMaps(a, b, deepEquals)
      }
      return false
    }

    if (a instanceof Set) {
      if (b instanceof Set) {
        return compareSets(a, b)
      }
      return false
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
      return false
    }

    const bHasOwnProperty = {}.hasOwnProperty.bind(b)

    return keysA.every((key, idx) => {
      return bHasOwnProperty(key) && deepEquals(a[key], b[key])
    })
  }
  return a === b
}

type DeepEqualsFn = (a: any, b: any) => boolean

function compareMaps(
  mapA: Map<any, any>,
  mapB: Map<any, any>,
  deepEqualsFn: DeepEqualsFn
): boolean {
  if (mapA.size !== mapB.size) {
    return false
  }

  const arrA = []
  mapA.forEach((value, key) => {
    arrA.push(key)
  })

  return arrA.every(key => {
    const valA = mapA.get(key)
    const valB = mapB.get(key)

    return deepEqualsFn(valA, valB)
  })
}

function compareSets(setA: Set<any>, setB: Set<any>): boolean {
  if (setA.size !== setB.size) {
    return false
  }
  const arrA = []
  setA.forEach(value => {
    arrA.push(value)
  })

  return arrA.every(value => {
    return setB.has(value)
  })
}
