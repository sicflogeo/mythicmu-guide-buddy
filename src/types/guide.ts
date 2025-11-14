import { LucideIcon } from "lucide-react";

export interface GuideSubSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface GuideCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  subSections: GuideSubSection[];
}
