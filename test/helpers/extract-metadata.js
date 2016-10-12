"use strict";
function default_1(Decorated) {
    var metadataKeys = Reflect.getMetadataKeys(Decorated);
    var metadata = metadataKeys.reduce(function (metadata, key) {
        metadata[key] = Reflect.getMetadata(key, Decorated);
        return metadata;
    }, {});
    return metadata;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=extract-metadata.js.map