import { ErrorCode, isErrorCode } from './errorCodes'

// The `{ code, message }` contract. `message` is English and for logs only;
// what the user reads comes from the dictionary, keyed by `code`, because
// only the UI knows the active language.
export class AppError extends Error {
  readonly code: ErrorCode

  constructor(code: ErrorCode, message?: string, options?: { cause?: unknown }) {
    super(message ?? code, options)
    this.name = 'AppError'
    this.code = code
  }
}

// Anything thrown anywhere becomes an AppError, so callers handle one shape.
export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error
  if (error instanceof Error) return new AppError(ErrorCode.UNKNOWN, error.message, { cause: error })
  if (isErrorCode((error as { code?: unknown } | null)?.code)) {
    return new AppError((error as { code: ErrorCode }).code, undefined, { cause: error })
  }
  return new AppError(ErrorCode.UNKNOWN, undefined, { cause: error })
}
