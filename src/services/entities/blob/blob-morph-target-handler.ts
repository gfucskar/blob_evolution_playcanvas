import { EntityMorphTargetHandler } from '../entity-morph-target-handler';
import { EntityUtils } from '../../utils/entity.utils';

export class BlobMorphTargetHandler {
    private readonly entity: pc.Entity;

    private bodyEntityMorphTargetHandler!: EntityMorphTargetHandler;

    constructor(entity: pc.GraphNode) {
        this.entity = entity as pc.Entity;

        const bodyEntity = EntityUtils.getChildByName(this.entity, 'blob_model');

        if (bodyEntity) {
            this.bodyEntityMorphTargetHandler = new EntityMorphTargetHandler(bodyEntity);
        }
    }

    public setFatness(value: number): void {
        this.bodyEntityMorphTargetHandler.setMorphTargetValue('fatness', value);
    }
}
