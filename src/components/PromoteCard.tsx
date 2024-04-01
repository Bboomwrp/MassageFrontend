'use client'
import VideoPlayer from "./VideoPlayer"
import { useState } from "react"
import { Rating } from "@mui/material"
import { useWindowListener } from "@/hooks/useWindowListener"

export default function PromoteCard() {

    const [playing, setPlaying] = useState(true)
    const [rating, setRating] = useState(0)
    //const [pointerPosition, setPointerPosition] = useState({ x:0, y:0 })

    // useWindowListener('pointermove', (e)=>{
    //     setPointerPosition( {x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY} )
    // })

    useWindowListener('contextmenu', (e)=>{
        e.preventDefault()
    })

    return (
        <div className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded-lg bg-[#C0AA89]
        flex flex-row">
            <VideoPlayer vdoSrc="/vdo/massage.mp4" isPlaying={playing} ></VideoPlayer>
            <div className="m-5">
                    With Thai Spa opening its doors, our treatments are set to redefine wellbeing and beauty in today’s Bangkok. Enjoy our special opening offer on all massages and treatments and embark with us on a journey to discover your best self.
                <button className="block rounded-md bg-[#CAAF9A] hover:bg-stone-800 px-3 py-2 text-white shadow-sm"
                onClick={ ()=> { setPlaying(!playing) } }>
                    {playing?'Pause':'Play'}
                </button>
            </div>
            

        </div>
    )
}