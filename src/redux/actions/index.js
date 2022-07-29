export const SAVE_INFORMATIONS = 'SAVE_INFORMATIONS';

export const userInfoAction = (email) => ({
  type: SAVE_INFORMATIONS,
  info: {
    email,
  },
});
