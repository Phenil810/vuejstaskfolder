import validator from 'validator';

const validatePass = (data) => {
  let errors = {}
  let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


  const { current, newp, confi } = data;

  if (validator.isEmpty(current)) {
    errors.current = '현재 비밀번호를 입력하세요.'
  }
  if (validator.isEmpty(newp)) {
    errors.newp = '새 비밀번호를 입력하세요.'
  }
  if (!newp.match(regularExpression)) {
    errors.newp = '영문/숫자/특수문자 포함 8자 이상 16자 미만';
  }
  if (validator.isEmpty(confi)) {
    errors.confi = '확인 비밀번호를 입력하세요.'
  }
  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  }
}

export default validatePass;