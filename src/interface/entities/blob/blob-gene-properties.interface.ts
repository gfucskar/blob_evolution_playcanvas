import { Color } from '../color.interface';
import { BlobGene } from '../../../services/entities/blob/blob-gene';

export interface BlobGeneProperties {
    height: BlobGene<number>;
    fatness: BlobGene<number>;
    bodyColor: BlobGene<Color>;
    eyeColor: BlobGene<Color>;
}
