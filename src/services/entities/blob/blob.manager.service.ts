import { BlobEntity } from './blob.entity';
import { BlobGeneMergerService } from './blob-gene-merger.service';

export class BlobManagerService {
    private readonly blobCollection = new Map<string, BlobEntity>();

    constructor(
        private readonly app: pc.AppBase,
        private readonly blobGeneMergerService: BlobGeneMergerService
    ) {}

    public createBlob(
        birthDate: number,
        startPosition: pc.Vec3,
        parents?: { parentBlobAId: string; parentBlobBId: string }
    ): string {
        let mergedBlobGeneProperties = this.blobGeneMergerService.generateRandomGeneProperties();

        if (parents) {
            const parentBlobA = this.getBlob(parents.parentBlobAId);
            const parentBlobB = this.getBlob(parents.parentBlobBId);

            if (parentBlobA && parentBlobB) {
                mergedBlobGeneProperties = this.blobGeneMergerService.mergeGeneProperties(
                    parentBlobA.blobGeneProperties,
                    parentBlobB.blobGeneProperties
                );
            } else {
                console.warn('Parents not found with IDs: ', parents.parentBlobAId, parents.parentBlobBId);
            }
        }

        const entity = new BlobEntity(this.app, mergedBlobGeneProperties, birthDate, startPosition);
        this.blobCollection.set(entity.id, entity);

        return entity.id;
    }

    public getBlob(id: string): BlobEntity | undefined {
        return this.blobCollection.get(id);
    }

    public destroyBlob(id: string): void {
        const entity = this.blobCollection.get(id);

        if (!entity) {
            throw new Error('Entity does not exists');
        }

        entity.destroy();
        this.blobCollection.delete(id);
    }
}
