"use client";

import type React from "react";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CloseIcon } from "@/components/built/close-icon";
import UnifiedForm from "@/components/built/form-demo";
import SvgPackager from "@/components/built/SvgPackager";
// Define the Card type
interface Card {
  id: string;
  title: string;
  description: string;
  price: string;
  financing: string;
  sizes: string[];
  components: string[];
  src: string;
  svgPaths?: string[];
  renderImage: () => React.ReactNode;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
}

// Original card data
const originalCards: Card[] = [
  {
    id: "essential-comfort",
    title: "Essential Comfort Bundle",
    description: "5 Year Warranty",
    price: "3,499",
    financing: "Financing available at $99/month",
    sizes: ["Small", "Medium", "Large"],
    components: ["Thermostat", "Air Handler", "Compressor"],
    src: "/photo_2025-03-03_17-16-43.jpg",
    svgPaths: [
      "/sensor-fire-svgrepo-com.svg",
      "/temperature-svgrepo-com.svg",
      "/leaf-svgrepo-com (1).svg",
    ],
    renderImage: function () {
      return <SvgPackager svgPaths={this.svgPaths} src={this.src} />;
    },
    ctaText: "Visit",
    ctaLink: "#",
    content: () => (
      <p>
        High-efficiency heating and cooling system designed for comfort and
        energy savings.
      </p>
    ),
  },
  {
    id: "premium-comfort",
    title: "Premium Comfort Bundle",
    description: "7 Year Warranty",
    price: "4,999",
    financing: "Financing available at $129/month",
    sizes: ["Medium", "Large", "Extra Large"],
    components: [
      "Smart Thermostat",
      "Multi-Stage Compressor",
      "High-Efficiency Filter",
    ],
    src: "/photo_2025-03-03_17-17-03.jpg",
    svgPaths: [
      "/air-conditioner-heater-svgrepo-com.svg",
      "/air-svgrepo-com.svg",
      "/air-filter-svgrepo-com.svg",
    ],
    renderImage: function () {
      return <SvgPackager svgPaths={this.svgPaths} src={this.src} />;
    },
    ctaText: "Visit",
    ctaLink: "#",
    content: () => (
      <p>
        Advanced climate control system with superior air purification
        technology.
      </p>
    ),
  },
  {
    id: "eco-friendly",
    title: "Eco-Friendly Heat Pump",
    description: "Energy Star Certified",
    price: "5,299",
    financing: "Financing available at $149/month",
    sizes: ["Small", "Medium", "Large"],
    components: ["Heat Pump", "Variable Speed Fan", "Smart Sensor"],
    src: "/photo_2025-03-03_17-16-37.jpg",
    svgPaths: [
      "/thermometer-svgrepo-com.svg",
      "/airconditioning-o-svgrepo-com.svg",
      "/filters-svgrepo-com.svg",
    ],
    renderImage: function () {
      return <SvgPackager svgPaths={this.svgPaths} src={this.src} />;
    },
    ctaText: "Visit",
    ctaLink: "#",
    content: () => (
      <p>
        A high-performance heat pump system for reduced energy bills and
        sustainability.
      </p>
    ),
  },
  {
    id: "ultimate-climate",
    title: "Ultimate Climate Control",
    description: "10 Year Warranty",
    price: "7,999",
    financing: "Financing available at $199/month",
    sizes: ["Medium", "Large", "Extra Large"],
    components: ["AI Thermostat", "Zoning System", "Air Purifier"],
    src: "/photo_2025-03-03_17-16-47.jpg",
    svgPaths: ["/thermostat-svgrepo-com.svg", "/Furnace.svg", "/Humid.svg"],
    renderImage: function () {
      return <SvgPackager svgPaths={this.svgPaths} src={this.src} />;
    },
    ctaText: "Visit",
    ctaLink: "#",
    content: () => (
      <p>
        Smart AI-powered system that optimizes heating and cooling for ultimate
        comfort.
      </p>
    ),
  },
  {
    id: "budget-friendly",
    title: "Budget-Friendly HVAC",
    description: "3 Year Warranty",
    price: "2,499",
    financing: "Financing available at $79/month",
    sizes: ["Small", "Medium"],
    components: [
      "Basic Thermostat",
      "Single-Stage Compressor",
      "Standard Air Filter",
    ],
    src: "/MicrosoftTeams-image-17.webp",
    svgPaths: [
      "/air-conditioner-outdoor-svgrepo-com.svg",
      "/circle-heat-svgrepo-com.svg",
      "/Home Automation & Extras (1).svg",
    ],
    renderImage: function () {
      return <SvgPackager svgPaths={this.svgPaths} src={this.src} />;
    },
    ctaText: "Visit",
    ctaLink: "#",
    content: () => (
      <p>
        Affordable and reliable heating and cooling system for budget-conscious
        homeowners.
      </p>
    ),
  },
  {
    id: "luxury-home",
    title: "Luxury Home Comfort",
    description: "Lifetime Warranty",
    price: "12,999",
    financing: "Financing available at $299/month",
    sizes: ["Large", "Extra Large"],
    components: [
      "Smart AI Thermostat",
      "Ultra-Quiet Compressor",
      "UV Air Purifier",
    ],
    src: "/61VFBkYfiJL.jpg",
    svgPaths: [
      "/sound-0-svgrepo-com.svg",
      "/heating-svgrepo-com.svg",
      "Home Automation & Extras (1).svg",
    ],
    renderImage: function () {
      return <SvgPackager svgPaths={this.svgPaths} src={this.src} />;
    },
    ctaText: "Visit",
    ctaLink: "#",
    content: () => (
      <p>
        Top-of-the-line climate control for unmatched luxury and energy
        efficiency.
      </p>
    ),
  },
];

