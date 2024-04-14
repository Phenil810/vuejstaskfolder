
import validator from 'validator';

const validatevipCreateUser = (data) => {
    let errors = {};

    const { startDate , endDate} = data;

    // if (validator.isEmpty(apartment_id)) {
    //     errors.apartment_id = 'Please Select One Apartement';
    // }

    
    if (validator.isEmpty(startDate)) {
        errors.startDate = '시작일을 선택하세요';
    }

    if (validator.isEmpty(endDate)) {
        errors.endDate = '종료 날짜를 선택하세요.';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validatevipCreateUser;