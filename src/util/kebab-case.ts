import stripSuffix from './strip-suffix';

export default function kebabCase(identifier: string, suffixToStrip?: string): string {
  const name = suffixToStrip ? stripSuffix(suffixToStrip)(identifier) : identifier;
  const nameSegments = name.match(/[A-Z]{1,}[a-z]{1}[^A-Z]*/g)!;
  if (nameSegments.length > 1 && suffixToStrip && nameSegments.indexOf(suffixToStrip) === nameSegments.length - 1) {
    nameSegments.pop();
  }
  return nameSegments
    .map(segment => segment.toLowerCase())
    .join('-');
}