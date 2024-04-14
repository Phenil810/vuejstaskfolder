
import validator from 'validator';

const validateCreateHoneyHistory = (data) => {
    let errors = {};

    const { points, transaction_type, reason, } = data;

    // if (validator.isEmpty(apartment_id)) {
    //     errors.apartment_id = 'Please Select One Apartement';
    // }

    
    if (validator.isEmpty(points)) {
        errors.points = '포인트 입력';
    }

    if (validator.isEmpty(transaction_type)) {
        errors.transaction_type = '거래 유형 선택';
    }

    if (validator.isEmpty(reason)) {
        errors.reason = '이유 입력';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateHoneyHistory;
