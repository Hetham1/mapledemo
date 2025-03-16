import PackageBuilder from "@/components/built/package-builder";

export default function BuildPackagePage() {
  return (
    <div id="custom-package" className="container mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-amber-800">
          Build Your Custom HVAC Package
        </h1>
        <div className="w-24 h-1 mx-auto bg-amber-600 rounded-full mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg">
          Create your perfect HVAC solution by selecting one option from each
          category below. Our experts will install your custom package to ensure
          optimal performance for your home or business.
        </p>
      </div>

      <PackageBuilder />
    </div>
  );
}
