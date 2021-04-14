import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute/index.js';
import Auth from './features/Auth/Auth.js';
import TaskPage from './features/Tasks/TaskPage.js';

function App() {
	return (
		<>
			<BrowserRouter>
				<Switch>
					<PrivateRoute path={'/tasks'} component={TaskPage} />
					<Route path={'/'}>
						<Auth />
					</Route>
				</Switch>

			</BrowserRouter>
		</>
	);
}

export default App;