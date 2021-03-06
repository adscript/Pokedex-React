import React from "react";
import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import Chips from "./Chips";
import { makeStyles } from "@material-ui/core/styles";
import { IMAGE_BASE_URL } from "../modules/constants";

const useStyles = makeStyles((theme) => ({
  cardButton: {
    margin: 15,
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    "&:hover": {
      margin: 10,
      backgroundColor: theme.palette.primary.hover,
      boxShadow: `10px 10px ${theme.palette.secondary.main}`,
      cursor: "pointer",
    },
    "&:active": {
      margin: 12,
      backgroundColor: theme.palette.primary.hover,
      boxShadow: `5px 5px ${theme.palette.secondary.main}`,
      cursor: "pointer",
    },
  },
  card: {
    margin: 15,
    backgroundColor: theme.palette.primary.main,
    padding: 20,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    objectFit: "cover",
    maxWidth: 100,
    maxHeight: 100,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

export default function PokeCard({
  clickable = false,
  onClick = () => {},
  style = {},
  pokename,
  detail,
  index,
  imageUrl = null,
  totalOwned = 0,
  nickname,
  page = "list",
  onClickButton,
}) {
  const classes = useStyles();
  const onMediaFallback = (event) =>
    (event.target.src =
      "https://pngimg.com/uploads/pokeball/pokeball_PNG24.png");
  return (
    <Card
      className={clickable ? classes.cardButton : classes.card}
      style={style}
      onClick={onClick}
    >
      <CardActions className={classes.columnContainer}>
        {nickname && (
          <Typography
            variant="h4"
            style={{ fontSize: 23, textTransform: "capitalize" }}
          >
            {nickname}
          </Typography>
        )}

        <div className={classes.rowContainer}>
          <CardMedia
            component="img"
            alt={pokename}
            height="140"
            image={imageUrl ? imageUrl : `${IMAGE_BASE_URL}${detail.id}.png`}
            title={pokename}
            className={classes.cardMedia}
            onError={onMediaFallback}
          />
        </div>
        <Typography
          variant="h4"
          style={{ fontSize: 21, textTransform: "capitalize" }}
        >
          {pokename.split("-").join(" ")}
        </Typography>
        <Typography
          variant="h4"
          style={{ fontSize: 21, textTransform: "capitalize" }}
        >
          {detail?.types && (
            <Chips
              chipData={detail.types}
              label="type"
              style={{ marginBottom: 10 }}
            />
          )}
        </Typography>
        {page === "list" && (
          <Typography component="p" style={{ fontSize: 15 }}>
            Owned: {totalOwned}
          </Typography>
        )}
        {page === "my-list" && (
          <Button
            variant="outlined"
            style={{ backgroundColor: "red", marginTop: 10 }}
            onClick={onClickButton}
          >
            Release
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
