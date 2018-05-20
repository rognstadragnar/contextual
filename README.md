<p align="center"><strong>contextual</strong></p>
<p align="center"><i>Application state without the ceremony</i></p>

## Installation

```
npm i @rognstadragnar/contextual
```

## Basic usage

### Step 1: Create `Provider` components

They must wrap whatever wants to consume their state and actions.

```javascript
import { h, Component } from 'preact'
import { Provider } from '@rognstadragnar/contextual'

class CounterContainer extends Component {
  state = {
    count: 0
  }
  increment = todo => {
    const count = this.state.count + 1
    this.setState({ count })
  }
  decrement = todo => {
    const count = this.state.count - 1
    this.setState({ count })
  }
  render() {
    return (
      <Provider
        name="counter-state"
        state={{ count: this.state.count }}
        actions={{
          increment: this.increment,
          decrement: this.decrement
        }}
      >
        <Counter />
      </Provider>
    )
  }
}
```

### Step 2: Create `<Consumer />` components

They can be used anywhere in your component tree as long as the `<Provider />` they consume wraps them.

```javascript
import { h, Component } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'

const Counter = () => {
  return (
    <Consumer consumes="counter-state">
      {(state, actions) => (
        <main>
          <h1>{state.count}</h1>
          <button onClick={actions.increment}>Increment</button>
          <button onClick={actions.decrement}>Decrement</button>
        </main>
      )}
    </Consumer>
  )
}
```

## Properties

### `<Provider />`

| Property  | Type     | Description                                           | Required                                    |
| --------- | -------- | ----------------------------------------------------- | ------------------------------------------- |
| `name`    | `string` | identifier used if multiple `<Provider />` in one app |  Yes, if using more than one `<Provider />` |
| `state`   | `any`    | State available to consumers throughout the app       | No                                          |
| `actions` | `any`    | Actions available throughout the app                  | No                                          |

### `<Consumer />`

| Property            | Type                                                                               | Description                                                          | Required |
| ------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------- |
| `consumes`          | `string` or `string[]`                                                             | Which `<Provider />` it consumes                                     | Yes      |
| `children`          | `Component<{state, actions}>` or `(state, actions) => Component<{state, actions}>` | The children of the `<Consumer />`                                   | Yes      |
| `mapStateToProps`   | `null` or `(state) => any`                                                         | Extract or transform the state provided to the consumer              | No       |
| `mapActionsToProps` | `null` or `(actions, state) => any`                                                | Extract or transform the actions provided to the consumer            | No       |
| `fragment`          | `Component` or `(children) => Component`                                           | Wraps the children. Default to a `<span />` if `children.length > 2` | No       |

> Note:
> _If using either `mapStateToProps`, `mapActionsToProps` or both, props will be flattened like so `{ ...state, ...actions, ...rest }`_

## License

[MIT](LICENSE).
