import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  champions,
  augments,
  tierList,
  tips,
  searchChampions,
  searchAugments,
  getChampionBestAugments,
  getChampionGoodAugments,
  type Champion,
  type Augment,
} from '@/lib/gameData';
import {
  Zap,
  Flame,
  Shield,
  Sword,
  Search,
  Star,
  TrendingUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  Trophy,
  Package,
  Target,
  Lightbulb,
} from 'lucide-react';

// ============================================================
// 辅助函数
// ============================================================
function getTierColor(tier: string) {
  const colors: Record<string, string> = {
    S: 'bg-red-500/20 text-red-300 border-red-500/50',
    A: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    B: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    C: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    D: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  };
  return colors[tier] || colors.C;
}

function getAugmentTierColor(tier: string) {
  const colors: Record<string, string> = {
    silver: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
    gold: 'bg-yellow-600/20 text-yellow-300 border-yellow-600/50',
    prismatic: 'bg-purple-600/20 text-purple-300 border-purple-600/50',
  };
  return colors[tier] || colors.silver;
}

function getDifficultyLabel(difficulty: string) {
  const labels: Record<string, { text: string; color: string }> = {
    easy: { text: '简单', color: 'text-green-400' },
    medium: { text: '中等', color: 'text-yellow-400' },
    hard: { text: '困难', color: 'text-red-400' },
  };
  return labels[difficulty] || labels.easy;
}

function getDifficultyIcon(difficulty: string) {
  const icons: Record<string, React.ReactNode> = {
    easy: <Shield className="w-4 h-4 text-green-400" />,
    medium: <Sword className="w-4 h-4 text-yellow-400" />,
    hard: <Flame className="w-4 h-4 text-red-400" />,
  };
  return icons[difficulty] || null;
}

function getWinRateColor(rate: number) {
  if (rate >= 60) return 'text-red-400';
  if (rate >= 55) return 'text-orange-400';
  if (rate >= 52) return 'text-yellow-400';
  return 'text-gray-400';
}

