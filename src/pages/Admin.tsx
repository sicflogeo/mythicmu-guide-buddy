import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, LogOut, Save } from "lucide-react";
import { GuideCategory, GuideSubSection } from "@/types/guide";
import { getGuideContent, saveGuideContent } from "@/utils/guideStorage";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PIN = "1234567890"; // 10 digit PIN - change this in code

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [categories, setCategories] = useState<GuideCategory[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      setCategories(getGuideContent());
    }
  }, []);

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setCategories(getGuideContent());
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid PIN");
      setPin("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    setPin("");
    navigate("/");
  };

  const handleSave = () => {
    saveGuideContent(categories);
    toast.success("Content saved successfully");
  };

  const addCategory = () => {
    const newCategory: GuideCategory = {
      id: `category-${Date.now()}`,
      title: "New Category",
      icon: BookOpen,
      description: "Category description",
      subSections: []
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId));
  };

  const updateCategory = (categoryId: string, field: string, value: string) => {
    setCategories(categories.map(c => 
      c.id === categoryId && (field === 'title' || field === 'description') 
        ? { ...c, [field]: value } 
        : c
    ));
  };

  const addSubSection = (categoryId: string) => {
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          subSections: [...c.subSections, {
            id: `subsection-${Date.now()}`,
            title: "New Sub-section",
            description: "Description here",
            content: "<p>Content here</p>"
          }]
        };
      }
      return c;
    }));
  };

  const deleteSubSection = (categoryId: string, subSectionId: string) => {
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          subSections: c.subSections.filter(s => s.id !== subSectionId)
        };
      }
      return c;
    }));
  };

  const updateSubSection = (categoryId: string, subSectionId: string, field: keyof GuideSubSection, value: string) => {
    setCategories(categories.map(c => {
      if (c.id === categoryId) {
        return {
          ...c,
          subSections: c.subSections.map(s => 
            s.id === subSectionId ? { ...s, [field]: value } : s
          )
        };
      }
      return c;
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-mythic-gold/20">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pin">Enter 10-Digit PIN</Label>
              <Input
                id="pin"
                type="password"
                maxLength={10}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter PIN"
                className="mt-2"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-mythic-gold/20 p-4 sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-mythic-gold">Guide Admin Panel</h1>
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="default" className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Manage your guide content. Changes are saved to browser storage. Note: Icons cannot be edited here.
          </p>
          <Button onClick={addCategory} variant="default" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Category
          </Button>
        </div>

        {categories.map((category) => (
          <Card key={category.id} className="border-mythic-gold/20">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div>
                    <Label>Category Title</Label>
                    <Input
                      value={category.title}
                      onChange={(e) => updateCategory(category.id, "title", e.target.value)}
                      placeholder="Category name"
                    />
                  </div>
                  <div>
                    <Label>Category Description</Label>
                    <Input
                      value={category.description}
                      onChange={(e) => updateCategory(category.id, "description", e.target.value)}
                      placeholder="Category description"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => deleteCategory(category.id)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Sub-sections ({category.subSections.length})</Label>
                <Button
                  onClick={() => addSubSection(category.id)}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Sub-section
                </Button>
              </div>

              {category.subSections.map((subSection) => (
                <Card key={subSection.id} className="border-muted">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label>Sub-section Title</Label>
                          <Input
                            value={subSection.title}
                            onChange={(e) => updateSubSection(category.id, subSection.id, "title", e.target.value)}
                            placeholder="Sub-section title"
                          />
                        </div>
                        {subSection.description !== undefined && (
                          <div>
                            <Label>Description (optional)</Label>
                            <Input
                              value={subSection.description || ""}
                              onChange={(e) => updateSubSection(category.id, subSection.id, "description", e.target.value)}
                              placeholder="Brief description"
                            />
                          </div>
                        )}
                        <div>
                          <Label>Content (HTML)</Label>
                          <Textarea
                            value={typeof subSection.content === "string" ? subSection.content : ""}
                            onChange={(e) => updateSubSection(category.id, subSection.id, "content", e.target.value)}
                            placeholder="Content in HTML format"
                            rows={10}
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Use HTML tags to format content. Note: Complex React components from original content cannot be edited here.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => deleteSubSection(category.id, subSection.id)}
                        variant="destructive"
                        size="icon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
