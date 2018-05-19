import { h, VNode } from 'preact'
import { VNodeFn } from './../index.d'

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
    ? { ...state, ...attributes }
    : { state, actions, ...attributes }

  return h(nodeName, mergedAttributes, children)
}

export { prepareChildren }
