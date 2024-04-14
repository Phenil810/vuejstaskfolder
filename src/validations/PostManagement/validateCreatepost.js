import validator from 'validator';

const validateCreatepost = (data) => {
  let errors = {}

  const {tag_id} = data;

 
 if(validator.isEmpty(tag_id)) {
    errors.tag_id =  'Please select your tag_id'
  }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  }
}

export default validateCreatepost;