"use client"

import { useEffect, useRef } from "react"

export default function PatternBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // 패턴 그리기
    const drawPattern = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 패턴 설정
      const dotSize = 1
      const spacing = 20
      const rows = Math.ceil(canvas.height / spacing)
      const cols = Math.ceil(canvas.width / spacing)

      ctx.fillStyle = "#10B981" // 녹색 점

      // 점 그리기
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          ctx.globalAlpha = 0.05 // 투명도
          ctx.beginPath()
          ctx.arc(j * spacing, i * spacing, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    drawPattern()
    window.addEventListener("resize", drawPattern)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("resize", drawPattern)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-30" />
}
