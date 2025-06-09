import { DiscordMessage, HandleMessageReport } from "../../../utils/disc_types";
import { SetupProjectContext, MakeMessageReport } from "../../../utils/helpers";


// LOW PRIORITY, DO LATER
const AddRoles = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport> => {

    if (args.length != 2) {   
        return MakeMessageReport(false, "Need more parms")
    }

    const [project, handleError] = await SetupProjectContext(message);
        
    if (handleError) return handleError
    if (!project) return MakeMessageReport(false, "could not find project")

    
    
    return MakeMessageReport(false, "WIP")
}