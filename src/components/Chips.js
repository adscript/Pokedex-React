import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Paper } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    maxHeight: '50vh',
    overflowY: 'auto'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function Chips({
  chipData,
  label
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {chipData.map((data, index) => {
        return (
          <Chip
            key={index}
            variant="outlined"
            label={data[label].name.split('-').join(' ').replace(/^\w/, c => c.toUpperCase())}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}