interface ExpandableCardDemoProps {
  customPrices: Record<string, number> | null;
}

export default function ExpandableCardDemo({
  customPrices,
}: ExpandableCardDemoProps) {
  const [active, setActive] = useState<Card | boolean | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {}
  );
  const [cards, setCards] = useState<Card[]>(originalCards);
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);

  // Apply custom prices if available
  useEffect(() => {
    if (customPrices) {
      const updatedCards = originalCards.map((card) => {
        if (customPrices[card.id]) {
          return {
            ...card,
            price: customPrices[card.id].toLocaleString(),
            financing: `Financing available at $${Math.round(
              customPrices[card.id] / 36
            )}/month`,
          };
        }
        return card;
      });
      setCards(updatedCards);
    }
  }, [customPrices]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (showForm) {
          setShowForm(false);
        } else {
          setActive(false);
        }
      }
    }

    if ((active && typeof active === "object") || showForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, showForm]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => {
    if (!showForm) {
      setActive(null);
    }
  });

  const openForm = (card: Card) => {
    setSelectedPackageId(card.id);
    setShowForm(true);
    setActive(null); // Close the expanded card
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPackageId(null);
  };

  return (
    <div>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 lg:hidden bg-white rounded-full h-6 w-6 flex items-center justify-center"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                {active.renderImage()}
              </motion.div>
              <div className="p-4 overflow-auto max-h-[300px]">
                <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">
                  {active.title}
                </h3>
                <p className="text-green-500 text-lg font-bold">
                  ${active.price}
                </p>
                <p className="text-sm text-gray-500">{active.financing}</p>
                <div className="mt-3">
                  <h4 className="font-medium">Select Size:</h4>
                  <select
                    className="mt-1 p-2 border rounded-md w-full"
                    value={selectedSizes[active.id] || active.sizes[0]}
                    onChange={(e) => {
                      setSelectedSizes((prev) => ({
                        ...prev,
                        [active.id]: e.target.value,
                      }));
                    }}
                  >
                    {active.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-3">
                  <h4 className="font-medium">System Components:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                    {active.components.map((component, index) => (
                      <li key={index}>{component}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 px-4 pb-10 overflow-auto max-h-[200px] text-sm text-neutral-600 dark:text-neutral-400">
                {typeof active.content === "function"
                  ? active.content()
                  : active.content}
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => openForm(active)}
                  className="w-full px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Request Quote for{" "}
                  {selectedSizes[active.id] || active.sizes[0]} Size
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {showForm && selectedPackageId && (
        <UnifiedForm
          packageData={cards.find((card) => card.id === selectedPackageId)}
          selectedSize={
            selectedSizes[selectedPackageId] ||
            cards.find((card) => card.id === selectedPackageId)?.sizes[0]
          }
          onClose={closeForm}
          formType="package"
        />
      )}

      <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-start gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col bg-hesam-back hover:border-b-amber-200 dark:hover:bg-neutral-800 rounded-xl border-transparent cursor-pointer"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                {card.renderImage()}
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
                <p className="text-green-600 font-bold mt-2">${card.price}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </div>
  );
}
