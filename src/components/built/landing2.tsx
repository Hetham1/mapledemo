"use client";
import { WavyBackground } from "../ui/wavy-background";

export default function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="flex justify-center items-end">
        <p className="text-4xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center mr-1">
          Maple Air
        </p>
        <span className="text-sm lg:text-2xl text-gray-200 font-semibold inter-var">
          inc.
        </span>
      </div>

      <p className="text-base md:text-lg lg:text-2xl mt-4 lg:mt-6 text-white font-normal inter-var text-center">
        Perfecting Comfort, Season After Season.
      </p>
    </WavyBackground>
  );
}
