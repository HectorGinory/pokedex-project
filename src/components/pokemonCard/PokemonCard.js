export default function PokemonCard({pokemon}) {
    return (
      <div className="pokemon-card">
      <a href={`/pokemonDetail/${pokemon.id}`}>
      <div className="pokemon-img">
            <img src={pokemon.sprites.front_default} alt={`${pokemon.name}-image`}/>
        </div>
        <p>{pokemon.name}</p>
        <div className="types">
            Tipo:
            {pokemon.types.map((slot) => {
               return (
                <p>{slot.type.name}</p>
               )
            } )}
        </div>
      </a>
      </div>
    );
  }