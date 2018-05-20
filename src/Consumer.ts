// tslint:disable:max-classes-per-file
import { Component, h, VNode } from 'preact'
import { DEFAULT_CTX_PROPERTY } from './config'
import { deepCompare } from './lib/deep-compare'
// import { IStateAndActions, MapActionFn, MapStateFn } from './types'
import { extractStateAndActions } from './utils/extract-state-and-actions'
import { prepareChildren } from './utils/prepare-children'
import { transformStateAndActions } from './utils/transform-state-and-actions'

import {
  IConsumerProps,
  IRerenderPreventerProps,
  IRerenderPreventerState,
  IStateAndActions,
  MapActionFn,
  MapStateFn
} from './index.d'

class RerenderPreventer extends Component<
  IRerenderPreventerProps,
  IRerenderPreventerState
> {
  public constructor(props) {
    super(props)
    const { state, actions, isMerged } = transformStateAndActions(
      { actions: props.actions, state: props.state },
      props.mapStateToProps,
      props.mapActionsToProps
    )
    this.state = {
      actions,
      isMerged,
      state
    }
  }
  public shouldComponentUpdate(
    nextProps: IRerenderPreventerProps,
    nextState: IRerenderPreventerState,
    nextContext: any
  ) {
    return !deepCompare(
      [this.state.actions, nextState.actions],
      [this.state.state, nextState.state],
      [this.state.isMerged, nextState.isMerged],
      [this.props.mapActionsToProps, nextProps.mapActionsToProps],
      [this.props.mapStateToProps, nextProps.mapStateToProps],
      [this.props.fragment, nextProps.fragment],
      [this.props.childComponents, nextProps.childComponents]
    )
  }
  public componentWillReceiveProps(nextProps) {
    const { state, actions, isMerged } = transformStateAndActions(
      { actions: nextProps.actions, state: nextProps.state },
      nextProps.mapStateToProps,
      nextProps.mapActionsToProps
    )

    this.setState({
      actions,
      isMerged,
      state
    })
  }
  public render() {
    const { fragment, childComponents } = this.props
    const { state, actions, isMerged } = this.state

    const readyChildren = childComponents.map(child =>
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

RerenderPreventer.displayName = 'Contextual(Consumer wrapper)'

class Consumer extends Component<IConsumerProps, {}> {
  public render({
    mapStateToProps,
    mapActionsToProps,
    fragment,
    children,
    consumes
  }: IConsumerProps) {
    if (!children[0]) {
      return null
    }

    const { state, actions } = extractStateAndActions(consumes, this.context)

    return h<any>(RerenderPreventer, {
      actions,
      childComponents: children,
      fragment,
      mapActionsToProps,
      mapStateToProps,
      state
    })
  }
}
Consumer.displayName = 'Contextual(Consumer)'

export { Consumer }
