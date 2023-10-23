import { MainGameManager } from './services/main-game-manager';

const bootstrapApp = (): void => {
    const script = pc.createScript('index');

    if (!script) {
        throw new Error('Could not register mainGameManager script');
    }

    script.prototype.initialize = function () {
        // @ts-ignore
        this.gameClass = new MainGameManager(this.app);
        // @ts-ignore
        this.gameClass.initialize();
    };

    script.prototype.update = function (dt) {
        // @ts-ignore
        this.gameClass.update();
    };
};

try {
    bootstrapApp();
} catch (error) {
    console.error(error);
}
