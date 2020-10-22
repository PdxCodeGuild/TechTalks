
import { Point3, Vector3, CoordinateSystem3 } from './geometry3'
import { RGBColor } from './color'

export class LightVector extends Vector3 {
    public color: RGBColor
    constructor(v: Vector3, c: RGBColor) {
        super(v)
        this.color = c
    }
}

export interface Light {
    colorAt(p: Point3): LightVector[]
}

export class PointLight extends CoordinateSystem3 implements Light {
    public color: RGBColor
    constructor(color: RGBColor) {
        super()
        this.color = color
    }
    public colorAt(p: Point3): LightVector[] {
        let o: Point3 = super.toWorldSpace(new Point3(0, 0, 0))
        let d = new Vector3(o.X-p.X, o.Y-p.Y, o.Z-p.Z)
        let c = this.color.multiply(1/d.lengthSquared())
        d.normalize()
        return [new LightVector(d, c)]
    }
}
