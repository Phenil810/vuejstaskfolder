
import validator from 'validator';

const validateCreateAdminUserManagement = (data) => {
    let errors = {};

    const { email} = data;

    // if (validator.isEmpty(apartment_id)) {
    //     errors.apartment_id = 'Please Select One Apartement';
    // }

    
    if (validator.isEmpty(email)) {
        errors.email = '이메일을 입력하세요';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateAdminUserManagement;
