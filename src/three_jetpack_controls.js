const th = require('three')

const lock_pointer = on_change => {
    document.addEventListener('pointerlockchange',
        e => on_change(!!document.pointerLockElement))

    document.body.addEventListener("click",
        () => document.body.requestPointerLock())
}

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

    lock_pointer(lock => lock ?
        document.addEventListener('mousemove', onmousemove) :
        document.removeEventListener('mousemove', onmousemove))
}
