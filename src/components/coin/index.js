import React from 'react'
import './style.css'
import Icon from '../../assets/images/coin.jpg'

const Coin = () => {
  return (
    <div className="coin">
      <img className="coin-image" src={Icon} />
    </div>
  )
}

export default Coin
