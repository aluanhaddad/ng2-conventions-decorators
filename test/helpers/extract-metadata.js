"use strict";
function extractMetadata(Decorated) {
    var metadataKeys = Reflect.getMetadataKeys(Decorated);
    var metadata = metadataKeys.reduce(function (metadata, key) {
        metadata[key] = Reflect.getMetadata(key, Decorated);
        return metadata;
    }, {});
    return metadata;
}
exports.extractMetadata = extractMetadata;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractMetadata;
