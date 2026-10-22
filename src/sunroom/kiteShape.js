const TAU = Math.PI * 2;
export const KITE_KNOT = { x: 251, y: 295 };

// Both strips share a fixed attachment point. Waves travel along their length,
// rather than rotating detached pieces around the kite.
export function kiteRibbonPath(phase = 0, strand = 0) {
  const points = [];
  const samples = 46;
  const center = (u) => ({
    x: KITE_KNOT.x + (strand ? 261 : 291) * u
      + Math.sin(u * 7 - phase + strand) * u * 9,
    y: KITE_KNOT.y + (strand ? 199 : 157) * u
      + Math.sin(u * 9 - phase + strand * 1.8) * Math.pow(u, 0.85) * 24,
  });
  for (let i = 0; i <= samples; i++) {
    const u = i / samples;
    const point = center(u);
    const before = center(Math.max(0, u - 0.002));
    const after = center(Math.min(1, u + 0.002));
    const dx = after.x - before.x;
    const dy = after.y - before.y;
    const length = Math.hypot(dx, dy) || 1;
    const taper = 0.3 + Math.min(1, u * 6) * 0.7;
    const fold = 0.55 + 0.45 * Math.pow(Math.sin(u * 10 - phase + strand), 2);
    const halfWidth = (1.2 + Math.sin(Math.PI * u) * (strand ? 9 : 12)) * fold * taper;
    points.push({
      a: [point.x - dy / length * halfWidth, point.y + dx / length * halfWidth],
      b: [point.x + dy / length * halfWidth, point.y - dx / length * halfWidth],
    });
  }
  const xy = (p) => p.map((n) => n.toFixed(2)).join(" ");
  return `M${xy(points[0].a)} ${points.slice(1).map((p) => `L${xy(p.a)}`).join(" ")} ${points.slice().reverse().map((p) => `L${xy(p.b)}`).join(" ")} Z`;
}

export function extendedKiteCordPath({ x, y, edgeX, edgeY }, phase = 0) {
  const span = Math.max(0, edgeY - y);
  const bendY = y + Math.min(190, span * 0.3);
  const breeze = Math.sin(phase) * 7;
  const n = (value) => value.toFixed(2);
  return `M${n(x)} ${n(y)} C${n(x + 22)} ${n(y + span * 0.1)} ${n(edgeX - 22)} ${n(bendY - 35)} ${n(edgeX - 6)} ${n(bendY)} C${n(edgeX + breeze)} ${n(bendY + (edgeY - bendY) * 0.35)} ${n(edgeX - breeze)} ${n(bendY + (edgeY - bendY) * 0.72)} ${n(edgeX)} ${n(edgeY)}`;
}

export const KITE_WAVE_CYCLE = TAU;
