import { Dictionaries, Dictionary } from '../data/dictionaries';

export type Translation = {
  key: string;
  name: string;
};

export function getDictionary(language: string, dictionaries: Dictionaries): Dictionary {
  return dictionaries[language] ?? Object.values(dictionaries)[0];
}

export function translate(key: string, dictionary: Dictionary | null): string {
  if (!dictionary) return key;
  return dictionary[key] ?? key;
}

export function translateToPair(key: string, dictionary: Dictionary | null): Translation {
  return { key, name: translate(key, dictionary) };
}

export function translateToPairs(keys: string[], dictionary: Dictionary | null): Translation[] {
  return keys.map((key) => translateToPair(key, dictionary));
}
