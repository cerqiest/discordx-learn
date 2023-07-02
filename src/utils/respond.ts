import {
  CommandInteraction,
  MessageComponentInteraction,
  EmbedBuilder,
} from "discord.js";

export default async (
  interaction: CommandInteraction | MessageComponentInteraction,
  builtEmbed: EmbedBuilder,
  replyOptions?: any
) => {
  let newEmbed = builtEmbed
    .setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp()
    .setFooter({
      text: `Requested by ${interaction.user.tag}`,
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
