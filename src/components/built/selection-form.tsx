"use client";

import type React from "react";

import { useState } from "react";
import { CloseIcon } from "./close-icon";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  installationDate: string;
  additionalNotes: string;
}

interface SelectedItem {
  id: string;
  title: string;
  description?: string;
  price?: number;
  category?: string;
}

export default function SelectionForm({
  selectedItems,
  onClose,
}: {
  selectedItems: SelectedItem[];
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    installationDate: "",
    additionalNotes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", { selectedItems, ...formData });
    alert("Your quote request has been submitted successfully!");
    onClose();
  };

  // Calculate estimated total
  const estimatedTotal = selectedItems.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-[800px] bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-4 border-b bg-amber-600 text-white">
          <h2 className="text-xl font-semibold">
            Request Quote for Selected Items
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Selected Items Summary */}
        <div className="p-4 bg-gray-50 dark:bg-neutral-800 max-h-[300px] overflow-auto">
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
                  <h4 className="font-medium text-amber-600">{item.title}</h4>
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 overflow-auto max-h-[60vh]"
        >
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

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-all shadow-md hover:shadow-lg"
            >
              Submit Quote Request
            </button>
            <button
              type="button"
              onClick={onClose}
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
