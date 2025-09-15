import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import useFavorites from "../store/useFavorites"
import FavoriteButton from "../store/favoriteButton"

export default function Detail() {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const favToggle = useFavorites((s) => s.toggle)
  const ref = useRef()

  // Fetch car data
  useEffect(() => {
    fetch("/api/cars/" + id)
      .then((r) => r.json())
      .then(setCar)
  }, [id])

  // Add dynamic 3D tilt effect
  useEffect(() => {
    const el = ref.current
    if (!el) return
    function onMove(e) {
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height
      el.style.transform = `rotateX(${ -dy * 8 }deg) rotateY(${ dx * 8 }deg)`
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  if (!car) return <div>Loading...</div>

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FavoriteButton item={car} />
        <span style={{marginLeft: '20px'}}>{car.car_name || "Car " + car.id}</span>
      </h2>
      <div
        ref={ref}
        className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 transition-transform duration-200"
        style={{ maxWidth: "500px", width: "100%", transformStyle: "preserve-3d" }}
      >
        <table className="w-full border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-medium">MPG</td>
              <td className="p-2">{car.mpg}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Cylinders</td>
              <td className="p-2">{car.cylinders}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Horsepower</td>
              <td className="p-2">{car.horsepower}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Weight</td>
              <td className="p-2">{car.weight}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Acceleration</td>
              <td className="p-2">{car.acceleration}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Year</td>
              <td className="p-2">{car.model_year}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

