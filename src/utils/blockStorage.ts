import { BlockGuideCategory } from "@/types/block";
import { getGuideContent } from "./guideStorage";
import { migrateGuideContent } from "./blockMigration";

const STORAGE_KEY = 'mythicmu-block-guides';
const MIGRATION_FLAG = 'mythicmu-migrated-to-blocks';

export function getBlockGuideContent(): BlockGuideCategory[] {
  // Check if already migrated
  const migrated = localStorage.getItem(MIGRATION_FLAG);
  
  if (!migrated) {
    // Perform migration from old format
    const oldContent = getGuideContent();
    const migratedContent = migrateGuideContent(oldContent);
    saveBlockGuideContent(migratedContent);
    localStorage.setItem(MIGRATION_FLAG, 'true');
    return migratedContent;
  }
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse block guide content:', error);
    }
  }
  
  // Fallback: perform migration
  const oldContent = getGuideContent();
  const migratedContent = migrateGuideContent(oldContent);
  saveBlockGuideContent(migratedContent);
  localStorage.setItem(MIGRATION_FLAG, 'true');
  return migratedContent;
}

export function saveBlockGuideContent(content: BlockGuideCategory[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  localStorage.setItem(MIGRATION_FLAG, 'true');
}

export function resetBlockGuideContent(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(MIGRATION_FLAG);
}
