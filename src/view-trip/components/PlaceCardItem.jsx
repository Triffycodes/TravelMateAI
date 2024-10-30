import { GetPlacesDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  const [photoUrl,setPhotoUrl] = useState();
  useEffect(()=>{
    place&&GetPlacesPhoto();
  },[place])

  const GetPlacesPhoto=async()=>{
    const data={
      textQuery:place?.placeName
    }
    const result = await GetPlacesDetails(data).then(res=>{
      console.log(res.data.places[0].photos[3].name)
      const PHOTO_URL = PHOTO_REF_URL.replace('{NAME}',res.data.places[0].photos[1].name);
      setPhotoUrl(PHOTO_URL);
    })

  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName } target="_blank">
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-110 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl?photoUrl:'/flight.jpg'} className='w-[130px] h-[130px] rounded-xl object-cover'></img>
      <div>
        <h2 className='font-bold text-lg'>{place?.placeName}</h2>
        <p className='text-sm text-gray-400'>{place?.placeDetails}</p>
        <h2 className='pt-2'>🕙 {place?.timeToTravel}</h2>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
