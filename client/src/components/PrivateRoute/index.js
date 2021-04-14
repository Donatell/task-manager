import { useCookies } from 'react-cookie';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const [cookies] = useCookies(['token']);
	console.log(cookies);
	console.log(cookies.hasOwnProperty('token'));

	return (
		<Route {...rest}
		       render={(props) => (cookies.hasOwnProperty('token') ?
			       <Component {...props} /> :
			       <Redirect to="/" />)} />
	);
};

export default PrivateRoute;