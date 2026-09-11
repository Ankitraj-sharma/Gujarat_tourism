import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Navigation, RotateCcw, Compass, Sun, MapPin, Eye } from 'lucide-react';

interface ThreeCoastalMapProps {
  onSelectWaypoint?: (waypointName: string) => void;
  activeStop?: string;
}

export const ThreeCoastalMap: React.FC<ThreeCoastalMapProps> = ({
  onSelectWaypoint,
  activeStop = 'Dwarka',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'3d' | 'sat'>('3d');
  const [activePinName, setActivePinName] = useState<string>(activeStop);
  const mapGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 390;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, -22, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xff9800, 1.8);
    dirLight.position.set(10, -10, 20);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00bcd4, 1.5, 50);
    pointLight.position.set(-15, 10, 15);
    scene.add(pointLight);

    // Group to hold the entire interactive coastline map
    const mapGroup = new THREE.Group();
    scene.add(mapGroup);
    mapGroupRef.current = mapGroup;

    // Stylized Arabian Sea disc base
    const oceanGeo = new THREE.CylinderGeometry(18, 18, 0.6, 48);
    const oceanMat = new THREE.MeshPhongMaterial({
      color: 0x0c3b5e,
      shininess: 90,
      specular: 0x38bdf8,
      transparent: true,
      opacity: 0.88,
    });
    const ocean = new THREE.Mesh(oceanGeo, oceanMat);
    ocean.rotation.x = Math.PI / 2;
    ocean.position.z = -0.6;
    mapGroup.add(ocean);

    // Ripple ring wave
    const ringGeo = new THREE.RingGeometry(14, 17.5, 36);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.z = -0.2;
    mapGroup.add(ring);

    // Stylized Landmass Shape for Gujarat
    const gujaratShape = new THREE.Shape();
    gujaratShape.moveTo(-10, 8); // Kutch northwest
    gujaratShape.lineTo(-2, 10); // Great Rann north
    gujaratShape.lineTo(4, 9);
    gujaratShape.lineTo(8, 7); // North Gujarat
    gujaratShape.lineTo(9, 1); // Central / Ahmedabad
    gujaratShape.lineTo(8, -6); // South Gujarat / Surat
    gujaratShape.lineTo(7, -10); // Daman / coastal south
    gujaratShape.lineTo(4, -8); // Gulf of Khambhat east
    gujaratShape.lineTo(3, -4); // Khambhat apex
    gujaratShape.lineTo(1, -6); // Bhavnagar / east Saurashtra
    gujaratShape.lineTo(-1, -8); // Diu / Somnath coast
    gujaratShape.lineTo(-5, -7); // Porbandar coast
    gujaratShape.lineTo(-9, -4); // Dwarka tip / Okhamandal
    gujaratShape.lineTo(-7, -1); // Jamnagar / Gulf of Kutch south
    gujaratShape.lineTo(-3, 1); // Gulf of Kutch inner
    gujaratShape.lineTo(-7, 3); // Kandla / Mandvi Kutch coast
    gujaratShape.lineTo(-10, 8); // Close back to Kutch

    const extrudeSettings = {
      steps: 1,
      depth: 1.2,
      bevelEnabled: true,
      bevelThickness: 0.3,
      bevelSize: 0.3,
      bevelSegments: 3,
    };

    const landGeo = new THREE.ExtrudeGeometry(gujaratShape, extrudeSettings);
    const landMat = new THREE.MeshPhongMaterial({
      color: 0xfaf5ef,
      specular: 0xf59e0b,
      shininess: 30,
    });
    const landMesh = new THREE.Mesh(landGeo, landMat);
    landMesh.position.z = 0;
    mapGroup.add(landMesh);

    // Coastal Route Glowing Spline
    const coastalPoints = [
      new THREE.Vector3(-7, 3.2, 1.8), // Mandvi
      new THREE.Vector3(-9, -3.8, 1.8), // Dwarka
      new THREE.Vector3(-6.8, -6.2, 1.8), // Porbandar
      new THREE.Vector3(-2.8, -7.8, 1.8), // Somnath
      new THREE.Vector3(0.5, -8.0, 1.8), // Diu
      new THREE.Vector3(7, -9.5, 1.8), // Surat / Daman
    ];

    const curve = new THREE.CatmullRomCurve3(coastalPoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.22, 12, false);
    const tubeMat = new THREE.MeshPhongMaterial({
      color: 0xf57c00,
      emissive: 0xff6d00,
      emissiveIntensity: 0.8,
      shininess: 100,
    });
    const coastalPath = new THREE.Mesh(tubeGeo, tubeMat);
    mapGroup.add(coastalPath);

    // Waypoint Pin Markers
    const pinLocations = [
      { name: 'Mandvi', pos: [-7, 3.2, 1.8], color: 0x0284c7 },
      { name: 'Dwarka', pos: [-9, -3.8, 1.8], color: 0xf57c00, active: true },
      { name: 'Porbandar', pos: [-6.8, -6.2, 1.8], color: 0x0284c7 },
      { name: 'Somnath', pos: [-2.8, -7.8, 1.8], color: 0xf57c00 },
      { name: 'Diu', pos: [0.5, -8.0, 1.8], color: 0x0284c7 },
      { name: 'Surat / Daman', pos: [7, -9.5, 1.8], color: 0x0284c7 },
    ];

    const pins: THREE.Group[] = [];

    pinLocations.forEach((loc) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(loc.pos[0], loc.pos[1], loc.pos[2]);

      // Cylinder base post
      const postGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 12);
      const postMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
      const post = new THREE.Mesh(postGeo, postMat);
      post.rotation.x = Math.PI / 2;
      post.position.z = 0.6;
      pinGroup.add(post);

      // Floating sphere beacon
      const isActive = loc.name === activePinName;
      const beaconGeo = new THREE.SphereGeometry(isActive ? 0.65 : 0.45, 16, 16);
      const beaconMat = new THREE.MeshPhongMaterial({
        color: loc.color,
        emissive: loc.color,
        emissiveIntensity: isActive ? 0.9 : 0.4,
        shininess: 90,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.z = 1.4;
      pinGroup.add(beacon);

      // Pulsing halo for active pin
      if (isActive) {
        const haloGeo = new THREE.RingGeometry(0.7, 1.1, 24);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0xffa000,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.z = 0.05;
        pinGroup.add(halo);
        pinGroup.userData.halo = halo;
      }

      pinGroup.userData.name = loc.name;
      mapGroup.add(pinGroup);
      pins.push(pinGroup);
    });

    // Subtle floating navigational particles
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 26;
      particlePos[i + 1] = (Math.random() - 0.5) * 26;
      particlePos[i + 2] = Math.random() * 6 + 1;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mapGroup.add(particles);

    // Initial tilt for isometric viewing
    mapGroup.rotation.x = -0.42;

    // Mouse & Touch interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onDown = (clientX: number, clientY: number) => {
      isDragging = true;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      mapGroup.rotation.z += deltaX * 0.008;
      mapGroup.rotation.x += deltaY * 0.006;
      mapGroup.rotation.x = Math.max(-0.9, Math.min(-0.15, mapGroup.rotation.x));

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;

    const handleMouseDown = (e: MouseEvent) => onDown(e.clientX, e.clientY);
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleMouseUp = () => onUp();

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) onDown(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchEnd = () => onUp();

    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    domElem.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Render loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Subtle auto-hover oscillation when not dragging
      if (!isDragging) {
        mapGroup.rotation.z = Math.sin(t * 0.3) * 0.08;
        mapGroup.position.z = Math.sin(t * 0.8) * 0.3;
      }

      // Ring ripple pulse
      const scale = 1 + Math.sin(t * 1.5) * 0.05;
      ring.scale.set(scale, scale, 1);

      // Active pin beacon pulse
      pins.forEach((pin) => {
        if (pin.userData.halo) {
          const haloScale = 1 + Math.sin(t * 3.5) * 0.25;
          pin.userData.halo.scale.set(haloScale, haloScale, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 390;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [activePinName]);

  const resetCamera = () => {
    if (mapGroupRef.current) {
      mapGroupRef.current.rotation.set(-0.42, 0, 0);
      mapGroupRef.current.position.set(0, 0, 0);
    }
  };

  return (
    <div className="relative w-full h-[380px] bg-[#0c2438] rounded-3xl overflow-hidden shadow-xl select-none">
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Map Overlays */}
      {/* Top Left: Live Status Pill */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-auto z-10">
        <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm text-white">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold">Live 3D View</span>
        </div>
        <span className="text-[11px] text-white/80 px-2 py-0.5 bg-slate-900/60 rounded-md backdrop-blur-xs w-max">
          Drag to rotate • Pinch to zoom
        </span>
      </div>

      {/* Top Right: Tide & Weather Pill */}
      <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 text-white z-10">
        <Sun className="w-3.5 h-3.5 text-amber-400" />
        <span className="text-xs">29°C • Low Tide</span>
      </div>

      {/* Bottom Left: Stats Indicator */}
      <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl flex flex-col gap-0.5 text-white max-w-[190px] pointer-events-auto z-10">
        <div className="flex items-center gap-1.5 text-orange-400">
          <Compass className="w-3.5 h-3.5" />
          <span className="text-xs font-bold text-white">1,650 km Total Coast</span>
        </div>
        <p className="text-[10px] text-white/75 leading-tight">6 Historic Ports & Pilgrimage Sanctuaries</p>
      </div>

      {/* Bottom Right: Camera & View Controls */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-2 pointer-events-auto z-10">
        <button
          onClick={resetCamera}
          aria-label="Reset orientation"
          className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-slate-800 flex items-center justify-center shadow-md active:scale-95 transition-transform hover:bg-white"
        >
          <RotateCcw className="w-4 h-4 text-orange-600" />
        </button>
        <button
          onClick={() => setViewMode(viewMode === '3d' ? 'sat' : '3d')}
          aria-label="Toggle 3D and Satellite View"
          className="h-10 px-3 rounded-full bg-white/95 backdrop-blur-md text-slate-800 flex items-center gap-1.5 shadow-md active:scale-95 transition-transform hover:bg-white text-xs font-bold"
        >
          <Eye className="w-3.5 h-3.5 text-orange-600" />
          <span>{viewMode === '3d' ? '3D View' : 'Satellite'}</span>
        </button>
      </div>
    </div>
  );
};
