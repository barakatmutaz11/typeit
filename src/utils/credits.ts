import { Credits } from '../types';

export function calculateCreditsUsage(credits: Credits): number {
  return (credits.used / credits.total) * 100;
}

export function formatCredits(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount);
}

export function hasEnoughCredits(credits: Credits, amount: number): boolean {
  return credits.available >= amount;
}