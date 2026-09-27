export type View = 'characters' | 'favorites' | 'episodes'

const NAV_ITEMS: { view: View; label: string }[] = [
  { view: 'characters', label: 'Personajes' },
  { view: 'episodes', label: 'Episodios' },
  { view: 'favorites', label: 'Favoritos' },
]

interface HeaderProps {
  view: View
  favoritesCount: number
  onChangeView: (view: View) => void
}

function Header({ view, favoritesCount, onChangeView }: HeaderProps) {
  return (
    <header className="header">
      <div className="container header__inner">
        <h1 className="logo">
          Rick and Morty <span className="logo__accent">Explorer</span>
        </h1>

        <nav aria-label="Secciones">
          <ul className="nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.view}>
                <button
                  type="button"
                  className="nav__button"
                  aria-current={view === item.view ? 'page' : undefined}
                  onClick={() => onChangeView(item.view)}
                >
                  {item.label}
                  {item.view === 'favorites' && (
                    <span className="nav__count">{favoritesCount}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
