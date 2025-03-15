"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

interface CardItem {
  title: string;
  description: string;
  link: string;
  id?: string;
}

export const HoverEffect = ({
  items,
  className,
  onSelect,
  selectedItems,
  tabName,
}: {
  items: CardItem[]
  className?: string
  onSelect?: (item: CardItem) => void
  selectedItems?: string[]
  tabName: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Generate an id if not provided
  const itemsWithIds = items.map((item, index) => ({
    ...item,
    id: item.id || `${tabName}-item-${index}`,
  }))

  const handleCardClick = (e: React.MouseEvent, item: CardItem) => {
    e.preventDefault() // Prevent the link from navigating
    if (onSelect) {
      onSelect(item)
    }
  }

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full auto-rows-fr", className)}>
      {itemsWithIds.map((item, idx) => {
        const isSelected = selectedItems?.includes(item.id)

        return (
          <div
            key={item.id}
            className="relative group block p-2 w-full h-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={(e) => handleCardClick(e, item)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 w-full h-full bg-red-500 dark:bg-slate-800/[0.8] block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.95 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card isSelected={isSelected}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export const Card = ({
  className,
  children,
  isSelected,
}: {
  className?: string
  children: React.ReactNode
  isSelected?: boolean
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl w-full h-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 cursor-pointer flex flex-col",
        isSelected && "border-red-500 dark:border-red-500",
        className,
      )}
    >
      <div className="relative z-50 flex-1">
        <div className="p-2 sm:p-4 flex flex-row sm:flex-col">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>{children}</h4>
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm flex-1", className)}>{children}</p>
}

