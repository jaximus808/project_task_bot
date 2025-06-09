import { DiscordMessage, HandleMessageReport } from "../../../utils/disc_types"
import { SetupProjectContext, MakeMessageReport } from "../../../utils/helpers"
import { CreateMilestoneGetID } from "../../projects/utils";

const CreateMilestone = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport> => {

    if (args.length < 3) {   
        return MakeMessageReport(false, "Incorrect parms, expected [name] [deadline MM/DD/YYYY] [desc]")
    }


    const [project, handleError] = await SetupProjectContext(message);
        
    if (handleError) return handleError
    if (!project) return MakeMessageReport(false, "could not find project")

    const [ms_name, due_date_str, ...desc_array] = args;

    const desc = desc_array.join(" ")
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(\d{4})$/;
    const match = due_date_str.match(regex);
    if (!match) {
        throw new Error('Date must be in MM/DD/YYYY format');
    }

    const [, mm, dd, yyyy] = match;
    const month = Number(mm);
    const day   = Number(dd);
    const year  = Number(yyyy);
    const due_date = new Date(due_date_str)

    if (
        due_date.getFullYear() !== year ||
        due_date.getMonth()    !== month - 1 ||
        due_date.getDate()     !== day
    ) {
        return MakeMessageReport(false, "Invalid calendar date")
    }

    const [milestoneId, error] = await CreateMilestoneGetID(project.id, ms_name, due_date, desc)

    if(error) {
        return MakeMessageReport(false, "failed to create milestone")
    }

    
    return MakeMessageReport(true, `Created milestone with id: ${milestoneId}`);
}

export default CreateMilestone