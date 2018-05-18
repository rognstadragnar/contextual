import { h } from 'preact';
import { StoreConsumer } from '../../store';
import style from './style';

const Home = () => (
	<div class={style.home}>
		<StoreConsumer>{state => <h1>{state.count}</h1>}</StoreConsumer>
	</div>
);

export default Home;
