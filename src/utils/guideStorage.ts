import { GuideCategory } from "@/types/guide";
import { defaultGuideContent } from "@/data/guideContent";

export const getGuideContent = (): GuideCategory[] => {
  const stored = localStorage.getItem("guide_content");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultGuideContent;
    }
  }
  return defaultGuideContent;
};

export const saveGuideContent = (content: GuideCategory[]) => {
  localStorage.setItem("guide_content", JSON.stringify(content));
};
