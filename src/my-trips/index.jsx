import Footer from "@/components/custom/Footer";
import { ParticlesDemo } from "@/components/custom/ParticleDemo";
import Meteors from "@/components/ui/meteors";
import { db } from "@/service/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

import React from 'react'
import { useState } from "react";
import { useEffect } from 'react'
import { useNavigation } from 'react-router-dom';
import UserTripsCardItem from "./components/UserTripsCardItem";

function MyTrips() {
    const navigate = useNavigation();
    const [userTrips,setUserTrips] = useState([]);

    useEffect(()=>{
        GetUserTrips();
    },[])

    const GetUserTrips= async()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigate('/');
            return;
        }
        
        const q = query(collection(db,'AITrips'), where('userEmail','==',user?.email));
        
        const querySnapshot = await getDocs(q);
        setUserTrips([])
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        
        setUserTrips(prevVal=>[...prevVal,doc.data()])
        });
    }

  return (
    <div>
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 bg-black text-white min-h-screen'>
       <ParticlesDemo/>
       <Meteors />
      <h2 className="font-bold text-2xl">My Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-5 gap-5">
          {userTrips?.length>0?userTrips.map((trip,index)=>(
            <UserTripsCardItem trip={trip} />
          ))
        :[1,2,3,4,5,6].map((item,index)=>(
          <div key={index} className="h-[220px] w-full bg-slate-800 animate-pulse rounded-xl">

          </div>
        ))
        }
        </div>
    </div>
    <div className="py-4">
      <Footer />
    </div>
    </div>
  )
}

export default MyTrips
