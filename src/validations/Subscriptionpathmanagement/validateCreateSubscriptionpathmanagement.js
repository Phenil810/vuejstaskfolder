
import validator from 'validator';

const validateCreateSubscriptionpathmanagement = (data) => {
    let errors = {};

    const { title, status} = data;

    if (validator.isEmpty(title)) {
        errors.title = '제목을 입력하세요';
    }

    if (validator.isEmpty(status)) {
        errors.status = '상태를 선택하십시오';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateSubscriptionpathmanagement;