import { Component, h, VNode } from 'preact'
import { DEFAULT_CTX_PROPERTY } from './config'
import { IProviderProps } from './index.d'

class Provider extends Component<IProviderProps> {
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

Provider.displayName = `Contextual(Provider)`

export { Provider }
