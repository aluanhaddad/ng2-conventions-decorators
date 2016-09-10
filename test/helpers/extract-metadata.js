"use strict";
function default_1(Directive) {
    var metadataKeys = Reflect.getMetadataKeys(Directive);
    var metadata = metadataKeys.reduce(function (metadata, key) {
        metadata[key] = Reflect.getMetadata(key, Directive);
        return metadata;
    }, {});
    return metadata;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=extract-metadata.js.map