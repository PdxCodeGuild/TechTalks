


export class Tuple3 {
    public X: number
    public Y: number
    public Z: number

    constructor(x: Tuple3)
    constructor(x: number, y: number, z: number)
    constructor(x: any, y?: number, z?: number) {
        if (x instanceof Tuple3) {
            let t: Tuple3 = x
            this.X = t.X
            this.Y = t.Y
            this.Z = t.Z
        } else {
            this.X = x
            this.Y = y
            this.Z = z
        }
    }

    // https://en.wikipedia.org/wiki/Spherical_coordinate_system
    public static sphericalToCartesian(p: Tuple3): Tuple3 {
        let radius = p.X
        let theta = p.Y
        let phi = p.Z
        let cos_theta = Math.cos(theta)
        let sin_theta = Math.sin(theta)
        let cos_phi = Math.cos(phi)
        let sin_phi = Math.sin(phi)
        let x = radius * sin_theta * cos_phi
        let y = radius * sin_theta * sin_phi
        let z = radius * cos_theta
        return new Tuple3(x, y, z)
    }

    public static cartesianToSpherical(p: Tuple3): Tuple3 {
        let radius = Math.sqrt(p.X * p.X + p.Y * p.Y + p.Z * p.Z)
        let theta = Math.acos(p.Z / radius)
        let phi = Math.atan2(p.Y, p.X)
        return new Tuple3(radius, theta, phi)
    }
}

export class Point3 extends Tuple3 {

    constructor(x: Tuple3)
    constructor(x: number, y: number, z: number)
    constructor(x: any, y?: number, z?: number) {
        super(x, y, z)
    }
    public distanceSquared(p: Tuple3): number {
        let dx = this.X - p.X
        let dy = this.Y - p.Y
        let dz = this.Z - p.Z
        return dx * dx + dy * dy + dz * dz
    }
    public distance(p: Tuple3): number {
        return Math.sqrt(this.distanceSquared(p))
    }
}



class Direction3 extends Tuple3 {
    constructor(x: Tuple3)
    constructor(x: number, y: number, z: number)
    constructor(x: any, y?: number, z?: number) {
        super(x, y, z)
    }
    public lengthSquared(): number {
        return this.X * this.X + this.Y * this.Y + this.Z * this.Z
    }
    public length(): number {
        return Math.sqrt(this.lengthSquared())
    }
    public scale(s: number): void {
        this.X *= s
        this.Y *= s
        this.Z *= s
    }
    public normalize(): void {
        this.scale(1.0 / this.length())
    }
    public dot(v: Tuple3): number {
        return this.X * v.X + this.Y * v.Y + this.Z * v.Z
    }
}

export class Vector3 extends Direction3 {
    constructor(x: Tuple3)
    constructor(x: number, y: number, z: number)
    constructor(x: any, y?: number, z?: number) {
        super(x, y, z)
    }
}

export class Normal3 extends Direction3 {
    constructor(x: Tuple3)
    constructor(x: number, y: number, z: number)
    constructor(x: any, y?: number, z?: number) {
        super(x, y, z)
    }
}

export class Ray3 {

    public O: Point3;
    public D: Vector3;

    constructor(O: Point3, D: Direction3) {
        this.O = O
        this.D = D
    }
    pointAt(t: number): Point3 {
        let x = this.O.X + t * this.D.X
        let y = this.O.Y + t * this.D.Y
        let z = this.O.Z + t * this.D.Z
        return new Point3(x, y, z)
    }
}



export class Matrix {

    public values: number[][]

    constructor(rows: number, columns: number)
    constructor(values: number[][])
    constructor(x: any, columns?: number) {
        if (typeof x == 'number') {
            let rows = x
            this.values = new Array(rows)
            for (let i = 0; i < rows; ++i) {
                this.values[i] = new Array(columns)
                for (let j = 0; j < columns; ++j) {
                    if (i == j) {
                        this.values[i][j] = 1.0
                    } else {
                        this.values[i][j] = 0.0
                    }
                }
            }
        } else {
            this.values = x
        }
    }
    public rows(): number {
        return this.values.length
    }
    public columns(): number {
        return this.columns.length
    }
    public multiply(other: Matrix): Matrix {
        if (this.columns() != other.rows()) {
            return null
        }
        let result = new Matrix(this.rows(), other.columns())
        for (var r = 0; r < result.rows(); ++r) {
            for (var c = 0; c < result.columns(); ++c) {
                result.values[r][c] = 0
                for (var i = 0; i < this.columns(); ++i) {
                    result.values[r][c] += this.values[r][i] * other.values[i][c]
                }
            }
        }
        return result
    }
}



export class Matrix4x4 {

    public X00: number
    public X01: number
    public X02: number
    public X03: number
    public X10: number
    public X11: number
    public X12: number
    public X13: number
    public X20: number
    public X21: number
    public X22: number
    public X23: number
    public X30: number
    public X31: number
    public X32: number
    public X33: number
    
    public constructor()
    public constructor(m: Matrix4x4)
    public constructor(x00: number, x01: number, x02: number, x03: number,
                        x10: number, x11: number, x12: number, x13: number,
                        x20: number, x21: number, x22: number, x23: number,
                        x30: number, x31: number, x32: number, x33: number)
    public constructor(x?: any, x01?: number, x02?: number, x03?: number,
                        x10?: number, x11?: number, x12?: number, x13?: number,
                        x20?: number, x21?: number, x22?: number, x23?: number,
                        x30?: number, x31?: number, x32?: number, x33?: number)
    {
        if (x instanceof Matrix4x4) {
            this.X00 = x.X00
            this.X01 = x.X01
            this.X02 = x.X02
            this.X03 = x.X03
    
            this.X10 = x.X10
            this.X11 = x.X11
            this.X12 = x.X12
            this.X13 = x.X13
    
            this.X20 = x.X20
            this.X21 = x.X21
            this.X22 = x.X22
            this.X23 = x.X23
    
            this.X30 = x.X30
            this.X31 = x.X31
            this.X32 = x.X32
            this.X33 = x.X33
        } else {
            this.X00 = x
            this.X01 = x01
            this.X02 = x02
            this.X03 = x03

            this.X10 = x10
            this.X11 = x11
            this.X12 = x12
            this.X13 = x13

            this.X20 = x20
            this.X21 = x21
            this.X22 = x22
            this.X23 = x23

            this.X30 = x30
            this.X31 = x31
            this.X32 = x32
            this.X33 = x33
        }
    }
    
    
    public setAsIdentity(): void
    {
        this.X00 = 1.0
        this.X01 = 0.0
        this.X02 = 0.0
        this.X03 = 0.0

        this.X10 = 0.0
        this.X11 = 1.0
        this.X12 = 0.0
        this.X13 = 0.0

        this.X20 = 0.0
        this.X21 = 0.0
        this.X22 = 1.0
        this.X23 = 0.0

        this.X30 = 0.0
        this.X31 = 0.0
        this.X32 = 0.0
        this.X33 = 1.0
    }
    
    public multiply(m: Matrix4x4): Matrix4x4
    {
        return new Matrix4x4(this.X00*m.X00+this.X01*m.X10+this.X02*m.X20+this.X03*m.X30,
                                this.X00*m.X01+this.X01*m.X11+this.X02*m.X21+this.X03*m.X31,
                                this.X00*m.X02+this.X01*m.X12+this.X02*m.X22+this.X03*m.X32,
                                this.X00*m.X03+this.X01*m.X13+this.X02*m.X23+this.X03*m.X33,

                                this.X10*m.X00+this.X11*m.X10+this.X12*m.X20+this.X13*m.X30,
                                this.X10*m.X01+this.X11*m.X11+this.X12*m.X21+this.X13*m.X31,
                                this.X10*m.X02+this.X11*m.X12+this.X12*m.X22+this.X13*m.X32,
                                this.X10*m.X03+this.X11*m.X13+this.X12*m.X23+this.X13*m.X33,

                                this.X20*m.X00+this.X21*m.X10+this.X22*m.X20+this.X23*m.X30,
                                this.X20*m.X01+this.X21*m.X11+this.X22*m.X21+this.X23*m.X31,
                                this.X20*m.X02+this.X21*m.X12+this.X22*m.X22+this.X23*m.X32,
                                this.X20*m.X03+this.X21*m.X13+this.X22*m.X23+this.X23*m.X33,

                                this.X30*m.X00+this.X31*m.X10+this.X32*m.X20+this.X33*m.X30,
                                this.X30*m.X01+this.X31*m.X11+this.X32*m.X21+this.X33*m.X31,
                                this.X30*m.X02+this.X31*m.X12+this.X32*m.X22+this.X33*m.X32,
                                this.X30*m.X03+this.X31*m.X13+this.X32*m.X23+this.X33*m.X33)
    }
    
    
    public getInverse(): Matrix4x4
    {
        let s0: number = this.X00*this.X11 - this.X10*this.X01
        let s1: number = this.X00*this.X12 - this.X10*this.X02
        let s2: number = this.X00*this.X13 - this.X10*this.X03
        let s3: number = this.X01*this.X12 - this.X11*this.X02
        let s4: number = this.X01*this.X13 - this.X11*this.X03
        let s5: number = this.X02*this.X13 - this.X12*this.X03

        let c5: number = this.X22*this.X33 - this.X32*this.X23
        let c4: number = this.X21*this.X33 - this.X31*this.X23
        let c3: number = this.X21*this.X32 - this.X31*this.X22
        let c2: number = this.X20*this.X33 - this.X30*this.X23
        let c1: number = this.X20*this.X32 - this.X30*this.X22
        let c0: number = this.X20*this.X31 - this.X30*this.X21
        
        let inv_det: number = 1 / (s0*c5 - s1*c4 + s2*c3 + s3*c2 - s4*c1 + s5*c0)
        
        let m: Matrix4x4 = new Matrix4x4()

        m.X00 = (this.X11*c5 - this.X12*c4 + this.X13*c3)*inv_det
        m.X01 = (-this.X01*c5 + this.X02*c4 - this.X03*c3)*inv_det
        m.X02 = (this.X31*s5 - this.X32*s4 + this.X33*s3)*inv_det
        m.X03 = (-this.X21*s5 + this.X22*s4 - this.X23*s3)*inv_det

        m.X10 = (-this.X10*c5 + this.X12*c2 - this.X13*c1)*inv_det
        m.X11 = (this.X00*c5 - this.X02*c2 + this.X03*c1)*inv_det
        m.X12 = (-this.X30*s5 + this.X32*s2 - this.X33*s1)*inv_det
        m.X13 = (this.X20*s5 - this.X22*s2 + this.X23*s1)*inv_det

        m.X20 = (this.X10*c4 - this.X11*c2 + this.X13*c0)*inv_det
        m.X21 = (-this.X00*c4 + this.X01*c2 - this.X03*c0)*inv_det
        m.X22 = (this.X30*s4 - this.X31*s2 + this.X33*s0)*inv_det
        m.X23 = (-this.X20*s4 + this.X21*s2 - this.X23*s0)*inv_det

        m.X30 = (-this.X10*c3 + this.X11*c1 - this.X12*c0)*inv_det
        m.X31 = (this.X00*c3 - this.X01*c1 + this.X02*c0)*inv_det
        m.X32 = (-this.X30*s3 + this.X31*s1 - this.X32*s0)*inv_det
        m.X33 = (this.X20*s3 - this.X21*s1 + this.X22*s0)*inv_det
        
        return m
    }
}



export class Transform3 {

    public T: Matrix4x4
    public I: Matrix4x4

    public constructor()
    public constructor(trn: Matrix4x4, inv: Matrix4x4)
    public constructor(trn?: Matrix4x4, inv?: Matrix4x4)
    {
        if (trn) {
            this.T = trn
            this.I = inv
        } else {
            this.T = new Matrix4x4()
            this.I = new Matrix4x4()
            this.setAsIdentity()
        }
    }

    public multiply(t: Transform3): Transform3 {
        return new Transform3(this.T.multiply(t.T), t.I.multiply(this.I))
    }

