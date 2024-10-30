import React from 'react'
import { Button } from '../ui/button'
import { FaGithubAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { TfiTwitter } from "react-icons/tfi";
import { LuLinkedin } from "react-icons/lu";
import { TfiInstagram } from "react-icons/tfi";

function Footer() {
    return (

        <div className='flex justify-between mx-20 mt-20 mb-10'>
            <div className=''>© Built by <span className='text-[#f56551] underline'>
                <a href="https://triffycodes.github.io/Adarsh_Shankar/" target="_blank" rel="noopener noreferrer">
                Adarsh
                </a></span></div>
            <div className='flex gap-5'>
                <a href="https://github.com/Triffycodes" target="_blank" rel="noopener noreferrer">
                    <FaGithubAlt className="w-[20px] h-[20px] hover:scale-125" />
                </a>
                <a href="https://twitter.com/AdarshGowda2097" target="_blank" rel="noopener noreferrer">
                    <TfiTwitter className="w-[20px] h-[20px] hover:scale-125" />
                </a>
                <a href="https://www.linkedin.com/in/adarshshankarofficial/" target="_blank" rel="noopener noreferrer">
                    <LuLinkedin className="w-[20px] h-[20px] hover:scale-125" />
                </a>
                <a href="https://www.instagram.com/adarsh.shankarr/" target="_blank" rel="noopener noreferrer">
                    <TfiInstagram className="w-[18px] h-[18px] hover:scale-125" />
                </a>

            </div>

        </div>
    )
}

export default Footer
