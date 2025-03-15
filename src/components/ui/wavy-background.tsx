"use client"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { createNoise3D } from "simplex-noise"

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
  const noise = createNoise3D()
  let w: number, h: number, nt: number, i: number, x: number
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001
      case "fast":
        return 0.002
      default:
        return 0.001
    }
  }

  const init = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    ctx.current = canvas.getContext("2d")
    if (!ctx.current) return
    
    w = ctx.current.canvas.width = window.innerWidth
    h = ctx.current.canvas.height = window.innerHeight
    ctx.current.filter = `blur(${blur}px)`
    nt = 0
    
    window.onresize = () => {
      if (!ctx.current) return
      w = ctx.current.canvas.width = window.innerWidth
      h = ctx.current.canvas.height = window.innerHeight
      ctx.current.filter = `blur(${blur}px)`
    }
    render()
  }

  const waveColors = colors ?? [
    "#0ea5e9", // Cooling - Sky Blue
    "#2563eb", // Cooling - Deep Blue
    "#f43f5e", // Heating - Warm Red
    "#f97316", // Heating - Orange
    "#fb923c", // Heating - Light Orange
  ]

  const drawWave = (n: number) => {
    if (!ctx.current) return
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.current.beginPath()
      ctx.current.lineWidth = waveWidth || 50
      ctx.current.strokeStyle = waveColors[i % waveColors.length]
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100
        ctx.current.lineTo(x, y + h * 0.5)
      }
      ctx.current.stroke()
      ctx.current.closePath()
    }
  }

  let animationId: number
  const render = () => {
    if (!ctx.current) return
    ctx.current.fillStyle = backgroundFill || "black"
    ctx.current.globalAlpha = waveOpacity || 0.5
    ctx.current.fillRect(0, 0, w, h)
    drawWave(5)
    animationId = requestAnimationFrame(render)
  }

  useEffect(() => {
    init()
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

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

