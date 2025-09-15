import useFavorites from './useFavorites'

export default function FavoriteButton({ item }) {
  const toggle = useFavorites((state) => state.toggle)
  const isFavorite = useFavorites((state) => state.isFavorite(item.id))

  return (
    <div
      onClick={() => toggle(item)}
      style={{textAlign: 'center', cursor: 'pointer'}}>
      {isFavorite ? '❤️' : '🤍'}
    </div>
  )
}
