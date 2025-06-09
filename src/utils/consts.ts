export const COMMAND_DELIM = '!'

//example commands date !task add @user [task_name] [date] [desc]
//example commands sprint !task add @user [task_name] sprint_[num] [desc]

/**
* Enum for display state.
* @readonly
* @enum {number}
*/
export enum COMMAND_TYPE  {

    /** @member {number} */
    /** command interfaces with the current project */
    PROJECT, 

    /** @member {number} */
    /* command interfaces with the milestones */
    MILESTONE,

    /** @member {number} */
    /* command interfaces with tasks */
    TASK,

    /** @member {number} */
    /* invalid command */
    FAIL
}

/**
* Enum for display state.
* @readonly
* @enum {number}
*/
export enum OPERATION_TYPE  {

    /** @member {number} */
    /** command interfaces with the current project */
    ADD, 

    /** @member {number} */
    /* command interfaces with the milestones */
    DELETE,

    /** @member {number} */
    /* command interfaces with tasks */
    UPDATE,

    /** @member {number} */
    /* SET command */
    SET,

    /** @member {number} */
    /* ASSIGN command */
    ASSIGN,

    /** @member {number} */
    /* APPROVE command */
    APPROVE,

    /** @member {number} */
    /* APPROVE command */
    REJECT,

    /** @member {number} */
    /* ADD ROLES command */
    ROLES,

    /** @member {number} */
    /* ADD ROLES command */
    PROJECT_CONTROL,

    /** @member {number} */
    /* ADD ROLES command */
    INFO,

    /** @member {number} */
    /* INVALID command */
    FAIL,
    
}

/**
* Enum for user role.
* @readonly
* @enum {number}
*/
export enum USER_ROLE {
    /** @member {number} */
    /** PROJECT LEAD */
    LEAD = 1,
     /** @member {number} */
    /** PROJECT ADMIN */
    ADMIN
}