/**
 * Enum describing the current state of the draft.
 */
export enum State {
  INVALID_STATE = 'INVALID_STATE',
  CONFIGURING = 'CONFIGURING',
  AUTO_DRAFT = 'AUTO_DRAFT',
  USER_PICK = 'USER_PICK',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
}
