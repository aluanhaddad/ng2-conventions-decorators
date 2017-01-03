import stripSuffix from './strip-suffix';

export default function camelCase(identifier: string): string {
  const selector = stripSuffix('Directive')(identifier.substr(1));
  return `${identifier[0].toLowerCase()}${selector}`;
}
