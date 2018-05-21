import { h } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'
import MainSection from '../components/MainSection'

export const Main = () => (
  <Consumer consumes="todo">
    {({ todos }, actions) => <MainSection todos={todos} actions={actions} />}
  </Consumer>
)
