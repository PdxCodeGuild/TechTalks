

import { Ray3 } from './geometry3'
import { RGBColor } from './color'
import { Shape, Intersection, Sphere } from './shape'
import { Material, LambertianReflectance } from './material'
import { Light, LightVector, PointLight } from './light'
import { Camera, PerspectiveCamera } from './camera'

class Scene {
    public shapes: Shape[]
    public lights: Light[]
    public camera: Camera
    constructor() {
        this.shapes = []
        this.lights = []
        this.camera = new PerspectiveCamera(1.0)
    }
    intersectWith(r: Ray3): Intersection {
        let it: Intersection = null
        for (let i=0; i<this.shapes.length; ++i) {
            let it_temp = this.shapes[i].intersectWith(r)
            if (it == null || (it_temp != null && it_temp.T < it.T)) {
                it = it_temp
            }
        }
        return it
    }
}

function setPixel(x: number, y: number, c: RGBColor, cnv: HTMLCanvasElement) {
    let ctx = cnv.getContext('2d')
    let image_data = ctx.createImageData(1, 1)
    image_data.data[0] = Math.floor(c.R*255)
    image_data.data[1] = Math.floor(c.G*255)
    image_data.data[2] = Math.floor(c.B*255)
    image_data.data[3] = 1
    ctx.putImageData(image_data, x, y)
}

let cnv: HTMLCanvasElement = document.querySelector('#cnv')
let scene: Scene = new Scene()

let white_matte: Material = new LambertianReflectance(RGBColor.WHITE)
let sphere: Sphere = new Sphere(100, white_matte)
scene.shapes.push(sphere)

let camera: PerspectiveCamera = new PerspectiveCamera(4.0)
camera.transform.setAsTranslator(0, 0, -4)
scene.camera = camera

let light: PointLight = new PointLight(new RGBColor(100, 100, 100))
light.transform.setAsTranslator(-10, -10, -10)
scene.lights.push(light)

console.log('hello')

// for testing
for (let x=0; x<cnv.width; ++x) {
    for (let y=0; y<cnv.height; ++y) {
        let rw: Ray3 = scene.camera.generateRay(x, y, cnv.width, cnv.height)
        console.log(x + ' ' + y)
        if (scene.intersectWith(rw)) {
            setPixel(x, y, RGBColor.WHITE, cnv)
        } else {
            setPixel(x, y, RGBColor.BLACK, cnv)
        }
    }
}


// for (let x=0; x<cnv.width; ++x) {
//     for (let y=0; y<cnv.height; ++y) {
//         let rw: Ray3 = scene.camera.generateRay(x, y, cnv.width, cnv.height)
//         let it = scene.intersectWith(rw)
//         if (it == null) {
//             setPixel(x, y, RGBColor.BLACK, cnv)
//         }
//         let sg = it.shape.getSurfaceGeometry(it)
//         let material = it.shape.getMaterial()

//         let pixel_color = new RGBColor(0, 0, 0)
//         for (let i=0; i<scene.lights.length; ++i) {
//             let lvs: LightVector[] = scene.lights[i].colorAt(it.Pw)
//             for (let j=0; j<lvs.length; ++j) {
//                 let shadow_test_ray: Ray3 = new Ray3(it.Po, lvs[i])
//                 if (scene.intersectWith(shadow_test_ray) == null) {
//                     let c: RGBColor = material.getColor(sg, lvs[i])
//                     pixel_color = pixel_color.add(c)
//                 }
//             }
//         }
//         setPixel(x, y, pixel_color, cnv)
//     }
// }

