import { h } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'
import HeaderSection from '../components/HeaderSection'

export const Header = () => (
  <Consumer consumes="todo">
    {(state, { addTodo }) => <HeaderSection addTodo={addTodo} />}
  </Consumer>
)
