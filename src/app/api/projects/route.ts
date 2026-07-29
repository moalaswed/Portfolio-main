import { NextResponse } from "next/server";
import { fetchGitHubProjects } from "@/lib/github";

export const revalidate = 3600; // Revalidate route cache every hour

export async function GET() {
  try {
    const projects = await fetchGitHubProjects("moalaswed");
    return NextResponse.json(
      {
        success: true,
        count: projects.length,
        data: projects,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("[API /api/projects GET]", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch GitHub projects",
      },
      { status: 500 }
    );
  }
}
