import { IConsumerProps } from './index.d'
import { VNode, Component } from 'preact'

export type MapStateFn = (state: any) => object
export type MapState = MapStateFn | null | boolean

export type MapActionFn = (actions: any, state: any) => object
export type MapAction = MapActionFn | null | boolean

export type VNodeFn = (state: any, action?: any) => VNode
export type FragmentFunction = (children: any[]) => any

export interface IStateAndActions {
  actions: any
  state: any
}

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

export interface IProviderProps {
  name?: string
  actions?: any
  state?: any
  children: VNode[]
}

export class Consumer extends Component<IConsumerProps, {}> {
  render(): VNode
}

export class Provider extends Component<IProviderProps, {}> {
  render(): VNode
}
