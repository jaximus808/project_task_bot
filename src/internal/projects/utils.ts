import { PostgrestError } from "@supabase/supabase-js"
import { supabase } from "../../utils/supabase"
import { ProjectDiscord } from "../../utils/disc_types"
import { GeneratePostError } from "../../utils/helpers"



export const CreateMilestoneGetID = async (proj_id: number, ms_name: string, ms_deadline: Date, ms_desc: string) : Promise<[number | null, PostgrestError|null]> => {
    const response = await supabase.from("Milestones").insert({
        display_name: ms_name, 
        description: ms_desc,
        due_date: ms_deadline.getTime().toString(),
        project_id: proj_id
    }).select("id")
    .single()

    return [response.data ? response.data.id : null, response.error]
} 

export const UpdateCurrentProjectMilestone = async (proj_id: number, ms_id: number) : Promise<PostgrestError|null>  => {
    const { error } = await supabase.
        from("Projects").
        update({
            current_mid: ms_id
    }).eq("id", proj_id)
    return error;
} 

// need to make this shit 
export const GetCurrentProject = async (guild_id: string, pchannel_id: string) : Promise<[ProjectDiscord|null, PostgrestError|null]> => {
    const { data: activeProject, error: activeError } = await supabase
        .from("ActiveProjects")
        .select("project_id")
        .eq("pChannelId", pchannel_id)
        .eq("guildId", guild_id)
        .single()
        
    if ( activeError ) {
        return [ null, activeError ];
    }
    
    if ( !activeProject.project_id ) {
        return [ null, GeneratePostError("active project has no id??") ];
    }
    
    const { data: projectInfo, error: projectError } = await supabase
        .from("Projects")
        .select("*")
        .eq("id", activeProject.project_id)
        .eq("guildId", guild_id)
        .single();

    if ( projectError ) {
        return [null, projectError];
    }

    return [ projectInfo as ProjectDiscord, null ];
}


export const CreateProject = async (guild_id: string, pchannel_id: string, output_channel_id: string) : Promise<[any| null, PostgrestError|null]> => {
    const {data, error} = await supabase.from("Projects").insert({
        guild_id: guild_id,
        pchannel_id: pchannel_id,
        sprint_msg: "Sprint Message: ",
        output_channel: output_channel_id
    }).select()
    .single()  

    return [data, error]
} 

export const UpdateProjectChannel = async (project_id: number, output_channel: string) : Promise<PostgrestError|null> => {
    const { error } = await supabase.from("Projects").update({
        output_channel: output_channel
    }).eq("id", project_id)

    return error;
}
