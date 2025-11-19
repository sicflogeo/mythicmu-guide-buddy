import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getBlockGuideContent } from "@/utils/blockStorage";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import * as LucideIcons from "lucide-react";

export default function Guide() {
  const location = useLocation();
  const currentHash = location.hash || "#getting-started";
  const guideCategories = getBlockGuideContent();

  const categoryId = currentHash.slice(1).split('-')[0];
  const currentCategory = guideCategories.find(cat => cat.id === categoryId);
  const currentSubSection = currentCategory?.subSections[0];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-dark p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">MythicMU Guide</h1>
          {currentSubSection && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">{currentSubSection.title}</h2>
              {currentSubSection.blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))}
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
