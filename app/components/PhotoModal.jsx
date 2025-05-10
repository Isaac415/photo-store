'use client'

import Image from "next/image";

export default function PhotoModal({src, alt, onClose}){
    if (!src) return null;

    return (
        <div className="fixed inset-0 bg-white bg-white-10 flex justify-center items-center z-15">
            <div className="bg-transparent p-4 rounded-lg relative">
                <button 
                    onClick={onClose} 
                    className="text-white hover:text-gray-300 mb-2 absolute top-15 right-0 bg-black bg-opacity-50 rounded-full p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="relative w-[90vw] h-[90vh] max-w-[1200px] max-h-[90vh]">
                    <Image 
                        src={src} 
                        alt={alt}
                        fill={true}
                        style={{objectFit: 'contain'}}
                        className="rounded-lg" 
                    />
                </div>
            </div>
        </div>
    )
}