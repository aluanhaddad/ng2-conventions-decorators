export default function ensureName(target: { name: string }) {
  if (!target.name) {
    throw TypeError('Effectively anonymous functions/es2015 classes cannot be named via conventions.');
  }
}