import type { ArgumentInstance } from './stores/analysis';
import { v4 as uuidv4 } from 'uuid';

export const serializeNonPOJOs = (obj: any) => {
  return structuredClone(obj);
};

export function debounce(func: any, wait: number) {
  let timeout: any;
  return function(this: any, ...args: Parameters<any>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export const validateData = async (
  formData: Iterable<readonly [PropertyKey, any]>,
  schema: { parse: (arg0: { [k: string]: any }) => any }
) => {
  const body = Object.fromEntries(formData);

  try {
    const data = schema.parse(body);
    return {
      formData: data,
      errors: null
    };
  } catch (err: any) {
    console.log('Error: ', err);
    const errors = err.flatten();
    return {
      formData: body,
      errors
    };
  }
};

export function downloadFile(
  fileContent: string,
  fileName: string,
  fileType: string
): void {
  // create a blob from the string content
  const blob = new Blob([fileContent], { type: fileType });

  // create a URL to the blob
  const url = window.URL.createObjectURL(blob);

  // create a download link
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);

  // simulate a click on the download link
  link.click();

  // clean up the URL and link
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

export function parseArgument(
  argument: any,
  paragraph: string
): ArgumentInstance {
  // const text = argument.text.replace(/ ([,.'])/g, '$1');
  const text = argument.text;
  const textStart = paragraph.indexOf(text);
  const textEnd = textStart + argument.text.length;
  const arg: ArgumentInstance = {
    uuid: uuidv4(),
    confidence: argument.claim_score,
    sufficiency: argument.sufficiency || Math.random(),
    text: argument.text,
    start: textStart,
    end: textEnd
  };
  return arg;
  // let evidenceStart: number = 0;
  // let evidenceSpan: number = 0;
  //
  // if (argument.claim_evidence !== undefined) {
  //  // Evidence found
  //  evidenceStart = paragraph.indexOf(argument.claim_evidence.replace(/ ([,.'])/g, '$1'));
  //  evidenceSpan = argument.claim_evidence.length;
  // } else if (argument.claim !== undefined) {
  //  // Claim claim found
  //  evidenceStart = paragraph.indexOf(argument.claim.replace(/ ([,.'])/g, '$1'));
  //  evidenceSpan = argument.claim.length;
  // }
}

export function normalizeArguments(args: ArgumentInstance[]) {
  const maxScore = Math.max(...args.map((arg) => arg.confidence));
  const minScore = Math.min(...args.map((arg) => arg.confidence));
  console.log(maxScore, minScore);
  args.forEach((arg) => {
    arg.confidence = (arg.confidence - minScore) / (maxScore - minScore);
  });
  return args;
}

export function getRandomLightHexColor(): string {
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const channel = Math.floor(Math.random() * 60 + 186)
      .toString(16)
      .padStart(2, '0');
    color += channel;
  }
  return color;
}

export function getTextFromRanges(paragraph: string, argument: any) {
  console.log('argument: ', argument);
  return {
    text: paragraph.slice(argument.start, argument.end),
    score: argument.confidence,
    sufficiency: argument.sufficiency
  };
}
