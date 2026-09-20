export interface GameProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  engine: string;
  platform: string;
  status: 'In Development' | 'Alpha' | 'Beta' | 'Concept' | 'Playable' | 'Released';
  keyFeatures: string[];
  specs: {
    genre: string;
    targetFps: string;
    resolution: string;
    physics: string;
  };
  playUrl?: string;
  downloadUrl?: string;
}

export interface SkillNode {
  name: string;
  category: 'Programming' | '3D & Art' | 'Game Design' | 'Engine';
  level: number;
  icon: string;
}

export interface CodeSnippet {
  title: string;
  lang: string;
  filename: string;
  code: string;
}
