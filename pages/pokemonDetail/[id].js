import { bringPokemonById } from "@/app/api/pokeAPI";
import { bringMealByFirstPokemonLetter } from "@/app/api/theMealdbApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../src/styles/pages/pokemonDetail.module.css";

export default function PokemonDetail() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState({});
  const [meal, setMeal] = useState({});

  useEffect(() => {
    if (router.query.id) {
      bringPokemonById(router.query.id).then((res) => {
        setPokemon(res.data);
        bringMealByFirstPokemonLetter(res.data.name).then((res) => {
          setMeal(res.data.meals[router.query.id % res.data.meals.length]);
        });
      });
    }
  }, [router]);

  return (
    <div className={styles.pokemonDetail_container}>
      {pokemon.name && meal.idMeal && (
        <div className={styles.pokedexDetail}>
          <div className={styles.screen}>
            <div className={styles.banner}>
              <img src={pokemon.sprites.front_default} />
              <div className={styles.principal_info}>
                <p>{pokemon.name}</p>
                <p className={styles.bold}>Tipo:</p>
                <div className={styles.types}>
                {pokemon.types.map((slot, index) => {
                  return <p key={index}>{slot.type.name}</p>;
                })}
                </div>
              </div>
            </div>
            <div className={styles.extra_info}>
            <p className={styles.bold}>Habilidades</p>
            <div className={styles.habilities}>
            {pokemon.abilities.map((slot, index) => {
              return <p key={index}>{slot.ability.name}</p>;
            })}
            </div>
            <p className={styles.bold}>Movimientos:</p>
            <div className={styles.moves}>
            {pokemon.moves.map((slot, index) => {
              return <p key={index}>{slot.move.name}</p>;
            })}
            </div>
            </div>
            <div>
              <p>{meal.idMeal}</p>
              <div className="image">
                <img src={meal.strMealThumb} />
              </div>
              <div className="ingredients"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
