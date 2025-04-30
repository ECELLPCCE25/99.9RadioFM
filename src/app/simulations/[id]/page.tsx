"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import slide1 from "@/assets/slide1.png"
import slide2 from "@/assets/slide2.png"
import slide3 from "@/assets/slide3.png"
import CarDepreciation from "@/components/car-bill"

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showBill, setShowBill] = useState(false)

  const slides = [
    {
      image: slide1,
      alt: "Fin goes car shopping",
      title: "Fin goes car shopping",
    },
    {
      image: slide2,
      alt: "Car model showcase - side view",
      title: "",
    },
    {
      image: slide3,
      alt: "Car model showcase - interior view",
      title: "",
    },
  ]

  const nextSlide = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleYesClick = () => {
    setShowBill(true)
  }

  const handleNoClick = () => {
    // Reset to first slide
    setCurrentSlide(0)
  }

  const resetSlideshow = () => {
    setCurrentSlide(0)
    setShowBill(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      {!showBill ? (
        <div className="relative h-screen w-screen">
          <div className="h-full w-full cursor-pointer" onClick={() => currentSlide < 2 && nextSlide()}>
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].alt}
              fill
              className="object-cover"
              priority
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
              <p className="mt-2">
                {currentSlide === 2
                  ? "Do you want to buy the car?"
                  : ``}
              </p>
            </div>

            {currentSlide === 2 && (
              <div className="absolute bottom-6 right-6 flex space-x-4">
                <Button onClick={handleYesClick} className="bg-green-600 hover:bg-green-700">
                  Yes, I want to buy
                </Button>
                <Button onClick={handleNoClick} variant="outline" className="bg-white text-black hover:bg-gray-100">
                  No, thanks
                </Button>
              </div>
            )}

            
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn h-screen w-screen overflow-auto bg-white">
          <CarDepreciation/>
        </div>
      )}
    </div>
  )
}
