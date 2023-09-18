import { useEffect, useState } from "react"
import './users.css'
export default function Users(){
    //Initializing Varbailes
    const [all_users,SetAll_Users]=useState()
    const [allComments,SetAllComments]=useState()
    const [allRequests,SetAllRequests]=useState()
    const [allFeedbacks,SetAllFeedbacks]=useState()
    const [allReports,SetAllReports]=useState()
    //Handles
    const handleSubmit =e=>{
        e.preventDefault();
            const all = JSON.parse((localStorage.getItem('users'))).filter(x=>x.email!==e.target.email.value)
            const select=JSON.parse((localStorage.getItem('users'))).filter(x=>x.email===e.target.email.value)
            const updated_user = ({...select[0],name:e.target.name.value,surname:e.target.surname.value,email:e.target.email.value,password:e.target.password.value,role:e.target.role.value})
            if(e.target.role.value==="Delete User"){
                localStorage.setItem('users',JSON.stringify([...all]))
                e.target.remove()
            }
            else{
                localStorage.setItem('users',JSON.stringify([...all,updated_user]))
            }
            
    }
    //UseEffects
    useEffect(()=>{
        if(localStorage.getItem('Request'))
        SetAllRequests(JSON.parse(localStorage.getItem('Request')))
        if(localStorage.getItem('Feedback'))
        SetAllFeedbacks(JSON.parse(localStorage.getItem('Feedback')))
        if(localStorage.getItem('Report'))
        SetAllReports(JSON.parse(localStorage.getItem('Report')))
        if(localStorage.getItem('users'))
        SetAll_Users(JSON.parse(localStorage.getItem('users')))
        if(localStorage.getItem('Comments'))
        SetAllComments(JSON.parse(localStorage.getItem('Comments')))
    },[])
    useEffect(()=>{
        if(allFeedbacks!==undefined && allFeedbacks!==null){
            localStorage.setItem('Feedback',JSON.stringify(allFeedbacks))
        }
        if(allReports!==undefined && allReports!==null){
            localStorage.setItem('Report',JSON.stringify(allReports))
        }
        if(allRequests!==undefined && allRequests!==null){
            localStorage.setItem('Request',JSON.stringify(allRequests))
        }
        if(allComments!==undefined && allComments!==null){
            localStorage.setItem('Comments',JSON.stringify(allComments))
        }
    },[allRequests,allFeedbacks,allReports,allComments])
    //Return if user is logged in and if role is different from Member (Admin or Moderator)
    if(localStorage.getItem('logged user'))
    if(JSON.parse(localStorage.getItem('logged user')).role!=="Member")
    return<div className="container users" data-bs-theme="dark" >
        {/*Showing Users*/}
        <h3>Users</h3>
        {(JSON.parse(localStorage.getItem('logged user')).role==="Banned")?(window.location='/log_out'):('')}
    {   (all_users)?(all_users.map((x,index)=>{
        return <div key={index}>
            {/*Admin function -> Users*/}
            {((JSON.parse(localStorage.getItem('logged user')).role==="Admin")?( 
            <form className="d-flex ms-4 gap-4 align-items-center my-4" onChange={()=>{}} onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input className="form-control" type="text" name="name" placeholder="Edit the name" defaultValue={x.name}/>
                
                <label htmlFor="surname">Surname:</label>
                <input className="form-control" type="text" name="surname" placeholder="Edit the surname" defaultValue={x.surname}/>
                <label htmlFor="email">Email:</label>
                <input className="form-control" type="email" name="email" defaultValue={x.email} required></input>

                <label htmlFor="password">Password:</label>
                <input className="form-control" type="password"  name="password" defaultValue={x.password} required></input>
                
                <select className="border" name="role" title={x.role} defaultValue={x.role}>
                    <option value="Member">Member</option>
                    <option value="Mod">Moderator</option>
                    <option value="Admin">Administrator</option>
                    <option value="Banned">Ban</option>
                    <option value="Delete User">Delete User</option>
                </select>
                <button type="submit" className="btn btn-primary" title="submit"><i className="fa-solid fa-check"></i></button>
            </form> 
            ):((JSON.parse(localStorage.getItem('logged user')).role==="Mod")?(
            <form className="d-flex ms-4 gap-4 align-items-center my-4" onChange={()=>{}} onSubmit={handleSubmit}>
                {/*Moderator function -> Users*/}
                <label htmlFor="name">Name:</label>
                <input className="form-control" type="text" id="name" name="name" placeholder="Edit the name" defaultValue={x.name}/>
                
                <label htmlFor="surname">Surname:</label>
                <input className="form-control" type="text" id="surname" name="surname" placeholder="Edit the surname" defaultValue={x.surname}/>
                <label htmlFor="email">Email:{x.email}</label>
                <input className="d-none" id="email" name="email" defaultValue={x.email}></input>
                <label htmlFor="password">Password:{x.password}</label>
                <label htmlFor="role">Role:{x.role}</label>
                <button type="submit" className="btn btn-primary"><i className="fa-solid fa-check"></i></button>
            </form>
            ):('')))}
            
        </div>
        }
        )):( '')
       
    }
    <div className="container mb-4">

        {/* Showing requests */}
        <h3>Requests:</h3>
       
        {(localStorage.getItem('Request')?( <table><tbody className="Requests">
        {(allRequests!==undefined)?((allRequests.length>1)?(allRequests.map((r,index)=>{
            if(r.fromUser!==undefined)
            return<tr key={index} className="Request">
                <td className="border" width={300}><h6>From User: {r.fromUser}</h6></td>
                <td className="border" width={300}> Requested: {r.update}</td>
                <td className="border" width={300}> To: {r.request}</td>
                <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{SetAllRequests(allRequests.filter(x=>x!==r))}}> Remove Request</button></td>
            </tr>
            })):((allRequests.length===1)?(<tr className="Request">
                <td className="border" width={300}><h6>From User: {allRequests[0].fromUser}</h6></td>
                <td className="border" width={300}> Requested: {allRequests[0].update}</td>
                <td className="border" width={300}> To: {allRequests[0].request}</td>
                <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{localStorage.removeItem('Request');SetAllRequests(null)}}> Remove Request</button></td>
            </tr>):(<tr className="Request">
                <td className="border" width={300}><h6>From User: {allRequests.fromUser}</h6></td>
                <td className="border" width={300}> Requested: {allRequests.update}</td>
                <td className="border" width={300}> To: {allRequests.request}</td>
                <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{localStorage.removeItem('Request');SetAllRequests(null)}}> Remove Request</button></td>
            </tr>))):('')}
        </tbody></table>):('None'))}

        {/* Showing feedbacks */}
        <h3>Feedbacks:</h3>
        
        {(localStorage.getItem('Feedback')?(<table><tbody className="Feedbacks">
        {(allFeedbacks!==undefined)?((allFeedbacks.length>1)?(allFeedbacks.map((f,index)=>{
            if(f.fromUser!==undefined)
            return<tr key={index} className="Feedback">
                <td className="border" width={300}><h6>From User: {f.fromUser}</h6></td>
                <td className="border" width={300}><p> Feedback: {f.feedback}</p></td>
                <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{SetAllFeedbacks(allFeedbacks.filter(x=>x!==f))}}> Remove Feedback</button></td>
            </tr>
        })):((allFeedbacks.length===1)?(<tr className="Feedback">
            <td className="border" width={300}><h6>From User: {allFeedbacks[0].fromUser}</h6></td>
            <td className="border" width={300}><p> Feedback: {allFeedbacks[0].feedback}</p></td>
            <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{localStorage.removeItem('Feedback');SetAllFeedbacks(null)}}> Remove Feedback</button></td>
            </tr>
            ):(<tr className="Feedback">
            <td className="border" width={300}><h6>From User: {allFeedbacks.fromUser}</h6></td>
            <td className="border" width={300}><p> Feedback: {allFeedbacks.feedback}</p></td>
            <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{localStorage.removeItem('Feedback');SetAllFeedbacks(null)}}> Remove Feedback</button></td>
        </tr>))):('')}
        </tbody></table>):('None'))}

        {/* Showing reports */}
        <h3>Reports:</h3>
        
        {(localStorage.getItem('Report')?(<table><tbody className="Reports">
        {(allReports!==undefined)?((allReports.length>1)?(allReports.map((r,index)=>{
            if(r.fromUser!==undefined){
            return<tr key={index} className="Report" >
                <td className="border" width={300}><h6>Reported From User: {r.fromUser}</h6></td>
                <td className="border" width={500}><p> From: {(r.comment.user)} , At: {(r.comment.time)}, On Game: {(r.comment.game)}, Commented: {(r.comment.comment)}</p></td>
                <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{SetAllComments(allComments.filter(x=>x.comment!==r.comment.comment));SetAllReports(allReports.filter(x=>x!==r))}}> Action</button></td>
                <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{SetAllReports(allReports.filter(x=>x!==r))}}> Remove Report</button></td>
            </tr>}
        })):((allReports.length===1)?(<tr className="Report" >
            <td className="border" width={300}><h6>Reported From User: {allReports[0].fromUser}</h6></td>
            <td className="border" width={500}><p> From: {(allReports[0].comment.user)} , At: {(allReports[0].comment.time)}, On Game: {(allReports[0].comment.game)}, Commented: {(allReports[0].comment.comment)}</p></td>
            <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{SetAllComments(allComments.filter(x=>x.comment!==allReports[0].comment.comment));localStorage.removeItem('Report');SetAllReports(null)}}> Action</button></td>
            <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{localStorage.removeItem('Report');SetAllReports(null)}}> Remove Report</button></td>
            </tr>
            ):(<tr className="Report" >
            <td className="border" width={300}><h6>Reported From User: {allReports.fromUser}</h6></td>
            <td className="border" width={500}><p> From: {(allReports.comment.user)} , At: {(allReports.comment.time)}, On Game: {(allReports.comment.game)}, Commented: {(allReports.comment.comment)}</p></td>
            <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{SetAllComments(allComments.filter(x=>x.comment!==allReports.comment.comment));localStorage.removeItem('Report');SetAllReports(null)}}> Action</button></td>
            <td className="border" width={100}><button className="btn btn-danger" onClick={()=>{localStorage.removeItem('Report');SetAllReports(null)}}> Remove Report</button></td>
        </tr>))):('')}
        </tbody></table>):('None'))}
        
    </div>
    </div>
    else
    window.location='/'
}