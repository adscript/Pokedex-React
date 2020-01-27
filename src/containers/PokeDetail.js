import React, { Component } from 'react'
import { PokeBar, DetailCard, Loading } from '../components'
import { connect } from 'react-redux'

import { push } from 'connected-react-router';
import { catchPokemon } from '../modules/actions/myPokeList'


class PokeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: true,
    };
  }

  componentDidMount() {
    this.setState({ isFetching: true }, () => {
      this.props.pokemonDetail.name ? this.setState({ isFetching: false}) :
      this.props.push('/')
    });
  }

  handleClick = (pokemon, myPokemon, index) => () => {
    this.props.catchPokemon(pokemon, myPokemon, index)
  }

  render() {
    const { name, types, moves, id } = this.props.pokemonDetail;

    return (
      <div>
        <PokeBar page="" push={this.props.push} />
        {
        this.state.isFetching ? 
          <Loading style={{ margin: '2vh', width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }} /> 
        :
          <div>
          <DetailCard 
            index={id} 
            pokename={name} 
            moves={moves} 
            types={types} 
            onClickButton={this.handleClick(this.props.pokemonDetail, this.props.pokemonOwned, id)}/>
          </div>
        }
      </div >
    )
  }
}

const mapStateToProps = state => ({
  ...state.pokeDetail,
  ...state.myPokemon
});

const mapDispatchToProps = (dispatch) => ({
  push: path => dispatch(push(path)),
  catchPokemon: (pokemon, myPokemon, index) => dispatch(catchPokemon(pokemon, myPokemon, index))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokeDetail)