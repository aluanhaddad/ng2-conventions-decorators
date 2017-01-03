export declare function extractMetadata(Decorated: {}): extractMetadata.Metadata;
export declare namespace extractMetadata {
    interface Data {
        annotations?: (Metadata.Annotation & {
            [P in keyof Metadata.Annotation]: Metadata.Annotation[P];
        })[];
    }
    type Metadata = {
        [P in keyof extractMetadata.Data]: Data[P];
    } & {
        annotations: (Metadata.Annotation & {
            [key: string]: {};
        })[];
    };
    namespace Metadata {
        interface Annotation {
            encapsulation: number;
            selector?: string;
            template?: string;
            styles?: string[];
            exportAs?: string;
        }
    }
}
export default extractMetadata;
