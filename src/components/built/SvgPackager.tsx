import Image from "next/image";

const SvgPackager = ({
  svgPaths,
  src,
}: {
  svgPaths?: string[];
  src: string;
}) => {
  if (svgPaths?.length === 0) {
    return (
      <div className="h-60 w-full rounded-lg flex items-center justify-center">
        <Image
          src={src}
          alt="HVAC System"
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="h-60 w-full rounded-lg flex items-center justify-center">
      {svgPaths?.map((path, index) => (
        <div
          key={index}
          className={`flex items-center justify-center ${
            svgPaths?.length > 1 ? "w-1/2" : "w-full"
          }`}
        >
          <Image
            src={path}
            alt={`HVAC Component ${index + 1}`}
            width={100}
            height={100}
            className="object-contain p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default SvgPackager;
