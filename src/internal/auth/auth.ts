import { COMMAND_TYPE, OPERATION_TYPE, USER_ROLE } from "../../utils/consts";
import { supabase } from "../../utils/supabase";


// TODO: Do this, For now just have this 
export const OperationAuth = async (user_id: string, required_min: USER_ROLE, project_id: number) : Promise<boolean> => {
    const { data: user, error } = await supabase.from("Roles")
            .select("role_level")
            .eq("user_id", user_id)
            .eq("project_id", project_id)
            .single()

    if (error || !user) {
        return false;
    }
    return user.role_level >= required_min;
}