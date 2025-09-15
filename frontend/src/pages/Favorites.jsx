import React from 'react'
import useFavorites from '../store/useFavorites'
import { Link } from 'react-router-dom'
import { FiTrash2 } from "react-icons/fi"

export default function Favorites(){
  const favs = useFavorites(s => s.favorites)
  const clearAll = useFavorites(s => s.clearAll)
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 items-center gap-2">Favorites
      { favs.length > 0 &&
        <div style={{float: 'right'}}><button onClick={clearAll}
                title="Clear All Favorites"
               style={{textAlign: 'center', cursor: 'pointer'}}>
                   <FiTrash2 size={18} />
              </button></div>
      }

      </h2>
      {favs.length===0 && <p>No favorites yet.</p>}
      
      <ul>
        {favs.map((f, index) => (
          <React.Fragment key={index}>
              <li key={f.id}><Link to={'/cars/'+f.id}>{f.car_name || f.model_year || 'Car '+f.id}</Link></li>
              {index < favs.length - 1 && <hr />}
          </React.Fragment>
          
        ))}
      </ul>
    </div>
  )
}
