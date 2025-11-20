import { BlockGuideCategory } from "@/types/block";

export const defaultBlockContent: BlockGuideCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    iconName: 'BookOpen',
    description: 'Begin your journey in MythicMU',
    subSections: [
      {
        id: 'creating-character',
        title: 'Creating Your Character',
        description: 'Learn how to create and customize your character',
        blocks: [
          {
            id: 'text-1',
            type: 'text',
            content: 'Welcome to MythicMU! This guide will help you create your first character and begin your adventure.',
            align: 'left'
          },
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Character Creation Steps',
            level: 2,
            align: 'left'
          },
          {
            id: 'list-1',
            type: 'list',
            items: [
              'Choose your character class',
              'Customize appearance and name',
              'Select starting attributes',
              'Begin your adventure!'
            ],
            ordered: true
          }
        ]
      }
    ]
  }
];
