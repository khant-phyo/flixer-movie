import React, { useState }  from "react"
import { BiSearch, BiRightArrowAlt } from "react-icons/bi";
import { NavLink, useSearchParams } from "react-router-dom";


export default function Header() {
  const [searchBar, setSearchBar] = useState(false)
 
  function toggleSearchBar() {
    if (window.screen.width <= 700){
      setSearchBar(prevVal => !prevVal)
    }
    else {
      setSearchBar(false)
    }
  }


  function SearchBar() {
    return (
      <div className="searchbar-container" >
        <form className="query-form">
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