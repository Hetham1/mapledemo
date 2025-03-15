"use client"

import { HoverEffect } from "../ui/card-hover-effect"

interface TabItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
  category?: string;
  link?: string;
}

// Update the component to accept items as a prop and selection handlers
export default function CardHoverEffectDemo({
  items,
  onSelect,
  selectedItems,
  tabName,
}: {
  items: TabItem[]
  onSelect?: (item: TabItem) => void
  selectedItems?: string[]
  tabName: string
}) {
  return (
    <div className="w-full mx-auto text-xl px-8 py-8">
      <HoverEffect items={items} onSelect={onSelect} selectedItems={selectedItems} tabName={tabName} />
    </div>
  )
}

