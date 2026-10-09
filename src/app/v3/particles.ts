import * as THREE from "three";

/* Particle field that spells a word, scatters from the cursor and morphs into a sphere.
   One THREE.Points draw call; all per-frame values live in uniforms, not React state. */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uIntro;
  uniform vec2  uMouse;
  uniform float uSize;
  uniform float uText;
  uniform float uSphere;
  attribute vec3 aSphere;
  attribute vec3 aScatter;
  attribute float aSeed;
  varying float vGlow;
  void main() {
    // intro: fly in from a random cloud, then morph text -> sphere on scroll
    vec3 p = mix(aScatter, position * vec3(uText, uText, 1.0), smoothstep(0.0, 1.0, uIntro));
    float m = smoothstep(0.0, 1.0, uMorph);
    float a = uTime * 0.25;
    vec3 s = aSphere * uSphere;
    s.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * s.xz;
    p = mix(p, s, m);
    // gentle breathing
    float k = mix(uText / 6.0, 1.0, m);
    p += 0.03 * k * vec3(sin(uTime * 1.3 + aSeed * 6.28), cos(uTime * 1.1 + aSeed * 9.0), 0.0);
    // cursor repel (in the text plane)
    vec2 d = p.xy - uMouse;
    float r = length(d);
    float push = smoothstep(1.4, 0.0, r) * (1.0 - m);
    p.xy += normalize(d + 1e-4) * push * 0.9;
    vGlow = push + m * 0.35;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * clamp(k, 0.62, 1.0) * (1.0 + aSeed * 0.8) * (10.0 / -mv.z);
  }
`;

const fragment = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vGlow;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(mix(uColorA, uColorB, clamp(vGlow, 0.0, 1.0)), alpha);
  }
`;

function sampleText(lines: string[], font: string, target: number) {
  // draw the lines as large as possible, then pick a grid step that yields ~target particles
  const W = 1000;
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d", { willReadFrequently: true })!;
  ctx.font = `800 100px ${font}`;
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  const size = 100 * ((W * 0.96) / widest);
  const H = Math.ceil(size * 1.02 * lines.length + size * 0.2);
  cv.width = W; cv.height = H;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `800 ${size}px ${font}`;
  lines.forEach((l, i) => ctx.fillText(l, W / 2, H / 2 + (i - (lines.length - 1) / 2) * size * 1.02));
  const data = ctx.getImageData(0, 0, W, H).data;
  let filled = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) filled++;
  const step = Math.max(2, Math.round(Math.sqrt(filled / target)));
  const pts: number[] = [];
  for (let y = 0; y < H; y += step)
    for (let x = 0; x < W; x += step)
      if (data[(y * W + x) * 4 + 3] > 128) pts.push((x - W / 2) / W, -(y - H / 2) / W);
  return { pts, aspect: H / W };
}

export type ParticleScene = {
  setMorph: (v: number) => void;
  setIntro: (v: number) => void;
  setMouse: (x: number, y: number) => void;
  render: (t: number) => void;
  resize: () => void;
  dispose: () => void;
};

export function createParticles(canvas: HTMLCanvasElement, font: string): ParticleScene {
  const mobile = innerWidth < 768;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.z = 10;

  const { pts: flat, aspect: textAspect } = sampleText(["ESHWAR", "KADAM"], font, mobile ? 6000 : 11000);
  const n = flat.length / 2;
  const pos = new Float32Array(n * 3), sphere = new Float32Array(n * 3), scatter = new Float32Array(n * 3), seed = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = flat[i * 2];
    pos[i * 3 + 1] = flat[i * 2 + 1];
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    // fibonacci sphere
    const k = i + 0.5, phi = Math.acos(1 - (2 * k) / n), th = Math.PI * (1 + Math.sqrt(5)) * k, R = 1;
    sphere[i * 3] = R * Math.cos(th) * Math.sin(phi);
    sphere[i * 3 + 1] = R * Math.cos(phi);
    sphere[i * 3 + 2] = R * Math.sin(th) * Math.sin(phi);
    scatter[i * 3] = (Math.random() - 0.5) * 22;
    scatter[i * 3 + 1] = (Math.random() - 0.5) * 14;
    scatter[i * 3 + 2] = (Math.random() - 0.5) * 8;
    seed[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSphere", new THREE.BufferAttribute(sphere, 3));
  geo.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uIntro: { value: 0 },
    uMouse: { value: new THREE.Vector2(99, 99) },
    uText: { value: 8 },
    uSphere: { value: 2.6 },
    uSize: { value: (mobile ? 2.2 : 2.6) * renderer.getPixelRatio() },
    uColorA: { value: new THREE.Color("#ede6f6") },
    uColorB: { value: new THREE.Color("#4fe3c1") },
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  scene.add(new THREE.Points(geo, mat));

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // fit the word to ~84% of the visible width, and the sphere inside the shorter side
    const visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    const visW = visH * camera.aspect;
    // fit width, but never taller than ~46% of the view so the copy below stays clear
    uniforms.uText.value = Math.min(visW * (visW < visH ? 0.9 : 0.62), (visH * 0.46) / textAspect);
    uniforms.uSphere.value = Math.min(visW, visH) * 0.34;
  };
  resize();

  const ray = new THREE.Vector3();
  return {
    setMorph: (v) => { uniforms.uMorph.value = v; },
    setIntro: (v) => { uniforms.uIntro.value = v; },
    setMouse: (x, y) => {
      // project normalized device coords onto the z=0 plane
      ray.set(x, y, 0.5).unproject(camera).sub(camera.position).normalize();
      const t = -camera.position.z / ray.z;
      uniforms.uMouse.value.set(camera.position.x + ray.x * t, camera.position.y + ray.y * t);
    },
    render: (t) => { uniforms.uTime.value = t; renderer.render(scene, camera); },
    resize,
    dispose: () => { geo.dispose(); mat.dispose(); renderer.dispose(); },
  };
}
