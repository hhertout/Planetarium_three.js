import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.getElementById('canvas')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const textureLoader = new THREE.TextureLoader()
const earthTexture = textureLoader.load('./static/textures/earth.jpg')
const sunTexture = textureLoader.load('./static/textures/sun.jpg')

const scene = new THREE.Scene()


const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 60, 60),
    new THREE.MeshStandardMaterial({ 
        map: earthTexture,
    })
)
scene.add(earth)

const sun = new THREE.Mesh(
    new THREE.SphereGeometry(3, 60, 60),
    new THREE.MeshBasicMaterial({
        map: sunTexture
    })
)
scene.add(sun)


const light = new THREE.PointLight()
light.intensity = 1.5
light.decay = 4
scene.add(light)
const ambientLight = new THREE.AmbientLight()
ambientLight.intensity = 0.2
scene.add(ambientLight)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)
camera.position.set(0, 15, 15)
camera.rotation.y = Math.PI * 0.5
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    earth.position.x = Math.cos(elapsedTime * 0.2) * 10
    earth.position.z = Math.sin(elapsedTime * 0.2) * 10

    earth.rotation.y = elapsedTime * 0.5
    sun.rotation.y = - elapsedTime * 0.1

    renderer.render(scene, camera)

    controls.update();

    window.requestAnimationFrame(tick)
}

tick()