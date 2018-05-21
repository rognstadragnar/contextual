import { h, Component } from 'preact'

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
}

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <TodoCount activeCount={this.props.activeCount} />
        <ul className="filters">
          {['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'].map(filter => (
            <li key={filter}>
              {
                <FilterLink
                  selectedFilter={this.props.filter}
                  onShow={this.props.onShow}
                  filter={filter}
                />
              }
            </li>
          ))}
        </ul>
        <ClearButton
          completedCount={this.props.completedCount}
          onClearCompleted={this.props.onClearCompleted}
        />
      </footer>
    )
  }
}

const TodoCount = ({ activeCount }) => {
  const itemWord = activeCount === 1 ? 'item' : 'items'

  return (
    <span class="todo-count">
      <strong>{activeCount || 'No'}</strong> {itemWord} left
    </span>
  )
}

const FilterLink = ({ filter, selectedFilter, onShow }) => {
  return (
    <a
      class={filter === selectedFilter ? 'selected' : ''}
      style={{ cursor: 'pointer' }}
      onClick={() => onShow(filter)}
    >
      {FILTER_TITLES[filter]}
    </a>
  )
}

const ClearButton = ({ completedCount, onClearCompleted }) => {
  if (completedCount > 0) {
    return (
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    )
  }
  return null
}
