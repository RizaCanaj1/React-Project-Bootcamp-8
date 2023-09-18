import axios from "axios"
import { useEffect, useState } from "react"
import './view more.css'
import { useParams } from "react-router-dom"

/*default_comment = {
    comment:'',
    user:'name',
    email:'example@example.com',
    game:'game',
    time:'Y/M/D , H:M'
}*/

export default function View_More(){
    //Initializing variables
    const [api,SetApi]=useState()
    const [logged_user,SetLoggedUser]=useState()
    const [selector,SetSelector]=useState()
    const [allComments,SetAllComments]=useState([])
    const [getComments,SetGetComments]=useState(false)
    const [updateComment,SetUpdateComment]=useState()
    const [comment,SetComment]=useState([])
    const [noComments,SetNoComments]=useState(false)
    const [isfavorite,SetIsFavorite]=useState(false)
    const [favoritesList,SetFavoriteList]=useState([])
    const [totalVotes,SetTotalVotes]=useState(0)
    const search='search='+useParams().id
    const selected = useParams().id
    //Handles
    const handleFavorites=()=>{
        if(isfavorite){
            document.querySelector('.fa-bookmark').style.color='rgb(182, 96, 70)'
            SetFavoriteList(list=>list.filter(element=>element!==selector[0].name))
        }
        else{
            document.querySelector('.fa-bookmark').style.color='white'
            if(favoritesList instanceof Array)
            SetFavoriteList(list=>[...list,selector[0].name])
            else
            SetFavoriteList([selector[0].name])
        }
        if(localStorage.getItem('logged user')){
            SetIsFavorite(f=>!f)
        }
        else{
            alert('You have to be loggined to add this game to your favorite list')
        }
    }
    const handleUpdateComment = e =>{
        SetUpdateComment(e.target.value)
    }
    const handleComments=e=>{
        e.preventDefault()
        if(e.target.comment.value!==''){
            const time= new Date()
            const comment_time=`${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} , ${(time.getHours()<10)?('0'+time.getHours()):(time.getHours())}:${(time.getMinutes()<10)?('0'+time.getMinutes()):(time.getMinutes())}`
            if(allComments.length===0){
                SetAllComments(x=>x=[{comment:updateComment,user:logged_user.name,email:logged_user.email,game:selector[0].name,time:comment_time}])
                e.target.comment.value = ''
            }
            else{
                SetAllComments(x=>x=[{comment:updateComment,user:logged_user.name,email:logged_user.email,game:selector[0].name,time:comment_time},...x])
                e.target.comment.value = ''
            }
        }
        else{
            alert(`Can't leave empty`)
        }
        
    }
    //Use Effects
    useEffect(()=>{
        axios.get(`https://api.rawg.io/api/games?${search}&page=1&key=018e2d8e3f074e628a722c1253854fd6`)
        .then(response=> {
            SetApi(response.data.results)
        })
        .catch(error=>{
            console.log(error);
        })
    },[])
    useEffect(()=>{
        if(selector){
        let a = 0;
        (selector[0].ratings.map(x=>a=a+x.count))
        return SetTotalVotes(a)
        }
    },[api])
    useEffect(()=>{
        if(getComments===false){
            if(localStorage.getItem('Comments')){
                SetAllComments(x=>x=JSON.parse(localStorage.getItem('Comments')))
                SetGetComments(true)
            }
            else{
                localStorage.setItem('Comments',JSON.stringify(allComments))
            }
        }
        else if(allComments){
            if(selector)
            SetComment(allComments.filter(x=>x.game===selector[0].name))
            localStorage.setItem('Comments',JSON.stringify(allComments))
        }
        
    },[allComments,api])
    useEffect(()=>{
        if(comment.length===0){
            SetNoComments(true)
        }
        else{
            SetNoComments(false)
        }
    },[comment])
    useEffect(()=>{
        if(api){
            if(api.filter(x=>x.name === selected.replace(/-/g,' ')).length===1)
            SetSelector(api.filter(x=>x.name === selected.replace(/-/g,' ')))
            else
            SetSelector(api)
            
        }
        if(localStorage.getItem('logged user')){
        SetFavoriteList(JSON.parse(localStorage.getItem('logged user')).favorites)
        SetLoggedUser(JSON.parse(localStorage.getItem('logged user')))
        }
    },[api])
    useEffect(()=>{
        if(api){
            if(isfavorite){
                document.querySelector('.fa-bookmark').style.color='rgb(182, 96, 70)'
            }
            else{
                document.querySelector('.fa-bookmark').style.color='white'
            }
        }
    },[isfavorite])
    useEffect(()=>{
        if(api && selector){
            console.log(selector)
            if(favoritesList instanceof Array)
            favoritesList.map(x=>{(x===selector[0].name)?(SetIsFavorite(true)):(<></>)})
            else
            if(favoritesList === selector[0].name)(SetIsFavorite(true))
        }
    },[selector])
    useEffect(()=>{
        if(localStorage.getItem('logged user')&&logged_user){
            if(JSON.parse(localStorage.getItem('users')).length>1){
                const all_users=JSON.parse(localStorage.getItem('users')).filter(x=>x.email!==logged_user.email)
                const updated_user = ({...logged_user,favorites:favoritesList})
                localStorage.setItem('logged user',JSON.stringify({...logged_user,favorites:favoritesList}))
                localStorage.setItem('users',JSON.stringify([...all_users,updated_user]))
            }
            else{
                const updated_user = ({...logged_user,favorites:favoritesList})
                localStorage.setItem('logged user',JSON.stringify({...logged_user,favorites:favoritesList}))
                localStorage.setItem('users',JSON.stringify([updated_user]))
            }
            
        }
    },[favoritesList])
    //Return
    return<div className="view_more_page">
    {/* Slider */}
    <div className="container mt-5">
        {(selector)?(<>
        <div className="d-flex justify-content-center align-items-center"><h3>{selector[0].name}</h3><i className="fa-solid fa-bookmark fa-xl ms-4" onClick={handleFavorites}></i></div>
        
        <div id="carouselExampleCaptions" className="carousel slide">
    
    <div className="carousel-indicators">
        {selector[0].short_screenshots.map((e,index)=>{
                return <button key={index} type="button" data-bs-target="#carouselExampleCaptions" className={(index===0)?("active"):('')} data-bs-slide-to={index} aria-current="true" aria-label={'Slide '+(index+1)}></button>
            })
        }
    </div>
    <div className="carousel-inner" >
    <i className="carousel-control-prev fa-solid fa-arrow-left fa-2xl" onClick={()=>{window.location='/'}}></i>
        {   (selector && selector[0].short_screenshots.map((x,index)=>{
                return <div key={index} className={(index===0)?("carousel-item active "):('carousel-item')} >
                    <img alt={selector[0].name} src={x.image} className="d-block"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h5 className="d-fixed">{selector[0].name}</h5>
                    </div>
                </div>
            }))
        }
        {
            (selector && selector[0].short_screenshots.length===0)?(<div className="carousel-item active " >
            <img alt={selector[0].name} src='https://www.thensg.gov.za/wp-content/uploads/2020/07/No_Image-3-scaled-1.jpg' className="d-block"/>
            <div className="carousel-caption d-none d-md-block">
                <h5 className="d-fixed">{selector[0].name}</h5>
            </div>
            </div>):('')
        }
        
    </div>
    {
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev" >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
        </button>
    }
    {
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
        </button>
    }
    </div>
    {/* Game Details */}
    <div className="f-grid mt-4">
        <div className="t-g-p">
            <div className="tags">
            <h5>Tags:</h5>
                <p>
                {selector[0].tags.filter(x=>x.language==='eng').map((x,index)=>(index!==selector[0].tags.filter(x=>x.language==='eng').length-1)?(<a key={index} href={'/searched/tags='+x.name.toLowerCase().replace(/ /g, '-')}>{x.name+' ,'}</a>):
                (<a key={index} href={'/searched/tags='+x.name.toLowerCase().replace(/ /g, '-')}>{x.name}</a>))}pi
                </p>
            </div>
            <div className="Genre">
                <h5>Genre:</h5>
                <p>
                {selector[0].genres.map((x,index)=>(index!==selector[0].genres.length-1)?(<a key={index} href={'/searched/genres='+x.name.toLowerCase().replace(/ /g, '-')}>{x.name+' ,'}</a>):
                (<a key={index} href={'/searched/genres='+x.name.toLowerCase().replace(/ /g, '-')}>{x.name}</a>))}
                </p>
            </div>
            <div className="Platforms">
                <h5>Plaforms:</h5>
                <p>
                {selector[0].platforms.map((x,index)=>(index!==selector[0].platforms.length-1)?(<span key={index}>{x.platform.name} ,</span>):(<span key={index}>{x.platform.name}</span>))}
                </p>
            </div>
        </div>
        <div className="s-p">
            <div className="Stores">
                <h5>Stores:</h5>
                <p>
                {(selector[0].stores)?(selector[0].stores.map((x,index)=>(index!==selector[0].stores.length-1)?(<span key={index}>{x.store.name} ,</span>):(<span key={index}>{x.store.name}</span>))):('none')}
                </p>
            </div>
            <div className="Ratings">
            <h5>Ratings: Total{'('+totalVotes+')'}</h5>
            {selector[0].ratings.map((x,index)=><p key={index}>{x.title+': Count '+x.count+'-> Percent '+x.percent +' %'}</p>)}
            </div>
            
        </div>
    </div>
    {/* Comments */}
    <div className="comments-feedback d-flex flex-column">
        <div className="show-comments">
        {(noComments)?(<><h6 className="text-danger">No Comments found. Be first to comment!</h6></>):(
            comment.map((c,index)=>{
                return<div className="comment" key={index}>
                <div className="d-flex align-items-center justify-content-around">
                    <i className="fa-regular fa-user" style={{color: '#ffffff'}}/>
                    <div className="flex-grow-1">
                        <p className="time m-auto ms-4"><i>At :{c.time}</i></p>
                        <h4 className="ms-4">{c.user} said:</h4>
                        <div className="comment-text">
                            <h6>{c.comment}</h6>
                        </div>
                    </div>
                    {(localStorage.getItem('logged user'))?((JSON.parse(localStorage.getItem('logged user')).role==="Admin"||JSON.parse(localStorage.getItem('logged user')).role==="Mod" || logged_user.email ===c.email)?
                    (<i className="fa-solid fa-eraser" onClick={()=>{if(prompt(('Do you want to removet this comment?Y/N')).toLowerCase()==='y'){SetAllComments(allComments.filter(x=>(x!==c)))}}}></i>):('')):('')}
                </div>
                </div>
            })
        )}
        </div>
        {(localStorage.getItem('logged user'))?(<form className="comments my-3" onSubmit={handleComments}>
            <label htmlFor="Comment">Comment:</label>
            <br/>
            <div className="d-flex">
                <input className="form-control" type="text" id="comment" name="comment" placeholder="Tell us your thoughts" onChange={handleUpdateComment}/>
                <button className="btn btn-primary ms-3"  type="submit" >Send</button>
            </div>
            
        </form>):(<button className="btn btn-danger comments my-3" onClick={()=>{window.location='/log_in'}}>Log in so you can comment!</button>
        )}
        
    </div>
    <div className="a_like">
        {/* More Search */}
        <h4>Based to your Search:</h4>
        <div className="card-grid mx-4 my-4 float-start" id='scroll'>
        {
            <>
            {api.map((x,index)=>{
                if(api && x!==selector[0])
                return <div key={index} className="card mb-4" data-bs-theme="dark">
                    <div className="card-body">
                        <h4>{x.name}</h4>
                        <img alt={selector[0].name} src={x.background_image} onDoubleClick={()=>{window.location="/game/"+x.name.replace(/ /g, '-')}}/>
                    </div>    
                </div> 
                
            })}
            </>
        }
        </div>
        </div>
    </>):('')}
    </div>
    
    
    </div>
}