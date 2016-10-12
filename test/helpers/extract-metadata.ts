export default function (Decorated): { annotations?: { selector?: string, template?: string, styles?: string[], exportAs?: string }[] } {
  const metadataKeys = Reflect.getMetadataKeys(Decorated);
  const metadata = metadataKeys.reduce((metadata, key) => {
    metadata[key] = Reflect.getMetadata(key, Decorated);
    return metadata;
  }, {});
  return metadata;
}