import { BlobGeneMergerService } from './blob-gene-merger.service';

export class BlobHeightHandler {
    private readonly entity: pc.Entity;

    constructor(entity: pc.GraphNode) {
        this.entity = entity as pc.Entity;
    }

    public setHeight(height: number): void {
        const validHeight = Math.max(
            BlobGeneMergerService.BLOB_MIN_HEIGHT,
            Math.min(BlobGeneMergerService.BLOB_MAX_HEIGHT, height)
        );
        const entityScale = this.entity.getLocalScale();

        this.entity.setLocalScale(entityScale.x, validHeight, entityScale.z);
    }
}
