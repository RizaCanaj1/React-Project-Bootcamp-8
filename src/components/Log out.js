export default function Log_out(){
    //Removing logged in usser
    localStorage.removeItem("logged user");
    //Return
    return <h6 className="text-danger" style={{textAlign :'center',marginTop:'50px'}}>Succesfully logged out! <a href="/">Back to main page</a></h6>
    
}