// 海克斯模式攻略数据
// 设计理念：科技竞技风格 - 霓虹蓝紫配色，高对比度信息展示

export interface Augment {
  id: string;
  name: string;
  tier: 'silver' | 'gold' | 'prismatic';
  description: string;
  effect: string;
  champions: string[];
  synergy: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  winRate?: number;
  popularity?: number;
}

export interface AugmentCombo {
  id: string;
  name: string;
  augments: string[];
  champions: string[];
  description: string;
  strength: number; // 1-10
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string[];
  counters: string[];
}

export interface Champion {
  id: string;
  name: string;
  role: string;
  bestAugments: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  winRate?: number;
}

export const augments: Augment[] = [
  {
    id: 'cant-touch-this',
    name: '无法触及',
    tier: 'prismatic',
    description: '释放终极技能后获得2秒无敌状态',
    effect: '释放大招后2秒内免疫所有伤害，冷却时间8秒',
    champions: ['萨米拉', '卡特琳娜', '阿卡丽'],
    synergy: ['终极技能冷却缩短', '技能急速'],
    difficulty: 'medium',
    winRate: 58.2,
    popularity: 72,
  },
  {
    id: 'courage-colossus',
    name: '巨像的勇气',
    tier: 'prismatic',
    description: '定身敌方英雄后获得护盾',
    effect: '每次控制敌人时获得200 + 6%最大生命值的护盾',
    champions: ['盖伦', '拉姆斯', '塞拉斯'],
    synergy: ['坦克装备', '控制技能', '生命值提升'],
    difficulty: 'easy',
    winRate: 61.5,
    popularity: 68,
  },
  {
    id: 'infernal-conduit',
    name: '炼狱导管',
    tier: 'prismatic',
    description: '技能施加灼烧效果并缩短冷却时间',
    effect: '技能造成灼烧，每层灼烧缩短基础技能冷却0.003秒，造成1-12 + 2%AP + 2.8%额外AD伤害',
    champions: ['品牌', '莉莉娅', '艾尼维亚'],
    synergy: ['法术强度', '持续伤害', '技能急速'],
    difficulty: 'medium',
    winRate: 59.8,
    popularity: 65,
  },
  {
    id: 'symphony-war',
    name: '战争交响乐',
    tier: 'prismatic',
    description: '获得致命节奏和征服者符文',
    effect: '同时获得致命节奏和征服者两个基石符文的效果',
    champions: ['亚索', '永恩', '劫'],
    synergy: ['攻击速度', '生命吸取', '攻击力'],
    difficulty: 'hard',
    winRate: 62.1,
    popularity: 58,
  },
  {
    id: 'jeweled-gauntlet',
    name: '珠光护手',
    tier: 'prismatic',
    description: '技能可以造成暴击',
    effect: '技能造成暴击伤害（真实伤害也可以），造成140%总伤害，获得20%暴击率',
    champions: ['辛德拉', '橘子哥', '卡莎'],
    synergy: ['爆发伤害', '低冷却技能', '暴击率'],
    difficulty: 'hard',
    winRate: 60.3,
    popularity: 62,
  },
  {
    id: 'universal-sight',
    name: '万用瞄准镜',
    tier: 'gold',
    description: '获得259点攻击距离',
    effect: '远程英雄获得259攻击距离，近战英雄获得150攻击距离',
    champions: ['卡莎', '金克丝', '厄运小姐'],
    synergy: ['远程英雄', '攻击力', '攻击速度'],
    difficulty: 'easy',
    winRate: 55.2,
    popularity: 70,
  },
  {
    id: 'dive-bombing',
    name: '俯冲轰炸',
    tier: 'gold',
    description: '队伍成员阵亡时爆炸',
    effect: '每回合第一次阵亡会爆炸，对附近敌人造成目标20%最大生命值的真实伤害',
    champions: ['蒙多医生', '瑟提', '诺手'],
    synergy: ['坦克', '生命值', '团队协作'],
    difficulty: 'medium',
    winRate: 57.8,
    popularity: 52,
  },
  {
    id: 'eternal-vigil',
    name: '择日赴死',
    tier: 'gold',
    description: '持续4秒的千珏大招',
    effect: '创建一个4秒的地带，所有单位在其中不会死亡',
    champions: ['千珏', '卡尔玛', '锐雯'],
    synergy: ['防守', '团队生存', '控制'],
    difficulty: 'hard',
    winRate: 59.1,
    popularity: 48,
  },
  {
    id: 'endless-recovery',
    name: '无休恢复',
    tier: 'gold',
    description: '移动时回复生命值',
    effect: '每移动1000码距离获得3%生命值 + 60-180治疗效果',
    champions: ['盖伦', '德玛西亚之力', '诺克萨斯之手'],
    synergy: ['坦克', '生命值', '移动速度'],
    difficulty: 'easy',
    winRate: 54.5,
    popularity: 61,
  },
  {
    id: 'accelerated-sorcery',
    name: '加速巫术',
    tier: 'prismatic',
    description: '使用技能提升技能急速',
    effect: '每次使用技能获得8点技能急速，可无限叠加',
    champions: ['卡萨丁', '卡特琳娜', '艾克'],
    synergy: ['技能冷却缩短', '法术强度', '低冷却技能'],
    difficulty: 'hard',
    winRate: 63.2,
    popularity: 55,
  },
];

