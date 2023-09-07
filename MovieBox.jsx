import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function MovieBox({info, type}) {

  const [hoverCalss, setHoverCalss] = useState('')
  const [click, setClick] = useState(false)

  function handleClick() {
    setClick(true)
  }

  return (
    <>
      {click ? 
      <Navigate to='/info' state={info}/> :
      <div className="movie-box">
        <div 
          className="movie-container" 
          onMouseOver={e => setHoverCalss('movie-container-hover')} 
          onMouseLeave={e => setHoverCalss('')}>
          <div className="float">
            <p>HD</p>
          </div>
          <img 
            src={`https://image.tmdb.org/t/p/original/${info.poster_path}`}
            className='img-small'/>
        {hoverCalss  && <div 
          className={hoverCalss}
          onClick={handleClick}>
          <p className="read-more">Read More</p>
        </div>}
        </div>
        <div className="info">
          <div className="info1">
            <p>{type === 'm' ? info.release_date.slice(0, 4) : info.first_air_date.slice(0, 4)}</p>
            <div className="movie-tv">
              <p>{type === 'm' ? 'MOVIE' : 'TV-Series'}</p>
            </div>
          </div>
          <p className="title-small">{type === 'm' ? info.original_title : info.original_name}</p>
        </div>
      </div>}
    </>
  )
}