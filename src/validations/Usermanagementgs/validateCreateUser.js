
import validator from 'validator';

const validateCreateUser = (data) => {
    let errors = {};

    const { address} = data;

    // if (validator.isEmpty(apartment_id)) {
    //     errors.apartment_id = 'Please Select One Apartement';
    // }

    
    if (validator.isEmpty(address)) {
        errors.address = '주소를 입력하세요';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateUser;
