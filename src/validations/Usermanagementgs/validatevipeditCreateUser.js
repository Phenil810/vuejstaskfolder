
import validator from 'validator';

const validatevipeditCreateUser = (data) => {
    let errors = {};

    const { address , vip_user, startDate, endDate} = data;

    // if (validator.isEmpty(apartment_id)) {
    //     errors.apartment_id = 'Please Select One Apartement';
    // }

    
    if (validator.isEmpty(address)) {
        errors.address = '주소를 입력하세요';
    }
    if (validator.isEmpty(vip_user)) {
        errors.vip_user = 'VIP 사용자를 선택하십시오';
    }

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

export default validatevipeditCreateUser;