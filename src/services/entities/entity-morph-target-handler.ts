export class EntityMorphTargetHandler {
    private readonly entity: pc.Entity;
    constructor(entity: pc.GraphNode) {
        this.entity = entity as pc.Entity;
    }

    public setMorphTargetValue(morphTargetName: string, value: number): void {
        const validValue = Math.max(0, Math.min(1, value));
        this.entity.render?.meshInstances[0].morphInstance.setWeight(morphTargetName, validValue);
    }
}
