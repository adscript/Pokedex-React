import React, { Component } from "react";
import { connect } from "react-redux";
import { PokeCard, PokeBar, Loading } from "../components";
import {
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  loadPokemon,
  loadPokemonByType,
  countOwned,
  resetPokemonList,
  loadListType,
} from "../modules/actions/pokeList";
import { loadDetail } from "../modules/actions/pokeDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import { push } from "connected-react-router";

class PokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      hasMore: true,
      filter: false,
      selectedFilter: {},
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true }, () => {
      this.props.loadPokemon({}, () => {
        this.setState({ isFetching: false });
      });
      this.props.loadListType();
    });
  }

  componentWillUnmount() {
    this.props.resetPokemonList();
  }

  fetchMoreData = (cb = () => {}) => {
    if (this.props.pokemon.length >= 964) {
      this.setState({ hasMore: false });
      return;
    }
    return this.props.loadPokemon(
      { firstload: false, next: this.props.next },
      cb
    );
  };

  toggleModal = () => {
    this.setState((prev) => ({ modal: !prev.modal }));
  };

  handleClick = (url) => () => {
    this.props.loadDetail({ url });
  };

  handleChange = (event) => {
    this.setState({ selectedFilter: { url: event.target.value } });
    this.setState({ isFetching: true });
    if (event.target.value) {
      this.props.loadPokemonByType({ typeUrl: event.target.value }, () => {
        this.setState({ filter: true, isFetching: false });
      });
    } else {
      this.props.loadPokemon({}, () => {
        this.setState({ isFetching: false, filter: false });
      });
    }
  };

  render() {
    return (
      <div>
        <PokeBar page="list" push={this.props.push} />
        <FormControl
          variant="outlined"
          style={{ marginTop: 20, marginLeft: 17, minWidth: 220 }}
        >
          <InputLabel id="select-label">Filter</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            label="Filter"
            value={this.state.selectedFilter.name}
            onChange={this.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {this.props.listType.map((item) => (
              <MenuItem key={item.url} value={item.url}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {this.state.isFetching ? (
          <Loading
            style={{
              margin: "2vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          />
        ) : (
          <div
            id="scrollableDiv"
            style={{
              marginTop: 10,
              width: "100%",
              height: "90vh",
              overflowY: "auto",
            }}
          >
            <InfiniteScroll
              dataLength={this.props.pokemon.length}
              next={this.state.filter ? null : this.fetchMoreData}
              hasMore={this.state.filter ? false : this.state.hasMore}
              loader={
                <Loading
                  style={{
                    margin: "2vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                />
              }
              scrollableTarget="scrollableDiv"
            >
              <Grid container spacing={1}>
                {this.props.pokemon.map((item, index) => {
                  let totalOwned = countOwned(
                    item.name,
                    this.props.pokemonOwned
                  );
                  return (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <PokeCard
                        clickable
                        pokename={item.name}
                        index={index}
                        totalOwned={totalOwned}
                        detail={item.detail}
                        onClick={this.handleClick(item.url)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </InfiniteScroll>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.pokeList,
  ...state.myPokemon,
});

const mapDispatchToProps = (dispatch) => ({
  loadPokemon: ({ firstload, next }, cb) =>
    dispatch(loadPokemon({ firstload, next }, cb)),
  loadPokemonByType: ({ typeUrl }, cb) =>
    dispatch(loadPokemonByType({ typeUrl }, cb)),
  loadDetail: ({ url }) => dispatch(loadDetail({ url })),
  loadListType: () => dispatch(loadListType()),
  resetPokemonList: () => dispatch(resetPokemonList()),
  push: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);
