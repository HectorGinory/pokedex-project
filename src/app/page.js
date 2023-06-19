export default function Home() {
  return (
    <main>
      <div className="main-menu">
        <h1>Pokemon Web</h1>
        <p>
          Bienvenid@ a esta web dónde podras encontrar toda la información
          acerca de todos los pokemons
        </p>
        <a href="/pokedex">
          <button>Acceder a la pokedex</button>
        </a>
      </div>
    </main>
  );
}
