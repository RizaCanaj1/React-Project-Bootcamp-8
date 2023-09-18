import axios from "axios"
import { useEffect, useState } from "react"
import './favorites.css'
export default function Favorites(){
    
    //Initializing variables
    const [favorite,setFavorite]=useState('')
    const [fav,SetFav]=useState([])
    useEffect(()=>{
        SetFav(JSON.parse(localStorage.getItem('logged user')).favorites)
    },[])

    //UseEffects
    useEffect(()=>{
        if(fav){
        fav.map(favorite=>{
            axios.get(`https://api.rawg.io/api/games?&search=${favorite.replace(/ /g, '-')}&page=1&search_exact=true&key=018e2d8e3f074e628a722c1253854fd6`)
            .then(response=>{
                const selector = response.data.results.filter(x=>x.name===favorite)
                return setFavorite(x=>[...x,selector[0]])
            })
            .catch((error) => {
                return console.error(error);
            })
            return 0
        })
      ;}
        
    },[fav])

    //Return
    return<div className="favorites">
    {(!localStorage.getItem('logged user'))?(
        window.location='/log_in'
        ):(
            <div className="cards container">
            {/*Favorites List*/}
            {   (favorite)?(favorite.map((x,index)=>{
                    return <div key={index} className="card" data-bs-theme="dark" >
                        <div className="card-body">
                            <h4>{x.name}</h4>
                            <img alt={x.name} src={(x.background_image)?(x.background_image):('https://www.thensg.gov.za/wp-content/uploads/2020/07/No_Image-3-scaled-1.jpg')} onDoubleClick={()=>{window.location="/game/"+x.name}}></img>
                        </div>
                    </div>
                })):('')
                
            }
            </div>
        )}
    
    </div>
}