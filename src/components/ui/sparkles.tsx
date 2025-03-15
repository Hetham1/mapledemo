"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  className,
  particleColor = "#fff",
}: SparklesCoreProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [particles, setParticles] = useState<Array<Particle>>([]);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    setContext(ctx);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const particleCount = Math.floor((canvas.width * canvas.height) / particleDensity);
    const initialParticles: Array<Particle> = [];

    for (let i = 0; i < particleCount; i++) {
      initialParticles.push(
        new Particle({
          context: ctx,
          width: canvas.width,
          height: canvas.height,
          minSize,
          maxSize,
          particleColor,
        })
      );
    }

    setParticles(initialParticles);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

  useEffect(() => {
    if (!context || particles.length === 0) return;

    const animate = () => {
      if (!canvasRef.current) return;

      context.fillStyle = background;
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      particles.forEach((particle) => particle.update());

      const frameId = requestAnimationFrame(animate);
      setAnimationFrameId(frameId);
    };

    animate();
  }, [context, particles, background]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
    />
  );
};

class Particle {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;

  constructor({
    context,
    width,
    height,
    minSize,
    maxSize,
    particleColor,
  }: {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    minSize: number;
    maxSize: number;
    particleColor: string;
  }) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * (maxSize - minSize) + minSize;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = particleColor;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = this.width;
    }

    if (this.y > this.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = this.height;
    }

    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();
  }
} 