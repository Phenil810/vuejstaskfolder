
import validator from 'validator';

const validateCreateProduct = (data) => {
    let errors = {};

    const { title , description,honey,file } = data;

    if (validator.isEmpty(title)) {
        errors.title = '제목을 입력하세요.';
    }

    if (validator.isEmpty(description)) {
        errors.description = '설명을 입력하세요.';
    }

    if (validator.isEmpty(honey)) {
        errors.honey = '꿀을 입력하십시오.';
    }
    
    console.log(file);
    if (validator.isEmpty(file)) {
        errors.file = '파일을 업로드 해주세요';
    }
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateProduct;