import styles from "../styles/pages/home.module.css";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.menu_container}>
        <h1>Pokemon Web</h1>
        <p className={styles.text_menu}>
          Bienvenid@ a esta web dónde podras encontrar toda la información
          acerca de todos los pokemons
        </p>
        <a href="/pokedex">
          <button>Acceder a la pokedex</button>
        </a>
      </div>
    </div>
  );
}