// ============================================================
// 英雄详情卡片组件
// ============================================================
function ChampionDetailCard({ champion, onClose }: { champion: Champion; onClose: () => void }) {
  const bestAugmentDetails = getChampionBestAugments(champion);
  const goodAugmentDetails = getChampionGoodAugments(champion);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background border border-border rounded-xl shadow-2xl">
        {/* 头部 */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background/95 border-b border-border backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-2xl font-bold text-accent border border-accent/40">
              {champion.nameCN[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold glow-text-purple">
                {champion.nameCN}
                <span className="text-base text-muted-foreground ml-2 font-normal">({champion.name})</span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {champion.role.map((r) => (
                  <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
                ))}
                <Badge className={getTierColor(champion.tierRank)}>Tier {champion.tierRank}</Badge>
                {champion.winRate && (
                  <span className={`text-sm font-semibold ${getWinRateColor(champion.winRate)}`}>
                    胜率 {champion.winRate}%
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* 描述和打法 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <h3 className="text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> 英雄简介
              </h3>
              <p className="text-sm text-muted-foreground">{champion.description}</p>
            </div>
            <div className="p-4 bg-card/50 rounded-lg border border-border/30">
              <h3 className="text-sm font-semibold text-accent mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" /> 推荐打法
              </h3>
              <p className="text-sm text-muted-foreground">{champion.playstyle}</p>
            </div>
          </div>

          {/* 优势和劣势 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
              <h3 className="text-sm font-semibold text-green-400 mb-2">优势</h3>
              <ul className="space-y-1">
                {champion.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-green-400">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
              <h3 className="text-sm font-semibold text-red-400 mb-2">劣势</h3>
              <ul className="space-y-1">
                {champion.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-red-400">✗</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 最佳海克斯 */}
          <div>
            <h3 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 最佳海克斯搭配
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bestAugmentDetails.map((aug) => (
                <div key={aug.id} className="p-3 bg-accent/5 rounded-lg border border-accent/30 hover:border-accent/60 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-foreground">{aug.nameCN}</span>
                    <div className="flex gap-1">
                      <Badge className={getAugmentTierColor(aug.tier)} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                        {aug.tier === 'prismatic' ? '棱彩' : aug.tier === 'gold' ? '黄金' : '白银'}
                      </Badge>
                      <Badge className={getTierColor(aug.tierRank)} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                        {aug.tierRank}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{aug.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 推荐海克斯 */}
          {goodAugmentDetails.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4" /> 推荐海克斯
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {goodAugmentDetails.map((aug) => (
                  <div key={aug.id} className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-foreground">{aug.nameCN}</span>
                      <Badge className={getAugmentTierColor(aug.tier)} style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                        {aug.tier === 'prismatic' ? '棱彩' : aug.tier === 'gold' ? '黄金' : '白银'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{aug.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 出装推荐 */}
          <div>
            <h3 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" /> 出装推荐
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-card/50 rounded-lg border border-border/30">
                <h4 className="text-sm font-semibold text-orange-400 mb-2">核心装备</h4>
                <div className="flex flex-wrap gap-2">
                  {champion.coreItems.map((item, i) => (
                    <Badge key={i} className="bg-orange-500/20 text-orange-300 border-orange-500/50">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-border/30">
                <h4 className="text-sm font-semibold text-blue-400 mb-2">可选装备</h4>
                <div className="flex flex-wrap gap-2">
                  {champion.optionalItems.map((item, i) => (
                    <Badge key={i} className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 攻略技巧 */}
          <div>
            <h3 className="text-base font-semibold text-accent mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> 攻略技巧
            </h3>
            <div className="space-y-2">
              {champion.tips.map((tip, i) => (
                <div key={i} className="flex gap-3 p-3 bg-card/50 rounded-lg border border-border/30">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-accent text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/30">
            {champion.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs border-border/50 text-muted-foreground">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 英雄卡片组件（列表视图）
// ============================================================
function ChampionCard({ champion, onClick }: { champion: Champion; onClick: () => void }) {
  const diffLabel = getDifficultyLabel(champion.difficulty);
  return (
    <Card
      className="tech-card cursor-pointer transition-all hover:border-accent/60 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-xl font-bold text-accent border border-accent/30 group-hover:border-accent/60 transition-all">
              {champion.nameCN[0]}
            </div>
            <div>
              <CardTitle className="text-lg glow-text-purple leading-tight">
                {champion.nameCN}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{champion.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={getTierColor(champion.tierRank)}>Tier {champion.tierRank}</Badge>
            {champion.winRate && (
              <span className={`text-xs font-semibold ${getWinRateColor(champion.winRate)}`}>
                {champion.winRate}%
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2">{champion.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {champion.role.map((r) => (
              <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {getDifficultyIcon(champion.difficulty)}
            <span className={`text-xs ${diffLabel.color}`}>{diffLabel.text}</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-accent mb-1">最佳海克斯</p>
          <div className="flex flex-wrap gap-1">
            {champion.bestAugments.slice(0, 3).map((augId) => {
              const aug = augments.find((a) => a.id === augId);
              return aug ? (
                <Badge key={augId} variant="outline" className="text-xs border-accent/40 text-accent/80">
                  {aug.nameCN}
                </Badge>
              ) : null;
            })}
          </div>
        </div>
        <div className="text-xs text-muted-foreground/60 text-right group-hover:text-accent transition-colors">
          点击查看完整攻略 →
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================
// 海克斯卡片组件
// ============================================================
function AugmentCard({ augment }: { augment: Augment }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card className="tech-card transition-all hover:border-accent/40">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <CardTitle className="text-base text-foreground">{augment.nameCN}</CardTitle>
            <p className="text-xs text-muted-foreground/70">{augment.name}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <Badge className={getAugmentTierColor(augment.tier)} style={{ fontSize: '0.65rem' }}>
              {augment.tier === 'prismatic' ? '棱彩' : augment.tier === 'gold' ? '黄金' : '白银'}
            </Badge>
            <Badge className={getTierColor(augment.tierRank)} style={{ fontSize: '0.65rem' }}>
              Tier {augment.tierRank}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-muted-foreground text-xs">{augment.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-xs font-semibold text-accent mb-1">效果</p>
          <p className="text-xs text-muted-foreground">{augment.effect}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {augment.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-border/40 text-muted-foreground/70">
              {tag}
            </Badge>
          ))}
        </div>
        {augment.winRate && (
          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/30">
            <span className={getWinRateColor(augment.winRate)}>胜率: {augment.winRate}%</span>
            {augment.popularity && <span>热度: {augment.popularity}%</span>}
          </div>
        )}
        {expanded && (
          <div className="pt-2 border-t border-border/30">
            <p className="text-xs font-semibold text-accent mb-1">推荐英雄</p>
            <div className="flex flex-wrap gap-1">
              {augment.champions.map((champ) => (
                <Badge key={champ} variant="secondary" className="text-xs">{champ}</Badge>
              ))}
            </div>
          </div>
        )}
        <button
          className="text-xs text-accent/60 hover:text-accent transition-colors flex items-center gap-1"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? '收起' : '查看推荐英雄'}
        </button>
      </CardContent>
    </Card>
  );
}

// ============================================================
// 主页面组件
// ============================================================
export default function Home() {
  const [championSearch, setChampionSearch] = useState('');
  const [augmentSearch, setAugmentSearch] = useState('');
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('全部');
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('全部');
  const [augmentTierFilter, setAugmentTierFilter] = useState<string>('全部');
  const [activeTab, setActiveTab] = useState('champions');

  // 英雄角色列表
  const roles = useMemo(() => {
    const allRoles = new Set<string>();
    champions.forEach((c) => c.role.forEach((r) => allRoles.add(r)));
    return ['全部', ...Array.from(allRoles)];
  }, []);

  // 过滤后的英雄列表
  const filteredChampions = useMemo(() => {
    let list = championSearch ? searchChampions(championSearch) : champions;
    if (selectedRole !== '全部') {
      list = list.filter((c) => c.role.includes(selectedRole));
    }
    if (selectedTierFilter !== '全部') {
      list = list.filter((c) => c.tierRank === selectedTierFilter);
    }
    return list;
  }, [championSearch, selectedRole, selectedTierFilter]);

  // 过滤后的海克斯列表
  const filteredAugments = useMemo(() => {
    let list = augmentSearch ? searchAugments(augmentSearch) : augments;
    if (augmentTierFilter !== '全部') {
      if (['S', 'A', 'B', 'C', 'D'].includes(augmentTierFilter)) {
        list = list.filter((a) => a.tierRank === augmentTierFilter);
      } else {
        list = list.filter((a) => a.tier === augmentTierFilter);
      }
    }
    return list;
  }, [augmentSearch, augmentTierFilter]);

  // S/A 级英雄（首页展示）
  const topChampions = useMemo(
    () => champions.filter((c) => c.tierRank === 'S' || c.tierRank === 'A').slice(0, 6),
    []
  );

  // S 级海克斯（首页展示）
  const topAugments = useMemo(
    () => augments.filter((a) => a.tierRank === 'S').slice(0, 6),
    []
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/90 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/40">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold glow-text-purple leading-tight">LOL 海克斯大乱斗攻略</h1>
              <p className="text-xs text-muted-foreground">斗魂竞技场 · 全英雄 · 全海克斯</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-accent" />
              {champions.length} 英雄
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-accent" />
              {augments.length} 海克斯
            </span>
          </div>
        </div>
      </nav>

      {/* 主容器 */}
      <main className="container mx-auto px-4 py-8">
        {/* 英雄搜索区 - 最显眼的功能 */}
        <div className="mb-10 p-8 tech-card neon-glow-cyan rounded-xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold glow-text mb-2">搜索英雄攻略</h2>
            <p className="text-muted-foreground">输入英雄名称，获取最佳海克斯搭配和出装攻略</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="搜索英雄（中文/英文均可，如：亚索、Yasuo）..."
                value={championSearch}
                onChange={(e) => {
                  setChampionSearch(e.target.value);
                  if (e.target.value) setActiveTab('champions');
                }}
                className="pl-12 pr-4 h-14 text-base bg-background/50 border-accent/40 focus:border-accent rounded-xl"
              />
              {championSearch && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setChampionSearch('')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {championSearch && (
              <div className="mt-3 text-sm text-muted-foreground text-center">
                找到 <span className="text-accent font-semibold">{filteredChampions.length}</span> 个英雄
                {filteredChampions.length > 0 && (
                  <span className="ml-2">· 点击英雄卡片查看完整攻略</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: '全部英雄', value: champions.length, icon: <Trophy className="w-5 h-5" />, color: 'text-accent' },
            { label: '海克斯符文', value: augments.length, icon: <Sparkles className="w-5 h-5" />, color: 'text-purple-400' },
            { label: 'S级英雄', value: champions.filter((c) => c.tierRank === 'S').length, icon: <Star className="w-5 h-5" />, color: 'text-red-400' },
            { label: 'S级海克斯', value: augments.filter((a) => a.tierRank === 'S').length, icon: <TrendingUp className="w-5 h-5" />, color: 'text-orange-400' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 tech-card rounded-xl text-center">
              <div className={`flex justify-center mb-2 ${stat.color}`}>{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 主标签页 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border/50 h-12">
            <TabsTrigger value="champions" className="text-sm">
              <Trophy className="w-4 h-4 mr-2" />
              英雄攻略
            </TabsTrigger>
            <TabsTrigger value="augments" className="text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              海克斯大全
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-sm">
              <Lightbulb className="w-4 h-4 mr-2" />
              进阶技巧
            </TabsTrigger>
          </TabsList>

          {/* ===== 英雄攻略标签页 ===== */}
          <TabsContent value="champions" className="space-y-6">
            {/* 搜索和过滤 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索英雄..."
                  value={championSearch}
                  onChange={(e) => setChampionSearch(e.target.value)}
                  className="pl-9 bg-card border-border/50"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['全部', 'S', 'A', 'B'].map((tier) => (
                  <Button
                    key={tier}
                    variant={selectedTierFilter === tier ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTierFilter(tier)}
                    className={selectedTierFilter === tier ? 'bg-accent text-background' : 'border-border/50'}
                  >
                    {tier === '全部' ? '全部' : `Tier ${tier}`}
                  </Button>
                ))}
              </div>
            </div>

            {/* 角色过滤 */}
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedRole(role)}
                  className={`text-xs ${selectedRole === role ? 'bg-accent/80 text-background' : 'border-border/40 text-muted-foreground'}`}
                >
                  {role}
                </Button>
              ))}
            </div>

            {/* 结果数量 */}
            <div className="text-sm text-muted-foreground">
              显示 <span className="text-accent font-semibold">{filteredChampions.length}</span> / {champions.length} 个英雄
            </div>

            {/* 英雄列表 */}
            {filteredChampions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredChampions.map((champion) => (
                  <ChampionCard
                    key={champion.id}
                    champion={champion}
                    onClick={() => setSelectedChampion(champion)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">未找到匹配的英雄</p>
                <p className="text-sm mt-2">请尝试其他搜索词，如英雄中文名、英文名或角色类型</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setChampionSearch('');
                    setSelectedRole('全部');
                    setSelectedTierFilter('全部');
                  }}
                >
                  清除筛选条件
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ===== 海克斯大全标签页 ===== */}
          <TabsContent value="augments" className="space-y-6">
            {/* 搜索和过滤 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索海克斯（中文/英文/标签）..."
                  value={augmentSearch}
                  onChange={(e) => setAugmentSearch(e.target.value)}
                  className="pl-9 bg-card border-border/50"
                />
              </div>
            </div>

            {/* 过滤按钮 */}
            <div className="flex flex-wrap gap-2">
              {['全部', 'S', 'A', 'B', 'C', 'prismatic', 'gold', 'silver'].map((f) => (
                <Button
                  key={f}
                  variant={augmentTierFilter === f ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAugmentTierFilter(f)}
                  className={`text-xs ${augmentTierFilter === f ? 'bg-accent/80 text-background' : 'border-border/40 text-muted-foreground'}`}
                >
                  {f === '全部' ? '全部' :
                   f === 'prismatic' ? '棱彩' :
                   f === 'gold' ? '黄金' :
                   f === 'silver' ? '白银' :
                   `Tier ${f}`}
                </Button>
              ))}
            </div>

            {/* 等级说明 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {tierList.map((t) => (
                <div key={t.tier} className={`p-3 rounded-lg border ${getTierColor(t.tier)} bg-opacity-10`}>
                  <div className="font-bold text-lg mb-1">Tier {t.tier}</div>
                  <div className="text-xs opacity-80">{t.description}</div>
                </div>
              ))}
            </div>

            {/* 结果数量 */}
            <div className="text-sm text-muted-foreground">
              显示 <span className="text-accent font-semibold">{filteredAugments.length}</span> / {augments.length} 个海克斯
            </div>

            {/* 海克斯列表 */}
            {filteredAugments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAugments.map((augment) => (
                  <AugmentCard key={augment.id} augment={augment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg">未找到匹配的海克斯</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setAugmentSearch('');
                    setAugmentTierFilter('全部');
                  }}
                >
                  清除筛选条件
                </Button>
              </div>
            )}
          </TabsContent>

          {/* ===== 进阶技巧标签页 ===== */}
          <TabsContent value="tips" className="space-y-6">
            {/* 顶部推荐英雄 */}
            <div>
              <h3 className="text-xl font-bold mb-4 glow-text-purple flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent" /> 本版本强势英雄
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topChampions.map((champion) => (
                  <div
                    key={champion.id}
                    className="p-4 tech-card rounded-lg cursor-pointer hover:border-accent/60 transition-all"
                    onClick={() => {
                      setSelectedChampion(champion);
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent border border-accent/30">
                        {champion.nameCN[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{champion.nameCN}</div>
                        <div className="text-xs text-muted-foreground">{champion.role.join(' · ')}</div>
                      </div>
                      <Badge className={`ml-auto ${getTierColor(champion.tierRank)}`}>
                        {champion.tierRank}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{champion.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 顶部推荐海克斯 */}
            <div>
              <h3 className="text-xl font-bold mb-4 glow-text-purple flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" /> 本版本 S 级海克斯
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topAugments.map((aug) => (
                  <div key={aug.id} className="p-4 tech-card rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{aug.nameCN}</span>
                      <div className="flex gap-1">
                        <Badge className={getAugmentTierColor(aug.tier)} style={{ fontSize: '0.65rem' }}>
                          {aug.tier === 'prismatic' ? '棱彩' : aug.tier === 'gold' ? '黄金' : '白银'}
                        </Badge>
                        <Badge className={getTierColor(aug.tierRank)} style={{ fontSize: '0.65rem' }}>
                          S
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{aug.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 进阶技巧列表 */}
            <Card className="tech-card neon-glow-purple">
              <CardHeader>
                <CardTitle className="text-2xl glow-text-purple flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" /> 进阶技巧与策略
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tips.map((tip, idx) => (
                    <div key={idx} className="p-4 bg-card/50 rounded-lg border border-border/30 hover:border-accent/50 transition-all">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-accent font-bold text-sm">{idx + 1}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-accent/10 border border-accent/30 rounded-lg">
                  <h4 className="text-lg font-bold text-accent mb-3">核心要点</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    {[
                      '了解每个海克斯的协同效应，不是简单的堆砌',
                      '根据敌方阵容，选择针对性的海克斯',
                      '多个海克斯的组合效果往往大于单个海克斯',
                      '及时调整策略，根据游戏进展选择合适的海克斯',
                      '团队协作很重要，与队友的海克斯要有互补性',
                    ].map((point, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* 英雄详情弹窗 */}
      {selectedChampion && (
        <ChampionDetailCard
          champion={selectedChampion}
          onClose={() => setSelectedChampion(null)}
        />
      )}

      {/* 底部 */}
      <footer className="border-t border-border/30 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>LOL 海克斯大乱斗攻略 · 斗魂竞技场 · 数据版本 2025-2026</p>
          <p className="mt-1 text-xs opacity-60">本站数据仅供参考，实际游戏以官方为准</p>
        </div>
      </footer>
    </div>
  );
}
