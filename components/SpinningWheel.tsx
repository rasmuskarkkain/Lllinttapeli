import React, { useState } from 'react';
import { Loader2, Volume2, VolumeX } from 'lucide-react';

const shoeData = [
  {
    id: 1,
    name: "Corset Combat Chaos",
    description: "A bizarre fusion of Victorian corsetry and modern boots",
    rating: 8.7,
    image: "/shoes/corset-boot.jpg"
  },
  {
    id: 2,
    name: "Curved Catastrophe",
    description: "When your shoes decide to take a wrong turn",
    rating: 7.9,
    image: "/shoes/curved-shoe.jpg"
  },
  {
    id: 3,
    name: "Brooklyn Boot Blunder",
    description: "Balenciaga's interpretation of confusion",
    rating: 9.2,
    image: "/shoes/brooklyn-boot.jpg"
  },
  {
    id: 4,
    name: "Pointy Pilgrim Disaster",
    description: "When elf shoes meet corporate disappointment",
    rating: 8.5,
    image: "/shoes/pointy-shoe.jpg"
  },
  {
    id: 5,
    name: "Pants-Shoe Paradox",
    description: "When pants and shoes have an identity crisis",
    rating: 9.8,
    image: "/shoes/pants-shoes.jpg"
  }
];

const SpinningWheel = () => {
  const [rotating, setRotating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [sound, setSound] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio('/spin-sound.mp3') : null);

  const toggleSound = () => {
    setSound(!sound);
  };

  const playSpinSound = () => {
    if (sound && audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const calculateSips = (rating) => {
    return Math.min(Math.ceil(rating / 4), 3);
  };

  const spinWheel = () => {
    if (rotating) return;
    
    setRotating(true);
    setShowResult(false);
    playSpinSound();
    
    const randomDegrees = Math.floor(Math.random() * 360) + 1440;
    setRotation(rotation + randomDegrees);
    
    setTimeout(() => {
      const normalizedDegree = (rotation + randomDegrees) % 360;
      const shoeIndex = Math.floor((normalizedDegree / (360 / shoeData.length)));
      setSelectedShoe(shoeData[shoeIndex]);
      setRotating(false);
      setShowResult(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Ugly Shoe Spinner</h1>
            <button onClick={toggleSound} className="text-gray-600 hover:text-gray-800">
              {sound ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>
          
          <p className="text-sm text-center text-gray-500 mb-6">
            © 2024 Mummi, Mutsi & Son Oy Ab Group. All rights reserved.
          </p>
          
          <div className="relative aspect-square mb-6">
            <div 
              className="absolute inset-0 transition-transform duration-[3000ms] ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {shoeData.map((shoe, index) => {
                const angle = (360 / shoeData.length) * index;
                return (
                  <div
                    key={shoe.id}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ transform: `rotate(${angle}deg) translateY(-120px)` }}
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden transform -rotate-45 border-2 border-rose-400 shadow-md">
                      <img
                        src={shoe.image}
                        alt={shoe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
              <div className="absolute inset-0 border-4 border-rose-400 rounded-full shadow-lg" />
            </div>
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6">
              <div className="w-4 h-4 bg-rose-500 rotate-45 transform origin-bottom"></div>
            </div>
          </div>

          <button
            onClick={spinWheel}
            disabled={rotating}
            className="w-full py-3 px-6 bg-rose-500 text-white rounded-lg font-semibold 
                     hover:bg-rose-600 disabled:bg-rose-300 transition-colors mb-6
                     shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {rotating ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" />
                Spinning...
              </span>
            ) : (
              'SPIN THE WHEEL OF UGLY!'
            )}
          </button>

          {showResult && selectedShoe && (
            <div className="space-y-4 animate-fade-in">
              {/* Winner Display */}
              <div className="bg-rose-50 rounded-lg p-4 border-2 border-rose-200">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-rose-300 shadow-md">
                    <img
                      src={selectedShoe.image}
                      alt={selectedShoe.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedShoe.name}</h2>
                    <p className="text-gray-600 text-sm mb-2">{selectedShoe.description}</p>
                    <div className="flex flex-col gap-1">
                      <span className="text-rose-600 font-medium">
                        Rating: {selectedShoe.rating} lintta-aste
                      </span>
                      <span className="text-gray-800 text-lg font-bold">
                        Drink {calculateSips(selectedShoe.rating)} sips! 🍺
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpinningWheel;