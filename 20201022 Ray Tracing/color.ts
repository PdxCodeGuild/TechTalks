

export class RGBColor {

    public static BLACK: RGBColor = new RGBColor(0, 0, 0)
    public static WHITE: RGBColor = new RGBColor(1, 1, 1)

    public R: number
    public G: number
    public B: number

    constructor(c: RGBColor)
    constructor(r: number, g: number, b: number)
    constructor(x: any, g?: number, b?: number) {
        if (x instanceof RGBColor) {
            let c = x
            this.R = c.R
            this.G = c.G
            this.B = c.B
        } else {
            let r = x
            this.R = r
            this.G = g
            this.B = b
        }
    }
    public add(c: any): RGBColor {
        if (c instanceof RGBColor) {
            return new RGBColor(this.R+c.R, this.G+c.G, this.B+c.B)
        } else {
            return new RGBColor(this.R+c, this.G+c, this.B+c)
        }
    }
    public multiply(c: any): RGBColor {
        if (c instanceof RGBColor) {
            return new RGBColor(this.R*c.R, this.G*c.G, this.B*c.B)
        } else {
            return new RGBColor(this.R*c, this.G*c, this.B*c)
        }
    }
}