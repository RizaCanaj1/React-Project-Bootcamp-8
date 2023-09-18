import { useEffect, useState } from 'react'
import './contact us.css'
export default function Contact_us (){
    //Initializing variables
    const [type,SetType]=useState('Report')
    const [updateUser,SetUpdateUser]=useState('name')
    const [reportUser,SetReportUser]=useState('')
    const [reportOnGame,SetReportOnGame]=useState('')
    const [reportComment,SetReportComment]=useState()
    //Handles
    const handleUpdates = e =>{
        SetType(e.target.value)
    }
    const handleUpdateUser = e=>{
        SetUpdateUser(e.target.value)
    }
    const handleUserFilter=e=>{
        if(localStorage.getItem('Comments')){
            SetReportUser(e.target.value.toLowerCase())
        }
    }
    const handleGameFilter=e=>{
        if(localStorage.getItem('Comments')){
            SetReportOnGame(e.target.value.toLowerCase())
        }
    }
    //Use Effects
    useEffect(()=>{
        if(localStorage.getItem('Comments')){
            if(JSON.parse(localStorage.getItem('Comments')).length>1)
            SetReportComment(JSON.parse(localStorage.getItem('Comments')).filter(x=>x.user.toLowerCase().startsWith(reportUser)&&x.game.toLowerCase().startsWith(reportOnGame)))
            else SetReportComment(JSON.parse(localStorage.getItem('Comments')))
        }
        
    },[reportUser,reportOnGame])
    const handleSubmit = e =>{
        e.preventDefault()
        let checker=false
        if(type==='Report'){
            if(!localStorage.getItem('Report')){
                const report = {
                    fromUser :JSON.parse(localStorage.getItem('logged user')).name,
                    comment:JSON.parse(e.target.comment.value)
                }
                localStorage.setItem('Report',[JSON.stringify(report)])
            }
            else{
                const local=JSON.parse(localStorage.getItem('Report'))
                const report = {
                    fromUser :JSON.parse(localStorage.getItem('logged user')).name,
                    comment:JSON.parse(e.target.comment.value)
                }
                if(JSON.parse(localStorage.getItem('Report')).length>1){
                    JSON.parse(localStorage.getItem('Report')).map(x=>{
                        if(JSON.stringify(x.comment)===JSON.stringify(report.comment)){
                            return checker=true
                        }
                        else{
                            return 0
                        }
                    })
                    if(!checker){
                        alert('Report Sended Successfuly')
                        localStorage.setItem('Report',JSON.stringify([report,...local]))
                    }
                    else{
                        alert('Report exists')
                    }
                }
                else{
                    if(JSON.stringify(JSON.parse(localStorage.getItem('Report')).comment)===JSON.stringify(report.comment)){
                        checker=true
                    }
                    if(!checker){
                        alert('Report Sended Successfuly')
                        localStorage.setItem('Report',JSON.stringify([report,local]))
                    }
                    else{
                        alert('Report exists')
                    }
                }
            }
        }
        else if(type==='Request'){
            if(!localStorage.getItem('Request')){
                const request = {
                    fromUser :JSON.parse(localStorage.getItem('logged user')).email,
                    update:e.target.update.value,
                    request:e.target.updater.value
                }
                localStorage.setItem('Request',[JSON.stringify(request)])
            }
            else{
                const local=JSON.parse(localStorage.getItem('Request'))
                const request = {
                    fromUser :JSON.parse(localStorage.getItem('logged user')).email,
                    update:e.target.update.value,
                    request:e.target.updater.value
                }
                if(JSON.parse(localStorage.getItem('Request')).length>1){
                    JSON.parse(localStorage.getItem('Request')).map(x=>{
                        if(JSON.stringify(x)===JSON.stringify(request)){
                            return checker=true
                        }
                    })
                    if(!checker){
                        alert('Request Sended Successfuly')
                        localStorage.setItem('Request',JSON.stringify([request,...local]))
                    }
                    else{
                        alert('Request exists')
                    }
                }
                else{
                    
                    if(JSON.stringify(JSON.parse(localStorage.getItem('Request')))===JSON.stringify(request)){
                        checker=true
                    }
                    if(!checker){
                        alert('Request Sended Successfuly')
                        localStorage.setItem('Request',JSON.stringify([request,local]))
                    }
                    else{
                        alert('Request exists')
                    }
                }
            }
        }
        else{
            if(!localStorage.getItem('Feedback')){
                const feedback = {
                    fromUser :JSON.parse(localStorage.getItem('logged user')).email,
                    feedback:e.target.feedback.value
                }
                localStorage.setItem('Feedback',[JSON.stringify(feedback)])
            }
            else{
                const local=JSON.parse(localStorage.getItem('Feedback'))
                const feedback = {
                    fromUser :JSON.parse(localStorage.getItem('logged user')).email,
                    feedback:e.target.feedback.value
                }
                if(JSON.parse(localStorage.getItem('Feedback')).length>1){
                    JSON.parse(localStorage.getItem('Feedback')).map(x=>{
                        if(JSON.stringify(x)===JSON.stringify(feedback)){
                            return checker=true
                        }
                    })
                    if(!checker){
                        alert('Feedback Sended Successfuly')
                        localStorage.setItem('Feedback',JSON.stringify([feedback,...local]))
                    }
                    else{
                        alert('Feedback exists')
                    }
                }
                else{
                    if(JSON.stringify(JSON.parse(localStorage.getItem('Feedback')))===JSON.stringify(feedback)){
                        checker=true
                    }
                    if(!checker){
                        alert('Feedback Sended Successfuly')
                        localStorage.setItem('Feedback',JSON.stringify([feedback,local]))
                    }
                    else{
                        alert('Feedback exists')
                    }
                }
            }
        }
    }
    //Return
    return <div className='contact_us' data-bs-theme="dark">
        {/* Request form */}
    <form className='d-flex flex-column justify-content-center align-items-center mt-4' onSubmit={handleSubmit}>
        <label htmlFor="type">Select type of request:</label>
        <select name="type" id="type" onChange={handleUpdates}>
            <option value="Report">Report</option>
            <option value="Request">Request</option>
            <option value="Feedback">Feedback</option>
        </select>
        
        <div className='card mt-4'>
            {/* Report */}
            {(type==='Report')?(
            <div className='card-body'>
                <h3>Report:</h3>
                <br/>
                {(JSON.parse(localStorage.getItem('Comments')).length>0)?(<>{(JSON.parse(localStorage.getItem('Comments')).length>1)?(<><label htmlFor='user'>From user:</label>
                <input className='form-control' type='text' name='user' id='user' placeholder="User" onKeyUp={handleUserFilter}/>
                <label htmlFor='game'>On Game:</label>
                <input  className='form-control' type='text' name='game' id='game' placeholder="Game" onKeyUp={handleGameFilter}/>
                </>):('')}
                {(reportComment!==undefined)?(<>
                <label htmlFor="comment">Select Comment:</label>
                <select className='form-control' name="comment" id="comment">
                    <option value="">--Comment--</option>
                    {(JSON.parse(localStorage.getItem('Comments')))?(reportComment.map((x,index)=>{
                        return <option key={index} value={JSON.stringify(x)}>
                            {(reportUser.toLocaleLowerCase()===x.user.toLocaleLowerCase())?(''):(`From:${x.user} , `)} {(reportOnGame===x.game.toLowerCase())?(''):(`On Game:${x.game} , `)}At:{x.time}, Said:{x.comment}</option>
                        })):('')}
                </select>
                <br/>
                <button type='submit' className='btn btn-danger'>Report</button>
                </>):('')}</>):('No Comments to report')}
            </div>):(((type==='Request')?(
            <div className='card-body'>
                {/* Request*/}
                <h3>Request:</h3>
                <label htmlFor='update'>Update:</label>
                <select name="update" id="update" onChange={handleUpdateUser}>
                    <option value='name'>Name</option>
                    <option value='surname'>Surname</option>
                    <option value='email'>Email</option>
                    <option value='password'>Password</option>
                    <option value='role'>Role</option>
                </select>
                
                {(updateUser==='name')?(<>
                    <br/><br/>
                    <label htmlFor='updater'>Name:</label>
                    <input name='updater' id='updater' type='text' className='mt-2 form-control' placeholder="Update" required></input>
                    </>
                ):((updateUser==='surname')?(<>
                    <br/><br/>
                    <label htmlFor='updater'>Surname:</label>
                    <input name='updater' id='updater' type='text' className='mt-2 form-control' placeholder="Update" required></input>
                    </>):(
                    (updateUser==='email')?(<>
                    <br/><br/>
                    <label htmlFor='updater'>Email:</label>
                    <input name='updater' id='updater' type='email' className='mt-2 form-control' placeholder="Update" required></input></>):(
                    (updateUser==='password')?(<>
                    <br/><br/>
                    <label htmlFor='updater'>Password:</label>
                    <input name='updater' id='updater' type='password' className='mt-2 form-control' placeholder="Update" required></input></>
                ):((updateUser==='role')?(
                    <>
                    <br/><br/>
                    <label htmlFor='updater' required>Roles:</label>
                    <select name='updater' id='updater'>
                        <option value='Mod'>Moderator</option>
                        <option value='Admin'>Administrator</option>
                    </select>
                    </>
                ):('')))))}
                <br/><br/>
                <button type='submit' className='btn btn-danger'>Request</button>
                </div>
                    ):(
            <div className='card-body'>
                {/* Feedback */}
                <label htmlFor='feedback' required>Feedback:</label>
                <br/>
                <textarea name='feedback' id='feedback'/>
                <br/><br/>
                <button type='submit' className='btn btn-danger'>Feedback</button>
            </div>)))}
        </div>
    </form>
    </div>
}