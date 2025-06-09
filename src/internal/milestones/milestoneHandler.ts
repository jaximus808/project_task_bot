import { DiscordMessage, HandleMessageReport } from "../../utils/disc_types";
import { supabase } from "../../utils/supabase";
import { OPERATION_TYPE, USER_ROLE } from "../../utils/consts";
import { MakeMessageReport } from "../../utils/helpers";
import { OperationAuth } from "../auth/auth";
import { Commands } from "./commandMapper";

//why tf do i have this?
const getOperationType = (arg: string) : OPERATION_TYPE => {
    switch(arg.toLocaleLowerCase()) {
        case "create":
            return OPERATION_TYPE.ADD
        case "delete":
            return OPERATION_TYPE.DELETE
        case "update":
            return OPERATION_TYPE.UPDATE
        case "move":
            return OPERATION_TYPE.PROJECT_CONTROL
        case "to":
            return OPERATION_TYPE.PROJECT_CONTROL
        case "info":
            return OPERATION_TYPE.INFO
        case "map":
            return OPERATION_TYPE.INFO
        default:
            return OPERATION_TYPE.FAIL
    }
}


export const MilestoneHandler = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport>  => {

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