import { useState } from 'react'
import './search.css'
import { useWindowScroll } from "@uidotdev/usehooks";

export default function Search(){
    //Initializing Variables
    useWindowScroll();
    const [searchOn,SetSearchOn]=useState(false)
    //Handles    
    const handleSearch = ()=>{
        SetSearchOn(true)
    }
    const closeSearch=()=>{
        SetSearchOn(false)
    }
    const handleSubmit =e=>{
        e.preventDefault()
        window.location='/searched/search='+(e.target.ordering.value+e.target.store.value+e.target.search.value+e.target.genres.value+e.target.tags.value+e.target.platforms.value+e.target.searcher.value).replace(/ /g, '-')
    }
    if(window.scrollY>10){
        document.querySelector('.search form').setAttribute('id',"onscroll")
    }
    else{
        if(document.querySelector('.search form'))
        document.querySelector('.search form').setAttribute('id',"noID")
    }
    //Return if we are not in log in, contact us, log out, and favorites
    if(window.location.pathname!=='/log_in'&&window.location.pathname!=='/contact_us'&&window.location.pathname!=='/log_out '&&window.location.pathname!=='/favorites')
    return <>
    <div className='search'>
    {/* Searchbar */}
    <form className="d-flex" role="search" data-bs-theme="dark" onSubmit={handleSubmit}>
        <label className="" htmlFor="search"/>
        <input className="form-control me-2" type="search" placeholder="Search" name='search' id='search' aria-label="Search" onClick={handleSearch}/>
        <div className="btn-group">
        <button className="btn btn-secondary" type="submit">Search</button>
        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="visually-hidden">Toggle Dropdown</span>
        </button>
        {
            (searchOn)?(<><div className='background-on-search'></div><i className="fa-solid fa-x fa-lg ms-2 mt-3 me-2" onClick={closeSearch}></i></>):('')
        }
        {/* Filter */}
        <ul className="dropdown-menu ">
            <label className="" htmlFor="ordering">Ordering:</label>
            <select className="" name="ordering" id="ordering">
                <option value="">--Set Ordering--</option>
                <option value="&ordering=popularity">Popularity</option>
                <option value="&ordering=name">A-Z</option>
                <option value="&ordering=-name">Z-A</option>
            </select>
            <label htmlFor="tags">Tags:</label>
            <select className="" name="tags" id="tags">
                <option value="">--Select Tag--</option>
                <option value="&tags=31">Singleplayer</option>
                <option value="&tags=7">Multiplayer</option>
                <option value="&tags=40836">Full controller support</option>
                <option value="&tags=13">Atmospheri</option>
                <option value="&tags=42">Great Soundtrack</option>
                <option value="&tags=24">RPG</option>
                <option value="&tags=8">First-Person</option>
                <option value="&tags=123">Comedy</option>
                <option value="&tags=150">Third-Person Shooter</option>
                <option value="&tags=144">Crime</option>
                <option value="&tags=36">Open World</option>
                <option value="&tags=64">Fantasy</option>
                <option value="&tags=40">Dark Fantasy</option>
                <option value="&tags=218">Multiple Endings</option>
                <option value="&tags=32">Sci-fi</option>
            </select>
            <label htmlFor="genres">Genres:</label>
            <select className="" name="genres" id="genres">
                <option value="">--Select Genres--</option>
                <option value="&genres=3">Action</option>
                <option value="&genres=4">Action</option>
                <option value="&genres=puzzle">Puzzle</option>
                <option value="&genres=5">RPG</option>
            </select>
            <label  htmlFor="platforms">Platforms:</label>
            <select name="platforms" id="platforms">
                <option value="">--Select Platform--</option>
                <option value="&platforms=4">PC</option>
                <option value="&platforms=3">Xbox</option>
                <option value="&platforms=1">Xbox One</option>
                <option value="&platforms=2">PlayStation</option>
                <option value="&platforms=16">PlayStation 3</option>
                <option value="&platforms=187">PlayStation 5</option>
                <option value="&platforms=7">Nintendo</option>
                
            </select>
            <label className="" htmlFor="store">Stores:</label>
            <select className="" name="store" id="store">
                <option value="">--Set Stores--</option>
                <option value="&store=1">Steam</option>
                <option value="&store=11">Epic Games</option>
                <option value="&store=3">PlayStation Store</option>
                <option value="&store=2">Xbox Store</option>
                <option value="&store=7">Xbox 360 Store</option>
            </select>
            <label className="" htmlFor="searcher">Search:</label>
            <select className="" name="searcher" id="searcher">
                <option value="">--Set Search--</option>
                <option value="&search_exact=true">Includes Exact</option>
                <option value="">A like</option>
            </select>
        </ul>
        </div>
    </form>
    </div>
    </>
    else{
        return <></>
    }
}