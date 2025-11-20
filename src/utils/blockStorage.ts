import { BlockGuideCategory } from "@/types/block";
import { getGuideContent } from "./guideStorage";
import { migrateGuideContent } from "./blockMigration";
import { defaultBlockContent } from "@/data/defaultBlockContent";

const STORAGE_KEY = 'mythicmu-block-guides';
const MIGRATION_FLAG = 'mythicmu-migrated-to-blocks';

export function getBlockGuideContent(): BlockGuideCategory[] {
  // Check if already migrated
  const migrated = localStorage.getItem(MIGRATION_FLAG);
  
  if (!migrated) {
    // Perform migration from old format
    try {
      const oldContent = getGuideContent();
      const migratedContent = migrateGuideContent(oldContent);
      saveBlockGuideContent(migratedContent);
      localStorage.setItem(MIGRATION_FLAG, 'true');
      console.log('Migration successful:', migratedContent);
      return migratedContent;
    } catch (error) {
      console.error('Migration failed:', error);
      return defaultBlockContent;
    }
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log('Loaded from storage:', parsed);
      return parsed;
    } catch (error) {
      console.error('Failed to parse block guide content:', error);
      return defaultBlockContent;
    }
  }
  
  // Fallback: use default content
  return defaultBlockContent;
}

export function saveBlockGuideContent(content: BlockGuideCategory[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  localStorage.setItem(MIGRATION_FLAG, 'true');
}

export function resetBlockGuideContent(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(MIGRATION_FLAG);
}