    public toWorldSpace(p: Point3): Point3
    public toWorldSpace(v: Vector3): Vector3
    public toWorldSpace(n: Normal3): Normal3
    public toWorldSpace(t: any): any {
        if (t instanceof Point3) {
            let p = t
            let tx: number = this.T.X00 * p.X + this.T.X01 * p.Y + this.T.X02 * p.Z + this.T.X03
            let ty: number = this.T.X10 * p.X + this.T.X11 * p.Y + this.T.X12 * p.Z + this.T.X13
            let tz: number = this.T.X20 * p.X + this.T.X21 * p.Y + this.T.X22 * p.Z + this.T.X23
            let w: number = this.T.X30 * p.X + this.T.X31 * p.Y + this.T.X32 * p.Z + this.T.X33
            if (w != 1.0)
            {
                let inv_w: number = 1.0 / w
                return new Point3(tx * inv_w, ty * inv_w, tz * inv_w)
            }
            return new Point3(tx, ty, tz)
        } else if (t instanceof Vector3) {
            let v = t
            return new Vector3(this.T.X00 * v.X + this.T.X01 * v.Y + this.T.X02 * v.Z,
                            this.T.X10 * v.X + this.T.X11 * v.Y + this.T.X12 * v.Z,
                            this.T.X20 * v.X + this.T.X21 * v.Y + this.T.X22 * v.Z)
        } else if (t instanceof Normal3) {
            let n = t
            return new Normal3(this.I.X00 * n.X + this.I.X10 * n.Y + this.I.X20 * n.Z,
                            this.I.X01 * n.X + this.I.X11 * n.Y + this.I.X21 * n.Z,
                            this.I.X02 * n.X + this.I.X12 * n.Y + this.I.X22 * n.Z)
        } else if (t instanceof Ray3) {
            let r = t
            return new Ray3(this.toWorldSpace(r.O), this.toWorldSpace(r.D))
        } else {
            return null
        }
    }

    public toObjectSpace(p: Point3): Point3
    public toObjectSpace(v: Vector3): Vector3
    public toObjectSpace(n: Normal3): Normal3
    public toObjectSpace(t: any): any {
        if (t instanceof Point3) {
            let p = t
            let tx: number = this.I.X00 * p.X + this.I.X01 * p.Y + this.I.X02 * p.Z + this.I.X03
            let ty: number = this.I.X10 * p.X + this.I.X11 * p.Y + this.I.X12 * p.Z + this.I.X13
            let tz: number = this.I.X20 * p.X + this.I.X21 * p.Y + this.I.X22 * p.Z + this.I.X23
            let w : number = this.I.X30 * p.X + this.I.X31 * p.Y + this.I.X32 * p.Z + this.I.X33
            if (w != 1.0)
            {
                let inv_w: number = 1.0 / w
                return new Point3(tx * inv_w, ty * inv_w, tz * inv_w)
            }
            return new Point3(tx, ty, tz)
        } else if (t instanceof Vector3) {
            let v = t
            return new Vector3(this.I.X00 * v.X + this.I.X01 * v.Y + this.I.X02 * v.Z,
                this.I.X10 * v.X + this.I.X11 * v.Y + this.I.X12 * v.Z,
                this.I.X20 * v.X + this.I.X21 * v.Y + this.I.X22 * v.Z)
        } else if (t instanceof Normal3) {
            let n = t
            return new Normal3(this.T.X00 * n.X + this.T.X10 * n.Y + this.T.X20 * n.Z,
                this.T.X01 * n.X + this.T.X11 * n.Y + this.T.X21 * n.Z,
                this.T.X02 * n.X + this.T.X12 * n.Y + this.T.X22 * n.Z)
        } else if (t instanceof Ray3) {
            let r = t
            return new Ray3(this.toObjectSpace(r.O), this.toObjectSpace(r.D))
        } else {
            return null
        }
    }


    public setAsIdentity(): void
    {
        this.T.setAsIdentity()
        this.I.setAsIdentity()
    }
    
    public static createIdentity(): Transform3 {
        let r: Transform3 = new Transform3()
        r.setAsIdentity()
        return r
    }

    public setAsTranslator(x: number, y: number, z: number): void
    {
        this.setAsIdentity()

        this.T.X03 = x
        this.T.X13 = y
        this.T.X23 = z

        this.I.X03 = -x
        this.I.X13 = -y
        this.I.X23 = -z
    }
    
    public static createTranslator(x: number, y: number, z: number): Transform3
    {
        let r: Transform3 = new Transform3()
        r.setAsTranslator(x, y, z)
        return r
    }

    public setAsScaler(x: number, y: number, z: number): void
    {
        this.setAsIdentity()

        this.T.X00 = x
        this.T.X11 = y
        this.T.X22 = z

        this.I.X00 = 1.0 / x
        this.I.X11 = 1.0 / y
        this.I.X22 = 1.0 / z
    }
    
    public static createScaler(x: number, y: number, z: number): Transform3
    {
        let r: Transform3 = new Transform3()
        r.setAsScaler(x, y, z)
        return r
    }

