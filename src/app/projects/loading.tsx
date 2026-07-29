import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

export default function ProjectsLoading() {
  return (
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="h-4 w-4" />
        Projects
      </Badge>
      <div className="flex flex-col gap-3 w-full">
        <div className="h-10 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        <div className="h-14 w-full max-w-2xl bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      </div>

      <div className="w-full flex flex-row flex-wrap gap-4 max-lg:flex-col">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-0.75rem)] h-64 bg-neutral-100 dark:bg-neutral-900 border-2 rounded-xl p-5 flex flex-col justify-between animate-pulse"
          >
            <div className="flex flex-col gap-3">
              <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                <div className="h-5 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
              </div>
              <div className="h-9 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
