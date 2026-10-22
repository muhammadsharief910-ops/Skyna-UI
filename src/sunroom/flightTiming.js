// Allocate extra travel time to bends without limiting the plane's heading.
// Unwrap tangent angles so crossing +/-180 degrees never causes a snap.
export function createFlightSampler(pointAt, count = 600) {
  const samples = [];
  let previousAngle = 0;
  let rotation = 0;
  let time = 0;
  for (let i = 0; i <= count; i++) {
    const progress = i / count;
    const point = pointAt(progress);
    const before = pointAt(Math.max(0, progress - 0.5 / count));
    const after = pointAt(Math.min(1, progress + 0.5 / count));
    const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    const delta = i ? ((angle - previousAngle + 540) % 360) - 180 : 0;
    rotation = i ? rotation + delta : angle;
    if (i) {
      const previous = samples[i - 1];
      // Keep the opening straights unhurried too; bend-only weighting made
      // the plane rush through them before slowing down at the curl.
      time += Math.hypot(point.x - previous.x, point.y - previous.y) * 2.2
        + Math.abs(delta) * 2.5;
    }
    samples.push({ x: point.x, y: point.y, rotation, progress, time });
    previousAngle = angle;
  }
  const duration = time;
  return (progress) => {
    const target = Math.max(0, Math.min(1, progress)) * duration;
    let low = 0;
    let high = count;
    while (low < high) {
      const middle = (low + high) >> 1;
      if (samples[middle].time < target) low = middle + 1;
      else high = middle;
    }
    const b = samples[low];
    const a = samples[Math.max(0, low - 1)];
    const mix = b.time === a.time ? 0 : (target - a.time) / (b.time - a.time);
    return {
      x: a.x + (b.x - a.x) * mix,
      y: a.y + (b.y - a.y) * mix,
      rotation: a.rotation + (b.rotation - a.rotation) * mix,
      progress: a.progress + (b.progress - a.progress) * mix,
    };
  };
}
