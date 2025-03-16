"use client";

import { useState, useEffect } from "react";
import Waves from "@/components/built/landing2";
import Prepack from "@/components/sales/prepack-admin";
import BuildPackageSection from "@/components/sales/edit-admin";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import PriceEditorModal from "@/components/sales/price-editor-modal";
import { cn } from "@/lib/utils";

export default function SalesPanel() {
  const [showPriceEditor, setShowPriceEditor] = useState(false);
  const [showButtons, setShowButtons] = useState<boolean>(true);
  const [editorMode, setEditorMode] = useState<"prepackaged" | "components">(
    "prepackaged"
  );
  const [prepackagedPrices, setPrepackagedPrices] = useState<
    Record<string, number>
  >({});
  const [componentPrices, setComponentPrices] = useState<
    Record<string, Record<string, number>>
  >({});

  // Load saved prices on mount
  useEffect(() => {
    const savedPrepackagedPrices = localStorage.getItem("prepackagedPrices");
    if (savedPrepackagedPrices) {
      setPrepackagedPrices(JSON.parse(savedPrepackagedPrices));
    }

    const savedComponentPrices = localStorage.getItem("componentPrices");
    if (savedComponentPrices) {
      setComponentPrices(JSON.parse(savedComponentPrices));
    }
  }, []);

  const openPrepackagedEditor = () => {
    setEditorMode("prepackaged");
    setShowPriceEditor(true);
  };

  const openComponentsEditor = () => {
    setEditorMode("components");
    setShowPriceEditor(true);
  };

  const handlePriceUpdate = (
    newPrepackagedPrices: Record<string, number>,
    newComponentPrices: Record<string, Record<string, number>>
  ) => {
    setPrepackagedPrices(newPrepackagedPrices);
    setComponentPrices(newComponentPrices);
  };
  const hideButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Admin Controls */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2">
        <Button
          onClick={openPrepackagedEditor}
          className={cn(
            "bg-amber-600 hover:bg-amber-700 flex items-center gap-2",
            showButtons ? "" : "hidden"
          )}
        >
          <Settings size={16} />
          Edit Pre-packaged Prices
        </Button>
        <Button
          onClick={openComponentsEditor}
          className={cn(
            "bg-green-600 hover:bg-green-700 flex items-center gap-2",
            showButtons ? "" : "hidden"
          )}
        >
          <Settings size={16} />
          Edit Component Prices
        </Button>
        <Button
          onClick={hideButtons}
          className={cn(
            "bg-slate-700 hover:bg-gray-800 flex items-center",
            showButtons ? "" : "hidden"
          )}
        >
          DONE (HIDE BUTTONS)
        </Button>
      </div>

      {/* Same layout as home page */}
      <Waves />
      <div className="pt-4 pb-8 bg-amber-50 text-center">
        <h1 className="text-3xl font-bold text-amber-800">
          Sales Administration Panel
        </h1>
        <p className="text-amber-600">Manage product pricing and packages</p>
      </div>
      <Prepack customPrices={prepackagedPrices} />
      <BuildPackageSection customPrices={componentPrices} />

      {/* Price Editor Modal */}
      {showPriceEditor && (
        <PriceEditorModal
          mode={editorMode}
          onClose={() => setShowPriceEditor(false)}
          initialPrepackagedPrices={prepackagedPrices}
          initialComponentPrices={componentPrices}
          onPriceUpdate={handlePriceUpdate}
        />
      )}
    </div>
  );
}
