export default (suffix: string) => (value: string) => {
  const location = value.lastIndexOf(suffix);
  return location > 0 ? value.substr(0, value.length - suffix.length) : value;
};