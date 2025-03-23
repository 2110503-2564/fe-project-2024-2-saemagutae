"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ExploreSpaces({ spaceJson }: { spaceJson: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const spaces = spaceJson?.data || [];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? spaces.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === spaces.length - 1 ? 0 : prev + 1));
  };

  const currentSpace = spaces[currentIndex];

  return (
    <div className="flex justify-center items-center mt-24 px-6 min-h-screen">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-lg p-10 border border-gray-200">
        {/* Image with Arrows */}
        <div className="relative mb-8">
          <img
            src={currentSpace.imageUrl}
            alt={currentSpace.name}
            className="w-full h-[500px] object-cover rounded-2xl"
          />
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-md 
             hover:bg-opacity-100 hover:scale-110 transition duration-200 ease-in-out"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-md 
             hover:bg-opacity-100 hover:scale-110 transition duration-200 ease-in-out"
          >
            <ChevronRight className="w-7 h-7 text-gray-700" />
          </button>
        </div>

        {/* Description */}
        <div className="text-left px-2">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            {currentSpace.name}
          </h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Address:</strong> {currentSpace.address}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Telephone:</strong> {currentSpace.telephone}
          </p>
          <p className="text-md text-green-600 mt-4">
            <strong>Open Time:</strong> {currentSpace.open_time}
          </p>
          <p className="text-md text-red-600">
            <strong>Close Time:</strong> {currentSpace.close_time}
          </p>
        </div>
      </div>
    </div>
  );
}
