'use server';

import { getConfig as getConf } from '@/lib/config';

export async function getConfig() {
  return getConf();
}