import {
  CommandInteraction,
  MessageComponentInteraction,
  EmbedBuilder,
  Interaction,
} from "discord.js";
import tag from "./tag.ts";

export default async (
  interaction: CommandInteraction | MessageComponentInteraction,
  builtEmbed: EmbedBuilder,
  replyOptions: any = {}
) => {
  let newEmbed = builtEmbed.setTimestamp().setFooter({
    text: `Requested by ${tag(interaction.user)}`,
    iconURL: interaction.user.displayAvatarURL(),
  });

  if (interaction.replied) {
    await interaction.followUp({
      embeds: [newEmbed],
      ...replyOptions,
    });
    return interaction;
  } else if (interaction.deferred) {
    await interaction.editReply({
      embeds: [newEmbed],
      ...replyOptions,
    });
    return interaction;
  }

  await interaction.reply({
    embeds: [newEmbed],
    ...replyOptions,
  });
  return interaction;
};
