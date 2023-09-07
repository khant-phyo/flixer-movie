import React, { useEffect, useState } from "react";
import MovieBox from "./MovieBox";
import Header from "./Header";
import { BsFillPlayFill } from "react-icons/bs";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Search() {
  
  const [queryList1, setQueryList1] = useState([])
  const [queryList2, setQueryList2] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search') ? searchParams.get('search') : useLocation().state.resultFor
  const info1 = (query ? queryList1 : useLocation().state.queryList1).filter(item => item.poster_path)
  const info2 = (query ? queryList2 : useLocation().state.queryList2).filter(item => item.poster_path)
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

  const searchMovies1 = info1.map(item => {
    return (
      <MovieBox info={item} type='m'/>
    )}) 
  const searchMovies2 = info2.map(item => {
    return (
      <MovieBox info={item} type='t'/>
    )}) 
  return (
    <>
      <Header/>
        <>
          <div className="recommended">
            <div className="icon">
              <BsFillPlayFill/>
            </div>
            <h2>MOVIES SEARCH RESULTS FOR: {query ? query : useLocation().state.resultFor} </h2>
          </div>
          <div className="pop-movies-container">
            {searchMovies1}
          </div>
          {(query && info1.length === 0) && <p className="no-results">No movies reults</p>}
          <div className="recommended">
            <div className="icon">
              <BsFillPlayFill/>
            </div>
            <h2>TV-SERIES SEARCH RESULTS FOR: {query ? query : useLocation().state.resultFor} </h2>
          </div>
          <div className="pop-movies-container">
            {searchMovies2}
          </div>
          {(query && info2.length === 0) && <p className="no-results">No tv-series reults</p>}
      </>
      
    </>
  )
}