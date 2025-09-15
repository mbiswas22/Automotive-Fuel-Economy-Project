import React, {useEffect, useState, useMemo} from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import useFavorites from '../store/useFavorites'
import FavoriteButton from '../store/favoriteButton'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function Dashboard(){
  const [cars, setCars] = useState([])
  const [q, setQ] = useState('')
  const [cyl, setCyl] = useState('all')
  const [minMpg, setMinMpg] = useState('')
  const favToggle = useFavorites(s=>s.toggle)
  const favorites = useFavorites(s=>s.favorites)
  const clearAll = useFavorites()
  const isFavorite = useFavorites((s) => s.isFavorite(s=>s.toggle))
  

  useEffect(()=>{
    fetch('/api/cars')
    .then(r =>
        r.json())
    .then(j => {
      // console.log(j.data);
      setCars(j.data || []);
     } 
    )
  },[])

  const filtered = useMemo(()=>{
    return cars.filter(c=>{
      if (q && !JSON.stringify(c).toLowerCase().includes(q.toLowerCase())) return false
      if (cyl !== 'all' && parseInt(c.cylinders) !== parseInt(cyl)) return false
      if (minMpg && parseFloat(c.mpg) < parseFloat(minMpg)) return false
      return true
    })
  },[cars,q,cyl,minMpg])

  const chartData = useMemo(()=>{
    const byYear = {}
    filtered.forEach(c => {
      const y = c.model_year || 'unknown'
      byYear[y] = (byYear[y] || 0) + 1
    })
    const labels = Object.keys(byYear).sort()
    const data = labels.map(l=>byYear[l])
    return { 
      labels, 
      datasets: [
        { label: 'Count by Model Year', 
          data,
          backgroundColor: 'rgba(24, 91, 162, 0.6)', // Single color for all bars
          borderColor: 'rgba(24, 91, 162, 0.6)',
          borderWidth: 1 }
      ] }
  },[filtered])

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="controls">
        <input placeholder="search..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={cyl} onChange={e=>setCyl(e.target.value)}>
          <option value="all">All Cylinders</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="8">8</option>
        </select>
        <input placeholder="min mpg" value={minMpg} onChange={e=>setMinMpg(e.target.value)} />
        <div>Favorites: {favorites.length}</div>
      </div>

      <div style={{maxWidth:800}}>
        <Bar data={chartData} />
      </div>

      <table className="car-table">
        <thead><tr><th>ID</th><th>Name</th><th>MPG</th><th>Cyl</th><th>Year</th>
        <th></th></tr></thead>
        <tbody>
          {filtered.map(c=> (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td><Link to={'/cars/'+c.id}>{c.car_name || c.model_year || 'Car '+c.id}</Link></td>
              <td>{c.mpg}</td>
              <td>{c.cylinders}</td>
              <td>{c.model_year}</td>
              <td>
              <FavoriteButton item={c} />
                {/* <button onClick={()=>favToggle(c)} className={`px-3 py-1 rounded-md font-medium transition-colors ${
        isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
      }`}>
               {isFavorite ? '❤️' : '🤍'}</button> */}
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
