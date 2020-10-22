
import { Point3, Vector3, Ray3, CoordinateSystem3 } from './geometry3'

export interface Camera {
    generateRay(x: number, y: number, width: number, height: number): Ray3
}


export class PerspectiveCamera extends CoordinateSystem3 implements Camera {

    public focal_length: number
    
    constructor(focal_length: number) {
        super()
        this.focal_length = focal_length
    }

    public generateRay(x: number, y: number, width: number, height: number): Ray3 {
        let xp: number = 2.0*x/width - 1.0
        let yp: number = 2.0*y/height - 1.0
        
        // Point2 ps = screen_space.transform(new Point2(xp, yp))
        
		let r: Ray3 = null
        r = new Ray3(new Point3(0.0, 0.0, 0.0),
                        new Vector3(xp, yp, this.focal_length))
        r = super.toWorldSpace(r)
        r.D.normalize()

        return r
    }
}