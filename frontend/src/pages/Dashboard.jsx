import React, {useEffect, useState, useMemo} from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import { FiTrash2 } from "react-icons/fi"
import useFavorites from '../store/useFavorites'
import FavoriteButton from '../store/favoriteButton'
import { useAuth } from '../pages/AuthContext'
import { API_BASE } from '../config'

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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }) // sorting state

  const favToggle = useFavorites(s=>s.toggle)
  const favorites = useFavorites(s=>s.favorites)
  const clearAll = useFavorites(s => s.clearAll)
  const { user } = useAuth();
  
  useEffect(()=>{
    fetch(`${API_BASE}/cars`)
      .then(r => r.json())
      .then(j => setCars(j.data || []))
  },[])

  const filtered = useMemo(()=>{
    let result = cars.filter(c=>{
      if (q && !JSON.stringify(c).toLowerCase().includes(q.toLowerCase())) return false
      if (cyl !== 'all' && parseInt(c.cylinders) !== parseInt(cyl)) return false
      if (minMpg && parseFloat(c.mpg) < parseFloat(minMpg)) return false
      return true
    })

    // apply sorting
    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortConfig.key]
        const bVal = b[sortConfig.key]
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }
    return result
  },[cars,q,cyl,minMpg,sortConfig])

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
          backgroundColor: 'rgba(24, 91, 162, 0.6)', 
          borderColor: 'rgba(24, 91, 162, 0.6)',
          borderWidth: 1 }
      ] }
  },[filtered])

  // toggle sorting
  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const cylOptions = useMemo(() => {
    const set = new Set()
    cars.forEach(c => {
      if (c.cylinders) set.add(parseInt(c.cylinders))
    })
    return Array.from(set).sort((a, b) => a - b)
  }, [cars])

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span style={{marginRight: "20px"}}>Welcome</span>
          {user ? (
            <span style={{color: "green"}}>{user.username}!</span>
          ) : (
            <span> user! </span>
          )}
        </h2> 
        <p>Explore the Auto MPG dataset with interactive filters and charts.</p>
      </div>

      <h2>Dashboard</h2>
      <div className="controls">
        <input className='halfWidthInput' type="text" placeholder="search..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={cyl} onChange={e=>setCyl(e.target.value)} className='halfWidthInput'>
          <option value="all">All Cylinders</option>
          {cylOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <input type="text" placeholder="min mpg" value={minMpg} onChange={e=>setMinMpg(e.target.value)} />
        <div style={{marginTop: '20px'}}>Favorites: 
          <span style={{backgroundColor: '#3498db', color: '#ffffff', padding: '8px 12px', borderRadius: '5px', display: 'inline-block'}}>
            {favorites.length}
          </span>
        </div>
      </div>

      <div style={{maxWidth:800}}>
        <Bar data={chartData} />
      </div>

      <table className="car-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')} style={{cursor:'pointer'}}>ID</th>
            <th onClick={() => handleSort('car_name')} style={{cursor:'pointer'}}>Name</th>
            <th onClick={() => handleSort('mpg')} style={{cursor:'pointer'}}>MPG</th>
            <th onClick={() => handleSort('cylinders')} style={{cursor:'pointer'}}>Cyl</th>
            <th onClick={() => handleSort('model_year')} style={{cursor:'pointer'}}>Year</th>
            <th style={{textAlign: "center"}}>
              <button
                onClick={clearAll}
                title="Clear All Favorites"
                disabled={favorites.length === 0}
                style={{textAlign: 'center', cursor: 'pointer'}}>
                <FiTrash2 size={18} />
              </button>
            </th>
          </tr>
        </thead>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
