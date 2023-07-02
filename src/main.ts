import { dirname, importx } from "@discordx/importer";
import type { Interaction } from "discord.js";
import {
  CommandInteraction,
  EmbedBuilder,
  IntentsBitField,
  MessageComponentInteraction,
} from "discord.js";
import { Client } from "discordx";
import respond from "./utils/respond.ts";
import Colors from "./utils/colors.ts";

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

bot.on("interactionCreate", (interaction: Interaction) => {
  try {
    bot.executeInteraction(interaction);
  } catch (e) {
    console.log("caught error");

    if (
      !(interaction instanceof CommandInteraction) &&
      !(interaction instanceof MessageComponentInteraction)
    ) {
      console.error(e);
      return;
    }

    respond(
      interaction,
      new EmbedBuilder()
        .setColor(Colors.RED)
        .setTitle("Error")
        .setDescription(
          "An unexepected error occured while processing your request. Please try again later."
        )
    );
  }
});

async function run() {
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  await bot.login(process.env.BOT_TOKEN);
}

run();
