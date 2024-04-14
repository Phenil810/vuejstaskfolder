
import validator from 'validator';

const validateCreateTag = (data) => {
    let errors = {};

    const { name, color , status} = data;

    if (validator.isEmpty(name)) {
        errors.name = '이름을 입력하세요';
    }

    if (validator.isEmpty(color)) {
        errors.color = '하나를 고르시 오';
    }

    if (validator.isEmpty(status)) {
        errors.status = '상태를 선택하십시오';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateTag;
