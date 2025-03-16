"use client";

import PackageBuilder from "@/components/sales/package-builder-admin";

interface BuildPackageAdminProps {
  customPrices: Record<string, Record<string, number>> | null;
}

export default function BuildPackageAdmin({
  customPrices,
}: BuildPackageAdminProps) {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-amber-700">
          Custom HVAC Package Builder
        </h1>
        <div className="w-24 h-1 mx-auto bg-amber-500 rounded-full mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg">
          Manage and update pricing for custom HVAC package components
        </p>
      </div>

      <PackageBuilder customPrices={customPrices} />
    </div>
  );
}
