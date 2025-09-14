import React from 'react'
import useFavorites from '../store/useFavorites'
import { Link } from 'react-router-dom'

export default function Favorites(){
  const favs = useFavorites(s => s.favorites)
  return (
    <div>
      <h2>Favorites</h2>
      {favs.length===0 && <p>No favorites yet.</p>}
      <ul>
        {favs.map(f=> (
          <li key={f.id}><Link to={'/cars/'+f.id}>{f.name || f.model || 'Car '+f.id}</Link></li>
        ))}
      </ul>
    </div>
  )
}
