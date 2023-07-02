import {
  CommandInteraction,
  MessageComponentInteraction,
  EmbedBuilder,
  Interaction,
} from "discord.js";
import tag from "./tag.ts";

type RespondOptions = {
  interaction: CommandInteraction | MessageComponentInteraction;
  builtEmbed: EmbedBuilder;
  editMessageIfAlreadyReplied?: boolean;
  replyOptions?: any;
};

export default async (options: RespondOptions) => {
  let newEmbed = options.builtEmbed.setTimestamp().setFooter({
    text: `Requested by ${tag(options.interaction.user)}`,
    iconURL: options.interaction.user.displayAvatarURL(),
  });

  if (options.interaction.replied && !options.editMessageIfAlreadyReplied) {
    await options.interaction.followUp({
      embeds: [newEmbed],
      ...options.replyOptions,
    });
    return options.interaction;
  } else if (
    options.interaction.deferred ||
    options.editMessageIfAlreadyReplied
  ) {
    await options.interaction.editReply({
      embeds: [newEmbed],
      ...options.replyOptions,
    });
    return options.interaction;
  }

  await options.interaction.reply({
    embeds: [newEmbed],
    ...options.replyOptions,
  });
  return options.interaction;
};
