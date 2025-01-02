import { z } from 'zod';

export const enum SupportedLanguages {
  EN_EN = 'en-EN',
  RU_RU = 'ru-RU',
}

export const languageSchema = z.enum([
  SupportedLanguages.EN_EN,
  SupportedLanguages.RU_RU,
]);

export type Language = z.infer<typeof languageSchema>;
