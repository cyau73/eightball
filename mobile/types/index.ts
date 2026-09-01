export type SassIntensity = 'MILD' | 'SPICY' | 'SAVAGE';

export interface FortuneResult {
  fortune: string;
  intensity: SassIntensity;
  category?: string;
  sentiment?: string;
  isFromDatabase?: boolean;
  timestamp: string;
}

export interface FortuneHistoryItem extends FortuneResult {
  id: string;
}

export interface UserSeedInfo {
  seedKey: string;
  createdAt: string;
  totalDraws: number;
}
