import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core/';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    padding: 10,
    backgroundColor: 'black',
    border: `solid ${theme.palette.primary}`,
    borderRadius: 5,
    color: '#39CC91'
  }
}));

export default function PokeBar({
  page = '',
  push,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {page === 'my-list' ? 'My Pokemon' : 'Pokemon Dex'}
          </Typography>
          <div>
            <IconButton
              aria-label="Pokemon List"
              color="inherit"
              onClick={() => (push('/'))}
            >
              {page === 'list' ? <ListAltIcon className={classes.icon} /> : <ListAltIcon className={classes.icon} style={{ borderColor: 'black', color: 'black', backgroundColor: '#47FFB5' }} />}
            </IconButton>
            <IconButton
              aria-label="My Pokemon"
              color="inherit"
              onClick={() => (push('/my-list'))}
            >
              {page === 'my-list' ? <PermIdentityOutlinedIcon className={classes.icon} /> : <PermIdentityOutlinedIcon className={classes.icon} style={{ borderColor: 'black', color: 'black', backgroundColor: '#47FFB5' }} />}
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}