export const augmentCombos: AugmentCombo[] = [
  {
    id: 'combo-1',
    name: '无敌萨米拉',
    augments: ['cant-touch-this', 'symphony-war', 'accelerated-sorcery'],
    champions: ['萨米拉'],
    description: '利用萨米拉的低冷却大招，结合无法触及和战争交响乐，实现持续无敌循环',
    strength: 9,
    difficulty: 'hard',
    tips: [
      '优先升级技能冷却相关装备',
      '在团战中不断释放大招维持无敌状态',
      '配合队友进行团队控制',
      '注意冷却时间间隙，预判敌方技能',
    ],
    counters: ['沉默效果', '禁锢控制', '真实伤害'],
  },
  {
    id: 'combo-2',
    name: '灼烧法师',
    augments: ['infernal-conduit', 'jeweled-gauntlet', 'accelerated-sorcery'],
    champions: ['品牌', '莉莉娅', '艾尼维亚'],
    description: '通过灼烧效果缩短技能冷却，配合暴击伤害实现高频率技能轰炸',
    strength: 8,
    difficulty: 'medium',
    tips: [
      '优先堆积法术强度',
      '利用灼烧效果的冷却缩短优势',
      '在团战中持续释放技能',
      '注意位置安全，避免被近身',
    ],
    counters: ['魔法盾', '水银饰带', '近身英雄'],
  },
  {
    id: 'combo-3',
    name: '坦克守护者',
    augments: ['courage-colossus', 'endless-recovery', 'dive-bombing'],
    champions: ['盖伦', '拉姆斯', '塞拉斯'],
    description: '构建超级坦克，通过控制获得护盾，移动回复生命，阵亡时造成伤害',
    strength: 8,
    difficulty: 'easy',
    tips: [
      '优先购买坦克装备',
      '在团战中充当前排',
      '利用控制技能频繁获得护盾',
      '不怕被集火，因为有多重防护',
    ],
    counters: ['真实伤害', '穿甲', '持续伤害'],
  },
  {
    id: 'combo-4',
    name: '远程射手',
    augments: ['universal-sight', 'jeweled-gauntlet', 'symphony-war'],
    champions: ['卡莎', '金克丝', '厄运小姐'],
    description: '通过增加攻击距离和暴击伤害，实现远程压制',
    strength: 7,
    difficulty: 'medium',
    tips: [
      '保持最大攻击距离',
      '优先购买攻击力和暴击装备',
      '在团战中保持输出位置',
      '避免被突进英雄近身',
    ],
    counters: ['突进英雄', '护盾', '控制技能'],
  },
  {
    id: 'combo-5',
    name: '快速冷却刺客',
    augments: ['accelerated-sorcery', 'cant-touch-this', 'infernal-conduit'],
    champions: ['劫', '阿卡丽', '卡特琳娜'],
    description: '通过技能急速和灼烧缩短冷却，实现快速连招和逃脱',
    strength: 9,
    difficulty: 'hard',
    tips: [
      '优先堆积技能急速',
      '利用低冷却进行频繁突进',
      '在击杀后快速逃脱',
      '配合队友进行集火',
    ],
    counters: ['防守阵容', '真实伤害', '群体控制'],
  },
];

