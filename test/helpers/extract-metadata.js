"use strict";
function default_1(Directive) {
    const metadataKeys = Reflect.getMetadataKeys(Directive);
    const metadata = metadataKeys.reduce((metadata, key) => {
        metadata[key] = Reflect.getMetadata(key, Directive);
        return metadata;
    }, {});
    return metadata;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=extract-metadata.js.map