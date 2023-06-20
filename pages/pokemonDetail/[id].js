import { bringPokemonById } from "@/app/api/pokeAPI";
import { bringMealByFirstPokemonLetter } from "@/app/api/theMealdbApi";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../src/styles/pages/pokemonDetail.module.css";

export default function PokemonDetail() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState({});
  const [meal, setMeal] = useState({});
  const [ingredientsAvailable, setIngredientsAvailable] = useState([]);

  useEffect(() => {
    if (router.query.id) {
      bringPokemonById(router.query.id).then((res) => {
        setPokemon(res.data);
        bringMealByFirstPokemonLetter(res.data.name).then((res) => {
          setMeal(res.data.meals[router.query.id % res.data.meals.length]);
          console.log(res.data.meals[router.query.id % res.data.meals.length]);
        });
      });
    }
  }, [router]);

  useEffect(() => {
    if (meal.strArea) {
      const updatedIngredients = [];
      for (let i = 1; i <= 20; i++) {
        console.log(meal[`strIngredient${i}`]);
        if (meal[`strIngredient${i}`]) {
          updatedIngredients.push(meal[`strIngredient${i}`]);
        }
      }
      setIngredientsAvailable(updatedIngredients);
    }
  }, [meal]);

  return (
    <div className={styles.pokemonDetail_container}>
      {pokemon.name && meal.idMeal && (
        <div className={styles.pokedexDetail}>
          <div className={styles.screen}>
            <div className={styles.banner}>
              <div className={styles.pokeImg_container}>
                <img src={pokemon.sprites.front_default} />
              </div>
              <div className={styles.principal_info}>
                <p className={styles.name}>{pokemon.name}</p>
                <p className={styles.bold}>Tipo:</p>
                <div className={styles.types}>
                  {pokemon.types.map((slot, index) => {
                    return <p key={index}>{slot.type.name}</p>;
                  })}
                </div>
              </div>
            </div>
            <div className={styles.extra_info}>
              <div className={styles.section}>
                <p className={styles.bold}>Habilidades</p>
                <div className={styles.habilities}>
                  {pokemon.abilities.map((slot, index) => {
                    return <p key={index}>- {slot.ability.name}</p>;
                  })}
                </div>
              </div>
              <div className={styles.section}>
                <p className={styles.bold}>Movimientos:</p>
                <div className={styles.map_container}>
                  {pokemon.moves.map((slot, index) => {
                    return (
                      <div className={styles.map_item}>
                        <p key={index}>{slot.move.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.food_container}>
              <div className={styles.foodImg_container}>
                <img src={meal.strMealThumb} />
              </div>
              <div className={styles.meal_info}>
                <div className={styles.food_info}>
                  <p className={styles.bold}>Comida favorita:</p>
                  <p>- {meal.strMeal}</p>
                  <p>- Tipo de comida: {meal.strArea}</p>
                </div>
                <div className={styles.ingredients_section}>
                  <p className={styles.bold}>Ingredientes:</p>
                  <div className={styles.map_container}>
                    {ingredientsAvailable.map((ing, index) => {
                      return (
                        <div className={styles.map_item}>
                          <p key={index}>{ing}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.home_btn}>
            <a href="/pokedex">Volver a la pokedex</a>
          </div>
        </div>
      )}
    </div>
  );
}
