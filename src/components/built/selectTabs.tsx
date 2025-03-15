"use client"

import { useState } from "react"
import { Tabs } from "../ui/tabs"
import CardHoverEffectDemo from "./tabsContent"
import SelectionForm from "./form-demo"

const heatPumpData = [
  {
    id: "2 Ton (14 SEER)",
    title: "2 Ton (14 SEER)",
    description: "Energy-efficient heating and cooling solution with SEER ratings up to 20.",
    link: "",
  },
  {
    id: "3 Ton (16 SEER)",
    title: "3 Ton (16 SEER)",
    description: "Combines electric heat pump with gas furnace backup for optimal efficiency in extreme temperatures.",
    link: "",
  },
  {
    id: "4 Ton (20 SEER)",
    title: "4 Ton (20 SEER)",
    description: "Perfect for homes without ductwork, providing zoned comfort with minimal installation.",
    link: "",
  },
  {
    id: "5 Ton (20 SEER)",
    title: "5 Ton (20 SEER)",
    description: "Uses earth's constant underground temperature for ultra-efficient heating and cooling.",
    link: "",
  },
  {
    id: "6 Ton (20 SEER)",
    title: "6 Ton (20 SEER)",
    description: "Uses earth's constant underground temperature for ultra-efficient heating and cooling.",
    link: "",
  },
  {
    id: "7 Ton (20 SEER)",
    title: "7 Ton (20 SEER)",
    description: "Uses earth's constant underground temperature for ultra-efficient heating and cooling.",
    link: "",
  },
]

const furnaceData = [
  {
    id: "60,000 BTU",
    title: "60,000 BTU",
    description: "High-efficiency gas heating with AFUE ratings up to 98% for maximum energy savings.",
    link: "",
  },
  {
    id: "80,000 BTU",
    title: "80,000 BTU",
    description: "Reliable heating solution for homes without access to natural gas lines.",
    link: "",
  },
  {
    id: "100,000 BTU",
    title: "100,000 BTU",
    description: "Clean, flame-free heating option with 100% efficiency at the unit.",
    link: "",
  },
  {
    id: "120,000 BTU Dual-Stage",
    title: "120,000 BTU Dual-Stage",
    description: "Precisely adjusts heat output for consistent comfort and maximum efficiency.",
    link: "",
  },
  {
    id: "140,000 BTU Variable-Speed",
    title: "140,000 BTU Variable-Speed",
    description: "Precisely adjusts heat output for consistent comfort and maximum efficiency.",
    link: "",
  },
  {
    id: "160,000 BTU Modulating",
    title: "160,000 BTU Modulating",
    description: "Precisely adjusts heat output for consistent comfort and maximum efficiency.",
    link: "",
  },
]

const thermostatData = [
  {
    id: "Basic",
    title: "Basic",
    description: "Wi-Fi enabled with learning capabilities to optimize your comfort and energy usage.",
    link: "",
  },
  {
    id: "Smart",
    title: "Smart",
    description: "Set schedules for automatic temperature adjustments throughout the day.",
    link: "",
  },
  {
    id: "Smart with Zoning",
    title: "Smart with Zoning",
    description: "Control temperatures in different areas of your home independently for personalized comfort.",
    link: "",
  },
  {
    id: "Smart with Multi-Zone Control",
    title: "Smart with Multi-Zone Control",
    description: "Easy installation with no wiring required, perfect for retrofits.",
    link: "",
  },
  {
    id: "Premium Smart with Home Integration",
    title: "Premium Smart with Home Integration",
    description: "Easy installation with no wiring required, perfect for retrofits.",
    link: "",
  },
]

const humidifierData = [
  {
    id: "Basic",
    title: "Basic",
    description: "Integrated with your HVAC system to maintain optimal humidity throughout your entire home.",
    link: "",
  },
  {
    id: "Flow-Through",
    title: "Flow-Through",
    description: "Provides precise humidity control regardless of water quality or temperature.",
    link: "",
  },
  {
    id: "Steam",
    title: "Steam",
    description: "Cost-effective solution that uses your furnace's heat to evaporate water.",
    link: "",
  },
  {
    id: "Whole-Home",
    title: "Whole-Home",
    description: "Delivers consistent humidity even when your heating system isn't running.",
    link: "",
  },
  {
    id: "Whole-Home Steam Humidification System",
    title: "Whole-Home Steam Humidification System",
    description: "Delivers consistent humidity even when your heating system isn't running.",
    link: "",
  },
  {
    id: "Advanced Humidity Control System",
    title: "Advanced Humidity Control System",
    description: "Delivers consistent humidity even when your heating system isn't running.",
    link: "",
  },
]

const airCleanerData = [
  {
    id: "Standard Air Filter",
    title: "Standard Air Filter",
    description: "Removes up to 99.97% of airborne particles as small as 0.3 microns.",
    link: "",
  },
  {
    id: "HEPA Air Cleaner",
    title: "HEPA Air Cleaner",
    description: "Uses ultraviolet light to neutralize bacteria, viruses, and mold in your air.",
    link: "",
  },
  {
    id: "Electronic Air Cleaner",
    title: "Electronic Air Cleaner",
    description: "Charges particles so they stick to collection plates, removing them from circulation.",
    link: "",
  },
  {
    id: "Advanced Electronic Air Purifier",
    title: "Advanced Electronic Air Purifier",
    description: "Uses dense filter material to trap particles throughout your home.",
    link: "",
  },
  {
    id: "Hospital-Grade Air Filtration",
    title: "Hospital-Grade Air Filtration",
    description: "Uses dense filter material to trap particles throughout your home.",
    link: "",
  },
  {
    id: "Medical-Grade Air Purification",
    title: "Medical-Grade Air Purification",
    description: "Uses dense filter material to trap particles throughout your home.",
    link: "",
  },
]

