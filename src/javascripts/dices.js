import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
})

function initThree() {
  //находим html-контейнер
  const model = document.querySelector('.model')

  //создаём сцену
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#e1e1df')
  scene.position.set(0, 0, 0)

  //создаём камеру
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )

  camera.position.set(1, 1, 1)

  //создаём визуализатор-рендерер
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  const rendererWidth = window.innerWidth / 2
  const rendererHeight = window.innerHeight / 2
  renderer.setSize(rendererWidth, rendererHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  model.appendChild(renderer.domElement)

  //работаем с post-processing
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)

  const fxaaPass = new ShaderPass(FXAAShader)
  const outputPass = new OutputPass()
  const pixelRatio = renderer.getPixelRatio()

  fxaaPass.material.uniforms['resolution'].value.x =
    1 / (model.offsetWidth * pixelRatio)
  fxaaPass.material.uniforms['resolution'].value.y =
    1 / (model.offsetHeight * pixelRatio)
  composer.addPass(renderPass)
  composer.addPass(fxaaPass)
  composer.addPass(outputPass)

  //подключаем модель
  {
    const loader = new GLTFLoader()
    loader.load(
      '../3d/scene.gltf',
      (gltf) => {
        scene.add(gltf.scene)
      },
      (error) => {
        console.log('Error:' + error)
      }
    )
  }

  //добавляем свет
  {
    const light = new THREE.AmbientLight(0xeeeeee)
    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0xeeeeee, 1)
    light.position.set(-80, 100, 0)
    light.lookAt(100, 100, 0)

    // const helper = new THREE.DirectionalLightHelper(light, 5)

    scene.add(light)
  }
  {
    const light = new THREE.DirectionalLight(0xeeeeee, 1)
    light.position.set(50, 100, 0)
    light.lookAt(100, 100, 0)

    // const helper = new THREE.DirectionalLightHelper(light, 5)

    scene.add(light)
  }

  //управление моделью
  const controls = new OrbitControls(camera, renderer.domElement)
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 5
  controls.enableDamping = true
  controls.maxDistance = 300
  controls.maxPolarAngle = Math.PI / 2.2

  //анимация модели
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    composer.render(scene, camera)
  }
  animate()

  //обновление при ресайзе окна
  window.addEventListener('resize', onWindowResize)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(rendererWidth, rendererHeight)
  }
}
