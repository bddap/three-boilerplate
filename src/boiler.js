const th = require('three')

module.exports = () => {
    const scene = new th.Scene()
    const camera = new th.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100000)
    const renderer = new th.WebGLRenderer()
    document.body.appendChild(renderer.domElement)

    const resize = () => {
        const [w, h] = [innerWidth, innerHeight]
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
    }
    resize()
    addEventListener("resize", resize)

    const render = t => {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()

    return [scene, camera]
}
