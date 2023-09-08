import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams, Navigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiSolidStar } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { Carousel } from 'react-responsive-carousel';
import Header from "./Header";
import MovieBox from "./MovieBox";

export default function Movies() {

  const [movies, setMovies] = useState([])
  const [showcase, setShowcase] = useState([])
  const [tv, setTv] = useState([])
  const [queryList1, setQueryList1] = useState([])
  const [queryList2, setQueryList2] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search')

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=a184eba0a75557cbe179b933b4bceae0&language=en-US&page=1&include_adult=false')
      .then(res => res.json())
      .then(data => {
        setMovies(data.results.slice(0, 7))
      })
  },[])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=a184eba0a75557cbe179b933b4bceae0&language=en-US&page=1&include_adult=false')
      .then(resp => resp.json())
      .then(data1 => {
        setShowcase(data1.results)
      })
  },[])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=a184eba0a75557cbe179b933b4bceae0&language=en-US&page=1&include_adult=false')
      .then(resp => resp.json())
      .then(data1 => {
        setTv(data1.results)
      })
  },[])
  

  useEffect(() => {
    if(query){
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=a184eba0a75557cbe179b933b4bceae0&language=en-US&query=${query}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(data => setQueryList1(data.results))

      fetch(`https://api.themoviedb.org/3/search/tv?api_key=a184eba0a75557cbe179b933b4bceae0&language=en-US&query=${query}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(data => setQueryList2(data.results))
    }
  }, [query])
  
  if (queryList1.length != 0 && queryList2.length != 0) {
    return (
      <Navigate to='/searches' state={{queryList1, queryList2, resultFor: query}}/>
    )
  }

    function Show() {
      return (
        <>
          <form className="query-form">
            <input 
              name='search'  
              type="text"
              id="query"
              placeholder="Search Movies..."
              />
          </form>
          <div className="showcase">
            <Carousel
              showThumbs={false}
              autoPlay={true}
              transitionTime={5}
              infiniteLoop={true}
              showStatus={false}
              stopOnHover={true}
              animationHandler={'fade'}
            >
              {movies.map(item => {
                return (
                  <div className="big-image">
                    <div className="big-image-shadow"></div>
                    <div className="title-big">
                      <h2>{item.original_title}</h2>
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
                        <p>{item.release_date.slice(0, 4)}</p>
                        <p>Action</p>
                      </div>
                      <div className="overview">
                        <p>{item.overview}</p>
                      </div>
                    </div>
                    <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} className="set-height"/>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </>
      )
    }

    const boxes1 = showcase.filter(item => ('original_title' in item) && ('release_date' in item))
    const boxes2 = boxes1.map(item => {
      return (
        <MovieBox info={item} type='m'/>
      )})
    
    const boxes3 = tv.map(item => {
      return (
        <MovieBox info={item} type='t'/>
      )})

  return (
    <>
      <Show/>
      <div className="recommended">
        <div className="icon">
          <BsFillPlayFill/>
        </div>
        <h2>LATEST MOVIES</h2>
      </div>
      <div className="pop-movies-container">
        {boxes2}
      </div>
      <div className="recommended">
        <div className="icon">
          <BsFillPlayFill/>
        </div>
        <h2>LATEST TV SHOW</h2>
      </div>
      <div className="pop-movies-container">
        {boxes3}
      </div>
    </>
  )
}