import { AnimatedBeamDemo } from "@/components/custom/Animated-Beam-Demo";
import Home from "@/components/custom/nature";
import { ParticlesDemo } from "@/components/custom/ParticleDemo";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Meteors from "@/components/ui/meteors";
import Particles from "@/components/ui/particles";
import SparklesText from "@/components/ui/sparkles-text";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "@/constants/options";
import { Axis3DIcon, Sparkle } from "lucide-react";
import React, { Component } from 'react'
import { useEffect } from "react";
import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { chatSession } from "@/service/AiModel";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios, { isCancel, AxiosError } from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/custom/Footer";


function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData);

    }, [formData])

    const login = useGoogleLogin({
        onSuccess: codeResponse => GetUserProfile(codeResponse),
        onError: error => console.log(error)
    })

    const OnGenerateTrip = async () => {

        const user = localStorage.getItem('user')

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays > 30 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "Please fill all the details!",
            });
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{location}', formData?.location.label)
            .replace('{totalDays}', formData?.noOfDays)
            .replace('{traveler', formData?.traveler)
            .replace('{budget}', formData?.budget)
            .replace('{totalDays}', formData?.noOfDays)

        const result = await chatSession.sendMessage(FINAL_PROMPT)
        console.log("--", result?.response?.text());
        setLoading(false);
        SaveAiTrip(result?.response?.text());

    }

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    }

    //const [showButton, setShowButton] = useState(true); // State to control button visibility
    // const [showNewDiv, setShowNewDiv] = useState(false); // State to control new div visibility

    const handleClick = () => {
        // setShowButton(false); // Hide the button
        //  setShowNewDiv(true);  // Show the new div
        OnGenerateTrip();
    };

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setOpenDialog(false);
            OnGenerateTrip();
        });
    }

    const handleClose = () =>{
        console.log("you loggef off")
    }

    const color = "#ffffff"
    return (
        <div>
            <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 pt-10 bg-black text-white'>
                <Particles
                    className="absolute inset-0"
                    quantity={400}
                    ease={10}
                    color={color}
                    refresh
                />
                <Meteors />
                <h2 className='font-bold text-4xl text-[#f56551]'>Let's Plan Your Trip! <span className="text-5xl">⛰️</span></h2><br></br>
                <h3 className='font-bold text-3xl'>Tell us your <span className='text-[#f56551]'>travel</span> preferences</h3>
                <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our <span className='text-[#f56551]'>TravelMateAI</span> will generate a customized itinerary based on your preferences</p>
                <div className='mt-10 flex flex-col gap-10'>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>What is <span className='text-[#f56551]'>destination</span> of choice?</h2>
                        <div className="border-purple-400 text-black">
                            <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                                selectProps={{
                                    place,
                                    onChange: (v) => { setPlace(v); handleInputChange('location', v) }
                                }}
                            />
                        </div>


                    </div>

                    <div>
                        <h2 className='text-xl mt-5  my-3 font-medium'>How many <span className='text-[#f56551]'>days</span> you are planning?</h2>
                        <Input placeholder="Ex: 3" type="number" className="text-black"
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        />

                    </div>
                </div>

                <div>
                    <h2 className='text-xl mt-10 my-3 font-medium'>What is your <span className='text-[#f56551]'>Budget</span>?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg text-center
                         ${formData?.budget == item.title && 'shadow-lg border-purple-400'}
                         `}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>

                            </div>

                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl mt-10 my-3 font-medium'><span className='text-[#f56551]'>Who</span> do you plan on travelling with on your next adventure?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelsList.map((item, index) => (

                            <div key={index}
                                onClick={() => handleInputChange('traveler', item.people)}
                                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg text-center
                        ${formData?.traveler == item.people && 'shadow-lg border-purple-400'}
                        `}>
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>

                            </div>

                        ))}
                    </div>
                </div>

                <div className="my-10 justify-center flex">
                    <Button
                        disabled={loading}
                        onClick={handleClick}>
                        {loading ?
                            <div className="relative h-[130px] w-[400px] rounded-xl bg-white">
                                <AnimatedBeamDemo />
                                <BorderBeam />
                            </div>
                            : <SparklesText className='text-md' text="Generate Trip!" />
                        }
                    </Button>



                </div>

                <Dialog open={openDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription>
                                <div className="flex w-full h-10">
                                    <img src="/logo.svg"></img>
                                    <p className='p-2 pt-3 font-sans font-semibold text-black'>TravelMate<span className='text-[#f56551]'>AI</span></p>
                                </div>
                                <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                                <p>Sign in app with the google authentication securely</p>
                                <Button onClick={login} className="w-full h-10 mt-5 flex gap-4 items-center">
                                    <FcGoogle className="w-10 h-10" /> Sign in with Google</Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CreateTrip
