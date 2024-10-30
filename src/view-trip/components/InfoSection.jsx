import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button'
import Particles from '@/components/ui/particles';
import { GetPlacesDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { useScroll } from 'framer-motion';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { IoMdSend } from "react-icons/io";


function InfoSection({trip}) {
 
  const [photoUrl,setPhotoUrl] = useState();
  useEffect(()=>{
    trip&&GetPlacesPhoto();
  },[trip])

  const GetPlacesPhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlacesDetails(data).then(res=>{
      console.log(res.data?.places[0]?.photos[3]?.name)
      const PHOTO_URL = PHOTO_REF_URL.replace('{NAME}',res.data?.places[0]?.photos[4]?.name);
      setPhotoUrl(PHOTO_URL);
    })

  }
  return (
    <div>
        
        <img src={photoUrl?photoUrl:'src/assets/flight.jpg'} className='h-[350px] w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day(s)</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵 {trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>👬🏻 No of Travelers: {trip?.userSelection?.traveler}</h2>
                </div>
            </div>

            <Button className="border-white"><IoMdSend /></Button>
        </div>

    </div>

    
  )
}

export default InfoSection
