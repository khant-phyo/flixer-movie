import React, { useState }  from "react"
import { BiSearch, BiRightArrowAlt } from "react-icons/bi";
import { NavLink, useSearchParams } from "react-router-dom";


export default function Header() {
  const [input, setInput] = useState({
    'search': ''
  })
  const [searchBar, setSearchBar] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('search')

 
  function toggleSearchBar() {
    if (window.screen.width <= 700){
      setSearchBar(prevVal => !prevVal)
    }
    else {
      setSearchBar(false)
    }
  }

  function handleChange(e){
    setInput({[e.target.name]: e.target.value})
  }

  function handleSubmit(e) {
    setSearchParams('search', 'this is it')
  }

  function SearchBar() {
    return (
      <div className="searchbar-container" >
        <form className="query-form" onSubmit={handleSubmit}>
          <input 
            name='search'  
            type="text"
            id="query"
            placeholder="Search Movies..."
            onChange={handleChange}
            value={input['search']}
            autoFocus
            />
        </form>
        <div className="search-icon small"> 
          <BiSearch />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container">
        <div className="container-background-color"></div>
        <div className="humberger-menu">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div className="logo">
          <h1><NavLink to='/'>Flixer</NavLink></h1>
        </div>
        {window.screen.width < 700 &&
          <div className="search-icon" onClick={toggleSearchBar}>
            <BiSearch />
          </div>
        }
        {window.screen.width >= 700 &&
          <SearchBar />
        }
        <div className="submit-icon">
          <BiRightArrowAlt />
        </div>
      </div>
      {searchBar && <SearchBar />}
    </>
  )
}