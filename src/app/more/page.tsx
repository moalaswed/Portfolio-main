import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { PackagePlus } from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";

const morePage = () => {
  return (
    // MORE / POSTS PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <PackagePlus className="h-4 w-4" />
        More
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>More</Heading>
      </div>
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8 text-center my-auto">
        <FramerWrapper y={20} scale={0.9} duration={0.3}>
          <p className="font-poppins text-2xl sm:text-3xl md:text-4xl font-medium text-primary leading-relaxed max-w-2xl">
            There will be more to post here in the future.😁👌
          </p>
        </FramerWrapper>
      </div>
    </div>
  );
};

export default morePage;

