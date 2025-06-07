import { Message, OmitPartialGroupDMChannel } from "discord.js"
import { COMMAND_TYPE } from "../../utils/consts"
import { BUILTIN_MESSAGES } from "../../utils/builtin_messages" 
import { DiscordMessage, HandleMessageReport } from "../../utils/disc_types"
import { ProjectCommandHandler } from "../projects/projectHandler"

import { MakeMessageReport } from "../../utils/helpers";


const getCommandType = (arg: string) : COMMAND_TYPE => {

    switch (arg.toLocaleLowerCase()) {
        case "project":
            return COMMAND_TYPE.PROJECT
        case "milestone":
            return COMMAND_TYPE.MILESTONE
        case "task":
            return COMMAND_TYPE.TASK
    }
    return COMMAND_TYPE.FAIL
}


// Returns the bot logic based on a command
export const HandleMessage = async (message: DiscordMessage) : Promise<HandleMessageReport> => {
    
    const command_args = message.content.substring(1).split(" ");

    const command_type = getCommandType(command_args[0]);
    
    if (command_type === COMMAND_TYPE.FAIL) {
        message.channel.send(BUILTIN_MESSAGES.INVALID_COMMAND);
        return MakeMessageReport(false, "Invalid command");
    } 
    else if (command_type === COMMAND_TYPE.PROJECT) {
        return await ProjectCommandHandler(message, command_args);
    }


    return MakeMessageReport(false, "Did not complete")
}