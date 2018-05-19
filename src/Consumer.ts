// tslint:disable:max-classes-per-file
import { Component, h, VNode } from 'preact'
import { DEFAULT_CTX_PROPERTY } from './config'
import { deepCompare } from './lib/deep-compare'
import {
  extractStateAndActions,
  IStateAndActions,
  MapActionFn,
  MapStateFn,
  prepareChildren,
  transformStateAndActions
} from './utils'

export type FragmentFunction = (children: any[]) => any

export interface IConsumerProps {
  mapStateToProps?: MapStateFn | true | null
  mapActionsToProps?: MapActionFn | true | null
  fragment?: string | FragmentFunction
  children: Array<VNode<any> | string>
  consumes?: string | string[]
}

export interface IRerenderPreventerProps {
  mapStateToProps?: MapStateFn | true | null
  mapActionsToProps?: MapActionFn | true | null
  fragment?: string | FragmentFunction
  childComponents: Array<VNode<any> | string>
  actions: any
  state: any
}

export interface IRerenderPreventerState extends IStateAndActions {
  isMerged: boolean
}

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

class Consumer extends Component<IConsumerProps, {}> {
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

export { Consumer }
