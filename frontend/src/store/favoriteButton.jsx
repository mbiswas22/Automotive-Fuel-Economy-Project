import useFavorites from './useFavorites'

export default function FavoriteButton({ item }) {
  const toggle = useFavorites((state) => state.toggle)
  const isFavorite = useFavorites((state) => state.isFavorite(item.id))

  return (
    <button
      onClick={() => toggle(item)}
      className={`px-3 py-1 rounded-md font-medium transition-colors ${
        isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
      }`}
    >
      {isFavorite ? 'Unfavorite ❤️' : 'Favorite 🤍'}
    </button>
  )
}
