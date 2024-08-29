export const parseError = (message: string) => {
  if (message.includes(':')) {
    const splittedString = message.split(':');
    return splittedString[splittedString.length - 1];
  } else {
    return message;
  }
};