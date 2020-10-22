

import { Point3, Vector3, Normal3, Ray3, CoordinateSystem3 } from "./geometry3"
import { Material } from './material'
import { RTMath } from './rtmath'

export class Intersection {
    public Ro: Ray3
    public Po: Point3
    public Rw: Ray3
    public Pw: Point3
    public T: number
    public shape: Shape
    constructor(rw: Ray3, ro: Ray3, t: number, shape: Shape) {
        this.Rw = rw
        this.Pw = rw.pointAt(t)
        this.Ro = ro
        this.Po = ro.pointAt(t)
        this.T = t
        this.shape = shape
    }
}

export class SurfaceGeometry {
    public P: Point3
    public N: Normal3
    public V: Vector3
    constructor(p: Point3, n: Normal3, v: Vector3) {
        this.P = p
        this.N = n
        this.V = v
    }
}

export abstract class Shape extends CoordinateSystem3 {

    public abstract intersectWith(ray: Ray3): Intersection
    public abstract getSurfaceGeometry(it: Intersection): SurfaceGeometry
    public abstract getMaterial(): Material
}


export class Sphere extends Shape {
    public radius: number
    public material: Material
    constructor(radius: number, material: Material) {
        super()
        this.radius = radius
        this.material = material
    }
    public intersectWith(rw: Ray3): Intersection {
        let ro: Ray3 = this.toObjectSpace(rw)
        let a: number = ro.D.dot(ro.D)
        let b: number = 2*(ro.O.X*ro.D.X + ro.O.Y*ro.D.Y + ro.O.Z*ro.D.Z)
        let c: number = (ro.O.X*ro.O.X + ro.O.Y*ro.O.Y + ro.O.Z*ro.O.Z) - this.radius*this.radius 
        let t: number[] = RTMath.quadratic(a, b, c)
        if (t.length > 0) {
            if (t[0] > 1E-3) {
                return new Intersection(rw, ro, t[0], this)
            }
            if (t.length == 2 && t[1] > 1E-3) {
                return new Intersection(rw, ro, t[1], this)
            }
        }
        return null
    }
    public getSurfaceGeometry(it: Intersection): SurfaceGeometry {
        let p: Point3 = it.Po
        let n: Normal3 = new Normal3(p)
        n.normalize()
        let v: Vector3 = new Vector3(it.Ro.D)
        v.scale(-1)
        return new SurfaceGeometry(p, n, v)
    }
    public getMaterial(): Material {
        return this.material
    }
}