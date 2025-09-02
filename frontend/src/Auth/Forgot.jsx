import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'

function Forgot() {
let navigate = useNavigate();
const [email,setMail] = useState('')
const [message,setMessage] = useState({message:'', color:''})
const [error,setError] = useState('')

const iserror=()=>{
if (email == '' ) {
setMessage({message:'Please fill Email.',color:"text-danger"});
return true 
}
return false    
}

const API_URL=import.meta.env.VITE_API_URL;
  let url =API_URL+"/user/forget" 
  
const handleSubmit=(e)=>{
e.preventDefault()
if(!iserror()){
axios.post(url,{'email':email})
.then((response)=>{
console.log(response)
if(response.data.responseStatus==1){
      localStorage.setItem('r_user_id',response.data.userid)
      localStorage.setItem('code',response.data.code)
      setMessage({message:response.data.response, color:"text-success"})
      setTimeout(()=>{navigate("/auth/reset");},2000)

}
else
setMessage({message:response.data.response, color:"text-danger"})  
})
.catch((err)=>console.log(err))
}
}

return (
<>
<div className='p-4'>
<form onSubmit={(e)=>handleSubmit(e)}>
<p>Lost your password?
<br />
Please enter your mail, you will recieve a mail with link to reset password.
</p>
<input type="email" value={email} onChange={(e) => setMail(e.target.value)}
className='form-control' placeholder="example@xyz.com"/>
<p className={message.color} >{message.message}</p>

<div className='my-3 text-center'>
<button className="btn btn-primary w-100 py-2 fw-semibold" type='submit'>Send Mail</button>
</div>

</form>

<div className='text-center text-muted'>
 Back to <Link to='/auth' className='text-muted' style={{textDecoration:'none'}}> Sign In
</Link>
</div>

</div>
</>
)
}

export default Forgot