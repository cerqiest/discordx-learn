import { GuardFunction, ArgsOf } from "discordx";

export const ownerOnly: GuardFunction<ArgsOf<"interactionCreate">> = async (
  [interaction]: ArgsOf<"interactionCreate">,
  client,
  next
) => {
  if (interaction.user.id === process.env.OWNER_ID) {
    await next();
  }
};
