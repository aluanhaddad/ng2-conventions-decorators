"use strict";
function extractMetadata(Decorated) {
    const metadataKeys = Reflect.getMetadataKeys(Decorated);
    const metadata = metadataKeys.reduce((metadata, key) => {
        metadata[key] = Reflect.getMetadata(key, Decorated);
        return metadata;
    }, {});
    return metadata;
}
exports.extractMetadata = extractMetadata;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractMetadata;
