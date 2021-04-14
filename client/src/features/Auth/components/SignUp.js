import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import settings from '../../../settings.js';
import { fetchUser, removeUser, setUser } from '../userSlice.js';
import Copyright from './Copyright.js';
import { useStyles } from './styles.js';

export default function SignUp({ onClickSignIn }) {
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const history = useHistory();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const classes = useStyles();

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(fetchUser());
		axios.post(`${settings.apiURL}/users`, {
			name, email, password
		}).then(({ data, status }) => {
			if (status === 201) {
				// Signed up successfully
				setCookie('token', data.token, {
					path: '/',
					expires: new Date(Date.now() + 86400000)
				});
				dispatch(setUser({ user: data.user, token: data.token }));
				enqueueSnackbar(data.msg, {
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					},
					variant: 'success',
					TransitionComponent: Fade
				});
				history.push('/tasks');
			} else if (status === 202) {
				// E-Mail already taken
				enqueueSnackbar(data.msg, {
					anchorOrigin: {
						vertical: 'bottom',
						horizontal: 'right'
					},
					variant: 'error',
					TransitionComponent: Fade
				});
			}
		}).catch(({ data }) => {
			dispatch(removeUser());
			enqueueSnackbar(data.msg, {
				anchorOrigin: {
					vertical: 'bottom',
					horizontal: 'right'
				},
				variant: 'error',
				TransitionComponent: Fade
			});
		});
	};

	return (
		<>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<form className={classes.form}
				      noValidate
				      onSubmit={handleSubmit}>
					<TextField
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="name"
					/>
					<TextField
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						Sign Up
					</Button>
				</form>
				<Grid container justify="flex-end">
					<Grid item>
						<Link component="button"
						      onClick={onClickSignIn}
						      variant="body2">
							Already have an account? Sign in
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