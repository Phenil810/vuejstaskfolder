
import validator from 'validator';

const validateCreateRewardManagement = (data) => {
    let errors = {};

    const { activity_limit , honey_per_activity , vip_activity_limit} = data;

    if (validator.isEmpty(activity_limit)) {
        errors.activity_limit = '활동 한도 입력';
    }

    if (validator.isEmpty(honey_per_activity)) {
        errors.honey_per_activity = '활동 당 꿀 입력';
    }

    if (validator.isEmpty(vip_activity_limit)) {
        errors.vip_activity_limit = '일일 VIP 사용자 활동을 입력하십시오.';
    }
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateRewardManagement;