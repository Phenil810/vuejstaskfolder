
import validator from 'validator';

const validateCreateAdminUser = (data) => {
    let errors = {};
    
    const { username,apartment_id,address,year_of_birth,gender,subscription_method,type_of_family,children} = data;

    if (validator.isEmpty(username)) {
        errors.username = '이름을 입력하세요';
    }

    if (validator.isEmpty(apartment_id)) {
        errors.apartment_id = '아파트를 선택하세요';
    }

    if (validator.isEmpty(address)) {
        errors.address = '주소를 입력하세요';
    }


    if (validator.isEmpty(year_of_birth)) {
        errors.year_of_birth = '생년월일을 선택하세요';
    }


    if(validator.isEmpty(gender)){
        errors.gender = '성별을 선택하세요';
    }

    if(validator.isEmpty(subscription_method)){
        errors.subscription_method = '구독방법을 선택하세요';
    }

    if(validator.isEmpty(type_of_family)){
        errors.type_of_family = '가족형태를 선택하세요';
    }

    if(validator.isEmpty(children)){
        errors.children = '자녀수를 선택하세요';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateAdminUser;