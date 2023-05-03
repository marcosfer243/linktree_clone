import { useState } from "react";
import supabase from "../../utils/supabaseClient";

//Next router
import { useRouter } from "next/router";

function login() {

    const [email, setemail] = useState<string | undefined>();
    const [password, setpassword] = useState<string | undefined>();
    const router = useRouter()

  const signInWithEmail=async()=>{
    try {
      if(email && password){
        const response = await supabase.auth.signInWithPassword({
          email:email,
          password:password,
        })

        router.push("/")

        if(response.error)throw response.error;
        const userId = response.data.user?.id;
        console.log("userId: ", userId)
      }


    } catch (error) {
      
    }
  }

  return (
<div style={{borderRadius:"16px",height:"50vh", boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"}} className="flex flex-col w-full justify-evenly items-center p-5" >
   <h2 className="font-bold text-2xl" >Login</h2>
    <div className="" >
    <label htmlFor="email" className="block text-sm  font-medium leading-6 text-gray-900">
      Email
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      </div>
      <input
        type="text"
        name="email"
        id="email"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="you@example.com"
        onChange={(e)=>setemail(e.target.value)}
      />
    </div>
    </div>
    <div className="" >
    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
      Password
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      </div>
      <input
        type="password"
        name="password"
        id="password"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="password"
        onChange={(e)=>setpassword(e.target.value)}
      />
    </div>
    </div>
    <button onClick={signInWithEmail} className="group rounded-lg h-12 w-40 bg-blue-500 font-bold text-md text-white relative overflow-hidden mt-5">
       Sign in
        <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-lg">
        </div>
    </button>
  </div>
  )
}

export default login;