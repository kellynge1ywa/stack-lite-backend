import joi from 'joi'


export const userRegistrationSchema=joi.object({
    Fullname:joi.string().required().min(5),
    Email:joi.string().email().required(),
    Username:joi.string().required().min(5),
    User_password:joi.string().pattern(new  RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$`))
    .required(),
    // Confirm_password:joi.ref('Password')

})