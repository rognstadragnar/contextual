import { Component } from 'preact';
import { Provider, Consumer } from '@rognstadragnar/contextual';
import { mock } from './mock';
const reducer = (state, action) => {
	switch (action.type) {
		case 'INC':
			return {
				...state,
				count: state.count + 1
			};
		case 'DEC':
			return {
				...state,
				count: state.count - 1
			};
		default:
			return state;
	}
};

const actions = {
	inc: (...args) => ({ type: 'INC' }),
	dec: (...args) => ({ type: 'DEC' })
};

const bindActionCreators = (actions, dispatch) =>
	Object.keys(actions).reduce(
		(pv, cv) => ({
			...pv,
			[cv]: (...args) => dispatch(actions[cv](...args))
		}),
		{}
	);

export class StoreProvider extends Component {
	state = {
		count: 0,
		mock
	}

	dispatch = action => {
		this.setState(reducer(this.state, action));
	}

	render() {
		return (
			<Provider
				name="reduxlike"
				state={this.state}
				actions={{ ...bindActionCreators(actions, this.dispatch) }}
			>
				{this.props.children[0] || null}
			</Provider>
		);
	}
}

export const StoreConsumer = () => (
	<Consumer consumes="reduxlike">
		{state => <h1>{state.count}</h1>}
		{(state, actions) => (
			<div>
				<button onClick={actions.dec}>-</button>
				<button onClick={actions.inc}>+</button>
			</div>
		)}
	</Consumer>
);
