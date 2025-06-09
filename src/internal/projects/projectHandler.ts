import { DiscordMessage, HandleMessageReport } from "../../utils/disc_types";
import { supabase } from "../../utils/supabase";
import { OPERATION_TYPE, USER_ROLE } from "../../utils/consts";
import { MakeMessageReport } from "../../utils/helpers";
import { OperationAuth } from "../auth/auth";
import { Commands } from "./commandMapper";


const getOperationType = (arg: string) : OPERATION_TYPE => {
    switch(arg.toLocaleLowerCase()) {
        case "start":
            return OPERATION_TYPE.ADD
        case "set":
            return OPERATION_TYPE.SET
        case "add":
            return OPERATION_TYPE.ROLES
        case "remove":
            return OPERATION_TYPE.ROLES
        case "pause":
            return OPERATION_TYPE.PROJECT_CONTROL
        case "resume":
            return OPERATION_TYPE.PROJECT_CONTROL
        case "complete":
            return OPERATION_TYPE.PROJECT_CONTROL
        case "info":
            return OPERATION_TYPE.INFO
        case "team":
            return OPERATION_TYPE.INFO
        default:
            return OPERATION_TYPE.FAIL
    }
}


export const ProjectCommandHandler = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport>  => {

    const command_intent = getOperationType(args[1])

    if (command_intent === OPERATION_TYPE.FAIL) {
        return MakeMessageReport(false, "Given command does not exist for projects")
    }



    const command = args[2].toLowerCase()
    if (command in Commands) {
        const operationMethod = Commands[command];
        return await operationMethod(message, args.slice(2))
    }

    return MakeMessageReport(false, "Given command does not exist for projects")

    // return await processCommand(message, command_intent, args.slice(2))

     

}