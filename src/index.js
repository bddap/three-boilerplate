const th = require('three')
const [scene, camera] = require('./boiler.js')()
const jpc = require('./three_jetpack_controls.js')

const box = new th.Mesh(new th.BoxGeometry(200, 200, 200), new th.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
}))

setInterval(() => {
    box.position.z -= 1
})

scene.add(box);

jpc(scene, camera)
