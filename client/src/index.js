import { SnackbarProvider } from 'notistack';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<CookiesProvider>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</CookiesProvider>
	</Provider>,
	document.getElementById('root')
);