
import validator from 'validator';

const validateCreateApartment = (data) => {
    let errors = {};

    const { name,state_id,dist_id,city_id } = data;

    if (validator.isEmpty(name)) {
        errors.name = '이름을 입력하세요';
    }

    if (validator.isEmpty(state_id)) {
        errors.state_id = '시를 선택해주세요';
    }

    if (validator.isEmpty(dist_id)) {
        errors.dist_id = '구를 선택해주세요';
    }

    if (validator.isEmpty(city_id)) {
        errors.city_id = '동을 선택해주세요';
    }
    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateApartment;
