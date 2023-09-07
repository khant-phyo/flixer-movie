import React, { useEffect, useState } from "react";
import { NavLink, useSearchParams, Navigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi"


export default function MainPage() {

  const [queryList1, setQueryList1] = useState([])
  const [queryList2, setQueryList2] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('search')

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

  return ( 
      <>
      <div className="mainpage-background">
        <div className="intro-div">
          <div className="logo for-mainpage">
            <h1>Flixer</h1>
          </div>
          <h2>Take Movies Information From Flixer</h2>
          <div className="main-searchbar-container" >
            <form className="query-form" >
              <input 
                name='search'  
                type="text"
                id="query"
                placeholder="Search Movies..."
                />
            </form>
            <div className="search-icon small">
              <BiSearch />
            </div>
          </div>
          <NavLink to={'./movies'}
             className="btn">Go to Homepage
          </NavLink>
        </div>
      </div>
    </>
  )
}