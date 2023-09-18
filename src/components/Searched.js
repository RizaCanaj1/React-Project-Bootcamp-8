import axios from "axios";
import './searched.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Searched(){
    //Initializing Variables
    const searched=useParams().search
    const [totalPages,SetTotalPages]=useState(0)
    const [api,SetApi]=useState()
    const [page,SetPage]=useState(1)
    //Handles
    const handlePrevious = ()=>{
        SetPage(p=>p=p-1)
    }
    const handleNext = () =>{
        SetPage(p=>p=p+1)
    }
    //Use Effect
    useEffect(()=>{
        axios.get(`https://api.rawg.io/api/games?&${searched}&page=${page}&key=018e2d8e3f074e628a722c1253854fd6`)
        .then(response=> {
            SetApi(response.data)
            SetTotalPages(Math.floor(response.data.count/20)+1)
        })
        .catch(error=>{
            console.log(error);
        })
    },[page])
    //Return
    return<div className="searched">
        <div className="buttons my-4 mx-4 d-flex align-items-center">
            <h4 className="me-2">Pages: </h4>
            {(page>1)?(
            <button className="btn btn-dark me-2" onClick={handlePrevious}>Previous</button>):(
            <button className="btn btn-dark me-2" disabled>Previous</button>)}
            <h4>{page}</h4>
            {(page<totalPages)?(
            <button className="btn btn-dark ms-2" onClick={handleNext}>Next</button>):(
            <button className="btn btn-dark ms-2" disabled>Next</button>)}
        </div>
        <div className="cards-grid mx-4 my-4">
    {
        (api)?(<>
        {api.results.map((x,index)=>{
            return <div key={index} className="card" data-bs-theme="dark">
                <div className="card-body">
                    <h4>{x.name}</h4>
                    <img alt={x.name} src={x.background_image} onDoubleClick={()=>{window.location="/game/"+x.name}}></img>
                </div>    
            </div> 
        })}
        
        </>):('')
    }
    </div>
    </div>
}