import React from 'react'
import './style.scss'
import Icon from '../../../assets/images/coin.jpg'

const Coin = () => {
  return (
    <div className="coin">
      <img className="coin-image" src={Icon} alt="coin" />
    </div>
  )
}

export default Coin
