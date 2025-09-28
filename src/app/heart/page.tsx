"use client";
import { Heart as HeartIcon } from "lucide-react";
import { ChangeEvent } from "react";

const RAD_DELTA = 1; // 5 px
const SIZE_DELTA = 8; // 3 px
const TIME_DELTA = 1; // 1 sec
const PARTICLES = 30;

const SIZE_BASE = 20; // 8 px
const TIME_BASE = 0.5; // 1 s

// parent class of heart
const PARENT_ID = "heart-container";
const ANIMATION_CLASS = "animate-particle";
const POWER_CLASS = "animate-power-p";

export default function Page() {
  const createElement = (particleData: {
    x: number;
    y: number;
    duration: string;
    size: number;
    color: string;
  }) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add(ANIMATION_CLASS);

    newDiv.style.width = `${particleData.size}px`;
    newDiv.style.height = `${particleData.size}px`;
    newDiv.style.backgroundColor = particleData.color;
    newDiv.style.position = "absolute";
    newDiv.style.borderRadius = "50%";

    newDiv.style.setProperty("--particle-duration", particleData.duration);
    newDiv.style.setProperty("--particle-x-offset", `${particleData.x}px`);
    newDiv.style.setProperty("--particle-y-offset", `${particleData.y}px`);

    newDiv.addEventListener("animationend", () => {
      newDiv.remove();
    });

    return newDiv;
  };

  const addToParent = (parentId: string, elements: HTMLDivElement[]) => {
    const parentDiv = document.querySelector(`#${parentId}`);
    if (!parentDiv) {
      console.log("Can't find parent");
    } else {
      parentDiv.append(...elements);
    }
  };

  function getRandomTranslate(radius: number) {
    const randomRadius = radius + RAD_DELTA * Math.random();

    function randomPointOnCircle(cx: number, cy: number, r: number) {
      const angle = Math.random() * 2 * Math.PI;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return { x, y };
    }

    return randomPointOnCircle(0, 0, randomRadius);
  }

  const getRandomSize = (baseSize: number) => {
    return Math.ceil(baseSize + SIZE_DELTA * Math.random());
  };

  const getRandomTime = (baseTime: number) => {
    return (baseTime + TIME_DELTA * Math.random()).toFixed(2);
  };

  const getRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 50;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const powerParticle = (size: number) => {
    const newDiv = document.createElement("div");

    newDiv.style.width = `1px`;
    newDiv.style.height = `1px`;
    newDiv.style.backgroundColor = "#D2CFFE";
    newDiv.style.position = "absolute";
    newDiv.style.borderRadius = "50%";

    newDiv.style.setProperty("--power-p-height", `${size}px`);
    newDiv.style.setProperty("--power-p-width", `${size}px`);

    newDiv.classList.add(POWER_CLASS);

    newDiv.addEventListener("animationend", () => {
      newDiv.remove();
    });

    return newDiv;
  };

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.currentTarget.checked;
    if (!isChecked) {
      console.log("Input is not checked");
    } else {
      const heartContainer = document.getElementById(PARENT_ID);
      if (!heartContainer) {
        console.log("Can't find parent");
      } else {
        const { height } = heartContainer.getBoundingClientRect();
        const elements = [];

        for (let i = 0; i < PARTICLES; i++) {
          // slighly smaller than height is better
          const { x, y } = getRandomTranslate(height * 0.8);
          const randomSize = getRandomSize(SIZE_BASE);
          const randomTime = getRandomTime(TIME_BASE);
          const randomColor = getRandomPastelColor();

          const element = createElement({
            x,
            y,
            duration: `${randomTime}s`,
            size: randomSize,
            color: randomColor,
          });

          elements.push(element);
        }

        // the intial purple color we see  , is because of power particle
        const powerP = powerParticle(height);
        elements.push(powerP);
        addToParent(PARENT_ID, elements);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <label
        id={`${PARENT_ID}`}
        className="cursor-pointer relative rounded-full hover:bg-gray-800 p-8 transition-colors group  flex items-center justify-center"
      >
        <input
          type="checkbox"
          className="peer sr-only"
          onChange={handleCheckBoxChange}
        />
        <HeartIcon className="size-20 group-hover:text-red-500 transition-colors peer-checked:text-red-500 peer-checked:fill-red-500 peer-checked:animate-select-heart " />
        {/* <div className="absolute bg-purple-400 inset-0 rounded-full"></div> */}
      </label>
    </div>
  );
}