const warrantyData = [
  {
    id: "5 Years",
    title: "5 Years",
    description: "Comprehensive coverage beyond the standard warranty period for peace of mind.",
    link: "",
  },
  {
    id: "7 Years",
    title: "7 Years",
    description: "Coverage for replacement parts on all major components of your HVAC system.",
    link: "",
  },
  {
    id: "10 Years",
    title: "10 Years",
    description: "Covers the cost of professional service and installation for warranty repairs.",
    link: "",
  },
  {
    id: "12 Years",
    title: "12 Years",
    description: "Regular service visits to keep your system running efficiently and prevent breakdowns.",
    link: "",
  },
  {
    id: "15 Years",
    title: "15 Years",
    description: "Regular service visits to keep your system running efficiently and prevent breakdowns.",
    link: "",
  },
  {
    id: "Lifetime",
    title: "Lifetime",
    description: "Regular service visits to keep your system running efficiently and prevent breakdowns.",
    link: "",
  },
]

// Create a mapping of all items for easy lookup
const allItemsMap = {
  ...Object.fromEntries(heatPumpData.map((item) => [item.id, { ...item, category: "Heat Pump" }])),
  ...Object.fromEntries(furnaceData.map((item) => [item.id, { ...item, category: "Furnace" }])),
  ...Object.fromEntries(thermostatData.map((item) => [item.id, { ...item, category: "Thermostat" }])),
  ...Object.fromEntries(humidifierData.map((item) => [item.id, { ...item, category: "Humidifier" }])),
  ...Object.fromEntries(airCleanerData.map((item) => [item.id, { ...item, category: "Air Cleaner" }])),
  ...Object.fromEntries(warrantyData.map((item) => [item.id, { ...item, category: "Warranty" }])),
}

interface TabItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
}

export default function TabsDemo() {
  // State to track selected items across all tabs
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showForm, setShowForm] = useState(false)

  // Handle item selection
  const handleSelectItem = (item: TabItem) => {
    setSelectedItems((prev) => {
      // If already selected, remove it
      if (prev.includes(item.id)) {
        return prev.filter((id) => id !== item.id)
      }
      // Otherwise add it
      return [...prev, item.id]
    })
  }

  // Get selected items data for the form
  const getSelectedItemsData = () => {
    return selectedItems.map((id) => allItemsMap[id])
  }

  const tabs = [
    {
      title: "Heat Pump",
      value: "Heat Pump",
      content: (
        <div className="w-full overflow-visible relative rounded-2xl p-8 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-blue-500 to-violet-900">
          <p className="m">Heat Pump</p>
          <CardHoverEffectDemo
            items={heatPumpData}
            onSelect={handleSelectItem}
            selectedItems={selectedItems}
          />
        </div>
      ),
    },
    {
      title: "Furnace",
      value: "Furnace",
      content: (
        <div className="w-full overflow-visible relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-500 to-violet-900">
          <p>Furnace</p>
          <CardHoverEffectDemo
            items={furnaceData}
            onSelect={handleSelectItem}
            selectedItems={selectedItems}
          />
        </div>
      ),
    },
    {
      title: "Thermostat",
      value: "Thermostat",
      content: (
        <div className="w-full overflow-visible relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-500 to-green-500">
          <p>Thermostat</p>
          <CardHoverEffectDemo
            items={thermostatData}
            onSelect={handleSelectItem}
            selectedItems={selectedItems}
          />
        </div>
      ),
    },
    {
      title: "Humidifier",
      value: "Humidifier",
      content: (
        <div className="w-full overflow-visible relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-pink-500">
          <p>Humidifier</p>
          <CardHoverEffectDemo
            items={humidifierData}
            onSelect={handleSelectItem}
            selectedItems={selectedItems}
          />
        </div>
      ),
    },
    {
      title: "Air Cleaner",
      value: "Air Cleaner",
      content: (
        <div className="w-full overflow-visible relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Air Cleaner</p>
          <CardHoverEffectDemo
            items={airCleanerData}
            onSelect={handleSelectItem}
            selectedItems={selectedItems}
          />
        </div>
      ),
    },
    {
      title: "Warranty",
      value: "Warranty",
      content: (
        <div className="w-full overflow-visible relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Warranty</p>
          <CardHoverEffectDemo
            items={warrantyData}
            onSelect={handleSelectItem}
            selectedItems={selectedItems}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col p-4 items-center justify-start gap-8 min-h-screen bg-red-500">
      <p>title for edit section</p>
      <div className="relative min-h-[40rem] flex flex-col max-w-5xl mx-auto w-full items-start justify-start">
        <Tabs tabs={tabs} />
      </div>

      {/* Submit button */}
      <div className="w-full max-w-5xl mx-auto mb-20 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Selected Items: {selectedItems.length}</h3>
            <button
              onClick={() => setShowForm(true)}
              disabled={selectedItems.length === 0}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Request Quote for Selected Items
            </button>
          </div>

          {selectedItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {getSelectedItemsData().map((item) => (
                <div key={item.id} className="bg-gray-100 dark:bg-gray-700 p-2 rounded flex items-center">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                  </div>
                  <button
                    onClick={() => handleSelectItem(item)}
                    className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selection Form */}
      {showForm && <SelectionForm selectedItems={getSelectedItemsData()} onClose={() => setShowForm(false)} />}
    </div>
  )
}

