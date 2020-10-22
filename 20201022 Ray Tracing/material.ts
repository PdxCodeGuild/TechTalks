
import { Point3, Vector3 } from './geometry3'
import { SurfaceGeometry } from './shape'
import { RGBColor } from './color'

export class LightVector extends Vector3 {
    constructor(x: any, y: number, z: number) {
        super(x, y, z)
    }
}

export interface Material {
    getColor(sg: SurfaceGeometry, v_light: Vector3): RGBColor
}

export class LambertianReflectance implements Material {
    public color: RGBColor
    constructor(c: RGBColor) {
        this.color = c
    }
    public getColor(sg: SurfaceGeometry, v_light: Vector3): RGBColor {
        let c = this.color.multiply(v_light.dot(sg.N))
        return c
    }
}
