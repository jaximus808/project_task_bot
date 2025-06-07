import { DMChannel, Message, NewsChannel, OmitPartialGroupDMChannel, PartialDMChannel, PrivateThreadChannel, PublicThreadChannel, StageChannel, TextChannel, VoiceChannel } from "discord.js";
import { OPERATION_TYPE } from "./consts";
import { Database } from "../types/database";

export type DiscordChannel = DMChannel | PartialDMChannel | NewsChannel | StageChannel | TextChannel | PublicThreadChannel<boolean> | PrivateThreadChannel | VoiceChannel

export type DiscordMessage = OmitPartialGroupDMChannel<Message<boolean>>

export type HandleMessageReport = {
    success: boolean,
    timestamp: number,
    info: string,
}

export type ProjectDiscord = Database["public"]["Tables"]["Projects"]["Row"]


export type CommandMap = Record<string, (message: DiscordMessage, args: string[]) => Promise<HandleMessageReport>>
