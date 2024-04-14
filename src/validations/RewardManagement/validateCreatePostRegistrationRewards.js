
import validator from 'validator';

const validateCreatePostRegistrationRewards = (data) => {
    let errors = {};

    const { charcter_honey_per_activity  } = data;

    if (validator.isEmpty(charcter_honey_per_activity)) {

        errors.charcter_honey_per_activity = '활동 당 꿀 입력';

    }

   
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreatePostRegistrationRewards;