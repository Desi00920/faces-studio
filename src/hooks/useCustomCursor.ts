import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const isHovering = useRef(false)

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!cursorRef.current) return
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.08,
      ease: 'power2.out',
    })
  }, [])

  const onMouseEnterInteractive = useCallback(() => {
    if (!cursorRef.current || isHovering.current) return
    isHovering.current = true
    gsap.to(cursorRef.current, {
      width: 40,
      height: 40,
      backgroundColor: '#f6f3ee',
      mixBlendMode: 'difference',
      duration: 0.25,
      ease: 'power2.out',
    })
  }, [])

  const onMouseLeaveInteractive = useCallback(() => {
    if (!cursorRef.current || !isHovering.current) return
    isHovering.current = false
    gsap.to(cursorRef.current, {
      width: 10,
      height: 10,
      backgroundColor: '#ff5757',
      mixBlendMode: 'normal',
      duration: 0.25,
      ease: 'power2.out',
    })
  }, [])

  useEffect(() => {
    // Skip on admin page and mobile
    if (window.innerWidth < 1024) return
    if (window.location.hash === '#/admin' || window.location.pathname === '/admin') return

    const cursor = document.createElement('div')
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      background-color: #ff5757;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: none;
    `
    document.body.appendChild(cursor)
    cursorRef.current = cursor
    document.body.style.cursor = 'none'

    window.addEventListener('mousemove', onMouseMove)

    // Add hover listeners to interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive)
      el.addEventListener('mouseleave', onMouseLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.body.style.cursor = ''
      cursor.remove()
    }
  }, [onMouseMove, onMouseEnterInteractive, onMouseLeaveInteractive])

  return cursorRef
}
