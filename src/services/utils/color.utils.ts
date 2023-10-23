import { Color } from '../../interface/entities/color.interface';
import { Utils } from './utils';

export class ColorUtils {
    static isStrongerColorThan(colorA: Color, colorB: Color): boolean {
        const colorAStrength = colorA.red + colorA.green + colorA.blue;
        const colorBStrength = colorB.red + colorB.green + colorB.blue;

        return colorA < colorB;
    }

    static mixColors(colorA: Color, colorB: Color): Color {
        return {
            red: (colorA.red + colorB.red) / 2,
            green: (colorA.green + colorB.green) / 2,
            blue: (colorA.blue + colorB.blue) / 2,
            alpha: 1
        };
    }

    static generateRandomColor(): Color {
        return {
            red: Utils.generateRandomValue(0, 1),
            green: Utils.generateRandomValue(0, 1),
            blue: Utils.generateRandomValue(0, 1),
            alpha: 1
        };
    }
}
