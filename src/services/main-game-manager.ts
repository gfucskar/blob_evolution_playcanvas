import { GameClass } from '../interface/game-class.interface';
import { BlobManagerService } from './entities/blob/blob.manager.service';
import { BlobGeneMergerService } from './entities/blob/blob-gene-merger.service';

export class MainGameManager implements GameClass {
    private readonly blobGeneMergerService: BlobGeneMergerService;

    private readonly blobManagerService: BlobManagerService;

    constructor(private readonly app: pc.AppBase) {
        this.blobGeneMergerService = new BlobGeneMergerService();
        this.blobManagerService = new BlobManagerService(app, this.blobGeneMergerService);
    }

    public initialize(): void {
        this.agingTest();
        // this.inheritanceTest();
    }

    public update(): void {}

    private agingTest(): void {
        const blobId = this.blobManagerService.createBlob(Date.now(), new pc.Vec3(0, 0, 0));

        const blob = this.blobManagerService.getBlob(blobId);
    }

    private inheritanceTest(): void {
        const blobAId = this.blobManagerService.createBlob(Date.now(), new pc.Vec3(0, 0, 5.5));

        const blobBId = this.blobManagerService.createBlob(Date.now(), new pc.Vec3(0, 0, -5.5));

        const blobCId = this.blobManagerService.createBlob(Date.now(), new pc.Vec3(2, 0, 2.5), {
            parentBlobAId: blobAId,
            parentBlobBId: blobBId
        });

        const blobDId = this.blobManagerService.createBlob(Date.now(), new pc.Vec3(2, 0, 0), {
            parentBlobAId: blobAId,
            parentBlobBId: blobBId
        });

        const blobEId = this.blobManagerService.createBlob(Date.now(), new pc.Vec3(2, 0, -2.5), {
            parentBlobAId: blobAId,
            parentBlobBId: blobBId
        });

        console.table(this.blobManagerService.getBlob(blobAId)?.blobGeneProperties);
        console.table(this.blobManagerService.getBlob(blobBId)?.blobGeneProperties);
        console.warn('-- Children --');
        console.table(this.blobManagerService.getBlob(blobCId)?.blobGeneProperties);
        console.table(this.blobManagerService.getBlob(blobDId)?.blobGeneProperties);
        console.table(this.blobManagerService.getBlob(blobEId)?.blobGeneProperties);
    }
}
