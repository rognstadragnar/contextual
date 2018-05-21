import { h, Component } from 'preact'
import { Provider } from '@rognstadragnar/contextual'

export class TodoContainer extends Component {
  state = {
    todos: []
  }
  addTodo = text => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id:
            this.state.todos.reduce(
              (maxId, todo) => Math.max(todo.id, maxId),
              -1
            ) + 1,
          completed: false,
          text: text
        }
      ]
    })
  }
  deleteTodo = id => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }
  editTodo = ({ id, text }) => {
    this.setState({
      todos: this.state.todos.map(
        todo => (todo.id === id ? { ...todo, text: text } : todo)
      )
    })
  }

  completeTodo = id => {
    this.setState({
      todos: this.state.todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    })
  }

  completeAll = () => {
    const areAllMarked = this.state.todos.every(todo => todo.completed)
    this.setState({
      todos: this.state.todos.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))
    })
  }
  clearCompleted = () => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.completed === false)
    })
  }
  render() {
    return (
      <Provider
        name="todo"
        state={{ todos: this.state.todos }}
        actions={{
          addTodo: this.addTodo,
          deleteTodo: this.deleteTodo,
          editTodo: this.editTodo,
          completeTodo: this.completeTodo,
          completeAll: this.completeAll,
          clearCompleted: this.clearCompleted
        }}
      >
        {this.props.children[0]}
      </Provider>
    )
  }
}
