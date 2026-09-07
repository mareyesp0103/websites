import { Hero } from "@/components/sections/Hero";
import { ClientWall } from "@/components/sections/ClientWall";
import { FamilyGrid } from "@/components/sections/FamilyGrid";
import { SolutionExplorer } from "@/components/sections/SolutionExplorer";
import { FeaturedFormats } from "@/components/sections/FeaturedFormats";
import { CoverageMap } from "@/components/sections/CoverageMap";
import { WhySonic } from "@/components/sections/WhySonic";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientWall />
      <FamilyGrid />
      <SolutionExplorer />
      <FeaturedFormats />
      <CoverageMap />
      <WhySonic />
      <PortfolioPreview />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
