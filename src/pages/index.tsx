import React, { useState } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import supabase from '../../utils/supabaseClient'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [userId, setuserId] = React.useState<string|undefined>();
  const [title, setTitle] = React.useState<string|undefined>();
  const [url, setUrl] = React.useState<string|undefined>();

  React.useEffect(()=>{
    const getUser = async()=>{
      const user =await supabase.auth.getUser();
      console.log(user);
      if(user){
        const userId = user.data.user?.id;
        setuserId(userId);
        setIsAuthenticated(true)
      }
    }

    getUser();
  },[])
  

  React.useEffect(()=>{
       const getLinks = async ()=>{

        try {
          
          const {data, error} = await supabase.from("links").select().eq("user_id",userId);
          if(error) throw error;
          console.log("Links: ",data)
        } catch (error) {
          console.log(error)
        }
       }

       if(userId){
        getLinks();
       }
  },[userId])

  const addNewLink = async ()=>{
    try {      
      if(userId && url && title){
        const {data, error} = await supabase.from("links").insert({
          title:title,
          url:url,
          user_id:userId,
        }).select();
        if(error) throw error;
        console.log("DATA: ", data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-evenly p-24 ${inter.className}`}
    >
      {isAuthenticated&&
      (
        <div style={{borderRadius:"16px",height:"50vh", boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"}} className="flex flex-col w-full justify-evenly items-center p-5" >
          <h2 className='font-bold text-2xl' >Add New Link</h2>
    <div className="" >
    <label htmlFor="title" className="block text-sm  font-medium leading-6 text-gray-900">
      Title:
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      </div>
      <input
        type="text"
        name="title"
        id="title"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="My awesome link"
        onChange={(e)=>setTitle(e.target.value)}
      />
    </div>
    </div>
    <div className="" >
    <label htmlFor="url" className="block text-sm font-medium leading-6 text-gray-900">
      Url:
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      </div>
      <input
        type="text"
        name="url"
        id="url"
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="https://myinstaaccount.com"
        onChange={(e)=>setUrl(e.target.value)}
      />
    </div>
    </div>
    <button onClick={addNewLink} className="group rounded-lg h-12 w-40 bg-blue-500 font-bold text-md text-white relative overflow-hidden mt-5">
       Save
        <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-lg">
        </div>
    </button>
  </div>
      )}
    </main>
  )
}
