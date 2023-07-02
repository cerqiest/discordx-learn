import {
  CommandInteraction,
  MessageComponentInteraction,
  EmbedBuilder,
} from "discord.js";

export default (
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

  if (interaction instanceof CommandInteraction) {
    interaction.replied || interaction.deferred
      ? interaction.editReply({
          embeds: [newEmbed],
          ...replyOptions,
        })
      : interaction.reply({
          embeds: [newEmbed],
          ...replyOptions,
        });
  } else if (interaction instanceof MessageComponentInteraction) {
    interaction.update({
      embeds: [newEmbed],
      ...replyOptions,
    });
  }
};
