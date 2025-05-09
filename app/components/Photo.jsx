'use client'

import Image from "next/image"
import { useState } from "react"
import PhotoModal from "./PhotoModal"
import { Delete } from "@mui/icons-material"
import { deletePhoto } from "../actions/deletePhoto"

const colors = [
    'red-400',
    'yellow-400',
    'green-500',
    'blue-400',
    'indigo-500',
    'purple-500',
    'pink-500'
];

export default function Photo({ src, alt, width, height, index }) {
    const [showModal, setShowModal] = useState(false)

    const color = colors[index % colors.length]

    const borderColorClass = {
        'red-400': 'border-red-400',
        'yellow-400': 'border-yellow-400',
        'green-500': 'border-green-500',
        'blue-400': 'border-blue-400',
        'indigo-500': 'border-indigo-500',
        'purple-500': 'border-purple-500',
        'pink-500': 'border-pink-500'
    }[color];

    const bgColorClass = {
        'red-400': 'bg-red-400',
        'yellow-400': 'bg-yellow-400',
        'green-500': 'bg-green-500',
        'blue-400': 'bg-blue-400',
        'indigo-500': 'bg-indigo-500',
        'purple-500': 'bg-purple-500',
        'pink-500': 'bg-pink-500'
    }[color];

    function toggleModal() {
        setShowModal(!showModal)
    }

    return (
        <>
            <div className="relative w-auto h-auto">
                {/* Shadow layer */}
                <span
                    className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 ${bgColorClass} rounded-lg`}
                ></span>
                {/* Main card */}
                <div
                    style={{ width, height }}
                    className={`relative w-auto h-auto shadow-md border ${borderColorClass} border-opacity-80 rounded-lg overflow-hidden bg-white cursor-pointer`}
                >
                    <form action={deletePhoto} className="absolute bottom-2.5 right-2 z-10">
                        <input type="hidden" name="photoPath" value={src} />
                        <button
                            type="submit"
                            className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
                        >
                            <Delete />
                        </button>
                    </form>

                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        style={{ objectFit: 'cover', objectPosition: 'center', aspectRatio: '1/1' }}
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>
            {showModal && <PhotoModal src={src} alt={alt} onClose={toggleModal} />}
        </>
    )
}