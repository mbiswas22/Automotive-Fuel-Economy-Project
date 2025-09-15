import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useFavorites = create(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (item) => {
        const exists = get().favorites.find(f => f.id === item.id)
        const next = exists
          ? get().favorites.filter(f => f.id !== item.id)
          : [...get().favorites, item]
        set({ favorites: next })
      },
      clearAll: () => set({ favorites: [] }), //Clear all favorites
      isFavorite: (id) => get().favorites.some(f => f.id === id), //Selector
    }),
    {
      name: 'favorites', //localStorage key
    }
  )
)

export default useFavorites
