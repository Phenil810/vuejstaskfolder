
import validator from 'validator';

const validateCreateNotification = (data) => {
    let errors = {};
    // let url_regex = "((https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";


    const {   title,sorts_description} = data;

    if (validator.isEmpty(title)) {
        errors.title = '제목을 입력하세요';
    }

    if (validator.isEmpty(sorts_description)) {
        errors.sorts_description = '설명을 입력하세요';
    }

    // if (validator.isEmpty(url)) {
    //     errors.url = 'URL을 입력하세요.';
    // }
    // if (!validator.isURL(url)) {
    //     errors.url = 'URL을 입력하세요.';
    // }
    // if (!url.match(url_regex)) {
    //     errors.url = 'https 링크만';
    // }    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateNotification;