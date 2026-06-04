export default function FogOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, transparent 10%, #1a2e26 85%)',
        mixBlendMode: 'multiply',
        opacity: 0.7,
      }}
    />
  )
}
