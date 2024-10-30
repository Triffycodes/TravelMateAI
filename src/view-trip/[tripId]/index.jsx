import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import InfoSection from '../components/infoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '@/components/custom/Footer';
import Particles from '@/components/ui/particles';
import { ParticlesDemo } from '@/components/custom/ParticleDemo';
import Meteors from '@/components/ui/meteors';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document", docSnap.data());
      setTrip(docSnap.data());
    }
    else {
      console.log("no document");
      toast('no trip found');
    }
  }



  return (
    <div>
      <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        <ParticlesDemo className="-z-100"/>
        <Meteors/>
        {/* InfoSection */}
        <InfoSection trip={trip} />

        {/* Hotels recommendation */}
        <Hotels trip={trip} />

        {/* Daily Plan */}
        <PlacesToVisit trip={trip} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ViewTrip
