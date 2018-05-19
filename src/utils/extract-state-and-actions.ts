import { IStateAndActions } from '../index.d'
import { DEFAULT_CTX_PROPERTY } from './../config'

function extractStateAndActions(
  property: string | string[] = DEFAULT_CTX_PROPERTY,
  context: object
): IStateAndActions {
  if (Array.isArray(property)) {
    return property.reduce(
      (pv, cv) => {
        const { state, actions } = context[cv] || { state: {}, actions: {} }

        return {
          actions: {
            ...pv.actions,
            [cv]: actions
          },
          state: {
            ...pv.state,
            [cv]: state
          }
        }
      },
      { state: {}, actions: {} }
    )
  }
  return context[property] || { state: {}, actions: {} }
}

export { extractStateAndActions }
