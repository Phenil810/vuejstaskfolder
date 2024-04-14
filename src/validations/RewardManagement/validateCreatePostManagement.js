
import validator from 'validator';

const validateCreatePostManagement = (data) => {
    let errors = {};

    const { activity_limit ,vip_activity_limit } = data;

    if (validator.isEmpty(activity_limit)) {
        errors.activity_limit = '활동 한도 입력';
    }

    if (validator.isEmpty(vip_activity_limit)) {
        errors.vip_activity_limit = '일일 VIP 사용자 활동을 입력하십시오.';
    }
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreatePostManagement;