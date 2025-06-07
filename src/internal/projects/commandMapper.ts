import { OPERATION_TYPE } from "../../utils/consts";
import { CommandMap, DiscordMessage } from "../../utils/disc_types";
import CreateProjectCommand from "./commands/createProject";

export const Commands : CommandMap = {
    "add": CreateProjectCommand
}

