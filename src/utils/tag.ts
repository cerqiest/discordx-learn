import { User } from "discord.js";

export default (user: User) =>
  user.discriminator === "0" ? `@${user.username}` : user.tag;
