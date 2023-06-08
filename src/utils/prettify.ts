export const prettifyCode = (str: string) => {
  let prettyCode = '';
  let indentLevel = 0;
  let bracketIsOpen = false;
  let roundedBracketIsOpen = false;
  const indent = 2;
  const simpleStr = str.replace(/\s+/g, ' ');

  for (let i = 0; i < simpleStr.length; i++) {
    if (simpleStr[i] === '(') {
      roundedBracketIsOpen = true;
      prettyCode += `(`;
    } else if (simpleStr[i] === ')') {
      roundedBracketIsOpen = false;
      prettyCode += `)`;
    } else if (simpleStr[i] === '{') {
      bracketIsOpen = true;
      prettyCode += `{\n${' '.repeat(indentLevel + indent)}`;
      indentLevel += indent;
    } else if (simpleStr[i] === '}') {
      bracketIsOpen = false;
      indentLevel -= indent;
      prettyCode += `\n${' '.repeat(indentLevel + 1)}}`;
    } else if (
      bracketIsOpen &&
      !roundedBracketIsOpen &&
      prettyCode.includes('results {') &&
      simpleStr[i] === ' '
    ) {
      prettyCode += `\n${' '.repeat(indentLevel + 1)}`;
    } else {
      prettyCode += simpleStr[i];
    }
  }

  return prettyCode.replace(/^\s*[\r\n]/gm, '');
};
