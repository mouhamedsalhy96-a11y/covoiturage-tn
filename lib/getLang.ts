
import { cookies } from "next/headers";
import { defaultLang, isValidLang, type Lang } from "@/lib/i18n";

export async function getLang(): Promise<Lang> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;

  if (lang && isValidLang(lang)) {
    return lang;
  }

  return defaultLang;
}
