import styles from "../../styles/components/pokemonCard.module.css";

export default function PokemonCard({ pokemon }) {
  const firstToUpperCase = (string) => {
    const newString =
      string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    return newString;
  };
  return (
    <div className={styles.pokemonCard}>
      <a href={`/pokemonDetail/${pokemon.id}`} className={styles.container}>
        <div className={styles.pokemonImgContainer}>
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}-image`}
          />
        </div>
        <p className={styles.name}>{firstToUpperCase(pokemon.name)}</p>
        <div className={styles.types}>
          Tipo:
          {pokemon.types.map((slot) => {
            return <p>{firstToUpperCase(slot.type.name)}</p>;
          })}
        </div>
      </a>
    </div>
  );
}
