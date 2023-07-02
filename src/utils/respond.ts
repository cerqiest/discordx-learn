import {
  CommandInteraction,
  MessageComponentInteraction,
  EmbedBuilder,
} from "discord.js";
import tag from "./tag.ts";

export default async (
  interaction: CommandInteraction | MessageComponentInteraction,
  builtEmbed: EmbedBuilder,
  replyOptions?: any
) => {
  let newEmbed = builtEmbed.setTimestamp().setFooter({
    text: `Requested by ${tag(interaction.user)}`,
    iconURL: interaction.user.displayAvatarURL(),
  });

  if (interaction.replied) {
    console.log("is replied");
    await interaction.followUp({
      embeds: [newEmbed],
      ...replyOptions,
    });
  } else if (interaction.deferred) {
    console.log("is deferred");
    await interaction.editReply({
      embeds: [newEmbed],
      ...replyOptions,
    });
  } else {
    console.log("is and not replied or deferred");
    await interaction.reply({
      embeds: [newEmbed],
      ...replyOptions,
    });
  }
};
