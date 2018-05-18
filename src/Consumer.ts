import { Component, h, VNode } from 'preact'
import { DEFAULT_CTX_PROPERTY } from './config'
import {
  extractStateAndActions,
  prepareChildren,
  transformStateAndActions
} from './utils'

export type FragmentFunction = (children: any[]) => any

export interface IConsumerProps {
  mapStateToProps?: () => any
  mapActionsToProps?: () => any
  fragment?: string | FragmentFunction
  children: Array<VNode<any> | string>
  consumes?: string | string[]
}

class Consumer extends Component<IConsumerProps> {
  public displayName = `Consumer`
  public render() {
    const {
      mapStateToProps,
      mapActionsToProps,
      fragment,
      children,
      consumes
    } = this.props
    if (!children[0]) {
      return null
    }

    const {
      state = {},
      actions = {},
      isMerged = false
    } = transformStateAndActions(
      extractStateAndActions(consumes, this.context),
      mapStateToProps,
      mapActionsToProps
    )

    const readyChildren = children.map(child =>
      prepareChildren(child, state, actions, isMerged)
    )

    if (fragment) {
      return typeof fragment === 'function'
        ? fragment(readyChildren)
        : h(fragment, {}, readyChildren)
    }

    if (readyChildren.length === 1) {
      return readyChildren[0]
    }

    return h('span', {}, readyChildren)
  }
}

export { Consumer }
