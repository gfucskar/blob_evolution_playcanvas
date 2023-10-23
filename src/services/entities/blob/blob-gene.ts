import { GENE_MERGE_OPTIONS } from '../../../interface/entities/blob/blob-gene-merge-options.enum';

export class BlobGene<T> {
    public readonly value: T;
    public readonly inheritedFrom: GENE_MERGE_OPTIONS;

    constructor(value: T, inheritedFrom: GENE_MERGE_OPTIONS) {
        this.value = value;
        this.inheritedFrom = inheritedFrom;
    }
}
