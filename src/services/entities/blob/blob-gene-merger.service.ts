import { BlobGeneProperties } from '../../../interface/entities/blob/blob-gene-properties.interface';
import { Color } from '../../../interface/entities/color.interface';
import { ColorUtils } from '../../utils/color.utils';
import { Utils } from '../../utils/utils';
import { GENE_MERGE_OPTIONS } from '../../../interface/entities/blob/blob-gene-merge-options.enum';
import { BlobGene } from './blob-gene';

interface GeneMergeOds extends Record<GENE_MERGE_OPTIONS, number> {}

export class BlobGeneMergerService {
    static readonly BLOB_MIN_HEIGHT = 0.006;

    static readonly BLOB_MAX_HEIGHT = 0.01;

    static readonly BLOB_MIN_FATNESS = 0;

    static readonly BLOB_MAX_FATNESS = 1;

    public generateRandomGeneProperties(): BlobGeneProperties {
        return {
            height: new BlobGene<number>(this.generateRandomHeight(), GENE_MERGE_OPTIONS.RANDOM),
            fatness: new BlobGene<number>(this.generateRandomFatness(), GENE_MERGE_OPTIONS.RANDOM),
            bodyColor: new BlobGene<Color>(ColorUtils.generateRandomColor(), GENE_MERGE_OPTIONS.RANDOM),
            eyeColor: new BlobGene<Color>(ColorUtils.generateRandomColor(), GENE_MERGE_OPTIONS.RANDOM)
        };
    }

    public mergeGeneProperties(
        blobAGeneProperties: BlobGeneProperties,
        blobBGeneProperties: BlobGeneProperties
    ): BlobGeneProperties {
        return {
            height: this.mergeHeight(blobAGeneProperties.height.value, blobBGeneProperties.height.value),
            fatness: this.mergeFatness(blobAGeneProperties.fatness.value, blobBGeneProperties.fatness.value),
            bodyColor: this.mergeBodyColor(blobAGeneProperties.bodyColor.value, blobBGeneProperties.bodyColor.value),
            eyeColor: this.mergeEyeColor(blobAGeneProperties.eyeColor.value, blobBGeneProperties.eyeColor.value)
        };
    }

    private mergeHeight(valueA: number, valueB: number): BlobGene<number> {
        const randomGeneMergeOption = this.chooseRandomGeneMergeOption({
            [GENE_MERGE_OPTIONS.PARENT_A]: 35,
            [GENE_MERGE_OPTIONS.PARENT_B]: 35,
            [GENE_MERGE_OPTIONS.MIX]: 25,
            [GENE_MERGE_OPTIONS.RANDOM]: 5
        });

        switch (randomGeneMergeOption) {
            case GENE_MERGE_OPTIONS.PARENT_A:
                return new BlobGene<number>(valueA, GENE_MERGE_OPTIONS.PARENT_A);

            case GENE_MERGE_OPTIONS.PARENT_B:
                return new BlobGene<number>(valueB, GENE_MERGE_OPTIONS.PARENT_B);

            case GENE_MERGE_OPTIONS.MIX:
                return new BlobGene<number>((valueA + valueB) / 2, GENE_MERGE_OPTIONS.MIX);

            case GENE_MERGE_OPTIONS.RANDOM:
                return new BlobGene<number>(this.generateRandomHeight(), GENE_MERGE_OPTIONS.MIX);
        }
    }

    private mergeFatness(valueA: number, valueB: number): BlobGene<number> {
        const randomGeneMergeOption = this.chooseRandomGeneMergeOption({
            [GENE_MERGE_OPTIONS.PARENT_A]: 40,
            [GENE_MERGE_OPTIONS.PARENT_B]: 40,
            [GENE_MERGE_OPTIONS.MIX]: 15,
            [GENE_MERGE_OPTIONS.RANDOM]: 5
        });

        switch (randomGeneMergeOption) {
            case GENE_MERGE_OPTIONS.PARENT_A:
                return new BlobGene<number>(valueA, GENE_MERGE_OPTIONS.PARENT_A);

            case GENE_MERGE_OPTIONS.PARENT_B:
                return new BlobGene<number>(valueB, GENE_MERGE_OPTIONS.PARENT_B);

            case GENE_MERGE_OPTIONS.MIX:
                return new BlobGene<number>((valueA + valueB) / 2, GENE_MERGE_OPTIONS.MIX);

            case GENE_MERGE_OPTIONS.RANDOM:
                return new BlobGene<number>(this.generateRandomFatness(), GENE_MERGE_OPTIONS.MIX);
        }
    }

