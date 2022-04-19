export default function _get(source: Record<string, any>, path: string, defaultValue = undefined) {
  const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');

  let result = source;
  for (const key of paths) {
    result = Object(result)[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}
