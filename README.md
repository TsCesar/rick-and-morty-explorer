# Rick and Morty Explorer

Aplicación web para explorar los personajes y episodios de la serie *Rick and Morty*. Proyecto final del módulo de ReactJS.

Permite buscar personajes por nombre, filtrarlos por estado y especie, ver su ficha completa con los episodios en los que aparecen, recorrer los episodios de la serie y guardar personajes favoritos.

## Tecnologías

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- CSS propio (sin librerías de estilos)
- `fetch` para las peticiones y `localStorage` para los favoritos

No usa dependencias adicionales: ni router, ni Axios, ni librerías de componentes.

## API utilizada

[The Rick and Morty API](https://rickandmortyapi.com/documentation) (`https://rickandmortyapi.com/api`). Endpoints usados:

| Endpoint | Uso |
|---|---|
| `GET /character?page=&name=&status=&species=` | Listado paginado, búsqueda y filtros |
| `GET /character/{id}` | Detalle de un personaje |
| `GET /character/[1,2,3]` | Personajes de un episodio (una sola petición) |
| `GET /episode?page=` | Listado paginado de episodios |
| `GET /episode/[1,2,3]` | Episodios de un personaje (una sola petición) |

Cuando una búsqueda no tiene resultados, la API responde con un **404** (`{"error":"There is nothing here"}`). La aplicación lo trata como "sin resultados" y no como un error.

## Funcionalidades

### Requisitos del ejercicio

- Listado inicial de personajes cargado desde la API (imagen, nombre, estado, especie y género).
- Buscador por nombre (admite parte del nombre) mediante un formulario con botón **Buscar** y botón **Limpiar** para volver al listado inicial. Solo se consulta la API al enviar el formulario, no en cada tecla.
- Detalle del personaje al pulsar su tarjeta: imagen, nombre, estado, especie, género, tipo (si existe), origen, localización actual y lista de episodios con código, nombre y fecha de emisión. Botón **Volver** para regresar al listado conservando la búsqueda y la página.
- Paginación con **Anterior / Página X de Y / Siguiente**. Los botones se desactivan en la primera y la última página, y la búsqueda vuelve a la página 1.
- Estado de carga reutilizable (spinner + texto) en todas las peticiones.
- Gestión de errores: mensaje neutro para "no se encontraron personajes" y mensaje entendible para errores de red o de la API, sin mostrar detalles técnicos.
- Diseño responsive para móvil, tablet y escritorio.
- Preparado para publicarse en GitHub Pages.

### Mejoras opcionales implementadas

- **Filtro por estado**: Todos, Alive, Dead y Unknown (parámetro `status` de la API).
- **Filtro por especie**: campo de texto con sugerencias (Human, Alien, Humanoid, Robot, Animal). La API busca coincidencias parciales, así que "Human" también devuelve "Humanoid". Se combina con el nombre, el estado y la paginación.
- **Sección de episodios**: listado paginado con código, nombre y fecha de emisión.
- **Personajes de cada episodio**: botón para desplegarlos dentro del episodio.
- **Navegación de episodio a personaje**: al pulsar un personaje del episodio se abre su detalle.
- **Favoritos**: botón de estrella en cada tarjeta y en el detalle, contador en la cabecera y sección propia de favoritos.
- **Persistencia en localStorage**: los favoritos se conservan al recargar la página.

## Estructura del proyecto

```
src/
  components/      Componentes reutilizables
    Header.tsx             Cabecera y navegación entre secciones
    SearchForm.tsx         Formulario controlado: nombre, estado y especie
    CharacterList.tsx      Cuadrícula de tarjetas
    CharacterCard.tsx      Tarjeta de un personaje
    CharacterDetail.tsx    Ficha completa + episodios del personaje
    EpisodeCharacters.tsx  Personajes de un episodio
    StatusBadge.tsx        Estado con indicador de color
    FavoriteButton.tsx     Botón de añadir o quitar favorito
    Pagination.tsx         Anterior / Página X de Y / Siguiente
    Loading.tsx            Estado de carga
    ErrorMessage.tsx       Mensaje de error
    EmptyState.tsx         Mensaje de "sin resultados"
  pages/           Una por sección
    CharactersPage.tsx
    EpisodesPage.tsx
    FavoritesPage.tsx
  hooks/
    useFetch.ts            Petición + loading + error + "sin resultados"
    useFavorites.ts        Estado de favoritos sincronizado con localStorage
  services/
    api.ts                 URLs de la API y única función que llama a fetch
  types/
    api.ts                 Tipos de la API (Character, Location, Episode, APIResponse...)
  App.tsx          Coordina la vista activa, el personaje abierto y los favoritos
  main.tsx
  index.css        Estilos globales y responsive
```

### Decisiones

- **Navegación sin React Router.** `App` guarda en el estado la sección activa (`view`) y el personaje abierto (`selectedCharacterId`). Mientras se muestra el detalle, la página anterior se oculta con el atributo `hidden` pero no se desmonta, así que al volver conserva la búsqueda, los filtros y la página.
- **Favoritos en localStorage** (clave `rick-morty-favorites`). Se guarda un array con solo los datos que necesita una tarjeta: `id`, `name`, `image`, `status`, `species` y `gender`. Se lee una vez al iniciar la app y se escribe cada vez que la lista cambia.
- **`useFetch`** evita repetir en cada componente la lógica de petición, carga y error. Si la URL cambia antes de que llegue la respuesta, la respuesta antigua se ignora.

## Instalación y uso

Requisitos: Node.js y npm.

```bash
npm install      # instala las dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # comprueba los tipos y genera la versión de producción en dist/
npm run preview  # sirve localmente la carpeta dist/
npm run lint     # revisa el código con ESLint
```

## Despliegue en GitHub Pages

El proyecto incluye el workflow oficial de Vite en `.github/workflows/deploy.yml`. Con cada `push` a la rama `main`, GitHub instala las dependencias, ejecuta `npm run build` y publica la carpeta `dist/`.

En `vite.config.ts`, `base` vale `'./'` (rutas relativas). Así la web funciona dentro de `https://<usuario>.github.io/<repositorio>/` sin tener que escribir el nombre del repositorio.

Pasos:

1. Crear un repositorio en GitHub y subir el proyecto a la rama `main`.
2. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Esperar a que termine el workflow en la pestaña **Actions**.
4. La web queda disponible en `https://<usuario>.github.io/<repositorio>/`.
