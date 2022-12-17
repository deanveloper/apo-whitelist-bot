import { ApplicationCommandOptionTypes } from "discordeno/mod.ts";
import { Command } from "./mod.ts";

export const whitelist: Command = {
  global: true,
  options: [
    {
      required: true,
      name: "whitelist",
      description: "whitelist",
      type: ApplicationCommandOptionTypes.User,
    },
  ],
  execute: function (payload) {
    return { content: "added to whitelist" };
  },
};
