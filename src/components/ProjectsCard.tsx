import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FramerWrapper from "./animation/FramerWrapper";
import { ArrowUpRight, Github, Star, GitFork } from "lucide-react";
import { GitHubProject } from "@/lib/github";

interface ProjectCardProps {
  value: GitHubProject | {
    title: string;
    description: string;
    tags: string[];
    link: string;
    githubUrl?: string;
    homepage?: string | null;
    stars?: number;
    forks?: number;
  };
  num: number;
}

const getTagStyle = (tag: string): string => {
  const normalized = tag.toLowerCase().trim();
  if (normalized.includes("next")) return "bg-teal-100 text-teal-800 border-teal-200";
  if (normalized.includes("react")) return "bg-sky-100 text-sky-800 border-sky-200";
  if (normalized.includes("typescript") || normalized === "ts") return "bg-blue-100 text-blue-800 border-blue-200";
  if (normalized.includes("javascript") || normalized === "js") return "bg-amber-100 text-amber-800 border-amber-200";
  if (normalized.includes("python")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (normalized.includes("django")) return "bg-green-100 text-green-800 border-green-200";
  if (normalized.includes("php") || normalized.includes("blade")) return "bg-indigo-100 text-indigo-800 border-indigo-200";
  if (normalized.includes("tailwind")) return "bg-cyan-100 text-cyan-800 border-cyan-200";
  if (normalized.includes("supabase") || normalized.includes("sql") || normalized.includes("postgres")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (normalized.includes("shadcn")) return "bg-blue-100 text-blue-800 border-blue-200";
  if (normalized.includes("freelance")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (normalized.includes("zod")) return "bg-cyan-100 text-cyan-800 border-cyan-200";
  if (normalized.includes("zustand")) return "bg-purple-100 text-purple-800 border-purple-200";

  return "bg-gray-100 text-gray-800 border-gray-200";
};

const ProjectCards: React.FC<ProjectCardProps> = ({ value, num }) => {
  const githubUrl = value.githubUrl || (value.link.includes("github.com") ? value.link : undefined);
  const homepageUrl = value.homepage || (!value.link.includes("github.com") ? value.link : undefined);

  return (
    <FramerWrapper 
      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] flex" 
      y={0} 
      scale={0.8} 
      delay={Math.min(num * 0.1, 0.6)} 
      duration={0.2}
    >
      <Card className="w-full flex flex-col hover:shadow-xl transition-all duration-300 border-2 justify-between">
        <div>
          <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
            <CardTitle className="text-xl font-bold text-primary break-words">
              {value.title}
            </CardTitle>
            {(value.stars !== undefined && value.stars > 0) || (value.forks !== undefined && value.forks > 0) ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0 pt-1">
                {value.stars !== undefined && value.stars > 0 && (
                  <span className="flex items-center gap-0.5" title="Stars">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    {value.stars}
                  </span>
                )}
                {value.forks !== undefined && value.forks > 0 && (
                  <span className="flex items-center gap-0.5" title="Forks">
                    <GitFork className="h-3.5 w-3.5" />
                    {value.forks}
                  </span>
                )}
              </div>
            ) : null}
          </CardHeader>
          
          <CardContent className="flex-grow flex flex-col gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {value.description}
            </p>
            
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {value.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                    getTagStyle(tag)
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </div>

        <CardFooter className="pt-4 flex items-center justify-between gap-2 border-t mt-4">
          {homepageUrl ? (
            <Link
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ 
                  variant: "default", 
                  size: "sm" 
                }),
                "transition-all hover:translate-y-[-2px] hover:shadow-md group flex-1 justify-center"
              )}
            >
              Live Demo
              <ArrowUpRight className="h-4 w-4 ml-1 hidden group-hover:block -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          ) : (
            <Link
              href={githubUrl || value.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ 
                  variant: "default", 
                  size: "sm" 
                }),
                "transition-all hover:translate-y-[-2px] hover:shadow-md group flex-1 justify-center"
              )}
            >
              <Github className="h-4 w-4 mr-1.5" />
              Repository
              <ArrowUpRight className="h-4 w-4 ml-1 hidden group-hover:block -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </Link>
          )}

          {homepageUrl && githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View Source Code on GitHub"
              className={cn(
                buttonVariants({ 
                  variant: "outline", 
                  size: "sm" 
                }),
                "transition-all hover:bg-neutral-100"
              )}
            >
              <Github className="h-4 w-4 mr-1" />
              Code
            </Link>
          )}
        </CardFooter>
      </Card>
    </FramerWrapper>
  );
};

export default ProjectCards;

