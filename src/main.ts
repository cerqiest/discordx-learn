import { dirname, importx } from "@discordx/importer";
import type { Interaction } from "discord.js";
import {
  Colors,
  CommandInteraction,
  EmbedBuilder,
  IntentsBitField,
  MessageComponentInteraction,
} from "discord.js";
import { Client } from "discordx";
import respond from "./utils/respond.js";

export const bot = new Client({
  botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
  silent: false,
});

bot.once("ready", async () => {
  await bot.initApplicationCommands();

  //  await bot.clearApplicationCommands(
  //    ...bot.guilds.cache.map((g) => g.id)
  //  );

  console.log("Bot started");
});

bot.on("interactionCreate", async (interaction: Interaction) => {
  try {
    await bot.executeInteraction(interaction);
  } catch (e) {
    if (
      !(interaction instanceof CommandInteraction) &&
      !(interaction instanceof MessageComponentInteraction)
    ) {
      console.error("An error occured while processing an interaction");
      console.error(e);
      return;
    }

    console.error(
      `An error occured while processing an interaction from ${interaction.user.tag} (${interaction.user.id})`
    );
    console.error(e);

    await respond({
      interaction,
      builtEmbed: new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle("Error")
        .setDescription(
          "An unexepected error occured while processing your request. Please try again later."
        ),
      replyOptions: {
        ephemeral: true,
      },
    });
  }
});

async function run() {
  await importx(
    `${dirname(import.meta.url)}/{events,commands,guards}/**/*.{ts,js}`
  );

  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  await bot.login(process.env.BOT_TOKEN);
}

run();
