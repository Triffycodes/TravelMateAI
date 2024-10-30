import React from 'react'
import { Link } from 'react-router-dom'
import { RainbowButton } from '../ui/rainbow-button'
import WordRotate from '../ui/word-rotate'
import Footer from './Footer'
import { ParticlesDemo } from './ParticleDemo'
import landingPhoto from '/src/assets/landingphoto.png'


function Hero() {
  const words = ["Travel", "Journey", "Adventure"]
  return (
    <div className='flex flex-col'>
      <div className='flex items-center flex-col px-56 gap-9 bg-black py-10'>
        <ParticlesDemo />
        <h1 className='font-extrabold text-[60px] text-white text-center'>Transform Your<span className='text-[#f56551]'>
          <WordRotate words={words} />
        </span> Experience With <span className='text-[#007DFC]'>AI</span></h1>

        <p className='text-xl text-gray-400 text-center'>Intelligent Travel Planning for the Modern Adventurer</p>
        <Link to={"/create-trip"}>
          <RainbowButton className='p-3 text-nowrap'>Get Started, It's Free</RainbowButton>

        </Link>
        
      </div>

      <div className='flex flex-col items-center'>
        <img src={landingPhoto} className='w-[400px] justify-center md:w-[600px] lg:w-[800px] md:mt-20 lg:mt-20' />
      </div>
      <div>
        <Footer />
      </div>

    </div>

  )
}

export default Hero
