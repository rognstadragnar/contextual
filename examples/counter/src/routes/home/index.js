import { h } from 'preact';
import { Consumer } from '@rognstadragnar/contextual';
import { StoreConsumer } from '../../store';
import style from './style';

const mapStateToProps = state => ({ mock: state.mock, count: state.count });
const Fn = ({ mock, count, somethingElse }) => (
	<h1>
		{somethingElse}
		{JSON.stringify(mock[count], null, 2)}
	</h1>
);
const Home = () => (
	<div class={style.home}>
		<Consumer consumes="reduxlike" mapStateToProps={mapStateToProps}>
			<Fn somethingElse={'lol'} />
		</Consumer>
		<StoreConsumer>{state => <h1>{state.count}</h1>}</StoreConsumer>
	</div>
);

export default Home;
