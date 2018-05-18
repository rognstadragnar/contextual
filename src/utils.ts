import { h, VNode } from 'preact'
import { DEFAULT_CTX_PROPERTY } from './config'

export type VNodeFn = (state: any, action?: any) => VNode

const prepareChildren = (
  child: string | VNode | VNodeFn,
  state: any,
  actions: any,
  isMerged: boolean = false
) => {
  if (typeof child === 'string') {
    return child
  }
  if (typeof child === 'function') {
    if (isMerged) {
      return child(state) || null
    }
    return child(state, actions) || null
  }

  const { nodeName, attributes, children } = child

  if (typeof nodeName === 'string') {
    return child
  }
  if (attributes && attributes.preventApplyingProps) {
    return child
  }

  const mergedAttributes = isMerged
    ? { state, actions, ...attributes }
    : { ...state, ...attributes }

  return h(nodeName, mergedAttributes, children)
}

export interface IStateAndActions {
  actions: any
  state: any
}

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

export type MapStateFn = (state: any) => object
export type MapActionFn = (actions: any, state: any) => object

function transformStateAndActions(
  { state, actions }: IStateAndActions,
  mapStateToProps: MapStateFn | true | null,
  mapActionsToProps: MapActionFn | true | null
) {
  const hasMappingFns =
    typeof mapStateToProps === 'function' ||
    typeof mapActionsToProps === 'function'

  if (!hasMappingFns) {
    return { state, actions }
  }

  let mergedState: object = {}

  if (typeof mapStateToProps === 'function') {
    mergedState = {
      ...mergedState,
      ...mapStateToProps(state)
    }
  } else if (mapStateToProps === true) {
    mergedState = { ...mergedState, ...state }
  }

  if (typeof mapActionsToProps === 'function') {
    mergedState = {
      ...mergedState,
      ...mapActionsToProps(actions, state)
    }
  } else if (mapActionsToProps === true) {
    mergedState = { ...mergedState, actions }
  }
  return { state: mergedState, isMerged: true }
}

export { prepareChildren, extractStateAndActions, transformStateAndActions }
