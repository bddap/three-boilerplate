const th = require('three')
const screenfull = require('screenfull')
const pointer_lock = require('pointer-lock')

module.exports = (scene, camera) => {
  const pitch = new th.Object3D()
  pitch.add(camera)

  const yaw = new th.Object3D()
  yaw.position.y = 10
  yaw.add(pitch)

  scene.add(yaw)

  const PI_2 = Math.PI / 2

  const onmousemove = event => {
    yaw.rotation.y -= event.movementX * 0.002
    pitch.rotation.x -= event.movementY * 0.002
    pitch.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitch.rotation.x))
  }

  document.body.addEventListener("click", () => {
    const p = pointer_lock(document.body)
    p.on('attain', () => document.addEventListener('mousemove', onmousemove))
    p.on('release', () => document.removeEventListener('mousemove', onmousemove))
  })

}
