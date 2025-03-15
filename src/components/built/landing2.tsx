"use client"
import { WavyBackground } from "../ui/wavy-background"

export default function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <p className="text-4xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">Maple Air</p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Perfecting Comfort, Season After Season.
      </p>
    </WavyBackground>
  )
}