export const champions: Champion[] = [
  {
    id: 'samira',
    name: '萨米拉',
    role: '射手',
    bestAugments: ['cant-touch-this', 'symphony-war', 'accelerated-sorcery'],
    difficulty: 'hard',
    description: '低冷却大招使其成为海克斯模式的明星英雄，配合无敌海克斯无人能挡',
    winRate: 62.3,
  },
  {
    id: 'brand',
    name: '品牌',
    role: '法师',
    bestAugments: ['infernal-conduit', 'accelerated-sorcery', 'jeweled-gauntlet'],
    difficulty: 'medium',
    description: '灼烧效果与多个海克斯完美配合，是法师阵容的核心',
    winRate: 59.8,
  },
  {
    id: 'garen',
    name: '盖伦',
    role: '坦克',
    bestAugments: ['courage-colossus', 'endless-recovery', 'dive-bombing'],
    difficulty: 'easy',
    description: '坦克英雄中最容易上手的选择，配合防守海克斯效果显著',
    winRate: 58.1,
  },
  {
    id: 'kaisa',
    name: '卡莎',
    role: '射手',
    bestAugments: ['universal-sight', 'jeweled-gauntlet', 'symphony-war'],
    difficulty: 'medium',
    description: '远程输出能力强，配合增距离海克斯压制力十足',
    winRate: 57.2,
  },
  {
    id: 'katarina',
    name: '卡特琳娜',
    role: '刺客',
    bestAugments: ['accelerated-sorcery', 'cant-touch-this', 'infernal-conduit'],
    difficulty: 'hard',
    description: '快速冷却的大招配合技能急速海克斯，可以无限释放',
    winRate: 61.5,
  },
  {
    id: 'rammus',
    name: '拉姆斯',
    role: '坦克',
    bestAugments: ['courage-colossus', 'endless-recovery', 'dive-bombing'],
    difficulty: 'easy',
    description: '多重控制技能使其能频繁获得护盾，是团队的定海神针',
    winRate: 56.8,
  },
  {
    id: 'syndra',
    name: '辛德拉',
    role: '法师',
    bestAugments: ['jeweled-gauntlet', 'accelerated-sorcery', 'infernal-conduit'],
    difficulty: 'medium',
    description: '低冷却技能配合暴击伤害，爆发伤害无敌',
    winRate: 60.3,
  },
  {
    id: 'yasuo',
    name: '亚索',
    role: '战士',
    bestAugments: ['symphony-war', 'accelerated-sorcery', 'cant-touch-this'],
    difficulty: 'hard',
    description: '风墙和剑术配合符文海克斯，可以成为不败战神',
    winRate: 62.1,
  },
];

export const tierList = [
  { tier: 'S', augments: ['cant-touch-this', 'accelerated-sorcery', 'symphony-war'], description: '最强海克斯，优先选择' },
  { tier: 'A', augments: ['infernal-conduit', 'courage-colossus', 'jeweled-gauntlet'], description: '强力海克斯，值得选择' },
  { tier: 'B', augments: ['universal-sight', 'endless-recovery', 'dive-bombing'], description: '中等海克斯，根据阵容选择' },
  { tier: 'C', augments: [], description: '其他海克斯，特定情况下选择' },
];

export const tips = [
  '优先选择与英雄技能相符的海克斯',
  '考虑敌方阵容，选择针对性的海克斯',
  '多个海克斯的组合效果往往大于单个海克斯',
  '及时调整策略，根据游戏进展选择合适的海克斯',
  '团队协作很重要，与队友的海克斯要有互补性',
  '不要盲目跟风，了解自己英雄的最佳海克斯搭配',
];
