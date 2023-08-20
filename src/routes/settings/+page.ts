import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";
import { userSchema } from "$lib/globals/schema";
import { roles } from "$lib/globals/stores";
import type { PageLoad } from "./$types";
import { get } from "svelte/store";

export const load = (async () => {
  if (browser) {
    const meResponse = await fetchAuthed("GET", "/user/me");
    const profile = await userSchema.parseAsync(await meResponse.json());

    return {
      profile,
      role: get(roles).find((v) => {
        profile.role === v.name;
      }),
    };
  }
  return {};
}) satisfies PageLoad;
