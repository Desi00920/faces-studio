import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CAROUSEL_IMAGES = [
  '/images/frau-creme.jpg',
  '/images/allgemein1.jpg',
  '/images/allgemein2.jpg',
  '/images/about-cherry.jpg',
  '/images/svc-peony.jpg',
  '/images/svc-succulent.jpg',
  '/images/prod-eucalyptus.jpg',
  '/images/ritual-sunset.jpg',
  '/images/svc-leaves.jpg',
  '/images/prod-leaf.jpg',
]

const vertexShader = `
  #define PI 3.141592653

  uniform float uScrollSpeed;
  uniform float uCurveStrength;
  uniform float uCurveFrequency;
  uniform vec2 uPlaneSize;
  uniform vec2 uImageSize;
  uniform float uImageAspect;
  uniform float uPlaneAspect;

  varying vec2 vUv;

  void main() {
    vec2 uv = uv;
    vUv = uv;

    // Cover-fit aspect ratio correction
    float aspect1 = uImageAspect / uPlaneAspect;
    float aspect2 = uPlaneAspect / uImageAspect;
    if (aspect1 > aspect2) {
      uv.y = uv.y * aspect2;
      uv.x = uv.x + (1.0 - aspect1 * uv.y) * 0.0;
    } else {
      uv.x = uv.x * aspect1;
      uv.y = uv.y + (1.0 - aspect2 * uv.x) * 0.0;
    }
    vUv = uv;

    // World-position calculation for curve
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;

    // Curve deformation
    vec3 pos = position;
    float xDisplacement = uCurveStrength * cos(worldPosition.x * uCurveFrequency);
    pos.y += xDisplacement;
    float zDisplacement = uCurveStrength * sin(worldPosition.x * uCurveFrequency);
    pos.z += zDisplacement;

    // Velocity-based vertical skew
    float yDisplacement = -sin(uv.x * PI) * uScrollSpeed;
    pos.y += yDisplacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(uTexture, vUv);
    gl_FragColor = tex;
  }
`

interface MeshData {
  mesh: THREE.Mesh
  material: THREE.ShaderMaterial
  originalX: number
  planeWidth: number
}

