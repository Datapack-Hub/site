import { API } from "$lib/globals/consts";
import { serverGetAuthed } from "$lib/globals/functions";
import { roleSchema, userSchema, type Role } from "$lib/globals/schema";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies, fetch }) => {
  const cookie = cookies.get("dph_token");

  const roleResponse = await fetch(`${API}/user/staff/roles`);
  const rolesJson = await roleResponse.json();
  if (cookie) {
    const userResponse = await serverGetAuthed("/user/me", cookies, fetch);

    if (!userResponse.ok) {
      cookies.delete("dph_token")
      return;
    }

    const user = await userSchema.parseAsync(await userResponse.json());
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const role = roleSchema
      .array()
      .parse(rolesJson.roles)
      .find((v: Role) => v.name === user.role)!;

    return {
      user,
      role,
      roles: rolesJson.roles
    };
  }
  return {
    roles: rolesJson.roles
  };
}) satisfies LayoutServerLoad;
