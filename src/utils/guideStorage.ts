import { GuideCategory } from "@/types/guide";
import { defaultGuideContent } from "@/data/guideContent";
import { renderToStaticMarkup } from "react-dom/server";
import { BookOpen, Sword, Shield, Map, Sparkles } from "lucide-react";

const iconMap: { [key: string]: any } = {
  BookOpen,
  Sword,
  Shield,
  Map,
  Sparkles
};

const iconComponentToName = (icon: any): string => {
  switch (icon) {
    case BookOpen:
      return 'BookOpen';
    case Sword:
      return 'Sword';
    case Shield:
      return 'Shield';
    case Map:
      return 'Map';
    case Sparkles:
      return 'Sparkles';
    default:
      return 'BookOpen';
  }
};

// Convert JSX content to HTML string
const serializeContent = (categories: GuideCategory[]): any[] => {
  return categories.map(cat => ({
    id: cat.id,
    title: cat.title,
    iconName: iconComponentToName(cat.icon),
    description: cat.description,
    subSections: cat.subSections.map(sub => ({
      id: sub.id,
      title: sub.title,
      description: sub.description,
      content: typeof sub.content === 'string' 
        ? sub.content 
        : renderToStaticMarkup(sub.content as any)
    }))
  }));
};

// Convert serialized data back to GuideCategory format
const deserializeContent = (data: any[]): GuideCategory[] => {
  return data.map(cat => ({
    id: cat.id,
    title: cat.title,
    icon: iconMap[cat.iconName] || BookOpen,
    description: cat.description,
    subSections: cat.subSections
  }));
};

export const getGuideContent = (): GuideCategory[] => {
  const stored = localStorage.getItem("guide_content");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return deserializeContent(parsed);
    } catch {
      return defaultGuideContent;
    }
  }
  return defaultGuideContent;
};

export const getGuideContentForEdit = (): any[] => {
  const stored = localStorage.getItem("guide_content");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return serializeContent(defaultGuideContent);
    }
  }
  return serializeContent(defaultGuideContent);
};

export const saveGuideContent = (content: any[]) => {
  localStorage.setItem("guide_content", JSON.stringify(content));
};

export const resetToDefault = () => {
  localStorage.removeItem("guide_content");
};
