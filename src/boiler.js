const th = require('three')

module.exports = () => {
    const scene = new th.Scene()
    const camera = new th.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
    const renderer = new th.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const render = t => {
        requestAnimationFrame(render)
        renderer.render(scene, camera)
    }
    render()

    return scene
}
