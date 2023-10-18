import React, { useState,useEffect } from 'react'
import Header from '../components/navigation/header/Header'
import JwtDecode from '../utils/JwtDecode'

const Redux = ({token}) => {
    const [jwToken, setJwToken] = useState(null)
    useEffect(() => {
        setJwToken(token)
    },[token])
  return (
    <div>
        <Header token={jwToken}/>
        <JwtDecode token={jwToken} />
    </div>
  )
}

export default Redux