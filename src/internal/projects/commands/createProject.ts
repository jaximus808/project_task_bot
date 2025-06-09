import { ChannelType, PresenceUpdateStatus, TextChannel } from "discord.js";
import { OPERATION_TYPE } from "../../../utils/consts";
import { DiscordMessage, HandleMessageReport } from "../../../utils/disc_types";
import { MakeMessageReport } from "../../../utils/helpers";
import { CreateMilestoneGetID, CreateProject, UpdateCurrentProjectMilestone } from "../utils";

const CreateProjectCommand = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport> => {

    if (message.channel.type != ChannelType.GuildText) 
    {
        return MakeMessageReport(false, "Not in a discord server")
    }
    
    if (args.length != 3) {   
        return MakeMessageReport(false, "could not parse instructoons")
    }
    if (!message.guildId) {   
        return MakeMessageReport(false, "Not in a discord server")
    }

    if (!message.channel.parentId) {   
        return MakeMessageReport(false, "Channel must have a parent discord channel")
    }

    const [new_project, proj_err] = await CreateProject(message.guildId, message.channel.parentId, message.channelId);

    // Maybe be more verbose here
    if (proj_err || !new_project) { 
        return MakeMessageReport(false, "failed to create project :(")
    }

    //need to make milestone
    //need to implement validation 
    
    //expectations: [ms_name, milestone_deadline, desc]
    const ms_name = args[0];
    const ms_deadline = new Date(args[1]); 
    const ms_desc = args[2];

    const [ms_id, ms_err] = await CreateMilestoneGetID(new_project.id, ms_name, ms_deadline, ms_desc );

    if (ms_err || !ms_id) { 
        return MakeMessageReport(false, "failed to create project :(")
    }

    const update_err = await UpdateCurrentProjectMilestone(new_project.id, ms_id);

    if(update_err) {
        return MakeMessageReport(false, "failed to update project");
    }

    //then need to make an admin user 

    

    return MakeMessageReport(true, `successfully created project with id: ${new_project.id}!`)

}

export default CreateProjectCommand;