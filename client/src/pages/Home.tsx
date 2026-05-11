import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { augments, augmentCombos, champions, tierList, tips } from '@/lib/augmentData';
import { Zap, Flame, Shield, Sword } from 'lucide-react';

export default function Home() {
  const [selectedTier, setSelectedTier] = useState<string>('S');
  const [selectedCombo, setSelectedCombo] = useState<string | null>(null);

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      S: 'bg-red-500/20 text-red-300 border-red-500/50',
      A: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
      B: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      C: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    };
    return colors[tier] || colors.C;
  };

  const getAugmentTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      silver: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
      gold: 'bg-yellow-600/20 text-yellow-300 border-yellow-600/50',
      prismatic: 'bg-purple-600/20 text-purple-300 border-purple-600/50',
    };
    return colors[tier] || colors.silver;
  };

  const getDifficultyIcon = (difficulty: string) => {
    const icons: Record<string, React.ReactNode> = {
      easy: <Shield className="w-4 h-4" />,
      medium: <Sword className="w-4 h-4" />,
      hard: <Flame className="w-4 h-4" />,
    };
    return icons[difficulty] || null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent glow-text" />
            <h1 className="text-2xl font-bold glow-text-purple">英雄联盟海克斯攻略</h1>
          </div>
          <div className="text-sm text-muted-foreground">斗魂竞技场 · 强力组合指南</div>
        </div>
      </nav>

      {/* 主容器 */}
      <main className="container mx-auto px-4 py-8">
        {/* 欢迎区 */}
        <div className="mb-12 p-8 tech-card neon-glow-cyan rounded-xl">
          <h2 className="text-3xl font-bold mb-4 glow-text">欢迎来到海克斯竞技场</h2>
          <p className="text-lg text-muted-foreground mb-6">
            掌握最强的海克斯组合，成为斗魂竞技场的王者。本攻略站汇集了最新的海克斯数据、强力英雄推荐和获胜策略。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-accent mb-2">{augments.length}+</div>
              <div className="text-sm text-muted-foreground">海克斯符文</div>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-accent mb-2">{augmentCombos.length}</div>
              <div className="text-sm text-muted-foreground">强力组合</div>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-accent mb-2">{champions.length}+</div>
              <div className="text-sm text-muted-foreground">英雄推荐</div>
            </div>
          </div>
        </div>

        {/* 标签页导航 */}
        <Tabs defaultValue="combos" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-card border border-border/50">
            <TabsTrigger value="combos">强力组合</TabsTrigger>
            <TabsTrigger value="augments">海克斯大全</TabsTrigger>
            <TabsTrigger value="champions">英雄推荐</TabsTrigger>
            <TabsTrigger value="tips">进阶技巧</TabsTrigger>
          </TabsList>

          {/* 强力组合标签页 */}
          <TabsContent value="combos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {augmentCombos.map((combo) => (
                <Card
                  key={combo.id}
                  className="tech-card cursor-pointer transition-all hover:border-accent/60 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                  onClick={() => setSelectedCombo(selectedCombo === combo.id ? null : combo.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl glow-text-purple">{combo.name}</CardTitle>
                      <Badge className={getTierColor(combo.strength > 8 ? 'S' : combo.strength > 6 ? 'A' : 'B')}>
                        强度 {combo.strength}/10
                      </Badge>
                    </div>
                    <CardDescription className="text-muted-foreground">{combo.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-accent mb-2">包含海克斯</h4>
                      <div className="flex flex-wrap gap-2">
                        {combo.augments.map((augId) => {
                          const aug = augments.find((a) => a.id === augId);
                          return (
                            <Badge key={augId} variant="outline" className="border-accent/50 text-accent">
                              {aug?.name}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-accent mb-2">适配英雄</h4>
                      <div className="flex flex-wrap gap-2">
                        {combo.champions.map((champ) => (
                          <Badge key={champ} variant="secondary" className="bg-secondary/50">
                            {champ}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedCombo === combo.id && (
                      <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                        <div>
                          <h4 className="text-sm font-semibold text-accent mb-2">核心技巧</h4>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {combo.tips.map((tip, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-accent">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-accent mb-2">天敌</h4>
                          <div className="flex flex-wrap gap-2">
                            {combo.counters.map((counter) => (
                              <Badge key={counter} variant="outline" className="border-destructive/50 text-destructive">
                                {counter}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 海克斯大全标签页 */}
          <TabsContent value="augments" className="space-y-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 glow-text-purple">海克斯等级表</h3>
              <div className="space-y-3">
                {tierList.map((tierItem) => (
                  <div
                    key={tierItem.tier}
                    className="p-4 bg-card border border-border/30 rounded-lg cursor-pointer hover:border-accent/50 transition-all"
                    onClick={() => setSelectedTier(tierItem.tier)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getTierColor(tierItem.tier)} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                        {tierItem.tier} 级
                      </Badge>
                      <span className="text-sm text-muted-foreground">{tierItem.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 glow-text-purple">所有海克斯</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {augments.map((augment) => (
                  <Card key={augment.id} className="tech-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-lg text-foreground">{augment.name}</CardTitle>
                        <Badge className={getAugmentTierColor(augment.tier)}>{augment.tier}</Badge>
                      </div>
                      <CardDescription className="text-muted-foreground">{augment.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-accent mb-1">效果</p>
                        <p className="text-sm text-muted-foreground">{augment.effect}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-accent mb-2">最佳英雄</p>
                        <div className="flex flex-wrap gap-1">
                          {augment.champions.slice(0, 3).map((champ) => (
                            <Badge key={champ} variant="secondary" className="text-xs">
                              {champ}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {augment.winRate && (
                        <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
                          <span>胜率: {augment.winRate}%</span>
                          <span>热度: {augment.popularity}%</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 英雄推荐标签页 */}
          <TabsContent value="champions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {champions.map((champion) => (
                <Card key={champion.id} className="tech-card">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-xl glow-text-purple">{champion.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">{champion.role}</CardDescription>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        {getDifficultyIcon(champion.difficulty)}
                        <span className="text-xs font-semibold capitalize">{champion.difficulty}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{champion.description}</p>

                    <div>
                      <h4 className="text-sm font-semibold text-accent mb-2">最佳海克斯搭配</h4>
                      <div className="space-y-2">
                        {champion.bestAugments.map((augId) => {
                          const aug = augments.find((a) => a.id === augId);
                          return (
                            <div key={augId} className="flex items-center gap-2 p-2 bg-card/50 rounded border border-border/30">
                              <div className="w-2 h-2 rounded-full bg-accent" />
                              <span className="text-sm">{aug?.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {champion.winRate && (
                      <div className="text-xs text-muted-foreground pt-2 border-t border-border/30">
                        <span className="text-accent">胜率: {champion.winRate}%</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 进阶技巧标签页 */}
          <TabsContent value="tips" className="space-y-6">
            <Card className="tech-card neon-glow-purple">
              <CardHeader>
                <CardTitle className="text-2xl glow-text-purple">进阶技巧与策略</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tips.map((tip, idx) => (
                    <div key={idx} className="p-4 bg-card/50 rounded-lg border border-border/30 hover:border-accent/50 transition-all">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent font-bold text-sm">{idx + 1}</span>
                        </div>
                        <p className="text-muted-foreground">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-accent/10 border border-accent/30 rounded-lg">
                  <h4 className="text-lg font-bold text-accent mb-3">核心要点</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>了解每个海克斯的协同效应，不是简单的堆砌</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>根据敌方阵容灵活调整策略，没有绝对的最强组合</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>与队友沟通，确保海克斯搭配的互补性</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-accent">✓</span>
                      <span>持续学习新的组合和玩法，游戏版本在不断更新</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 底部信息 */}
        <div className="mt-16 pt-8 border-t border-border/30 text-center text-muted-foreground">
          <p className="mb-2">英雄联盟海克斯模式攻略站 · 最后更新于 2026年5月</p>
          <p className="text-sm">
            本站数据基于最新游戏版本，仅供参考。祝您游戏愉快！
          </p>
        </div>
      </main>
    </div>
  );
}
