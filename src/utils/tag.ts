import { User } from "discord.js"

export default (user: User) => user.discriminator === "0000" ? true : false