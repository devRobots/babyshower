'use server';

import { getConfig as getConf } from '@/lib/config';

export function getConfig() {
  return getConf();
}