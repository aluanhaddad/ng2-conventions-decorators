export function extractMetadata(Decorated: {}): extractMetadata.Metadata {
  const metadataKeys = Reflect.getMetadataKeys(Decorated);
  const metadata = metadataKeys.reduce((metadata, key) => {
    metadata[key] = Reflect.getMetadata(key, Decorated);
    return metadata;
  }, {});
  return metadata;
}

export declare namespace extractMetadata {
  interface Data {
    annotations?: (Metadata.Annotation & {
      [P in keyof Metadata.Annotation]: Metadata.Annotation[P]})[];
  }
  export type Metadata = {
    [P in keyof extractMetadata.Data]: Data[P]
  } & {
      annotations: (Metadata.Annotation & { [key: string]: {} })[];
    };
  export namespace Metadata {
    export interface Annotation {
      encapsulation: number;
      selector?: string; template?: string; styles?: string[]; exportAs?: string;
    }
  }
}

export default extractMetadata;