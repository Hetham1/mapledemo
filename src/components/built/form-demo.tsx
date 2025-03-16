"use client";

import type React from "react";
import { useState } from "react";
import { CloseIcon } from "./close-icon";
import Image from "next/image";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  installationDate: string;
  additionalNotes: string;
  selectedSize?: string;
};

interface FormProps {
  selectedItems?: {
    id: string;
    title: string;
    description?: string;
    price?: string | number;
    category?: string;
  }[];
  packageData?: {
    id: string;
    title: string;
    description: string;
    price: string | number;
    financing?: string;
    sizes?: string[];
    components?: string[];
    src?: string;
    category?: string;
    image?: string;
  };
  selectedSize?: string;
  onClose: () => void;
  formType: "package" | "custom";
}

export default function UnifiedForm({
  selectedItems = [],
  packageData,
  selectedSize,
  onClose,
  formType,
}: FormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    installationDate: "",
    additionalNotes: "",
    selectedSize: selectedSize || packageData?.sizes?.[0] || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Calculate estimated total
      const estimatedTotal =
        formType === "package"
          ? typeof packageData?.price === "string"
            ? Number.parseFloat(packageData.price.replace(/,/g, ""))
            : packageData?.price || 0
          : selectedItems.reduce((total, item) => {
              const itemPrice =
                typeof item.price === "string"
                  ? Number.parseFloat(item.price.replace(/,/g, ""))
                  : item.price || 0;
              return total + itemPrice;
            }, 0);

      // Type the request data
      interface EmailRequestData {
        formType: "package" | "custom";
        packageData: typeof packageData | null;
        selectedItems: typeof selectedItems;
        formData: typeof formData;
        estimatedTotal: number;
      }

      // Prepare data to send
      const dataToSend: EmailRequestData = {
        formType,
        packageData: formType === "package" ? packageData : null,
        selectedItems: formType === "custom" ? selectedItems : [],
        formData,
        estimatedTotal,
      };

      // Send the data to our API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      interface ApiResponse {
        success: boolean;
        id?: string;
        error?: string;
      }

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send email");
      }

      // Show success message
      alert(
        "Your quote request has been submitted successfully and sent via email!"
      );
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate estimated total
  const estimatedTotal =
    formType === "package"
      ? typeof packageData?.price === "string"
        ? Number.parseFloat(packageData.price.replace(/,/g, ""))
        : packageData?.price || 0
      : selectedItems.reduce((total, item) => {
          const itemPrice =
            typeof item.price === "string"
              ? Number.parseFloat(item.price.replace(/,/g, ""))
              : item.price || 0;
          return total + itemPrice;
        }, 0);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[800px] bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b bg-amber-700 text-white">
          <h2 className="text-xl font-semibold">
            {formType === "package"
              ? `Request Quote for ${packageData?.title}`
              : "Request Quote for Selected Items"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Package or Selected Items Summary */}
        <div className="p-4 bg-gray-50 dark:bg-neutral-800 max-h-[300px] overflow-auto">
          {formType === "package" && packageData ? (
            <div className="p-2 bg-white dark:bg-neutral-800">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                <div>
                  <h3 className="text-lg font-medium">{packageData.title}</h3>
                  <p className="text-green-600 font-bold text-xl">
                    $
                    {typeof packageData.price === "string"
                      ? packageData.price
                      : packageData.price?.toLocaleString()}
                  </p>
                  {packageData.financing && (
                    <div>
                      <span className="text-xs text-gray-500 font-semibold">
                        Financing available at{" "}
                      </span>
                      <span className="text-xs text-gray-700 font-bold">
                        {packageData.financing}
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {packageData.description}
                  </p>
                  {formData.selectedSize && (
                    <p className="text-xs font-medium mt-1">
                      Selected Size:{" "}
                      <span className="text-amber-600">
                        {formData.selectedSize}
                      </span>
                    </p>
                  )}
                </div>
                <div className="mt-1 md:mt-0">
                  <Image
                    src={
                      packageData.src ||
                      packageData.image ||
                      "/placeholder.svg?height=80&width=80"
                    }
                    alt={packageData.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover h-16 w-16"
                  />
                </div>
              </div>

              {packageData.components && (
                <div className="mt-1">
                  <h4 className="font-medium text-xs">Components:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300">
                    {packageData.components.map((component, index) => (
                      <li key={index}>{component}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <h3 className="text-lg font-medium mb-3 text-amber-600">
                Selected Items ({selectedItems.length})
              </h3>

              <div className="space-y-3">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-white dark:bg-neutral-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-medium text-amber-600">
                        {item.title}
                      </h4>
                      <p className="text-xs text-cyan-600 font-medium">
                        {item.category}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">
                        ${item.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <p className="font-medium flex justify-between">
                  <span>Estimated Total:</span>
                  <span className="text-emerald-600 font-bold">
                    ${estimatedTotal.toLocaleString()}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Final pricing will be determined after consultation
                </p>
              </div>
            </>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 overflow-auto max-h-[60vh]"
        >
          {/* Size selection for package form */}
          {formType === "package" &&
            packageData?.sizes &&
            packageData.sizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-amber-600 mb-1">
                  Select Size:
                </label>
                <select
                  name="selectedSize"
                  value={formData.selectedSize}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-all"
                >
                  {packageData.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-600">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-600">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-600">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-amber-600">
                Preferred Installation Date
              </label>
              <input
                type="date"
                name="installationDate"
                value={formData.installationDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium text-amber-600">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-amber-300 focus:border-amber-500 transition-all"
            ></textarea>
          </div>

          {submitError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
              <p className="text-sm">{submitError}</p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-amber-600 text-white rounded-md transition-all shadow-md ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-amber-700 hover:shadow-lg"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
