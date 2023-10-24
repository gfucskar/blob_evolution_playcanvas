import { TimeUtils } from '../../utils/time.utils';

export class BlobAgeHandler {
    private readonly MAX_AGE = 10;

    private readonly AGE_CHECK_DELAY = 1000; //10 * 1000;

    private readonly entity: pc.Entity;

    private readonly birthDate: number;

    private readonly heightFromGene: number;

    private readonly initialScale: pc.Vec3;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private ageCheckInterval: any;

    constructor(entity: pc.GraphNode, birthDate: number, heightFromGene: number) {
        this.entity = entity as pc.Entity;
        this.birthDate = birthDate;
        this.heightFromGene = heightFromGene;

        this.initialScale = new pc.Vec3(entity.getLocalScale().x, entity.getLocalScale().y, entity.getLocalScale().z);

        this.initialize();
    }

    public initialize(): void {
        this.ageCheck();

        this.ageCheckInterval = setInterval(() => {
            this.ageCheck();
        }, this.AGE_CHECK_DELAY);
    }

    public destroy(): void {
        clearInterval(this.ageCheckInterval);
    }

    public get age(): number {
        const ageDifMs = TimeUtils.now - this.birthDate;

        return Math.ceil(ageDifMs / TimeUtils.ONE_YEAR_MS);
    }

    private ageCheck(): void {
        this.setScaleBasedOnAge();
    }

    private setScaleBasedOnAge(): void {
        let scaleMultiplierBasedOnAge = Math.min(100, 50 + this.age * (100 / this.MAX_AGE));

        const scaleX = this.initialScale.x * (scaleMultiplierBasedOnAge / 100);
        const scaleZ = this.initialScale.z * (scaleMultiplierBasedOnAge / 100);
        const scaleY = this.heightFromGene * (scaleMultiplierBasedOnAge / 100);

        this.entity.setLocalScale(scaleX, scaleY, scaleZ);
    }
}
