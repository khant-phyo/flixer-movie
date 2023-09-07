import React, { useEffect, useState } from "react";
import { useSearchParams, Navigate, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { BiSolidStar } from "react-icons/bi";

export default function Info() {
  const item = useLocation().state
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('search')
  
  if (query) {
    return (
      <Navigate to='/searches' state={{resultFor: query}}/>
    )
  }
  else{
  return (
    <>
     <div className="float-header">
        <Header />
      </div>
      <>
        <div className="big-image">
          <div className="big-image-shadow"></div>
          <div className={window.screen.width < 600 ? 'info-title-big ss' : 'info-title-big'}>
            <h2>{item.original_title ? item.original_title : item.original_name}</h2>
            <div className="detail">
              <div className="quality">
                <p>HD</p>
              </div>
              <div className="age-appropriation">
                <p>PG-13</p>
              </div>
              <div className="star">
                <BiSolidStar/>
                <p>{item.vote_average}</p>
              </div>
              <p>{item.release_date? item.release_date.slice(0, 4) :  item.first_air_date.slice(0, 4)}</p>
              <p>Action</p>
            </div>
          </div>
          <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path ? item.backdrop_path : item.poster_path}`} className="info-set-height"/>
        </div>
        {window.screen.width < 600 ? <> </> : 
          <div className="info-img">
            <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              className='img-small'/>
          </div>}
        <div className={`synopsis${window.screen.width < 600 ? '-small' : ''}`}>
          <p>Synopsis</p>
          <div className={`info-overview${window.screen.width < 600 ? '-small' : ''}`}>
              <p>{item.overview}</p>
          </div>
        </div>
        </>
    </>
  )}
}