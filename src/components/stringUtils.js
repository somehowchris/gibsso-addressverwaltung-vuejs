/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
// eslint-disable
export function randomString(length = 7) {
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let text = '';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) text += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));

  return text;
}
