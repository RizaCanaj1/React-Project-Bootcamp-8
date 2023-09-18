import './navbar.css'
import { useEffect, useState } from "react"
export default function Nav(){
    //Initializing Variables
    const default_nav=[
        {href:'/',name:'Home'},
        {href:'/contact_us',name:'Contact us'},
        {href:'/favorites',name:'Favorites'},
        {href:'/log_in',name:'Log In'},
        {href:'/log_out',name:'Log Out'},
        {href:'/users',name:'Users'}
    ]
    const [nav_item,set_nav_item] = useState(default_nav)
    //Use Effects
    useEffect(()=>{
        default_nav.map(e=>{
          if(window.location.pathname.includes(e.href))  
          set_nav_item([e,...default_nav.filter(x=>x!==e)])
        })
    },[])
    //Return
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container ">
                <a className="navbar-brand" href='/'>GameCenter</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav first_nav">
                    <li className="nav-item">
                        <a className="nav-link active " aria-current="page" href={nav_item[0].href}>{nav_item[0].name}</a>
                    </li>
                </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li>
                        <div className="nav-item dropdown">
                            {/* Fixing Navbar */}
                            {(window.location.pathname!=='/log_in' && window.location.pathname!=='/log_out')?(
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {(!localStorage.getItem('logged user'))?('Guest'):(JSON.parse(localStorage.getItem('logged user')).name)}
                            </button>):(
                                <button className="btn btn-secondary" type="button" aria-expanded="false">
                                {(!localStorage.getItem('logged user'))?('Guest'):(JSON.parse(localStorage.getItem('logged user')).name)}
                                </button>
                            )}
                        <ul className="dropdown-menu dropdown-menu-dark">
                        {
                        (!localStorage.getItem('logged user'))?(
                            <>
                            {(window.location.pathname.includes('/log_in')?(
                            <li className="nav-item">
                            <a className="nav-link" href={nav_item[2].href}>{nav_item[2].name}</a>
                            </li>):(
                            <li className="nav-item">
                            <a className="nav-link" href={nav_item[3].href}>{nav_item[3].name}</a>
                            </li>))}
                            </>
                        ):(<>
                            <li className="nav-item">
                                <a className="nav-link" href={nav_item[1].href}>{nav_item[1].name}</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href={nav_item[2].href}>{nav_item[2].name}</a>
                            </li>{
                                (JSON.parse(localStorage.getItem('logged user')).role==='Mod'||JSON.parse(localStorage.getItem('logged user')).role==='Admin')?(
                                    <li className="nav-item">
                                    <a className="nav-link" href={nav_item[5].href}>{nav_item[5].name}</a>
                                    </li>   
                                ):('')
                            }
                            {(window.location.pathname.includes('/log_out')||window.location.pathname.includes('/users'))?(''):(
                            <li className="nav-item">
                                <a className="nav-link" href={nav_item[4].href}>{nav_item[4].name}</a>
                            </li>
                            )}
                            </>
                        )
                        }
                        </ul>
                        </div>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </>
}