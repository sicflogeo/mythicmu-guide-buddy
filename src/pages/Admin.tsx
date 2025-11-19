import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      <header className="border-b border-border p-4 sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" size="sm" className="gap-1">
              <RotateCcw className="w-3 h-3" />
              Reset
            </Button>
            <Button onClick={handleSave} size="sm" className="gap-1">
              <Save className="w-3 h-3" />
              Save
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-1">
              <LogOut className="w-3 h-3" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Manage guide content • {categories.length} categories
          </p>
          <Button onClick={addCategory} size="sm" className="gap-1">
            <Plus className="w-3 h-3" />
            Add Category
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.id} className="border rounded-lg px-4 bg-card">
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="text-lg font-semibold">{category.title}</span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategory(category.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Category Title</Label>
                    <Input
                      value={category.title}
                      onChange={(e) => updateCategory(category.id, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Icon Name</Label>
                    <Input
                      value={category.iconName}
                      onChange={(e) => updateCategory(category.id, 'iconName', e.target.value)}
                      className="mt-1"
                      placeholder="BookOpen, Sword, Shield, Map, Sparkles"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs">Description</Label>
                    <Input
                      value={category.description}
                      onChange={(e) => updateCategory(category.id, 'description', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-sm font-medium">Sub-sections ({category.subSections.length})</Label>
                    <Button 
                      onClick={() => addSubSection(category.id)} 
                      size="sm"
                      variant="outline"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Sub-section
                    </Button>
                  </div>

                  <Accordion type="single" collapsible className="w-full space-y-2">
                    {category.subSections.map((subSection) => (
                      <AccordionItem key={subSection.id} value={subSection.id} className="border rounded-lg px-3 bg-muted/30">
                        <AccordionTrigger className="hover:no-underline text-sm py-3">
                          <div className="flex items-center justify-between w-full pr-2">
                            <span className="font-medium">{subSection.title}</span>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSubSection(category.id, subSection.id);
                              }}
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 pt-2 pb-4">
                          <div>
                            <Label className="text-xs">Title</Label>
                            <Input
                              value={subSection.title}
                              onChange={(e) => updateSubSection(category.id, subSection.id, 'title', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Description</Label>
                            <Input
                              value={subSection.description || ''}
                              onChange={(e) => updateSubSection(category.id, subSection.id, 'description', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs mb-2 block">Content</Label>
                            <RichTextEditor
                              value={subSection.content}
                              onChange={(content) => updateSubSection(category.id, subSection.id, 'content', content)}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  );
}
