import { Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import { Client, Next } from "discordx";
import respond from "../utils/respond.js";

export async function ownerOnly(
  arg: CommandInteraction,
  client: Client,
  next: Next
) {
  if (arg.user.id === process.env.OWNER_ID) {
    await next();
  } else {
    await respond({
      interaction: arg,
      builtEmbed: new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle("Error")
        .setDescription(
          "You are lacking the required permission(s) to use this command. If you believe this is an error, please contact the bot owner."
        ),
      replyOptions: {
        ephemeral: true,
      },
    });
  }
}
