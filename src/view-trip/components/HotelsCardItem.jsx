import { GetPlacesDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelsCardItem({hotel}) {

  const [photoUrl,setPhotoUrl] = useState();
  useEffect(()=>{
    hotel&&GetPlacesPhoto();
  },[hotel])

  const GetPlacesPhoto=async()=>{
    const data={
      textQuery:hotel?.hotelName
    }
    const result = await GetPlacesDetails(data).then(res=>{
      console.log(res.data.places[0].photos[3].name)
      const PHOTO_URL = PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[1].name);
      setPhotoUrl(PHOTO_URL);
    })

  }
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+" "+hotel.hotelAddress } target="_blank">
    <div className='hover:scale-110 transition-all cursor-pointer'>
        <img src={photoUrl?photoUrl:'src/assets/flight.jpg'} className='rounded-lg h-[180px] w-full object-cover ' />
        <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium text-sm'>{hotel?.hotelName}</h2>
            <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
            <h2 className='text-sm'>💸 {hotel?.price}</h2>
            <h2 className='text-sm'>⭐️ {hotel?.rating} stars</h2>
        </div>
    </div>
    </Link>
  )
}

export default HotelsCardItem
