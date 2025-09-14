import create from 'zustand'

const useFavorites = create((set) => ({
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  toggle: (item) => set(state => {
    const exists = state.favorites.find(f => f.id === item.id)
    let next = []
    if (exists) next = state.favorites.filter(f => f.id !== item.id)
    else next = [...state.favorites, item]
    localStorage.setItem('favorites', JSON.stringify(next))
    return { favorites: next }
  })
}))

export default useFavorites
