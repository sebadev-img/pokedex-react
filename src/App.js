import "./App.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";

//Components
import PokemonList from "./PokemonList";
import PokemonInfo from "./PokemonInfo";

const pokemonURL = "https://pokeapi.co/api/v2/pokemon";
const firstPokemonURL = "https://pokeapi.co/api/v2/pokemon/1";

let prevPageURL = null;
let nextPageURL = null;

function App() {
  const [isListLoading, setIsListLoading] = useState(true);
  const [isPokemonInfoLading, setIsPokemonInfoLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [totalNumberOfPokemon, setTotalNumberOfPokemon] = useState(0);
  const [pokemon, setPokemon] = useState({});

  const getPokemonList = async (url) => {
    try {
      setIsListLoading(true);
      const response = await axios.get(url);
      const data = response.data;
      setTotalNumberOfPokemon(data.count);
      prevPageURL = data.previous;
      nextPageURL = data.next;
      setPokemonList(data.results);

      setIsListLoading(false);
    } catch (error) {
      console.log(error);
      setIsListLoading(false);
    }
  };

  const getTypes = (types) => {
    const typeNames = types.map((type) => type.type.name);
    return typeNames;
  };

  const getPokemonInfo = async (url) => {
    setIsPokemonInfoLoading(true);
    try {
      const response = await axios.get(url);
      const data = response.data;
      const newPokemon = {
        id: data.id,
        name: data.name,
        img: data.sprites.other["official-artwork"].front_default,
        types: getTypes(data.types),
      };
      setPokemon(newPokemon);
      setIsPokemonInfoLoading(false);
    } catch (error) {
      console.log(error);
      setIsPokemonInfoLoading(false);
    }
  };

  const handlePrevButton = () => {
    if (prevPageURL) {
      getPokemonList(prevPageURL);
    }
  };
  const handleNextButton = () => {
    if (nextPageURL) {
      getPokemonList(nextPageURL);
    }
  };

  useEffect(() => {
    getPokemonList(pokemonURL);
    getPokemonInfo(firstPokemonURL);
  }, []);

  console.log("Rendering App...");
  return (
    <div className="App">
      <header>
        <h1>pokedex</h1>
        <div className="author-container">
          <h2>sebaDev</h2>
          <div className="icon-container">
            <a href="https://github.com/sebadev-img" target="_blank">
              <SiGithub />
            </a>
            <a href="" target="_blank">
              <SiLinkedin />
            </a>
            <a
              href="https://www.instagram.com/sebastianperez.img/"
              target="_blank"
            >
              <SiInstagram />
            </a>
          </div>
        </div>
      </header>
      <main>
        <section className="list-container">
          <div className="navbar">
            <h3>
              Hay {totalNumberOfPokemon} <span>Pokemon</span> en la Pokedex
            </h3>
            <div className="btn-container">
              <button onClick={handlePrevButton}>prev</button>
              <button onClick={handleNextButton}>next</button>
            </div>
          </div>
          {isListLoading ? (
            <p> Loading...</p>
          ) : (
            <PokemonList
              pokemonList={pokemonList}
              getPokemonInfo={getPokemonInfo}
              pokemon={pokemon}
            ></PokemonList>
          )}
        </section>
        <section className="pokemon-info-container">
          {isPokemonInfoLading ? (
            <p>Loading...</p>
          ) : (
            <PokemonInfo pokemon={pokemon}></PokemonInfo>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
