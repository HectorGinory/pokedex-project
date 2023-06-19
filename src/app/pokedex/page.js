"use client";
import PokemonCard from "@/components/pokemonCard/PokemonCard";
import { useEffect, useState } from "react";
import { bring20PokemonByNumberPage } from "../api/pokeAPI";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    bring20PokemonByNumberPage(page).then((res) => {
      setPokemonList(res.pokemonList);
    });
  }, []);


  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
  };

  return (
    <main>
      <input
        name="criteria"
        placeholder="Ej.: Bulbasaur"
        type="text"
        onChange={(e) => criteriaHandler(e)}
      />
      <div className="pokemonCardContainer">
        {pokemonList.length > 0 &&
          pokemonList.map((pokemon, index) => {
            return <PokemonCard pokemon={pokemon} key={index} />;
          })}
      </div>
    </main>
  );
}
