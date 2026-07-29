import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import ProjectCards from "@/components/ProjectsCard";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import { fetchGitHubProjects } from "@/lib/github";

export const revalidate = 3600; // 1-hour ISR revalidation

const projectsPage = async () => {
  const projects = await fetchGitHubProjects("moalaswed");

  return (
    // PROJECT PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1 ">
        <Layers className="h-4 w-4" />
        Projects
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <FramerWrapper y={0} x={200}>
          <p className=" font-poppins text-lg w-full text-primary max-sm:text-base">
            I love to Build Cool Projects. Here, you&#x27;ll find a curated
            collection of my creative endeavors and technical projects. Each
            piece represents a journey of innovation, problem-solving, and
            continuous learning. Synchronized directly from my GitHub profile.
          </p>
        </FramerWrapper>
      </div>

      <div className="w-full flex flex-row flex-wrap gap-4 max-lg:flex-col">
        {projects.map((val, indx) => {
          return <ProjectCards key={val.id || indx} value={val} num={indx} />;
        })}
      </div>
    </div>
  );
};

export default projectsPage;

