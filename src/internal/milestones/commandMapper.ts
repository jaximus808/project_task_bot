import { OPERATION_TYPE } from "../../utils/consts";
import { CommandMap, DiscordMessage } from "../../utils/disc_types";
import MoveMilestone from "./commands/moveMilestone";

export const Commands : CommandMap = {
    "move": MoveMilestone
}

