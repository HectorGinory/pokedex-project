"use client";
import PokemonCard from "@/components/pokemonCard/PokemonCard";
import { useEffect, useState } from "react";
import { bring20PokemonByNumberPage, bringPokemonByRegExp } from "../api/pokeAPI";

import styles from '../../styles/pages/pokedex.module.css'

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(0);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    const bringPokemons = setTimeout(() => {
      if (criteria === "") {
        bring20PokemonByNumberPage(page).then((res) => {
          setPokemonList(res.pokemonList);
        });
      } else {
        bringPokemonByRegExp(page, criteria).then((res) => {
          setPokemonList(res.pokemonList)
        })
      }
    }, 375)
    
    return () => clearTimeout(bringPokemons)
  }, [criteria, page]);

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
      <div className={styles.pokemon_card_container}>
        {pokemonList.length > 0 &&
          pokemonList.map((pokemon, index) => {
            return <PokemonCard pokemon={pokemon} key={index} />;
          })}
      </div>
    </main>
  );
}
