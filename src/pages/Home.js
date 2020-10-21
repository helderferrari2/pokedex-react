import React, { Component } from "react";
import {
  searchKantoPokemon,
  getPokemonsByName,
} from "../services/pokemon.service";
import { Col, Container, Row } from "react-bootstrap";
import Pokecard from "../components/Pokecard";

export default class Home extends Component {
  state = {
    items: [],
    pokemonTypes: [
      "grass",
      "poison",
      "fire",
      "flying",
      "water",
      "bug",
      "normal",
      "electric",
      "ground",
      "fairy",
      "fighting",
      "psychic",
      "rock",
      "steel",
      "ice",
      "ghost",
      "dragon",
    ],
  };

  componentDidMount() {
    this.searchKantoPokemon();
  }

  searchKantoPokemon = () => {
    searchKantoPokemon().then((res) => this.setState({ items: res }));
  };

  searchPokemonsByName = (name) => {
    if (name !== "") {
      getPokemonsByName(name).then((res) => this.setState({ items: res }));
    } else {
      searchKantoPokemon().then((res) => this.setState({ items: res }));
    }
  };

  render() {
    let { items, pokemonTypes } = this.state;

    return (
      <Container>
        {/* Filter */}
        <Row>
          <Col xs={4}>
            <div className="nes-select">
              <select required id="default_select">
                <option value="">All</option>
                {pokemonTypes.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </Col>
          <Col xs={8}>
            <div className="nes-field">
              <input
                type="text"
                id="name_field"
                className="nes-input"
                placeholder="Search by name..."
                onChange={(e) => this.searchPokemonsByName(e.target.value)}
              ></input>
            </div>
          </Col>
        </Row>

        {/* Pokelist */}
        <Row>
          {items.length &&
            items.map((item) => (
              <Col key={item.id}>
                <Pokecard item={item} key={item.id} />
              </Col>
            ))}
        </Row>
      </Container>
    );
  }
}
