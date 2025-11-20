import { BlockGuideCategory } from "@/types/block";

export const defaultBlockContent: BlockGuideCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    iconName: 'Sparkles',
    description: 'Begin your journey in the MU Universe',
    subSections: [
      {
        id: 'welcome',
        title: 'Welcome to MU Online',
        description: 'Your adventure begins here',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Welcome to MU Online',
            level: 1,
            align: 'center'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'MU Online is an epic fantasy MMORPG where you battle demons, collect legendary items, and forge your legacy. This guide will help you master the realm and become a legendary warrior.',
            align: 'left'
          },
          {
            id: 'divider-1',
            type: 'divider'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '⚡ Quick Tip: Start by choosing a character class that matches your playstyle. Each class has unique abilities and strengths!',
            color: 'blue'
          },
          {
            id: 'heading-2',
            type: 'heading',
            content: 'What Makes MU Online Special?',
            level: 2,
            align: 'left'
          },
          {
            id: 'list-1',
            type: 'list',
            items: [
              'Massive open-world with diverse zones and dungeons',
              'Complex character progression with multiple advancement paths',
              'Intense PvP battles and guild warfare',
              'Legendary item crafting and enhancement system',
              'Epic boss raids requiring team coordination',
              'Active trading economy and auction house'
            ],
            ordered: false
          }
        ]
      },
      {
        id: 'first-steps',
        title: 'Your First Steps',
        description: 'Essential guide for new players',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'First Steps in MU Online',
            level: 2,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'After creating your character, you\'ll spawn in Lorencia, the starting city. Follow these steps to get started on your journey:',
            align: 'left'
          },
          {
            id: 'list-1',
            type: 'list',
            items: [
              'Complete the tutorial quests to learn basic controls',
              'Visit the NPC vendors to purchase beginner equipment',
              'Join a guild for support and community',
              'Start hunting in the beginner zones near Lorencia',
              'Save up Zen (currency) for better equipment'
            ],
            ordered: true
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '💎 Important: Always keep health and mana potions in your inventory. You can buy them from potion vendors in town.',
            color: 'green'
          },
          {
            id: 'heading-2',
            type: 'heading',
            content: 'Leveling Strategy',
            level: 3,
            align: 'left'
          },
          {
            id: 'columns-1',
            type: 'columns',
            columns: [
              {
                id: 'col-1',
                blocks: [
                  {
                    id: 'heading-col1',
                    type: 'heading',
                    content: 'Levels 1-50',
                    level: 4,
                    align: 'left'
                  },
                  {
                    id: 'text-col1',
                    type: 'text',
                    content: 'Focus on completing quests and hunting in beginner zones. Stay near Lorencia and gradually move to Noria.',
                    align: 'left'
                  }
                ]
              },
              {
                id: 'col-2',
                blocks: [
                  {
                    id: 'heading-col2',
                    type: 'heading',
                    content: 'Levels 50-150',
                    level: 4,
                    align: 'left'
                  },
                  {
                    id: 'text-col2',
                    type: 'text',
                    content: 'Join party hunts in Dungeon and Devias. Start participating in Blood Castle events for better rewards.',
                    align: 'left'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'character-classes',
    title: 'Character Classes',
    iconName: 'Sword',
    description: 'Master the unique abilities of each class',
    subSections: [
      {
        id: 'dark-knight',
        title: 'Dark Knight',
        description: 'The ultimate melee warrior',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Dark Knight',
            level: 1,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'The Dark Knight is a powerful melee class specialized in close-range combat. With high physical damage and strong defense, they excel as frontline warriors in both PvE and PvP.',
            align: 'left'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '⚔️ Class Role: Tank/DPS - Best for players who enjoy aggressive melee combat and leading the charge into battle.',
            color: 'red'
          },
          {
            id: 'heading-2',
            type: 'heading',
            content: 'Key Strengths',
            level: 2,
            align: 'left'
          },
          {
            id: 'list-1',
            type: 'list',
            items: [
              'Highest physical damage output',
              'Excellent durability with heavy armor',
              'Strong area-of-effect skills',
              'Devastating one-on-one combat abilities',
              'Multiple weapon masteries available'
            ],
            ordered: false
          },
          {
            id: 'divider-1',
            type: 'divider'
          },
          {
            id: 'heading-3',
            type: 'heading',
            content: 'Essential Skills',
            level: 2,
            align: 'left'
          },
          {
            id: 'table-1',
            type: 'table',
            headers: ['Skill', 'Type', 'Description'],
            rows: [
              ['Twisting Slash', 'AoE', 'Spin attack hitting all nearby enemies'],
              ['Death Stab', 'Single Target', 'Powerful piercing strike'],
              ['Cyclone', 'AoE', 'Creates a damage zone around the knight'],
              ['Rageful Blow', 'Buff', 'Increases attack power temporarily']
            ]
          },
          {
            id: 'quote-1',
            type: 'quote',
            content: 'A Dark Knight\'s blade cuts through the darkness, bringing justice to the corrupted lands of MU.',
            author: 'Ancient MU Warrior'
          }
        ]
      },
      {
        id: 'dark-wizard',
        title: 'Dark Wizard',
        description: 'Master of destructive magic',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Dark Wizard',
            level: 1,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'The Dark Wizard commands powerful elemental magic to devastate enemies from range. With high intelligence and energy, they can unleash devastating spells that annihilate groups of monsters.',
            align: 'left'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '🔮 Class Role: Ranged DPS/Support - Perfect for players who prefer strategic gameplay and powerful magic attacks.',
            color: 'purple'
          },
          {
            id: 'heading-2',
            type: 'heading',
            content: 'Magic Mastery',
            level: 2,
            align: 'left'
          },
          {
            id: 'columns-1',
            type: 'columns',
            columns: [
              {
                id: 'col-1',
                blocks: [
                  {
                    id: 'text-col1',
                    type: 'text',
                    content: '**Fire Magic**: Explosive damage spells that excel against single targets and groups.',
                    align: 'left'
                  },
                  {
                    id: 'list-col1',
                    type: 'list',
                    items: [
                      'Flame Strike',
                      'Meteor',
                      'Fire Blast'
                    ],
                    ordered: false
                  }
                ]
              },
              {
                id: 'col-2',
                blocks: [
                  {
                    id: 'text-col2',
                    type: 'text',
                    content: '**Ice Magic**: Control spells that slow and freeze enemies in place.',
                    align: 'left'
                  },
                  {
                    id: 'list-col2',
                    type: 'list',
                    items: [
                      'Ice Storm',
                      'Frozen Grasp',
                      'Glacial Spike'
                    ],
                    ordered: false
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'fairy-elf',
        title: 'Fairy Elf',
        description: 'Agile archer and summoner',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Fairy Elf',
            level: 1,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'The Fairy Elf is a versatile ranged class that combines archery with summoning abilities. Quick and agile, they can kite enemies while dealing consistent damage from a safe distance.',
            align: 'left'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '🏹 Class Role: Ranged DPS/Summoner - Ideal for players who enjoy hit-and-run tactics and pet management.',
            color: 'green'
          }
        ]
      }
    ]
  },
  {
    id: 'combat-system',
    title: 'Combat System',
    iconName: 'Shield',
    description: 'Master the art of battle',
    subSections: [
      {
        id: 'combat-basics',
        title: 'Combat Basics',
        description: 'Understanding the fundamentals',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Combat Fundamentals',
            level: 2,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'MU Online features a dynamic real-time combat system that rewards skill, positioning, and strategic thinking. Understanding the basics is crucial for survival.',
            align: 'left'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '⚠️ Critical: Always monitor your health and mana bars. Running out of resources in combat can be fatal!',
            color: 'yellow'
          },
          {
            id: 'heading-2',
            type: 'heading',
            content: 'Attack Types',
            level: 3,
            align: 'left'
          },
          {
            id: 'table-1',
            type: 'table',
            headers: ['Type', 'Effectiveness', 'Best Against'],
            rows: [
              ['Physical', 'High burst damage', 'Low defense enemies'],
              ['Magical', 'Area damage', 'Groups of monsters'],
              ['Ranged', 'Safe damage', 'Mobile bosses'],
              ['Critical', 'Massive damage spike', 'Single targets']
            ]
          }
        ]
      },
      {
        id: 'pvp-combat',
        title: 'PvP Combat',
        description: 'Dominate in player battles',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'PvP Combat Guide',
            level: 2,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'Player versus Player combat in MU Online is intense and requires quick reflexes, proper gear, and strategic thinking. Here\'s what you need to know:',
            align: 'left'
          },
          {
            id: 'list-1',
            type: 'list',
            items: [
              'Always buff before engaging in PvP',
              'Learn your class\'s combo patterns',
              'Position yourself to avoid enemy skills',
              'Use terrain to your advantage',
              'Keep potions hotkeyed for quick use'
            ],
            ordered: true
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '🔥 Pro Tip: In PvP, timing is everything. Learning to cancel animations and chain skills quickly can give you a massive advantage.',
            color: 'red'
          }
        ]
      }
    ]
  },
  {
    id: 'items-equipment',
    title: 'Items & Equipment',
    iconName: 'Package',
    description: 'Gear up for greatness',
    subSections: [
      {
        id: 'equipment-guide',
        title: 'Equipment Guide',
        description: 'Understanding gear tiers and stats',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Equipment System',
            level: 2,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'Equipment in MU Online comes in various tiers and qualities. Understanding the enhancement system is key to maximizing your character\'s power.',
            align: 'left'
          },
          {
            id: 'heading-2',
            type: 'heading',
            content: 'Equipment Tiers',
            level: 3,
            align: 'left'
          },
          {
            id: 'list-1',
            type: 'list',
            items: [
              'Normal Items - Basic equipment found from monsters',
              'Excellent Items - Enhanced stats and special options',
              'Ancient Items - Set bonuses when worn together',
              'Socket Items - Can be upgraded with special jewels',
              'Legendary Items - Ultimate endgame equipment'
            ],
            ordered: false
          },
          {
            id: 'divider-1',
            type: 'divider'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '💎 Enhancement Tip: Use Jewel of Bless to safely upgrade items to +6. Beyond that, use Jewel of Soul carefully as failure can destroy your item!',
            color: 'blue'
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-tips',
    title: 'Advanced Tips',
    iconName: 'Zap',
    description: 'Master level strategies',
    subSections: [
      {
        id: 'pvp-strategies',
        title: 'Advanced PvP Strategies',
        description: 'Dominate the battlefield',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Advanced PvP Tactics',
            level: 1,
            align: 'center'
          },
          {
            id: 'quote-1',
            type: 'quote',
            content: 'In the arena, victory belongs to those who strike first and strike true. Knowledge is your greatest weapon.',
            author: 'Grand Master PvP Champion'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'Mastering PvP in MU Online requires understanding class matchups, combo timing, and psychological warfare. This section covers advanced techniques used by top players.',
            align: 'left'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '⚡ Master Strategy: Bait your opponent into using their defensive skills first, then unleash your full combo when they\'re vulnerable!',
            color: 'red'
          },
          {
            id: 'heading-2',
            type: 'heading',
            content: 'Class Matchup Analysis',
            level: 2,
            align: 'left'
          },
          {
            id: 'table-1',
            type: 'table',
            headers: ['Your Class', 'Enemy Class', 'Strategy'],
            rows: [
              ['Dark Knight', 'Dark Wizard', 'Close gap quickly, use stun lock'],
              ['Dark Wizard', 'Fairy Elf', 'Control with ice, burst damage'],
              ['Fairy Elf', 'Dark Knight', 'Maintain distance, kite continuously']
            ]
          },
          {
            id: 'divider-1',
            type: 'divider'
          },
          {
            id: 'heading-3',
            type: 'heading',
            content: 'Essential PvP Combos',
            level: 2,
            align: 'left'
          },
          {
            id: 'columns-1',
            type: 'columns',
            columns: [
              {
                id: 'col-1',
                blocks: [
                  {
                    id: 'heading-col1',
                    type: 'heading',
                    content: 'Dark Knight',
                    level: 4,
                    align: 'left'
                  },
                  {
                    id: 'list-col1',
                    type: 'list',
                    items: [
                      'Charge → Twisting Slash',
                      'Death Stab → Cyclone',
                      'Buff → All-out assault'
                    ],
                    ordered: true
                  }
                ]
              },
              {
                id: 'col-2',
                blocks: [
                  {
                    id: 'heading-col2',
                    type: 'heading',
                    content: 'Dark Wizard',
                    level: 4,
                    align: 'left'
                  },
                  {
                    id: 'list-col2',
                    type: 'list',
                    items: [
                      'Ice Storm → Meteor',
                      'Teleport → Fire Blast',
                      'Nova → Flame combo'
                    ],
                    ordered: true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'wealth-building',
        title: 'Wealth Building',
        description: 'Maximize your in-game economy',
        blocks: [
          {
            id: 'heading-1',
            type: 'heading',
            content: 'Building Your Fortune',
            level: 2,
            align: 'left'
          },
          {
            id: 'text-1',
            type: 'text',
            content: 'Accumulating wealth in MU Online is essential for acquiring the best equipment and items. Smart trading and farming strategies can exponentially increase your Zen income.',
            align: 'left'
          },
          {
            id: 'box-1',
            type: 'colored-box',
            content: '💰 Money Making Tip: Focus on farming high-value jewels like Jewel of Soul and Jewel of Life. These are always in demand!',
            color: 'yellow'
          }
        ]
      }
    ]
  }
];
