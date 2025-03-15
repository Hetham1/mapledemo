"use client"

import { useState } from "react"
import { X, Save, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Import original data
import {
  heatPumpData,
  furnaceData,
  thermostatData,
  humidifierData,
  airCleanerData,
  warrantyData,
} from "@/lib/hvac-data"

// Original prepackaged data
const prepackagedData = [
  { id: "essential-comfort", title: "Essential Comfort Bundle", originalPrice: 3499 },
  { id: "premium-comfort", title: "Premium Comfort Bundle", originalPrice: 4999 },
  { id: "eco-friendly", title: "Eco-Friendly Heat Pump", originalPrice: 5299 },
  { id: "ultimate-climate", title: "Ultimate Climate Control", originalPrice: 7999 },
  { id: "budget-friendly", title: "Budget-Friendly HVAC", originalPrice: 2499 },
  { id: "luxury-home", title: "Luxury Home Comfort", originalPrice: 12999 },
]

interface PriceEditorModalProps {
  mode: "prepackaged" | "components"
  onClose: () => void
  initialPrepackagedPrices: Record<string, number>
  initialComponentPrices: Record<string, Record<string, number>>
  onPriceUpdate: (
    prepackagedPrices: Record<string, number>,
    componentPrices: Record<string, Record<string, number>>,
  ) => void
}

export default function PriceEditorModal({
  mode,
  onClose,
  initialPrepackagedPrices,
  initialComponentPrices,
  onPriceUpdate,
}: PriceEditorModalProps) {
  // State for prepackaged prices
  const [prepackagedPrices, setPrepackagedPrices] = useState<Record<string, number>>(initialPrepackagedPrices || {})

  // State for component prices
  const [componentPrices, setComponentPrices] = useState<Record<string, Record<string, number>>>(
    initialComponentPrices || {
      "heat-pump": {},
      furnace: {},
      thermostat: {},
      humidifier: {},
      "air-cleaner": {},
      warranty: {},
    },
  )

  const [activeTab, setActiveTab] = useState<string>(mode === "prepackaged" ? "prepackaged" : "heat-pump")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Handle price change for prepackaged items
  const handlePrepackagedPriceChange = (id: string, value: string) => {
    const numValue = Number.parseFloat(value.replace(/,/g, ""))
    if (!isNaN(numValue)) {
      setPrepackagedPrices((prev) => ({
        ...prev,
        [id]: numValue,
      }))
    }
  }

  // Handle price change for component items
  const handleComponentPriceChange = (categoryId: string, itemId: string, value: string) => {
    const numValue = Number.parseFloat(value.replace(/,/g, ""))
    if (!isNaN(numValue)) {
      setComponentPrices((prev) => ({
        ...prev,
        [categoryId]: {
          ...prev[categoryId],
          [itemId]: numValue,
        },
      }))
    }
  }

  // Save all prices
  const saveChanges = () => {
    // Save prepackaged prices
    localStorage.setItem("prepackagedPrices", JSON.stringify(prepackagedPrices))

    // Save component prices
    localStorage.setItem("componentPrices", JSON.stringify(componentPrices))

    // Update parent component with new prices
    onPriceUpdate(prepackagedPrices, componentPrices)

    // Show success message
    setSuccessMessage("Prices updated successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  // Reset to original prices
  const resetToOriginal = () => {
    if (mode === "prepackaged") {
      const emptyPrepackagedPrices = {}
      setPrepackagedPrices(emptyPrepackagedPrices)
      localStorage.removeItem("prepackagedPrices")
      onPriceUpdate(emptyPrepackagedPrices, componentPrices)
    } else {
      const emptyComponentPrices = {
        "heat-pump": {},
        furnace: {},
        thermostat: {},
        humidifier: {},
        "air-cleaner": {},
        warranty: {},
      }
      setComponentPrices(emptyComponentPrices)
      localStorage.removeItem("componentPrices")
      onPriceUpdate(prepackagedPrices, emptyComponentPrices)
    }
    setSuccessMessage("Prices reset to original values!")
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            {mode === "prepackaged" ? "Edit Pre-packaged Prices" : "Edit Component Prices"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Success message */}
        {successMessage && (
          <Alert className="m-4 bg-green-50 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Success</AlertTitle>
            <AlertDescription className="text-green-600">{successMessage}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 overflow-hidden">
          <div className="border-b px-4">
            <TabsList className="bg-transparent">
              {mode === "prepackaged" ? (
                <TabsTrigger value="prepackaged">Pre-packaged Options</TabsTrigger>
              ) : (
                <>
                  <TabsTrigger value="heat-pump">Heat Pumps</TabsTrigger>
                  <TabsTrigger value="furnace">Furnaces</TabsTrigger>
                  <TabsTrigger value="thermostat">Thermostats</TabsTrigger>
                  <TabsTrigger value="humidifier">Humidifiers</TabsTrigger>
                  <TabsTrigger value="air-cleaner">Air Cleaners</TabsTrigger>
                  <TabsTrigger value="warranty">Warranties</TabsTrigger>
                </>
              )}
            </TabsList>
          </div>

          <div className="overflow-y-auto p-4 flex-1">
            {/* Prepackaged Options Tab */}
            {mode === "prepackaged" && (
              <TabsContent value="prepackaged" className="mt-0">
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Update the prices for pre-packaged HVAC solutions. Leave blank to use the original price.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {prepackagedData.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-500">Original: ${item.originalPrice.toLocaleString()}</p>
                          <div className="flex-1">
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                              <Input
                                type="text"
                                className="pl-8"
                                placeholder={item.originalPrice.toLocaleString()}
                                value={prepackagedPrices[item.id]?.toLocaleString() || ""}
                                onChange={(e) => handlePrepackagedPriceChange(item.id, e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            )}

            {/* Component Tabs */}
            {mode === "components" && (
              <>
                <TabsContent value="heat-pump" className="mt-0">
                  <PriceEditorGrid
                    items={heatPumpData}
                    categoryId="heat-pump"
                    prices={componentPrices["heat-pump"] || {}}
                    onChange={handleComponentPriceChange}
                  />
                </TabsContent>
                <TabsContent value="furnace" className="mt-0">
                  <PriceEditorGrid
                    items={furnaceData}
                    categoryId="furnace"
                    prices={componentPrices["furnace"] || {}}
                    onChange={handleComponentPriceChange}
                  />
                </TabsContent>
                <TabsContent value="thermostat" className="mt-0">
                  <PriceEditorGrid
                    items={thermostatData}
                    categoryId="thermostat"
                    prices={componentPrices["thermostat"] || {}}
                    onChange={handleComponentPriceChange}
                  />
                </TabsContent>
                <TabsContent value="humidifier" className="mt-0">
                  <PriceEditorGrid
                    items={humidifierData}
                    categoryId="humidifier"
                    prices={componentPrices["humidifier"] || {}}
                    onChange={handleComponentPriceChange}
                  />
                </TabsContent>
                <TabsContent value="air-cleaner" className="mt-0">
                  <PriceEditorGrid
                    items={airCleanerData}
                    categoryId="air-cleaner"
                    prices={componentPrices["air-cleaner"] || {}}
                    onChange={handleComponentPriceChange}
                  />
                </TabsContent>
                <TabsContent value="warranty" className="mt-0">
                  <PriceEditorGrid
                    items={warrantyData}
                    categoryId="warranty"
                    prices={componentPrices["warranty"] || {}}
                    onChange={handleComponentPriceChange}
                  />
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>

        {/* Footer */}
        <div className="border-t p-4 flex justify-between">
          <Button variant="outline" onClick={resetToOriginal}>
            Reset to Original Prices
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for displaying a grid of price editors
interface PriceEditorGridProps {
  items: any[]
  categoryId: string
  prices: Record<string, number>
  onChange: (categoryId: string, itemId: string, value: string) => void
}

function PriceEditorGrid({ items, categoryId, prices, onChange }: PriceEditorGridProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Update the prices for {categoryId.replace("-", " ")} components. Leave blank to use the original price.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">{item.title}</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Original: ${item.price.toLocaleString()}</p>
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                  <Input
                    type="text"
                    className="pl-8"
                    placeholder={item.price.toLocaleString()}
                    value={prices?.[item.id]?.toLocaleString() || ""}
                    onChange={(e) => onChange(categoryId, item.id, e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

