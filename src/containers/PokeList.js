import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  PokeCard,
  PokeBar,
  Loading,
} from '../components'
import {
  Grid,
} from '@material-ui/core'
import { loadPokemon, countOwned, resetPokemonList } from '../modules/actions/pokeList'
import { loadDetail } from '../modules/actions/pokeDetail'
import InfiniteScroll from 'react-infinite-scroll-component';
import { push } from 'connected-react-router';

class PokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      hasMore: true
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true }, () => {
      this.props.loadPokemon({}, () => {
        this.setState({ isFetching: false });
      });
    });
  }

  componentWillUnmount() {
    this.props.resetPokemonList()
  }

  fetchMoreData = (cb = () => { }) => {
    if (this.props.pokemon.length >= 964) {
      this.setState({ hasMore: false });
      return;
    }
    return this.props.loadPokemon({ firstload: false, next: this.props.next }, cb)
  };

  handleClick = url => () => {
    this.props.loadDetail({ url });
  }

  render() {
    return (
      <div>
        <PokeBar page="list" push={this.props.push}/>
        {this.state.isFetching ?
          <Loading style={{ margin: '2vh', width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }} />
          :
          <div id="scrollableDiv" style={{ marginTop: 10, width: '100%', height: '90vh', overflowY: "auto" }}>
            <InfiniteScroll
              dataLength={this.props.pokemon.length}
              next={this.fetchMoreData}
              hasMore={this.state.hasMore}
              loader={<Loading style={{ margin: '2vh', width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }} />}
              scrollableTarget="scrollableDiv"
            >
              <Grid container spacing={1} >
                {this.props.pokemon.map((item, index) => {
                  let totalOwned = countOwned(item.name, this.props.pokemonOwned)
                  return <Grid item xs={6} sm={4} md={3} key={index}>
                    <PokeCard 
                      clickable 
                      pokename={item.name} 
                      index={index} 
                      totalOwned={totalOwned} 
                      onClick={this.handleClick(item.url)} 
                    />
                  </Grid>
                })}
              </Grid>
            </InfiniteScroll>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.pokeList,
  ...state.myPokemon
});

const mapDispatchToProps = (dispatch) => ({
  loadPokemon: ({ firstload, next }, cb) => dispatch(loadPokemon({ firstload, next }, cb)),
  loadDetail: ({ url }) => dispatch(loadDetail({ url })),
  resetPokemonList: () => dispatch(resetPokemonList()),
  push: path => dispatch(push(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokeList)