"use client"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { createNoise3D } from "simplex-noise"
import React from "react"

interface WavyBackgroundProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  const noise = React.useMemo(() => createNoise3D(Math.random.bind(Math)), [])
  const wRef = useRef<number>(0)
  const hRef = useRef<number>(0)
  const ntRef = useRef<number>(0)
  const iRef = useRef<number>(0)
  const xRef = useRef<number>(0)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  
  const getSpeed = React.useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001
      case "fast":
        return 0.002
      default:
        return 0.001
    }
  }, [speed])

  const waveColors = colors ?? [
    "#0ea5e9", // Cooling - Sky Blue
    "#2563eb", // Cooling - Deep Blue
    "#f43f5e", // Heating - Warm Red
    "#f97316", // Heating - Orange
    "#fb923c", // Heating - Light Orange
  ]

  const drawWave = React.useCallback((n: number) => {
    if (!ctx.current) return
    ntRef.current += getSpeed()
    for (iRef.current = 0; iRef.current < n; iRef.current++) {
      ctx.current.beginPath()
      ctx.current.lineWidth = waveWidth || 50
      ctx.current.strokeStyle = waveColors[iRef.current % waveColors.length]
      for (xRef.current = 0; xRef.current < wRef.current; xRef.current += 5) {
        const y = noise(xRef.current / 800, 0.3 * iRef.current, ntRef.current) * 100
        ctx.current.lineTo(xRef.current, y + hRef.current * 0.5)
      }
      ctx.current.stroke()
      ctx.current.closePath()
    }
  }, [getSpeed, noise, waveColors, waveWidth])

  const render = React.useCallback(() => {
    if (!ctx.current) return
    ctx.current.fillStyle = backgroundFill || "black"
    ctx.current.globalAlpha = waveOpacity || 0.5
    ctx.current.fillRect(0, 0, wRef.current, hRef.current)
    drawWave(5)
    animationIdRef.current = requestAnimationFrame(render)
  }, [backgroundFill, waveOpacity, drawWave])

  const init = React.useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    ctx.current = canvas.getContext("2d")
    if (!ctx.current) return
    
    wRef.current = ctx.current.canvas.width = window.innerWidth
    hRef.current = ctx.current.canvas.height = window.innerHeight
    ctx.current.filter = `blur(${blur}px)`
    ntRef.current = 0
    
    window.onresize = () => {
      if (!ctx.current) return
      wRef.current = ctx.current.canvas.width = window.innerWidth
      hRef.current = ctx.current.canvas.height = window.innerHeight
      ctx.current.filter = `blur(${blur}px)`
    }
    render()
  }, [blur, render])

  useEffect(() => {
    init()
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [init])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    )
  }, [])

  return (
    <div className={cn("h-screen flex flex-col items-center justify-center overflow-hidden", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0 overflow-hidden"
        ref={canvasRef}
        id="canvas"
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  )
}

