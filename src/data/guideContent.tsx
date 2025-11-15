import { BookOpen, Sword, Shield, Map, Sparkles } from "lucide-react";
import { GuideCategory } from "@/types/guide";

export const defaultGuideContent: GuideCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    description: "Begin your adventure with the essential basics",
    subSections: [
      {
        id: "creating-character",
        title: "Creating Your Character",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              Welcome to MythicMU! Your journey begins with creating a character that suits your playstyle. 
              Each class offers unique abilities and combat styles. Take your time to read through the class 
              descriptions before making your choice.
            </p>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <h4 className="font-semibold text-primary mb-2">Tip for Beginners</h4>
              <p className="text-sm text-foreground/80">
                If you're new to MU Online games, start with Dark Knight for a more forgiving learning experience, 
                or Dark Wizard if you prefer ranged combat.
              </p>
            </div>
          </div>
        )
      },
      {
        id: "first-steps",
        title: "First Steps in the Game",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              After creating your character, you'll spawn in the beginner area. Here's what you should do first:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground/80">
              <li>Complete the tutorial quests to learn basic controls and mechanics</li>
              <li>Visit the starter town and talk to NPCs for initial quests and rewards</li>
              <li>Equip your starting gear from the inventory (press 'I')</li>
              <li>Join the beginner channel to connect with other new players</li>
              <li>Explore the surrounding area and fight low-level monsters</li>
            </ul>
          </div>
        )
      },
      {
        id: "interface",
        title: "Understanding the Interface",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              The game interface consists of several key elements that you'll use constantly:
            </p>
            <div className="grid gap-3">
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Health & Mana Bars:</strong>
                <span className="text-foreground/80 ml-2">Located at the top, shows your current health and mana/energy</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Action Bars:</strong>
                <span className="text-foreground/80 ml-2">Bottom of screen, assign skills and items for quick access</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Inventory (I):</strong>
                <span className="text-foreground/80 ml-2">Manage your equipment, items, and consumables</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Character Stats (C):</strong>
                <span className="text-foreground/80 ml-2">View and allocate stat points</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Minimap:</strong>
                <span className="text-foreground/80 ml-2">Navigate the world and track objectives</span>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "character-classes",
    title: "Character Classes",
    icon: Sword,
    description: "Discover the strengths and abilities of each class",
    subSections: [
      {
        id: "dark-knight",
        title: "Dark Knight",
        content: (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-900/20 to-transparent border border-red-500/30">
              <h4 className="text-xl font-semibold text-primary mb-3">The Fearless Warrior</h4>
              <p className="text-foreground/80 leading-relaxed mb-4">
                A powerful melee warrior with high defense and devastating close-range attacks. 
                Dark Knights excel in solo content and are essential for tanking in group dungeons.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-primary mb-2">Key Stats</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Primary: Strength (damage)</li>
                    <li>• Secondary: Vitality (HP & defense)</li>
                    <li>• Optional: Agility (attack speed)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-primary mb-2">Roles</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Tank</li>
                    <li>• Melee DPS</li>
                    <li>• Solo farming</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-2">Recommended for:</h5>
              <p className="text-foreground/80">New players, solo enthusiasts, and those who enjoy front-line combat.</p>
            </div>
          </div>
        )
      },
      {
        id: "dark-wizard",
        title: "Dark Wizard",
        content: (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/30">
              <h4 className="text-xl font-semibold text-primary mb-3">Master of Destruction</h4>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Master of destructive magic with powerful area-of-effect spells. 
                Dark Wizards have the highest damage output in the game but require careful positioning and mana management.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-primary mb-2">Key Stats</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Primary: Energy (spell damage)</li>
                    <li>• Secondary: Vitality (survivability)</li>
                    <li>• Optional: Intelligence (mana pool)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-primary mb-2">Roles</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Ranged DPS</li>
                    <li>• AoE specialist</li>
                    <li>• Mob farming</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-2">Recommended for:</h5>
              <p className="text-foreground/80">Players who enjoy high-risk high-reward gameplay and devastating magical attacks.</p>
            </div>
          </div>
        )
      },
      {
        id: "elf",
        title: "Elf",
        content: (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/20 to-transparent border border-green-500/30">
              <h4 className="text-xl font-semibold text-primary mb-3">Agile Archer</h4>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Agile archer with long-range attacks and utility buffs. 
                Elves excel at dealing consistent damage from afar while supporting their team with beneficial buffs.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-primary mb-2">Key Stats</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Primary: Agility (damage & speed)</li>
                    <li>• Secondary: Energy (skills & buffs)</li>
                    <li>• Optional: Vitality (defense)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-primary mb-2">Roles</h5>
                  <ul className="text-sm text-foreground/80 space-y-1">
                    <li>• Ranged DPS</li>
                    <li>• Support/Buffer</li>
                    <li>• Kiting specialist</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-primary mb-2">Recommended for:</h5>
              <p className="text-foreground/80">Players who prefer ranged combat and supporting team members.</p>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "items-equipment",
    title: "Items & Equipment",
    icon: Shield,
    description: "Learn about gear progression and item enhancement",
    subSections: [
      {
        id: "item-tiers",
        title: "Item Tiers and Rarity",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Items in MythicMU come in different rarities, each offering progressively better stats and bonuses:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-card border border-border">
                <span className="text-gray-400 text-2xl">●</span>
                <div>
                  <strong className="text-gray-400">Common (White)</strong>
                  <p className="text-sm text-foreground/80 mt-1">Basic starting gear with minimal stats. Found everywhere.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-card border border-border">
                <span className="text-green-500 text-2xl">●</span>
                <div>
                  <strong className="text-green-500">Uncommon (Green)</strong>
                  <p className="text-sm text-foreground/80 mt-1">Improved stats over common items. Drops from mid-level monsters.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-card border border-border">
                <span className="text-blue-500 text-2xl">●</span>
                <div>
                  <strong className="text-blue-500">Rare (Blue)</strong>
                  <p className="text-sm text-foreground/80 mt-1">Significant stat bonuses and special effects. Dungeons and elite monsters.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-card border border-border">
                <span className="text-primary text-2xl">●</span>
                <div>
                  <strong className="text-primary">Legendary (Gold)</strong>
                  <p className="text-sm text-foreground/80 mt-1">Powerful endgame gear with unique abilities. Raid bosses and events.</p>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "enhancement",
        title: "Enhancement System",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Items can be enhanced up to +15 using Jewels of Bless and Jewels of Soul. 
              Higher enhancement levels provide greater stat bonuses but come with increasing failure risks.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-green-900/10 border border-green-500/30">
                <h5 className="font-semibold text-green-500 mb-2">+0 to +6: Safe Zone</h5>
                <p className="text-sm text-foreground/80">
                  No risk of item destruction or level loss. Perfect for beginners to enhance their gear safely.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-900/10 border border-yellow-500/30">
                <h5 className="font-semibold text-yellow-500 mb-2">+7 to +9: Moderate Risk</h5>
                <p className="text-sm text-foreground/80">
                  Items may lose enhancement levels on failure. Use protection items to prevent level loss.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-red-900/10 border border-red-500/30">
                <h5 className="font-semibold text-red-500 mb-2">+10 to +15: High Risk</h5>
                <p className="text-sm text-foreground/80">
                  Significant risk of item destruction. Only enhance valuable items with proper protection.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <h5 className="font-semibold text-primary mb-2">Pro Tip</h5>
              <p className="text-sm text-foreground/80">
                Always use "Items of Luck" to increase your success rate, especially when enhancing rare or legendary items above +9.
              </p>
            </div>
          </div>
        )
      },
      {
        id: "set-items",
        title: "Set Items",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Collect complete sets to unlock powerful set bonuses that can dramatically improve your character's performance.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">How Set Bonuses Work</h5>
                <p className="text-sm text-foreground/80 mb-3">
                  Wearing multiple pieces from the same set grants cumulative bonuses:
                </p>
                <ul className="text-sm text-foreground/80 space-y-1 ml-4">
                  <li>• 2 pieces: Minor stat boost</li>
                  <li>• 4 pieces: Moderate stat boost + special effect</li>
                  <li>• 6 pieces (full set): Major stat boost + powerful unique ability</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Where to Find Set Items</h5>
                <ul className="text-sm text-foreground/80 space-y-2">
                  <li>• <strong>Dungeon Bosses:</strong> Drop specific set pieces</li>
                  <li>• <strong>World Bosses:</strong> Rare chance for any set item</li>
                  <li>• <strong>Events:</strong> Time-limited sets with unique bonuses</li>
                  <li>• <strong>Trading:</strong> Buy from other players in the marketplace</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "quests-dungeons",
    title: "Quests & Dungeons",
    icon: Map,
    description: "Navigate through adventures and challenges",
    subSections: [
      {
        id: "main-quest",
        title: "Main Quest Line",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Follow the main storyline quests (marked with golden exclamation marks) to unlock new areas, 
              gain experience, and receive quality rewards.
            </p>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
              <h5 className="font-semibold text-primary mb-2">Why Follow the Main Quest?</h5>
              <ul className="text-sm text-foreground/80 space-y-2">
                <li>• Guaranteed experience rewards that scale with your level</li>
                <li>• Free equipment upgrades at key milestones</li>
                <li>• Unlocks important game features and areas</li>
                <li>• Guides you through content at an appropriate pace</li>
                <li>• Introduces you to game mechanics gradually</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h5 className="font-semibold text-primary mb-2">Quest Rewards</h5>
              <p className="text-sm text-foreground/80">
                Main quests provide some of the best leveling rewards in the game. Don't skip them in favor of grinding!
              </p>
            </div>
          </div>
        )
      },
      {
        id: "daily-quests",
        title: "Daily Quests",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Complete daily quests for consistent rewards including experience, gold, and rare materials. 
              Daily quests reset at midnight server time.
            </p>
            <div className="grid gap-3">
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Kill Quests:</strong>
                <span className="text-foreground/80 ml-2">Defeat specific monsters (quick and easy)</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Gathering Quests:</strong>
                <span className="text-foreground/80 ml-2">Collect items from the world or monsters</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">Dungeon Quests:</strong>
                <span className="text-foreground/80 ml-2">Complete specific dungeons (better rewards)</span>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <strong className="text-primary">PvP Quests:</strong>
                <span className="text-foreground/80 ml-2">Win matches in the arena</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <h5 className="font-semibold text-primary mb-2">Daily Quest Tips</h5>
              <p className="text-sm text-foreground/80">
                Try to complete all daily quests each day. The rewards accumulate quickly and can significantly 
                speed up your progression, especially for materials needed for crafting and enhancement.
              </p>
            </div>
          </div>
        )
      },
      {
        id: "dungeons",
        title: "Dungeons",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Dungeons are instanced areas with powerful enemies and valuable loot. They scale in difficulty 
              and are categorized by recommended level ranges.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Beginner Dungeons (Levels 1-100)</h5>
                <p className="text-sm text-foreground/80 mb-2">
                  Practice your skills in safer environments. Can be completed solo or with a small group.
                </p>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Lorencia Catacombs</li>
                  <li>• Dungeon of Trials</li>
                  <li>• Spider Cave</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Elite Dungeons (Levels 100-200)</h5>
                <p className="text-sm text-foreground/80 mb-2">
                  Challenging content requiring coordination. Drops rare equipment and valuable materials.
                </p>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Devil Square</li>
                  <li>• Blood Castle</li>
                  <li>• Chaos Castle</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Raid Dungeons (Level 200+)</h5>
                <p className="text-sm text-foreground/80 mb-2">
                  Endgame content for organized groups. Features unique mechanics and legendary loot.
                </p>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Kanturu Ruins</li>
                  <li>• Crywolf Fortress</li>
                  <li>• Illusion Temple</li>
                </ul>
              </div>
            </div>
          </div>
        )
      }
    ]
  },
  {
    id: "advanced-tips",
    title: "Advanced Tips",
    icon: Sparkles,
    description: "Master strategies for experienced players",
    subSections: [
      {
        id: "stat-distribution",
        title: "Stat Distribution",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Proper stat allocation is crucial for maximizing your character's potential. 
              While you can reset stats later, planning ahead saves resources.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-red-500/30">
                <h5 className="font-semibold text-red-400 mb-3">Dark Knight Build</h5>
                <p className="text-sm text-foreground/80 mb-3">
                  Focus on Strength and Vitality for balanced damage and survival. Add Agility after core stats are maxed.
                </p>
                <div className="text-xs text-foreground/70 space-y-1">
                  <li>• Strength: 1200+ (primary damage)</li>
                  <li>• Vitality: 800+ (HP and defense)</li>
                  <li>• Agility: 400+ (attack speed)</li>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-blue-500/30">
                <h5 className="font-semibold text-blue-400 mb-3">Dark Wizard Build</h5>
                <p className="text-sm text-foreground/80 mb-3">
                  Prioritize Energy for damage, add enough Vitality to survive, then Intelligence for larger mana pool.
                </p>
                <div className="text-xs text-foreground/70 space-y-1">
                  <li>• Energy: 1500+ (spell damage)</li>
                  <li>• Vitality: 500+ (survival)</li>
                  <li>• Intelligence: 400+ (mana pool)</li>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-green-500/30">
                <h5 className="font-semibold text-green-400 mb-3">Elf Build</h5>
                <p className="text-sm text-foreground/80 mb-3">
                  Balance Agility and Energy for optimal damage output. Add Vitality for survivability in PvP.
                </p>
                <div className="text-xs text-foreground/70 space-y-1">
                  <li>• Agility: 1200+ (attack damage & speed)</li>
                  <li>• Energy: 800+ (skills and buffs)</li>
                  <li>• Vitality: 400+ (defense)</li>
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "pvp-strategies",
        title: "PvP Strategies",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              PvP combat requires different tactics than PvE. Success comes from knowing your class, 
              understanding your opponents, and mastering positioning.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Learn Class Matchups</h5>
                <p className="text-sm text-foreground/80">
                  Each class has advantages and disadvantages against others. Dark Knights counter Wizards at close range, 
                  Wizards can kite Elves, and Elves can outmaneuver Knights. Know your matchups!
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Combo Mastery</h5>
                <p className="text-sm text-foreground/80 mb-2">
                  Practice skill combinations in duels to maximize burst damage:
                </p>
                <ul className="text-xs text-foreground/70 space-y-1">
                  <li>• Chain crowd control into high-damage abilities</li>
                  <li>• Use movement skills to close gaps or escape</li>
                  <li>• Save defensive cooldowns for critical moments</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Positioning is Key</h5>
                <p className="text-sm text-foreground/80">
                  Always be aware of your surroundings. Use terrain, kite around obstacles, 
                  and never fight in disadvantageous positions.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "economy-trading",
        title: "Economy and Trading",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Understanding the game economy helps you profit from trading and ensures you always have 
              the gold needed for upgrades and consumables.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Market Trends</h5>
                <p className="text-sm text-foreground/80">
                  Prices fluctuate based on supply and demand. Enhancement materials spike before events, 
                  while equipment prices drop when new content releases. Buy low, sell high!
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Profitable Activities</h5>
                <ul className="text-sm text-foreground/80 space-y-2">
                  <li>• Farm high-demand materials during peak times</li>
                  <li>• Flip underpriced items on the marketplace</li>
                  <li>• Craft and sell popular consumables</li>
                  <li>• Run dungeons for rare drops to sell</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Personal Shop</h5>
                <p className="text-sm text-foreground/80">
                  The personal shop system allows you to sell items even while offline. 
                  Set competitive prices and place your shop in high-traffic areas for faster sales.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: "guild-benefits",
        title: "Guild Benefits",
        content: (
          <div className="space-y-4">
            <p className="text-foreground/80 leading-relaxed mb-4">
              Joining an active guild provides numerous advantages and is highly recommended for all players, 
              especially those interested in endgame content.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Guild Perks</h5>
                <ul className="text-sm text-foreground/80 space-y-2">
                  <li>• <strong>Guild Buffs:</strong> Stat bonuses active while in a guild</li>
                  <li>• <strong>Exclusive Quests:</strong> Guild-only missions with better rewards</li>
                  <li>• <strong>Shared Storage:</strong> Store items accessible to all members</li>
                  <li>• <strong>Organized Raids:</strong> Tackle difficult content together</li>
                  <li>• <strong>Guild Wars:</strong> Compete against other guilds for rewards</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Finding the Right Guild</h5>
                <p className="text-sm text-foreground/80">
                  Look for guilds that match your playstyle and schedule. Active guilds with experienced members 
                  can help you progress faster through advice and group activities.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <h5 className="font-semibold text-primary mb-2">Contributing to Your Guild</h5>
                <p className="text-sm text-foreground/80">
                  Participate in guild activities, donate resources, and help newer members. 
                  Active contribution unlocks better guild perks and builds lasting friendships.
                </p>
              </div>
            </div>
          </div>
        )
      }
    ]
  }
];

export const guideCategories = defaultGuideContent;