export default function Carousel3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneData = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    meshes: MeshData[]
    totalWidth: number
    scrollTarget: number
    currentScroll: number
    rafId: number
    isDragging: boolean
    lastPointerX: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#1a2e26')
    scene.fog = new THREE.Fog('#1a2e26', 4, 10)

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 6.5)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })
    renderer.setPixelRatio(Math.min(1.6, window.devicePixelRatio))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)

    // Load textures and create meshes
    const loader = new THREE.TextureLoader()
    const planeHeight = 2.2
    const curveStrength = -0.35
    const curveFrequency = 0.35

    const meshes: MeshData[] = []
    let totalWidth = 0

    // Use a cylinder-like geometry approach - create curved planes
    const createCurvedPlane = (width: number, height: number, segments: number) => {
      const geometry = new THREE.PlaneGeometry(width, height, segments, 1)
      const positions = geometry.attributes.position
      const radius = 6
      const angleSpan = width / radius

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const angle = (x / width) * angleSpan
        const newX = Math.sin(angle) * radius
        const newZ = Math.cos(angle) * radius - radius
        positions.setX(i, newX)
        positions.setZ(i, newZ)
      }
      geometry.computeVertexNormals()
      return geometry
    }

    const loadPromises = CAROUSEL_IMAGES.map((src) => {
      return new Promise<void>((resolve) => {
        loader.load(src, (texture) => {
          texture.minFilter = THREE.LinearFilter
          texture.magFilter = THREE.LinearFilter

          const imgAspect = texture.image.width / texture.image.height
          const planeWidth = imgAspect * planeHeight
          const planeAspect = planeWidth / planeHeight

          const geometry = createCurvedPlane(planeWidth, planeHeight, 32)

          const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: false,
            side: THREE.DoubleSide,
            uniforms: {
              uTexture: { value: texture },
              uScrollSpeed: { value: 0.0 },
              uCurveStrength: { value: curveStrength },
              uCurveFrequency: { value: curveFrequency },
              uPlaneSize: { value: new THREE.Vector2(planeWidth, planeHeight) },
              uImageSize: { value: new THREE.Vector2(texture.image.width, texture.image.height) },
              uImageAspect: { value: imgAspect },
              uPlaneAspect: { value: planeAspect },
            },
          })

          const mesh = new THREE.Mesh(geometry, material)
          mesh.position.set(0, 0, 0)

          scene.add(mesh)

          meshes.push({
            mesh,
            material,
            originalX: 0,
            planeWidth,
          })

          totalWidth += planeWidth
          resolve()
        }, undefined, () => resolve())
      })
    })

    Promise.all(loadPromises).then(() => {
      // Position meshes in a row
      let currentX = 0
      meshes.forEach((data) => {
        data.originalX = currentX + data.planeWidth / 2 - totalWidth / 2
        data.mesh.position.x = data.originalX
        currentX += data.planeWidth
      })

      sceneData.current = {
        renderer,
        scene,
        camera,
        meshes,
        totalWidth,
        scrollTarget: 0,
        currentScroll: 0,
        rafId: 0,
        isDragging: false,
        lastPointerX: 0,
      }

      animate()
    })

    // Animation loop
    const animate = () => {
      const data = sceneData.current
      if (!data) return

      data.rafId = requestAnimationFrame(animate)

      // Smooth scroll lerp
      data.currentScroll += (data.scrollTarget - data.currentScroll) * 0.12
      const velocity = data.scrollTarget - data.currentScroll

      // Update meshes
      data.meshes.forEach((meshData) => {
        // Update scroll speed uniform
        meshData.material.uniforms.uScrollSpeed.value = velocity * 0.5

        // Position with wrapping
        let x = meshData.originalX + data.currentScroll
        const halfTotal = data.totalWidth / 2

        // Infinite wrapping
        while (x < -halfTotal - meshData.planeWidth / 2) {
          x += data.totalWidth
        }
        while (x > halfTotal + meshData.planeWidth / 2) {
          x -= data.totalWidth
        }

        meshData.mesh.position.x = x
      })

      data.renderer.render(data.scene, data.camera)
    }

    // Wheel handler
    const onWheel = (e: WheelEvent) => {
      if (!sceneData.current) return
      sceneData.current.scrollTarget += e.deltaY * 0.005
    }

    // Drag handlers
    const onPointerDown = (e: PointerEvent) => {
      if (!sceneData.current) return
      sceneData.current.isDragging = true
      sceneData.current.lastPointerX = e.clientX
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!sceneData.current || !sceneData.current.isDragging) return
      const delta = e.clientX - sceneData.current.lastPointerX
      sceneData.current.scrollTarget += delta * 0.01
      sceneData.current.lastPointerX = e.clientX
    }

    const onPointerUp = () => {
      if (!sceneData.current) return
      sceneData.current.isDragging = false
    }

    // Keyboard handler — only intercept when NOT typing in a form
    const onKeyDown = (e: KeyboardEvent) => {
      if (!sceneData.current) return
      // Don't steal keys from inputs, textareas, or selects
      const target = e.target as HTMLElement
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')) return
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        sceneData.current.scrollTarget += 0.5
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        sceneData.current.scrollTarget -= 0.5
      }
    }

    // Auto-scroll (slow drift)
    let autoScrollSpeed = 0.002
    const autoScroll = () => {
      if (sceneData.current && !sceneData.current.isDragging) {
        sceneData.current.scrollTarget += autoScrollSpeed
      }
      requestAnimationFrame(autoScroll)
    }
    autoScroll()

    window.addEventListener('wheel', onWheel, { passive: true })
    renderer.domElement.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('keydown', onKeyDown)

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)

      if (sceneData.current) {
        cancelAnimationFrame(sceneData.current.rafId)
      }
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
