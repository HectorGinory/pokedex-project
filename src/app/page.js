import styles from "../styles/pages/home.module.css";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <div className={styles.menu_container}>
        <h1>Pokemon Web</h1>
        <div className={styles.text_menu}>
          <p>
            Bienvenid@ a esta web dónde podras encontrar toda la información
            acerca de todos los pokemons
          </p>
          <a href="/pokedex">
            <button>Click para ir a la pokedex</button>
          </a>
        </div>
        <div className={styles.decoration_pokedex}>
          <div className={styles.stick_container}>
            <div className={styles.stick}></div>
            <div className={styles.stick}></div>
          </div>
          <div className={styles.btn_container}>
            <a href="/pokedex">
              <div className={styles.btn}>
                <p>A</p>
              </div>
            </a>
            <div className={styles.btn}>
              <p>B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
