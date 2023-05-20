import { apiURL } from "$lib/globals/consts";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { browser } from "$app/environment";
import { fetchAuthed } from "$lib/globals/functions";

export const load = (async ({ params, fetch }) => {
  if (browser) {
    const [projectReq, versionsReq, rolesReq] = await Promise.all([
      fetchAuthed("get",`${apiURL}/projects/get/${params.slug}`),
      fetchAuthed("get",`${apiURL}/versions/project/url/${params.slug}`),
      fetchAuthed("get",`${apiURL}/user/staff/roles`),
    ]);

    if (projectReq.ok && versionsReq.ok && rolesReq.ok) {
      const project = (await projectReq.json()) as Project;
      const versions = (await versionsReq.json()).result as Version[];
      const roles = (await rolesReq.json()).roles as Role[];

      return {
        project: project,
        versions: versions,
        roles: roles,
      };
    } else if (projectReq.status == 404) {
      throw error(404, {
        message: "Project not found",
        description: "Why not go ahead and turn the idea into a reality?",
      });
    }
    return {};
  }
}) satisfies PageLoad;
