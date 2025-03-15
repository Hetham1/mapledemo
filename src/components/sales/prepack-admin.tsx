"use client"

import ExpandableCardDemo from "@/components/sales/expandable-card-demo-admin"

interface PrepackAdminProps {
  customPrices: Record<string, number> | null
}

export default function PrepackAdmin({ customPrices }: PrepackAdminProps) {
  return (
    <div className="min-h-screen w-full flex flex-col p-4 justify-center bg-hesam-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Pre-Packaged HVAC Solutions</h1>
        <div className="w-24 h-1 mx-auto bg-blue-600 rounded-full mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg">
          Manage and update pricing for pre-packaged HVAC solutions
        </p>
      </div>
      <ExpandableCardDemo customPrices={customPrices} />
    </div>
  )
}

