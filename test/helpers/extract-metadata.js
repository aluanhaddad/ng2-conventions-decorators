"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extractMetadata(Decorated) {
    var metadataKeys = Reflect.getMetadataKeys(Decorated);
    var metadata = metadataKeys.reduce(function (metadata, key) {
        metadata[key] = Reflect.getMetadata(key, Decorated);
        return metadata;
    }, {});
    return metadata;
}
exports.extractMetadata = extractMetadata;
exports.default = extractMetadata;
