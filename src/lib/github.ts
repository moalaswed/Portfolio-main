import { portfolioConfig } from "@/config/portfolio.config";

export interface GitHubProject {
  id?: number | string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  githubUrl: string;
  homepage?: string | null;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isGithub?: boolean;
}

interface RawGitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  updated_at: string;
}

/**
 * Format repository name to human-readable title
 * Example: "Interior-Ministry-Vehicle-System" -> "Interior Ministry Vehicle System"
 */
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Capitalize tag/topic names for display
 */
function formatTag(tag: string): string {
  if (tag.toLowerCase() === "nextjs") return "Next.js";
  if (tag.toLowerCase() === "reactjs" || tag.toLowerCase() === "react") return "React";
  if (tag.toLowerCase() === "typescript" || tag.toLowerCase() === "ts") return "TypeScript";
  if (tag.toLowerCase() === "javascript" || tag.toLowerCase() === "js") return "JavaScript";
  if (tag.toLowerCase() === "php") return "PHP";
  if (tag.toLowerCase() === "python") return "Python";
  if (tag.toLowerCase() === "django") return "Django";
  if (tag.toLowerCase() === "tailwindcss" || tag.toLowerCase() === "tailwind") return "Tailwind CSS";

  return tag
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Fetches public repos from GitHub for the specified username with 1-hour ISR revalidation.
 * Falls back to static portfolioConfig projects if fetch fails or rate limited.
 */
export async function fetchGitHubProjects(
  username: string = "moalaswed"
): Promise<GitHubProject[]> {
  try {
    const headers: Record<string, string> = {
      "User-Agent": "NextJS-Portfolio-App",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        next: { revalidate: 3600 }, // Revalidate every 1 hour (ISR)
      }
    );

    if (!response.ok) {
      console.warn(
        `[GitHub API] Returned status ${response.status}. Falling back to config projects.`
      );
      return getFallbackProjects();
    }

    const repos: RawGitHubRepo[] = await response.json();

    if (!Array.isArray(repos)) {
      return getFallbackProjects();
    }

    // Filter out forks, archived, or disabled repos
    const filteredRepos = repos.filter(
      (repo) => !repo.fork && !repo.archived && !repo.disabled
    );

    if (filteredRepos.length === 0) {
      return getFallbackProjects();
    }

    return filteredRepos.map((repo) => {
      const rawTags: string[] = [];

      if (repo.language) {
        rawTags.push(repo.language);
      }

      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((t) => {
          if (!rawTags.some((existing) => existing.toLowerCase() === t.toLowerCase())) {
            rawTags.push(t);
          }
        });
      }

      const formattedTags = rawTags.map(formatTag);

      return {
        id: repo.id,
        title: formatRepoName(repo.name),
        description: repo.description || "Public repository hosted on GitHub.",
        tags: formattedTags.length > 0 ? formattedTags : ["GitHub Project"],
        link: repo.homepage || repo.html_url,
        githubUrl: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        isGithub: true,
      };
    });
  } catch (error) {
    console.error("[GitHub API Error]", error);
    return getFallbackProjects();
  }
}

/**
 * Formats static config projects as GitHubProject fallback
 */
function getFallbackProjects(): GitHubProject[] {
  return portfolioConfig.projects.map((proj, index) => ({
    id: `static-${index}`,
    title: proj.title,
    description: proj.description,
    tags: proj.tags,
    link: proj.link,
    githubUrl: proj.link.includes("github.com") ? proj.link : "https://github.com/moalaswed",
    homepage: proj.link.includes("github.com") ? null : proj.link,
    stars: 0,
    forks: 0,
    isGithub: false,
  }));
}
