import { Component, h, VNode } from 'preact'
import { DEFAULT_CTX_PROPERTY } from './config'
import {
  extractStateAndActions,
  prepareChildren,
  transformStateAndActions
} from './utils'

export interface IProviderProps {
  name?: string
  actions?: any
  state?: any
  children: VNode[]
}

class Provider extends Component<IProviderProps> {
  public displayName = `Provider`
  public getChildContext() {
    const name = this.props.name || DEFAULT_CTX_PROPERTY
    return {
      [name]: {
        actions: this.props.actions || {},
        state: this.props.state || {}
      }
    }
  }

  public render() {
    return this.props.children[0] || null
  }
}

export { Provider }
