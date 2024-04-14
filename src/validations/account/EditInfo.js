import validator from 'validator';

const editInfo = (data) => {
  let errors = {}

  const {name} = data;

  if(validator.isEmpty(name)) {
    errors.name =  'Please enter a name'
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  }
}

export default editInfo;