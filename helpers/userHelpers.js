export const databaseErrorHandlingFunction = (error) => {
    const errorMessages = {
        username :'',
        email: '',
        password: '',
    };

    if(error.message.includes('User validation failed:')){
        Object.values(error.errors).forEach(({properties}) => {
            errorMessages[properties.path] = properties.message;
        });
    };
    if(error.code === 11000){
        Object.keys(error.keyValue).forEach(key => {
            errorMessages[key] = `${error.keyValue[key]} is already in use.`
        })
    }

    return errorMessages;
}