export default function (Directive) {
    const metadataKeys = Reflect.getMetadataKeys(Directive);
    const metadata = metadataKeys.reduce((metadata, key) => {
        metadata[key] = Reflect.getMetadata(key, Directive);
        return metadata;
    }, {});
    return metadata;
}