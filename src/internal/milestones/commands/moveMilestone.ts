import { DiscordMessage, HandleMessageReport } from "../../../utils/disc_types";
import { MakeMessageReport, SetupProjectContext } from "../../../utils/helpers";
import { supabase } from "../../../utils/supabase";

const MoveMilestone = async (message: DiscordMessage, args: string[]) : Promise<HandleMessageReport> => {

    if (args.length != 1) {   
        return MakeMessageReport(false, "Incorrect parms")
    }

    const [project, handleError] = await SetupProjectContext(message);
        
    if (handleError) return handleError
    if (!project) return MakeMessageReport(false, "could not find project")

    if (!project.current_mid) return MakeMessageReport(false, "project has no active milestone??")

    const {data: currentMilestone, error: currentError } = await supabase.from("Milestones").select("due_date").eq("id", project.current_mid).single() 

    if (currentError || !currentMilestone) {
        return MakeMessageReport(false, "couldn't find milestone, gg?")
    }

    const direction = args[0].toLowerCase();
    if (direction === "next") {
        const { data: nextMilestone, error : recentMsERROR } = await supabase.from("Milestones")
            .select("id")
            .eq("project_id", project.id)
            .gt("due_date", currentMilestone.due_date)
            .order('due_date', { ascending: true })// earliest of the remaining
            .limit(1)
            .single()
        
        if (recentMsERROR || !nextMilestone) {
            return MakeMessageReport(false, "no next milestone exists!")
        }
        const { error } = await supabase.from("Projects").update({
            current_mid: nextMilestone.id
        }).eq("id", project.id)

        if (error) {
            return MakeMessageReport(false, "couldn't update prject???")
        }

        return MakeMessageReport(true, "Moved to next milesstone!")
        
    }
    else if (direction === "prev") {
        const { data: prevMilestone, error : prevMsERROR } = await supabase.from("Milestones")
            .select("id")
            .eq("project_id", project.id)
            .lt("due_date", currentMilestone.due_date)
            .order('due_date', { ascending: false })// earliest of the remaining
            .limit(1)
            .single()
        
        if (prevMsERROR || !prevMilestone) {
            return MakeMessageReport(false, "no next milestone exists!")
        }
        const { error } = await supabase.from("Projects").update({
            current_mid: prevMilestone.id
        }).eq("id", project.id)

        if (error) {
            return MakeMessageReport(false, "couldn't update prject???")
        }
        return MakeMessageReport(true, "Moved to prev milesstone!")
    }

    return MakeMessageReport(false, "expected next or prev :(")
}

export default MoveMilestone