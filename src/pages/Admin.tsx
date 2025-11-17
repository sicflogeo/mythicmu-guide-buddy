import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, LogOut, Save, RotateCcw } from "lucide-react";
import { getGuideContentForEdit, saveGuideContent, resetToDefault } from "@/utils/guideStorage";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/RichTextEditor";

interface EditableCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  subSections: EditableSubSection[];
}

interface EditableSubSection {
  id: string;
  title: string;
  description?: string;
  content: string;
}

const ADMIN_PIN = "1234567890"; // 10 digit PIN - change this in code

export default function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [categories, setCategories] = useState<EditableCategory[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      setCategories(getGuideContentForEdit());
    }
  }, []);

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setCategories(getGuideContentForEdit());
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

  const handleReset = () => {
    if (confirm("Are you sure you want to reset to default content? This cannot be undone.")) {
      resetToDefault();
      setCategories(getGuideContentForEdit());
      toast.success("Content reset to default");
    }
  };

  const addCategory = () => {
    const newCategory: EditableCategory = {
      id: `category-${Date.now()}`,
      title: "New Category",
      iconName: "BookOpen",
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
      c.id === categoryId && (field === 'title' || field === 'description' || field === 'iconName') 
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

  const updateSubSection = (categoryId: string, subSectionId: string, field: keyof EditableSubSection, value: string) => {
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
      <header className="border-b border-mythic-gold/20 p-3 sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-mythic-gold">Admin Panel</h1>
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="secondary" size="sm" className="gap-2">
              <RotateCcw className="w-3 h-3" />
              Reset
            </Button>
            <Button onClick={handleSave} variant="default" size="sm" className="gap-2">
              <Save className="w-3 h-3" />
              Save
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="w-3 h-3" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Manage guide content • Saved to browser storage
          </p>
          <Button onClick={addCategory} variant="default" size="sm" className="gap-2">
            <Plus className="w-3 h-3" />
            Add Category
          </Button>
        </div>

        {categories.map((category) => (
          <Card key={category.id} className="border-mythic-gold/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-3">
                  <div>
                    <Label className="text-xs">Category Title</Label>
                    <Input
                      value={category.title}
                      onChange={(e) => updateCategory(category.id, "title", e.target.value)}
                      placeholder="Category name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Category Description</Label>
                    <Input
                      value={category.description}
                      onChange={(e) => updateCategory(category.id, "description", e.target.value)}
                      placeholder="Category description"
                      className="mt-1"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => deleteCategory(category.id)}
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-xs">Sub-sections ({category.subSections.length})</Label>
                <Button
                  onClick={() => addSubSection(category.id)}
                  variant="outline"
                  size="sm"
                  className="gap-2 h-7 text-xs"
                >
                  <Plus className="w-3 h-3" />
                  Add Sub-section
                </Button>
              </div>

              {category.subSections.map((subSection) => (
                <Card key={subSection.id} className="border-muted">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label className="text-xs">Sub-section Title</Label>
                          <Input
                            value={subSection.title}
                            onChange={(e) => updateSubSection(category.id, subSection.id, "title", e.target.value)}
                            placeholder="Sub-section title"
                            className="mt-1"
                          />
                        </div>
                        {subSection.description !== undefined && (
                          <div>
                            <Label className="text-xs">Description (optional)</Label>
                            <Input
                              value={subSection.description || ""}
                              onChange={(e) => updateSubSection(category.id, subSection.id, "description", e.target.value)}
                              placeholder="Brief description"
                              className="mt-1"
                            />
                          </div>
                        )}
                        <div>
                          <Label className="text-xs">Content</Label>
                          <div className="mt-1">
                            <RichTextEditor
                              value={typeof subSection.content === "string" ? subSection.content : ""}
                              onChange={(value) => updateSubSection(category.id, subSection.id, "content", value)}
                            />
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => deleteSubSection(category.id, subSection.id)}
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Trash2 className="w-3 h-3" />
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
