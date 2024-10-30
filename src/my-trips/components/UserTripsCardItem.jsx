import { GetPlacesDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripsCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        trip && GetPlacesPhoto();
    }, [trip])

    const GetPlacesPhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlacesDetails(data).then(res => {
            console.log(res.data?.places[0]?.photos[3]?.name)
            const PHOTO_URL = PHOTO_REF_URL.replace('{NAME}', res.data?.places[0]?.photos[4]?.name);
            setPhotoUrl(PHOTO_URL);
        })

    }
    return (
        <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-110 transition-all shadow-lg shadow-cyan-500/50 pt-5 rounded-xl pb-5'>
            <img src={photoUrl?photoUrl:'/flight.jpg'} className="object-cover rounded-xl w-full h-[220px]" />
            <div className='px-3 pt-3'>
                <h2 className='font-bold text-sm'>
                    {trip?.userSelection?.location?.label}</h2>

                    <h2 className='text-sm text-gray-500 px-1'>Trip: {trip?.userSelection?.noOfDays} days</h2>
                    <h2 className='text-sm text-gray-500 px-1'>Budget: {trip?.userSelection?.budget}</h2>
                
            </div>
        </div>
        </Link>
    )
}

export default UserTripsCardItem

