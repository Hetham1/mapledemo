import ExpandableCardDemo from "./expandable-card-demo-grid"

export default function Prepack() {
  return (
    <div className="min-h-screen w-full flex flex-col p-4 justify-center bg-hesam-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Choose a Pre-Packaged HVAC Solution</h1>
        <div className="w-24 h-1 mx-auto bg-blue-600 rounded-full mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-500 text-lg">
          Explore our expertly designed HVAC packages, tailored for efficiency and comfort. Each package is carefully
          crafted to meet the needs of different spaces, ensuring reliable performance and energy savings.
        </p>
      </div>
      <ExpandableCardDemo />
    </div>
  )
}

