import { h, Component } from 'preact'
import TodoItem from './TodoItem'
import Footer from './Footer'

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed
}

export default class MainSection extends Component {
  state = { filter: 'SHOW_ALL' }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted()
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state

    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    )

    return (
      <section className="main">
        <ToggleAll
          completedCount={completedCount}
          todos={todos}
          actions={actions}
        />
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} {...actions} />
          ))}
        </ul>
        <MainFooter
          handleClearCompleted={this.handleClearCompleted}
          handleShow={this.handleShow}
          completedCount={completedCount}
          todos={todos}
          filter={filter}
        />
      </section>
    )
  }
}

const ToggleAll = ({ completedCount, todos, actions }) => {
  if (todos.length > 0) {
    return (
      <span>
        <input
          class="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
        />
        <label onClick={actions.completeAll} />
      </span>
    )
  }
  return null
}

const MainFooter = ({
  completedCount,
  todos,
  filter,
  handleClearCompleted,
  handleShow
}) => {
  const activeCount = todos.length - completedCount

  if (todos.length) {
    return (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={handleClearCompleted}
        onShow={handleShow}
      />
    )
  }
  return null
}
