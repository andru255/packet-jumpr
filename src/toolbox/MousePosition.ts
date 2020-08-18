export function getMousePosition(
  canvas: HTMLCanvasElement,
  event: MouseEvent
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export function isRectInsideOther(
  position: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number }
) {
  return (
    position.x > rect.x &&
    position.x < rect.x + rect.width &&
    position.y > rect.y &&
    position.y < rect.y + rect.height
  );
}
