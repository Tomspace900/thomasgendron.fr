import { cookies } from "next/headers";
import { defaultSkin, isSkin, type Skin } from "@/components/skins/meta";

export const SKIN_COOKIE = "skin";

/** Côté serveur : skin depuis le cookie, défaut riso. */
export async function getSkin(): Promise<Skin> {
  const store = await cookies();
  const value = store.get(SKIN_COOKIE)?.value;
  return isSkin(value) ? value : defaultSkin;
}
