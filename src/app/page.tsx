"use client";
import Prepack from "@/components/built/prepack";
import BuildPackageSection from "@/components/built/edit";
import Waves from "@/components/built/landing2";
// import TabsDemo from "@/components/built/selectTabs";

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* <Sparkle/> */}
      <Waves />
      <Prepack />
      <BuildPackageSection />
    </div>
  );
}
