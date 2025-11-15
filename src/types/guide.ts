import { LucideIcon } from "lucide-react";

export interface GuideSubSection {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode | string;
}

export interface GuideCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  subSections: GuideSubSection[];
}
