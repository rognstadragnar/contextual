import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';

import { StoreProvider } from '../store';

if (module.hot) {
	require('preact/debug');
}

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	}

	render() {
		return (
			<div id="app">
				<Header />

				<StoreProvider>
					<div style={{ paddingTop: 50 }}>
						<Router onChange={this.handleRoute}>
							<Home path="/" />
							<Profile path="/profile/" user="me" />
							<Profile path="/profile/:user" />
						</Router>
					</div>
				</StoreProvider>
			</div>
		);
	}
}
