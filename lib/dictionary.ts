import { cookies } from "next/headers";
import {
  defaultLocale,
  dictionaries,
  isLocale,
  type Dictionary,
  type Locale,
} from "@/content/i18n";

export const LOCALE_COOKIE = "locale";

/** Côté serveur : locale depuis le cookie, défaut FR. */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : defaultLocale;
}

export async function getDictionary(): Promise<{
  locale: Locale;
  dict: Dictionary;
}> {
  const locale = await getLocale();
  return { locale, dict: dictionaries[locale] };
}
