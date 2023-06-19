import { bringPokemonById } from '@/app/api/pokeAPI'
import { bringMealByFirstPokemonLetter } from '@/app/api/theMealdbApi'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function PokemonDetail() {
  const router = useRouter()
  const [pokemon, setPokemon] = useState({})
  const [meal, setMeal] = useState({})

  useEffect(()=> {
    if(router.query.id){
      bringPokemonById(router.query.id).then((res)=>{
        setPokemon(res.data)
        bringMealByFirstPokemonLetter(res.data.name).then((res)=> {
          setMeal(res.data.meals[router.query.id%res.data.meals.length])
        })
      })
    }
  }, [router])

  return (
    <main>
    {(pokemon.name && meal.idMeal ) &&
    <div>
      <p>{pokemon.name}</p>
      <p>{meal.idMeal}</p>
    </div>}
    </main>
  );
}
