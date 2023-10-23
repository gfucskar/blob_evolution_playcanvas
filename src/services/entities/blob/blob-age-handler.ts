import { TimeUtils } from '../../utils/time.utils';

export class BlobAgeHandler {
    private readonly birthDate: number;

    constructor(birthDate: number) {
        this.birthDate = birthDate;
    }

    public get age(): number {
        const ageDifMs = TimeUtils.now - this.birthDate;

        return Math.ceil(ageDifMs / TimeUtils.ONE_YEAR_MS);
    }
}