    public setAsRotatorXY(t: number): void
    {
        this.setAsIdentity()

        let cost: number = Math.cos(t)
        let sint: number = Math.sin(t)

        this.T.X00 = cost
        this.T.X01 = -sint
        this.T.X10 = sint
        this.T.X11 = cost

        this.I.X00 = cost
        this.I.X01 = sint
        this.I.X10 = -sint
        this.I.X11 = cost
    }

    public setAsRotatorXZ(t: number): void
    {
        this.setAsIdentity()

        let cost: number = Math.cos(t)
        let sint: number = Math.sin(t)

        this.T.X00 = cost
        this.T.X02 = sint
        this.T.X20 = -sint
        this.T.X22 = cost

        this.I.X00 = cost
        this.I.X02 = -sint
        this.I.X20 = sint
        this.I.X22 = cost
    }

    public setAsRotatorYZ(t: number): void
    {
        this.setAsIdentity()

        let cost: number = Math.cos(t)
        let sint: number = Math.sin(t)

        this.T.X11 = cost
        this.T.X12 = -sint
        this.T.X21 = sint
        this.T.X22 = cost

        this.I.X11 = cost
        this.I.X12 = sint
        this.I.X21 = -sint
        this.I.X22 = cost
    }

    public setAsRotator(xy: number, xz: number, yz: number): void
    {
        let cx: number = Math.cos(yz)
        let sx: number = Math.sin(yz)
        let cy: number = Math.cos(xz)
        let sy: number = Math.sin(xz)
        let cz: number = Math.cos(xy)
        let sz: number = Math.sin(xy)

        this.T.X00 = this.I.X00 = cy * cz
        this.T.X01 = this.I.X10 = -cy * sz
        this.T.X02 = this.I.X20 = sy
        this.T.X03 = this.I.X30 = 0

        this.T.X10 = this.I.X01 = sx * sy * cz + cx * sz
        this.T.X11 = this.I.X11 = cx * cz - sx * sy * sz
        this.T.X12 = this.I.X21 = -sx * cy
        this.T.X13 = this.I.X31 = 0

        this.T.X20 = this.I.X02 = sx * sz - cx * sy * cz
        this.T.X21 = this.I.X12 = cx * sy * sz + sx * cz
        this.T.X22 = this.I.X22 = cx * cy
        this.T.X23 = this.I.X32 = 0

        this.T.X30 = this.I.X03 = 0
        this.T.X31 = this.I.X13 = 0
        this.T.X32 = this.I.X23 = 0
        this.T.X33 = this.I.X33 = 1
    }
    
    public static createRotator(xy: number, xz: number, yz: number): Transform3
    {
        let r: Transform3 = new Transform3()
        r.setAsRotator(xy, xz, yz)
        return r
    }


    public setAsPerspective(fov: number, n: number, f: number): void
    {
        this.setAsIdentity()

        let p: number = 1.0 / (1.0 - n / f)
        let inv_tan: number = 1.0 / Math.tan(fov * 0.5)
        this.T.X00 = inv_tan
        this.T.X11 = inv_tan
        this.T.X22 = p
        this.T.X22 = -n * p
        this.T.X32 = 1.0
        this.T.X33 = 0.0
    }
    
    
    public setAsBasis(c: Tuple3, x: Tuple3, y: Tuple3, z: Tuple3): void
    {
        this.T.X00 = x.X
        this.T.X10 = x.Y
        this.T.X20 = x.Z
        this.T.X30 = 0.0
        
        this.T.X01 = y.X
        this.T.X11 = y.Y
        this.T.X21 = y.Z
        this.T.X31 = 0.0
        
        this.T.X02 = z.X
        this.T.X12 = z.Y
        this.T.X22 = z.Z
        this.T.X32 = 0.0
        
        this.T.X03 = c.X
        this.T.X13 = c.Y
        this.T.X23 = c.Z
        this.T.X33 = 1.0
        
        this.I = this.T.getInverse()
    }
}

export class CoordinateSystem3 {
    public transform: Transform3
    constructor() {
        this.transform = new Transform3()
    }
    public toWorldSpace(x: any): any {
        return this.transform.toWorldSpace(x)
    }
    public toObjectSpace(x: any): any {
        return this.transform.toObjectSpace(x)
    }
}






