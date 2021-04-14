import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import Copyright from './Copyright.js';
import { useStyles } from './styles.js';

export default function SignIn({ onClickSignUp }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
	};

	return (
		<>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign In
				</Typography>
				<form className={classes.form}
				      noValidate
				      onSubmit={handleSubmit}>
					<TextField
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
					/>
					<TextField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
				</form>
				<Grid container justify="flex-end">
					<Grid item>
						<Link component="button"
						      onClick={onClickSignUp}
						      variant="body2">
							{'Don\'t have an account? Sign Up'}
						</Link>
					</Grid>
				</Grid>
			</div>
			<Box mt={10}>
				<Copyright />
			</Box>
		</>
	);
}