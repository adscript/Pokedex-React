import React from 'react'
import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Chips from './Chips'

const useStyles = makeStyles(theme => ({
  cardButton: {
    margin: 15,
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    '&:hover': {
      margin: 10,
      backgroundColor: theme.palette.primary.hover,
      boxShadow: `10px 10px ${theme.palette.secondary.main}`,
      cursor: 'pointer'
    },
    '&:active': {
      margin: 12,
      backgroundColor: theme.palette.primary.hover,
      boxShadow: `5px 5px ${theme.palette.secondary.main}`,
      cursor: 'pointer'
    }
  },
  card: {
    margin: 15,
    backgroundColor: theme.palette.primary.main,
    padding: 20,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    objectFit: 'cover',
    maxWidth: 100,
    maxHeight: 100,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
}))

export default function DetailCard({
  clickable = false,
  onClick = () => { },
  onClickButton = () => { },
  style = {},
  pokename,
  index,
  moves,
  types,
}) {
  const classes = useStyles();
  return (
    <Card className={clickable ? classes.cardButton : classes.card} style={style} onClick={onClick}>
      <CardActions className={classes.columnContainer}>
        <div className={classes.rowContainer}>
          <CardMedia
            component="img"
            alt={pokename}
            height="140"
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`}
            title={pokename}
            className={classes.cardMedia}
          />
        </div>
        <Typography component="h4" style={{ fontSize: 25, textTransform: 'capitalize' }}>
          {pokename}
        </Typography>
        <Typography component="p" style={{ fontSize: 15 }}>
          Types:
        </Typography>
        <Chips chipData={types} label='type' style={{ marginBottom: 10 }} />
        <Typography component="p" style={{ fontSize: 15 }}>
          Moves:
        </Typography>
        <Chips chipData={moves} label='move' />
        <Button variant="outlined" style={{backgroundColor: '#f4d242', marginTop: 10}} onClick={onClickButton}>
          Catch
        </Button>
      </CardActions>
    </Card>
  )
}