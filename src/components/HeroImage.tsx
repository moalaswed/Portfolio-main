import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <Image
        src="/hero-illustration.svg"
        alt="Mohamed Alaswad - Web Developer Illustration"
        loading="eager"
        priority
        height={600}
        width={600}
        className="w-full h-auto max-h-[75vh] object-contain drop-shadow-lg transition-all duration-300"
      />
    </div>
  );
};

export default HeroImage;