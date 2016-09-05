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
    screenfull.request()
  })

  let keys = []
  document.addEventListener('keyup', e => {
    keys[e.keyCode] = false
  })
  document.addEventListener('keydown', e => {
    keys[e.keyCode] = true
  })

  const anon = new th.Quaternion()
  const player_up = () => {
    camera.up.set(0, 0.0002, 0)
    camera.getWorldQuaternion(anon)
    camera.up.applyQuaternion(anon)
    return camera.up
  }

  const vel = new th.Vector3(0, 0, 0)

  const gravity = new th.Vector3(0, -0.0001, 0)

  const tick = t => {
    // pos += ( vel * t )
    // vel += ( up * t )
    yaw.position.addScaledVector(vel, t)
    vel.addScaledVector(player_up(), keys[32] ? t : 0) //spacebar
    vel.addScaledVector(gravity, t)

    if (yaw.position.y < 10) {
      yaw.position.y = 10
      vel.set(0, Math.max(0, vel.y), 0)
    }

  }

  let last_update = Date.now()

  const each_frame = () => {
    const n = Date.now()
    tick(n - last_update)
    last_update = n
    requestAnimationFrame(each_frame)
  }

  each_frame()

}
