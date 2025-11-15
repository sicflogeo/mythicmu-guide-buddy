import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { CategorySidebar } from "@/components/CategorySidebar";
import { GuideSearch } from "@/components/GuideSearch";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getGuideContent } from "@/utils/guideStorage";

const Guide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const currentHash = location.hash || "#getting-started-creating-character";
  const guideCategories = getGuideContent();

  // Parse the hash to get category and subsection
  const { categoryId, subSectionId } = useMemo(() => {
    const hash = currentHash.slice(1); // Remove '#'
    const parts = hash.split('-');
    
    // Find which category this hash belongs to
    for (const category of guideCategories) {
      if (hash.startsWith(category.id)) {
        const subId = hash.substring(category.id.length + 1); // +1 for the hyphen
        return { categoryId: category.id, subSectionId: subId };
      }
    }
    
    return { categoryId: 'getting-started', subSectionId: 'creating-character' };
  }, [currentHash]);

  // Get current category and subsection
  const currentCategory = guideCategories.find(cat => cat.id === categoryId);
  const currentSubSection = currentCategory?.subSections.find(sub => sub.id === subSectionId);

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
        
        if (titleMatch || categoryMatch) {
          results.push({ category, subSection });
        }
      });
    });

    return results;
  }, [searchQuery]);

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
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Search Results ({searchResults.length})
                    </h2>
                    <div className="grid gap-4">
                      {searchResults.map(({ category, subSection }) => (
                        <a
                          key={`${category.id}-${subSection.id}`}
                          href={`#${category.id}-${subSection.id}`}
                          onClick={() => setSearchQuery("")}
                          className="block"
                        >
                          <Card className="border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors">
                            <CardHeader>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <category.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{subSection.title}</CardTitle>
                                  <CardDescription className="text-sm">
                                    {category.title} → {subSection.title}
                                  </CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Active Section Content */}
            {!searchQuery && currentCategory && currentSubSection && (
              <div className="max-w-4xl">
                <Card className="border-border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <currentCategory.icon className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {currentCategory.title}
                        </p>
                        <CardTitle className="text-3xl">{currentSubSection.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="prose prose-invert max-w-none">
                    {typeof currentSubSection.content === "string" 
                      ? <div dangerouslySetInnerHTML={{ __html: currentSubSection.content }} />
                      : currentSubSection.content
                    }
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Guide;
