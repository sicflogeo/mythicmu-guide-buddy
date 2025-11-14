import { BookOpen, Sword, Shield, Map, Sparkles } from "lucide-react";
import { GuideSection } from "@/components/GuideSection";
import { GuideSidebar } from "@/components/GuideSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Guide = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <GuideSidebar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <div className="border-b border-border bg-card/30 backdrop-blur">
            <div className="container mx-auto px-6 py-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-mythic bg-clip-text text-transparent">
                MythicMU Guide
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Master the realm with comprehensive guides, strategies, and tips for your journey through MythicMU.
              </p>
            </div>
          </div>

          {/* Guide Content */}
          <div className="container mx-auto px-6 py-12 space-y-12">
            {/* Getting Started */}
            <GuideSection
              id="getting-started"
              title="Getting Started"
              icon={BookOpen}
              description="Begin your adventure with the essential basics"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Creating Your Character</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Welcome to MythicMU! Your journey begins with creating a character that suits your playstyle. 
                    Each class offers unique abilities and combat styles. Take your time to read through the class 
                    descriptions before making your choice.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">First Steps in the Game</h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground/80">
                    <li>Complete the tutorial quests to learn basic controls</li>
                    <li>Visit the starter town and talk to NPCs for initial quests</li>
                    <li>Equip your starting gear from the inventory</li>
                    <li>Join the beginner channel to connect with other new players</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Understanding the Interface</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    The game interface consists of several key elements: your health and mana bars at the top, 
                    action bars at the bottom, inventory on the right, and the minimap in the corner. 
                    Press 'I' to open your inventory and 'C' for character stats.
                  </p>
                </div>
              </div>
            </GuideSection>

            {/* Character Classes */}
            <GuideSection
              id="character-classes"
              title="Character Classes"
              icon={Sword}
              description="Discover the strengths and abilities of each class"
            >
              <div className="grid gap-6">
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h3 className="text-lg font-semibold text-primary mb-2">Dark Knight</h3>
                  <p className="text-foreground/80 mb-3">
                    A powerful melee warrior with high defense and devastating close-range attacks. 
                    Excels in solo content and tanking dungeons.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Key Stats:</strong> Strength, Vitality | <strong>Role:</strong> Tank/DPS
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h3 className="text-lg font-semibold text-primary mb-2">Dark Wizard</h3>
                  <p className="text-foreground/80 mb-3">
                    Master of destructive magic with powerful area-of-effect spells. 
                    High damage output but requires careful positioning.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Key Stats:</strong> Energy, Intelligence | <strong>Role:</strong> Ranged DPS
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <h3 className="text-lg font-semibold text-primary mb-2">Elf</h3>
                  <p className="text-foreground/80 mb-3">
                    Agile archer with long-range attacks and utility buffs. 
                    Excellent for supporting teams and dealing consistent damage from afar.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    <strong>Key Stats:</strong> Agility, Energy | <strong>Role:</strong> Ranged DPS/Support
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Items & Equipment */}
            <GuideSection
              id="items-equipment"
              title="Items & Equipment"
              icon={Shield}
              description="Learn about gear progression and item enhancement"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Item Tiers and Rarity</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">●</span>
                      <span className="text-foreground/80">Common (White) - Basic starting gear</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-500">●</span>
                      <span className="text-foreground/80">Uncommon (Green) - Improved stats</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-blue-500">●</span>
                      <span className="text-foreground/80">Rare (Blue) - Significant bonuses</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-primary">●</span>
                      <span className="text-foreground/80">Legendary (Gold) - Powerful endgame gear</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Enhancement System</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Items can be enhanced up to +15 using Jewels of Bless and Jewels of Soul. 
                    Higher enhancement levels provide greater stat bonuses but come with increasing failure risks.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-foreground/80">
                    <li>+0 to +6: Safe enhancement with no failure penalty</li>
                    <li>+7 to +9: Items may lose enhancement levels on failure</li>
                    <li>+10 to +15: High risk of item destruction</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Set Items</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Collect complete sets to unlock powerful set bonuses. Set items drop from specific bosses 
                    and high-level dungeons. Each set provides unique bonuses suited to different playstyles.
                  </p>
                </div>
              </div>
            </GuideSection>

            {/* Quests & Dungeons */}
            <GuideSection
              id="quests-dungeons"
              title="Quests & Dungeons"
              icon={Map}
              description="Navigate through adventures and challenges"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Main Quest Line</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Follow the main storyline quests (marked with golden exclamation marks) to unlock new areas, 
                    gain experience, and receive quality rewards. The main quest will guide you through the game's 
                    content at an appropriate pace.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Daily Quests</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Complete daily quests for consistent rewards including experience, gold, and rare materials. 
                    Daily quests reset at midnight server time.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Dungeons</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded bg-card border border-border">
                      <h4 className="font-semibold text-primary mb-1">Beginner Dungeons (Levels 1-100)</h4>
                      <p className="text-sm text-foreground/80">
                        Practice your skills in safer environments. Can be completed solo or with a small group.
                      </p>
                    </div>
                    <div className="p-3 rounded bg-card border border-border">
                      <h4 className="font-semibold text-primary mb-1">Elite Dungeons (Levels 100-200)</h4>
                      <p className="text-sm text-foreground/80">
                        Challenging content requiring coordination. Drops rare equipment and valuable materials.
                      </p>
                    </div>
                    <div className="p-3 rounded bg-card border border-border">
                      <h4 className="font-semibold text-primary mb-1">Raid Dungeons (Level 200+)</h4>
                      <p className="text-sm text-foreground/80">
                        Endgame content for organized groups. Features unique mechanics and legendary loot.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </GuideSection>

            {/* Advanced Tips */}
            <GuideSection
              id="advanced-tips"
              title="Advanced Tips"
              icon={Sparkles}
              description="Master strategies for experienced players"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Stat Distribution</h3>
                  <p className="text-foreground/80 leading-relaxed mb-3">
                    Proper stat allocation is crucial for maximizing your character's potential. 
                    While you can reset stats later, planning ahead saves resources.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-foreground/80">
                    <li>Dark Knight: Focus on Strength and Vitality for balanced damage and survival</li>
                    <li>Dark Wizard: Prioritize Energy for damage, add Intelligence for mana pool</li>
                    <li>Elf: Balance Agility and Energy for optimal damage output</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">PvP Strategies</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    PvP combat requires different tactics than PvE. Learn your class's combos, 
                    practice positioning, and understand counter-play against other classes. 
                    Join practice duels to improve your skills without penalty.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Economy and Trading</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Understanding the game economy helps you profit from trading. Watch market trends, 
                    farm valuable materials during peak demand, and build relationships with other traders. 
                    The personal shop system allows you to sell items even while offline.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">Guild Benefits</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Joining an active guild provides numerous advantages: guild buffs, exclusive quests, 
                    shared storage, and organized raid groups. Contribute to guild activities to unlock 
                    better perks and build lasting friendships.
                  </p>
                </div>
              </div>
            </GuideSection>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Guide;
