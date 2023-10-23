import { EntityUtils } from '../../utils/entity.utils';
import { Color } from '../../../interface/entities/color.interface';

export class BlobColorHandler {
    private readonly entity: pc.Entity;

    constructor(entity: pc.GraphNode) {
        this.entity = entity as pc.Entity;
    }

    public setBodyColor(color: Color): void {
        const bodyEntity = (EntityUtils.getChildByName(this.entity, 'blob_model') as pc.Entity)?.render;
        const leftTopEyeLidEntity = (EntityUtils.getChildByName(this.entity, 'left_top_eye_lid') as pc.Entity)?.render;
        const leftBottomEyeLidEntity = (EntityUtils.getChildByName(this.entity, 'left_bottom_eye_lid') as pc.Entity)
            ?.render;
        const rightTopEyeLidEntity = (EntityUtils.getChildByName(this.entity, 'right_top_eye_lid') as pc.Entity)
            ?.render;
        const rightBottomEyeLidEntity = (EntityUtils.getChildByName(this.entity, 'right_bottom_eye_lid') as pc.Entity)
            ?.render;

        const newMaterial = new pc.StandardMaterial();
        newMaterial?.diffuse.set(color.red, color.green, color.blue, color.alpha);
        newMaterial.update();

        if (bodyEntity) {
            bodyEntity.meshInstances[0].material?.destroy();
            bodyEntity.meshInstances[0].material = newMaterial;
        }

        if (leftTopEyeLidEntity) {
            leftTopEyeLidEntity.meshInstances[0].material?.destroy();
            leftTopEyeLidEntity.meshInstances[0].material = newMaterial;
        }

        if (leftBottomEyeLidEntity) {
            leftBottomEyeLidEntity.meshInstances[0].material?.destroy();
            leftBottomEyeLidEntity.meshInstances[0].material = newMaterial;
        }

        if (rightTopEyeLidEntity) {
            rightTopEyeLidEntity.meshInstances[0].material?.destroy();
            rightTopEyeLidEntity.meshInstances[0].material = newMaterial;
        }

        if (rightBottomEyeLidEntity) {
            rightBottomEyeLidEntity.meshInstances[0].material?.destroy();
            rightBottomEyeLidEntity.meshInstances[0].material = newMaterial;
        }
    }

    public setEyeColor(color: Color): void {
        const leftEyeBallEntity = (EntityUtils.getChildByName(this.entity, 'left_eye_ball') as pc.Entity)?.render;
        const rightEyeBallEntity = (EntityUtils.getChildByName(this.entity, 'right_eye_ball') as pc.Entity)?.render;

        const newMaterial = new pc.StandardMaterial();
        newMaterial?.diffuse.set(color.red, color.green, color.blue, color.alpha);
        newMaterial.update();

        if (leftEyeBallEntity) {
            leftEyeBallEntity.meshInstances[0].material?.destroy();
            leftEyeBallEntity.meshInstances[0].material = newMaterial;
        }

        if (rightEyeBallEntity) {
            rightEyeBallEntity.meshInstances[0].material?.destroy();
            rightEyeBallEntity.meshInstances[0].material = newMaterial;
        }
    }
}
