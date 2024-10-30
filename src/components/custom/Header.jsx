import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button } from '../ui/button'
import { googleLogout } from '@react-oauth/google';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios, { isCancel, AxiosError } from 'axios';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


function Header() {
  const [openDialog, setOpenDialog] = useState(false);



  const login = useGoogleLogin({
    onSuccess: codeResponse => GetUserProfile(codeResponse),
    onError: error => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data));
      setOpenDialog(false);
      window.location.reload();
    });
  }


  const user = JSON.parse(localStorage.getItem('user'));
  // const navigate= useNavigate();

  useEffect(() => {
    console.log(user)
  })

  const handleClose = () => {
    setOpenDialog(false)
  }


  return (
    <div className='flex p-4 shadow-md justify-between items-center px-10 py-6 bg-black'>
      <a href="/">
        <div className='flex transition ease-in hover:scale-110'>
          <img src='/src/assets/logo.svg' />
          <p className='p-2 font-sans font-semibold text-white'>TravelMate<span className='text-[#f56551]'>AI</span></p>
        </div>
      </a>
      <div>
        {user ?
          <div className='flex  gap-1 text-sm  md:flex md:items-center md:gap-3'>
            <a href='/create-trip'>
              <Button className="rounded-full bg-transparent hover:scale-110">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button className=" rounded-full bg-transparent hover:scale-110">My Trips</Button>
            </a>
            <Popover className="bg-transparent">
              <PopoverTrigger className="bg-transparent">
                <img src={user?.picture} className="w-[30px] gap-0 hover:scale-110 h-[24px] md:w-[35px] md:h-[35px] rounded-full" />
              </PopoverTrigger>
              <PopoverContent className="bg-transparent w-[150px] text-white text-center">
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>

              </PopoverContent>
            </Popover>

          </div>
          :
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        }


      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </DialogClose>
          <DialogHeader>
            <div className="flex w-full h-10">
              <img src="src/assets/logo.svg" alt="TravelMateAI Logo" />
              <p className='p-2 pt-3 font-sans font-semibold text-black'>
                TravelMate<span className='text-[#f56551]'>AI</span>
              </p>
            </div>
            <DialogTitle ></DialogTitle>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              Sign in app with the google authentication securely
            </DialogDescription>
          </DialogHeader>
          <Button onClick={login} className="w-full h-10 mt-5 flex gap-4 items-center justify-center">
            <FcGoogle className="w-6 h-6" /> Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Header
