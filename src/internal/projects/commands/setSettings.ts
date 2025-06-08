import { ChannelType } from "discord.js";
import { OPERATION_TYPE } from "../../../utils/consts";
import { DiscordMessage, HandleMessageReport } from "../../../utils/disc_types";
import { MakeMessageReport } from "../../../utils/helpers";
import { GetCurrentProject, UpdateProjectChannel } from "../utils";

const setSettings = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport> => {
    
    if (message.channel.type != ChannelType.GuildText) 
    {
        return MakeMessageReport(false, "Not in a discord server")
    }
    
    if (args.length < 1) {   
        return MakeMessageReport(false, "Need more parms")
    }
    if (!message.guildId) {   
        return MakeMessageReport(false, "Not in a discord server")
    }

    if (!message.channel.parentId) {   
        return MakeMessageReport(false, "Channel must have a parent discord channel")
    }

    const [ project, error ] = await GetCurrentProject( message.guildId, message.channel.parentId );

    if (error || !project) {
        return MakeMessageReport(false, "Failed to fetch project :(");
    }

    const setting = args[0];


    //TODO
    switch (setting.toLowerCase()) {
        case "output":
            return await setOutputChannel(project.id, message.channelId); 
    }

    return MakeMessageReport(false, "placeholder")

}

const setOutputChannel = async (projectId: number, channelId: string) : Promise<HandleMessageReport> => {
    const error = await UpdateProjectChannel(projectId, channelId);
    if (error) {
        return MakeMessageReport(false, "failed to update :(")
    }
    return MakeMessageReport(false, "successfully set new output channel!")
}

export default setSettings;