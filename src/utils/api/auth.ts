import { User, AuthResponse } from '../../types';

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'admin@example.com' && password === 'admin') {
    return {
      user: {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        lastActive: new Date(),
        stats: {
          totalApiCalls: 1250,
          creditsUsed: 8500,
          successRate: 98.5,
          monthlyUsage: [300, 450, 600, 500, 800, 700]
        },
        permissions: ['view_analytics', 'manage_users', 'manage_api_keys'],
        apiKey: 'sk_test_123',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User'
      },
      token: 'mock_token_123'
    };
  }
  
  throw new Error('Invalid credentials');
}

export async function socialLogin(provider: string, data: any): Promise<AuthResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    user: {
      id: `${provider.toLowerCase()}_${Date.now()}`,
      email: data.email,
      name: data.name,
      role: 'user',
      status: 'active',
      lastActive: new Date(),
      stats: {
        totalApiCalls: 0,
        creditsUsed: 0,
        successRate: 100,
        monthlyUsage: [0, 0, 0, 0, 0, 0]
      },
      permissions: ['view_analytics'],
      apiKey: `sk_${Math.random().toString(36).slice(2)}`,
      avatar: data.avatar
    },
    token: `mock_token_${provider.toLowerCase()}`
  };
}