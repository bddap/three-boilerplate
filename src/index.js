const th = require('three'),
  [scene, camera] = require('./boiler.js')(),
  jpc = require('./three_jetpack_controls.js')

const box = new th.Mesh(new th.BoxGeometry(200, 200, 200), new th.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true
}))

setInterval(() => {
  box.position.z -= 1
  box.position.y += 0.1
})

scene.add(box)

{
  const p = new th.PlaneGeometry(2000, 2000, 5, 5)
  p.applyMatrix(new th.Matrix4().makeRotationX(-Math.PI / 2))
  new th.TextureLoader().load('vesta.jpg', t => {
    t.wrapS = t.wrapT = th.RepeatWrapping
    t.repeat.set(32, 32)
    material = new th.MeshBasicMaterial({
      map: t
    })
    scene.add(new th.Mesh(p, material))
  })
}

jpc(scene, camera)
