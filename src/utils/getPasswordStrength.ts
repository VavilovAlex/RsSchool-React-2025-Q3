export default function getPasswordStrength(password: string) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  let score = 0;
  const reasons = [];

  if (hasLowercase) score++;
  else reasons.push("Must contain at least one lowercase letter");

  if (hasUppercase) score++;
  else reasons.push("Must contain at least one uppercase letter");

  if (hasNumber) score++;
  else reasons.push("Must contain at least one number");

  if (hasSpecialCharacter) score++;
  else reasons.push("Must contain at least one special character");

  return {
    score,
    maxScore: 4,
    reasons: reasons,
  };
}
