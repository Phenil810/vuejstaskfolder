import validator from 'validator';

const validpassword = (data) => {
  let errors = {}

  const { new_pass, confirm_pass} = data;

 
  if(validator.isEmpty(new_pass)) {
    errors.new_pass =  '새 비밀번호를 입력하세요.'
  }
  if(validator.isEmpty(confirm_pass)) {
    errors.confirm_pass =  '확인 비밀번호를 입력하세요.'
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  }
}

export default validpassword;