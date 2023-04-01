import {serverErrorMessage} from '../utils/responseMessagesUtils.js'
export const databaseErrorHandlingFunction = (error) => {
    const errorMessages = {
        username :'',
        email: '',
        password: '',
        dateOfBirth: '',
        age: '',
        description: '',
        img: ''
    };

    if(error.message.toLowerCase().includes('validation failed:')){
        Object.values(error.errors).forEach(({properties}) => {
            errorMessages[properties.path] = properties.message;
        });
    };
    if(error.code === 11000){
        Object.keys(error.keyValue).forEach(key => {
            errorMessages[key] = `${key} is not available, choose new Username.`
        })
    }
    
    return Object.values(errorMessages).every(value => value == '') 
    ? {error: serverErrorMessage}
    : errorMessages;
}