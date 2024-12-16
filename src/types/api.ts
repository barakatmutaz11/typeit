// API related types
export interface APIKey {
  id: string;
  tool: AITool;
  key: string;
  status: 'active' | 'expired' | 'revoked' | 'rate_limited';
  createdAt: Date;
  lastUsed: Date;
  expiresAt?: Date;
  usage: {
    totalRequests: number;
    dataProcessed: number;
    cost: number;
  };
  rateLimit: {
    requests: number;
    period: string;
  };
}

export interface APIConnection {
  id: string;
  tool: AITool;
  status: 'connected' | 'failed' | 'pending';
  lastChecked: Date;
  lastError: string | null;
  config: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  metrics: {
    uptime: number;
    latency: number;
    successRate: number;
  };
}