//@ts-nocheck
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Hotel from '../../public/goodhotel.webp';
import BurgerBuilding from '../../public/burger.webp';
import { CheckCircle, SparkleIcon } from 'lucide-react';

const buildingList = [
  { id: 'hotel', src: Hotel, name: 'Hotel' },
  { id: 'burger', src: BurgerBuilding, name: 'Burger Building' },
];

const IMAGE_SIZE = 400;
const handleMouseMove = (e) => {
    if (draggedBuilding) {
      setDraggedBuilding((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };


function isOverlapping(x1, y1, x2, y2, size = 280) {
    console.log(x1, y1, x2, y2, size);
  return !(
    x1 + size < x2 ||
    x2 + size < x1 ||
    y1 + size < y2 ||
    y2 + size < y1
  );
}

export default function IsoTileEditor() {
  const [placedBuildings, setPlacedBuildings] = useState([]);
  const [draggedBuilding, setDraggedBuilding] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, building) => {
    e.preventDefault();
    setDraggedBuilding({
      ...building,
      x: e.clientX,
      y: e.clientY,
    });
    setDragOffset({ x: IMAGE_SIZE / 2, y: IMAGE_SIZE / 2 });
  };

  const handleMouseMove = (e) => {
    if (draggedBuilding) {
      setDraggedBuilding((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }));
    }
  };

  const handleMouseUp = () => {
    if (draggedBuilding) {
      const finalX = draggedBuilding.x - dragOffset.x;
      const finalY = draggedBuilding.y - dragOffset.y;

      const overlaps = placedBuildings.some((bld) =>
        isOverlapping(finalX, finalY, bld.x, bld.y)
      );
      
      if (!overlaps) {
        setPlacedBuildings((prev) => [
          ...prev,
          {
            ...draggedBuilding,
            x: finalX,
            y: finalY,
          },
        ]);
      } else {
        alert('Cannot place here — it overlaps with another building.');
      }

      setDraggedBuilding(null);
    }
  };

  return (
    <div
      className="relative h-screen bg-[#b7c9d1] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className='w-fit absolute top-3 left-3'>
        <p className='font-semibold mb-1'>Daily Goals</p>
        <div className='bg-white w-fit p-3 rounded-md shadow'>
            <p className='flex items-center gap-2 text-sm text-gray-700'>
                <CheckCircle className='h-4 w-4'/>
                Save Rs.100 on food
            </p>
        </div>
      </div>
      <div className='w-fit absolute flex gap-2 top-3 right-3'>
        <SparkleIcon />
        100
      </div>
      {/* Placed Buildings */}
      {placedBuildings.map((bld, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: bld.x,
            top: bld.y,
            pointerEvents: 'none',
          }}
          className='flex items-center justify-center'
        >
          <div className='h-10 w-10 bg-black text-white flex items-center justify-center rounded-full absolute'>{index}</div>
          <Image src={bld.src} alt={bld.name} width={IMAGE_SIZE} height={IMAGE_SIZE} />
        </div>
      ))}

      {/* Drag Preview */}
      {draggedBuilding && (
        <div
          style={{
            position: 'absolute',
            left: draggedBuilding.x - dragOffset.x,
            top: draggedBuilding.y - dragOffset.y,
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        >
          <Image
            src={draggedBuilding.src}
            alt={draggedBuilding.name}
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
          />
        </div>
      )}

      {/* Bottom-left Panel */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-3 rounded shadow-md flex gap-3">
        {buildingList.map((building) => (
          <div
            key={building.id}
            onMouseDown={(e) => handleMouseDown(e, building)}
            className="cursor-grab"
          >
            <Image src={building.src} alt={building.name} width={80} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
}
