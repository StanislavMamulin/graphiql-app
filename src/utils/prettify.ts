export const prettifyCode = (str) => {
  let prettyCode = '';
  let indentLevel = 0;
  const indent = 2;
  const simpleStr = str.replace(/\s+/g, ' ');

  for (let i = 0; i < simpleStr.length; i++) {
    if (simpleStr[i] === '{') {
      prettyCode += `{\n${' '.repeat(indentLevel + indent)}`;
      indentLevel += indent;
    } else if (simpleStr[i] === ',') {
      prettyCode += `,\n${' '.repeat(indentLevel)}`;
    } else if (simpleStr[i] === '}') {
      indentLevel -= indent;
      prettyCode += `\n${' '.repeat(indentLevel + 1)}}`;
    } else {
      prettyCode += simpleStr[i];
    }
  }

  return prettyCode;
};