    private mergeBodyColor(valueA: Color, valueB: Color): BlobGene<Color> {
        const randomGeneMergeOption = this.chooseRandomGeneMergeOption({
            [GENE_MERGE_OPTIONS.PARENT_A]: 35,
            [GENE_MERGE_OPTIONS.PARENT_B]: 35,
            [GENE_MERGE_OPTIONS.MIX]: 25,
            [GENE_MERGE_OPTIONS.RANDOM]: 5
        });

        switch (randomGeneMergeOption) {
            case GENE_MERGE_OPTIONS.PARENT_A:
                return new BlobGene<Color>(valueA, GENE_MERGE_OPTIONS.PARENT_A);

            case GENE_MERGE_OPTIONS.PARENT_B:
                return new BlobGene<Color>(valueB, GENE_MERGE_OPTIONS.PARENT_B);

            case GENE_MERGE_OPTIONS.MIX:
                return new BlobGene<Color>(ColorUtils.mixColors(valueA, valueB), GENE_MERGE_OPTIONS.MIX);

            case GENE_MERGE_OPTIONS.RANDOM:
                return new BlobGene<Color>(ColorUtils.generateRandomColor(), GENE_MERGE_OPTIONS.MIX);
        }
    }

    private mergeEyeColor(valueA: Color, valueB: Color): BlobGene<Color> {
        const isValueAStrongerColorThanB = ColorUtils.isStrongerColorThan(valueA, valueB);

        const randomGeneMergeOption = this.chooseRandomGeneMergeOption({
            [GENE_MERGE_OPTIONS.PARENT_A]: isValueAStrongerColorThanB ? 60 : 20,
            [GENE_MERGE_OPTIONS.PARENT_B]: isValueAStrongerColorThanB ? 20 : 60,
            [GENE_MERGE_OPTIONS.MIX]: 15,
            [GENE_MERGE_OPTIONS.RANDOM]: 5
        });

        switch (randomGeneMergeOption) {
            case GENE_MERGE_OPTIONS.PARENT_A:
                return new BlobGene<Color>(valueA, GENE_MERGE_OPTIONS.PARENT_A);

            case GENE_MERGE_OPTIONS.PARENT_B:
                return new BlobGene<Color>(valueB, GENE_MERGE_OPTIONS.PARENT_B);

            case GENE_MERGE_OPTIONS.MIX:
                return new BlobGene<Color>(ColorUtils.mixColors(valueA, valueB), GENE_MERGE_OPTIONS.MIX);

            case GENE_MERGE_OPTIONS.RANDOM:
                return new BlobGene<Color>(ColorUtils.generateRandomColor(), GENE_MERGE_OPTIONS.MIX);
        }
    }

    private generateRandomHeight(): number {
        return Utils.generateRandomValue(BlobGeneMergerService.BLOB_MIN_HEIGHT, BlobGeneMergerService.BLOB_MAX_HEIGHT);
    }

    private generateRandomFatness(): number {
        return Utils.generateRandomValue(
            BlobGeneMergerService.BLOB_MIN_FATNESS,
            BlobGeneMergerService.BLOB_MAX_FATNESS
        );
    }

    private chooseRandomGeneMergeOption(geneMergeOds: GeneMergeOds): GENE_MERGE_OPTIONS {
        const randomRangeMax = 100;
        const odsSum = geneMergeOds.PARENT_A + geneMergeOds.PARENT_B + geneMergeOds.MIX + geneMergeOds.RANDOM;
        const odsValue = randomRangeMax / odsSum;

        const randomNumber = Math.random() * randomRangeMax;

        const chanceRangeMaxA = geneMergeOds.PARENT_A * odsValue;
        const chanceRangeMaxB = chanceRangeMaxA + geneMergeOds.PARENT_B * odsValue;
        const chanceRangeMaxMix = geneMergeOds.MIX + chanceRangeMaxB * odsValue;
        const chanceRangeMaxRandom = geneMergeOds.RANDOM + chanceRangeMaxMix * odsValue;

        if (randomNumber <= chanceRangeMaxA) {
            return GENE_MERGE_OPTIONS.PARENT_A;
        } else if (randomNumber <= chanceRangeMaxB) {
            return GENE_MERGE_OPTIONS.PARENT_B;
        } else if (randomNumber <= chanceRangeMaxMix) {
            return GENE_MERGE_OPTIONS.MIX;
        } else if (randomNumber <= chanceRangeMaxRandom) {
            return GENE_MERGE_OPTIONS.RANDOM;
        } else {
            throw new Error('Error while generating random');
        }
    }
}
