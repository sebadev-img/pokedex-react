import React from "react";
import "./PokemonInfo.css";

function PokemonInfo({ pokemon }) {
  console.log("Rendering PokemonInfo...");
  return (
    <article className="card-container">
      <img src={pokemon.img} alt="pokemon image" />
      <h3>#{pokemon.id}</h3>
      <h1>{pokemon.name}</h1>
      <div className="types-container">
        {pokemon.types.map((type) => {
          return (
            <p className={type} key={type}>
              {type}
            </p>
          );
        })}
      </div>
    </article>
  );
}

export default PokemonInfo;
