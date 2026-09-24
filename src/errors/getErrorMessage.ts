import { toAppError } from './AppError'
import type { ErrorMessages } from './errorCodes'

export function getErrorMessage(error: unknown, messages: ErrorMessages): string {
  return messages[toAppError(error).code]
}
