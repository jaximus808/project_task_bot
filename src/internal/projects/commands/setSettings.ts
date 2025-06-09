import { ChannelType } from "discord.js";
import { OPERATION_TYPE, USER_ROLE } from "../../../utils/consts";
import { DiscordMessage, HandleMessageReport } from "../../../utils/disc_types";
import { SetupProjectContext, MakeMessageReport } from "../../../utils/helpers";
import {  GetCurrentProject, UpdateProjectChannel } from "../utils";
import { OperationAuth } from "../../auth/auth";

const SetProjectSettings = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport> => {
    
 
    if (args.length < 1) {   
        return MakeMessageReport(false, "Need more parms")
    }
    
    const [project, handleError] = await SetupProjectContext(message);
    
    if (handleError) return handleError
    if (!project) return MakeMessageReport(false, "could not find project")

    if (!OperationAuth(message.author.id, USER_ROLE.ADMIN, project.id )) {
         return MakeMessageReport(false, "Incorrect permissions")
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

export default SetProjectSettings;