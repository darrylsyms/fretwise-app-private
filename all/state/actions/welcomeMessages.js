import { SAVE_WELCOME_MESSAGES } from './actionTypes';

export const saveWelcomeMessages = (welcomeMessages) => {
  return {
    type: SAVE_WELCOME_MESSAGES,
    payload: welcomeMessages,
  };
};