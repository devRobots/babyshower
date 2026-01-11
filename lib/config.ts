import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export interface Config {
  seo: {
    title: string;
    description: string;
    url: string;
  };
  baby: {
    name: string;
    gender: string;
  }
  parents: {
    mom: string;
    dad: string;
  };
  event: {
    date: string;
    dateISO: string;
    time: string;
    location: {
      address: string;
      googleMapsUrl: string;
    };
  };
  reminders: {
    days: number[];
  };
}

export function getConfig(): Config {
  const configPath = path.join(process.cwd(), 'config.yml');
  const fileContents = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(fileContents) as Config;
  return config;
}