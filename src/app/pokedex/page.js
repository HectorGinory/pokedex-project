"use client";
import PokemonCard from "@/components/pokemonCard/PokemonCard";
import { useEffect, useState } from "react";
import {
  bring20PokemonByNumberPage,
  bringPokemonByRegExp,
} from "../api/pokeAPI";

import styles from "../../styles/pages/pokedex.module.css";

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [page, setPage] = useState(0);
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    const bringPokemons = setTimeout(() => {
      if (criteria === "") {
        bring20PokemonByNumberPage(page).then((res) => {
          setPokemonList(res.pokemonList);
          setTotalPokemon(res.totalPokemon);
          console.log(res.totalPokemon);
          console.log(page * 20);
        });
      } else {
        bringPokemonByRegExp(page, criteria).then((res) => {
          setPokemonList(res.pokemonList);
          setTotalPokemon(res.totalPokemon);
        });
      }
    }, 375);

    return () => clearTimeout(bringPokemons);
  }, [criteria, page]);

  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
  };

  return (
    <div className={styles.pokedex_container}>
      <div className={styles.pokedex}>
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
        <div className={styles.btn_container}>
          {page > 0 && (
            <button onClick={() => setPage(page - 1)}>{page - 1}</button>
          )}
          <button>{page}</button>
          {(page === 0 || page < Math.round(totalPokemon / (page * 20))) && (
            <button onClick={() => setPage(page + 1)}>{page + 1}</button>
          )}
        </div>
      </div>
    </div>
  );
}
