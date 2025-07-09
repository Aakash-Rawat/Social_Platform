// import React, { useState } from 'react'
// import { Label } from '@radix-ui/react-label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import axios from 'axios'
// import { toast } from 'sonner'
// import { Link, useNavigate } from 'react-router-dom'
// import { Loader, Loader2 } from 'lucide-react'
// import { useDispatch } from 'react-redux'
// import { setAuthUser } from '@/redux/authSlice.js'

// const Login = () => {
//     const [input, setInput] = useState({
//         email:"",
//         password:""
//     });
//    const changeEventHandler =(e) =>{
//     setInput({...input,[e.target.name]:e.target.value})
//    }

//    const [loading, setLoading] = useState(false);
//    const navigate = useNavigate();
//    const dispatch = useDispatch();


//    const signupHandler = async (e) =>{
//     e.preventDefault();
//     //  console.log(input)
//     try {
//         setLoading(true);
//        const res = await axios.post('http://localhost:8000/api/v1/user/login', input,{
//         headers:{
//             'Content-Type':'application/json'
//         },
//         withCredentials: true
//        })
//          if(res.data.success){
//             dispatch(setAuthUser(res.data.user));
//             navigate('/');
//             toast.success(res.data.message);
//             setInput({
               
//                 email:"",
//                 password:""
//             })
//          }

//     } catch (error) {
//         console.log(error);
//      toast.error(error.response?.data?.message || "Login failed");
//     }finally{
//         setLoading(false);
//     }
//    }
//   return (
//     <div className='flex items-center w-screen h-screen justify-center'>
//          <form onSubmit={signupHandler} className='shadow-lg flex flex-col gap-5 p-8 '>
//             <div className='my-4'>
//                 <h1 className='text-center font-bold text-xl'>READOMO</h1>
//                 <p className='text-sm text-center'>Login to dive into readers and authors dimension</p>
//             </div>

//             <div>
//                 <Label className='font-medium'>Email</Label>
//                 <Input 
//                 type='email'
//                 name='email'
//                 value={input.email}
//                 onChange = {changeEventHandler}
//                 className='focus-visible:ring-transparent my-2'
                
//                 ></Input>
//             </div>
//             <div>
//                 <Label className='font-medium'>Password</Label>
//                 <Input 
//                 type='password'
//                 name='password'
//                 value={input.password}
//                 onChange = {changeEventHandler}
//                 className='focus-visible:ring-transparent my-2'
                
//                 ></Input>
//             </div>
//             {
//                 loading ? (
//                     <Button>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
//                         Please Wait
//                     </Button>
//                 ) : (
//                     <Button type='submit'>Login</Button>
//                 )
//             }
           
//              <span className='text-center'>Doesn't have an account? <Link to='/signup'  className='text-blue-600'>Signup</Link></span>
//          </form>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice.js'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
        setInput({
          email: "",
          password: ""
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form onSubmit={signupHandler} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold">READOMO</h1>
          <p className="text-sm text-gray-600">Login to dive into readers and authors dimension</p>
        </div>

        <div>
          <Label className="font-medium">Email</Label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div>
          <Label className="font-medium">Password</Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}

        <span className="block text-center text-sm text-gray-600">
          Don’t have an account? <Link to="/signup" className="text-blue-600 font-medium">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
