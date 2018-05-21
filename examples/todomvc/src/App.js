import { h } from 'preact'
import { Consumer } from '@rognstadragnar/contextual'
import { TodoContainer } from './providers/TodoContainer'
import { Header } from './consumers/Header'
import { Main } from './consumers/Main'

const App = ({ todos, actions }) => {
  return (
    <TodoContainer>
      <div>
        <Main />
        <Header />
      </div>
    </TodoContainer>
  )
}

export default App
