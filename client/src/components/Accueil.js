import React from 'react'
import { useParams } from 'react-router-dom'

const Accueil = () => {
  const params = useParams()
  console.log(`userId : ${params}`)
  return (
    <div>
      hello 
    </div>
  )
}

export default Accueil
