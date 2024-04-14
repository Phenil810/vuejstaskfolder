import validator from 'validator';

const validateEditUser = (data) => {
  let errors = {}

  const {nickname,name,gender,ageGroup,maritalStatus} = data;

  if(validator.isEmpty(nickname)) {
    errors.nickname =  'Please enter your nickname'
  }
  if(validator.isEmpty(name)) {
    errors.name =  'Please enter your Name'
  }
  if(validator.isEmpty(gender)) {
    errors.gender =  'Please select your Gender'
  }
  if(validator.isEmpty(ageGroup)) {
    errors.ageGroup =  'Please select your ageGroup'
  }
  if(validator.isEmpty(maritalStatus)) {
    errors.maritalStatus =  'Please select your maritalStatus'
  }
 

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  }
}

export default validateEditUser;