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
          if(res.pageNumber === page) {
            setPokemonList(res.pokemonList);
            setTotalPokemon(res.totalPokemon);
          }
        });
      } else {
        bringPokemonByRegExp(page, criteria).then((res) => {
          if(res.pageNumber === page) {
          setPokemonList(res.pokemonList);
          setTotalPokemon(res.totalPokemon);
          }
        });
      }
    }, 375);

    return () => clearTimeout(bringPokemons);
  }, [criteria, page]);

  const criteriaHandler = (e) => {
    setCriteria(e.target.value);
    setPage(0)
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
            <button onClick={() => setPage(page - 1)} className={styles.nonpage_btn}>{page}</button>
          )}
          <button className={styles.page_btn}>{page + 1}</button>
          {(page < Math.round(totalPokemon/20)) && (
            <button onClick={() => setPage(page + 1)} className={styles.nonpage_btn}>{page + 2}</button>
          )}
        </div>
        <div className={styles.home_btn}>
          <a href="/">Volver al inicio</a>
        </div>
      </div>
    </div>
  );
}
