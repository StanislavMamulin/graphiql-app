export type LangItem = {
  id: string;
  name: string;
  flagimg: string;
};

export const languageOptions: LangItem[] = [
  {
    id: 'en',
    name: 'English',
    flagimg:
      'https://upload.wikimedia.org/wikipedia/commons/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg',
  },
  {
    id: 'ru',
    name: 'Русский',
    flagimg:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/320px-Flag_of_Russia.svg.png',
  },
];
