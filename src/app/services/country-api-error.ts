import { HttpErrorResponse } from '@angular/common/http';

export function isCountryApiOriginNotAllowed(error: unknown): boolean {
  if (!(error instanceof HttpErrorResponse)) {
    return false;
  }

  const payload: unknown = error.error;
  if (typeof payload !== 'object' || payload === null || !('errors' in payload) || !Array.isArray(payload.errors)) {
    return false;
  }

  return payload.errors.some((apiError: unknown) =>
    typeof apiError === 'object' &&
    apiError !== null &&
    'code' in apiError &&
    apiError.code === 'general.origin_not_allowed'
  );
}
