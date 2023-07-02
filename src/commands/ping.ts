import { PermissionFlagsBits, type CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import respond from "../utils/respond.ts";
import { EmbedBuilder } from "@discordjs/builders";
import Colors from "../utils/colors.ts";

@Discord()
export abstract class Ping {
  @Slash({
    description: "Get the latency between discord and the bot",
    defaultMemberPermissions: PermissionFlagsBits.SendMessages,
  })
  async ping(interaction: CommandInteraction) {
    await respond(
      interaction,
      new EmbedBuilder()
        .setColor(Colors.WHITE)
        .setTitle("Pong!")
        .addFields(
          {
            name: "Interaction Latency",
            value: `${Date.now() - interaction.createdTimestamp}ms`,
          },
          {
            name: "API Latency",
            value: `${Math.round(interaction.client.ws.ping)}ms`,
          }
        )
    );

    await respond(
      interaction,
      new EmbedBuilder()
        .setColor(Colors.WHITE)
        .setTitle("Pong!")
        .setDescription(
          `The type of your discriminator is ${typeof interaction.user
            .discriminator} and its value is ${interaction.user.discriminator}`
        )
    );
  }
}
