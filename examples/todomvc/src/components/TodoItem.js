import { h, Component } from 'preact'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      this.props.editTodo({ id, text })
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={text => this.handleSave(todo.id, text)}
        />
      )
    } else {
      element = (
        <div class="view">
          <input
            class="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDblClick={this.handleDoubleClick}>{todo.text}</label>
          <button class="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }

    const classes = `
      ${todo.completed ? 'completed ' : ''}
      ${this.state.editing ? 'editing' : ''}
    `

    return <li class={classes}>{element}</li>
  }
}
