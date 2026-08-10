import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; 

function Auth()
{
    const navigate = useNavigate();

    useEffect(()=>{
     
     var path=window.location.pathname;

     if(path.startsWith("/admin"))
     {
      if(!localStorage.getItem("token") || localStorage.getItem("role")!="Admin")   
        navigate("/logout");
     }
     else if(path.startsWith("/user"))
     {
      if(!localStorage.getItem("token") || localStorage.getItem("role")!="User")   
        navigate("/logout");
     }
     else if(path.startsWith("/partner"))
     {
      if(!localStorage.getItem("token") || localStorage.getItem("role")!="Transport Partner")   
        navigate("/logout");
     }
     else
     {
        if(localStorage.getItem("role")=="Admin")            
            navigate("/admin");
        else if(localStorage.getItem("role")=="User")
            navigate("/user");
        else if(localStorage.getItem("role")=="Transport Partner")
            navigate("/partner");
        else
            navigate(path);    
     }
    },[]);
    
    return(
        <></>
    )
}

export default Auth;