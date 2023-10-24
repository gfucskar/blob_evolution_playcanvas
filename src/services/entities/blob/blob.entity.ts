import { EntityUtils } from '../../utils/entity.utils';
import { BlobGeneProperties } from '../../../interface/entities/blob/blob-gene-properties.interface';
import { BlobColorHandler } from './blob-color-handler';
import { BlobMorphTargetHandler } from './blob-morph-target-handler';
import { BlobAgeHandler } from './blob-age-handler';

export class BlobEntity {
    private readonly blobAssetId = 154377418;

    public readonly id = `blob_${performance.now()}`;

    public readonly blobGeneProperties: BlobGeneProperties;

    public readonly birthDate: number;

    public entity!: pc.GraphNode;

    public blobMorphTargetHandler!: BlobMorphTargetHandler;

    public blobColorHandler!: BlobColorHandler;

    public blobAgeHandler!: BlobAgeHandler;

    constructor(
        private readonly app: pc.AppBase,
        blobGeneProperties: BlobGeneProperties,
        birthDate: number,
        startPosition: pc.Vec3
    ) {
        this.blobGeneProperties = blobGeneProperties;
        this.birthDate = birthDate;
        this.create();
        this.setPosition(startPosition);
    }

    private get blobContainerEntity(): pc.GraphNode {
        const blobContainerEntity = EntityUtils.getChildByName(this.app.root.children[0], 'blob_container');

        if (!blobContainerEntity) {
            throw new Error('blob_container entity not found');
        }

        return blobContainerEntity;
    }

    public destroy(): void {
        this.entity.destroy();
        this.blobContainerEntity?.removeChild(this.entity);
        this.blobAgeHandler.destroy();
    }

    public setPosition(position: pc.Vec3): void {
        this.entity.setLocalPosition(position);
    }

    private create(): void {
        const blobTemplateAsset = this.app.assets.get(this.blobAssetId);

        if (!blobTemplateAsset) {
            throw new Error('Blob asset not found');
        }

        const instance = blobTemplateAsset.resource.instantiate();
        instance.name = this.id;

        this.blobMorphTargetHandler = new BlobMorphTargetHandler(instance);
        this.blobMorphTargetHandler.setFatness(this.blobGeneProperties.fatness.value);

        this.blobColorHandler = new BlobColorHandler(instance);
        this.blobColorHandler.setBodyColor(this.blobGeneProperties.bodyColor.value);
        this.blobColorHandler.setEyeColor(this.blobGeneProperties.eyeColor.value);

        this.blobAgeHandler = new BlobAgeHandler(instance, this.birthDate, this.blobGeneProperties.height.value);

        this.entity = instance;
        this.blobContainerEntity?.addChild(instance);
    }
}
