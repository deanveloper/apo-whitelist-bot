import { Interaction } from "discordeno/mod.ts";

import { Command } from "template/commands/mod.ts";

export async function hasPermissionLevel(
  command: Command,
  payload: Interaction,
) {
  // This command doesnt require a perm level so allow the command.
  if (!command.permissionLevels) return true;

  // If a custom function was provided
  if (typeof command.permissionLevels === "function") {
    return await command.permissionLevels(payload, command);
  }

  // None of the perm levels were met. So cancel the command
  return false;
}

export const PermissionLevelHandlers: Record<
  string,
  (payload: Interaction, command: Command) => boolean | Promise<boolean>
> = {
  MEMBER: () => true,
  MODERATOR: (payload) => Boolean(payload.member?.permissions),
  ADMIN: (payload) => Boolean(payload.member?.permissions),
  // TODO: Add your user id here and anyone else you want to give access to.
  BOT_OWNERS: (payload) =>
    [""].includes((payload.member?.user?.id || payload.user?.id!).toString()),
};

export enum PermissionLevels {
  MEMBER,
  MODERATOR,
  ADMIN,
  SERVER_OWNER,
  BOT_SUPPORT,
  BOT_DEVS,
  BOT_OWNER,
}
