
import validator from 'validator';

const UpdateProductcategory = (data) => {
    let errors = {};

    const { first_category,second_category,third_category } = data;

    if (validator.isEmpty(first_category)) {
        errors.first_category = 'Please Enter Category 1';
    }


    if (validator.isEmpty(second_category)) {
        errors.second_category = 'Please Enter Category 2';
    }

    if (validator.isEmpty(third_category)) {
        errors.third_category = 'Please Enter Category 3';
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors,
    };
};

export default UpdateProductcategory;
