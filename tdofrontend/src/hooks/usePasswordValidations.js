// src/hooks/usePasswordValidation.js
import { useMemo } from 'react';

const SPECIAL_CHARS = /[@$!%*?&]/;

export function usePasswordValidation(password = '') {
  return useMemo(() => {
    const lengthValid     = password.length >= 10;
    const hasUpper        = /[A-Z]/.test(password);
    const hasLower        = /[a-z]/.test(password);
    const hasNumber       = /\d/.test(password);
    const hasSpecial      = SPECIAL_CHARS.test(password);
    const notNumericOnly  = !/^\d+$/.test(password);

    const isValid = lengthValid &&
      hasUpper &&
      hasLower &&
      hasNumber &&
      hasSpecial &&
      notNumericOnly;

    return {
      lengthValid,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      notNumericOnly,
      isValid,
    };
  }, [password]);
}
