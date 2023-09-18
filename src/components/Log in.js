import { useEffect, useState } from "react";

export default function Log_in(){
    //Initializing variables
    const default_user ={
        name:'name',
        surname:'sname',
        email:'example@example.com',
        password:'password',
        role:'member',
        favorites:[]
    }
    const [keep_me_logged,SetKeep_me_logged]=useState(false)
    const [wrong_code,SetWrong_code]=useState(false)
    const [email_in_use,SetEmail_in_use]=useState(false)
    const [email_exists,SetEmail_exists]=useState(true)
    const [isBanned,SetIsBanned]=useState(false)
    const [want_role,SetWant_role]=useState('Member')
    const [reguser,SetRegUser]=useState(default_user)
    const [loguser,SetLogUser]=useState(default_user)
    const [wrongpw,SetWrongPw]=useState(true)
    const Mod_code='moderator'
    const Adm_code='admin'
    const [reg,SetReg]=useState(false)
    //Handles
    const handleUpdate_Register=e=>{
        if(e.target.id!=='keep_me_logged'){
            SetRegUser({...reguser,[e.target.id]: e.target.value})
        }
        if(e.target.id==='email'){
            SetEmail_in_use(false)
        }
        if(e.target.id==='mod_code'){
            (e.target.value!==Mod_code)?(SetWrong_code(true)):(SetWrong_code(false))
        }
        if(e.target.id==='admin_code'){
            (e.target.value!==Adm_code)?(SetWrong_code(true)):(SetWrong_code(false))
        }
        if(e.target.id==='role'){
            if(e.target.value=='Member'){
                SetWrong_code(false)
            }
        }
    }
    const handleUpdate_Login=e=>{
        SetLogUser({...loguser,[e.target.id]: e.target.value})
        if(e.target.id==='email'){
            SetRegUser(x=>x={reguser,email:e.target.value})
            SetEmail_exists(false)
            SetWrongPw(true)
            SetIsBanned(false)
        }
    }
    const handleRegister = e =>{
        e.preventDefault();
        if(wrong_code===false){
            if(localStorage.getItem('users')===null){
                if(reguser.name!==default_user.name){
                    localStorage.setItem('users',JSON.stringify(reguser))
                    alert("Account created succesfuly")
                    if(keep_me_logged){
                        localStorage.setItem('logged user',JSON.stringify(reguser))
                        window.location='/'
                    }
                    else window.location='/log_in'
                }
            }
            else{
                if(reguser.name!==default_user.name){
                    if(JSON.parse(localStorage.getItem('users')).length===undefined){
                        if(!email_in_use){
                            localStorage.setItem('users',JSON.stringify([JSON.parse(localStorage.getItem('users')),reguser]))
                            alert("Account created succesfuly");
                            if(keep_me_logged){
                                localStorage.setItem('logged user',JSON.stringify(reguser))
                                window.location='/'
                            }
                            else window.location='/log_in'
                        }
                        else{
                            alert('in use')

                        }
                    }
                    else{
                        if(!email_in_use){
                            localStorage.setItem('users',JSON.stringify([...JSON.parse(localStorage.getItem('users')),reguser]))
                            alert("Account created succesfuly");
                            localStorage.setItem('logged user',JSON.stringify(reguser))
                            if(keep_me_logged){
                                localStorage.setItem('logged user',JSON.stringify(reguser))
                                window.location='/'
                            }
                            else window.location='/log_in'
                        }
                        else{
                            alert('in use');
                        }
                    }
                }
            }
        }
        
    }
    const handleLog_reg = e=>{
        SetEmail_in_use(false)
        e.preventDefault()
        SetReg(!reg)
    }
    const handleLog_in = e =>{
        SetIsBanned(false)
        e.preventDefault()
        if(email_exists && localStorage.getItem('users')){
            JSON.parse(localStorage.getItem('users')).map(x=>{
                let is_logged=false;
                if(x.email===loguser.email && x.password===loguser.password){
                    if(x.role === "Banned"){
                        SetIsBanned(true)
                    }
                    else{  
                        is_logged=true
                        localStorage.setItem('logged user',JSON.stringify(x))
                        window.location='/'
                    }
                }
                else{
                    if(!isBanned && !is_logged)
                    SetWrongPw(false)
                }
            })
        }
    }
    const handleRoles = e=>{
        SetWant_role(e.target.value)
    }
    //Use Effects
    useEffect(()=>{
        if(localStorage.getItem('users')){
            if(Array.isArray(JSON.parse(localStorage.getItem('users'))) )
                JSON.parse(localStorage.getItem('users')).map(x=>{
                if(x.email===loguser.email){
                    SetEmail_exists(true)
                }})
            else{
                if(JSON.parse(localStorage.getItem('users')).email===loguser.email){
                    SetEmail_exists(true)
                }
            }
        }
        
    },[handleUpdate_Login,handleLog_reg])
    useEffect(()=>{
        if(localStorage.getItem('users')!==null){
            if(JSON.parse(localStorage.getItem('users')).length===undefined){
                const used = (JSON.parse(localStorage.getItem('users')).email===reguser.email)
                if(used){
                    SetEmail_in_use(true)
                }
            }
            else{
                JSON.parse(localStorage.getItem('users')).map(x=>(x.email===reguser.email)?(SetEmail_in_use(true)):(''))
            }
        }
    },[handleUpdate_Register,handleLog_reg])
    //Return
    return<>
    <div className="mt-5">
        <div className="card w-50 mx-auto">
            <div className="card-body">
                <div className="c-head mx-auto"><h4>{(!reg)?('Log in'):('Register')}</h4></div>
                <div className="log_in_form">{
                    (reg)?(<>
                    {/* Register Form */}
                    <form method="post" id="log_in" onSubmit={handleRegister} onChange={handleUpdate_Register}>
                        <label htmlFor="name">Name:</label>
                        <br/>
                        <input className="form-control" type="text" id="name" name="name" placeholder="Enter your Name" required/>
                        <label htmlFor="sname">Surname:</label>
                        <br/>
                        <input className="form-control" type="text" id="surname" name="surname" placeholder="Enter your Surname" required/>
                        <label htmlFor="email">Email:</label>
                        <br/>
                        <input className="form-control" defaultValue={loguser.email} type="email" id="email" name="email" placeholder="Enter your Email" required />
                        {(email_in_use)?(<><h6 className="text-danger">Email is on use! <a onClick={handleLog_reg}>Log in</a></h6></>):('')}
                        <label htmlFor="password">Password:</label>
                        <br/>
                        <input className="form-control" type="password" id="password" name="password" placeholder="Enter your Password" required />
                        <br/>
                        <label htmlFor="role">Role:</label>
                        <br/>
                        <select name="role" id="role" onChange={handleRoles}>
                            <option value="Member">Member</option>
                            <option value="Mod">Moderator</option>
                            <option value="Admin">Administrator</option>
                        </select>
                        <br/><br/>
                            {(want_role==='Mod')?(
                                <>
                                    <label htmlFor="mod_code">Code:</label>
                                    <br/>
                                    <input className="form-control" type="password" id="mod_code" name="mod_code" placeholder="Enter Moderator Code" required/>
                                    <br/>
                                    {(wrong_code)?(<><h6 className="text-danger">Codes doesn't match, <a href="/contact_us">Contact us</a></h6></>):('')}
                                </>
                                ):
                        ((want_role==='Admin')?(
                                <>
                                    <label htmlFor="admin_code">Code:</label>
                                    <br/>
                                    <input className="form-control" type="password" id="admin_code" name="admin_code" placeholder="Enter Administrator Code" required/>
                                    <br/>
                                    {(wrong_code)?(<><h6 className="text-danger">Codes doesn't match, <a href="/contact_us">Contact us</a></h6></>):('')}
                                </>
                            ):(''))}
                        <label htmlFor="keep_me_logged">Keep me logged in</label>
                        <input className="ms-3" type="checkbox" id="keep_me_logged" name="keep_me_logged" onChange={()=>{SetKeep_me_logged(x=>!x)}}/>
                        <br/><br/>
                        <button className="btn btn-primary"  type="submit" >Register</button>
                    </form>
                    </>
                    ):(
                    <>
                    {/* Log in Form */}
                    <label className="d-none" htmlFor="name">Name:</label>
                    <input className="form-control d-none" type="text" id="name" name="name" placeholder="Enter your Name" required/>
                    <label className="d-none" htmlFor="sname">Surname:</label>
                    <input className="form-control d-none" type="text" id="surname" name="surname" placeholder="Enter your Surname" required/>
                    <form method="post" id="log_in" onSubmit={handleLog_in} onKeyUp={handleUpdate_Login}>
                        <label htmlFor="email">Email:</label>
                        <br/>
                        <input className="form-control" defaultValue={(reguser.email!=='example@example.com')?(reguser.email):('')} type="email" id="email" name="email" placeholder="Enter your Email" />
                        {(!email_exists)?(<><h6 className="text-danger">Email doesn't exists, <a onClick={handleLog_reg}>Register</a></h6></>):('')}
                        {(isBanned)?(<><h6 className="text-danger">This account is banned! You cant access this account anymore, <a href="/contact_us">Contact us</a></h6></>):('')}
                        <label htmlFor="password">Password:</label>
                        <br/>
                        <input className="form-control" type="password" id="password" name="password" placeholder="Enter your Password" />
                        {(!wrongpw)?(<><h6 className="text-danger">Wrong Password ! <a>Reset Password</a></h6></>):('')}
                        <br/>
                        {
                            (!email_exists)?(
                            <button className="btn btn-primary"  type="submit" disabled>Log in</button>
                            ):(<button className="btn btn-primary"  type="submit" >Log in</button>)
                        }    
                    </form></>)}
                    <br/>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>{(!reg)?('New here?'):('Already have account?')}</p>
                    <button className="btn btn-secondary" onClick={handleLog_reg}>{(!reg)?('Register'):('Log in')}</button>
                </div>
            </div>
        </div>
    </div>
    </>
}