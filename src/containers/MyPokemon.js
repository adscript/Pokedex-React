import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  PokeCard,
  PokeBar,
} from '../components'
import {
  Grid,
} from '@material-ui/core'
import { releasePokemon } from '../modules/actions/myPokeList'
import { push } from 'connected-react-router';

class MyPokemon extends Component {

  handleClick = (pokemon) => () => {
    this.props.releasePokemon(pokemon);
  }

  render() {
    return (
      <div>
        <PokeBar page="my-list" push={this.props.push} />
        <div id="scrollableDiv" style={{ marginTop: 10, width: '100%', height: '90vh', overflowY: "auto" }}> 
            <Grid container spacing={1} >
              {this.props.pokemonOwned.map((item, index) => {
                return <Grid item xs={6} sm={4} md={3} key={index}>
                  <PokeCard
                    nickname={item.nickname}
                    pokename={item.name}
                    imageUrl={item.sprites.front_default}
                    onClickButton={this.handleClick(item)}
                    page='my-list'
                  />
                </Grid>
              })}
            </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.myPokemon
});

const mapDispatchToProps = (dispatch) => ({
  releasePokemon: (pokemon) => dispatch(releasePokemon(pokemon)),
  push: path => dispatch(push(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPokemon)