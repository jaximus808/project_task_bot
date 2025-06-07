import { PostgrestError } from "@supabase/supabase-js"
import { HandleMessageReport } from "./disc_types"

export const MakeMessageReport = (success:boolean, message: string) : HandleMessageReport => {
    return {
        success: success,
        timestamp: Date.now(),
        info: message
    }
}

export const GeneratePostError = (message: string) : PostgrestError => {
    return new PostgrestError({
        message: message,
        hint: "",
        details: message, 
        code: "fail"
    })
}