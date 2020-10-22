

export class RTMath {
    public static quadratic(a: number, b: number, c: number): number[] {
        let t: number = b*b - 4.0*a*c
        if (t < 0.0) {
            return []
        }
        if (t < 1E-3) {
            return [-b/(2.0*a)]
        }
        t = Math.sqrt(t)
        if (b < 0.0) {
            t = -0.5*(b-t)
        } else {
            t = -0.5*(b+t)
        }
        let r0: number = t/a
        let r1: number = c/t
        if (r0 < r1) {
            return [r0, r1]
        }
        return [r1, r0]
    }
}