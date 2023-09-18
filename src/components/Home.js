import axios from "axios"
import './home.css'
import { useEffect, useState } from "react";

export default function Home(){
    //Initializing Variables
    const[totalPages,SetTotalPages]=useState(0)
    const[viewMore,SetViewMore]=useState(0)
    const[page,SetPage]=useState(1)
    const[switchCarousel,SetSwitchCarousel]=useState(false);
    const[api,SetApi]=useState()
    //Handles
    const handlePrevious = ()=>{
        SetSwitchCarousel(false)
        SetPage(p=>p=p-1)
    }
    const handleNext = () =>{
        SetSwitchCarousel(false)
        SetPage(p=>p=p+1)
    }
    const handleSwitchCarousel = e =>{
        SetViewMore(parseInt(e.target.id.slice(2)))
        SetSwitchCarousel(true)
    }
    //UseEffects
    useEffect(()=>{
        axios.get(`https://api.rawg.io/api/games?&page=${page}&key=018e2d8e3f074e628a722c1253854fd6`)
        .then(response=> {
            SetApi(response.data.results)
            SetTotalPages(Math.floor(response.data.count/20)+1)
        })
        .catch(error=>{
            console.log(error);
        })
    },[page])
    //Return
    return <div className="homepage">
        <div className="d-flex mt-2">
        {/* Scroller */}
            <div className="ms-4 " id='scroll'>
                <div className="buttons mb-2 d-flex align-items-center">
                    <h4 className="me-2">Pages: </h4>
                    {(page>1)?(
                    <button className="btn btn-dark me-2" onClick={handlePrevious}>Previous</button>):(
                    <button className="btn btn-dark me-2" disabled>Previous</button>)}
                    <h4>{page}</h4>
                    {(page<totalPages)?(
                    <button className="btn btn-dark ms-2" onClick={handleNext}>Next</button>):(
                    <button className="btn btn-dark ms-2" disabled>Next</button>)}
                </div>
                {   
                    (api)?(api.map((x,index) =>{
                        return <div key={x.id} className={(index!==19)?("card me-4 mb-2"):("card me-4")} data-bs-theme="dark"  >
                            <div className="card-body">
                                <h6>{x.name}</h6>
                                <img alt={x.name} src={x.background_image} onClick={handleSwitchCarousel} id={'g-'+index}></img>
                            </div>
                        </div>
                    })):('')
                }
            </div>
            <div id="carouselExampleCaptions" className="carousel slide c-width">
            {/* Carousel if we change slides with Keyboard arrows to the next page */}
            <div className="carousel-indicators" onKeyUp={e=>{
                const onCarousel = parseInt(document.querySelector('.carousel-inner .active img').getAttribute('alt'))
                switch(e.keyCode){
                    case 39:
                        if(api){
                        (onCarousel===19)?(handleNext()):(<></>)
                        }
                    break;
                    case 37:
                        if(api){
                        (onCarousel===0)?(handlePrevious()):(<></>)
                        }
                    break;
                }
            }}>
                
                {
                    (!switchCarousel)?((api)?(api.map((e,index)=>{
                        return <button key={index} type="button" data-bs-target="#carouselExampleCaptions" className={(index===0)?("active"):('')} data-bs-slide-to={index} aria-current="true" aria-label={'Slide '+(index+1)}></button>
                    }
                    )):('')):(api[viewMore].short_screenshots.map((e,index)=>{
                        return <button key={index} type="button" data-bs-target="#carouselExampleCaptions" className={(index===0)?("active"):('')} data-bs-slide-to={index} aria-current="true" aria-label={'Slide '+(index+1)}></button>
                    }))
                    
                }
                
            </div>
            <div className="carousel-inner" >
            {(switchCarousel)?(<i className="carousel-control-prev fa-solid fa-arrow-left fa-2xl" onClick={()=>{SetSwitchCarousel(x=>!x)}}></i>):('')}
            {/* Showing Slides */}
                {(!switchCarousel)?((api)?(api.map((x,index) =>{
                    return <div className={(index===0)?("carousel-item active "):('carousel-item')} key={index}>
                    <img src={x.background_image} className="d-block" alt={index}/>
                    <div className="carousel-caption d-none d-md-block ">
                        <h5>{x.name}</h5>
                        <div className="d-flex justify-content-center gap-4">
                            {   
                                api[index].tags.map((y,key)=>{
                                if(key<3)
                                return <button key={key} className="btn btn-dark" disabled>{y.name}</button>
                            })
                        }
                        {   
                            (api[index].tags.length>3)?(<button className="btn btn-dark" onClick={()=>{window.location="/game/"+api[index].name}}>View More</button>):('')
                        }
                        </div>
                    </div>
                </div>
                })):('')):(
                (api && api[viewMore].short_screenshots.map((x,index)=>{
                return <div className={(index===0)?("carousel-item active "):('carousel-item')} key={index}>
                    {/* Showing Detailed Slides when u click to a specific game */}
                    <img src={x.image} className="d-block" alt={index}/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className="d-fixed">{api[viewMore].name}</h5>
                        <div className="d-flex justify-content-center gap-4">
                            {   
                                api[viewMore].tags.map((y,key)=>{
                                    if(key<3)
                                    return <button key={key} className="btn btn-dark" disabled>{y.name}</button>
                                    else
                                    return ''
                                })
                            }
                            {   
                                (api[viewMore].tags.length>3)?(<button className="btn btn-dark" onClick={()=>{window.location="/game/"+api[viewMore].name}}>View More</button>):('')
                            }
                        </div>
                    </div>
                </div>})))}            
            </div>
            {(page>1 || switchCarousel)?(<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" onClick={()=>{
                if(!switchCarousel){
                    const onCarousel = parseInt(document.querySelector('.carousel-inner .active img').getAttribute('alt'))
                    if(api){
                    (onCarousel===0 )?(handlePrevious()):(<></>)
                    }
                }}} >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden" >Previous</span>
            </button>):('')}
            {
                (page<totalPages)?(
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next" onClick={()=>{
                        const onCarousel = parseInt(document.querySelector('.carousel-inner .active img').getAttribute('alt'))
                        if(api){
                        (onCarousel===19 && !switchCarousel)?(handleNext()):(<></>)
                        }}}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
                </button>):('')
            }
            
            </div>
        </div>
    </div>
}