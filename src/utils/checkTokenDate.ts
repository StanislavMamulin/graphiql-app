export const checkTokenExpDate = (tokenDate: string): boolean => {
  const expDateObj: Date = new Date(tokenDate);
  const now: number = Date.now();

  if (isNaN(expDateObj.valueOf())) {
    return false;
  }

  return now > expDateObj.getTime();
};
