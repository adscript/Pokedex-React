import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#47FFB5',
			hover: '#39CC91'
		},
		secondary: {
			main: '#94FFD4'
		},
		success: {
			main: '#5cb85c'
		},
		warning: {
			main: '#f8ac59'
		}
	},
	typography: {
		fontFamily: '"Product Sans", sans-serif'
	}
})