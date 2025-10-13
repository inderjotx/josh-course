"use client";
import { Heart as HeartIcon } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { generateParticles, useCleanUp } from "./utils";

export const SIZE_DELTA = 10; // 10 px
export const TIME_DELTA = 1; // 1 sec
export const PARTICLES = 30; // 30 particles

export const SIZE_BASE = 20; // 8 px
export const TIME_BASE = 0.5; // 1 s
export const MAX_DURATION = 2000; // 1s

export const ANGLE_DELTA = 10; // 10 degrees

export const PARENT_ID = "heart-container";
export const ANIMATION_CLASS = "animate-particle";
export const POWER_CLASS = "animate-power-p";

export interface Particle {
  x: string;
  y: string;
  duration: string;
  size: string;
  color: string;
}

export default function Page() {
  const [chaos, setChaos] = useState([PARTICLES]);
  const [isLiked, setIsLiked] = useState(false);
  const parentRef = useRef<HTMLLabelElement>(null);
  const parentHeight = parentRef?.current?.getBoundingClientRect().height;
  const [particles, setParticles] = useState<Particle[]>([]);

  useCleanUp(setParticles, isLiked, MAX_DURATION);
  const handleLiked = () => {
    if (isLiked) {
      setIsLiked(false);
      return;
    }
    setIsLiked(true);
    setParticles((prev) => [
      ...prev,
      ...generateParticles(PARTICLES, chaos[0], parentHeight ?? 144),
    ]);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-20">
      <label
        id={`${PARENT_ID}`}
        ref={parentRef}
        className="cursor-pointer relative rounded-full hover:bg-muted p-8 transition-colors group  flex items-center justify-center"
      >
        <input
          type="checkbox"
          checked={isLiked}
          onChange={handleLiked}
          className="peer sr-only"
        />
        <HeartIcon className="size-20 group-hover:text-red-500 transition-colors peer-checked:text-red-500 peer-checked:fill-red-500 peer-checked:animate-select-heart " />
        {isLiked && (
          <div
            className={`absolute rounded-full size-[1px] bg-purple-300 ${POWER_CLASS}`}
            style={
              {
                "--power-p-height": `${parentHeight}px`,
                "--power-p-width": `${parentHeight}px`,
                "--power-p-duration": `150ms`,
              } as React.CSSProperties
            }
          />
        )}
        {particles.map((particle, index) => (
          <div
            key={index}
            className={`absolute ${ANIMATION_CLASS} rounded-full `}
            style={
              {
                "--particle-x-offset": `${particle.x}`,
                "--particle-y-offset": `${particle.y}`,
                "--particle-duration": `${particle.duration}`,
                height: `${particle.size}`,
                width: `${particle.size}`,
                backgroundColor: `${particle.color}`,
              } as React.CSSProperties
            }
          />
        ))}
      </label>
      <div className="flex flex-col items-center gap-4">
        <label className="text-sm font-medium">Chaos: {chaos[0]}</label>
        <Slider
          value={chaos}
          onValueChange={setChaos}
          min={10}
          max={50}
          step={1}
          className="w-64"
        />
      </div>
    </div>
  );
}
