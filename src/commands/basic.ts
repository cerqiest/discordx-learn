import {
  APIEmbedField,
  CommandInteraction,
  EmbedBuilder,
  Colors,
} from "discord.js";
import { Client, Discord, Guard, Slash } from "discordx";
import respond from "../utils/respond.ts";
import { ownerOnly } from "../guards/ownerOnly.ts";

@Discord()
export abstract class Basic {
  @Slash({
    description: "Get the latency between discord and the bot",
  })
  async ping(interaction: CommandInteraction) {
    const fields = [
      {
        name: "Interaction Latency",
        value: `${Date.now() - interaction.createdTimestamp}ms`,
      },
      interaction.client.ws.ping > 0
        ? {
            name: "API Latency",
            value: `${Math.round(interaction.client.ws.ping)}ms`,
          }
        : undefined,
    ].filter((field) => field !== undefined) as APIEmbedField[];

    await respond({
      interaction,
      builtEmbed: new EmbedBuilder()
        .setColor(Colors.Blue)
        .setTitle("Pong!")
        .addFields(...fields),
    });
  }
}
