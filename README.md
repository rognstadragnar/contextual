<p align="center"><strong>contextual</strong></p>
<p align="center"><i>Unceremonious application state</i></p>

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
import { Something } from './somwhere'

export class CounterContainer extends Component {
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
        <Something />
      </Provider>
    )
  }
}
```

### Step 2: Create `<Consumer />` components

They can be used anywhere in your component tree as long as the `<Provider />` they consume wraps them.

State and actions from the `<Provider />` can be leveraged in ceveral ways:

1.  Functions that return components
2.  Components injected with state and actions
3.  _TODO_: Render property
4.  _TODO_: Consume/connect wrapper functions like `react-redux`

#### 1. Functions as consumer children

```javascript
import { h, Component } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'

const SomeComponent = ({ count, increment, decrement }) => {
  return (
    <main>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </main>
  )
}

export const Something = () => {
  return (
    <Consumer consumes="counter-state">
      {(state, actions) => (
        <SomeComponent
          count={state.count}
          increment={actions.increment}
          decrement={actions.decrement}
        />
      )}
    </Consumer>
  )
}
```

#### 2. Components with injectable props as consumer children

```javascript
import { h, Component } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'

const SomeComponent = ({ state, actions }) => {
  return (
    <main>
      <h1>{state.count}</h1>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={actions.decrement}>Decrement</button>
    </main>
  )
}

export const Something = () => {
  return (
    <Consumer consumes="counter-state">
      <MyComponent />
    </Consumer>
  )
}
```

#### 3. TODO: Render property

```javascript
import { h, Component } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'

const SomeComponent = ({ count, increment, decrement }) => {
  return (
    <main>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </main>
  )
}

export const Something = () => {
  return (
    <Consumer
      consumes="counter-state"
      render={(state, actions) => (
        <SomeComponent
          count={state.count}
          increment={actions.increment}
          decrement={actions.decrement}
        />
      )}
      // or like this, similiar to #3
      render={<SomeComponent />}
    />
  )
}
```

#### 4. TODO: React-redux inspired consume/connect function

```javascript
import { h, Component } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'

const MyComponent = ({ state, actions }) => {
  return (
    <main>
      <h1>{state.count}</h1>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={actions.decrement}>Decrement</button>
    </main>
  )
}

export const Something = consume({ consumes: 'counter-state' })(MyComponent)
```

## Properties

### `<Provider />`

| Property  | Type     | Description                                           | Required                                    |
| --------- | -------- | ----------------------------------------------------- | ------------------------------------------- |
| `name`    | `string` | identifier used if multiple `<Provider />` in one app |  Yes, if using more than one `<Provider />` |
| `state`   | `any`    | State available to consumers throughout the app       | No                                          |
| `actions` | `any`    | Actions available throughout the app                  | No                                          |

### `<Consumer />`

| Property             | Type                                                                               | Description                                                                 | Required |
| -------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| `consumes`           | `string` or `string[]`                                                             | Which `<Provider />` it consumes                                            | Yes      |
| `children` (regular) | `Component<{state, actions}>` or `(state, actions) => Component<{state, actions}>` | The children of the `<Consumer />`                                          | Yes      |
| **TODO:** `render`   | `Component<{state, actions}>` or `(state, actions) => Component<{state, actions}>` | Instead of chidren                                                          | No       |
| `mapStateToProps`    | `null` or `(state) => any`                                                         | Extract or transform the state provided to the consumer                     | No       |
| `mapActionsToProps`  | `null` or `(actions, state) => any`                                                | Extract or transform the actions provided to the consumer                   | No       |
| `fragment`           | `Component` or `(children) => Component`                                           | Wraps the children. Default: nothing or `<span />` if `children.length > 2` | No       |

> Note:
>
> 1.  _If using either `mapStateToProps`, `mapActionsToProps` or both, props will be flattened like so `{ ...state, ...actions, ...rest }`_
> 2.  _If `consumes` is an array of strings (e.g. `<Consumer consumes={['a', 'b']} />`, each will be object properties of the state and actions (e.g. `{ a: ..., b: ... }`)_

## Examples

* [TodoMVC]
* [Counter]

## License

[MIT](LICENSE).

[todomvc]: examples/todomvc
[counter]: examples/counter
