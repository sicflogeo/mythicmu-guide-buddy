import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, LogOut, Save, RotateCcw } from "lucide-react";
import { getBlockGuideContent, saveBlockGuideContent, resetBlockGuideContent } from "@/utils/blockStorage";
import { toast } from "sonner";
import { BlockEditor } from "@/components/BlockEditor";
import { BlockGuideCategory, Block } from "@/types/block";

export default function Admin() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<BlockGuideCategory[]>([]);

  useEffect(() => {
    const password = localStorage.getItem('admin-password');
    if (!password || password !== 'mythic123') {
      navigate('/admin');
      return;
    }

    const content = getBlockGuideContent();
    setCategories(content);
  }, [navigate]);

  const handleSave = () => {
    saveBlockGuideContent(categories);
    toast.success('Content saved!');
  };

  const handleReset = () => {
    if (confirm('Reset all content?')) {
      resetBlockGuideContent();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-password');
    navigate('/admin');
  };

  const addCategory = () => {
    const newCategory: BlockGuideCategory = {
      id: `category-${Date.now()}`,
      title: 'New Category',
      iconName: 'BookOpen',
      description: 'Category description',
      subSections: [],
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, field: keyof BlockGuideCategory, value: any) => {
    setCategories(categories.map(cat => cat.id === id ? { ...cat, [field]: value } : cat));
  };

  const deleteCategory = (id: string) => {
    if (confirm('Delete category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const addSubSection = (categoryId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subSections: [...cat.subSections, {
            id: `subsection-${Date.now()}`,
            title: 'New Sub-section',
            description: '',
            blocks: [],
          }],
        };
      }
      return cat;
    }));
  };

  const updateSubSection = (categoryId: string, subSectionId: string, field: 'title' | 'description' | 'blocks', value: any) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          subSections: cat.subSections.map(sub =>
            sub.id === subSectionId ? { ...sub, [field]: value } : sub
          ),
        };
      }
      return cat;
    }));
  };

  const deleteSubSection = (categoryId: string, subSectionId: string) => {
    if (confirm('Delete sub-section?')) {
      setCategories(categories.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, subSections: cat.subSections.filter(sub => sub.id !== subSectionId) };
        }
        return cat;
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Block Editor Admin</h1>
          <div className="flex gap-2">
            <Button onClick={handleReset} variant="outline" size="sm"><RotateCcw className="w-3 h-3" />Reset</Button>
            <Button onClick={handleSave} size="sm"><Save className="w-3 h-3" />Save</Button>
            <Button onClick={handleLogout} variant="outline" size="sm"><LogOut className="w-3 h-3" />Logout</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 space-y-4">
        <Button onClick={addCategory} size="sm"><Plus className="w-3 h-3 mr-1" />Add Category</Button>

        <Accordion type="single" collapsible className="space-y-2">
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.id} className="border rounded-lg px-4 bg-card">
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="text-lg font-semibold">{category.title}</span>
                  <Button onClick={(e) => { e.stopPropagation(); deleteCategory(category.id); }} variant="ghost" size="sm"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4 pb-6">
                <div className="grid md:grid-cols-2 gap-3">
                  <div><Label>Title</Label><Input value={category.title} onChange={(e) => updateCategory(category.id, 'title', e.target.value)} /></div>
                  <div><Label>Icon</Label><Input value={category.iconName} onChange={(e) => updateCategory(category.id, 'iconName', e.target.value)} placeholder="BookOpen, Sword" /></div>
                </div>

                <div className="border-t pt-4">
                  <Button onClick={() => addSubSection(category.id)} size="sm" variant="outline"><Plus className="w-3 h-3 mr-1" />Add Sub-section</Button>

                  <Accordion type="single" collapsible className="space-y-2 mt-3">
                    {category.subSections.map((sub) => (
                      <AccordionItem key={sub.id} value={sub.id} className="border rounded-lg px-3">
                        <AccordionTrigger>
                          <div className="flex items-center justify-between w-full pr-2">
                            <span>{sub.title}</span>
                            <Button onClick={(e) => { e.stopPropagation(); deleteSubSection(category.id, sub.id); }} variant="ghost" size="sm"><Trash2 className="w-3 h-3" /></Button>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3 pt-2 pb-4">
                          <div><Label>Title</Label><Input value={sub.title} onChange={(e) => updateSubSection(category.id, sub.id, 'title', e.target.value)} /></div>
                          <div><Label>Content Blocks</Label><BlockEditor blocks={sub.blocks} onChange={(blocks: Block[]) => updateSubSection(category.id, sub.id, 'blocks', blocks)} /></div>
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
