import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { CategorySidebar } from "@/components/CategorySidebar";
import { GuideSearch } from "@/components/GuideSearch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlockGuideContent } from "@/utils/blockStorage";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import * as LucideIcons from "lucide-react";

export default function Guide() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const currentHash = location.hash || "#getting-started-creating-character";
  const guideCategories = getBlockGuideContent();

  // Parse the hash to get category and subsection
  const { categoryId, subSectionId } = useMemo(() => {
    const hash = currentHash.slice(1);
    
    for (const category of guideCategories) {
      if (hash.startsWith(category.id)) {
        const subId = hash.substring(category.id.length + 1);
        return { categoryId: category.id, subSectionId: subId };
      }
    }
    
    return { 
      categoryId: guideCategories[0]?.id || 'getting-started', 
      subSectionId: guideCategories[0]?.subSections[0]?.id || 'creating-character' 
    };
  }, [currentHash, guideCategories]);

  // Get current category and subsection
  const currentCategory = guideCategories.find(cat => cat.id === categoryId);
  const currentSubSection = currentCategory?.subSections.find(sub => sub.id === subSectionId) 
    || currentCategory?.subSections[0];

  // Search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    const results: Array<{
      category: typeof guideCategories[0];
      subSection: typeof guideCategories[0]['subSections'][0];
    }> = [];

    guideCategories.forEach(category => {
      category.subSections.forEach(subSection => {
        const titleMatch = subSection.title.toLowerCase().includes(query);
        const categoryMatch = category.title.toLowerCase().includes(query);
        const descriptionMatch = subSection.description?.toLowerCase().includes(query);
        
        if (titleMatch || categoryMatch || descriptionMatch) {
          results.push({ category, subSection });
        }
      });
    });

    return results;
  }, [searchQuery, guideCategories]);

  // Convert guideCategories to format expected by CategorySidebar
  const sidebarCategories = guideCategories.map(cat => {
    const IconComponent = (LucideIcons as any)[cat.iconName] || LucideIcons.BookOpen;
    return {
      ...cat,
      icon: IconComponent,
      subSections: cat.subSections
    };
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <CategorySidebar />
        
        <main className="flex-1">
          {/* Hero Section with Search */}
          <div className="border-b border-border bg-card/30 backdrop-blur sticky top-0 z-10">
            <div className="container mx-auto px-6 py-8 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-mythic bg-clip-text text-transparent">
                  MythicMU Guide
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Master the realm with comprehensive guides and strategies
                </p>
              </div>
              
              {/* Search Bar */}
              <GuideSearch 
                value={searchQuery} 
                onChange={setSearchQuery}
                resultsCount={searchQuery ? searchResults?.length : undefined}
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="container mx-auto px-6 py-12">
            {/* Search Results */}
            {searchQuery && searchResults && (
              <div className="space-y-6">
                {searchResults.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl text-muted-foreground">
                      No guides found matching "<span className="text-primary">{searchQuery}</span>"
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try different keywords or browse categories on the left
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-primary mb-6">
                      Found {searchResults.length} guide{searchResults.length !== 1 ? 's' : ''}
                    </h2>
                    <div className="grid gap-4">
                      {searchResults.map(({ category, subSection }) => (
                        <Card 
                          key={`${category.id}-${subSection.id}`}
                          className="hover:border-primary/50 transition-colors cursor-pointer"
                          onClick={() => window.location.hash = `#${category.id}-${subSection.id}`}
                        >
                          <CardHeader>
                            <CardTitle className="text-primary">{subSection.title}</CardTitle>
                            <CardDescription>
                              <span className="text-muted-foreground">{category.title}</span>
                              {subSection.description && (
                                <span className="block mt-1">{subSection.description}</span>
                              )}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {subSection.blocks[0]?.type === 'text' ? subSection.blocks[0].content : 'Click to view content'}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Current Guide Content */}
            {!searchQuery && currentCategory && currentSubSection && (
              <div className="max-w-4xl">
                <div className="mb-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{currentCategory.title}</span>
                    <span>›</span>
                    <span>{currentSubSection.title}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-3">
                    {currentSubSection.title}
                  </h2>
                  {currentSubSection.description && (
                    <p className="text-lg text-muted-foreground">
                      {currentSubSection.description}
                    </p>
                  )}
                </div>

                <div className="prose prose-invert max-w-none space-y-4">
                  {currentSubSection.blocks && currentSubSection.blocks.length > 0 ? (
                    currentSubSection.blocks.map((block) => (
                      <BlockRenderer key={block.id} block={block} isEditable={false} />
                    ))
                  ) : (
                    <p className="text-muted-foreground">No content available yet. Use the admin panel to add content.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
