export const _404_Message = (_case) => {
    return `Sorry ${_case} not found.`
}

export const serverErrorMessage = `Sorry, there is a server error.`;

export const forbidenMessage = (action, _case) => {
    return `You can only ${action} your own ${_case}.`
}
