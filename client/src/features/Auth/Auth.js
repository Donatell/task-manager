import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';

// import {
//   decrement,
//   increment,
//   incrementByAmount,
//   incrementAsync,
//   incrementIfOdd,
//   selectCount,
// } from './counterSlice';

export default function Auth() {
	// const count = useSelector(selectCount);
	const [isSignUp, setSignUp] = useState(false);
	const [incrementAmount, setIncrementAmount] = useState('2');

	const handleChangeMode = () => {
		setSignUp(prevState => !prevState);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Grid container justify="center" alignItems="center">
				<Grid item>
					<Typography align={'center'}
					            component={'h1'}
					            variant={'h3'}>Task
					                           App</Typography>
					{isSignUp ? <SignUp onClickSignIn={handleChangeMode} /> :
						<SignIn onClickSignUp={handleChangeMode} />}
				</Grid>
			</Grid>
		</Container>
	);
}