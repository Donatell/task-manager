import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function Copyright() {
	return (
		<Typography variant="body2" color="inherit" align="center">
			{'Copyright © '}
			<Link color="inherit"
			      href="https://github.com/Donatell/task-manager">
				Task App
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}