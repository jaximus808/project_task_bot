import { PostgrestError } from "@supabase/supabase-js"
import { DiscordMessage, HandleMessageReport, ProjectDiscord } from "./disc_types"
import { ChannelType } from "discord.js"
import { GetCurrentProject } from "../internal/projects/utils"

export const MakeMessageReport = (success:boolean, message: string) : HandleMessageReport => {
    return {
        success: success,
        timestamp: Date.now(),
        info: message
    }
}

export const GeneratePostError = (message: string) : PostgrestError => {
    return new PostgrestError({
        message: message,
        hint: "",
        details: message, 
        code: "fail"
    })
}


export const SetupProjectContext = async (message: DiscordMessage) : Promise<[ProjectDiscord|null,HandleMessageReport|null]> => {

    if (message.channel.type != ChannelType.GuildText) 
    {
        return [null, MakeMessageReport(false, "Not in a discord server")]
    }
    
    if (!message.guildId) {   
        return [null, MakeMessageReport(false, "Not in a discord server")]
    }

    if (!message.channel.parentId) {   
        return [null, MakeMessageReport(false, "Channel must have a parent discord channel")]
    }

    const [ project, error ] = await GetCurrentProject( message.guildId, message.channel.parentId );

    if (error || !project) {
        return [null, MakeMessageReport(false, "Failed to fetch project :(")];
    }

    return [project, null]

}