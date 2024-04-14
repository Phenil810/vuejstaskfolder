
import validator from 'validator';

const validateCreateHotPostManagement = (data) => {
    let errors = {};

    const { hot_issue_comment , hot_issue_like, hot_issue_view } = data;

    if (validator.isEmpty(hot_issue_comment)) {
        errors.hot_issue_comment = "Enter hot issue comment";
    }

    if (validator.isEmpty(hot_issue_like)) {
        errors.hot_issue_like = "Enter hot issue like";
    }

    if (validator.isEmpty(hot_issue_view)) {
        errors.hot_issue_view = "Enter hot issue view";
    }

    
    
    
    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default validateCreateHotPostManagement;