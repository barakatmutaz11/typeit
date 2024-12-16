import { 
  Bot, 
  Image, 
  Code, 
  Brain, 
  VideoIcon, 
  Music, 
  LineChart, 
  Search,
  Sparkles,
  Globe,
  Mic,
  Wand2,
  Dna,
  Stethoscope,
  Calculator,
  Building2,
  Microscope,
  Atom,
  Radar,
  Fingerprint,
  Glasses,
  Brush,
  Camera,
  Pencil,
  Palette,
  VolumeX,
  Volume2,
  Headphones,
  Film,
  Clapperboard,
  Tv2,
  Languages,
  BookOpen,
  Newspaper,
  BarChart,
  PieChart,
  TrendingUp,
  Shield,
  Lock,
  ScanLine,
  Webhook,
  Database,
  Server
} from 'lucide-react';
import { AITool } from '../types';

export const aiTools: AITool[] = [
  // Language Models
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    icon: Bot,
    color: 'bg-emerald-600',
    category: 'language',
    credits: { available: 1000, used: 0, total: 1000 },
    costPerRequest: 10
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    provider: 'Anthropic',
    icon: Brain,
    color: 'bg-purple-600',
    category: 'language',
    credits: { available: 1000, used: 0, total: 1000 },
    costPerRequest: 8
  },
  {
    id: 'palm-2',
    name: 'PaLM 2',
    provider: 'Google',
    icon: Bot,
    color: 'bg-blue-600',
    category: 'language',
    credits: { available: 800, used: 0, total: 800 },
    costPerRequest: 6
  },

  // Image Generation
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    icon: Image,
    color: 'bg-rose-600',
    category: 'image',
    credits: { available: 500, used: 0, total: 500 },
    costPerRequest: 15
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    provider: 'Midjourney',
    icon: Palette,
    color: 'bg-indigo-600',
    category: 'image',
    credits: { available: 500, used: 0, total: 500 },
    costPerRequest: 12
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion XL',
    provider: 'Stability AI',
    icon: Wand2,
    color: 'bg-cyan-600',
    category: 'image',
    credits: { available: 600, used: 0, total: 600 },
    costPerRequest: 8
  },

  // Code Generation
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    provider: 'GitHub',
    icon: Code,
    color: 'bg-gray-800',
    category: 'code',
    credits: { available: 800, used: 0, total: 800 },
    costPerRequest: 5
  },
  {
    id: 'codewhisperer',
    name: 'CodeWhisperer',
    provider: 'Amazon',
    icon: Code,
    color: 'bg-orange-600',
    category: 'code',
    credits: { available: 700, used: 0, total: 700 },
    costPerRequest: 4
  },

  // Audio Processing
  {
    id: 'whisper',
    name: 'Whisper',
    provider: 'OpenAI',
    icon: Mic,
    color: 'bg-green-600',
    category: 'audio',
    credits: { available: 300, used: 0, total: 300 },
    costPerRequest: 6
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    provider: 'ElevenLabs',
    icon: Volume2,
    color: 'bg-purple-600',
    category: 'audio',
    credits: { available: 400, used: 0, total: 400 },
    costPerRequest: 7
  },

  // Video Generation
  {
    id: 'runway',
    name: 'Runway Gen-2',
    provider: 'Runway',
    icon: VideoIcon,
    color: 'bg-red-600',
    category: 'video',
    credits: { available: 200, used: 0, total: 200 },
    costPerRequest: 25
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    provider: 'Synthesia',
    icon: Clapperboard,
    color: 'bg-blue-600',
    category: 'video',
    credits: { available: 150, used: 0, total: 150 },
    costPerRequest: 30
  },

  // Research & Analysis
  {
    id: 'perplexity',
    name: 'Perplexity',
    provider: 'Perplexity AI',
    icon: Search,
    color: 'bg-teal-600',
    category: 'research',
    credits: { available: 400, used: 0, total: 400 },
    costPerRequest: 7
  },
  {
    id: 'elicit',
    name: 'Elicit',
    provider: 'Ought',
    icon: BookOpen,
    color: 'bg-purple-600',
    category: 'research',
    credits: { available: 350, used: 0, total: 350 },
    costPerRequest: 8
  },

  // Data Analysis
  {
    id: 'openai-analysis',
    name: 'OpenAI Analysis',
    provider: 'OpenAI',
    icon: BarChart,
    color: 'bg-blue-600',
    category: 'data',
    credits: { available: 500, used: 0, total: 500 },
    costPerRequest: 10
  },
  {
    id: 'anthropic-analysis',
    name: 'Claude Analysis',
    provider: 'Anthropic',
    icon: LineChart,
    color: 'bg-purple-600',
    category: 'data',
    credits: { available: 450, used: 0, total: 450 },
    costPerRequest: 12
  },

  // Security & Privacy
  {
    id: 'openai-moderation',
    name: 'OpenAI Moderation',
    provider: 'OpenAI',
    icon: Shield,
    color: 'bg-red-600',
    category: 'security',
    credits: { available: 600, used: 0, total: 600 },
    costPerRequest: 3
  },
  {
    id: 'anthropic-security',
    name: 'Claude Security',
    provider: 'Anthropic',
    icon: Lock,
    color: 'bg-gray-600',
    category: 'security',
    credits: { available: 550, used: 0, total: 550 },
    costPerRequest: 4
  },

  // Healthcare
  {
    id: 'deepmind-health',
    name: 'DeepMind Health',
    provider: 'Google',
    icon: Stethoscope,
    color: 'bg-green-600',
    category: 'healthcare',
    credits: { available: 300, used: 0, total: 300 },
    costPerRequest: 20
  },
  {
    id: 'microsoft-health',
    name: 'Azure Health Bot',
    provider: 'Microsoft',
    icon: Brain,
    color: 'bg-blue-600',
    category: 'healthcare',
    credits: { available: 250, used: 0, total: 250 },
    costPerRequest: 15
  },

  // Scientific Research
  {
    id: 'alphafold',
    name: 'AlphaFold',
    provider: 'Google',
    icon: Dna,
    color: 'bg-purple-600',
    category: 'science',
    credits: { available: 200, used: 0, total: 200 },
    costPerRequest: 25
  },
  {
    id: 'microsoft-science',
    name: 'Azure Science',
    provider: 'Microsoft',
    icon: Microscope,
    color: 'bg-blue-600',
    category: 'science',
    credits: { available: 180, used: 0, total: 180 },
    costPerRequest: 20
  }
];