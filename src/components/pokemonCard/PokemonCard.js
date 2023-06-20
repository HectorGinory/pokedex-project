import styles from "../../styles/components/pokemonCard.module.css";

export default function PokemonCard({ pokemon }) {
  return (
    <div className={styles.pokemonCard}>
      <a href={`/pokemonDetail/${pokemon.id}`} className={styles.container}>
        <div className={styles.pokemonImgContainer}>
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}-image`}
          />
        </div>
        <p className={styles.name}>{pokemon.name}</p>
        <div className={styles.types}>
          Tipo:
          {pokemon.types.map((slot, index) => {
            return <p key={index}>{slot.type.name}</p>;
          })}
        </div>
      </a>
    </div>
  );
}
