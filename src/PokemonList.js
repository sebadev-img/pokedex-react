import React from "react";
import "./PokemonList.css";

function PokemonList({ pokemonList, getPokemonInfo }) {
  console.log("Rendering List...");
  return (
    <nav>
      <ul>
        {pokemonList.map((pokemon) => {
          return (
            <li key={pokemon.name} onClick={() => getPokemonInfo(pokemon.url)}>
              {pokemon.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default PokemonList;
