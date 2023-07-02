import { APIEmbedField, CommandInteraction, EmbedBuilder } from "discord.js";
import { Client, Discord, Guard, Slash } from "discordx";
import respond from "../utils/respond.ts";
import Colors from "../utils/colors.ts";
import { ownerOnly } from "../guards/ownerOnly.ts";

@Discord()
export abstract class Basic {
  @Slash({
    description: "Get the latency between discord and the bot",
  })
  async ping(interaction: CommandInteraction) {
    const fields = [
      {
        name: "Interaction Latency (new)",
        value: `${Date.now() - interaction.createdTimestamp}ms`,
      },
      interaction.client.ws.ping > 0
        ? {
            name: "API Latency",
            value: `${Math.round(interaction.client.ws.ping)}ms`,
          }
        : undefined,
    ].filter((field) => field !== undefined) as APIEmbedField[];

    await respond(
      interaction,
      new EmbedBuilder()
        .setColor(Colors.WHITE)
        .setTitle("Pong!")
        .addFields(...fields)
    );
  }

  @Slash({
    description: "Reload the bot's commands",
  })
  @Guard(ownerOnly)
  async reload(interaction: CommandInteraction, client: Client) {
    await client.clearApplicationCommands();
    await client.initApplicationCommands();

    await respond(
      interaction,
      new EmbedBuilder()
        .setColor(Colors.WHITE)
        .setTitle("Success")
        .setDescription("All commands have been reloaded successfully.")
    );
  }
}
