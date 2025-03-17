"use client";

import { useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  PackageCheck,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import UnifiedForm from "./form-demo";
import {
  heatPumpData,
  furnaceData,
  thermostatData,
  humidifierData,
  airCleanerData,
  warrantyData,
} from "@/lib/hvac-data";

// Define proper interfaces for the data structure
interface Option {
  id: string;
  title: string;
  description: string;
  price: number;
  features?: string[];
  sizes?: string[];
  efficiency?: string;
  type?: string;
  image?: string;
}

interface Selection {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

// Define the categories with colors
const packageCategories = [
  {
    id: "heat-pump",
    name: "Heat Pump",
    description: "Choose the right size and efficiency for your home",
    options: heatPumpData,
    color: "blue",
  },
  {
    id: "furnace",
    name: "Furnace",
    description: "Select the appropriate BTU output for your space",
    options: furnaceData,
    color: "cyan",
  },
  {
    id: "thermostat",
    name: "Thermostat",
    description: "Control your system with the right thermostat",
    options: thermostatData,
    color: "violet",
  },
  {
    id: "humidifier",
    name: "Humidifier",
    description: "Maintain optimal humidity levels in your home",
    options: humidifierData,
    color: "emerald",
  },
  {
    id: "air-cleaner",
    name: "Air Cleaner",
    description: "Improve your indoor air quality",
    options: airCleanerData,
    color: "orange",
  },
  {
    id: "warranty",
    name: "Warranty & Service",
    description: "Protect your investment",
    options: warrantyData,
    color: "yellow",
  },
];

// Helper function to get color classes
function getColorClasses(color: string) {
  const colorMap: Record<
    string,
    { text: string; bg: string; bgLight: string; border: string; hover: string }
  > = {
    red: {
      text: "text-red-700",
      bg: "bg-red-700",
      bgLight: "bg-red-100",
      border: "border-red-700",
      hover: "hover:bg-red-800",
    },
    crimson: {
      text: "text-rose-800",
      bg: "bg-rose-800",
      bgLight: "bg-rose-100",
      border: "border-rose-800",
      hover: "hover:bg-rose-900",
    },
    maroon: {
      text: "text-red-900",
      bg: "bg-red-900",
      bgLight: "bg-red-100",
      border: "border-red-900",
      hover: "hover:bg-red-950",
    },
    orange: {
      text: "text-orange-700",
      bg: "bg-orange-700",
      bgLight: "bg-orange-100",
      border: "border-orange-700",
      hover: "hover:bg-orange-800",
    },
    amber: {
      text: "text-amber-700",
      bg: "bg-amber-700",
      bgLight: "bg-amber-100",
      border: "border-amber-700",
      hover: "hover:bg-amber-800",
    },
    bronze: {
      text: "text-yellow-800",
      bg: "bg-yellow-800",
      bgLight: "bg-yellow-100",
      border: "border-yellow-800",
      hover: "hover:bg-yellow-900",
    },
    brown: {
      text: "text-amber-900",
      bg: "bg-amber-900",
      bgLight: "bg-amber-100",
      border: "border-amber-900",
      hover: "hover:bg-amber-950",
    },
    gold: {
      text: "text-yellow-700",
      bg: "bg-yellow-700",
      bgLight: "bg-yellow-100",
      border: "border-yellow-700",
      hover: "hover:bg-yellow-800",
    },
    rust: {
      text: "text-orange-800",
      bg: "bg-orange-800",
      bgLight: "bg-orange-100",
      border: "border-orange-800",
      hover: "hover:bg-orange-900",
    },
    sienna: {
      text: "text-orange-900",
      bg: "bg-orange-900",
      bgLight: "bg-orange-100",
      border: "border-orange-900",
      hover: "hover:bg-orange-950",
    },
  };

  return colorMap[color] || colorMap.amber;
}

export default function PackageBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, Selection>>({});
  const [showSummary, setShowSummary] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const isLastStep = currentStep === packageCategories.length - 1;
  const currentCategory = packageCategories[currentStep];
  const currentColorClasses = getColorClasses(currentCategory.color);

  const handleSelect = (option: Option) => {
    setSelections({
      ...selections,
      [currentCategory.id]: {
        id: option.id,
        title: option.title,
        description: option.description,
        price: option.price,
        category: currentCategory.id,
        image: option.image,
      },
    });
  };

  const handleNext = () => {
    if (isLastStep) {
      setShowSummary(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setSelections({});
    setCurrentStep(0);
    setShowSummary(false);
  };

  const calculateTotal = () => {
    return Object.values(selections).reduce(
      (total: number, item: Selection) => total + (item.price || 0),
      0
    );
  };

  const isOptionSelected = (option: Option) => {
    return selections[currentCategory?.id]?.id === option.id;
  };

  const isStepComplete = () => {
    return selections[currentCategory?.id] !== undefined;
  };

  const getSelectedItemsArray = () => {
    return Object.values(selections);
  };

  if (showForm) {
    return (
      <UnifiedForm
        selectedItems={getSelectedItemsArray()}
        onClose={() => setShowForm(false)}
        formType="custom"
      />
    );
  }

  if (showSummary) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-amber-700 text-white rounded-t-lg p-4">
            <div className="flex items-center gap-2">
              <PackageCheck className="h-7 w-7" />
              <h2 className="text-2xl font-bold">Your Custom HVAC Package</h2>
            </div>
            <p className="mt-1 opacity-80">
              Review your selections and submit to request a quote
            </p>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6">
              {packageCategories.map((category) => {
                const selection = selections[category.id];
                const colorClasses = getColorClasses(category.color);
                return (
                  <div
                    key={category.id}
                    className="rounded-lg bg-white p-4 shadow-sm"
                  >
                    <h3 className={`font-medium ${colorClasses.text} mb-2`}>
                      {category.name}
                    </h3>
                    {selection ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-16 w-16 relative rounded-lg overflow-hidden border shadow-sm">
                            <Image
                              src={
                                selection.image ||
                                "/placeholder.svg?height=64&width=64"
                              }
                              alt={selection.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">
                              {selection.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {selection.description}
                            </p>
                          </div>
                        </div>
                        <p className={`font-bold text-lg ${colorClasses.text}`}>
                          ${selection.price?.toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No selection made</p>
                    )}
                  </div>
                );
              })}

              <div className="flex justify-between items-center pt-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-xl font-bold text-black">
                    Total Package Price
                  </h3>
                  <p className="text-sm text-gray-500">Installation included</p>
                </div>
                <div className="flex flex-col justify-end items-end text-right">
                  <p className="text-2xl font-extrabold text-black">
                    ${calculateTotal().toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    Financing available at{" "}
                    <span className="text-gray-900 font-bold">
                      ${Math.round(calculateTotal() / 36)}/month
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 p-6 bg-white">
            <Button
              variant="outline"
              className="w-full sm:w-auto text-red-900 hover:bg-orange-300 bg-orange-200 transition-all duration-300"
              onClick={handleReset}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
            <Button
              className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 transition-all duration-300"
              onClick={() => setShowForm(true)}
            >
              Request Quote
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold">
          <span className={currentColorClasses.text}>
            Step {currentStep + 1}:
          </span>{" "}
          {currentCategory.name}
        </h2>
        <div className="flex items-center gap-1">
          {packageCategories.map((category, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep || selections[category.id];
            return (
              <div
                key={index}
                className={cn(
                  "h-2 w-10 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-amber-600"
                    : isCompleted
                    ? "bg-emerald-500"
                    : "bg-gray-200"
                )}
              />
            );
          })}
        </div>
      </div>

      <p className="text-gray-500 mb-8 text-center md:text-left">
        {currentCategory.description}
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {currentCategory.options.map((option) => {
          const isSelected = isOptionSelected(option);
          return (
            <Card
              key={option.id}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer",
                isSelected
                  ? `${currentColorClasses.bgLight} border-2 ${currentColorClasses.border} shadow-md`
                  : "bg-white hover:bg-gray-50"
              )}
              onClick={() => handleSelect(option)}
            >
              <CardHeader className="relative pb-2">
                {isSelected && (
                  <div
                    className={`absolute top-2 right-2 ${currentColorClasses.bg} text-white rounded-full p-1.5 shadow-md`}
                  >
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-2">
                <div className="relative h-32 w-32 transition-transform duration-300">
                  <Image
                    src={
                      option.image || "/placeholder.svg?height=128&width=128"
                    }
                    alt={option.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <p
                  className={`text-xl font-bold w-full text-center ${currentColorClasses.text}`}
                >
                  ${option.price?.toLocaleString()}
                </p>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className=" text-red-900 hover:bg-orange-400 bg-orange-300 transition-all duration-300"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {!isLastStep && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="text-gray-600 hover:bg-gray-100 border-gray-300"
            >
              Skip
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className={`${currentColorClasses.bg} ${currentColorClasses.hover} text-white transition-all duration-300`}
          >
            {isLastStep ? "Review Package" : "Next"}
            {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
