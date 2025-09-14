import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import useFavorites from '../store/useFavorites'

export default function Detail(){
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const favToggle = useFavorites(s=>s.toggle)
  const ref = useRef()
  useEffect(()=>{
    fetch('/api/cars/'+id).then(r=>r.json()).then(setCar)
  },[id])

  useEffect(()=>{
    const el = ref.current
    if(!el) return
    function onMove(e){
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width/2)) / rect.width
      const dy = (e.clientY - (rect.top + rect.height/2)) / rect.height
      el.style.transform = `rotateX(${ -dy*6 }deg) rotateY(${ dx*6 }deg)`
    }
    window.addEventListener('mousemove', onMove)
    return ()=> window.removeEventListener('mousemove', onMove)
  },[])

  if(!car) return <div>Loading...</div>
  return (
    <div>
      <h2>Detail: {car.name || car.id}</h2>
      <div className="card" ref={ref}>
        <p><strong>MPG:</strong> {car.mpg}</p>
        <p><strong>Cylinders:</strong> {car.cylinders}</p>
        <p><strong>Horsepower:</strong> {car.horsepower}</p>
        <p><strong>Weight:</strong> {car.weight}</p>
        <p><strong>Acceleration:</strong> {car.acceleration}</p>
        <p><strong>Year:</strong> {car.model_year}</p>
        <button onClick={()=>favToggle(car)}>Toggle Favorite</button>
      </div>
    </div>
  )
}
