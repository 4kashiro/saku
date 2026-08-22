import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Pencil, Eraser, MousePointer2, PaintBucket, RotateCw, Stamp, Plus, Trash2,
  Eye, EyeOff, Lock, Unlock, Copy, ChevronUp, ChevronDown, ChevronRight, Undo2, Redo2,
  ZoomIn, ZoomOut, FilePlus2, FolderOpen, Save, Image as ImageIcon, FileText,
  Printer, Palette, X, ArrowUpDown, Grid3x3, Layers as LayersIcon, Upload,
  Slash, Square,
} from "lucide-react";
import customLogo from "./logo.png";
/* ---------------------------------- tokens --------------------------------- */
const C = {
  chrome: "#2C1B4D",
  panel: "#3A2266",
  panelAlt: "#462C7D",
  line: "#5C3A94",
  gold: "#FF70BF",
  goldSoft: "rgba(255,112,191,0.16)",
  teal: "#D552A3",
  tealSoft: "rgba(213,82,163,0.22)",
  text: "#F6EEFA",
  muted: "#C6AEE0",
  danger: "#FF6B6B",
};

/* ---------------------------------- data ------------------------------------ */
const STAMP_SHAPES = {
  "allah": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [0, 2], [1, 2], [2, 2], [4, 2], [6, 2], [2, 3], [4, 3], [6, 3], [0, 4], [1, 4], [2, 4], [4, 4], [6, 4], [0, 5], [2, 5], [4, 5], [6, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]],
  "muhammad": [[0, 0], [2, 0], [4, 0], [5, 0], [6, 0], [0, 1], [2, 1], [4, 1], [6, 1], [0, 2], [1, 2], [2, 2], [4, 2], [5, 2], [6, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [4, 4], [5, 4], [6, 4], [0, 5], [2, 5], [6, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6]],
  "alif": [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
  "ba": [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
  "ba-5": [[0, 0], [1, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "ba-7": [[0, 0], [1, 0], [2, 0], [4, 0], [5, 0], [6, 0], [0, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
  "ta": [[0, 0], [2, 0], [4, 0], [6, 0], [0, 1], [6, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2]],
  "tsa": [[0, 0], [2, 0], [4, 0], [6, 0], [8, 0], [0, 1], [8, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
  "jim": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [2, 4], [4, 4], [0, 5], [4, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6]],
  "jim-5": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [0, 2], [1, 2], [2, 2], [4, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "ha": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "dal": [[0, 0], [1, 0], [2, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  "dal-5": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2], [2, 3], [0, 4], [1, 4], [2, 4]],
  "ra": [[4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "sin": [[0, 0], [2, 0], [4, 0], [6, 0], [0, 1], [2, 1], [4, 1], [6, 1], [0, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "shad": [[0, 0], [2, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [0, 1], [2, 1], [4, 1], [8, 1], [0, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "tha": [[2, 0], [2, 1], [2, 2], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [2, 4], [6, 4], [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5]],
  "tha-5": [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "ain": [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [2, 2], [0, 3], [0, 4], [1, 4], [2, 4]],
  "ain-7": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2], [0, 3], [0, 4], [1, 4], [2, 4], [0, 5], [0, 6], [1, 6], [2, 6]],
  "fa": [[0, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [4, 1], [0, 2], [2, 2], [3, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "kaf": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "rumahkaf": [[4, 0], [4, 1], [4, 2], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "rumahkaf-7": [[6, 0], [6, 1], [0, 2], [6, 2], [0, 3], [6, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4]],
  "lam": [[2, 0], [2, 1], [0, 2], [2, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "lam-5": [[4, 0], [4, 1], [0, 2], [1, 2], [2, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "mim": [[2, 0], [3, 0], [4, 0], [2, 1], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
  "mim-5": [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [4, 1], [0, 2], [2, 2], [3, 2], [4, 2], [0, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "nun": [[0, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "nun-5": [[0, 0], [1, 0], [2, 0], [4, 0], [0, 1], [4, 1], [0, 2], [2, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "wau": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [2, 3], [0, 4], [1, 4], [2, 4]],
  "waw-7": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [2, 3], [0, 4], [2, 4], [0, 5], [2, 5], [0, 6], [1, 6], [2, 6]],
  "hha": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
  "hha-5": [[0, 0], [1, 0], [2, 0], [2, 1], [0, 2], [1, 2], [2, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "hha-7": [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2], [2, 3], [0, 4], [1, 4], [2, 4], [0, 5], [2, 5], [0, 6], [1, 6], [2, 6]],
  "lamalif": [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [1, 3], [0, 4], [1, 4], [2, 4], [0, 5], [2, 5], [0, 6], [1, 6], [2, 6]],
  "lamalif-5": [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2], [0, 3], [2, 3], [0, 4], [1, 4], [2, 4]],
  "hamzah": [[2, 0], [3, 0], [4, 0], [2, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2]],
  "hamzah-5": [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
  "ya": [[0, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [0, 2], [2, 2], [3, 2], [4, 2], [0, 3], [4, 3], [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]],
  "ya-7": [[0, 0], [2, 0], [3, 0], [4, 0], [0, 1], [2, 1], [4, 1], [0, 2], [2, 2], [4, 2], [0, 3], [2, 3], [0, 4], [2, 4], [3, 4], [4, 4], [0, 5], [4, 5], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6]],
};

const STAMP_LABELS = {
  "allah": "Allah",
  "muhammad": "Muhammad",
  "alif": "Alif",
  "ba": "Ba",
  "ba-5": "Ba-5",
  "ba-7": "Ba-7",
  "ta": "Ta",
  "tsa": "Tsa",
  "jim": "Jim",
  "jim-5": "Jim-5",
  "ha": "Ha",
  "dal": "Dal",
  "dal-5": "Dal-5",
  "ra": "Ra",
  "sin": "Sin",
  "shad": "Shad",
  "tha": "Tha",
  "tha-5": "Tha-5",
  "ain": "Ain",
  "ain-7": "Ain-7",
  "fa": "Fa",
  "kaf": "Kaf",
  "rumahkaf": "RumahKaf",
  "rumahkaf-7": "RumahKaf-7",
  "lam": "Lam",
  "lam-5": "Lam-5",
  "mim": "Mim",
  "mim-5": "Mim-5",
  "nun": "Nun",
  "nun-5": "Nun-5",
  "wau": "Wau",
  "waw-7": "Waw-7",
  "hha": "Hha",
  "hha-5": "Hha-5",
  "hha-7": "Hha-7",
  "lamalif": "Lamalif",
  "lamalif-5": "Lamalif-5",
  "hamzah": "Hamzah",
  "hamzah-5": "Hamzah-5",
  "ya": "Ya",
  "ya-7": "Ya-7",
};

const STAMP_ORDER = [
  "allah", "muhammad", "alif", "ba", "ba-5", "ba-7", "ta", "tsa", "jim", "jim-5", 
  "ha", "dal", "dal-5", "ra", "sin", "shad", "tha", "tha-5", "ain", "ain-7", "fa", 
  "kaf", "rumahkaf", "rumahkaf-7", "lam", "lam-5", "mim", "mim-5", "nun", "nun-5", 
  "wau", "waw-7", "hha", "hha-5", "hha-7", "lamalif", "lamalif-5", "hamzah", "hamzah-5", 
  "ya", "ya-7"
];

const BUILTIN_STAMPS = STAMP_ORDER.map((id) => {
  const cells = STAMP_SHAPES[id];
  const maxX = Math.max(...cells.map(coord => coord[0]));
  const maxY = Math.max(...cells.map(coord => coord[1]));
  
  return {
    id, 
    kind: "cells", 
    w: maxX + 1,
    h: maxY + 1, 
    cells: cells, 
    label: STAMP_LABELS[id], 
    builtin: true,
  };
});
const MAX_STAMP = 64; 

function rotSteps(rotation) {
  return (((rotation / 90) % 4) + 4) % 4;
}
function rotatedDims(w, h, steps) {
  return steps % 2 === 1 ? { w: h, h: w } : { w, h };
}
function getEffectiveFootprint(st) {
  const steps = rotSteps(st.rotation);
  return rotatedDims(st.footprintW, st.footprintH, steps);
}

function parseStampCSV(csv) {
  if (!csv || !csv.trim()) return null;
  const rows = csv.trim().split(";").map((r) => r.trim()).filter((r) => r.length > 0);
  if (rows.length === 0) return null;
  const h = Math.min(MAX_STAMP, rows.length);
  const w = Math.min(MAX_STAMP, Math.max(...rows.map((r) => r.length)));
  const cells = [];
  for (let y = 0; y < h; y++) {
    const row = rows[y] || "";
    for (let x = 0; x < w; x++) if (row[x] === "1") cells.push([x, y]);
  }
  return { w, h, cells };
}

function drawStampOnCtx(ctx, st, cellPx, imageCacheRef, onImageReady, alpha) {
  const prevAlpha = ctx.globalAlpha;
  if (alpha !== undefined) ctx.globalAlpha = prevAlpha * alpha;
  const { w: effW, h: effH } = getEffectiveFootprint(st);
  const cx = (st.gx + effW / 2) * cellPx;
  const cy = (st.gy + effH / 2) * cellPx;
  const boxW = st.footprintW * cellPx;
  const boxH = st.footprintH * cellPx;

  if (st.type === "image") {
    let img = imageCacheRef.current[st.imageSrc];
    if (!img) {
      img = new Image();
      img.onload = () => onImageReady && onImageReady();
      img.src = st.imageSrc;
      imageCacheRef.current[st.imageSrc] = img;
    }
    if (img.complete && img.naturalWidth > 0) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((st.rotation * Math.PI) / 180);
      ctx.drawImage(img, -boxW / 2, -boxH / 2, boxW, boxH);
      ctx.restore();
    }
  } else {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((st.rotation * Math.PI) / 180);
    ctx.fillStyle = st.color;
    const subW = boxW / st.patternW;
    const subH = boxH / st.patternH;
    st.cells.forEach(([px, py]) => {
      ctx.fillRect(-boxW / 2 + px * subW, -boxH / 2 + py * subH, subW, subH);
    });
    ctx.restore();
  }
  ctx.globalAlpha = prevAlpha;
}

const PALETTES = {
  "Sahabat Purple": ["#462C7D", "#831C91", "#D552A3", "#FF70BF"],
  "Kufi Klasik": ["#1A1A1A", "#F4ECD8", "#C9A227", "#8B5E34"],
  Monokrom: ["#000000", "#404040", "#808080", "#BFBFBF", "#FFFFFF"],
  "Pixel Retro": ["#FF004D", "#00E5FF", "#FFEC27", "#1A1A2E", "#29ADFF", "#00E436"],
  "Modern Neon": ["#0D0D0D", "#FF2E63", "#08D9D6", "#F9F871"],
  "Earth Tone": ["#5C4033", "#A9746E", "#D2B48C", "#6B8E23", "#3E2723"],
  Premium: ["#000000", "#FFFFFF", "#D4AF37", "#0A0A0A"],
  "Pastel Dream": ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF"],
  "Cyberpunk": ["#FCEE09", "#00FFF5", "#FF007F", "#111111", "#7B00FF"],
  "Forest": ["#2C5F2D", "#97BC62", "#113014", "#D8E2DC"],
  "Sunset": ["#FF4E50", "#FC913A", "#F9D423", "#EDE574"],
  "Ocean": ["#00B4DB", "#0083B0", "#E0EAFC", "#CFDEF3"],
};
const GRID_PRESETS = [
  { label: "16×16", cols: 16, rows: 16 },
  { label: "32×32", cols: 32, rows: 32 },
  { label: "64×64", cols: 64, rows: 64 },
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}
function makeLayer(name) {
  return { id: uid(), name, visible: true, locked: false, opacity: 1, cells: {}, stamps: [] };
}
function deepClone(o) {
  return JSON.parse(JSON.stringify(o));
}

/* --------------------------------- component --------------------------------- */
export default function SahabatKuApp() {
  const [gridCols, setGridCols] = useState(32);
  const [gridRows, setGridRows] = useState(32);
  const [showGrid, setShowGrid] = useState(true);
  const [showAltShading, setShowAltShading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [exportScale, setExportScale] = useState(16);

  const [project, setProject] = useState(() => {
    const l = makeLayer("Layer 1");
    return { layers: [l], activeLayerId: l.id };
  });

  // TOOL DEFAULT: Pensil
  const [activeTool, setActiveTool] = useState("pencil");
  const [rectFilled, setRectFilled] = useState(false);
  const [activeColor, setActiveColor] = useState("#FF70BF");
  const [pickerColor, setPickerColor] = useState("#FF70BF");
  const [customPalette, setCustomPalette] = useState([]);
  const [recentColors, setRecentColors] = useState([]);
  const [activePaletteName, setActivePaletteName] = useState("Sahabat Purple");

  const [selection, setSelection] = useState(null);
  const [selectedStampId, setSelectedStampId] = useState(null);
  const [hoverCell, setHoverCell] = useState(null);

  const [stampChoiceId, setStampChoiceId] = useState("allah");
  const [nextStampRotation, setNextStampRotation] = useState(0);
  const [nextFootprintW, setNextFootprintW] = useState(3);
  const [nextFootprintH, setNextFootprintH] = useState(3);
  const [customCsvStamps, setCustomCsvStamps] = useState([]); 
  const [customImageStamps, setCustomImageStamps] = useState([]); 
  const [csvText, setCsvText] = useState("");
  const [csvName, setCsvName] = useState("");
  const [showCsvForm, setShowCsvForm] = useState(false);

  const stampLibrary = [...BUILTIN_STAMPS, ...customCsvStamps, ...customImageStamps];
  const chosenStamp = stampLibrary.find((s) => s.id === stampChoiceId) || BUILTIN_STAMPS[0];

  useEffect(() => {
    if (chosenStamp.kind === "cells") {
      setNextFootprintW(chosenStamp.w);
      setNextFootprintH(chosenStamp.h);
    }
  }, [stampChoiceId]);

  const [customW, setCustomW] = useState(32);
  const [customH, setCustomH] = useState(32);
  const [gridSizeLabel, setGridSizeLabel] = useState("32×32");

  const [isDrawing, setIsDrawing] = useState(false);
  const [movingSelection, setMovingSelection] = useState(false);
  const [draggingStamp, setDraggingStamp] = useState(false);
  const [, forceTick] = useState(0);
  
  // SIDEBAR STATE UPDATE: Explicit toggle for better mobile UX
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const pinchStartDistRef = useRef(null);
  const pinchStartZoomRef = useRef(null);

  const [panels, setPanels] = useState({
    grid: { open: true, collapsed: false },
    color: { open: true, collapsed: false },
    stamp: { open: true, collapsed: false },
    layer: { open: true, collapsed: false },
  });
  function togglePanelCollapsed(key) {
    setPanels((p) => ({ ...p, [key]: { ...p[key], collapsed: !p[key].collapsed } }));
  }
  function closePanel(key) {
    setPanels((p) => ({ ...p, [key]: { ...p[key], open: false } }));
  }
  function openPanel(key) {
    setPanels((p) => ({ ...p, [key]: { ...p[key], open: true, collapsed: false } }));
    setSidebarExpanded(true);
  }

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const stampUploadRef = useRef(null);
  const draftRef = useRef(null);
  const movingBlockRef = useRef(null);
  const moveBaselineRef = useRef(null);
  const shapeStartRef = useRef(null);
  const shapeBaselineRef = useRef(null);
  const moveAnchorRef = useRef(null);
  const moveDimRef = useRef(null);
  const moveStartGridRef = useRef(null);
  const stampDragAnchorRef = useRef(null);
  const stampOrigRef = useRef(null);
  const lastPaintRef = useRef(null);
  const imageCacheRef = useRef({});
  const drawCanvasRef = useRef(null);
  const historyRef = useRef([deepClone(project)]);
  const historyIndexRef = useRef(0);

  /* --------------------------- history --------------------------- */
  function pushHistory(nextProject) {
    const snap = deepClone(nextProject);
    historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    historyRef.current.push(snap);
    historyIndexRef.current = historyRef.current.length - 1;
    forceTick((t) => t + 1);
  }
  function undo() {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    setProject(deepClone(historyRef.current[historyIndexRef.current]));
    setSelection(null);
    setSelectedStampId(null);
    forceTick((t) => t + 1);
  }
  function redo() {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    setProject(deepClone(historyRef.current[historyIndexRef.current]));
    forceTick((t) => t + 1);
  }
  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  function commit(nextProject) {
    setProject(nextProject);
    pushHistory(nextProject);
  }

  /* --------------------------- helpers --------------------------- */
  const activeLayer = project.layers.find((l) => l.id === project.activeLayerId);
  const displayLayers = [...project.layers].reverse();

  function addRecentColor(color) {
    setRecentColors((prev) => [color, ...prev.filter((c) => c !== color)].slice(0, 8));
  }
  function pickColor(color) {
    setActiveColor(color);
    addRecentColor(color);
    if (selectedStampId) updateStampColor(selectedStampId, color);
  }
  function getCellPx() {
    const base = Math.max(6, Math.min(28, Math.floor(500 / Math.max(gridCols, gridRows))));
    return base * zoom;
  }
  function getGridCoords(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const cellPx = getCellPx();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    let gx = Math.floor(x / cellPx);
    let gy = Math.floor(y / cellPx);
    gx = Math.max(0, Math.min(gridCols - 1, gx));
    gy = Math.max(0, Math.min(gridRows - 1, gy));
    return { gx, gy };
  }

  /* --------------------------- canvas render --------------------------- */
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cellPx = getCellPx();
    canvas.width = gridCols * cellPx;
    canvas.height = gridRows * cellPx;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#F4F2EC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (showAltShading) {
      ctx.fillStyle = "rgba(90,50,140,0.09)";
      for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridCols; x++) {
          if (x % 2 === 1 && y % 2 === 1) ctx.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
        }
      }
    }

    project.layers.forEach((layer) => {
      if (!layer.visible) return;
      ctx.globalAlpha = layer.opacity;
      Object.entries(layer.cells).forEach(([key, color]) => {
        const [x, y] = key.split(",").map(Number);
        ctx.fillStyle = color;
        ctx.fillRect(x * cellPx, y * cellPx, cellPx, cellPx);
      });
      layer.stamps.forEach((st) => {
        drawStampOnCtx(ctx, st, cellPx, imageCacheRef, () => drawCanvasRef.current && drawCanvasRef.current());
      });
    });
    ctx.globalAlpha = 1;

    if (showGrid) {
      ctx.strokeStyle = "rgba(20,20,30,0.38)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= gridCols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * cellPx + 0.5, 0);
        ctx.lineTo(x * cellPx + 0.5, gridRows * cellPx);
        ctx.stroke();
      }
      for (let y = 0; y <= gridRows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * cellPx + 0.5);
        ctx.lineTo(gridCols * cellPx, y * cellPx + 0.5);
        ctx.stroke();
      }
    }

    if (selection) {
      const sx = Math.min(selection.x0, selection.x1);
      const sy = Math.min(selection.y0, selection.y1);
      const ex = Math.max(selection.x0, selection.x1);
      const ey = Math.max(selection.y0, selection.y1);
      ctx.fillStyle = C.tealSoft;
      ctx.fillRect(sx * cellPx, sy * cellPx, (ex - sx + 1) * cellPx, (ey - sy + 1) * cellPx);
      ctx.strokeStyle = C.teal;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(sx * cellPx + 1, sy * cellPx + 1, (ex - sx + 1) * cellPx - 2, (ey - sy + 1) * cellPx - 2);
      ctx.setLineDash([]);
    }
    if (selectedStampId) {
      const layer = project.layers.find((l) => l.id === project.activeLayerId);
      const st = layer && layer.stamps.find((s) => s.id === selectedStampId);
      if (st) {
        const { w, h } = getEffectiveFootprint(st);
        ctx.strokeStyle = C.gold;
        ctx.lineWidth = 2;
        ctx.strokeRect(st.gx * cellPx + 1, st.gy * cellPx + 1, w * cellPx - 2, h * cellPx - 2);
      }
    }

    if (activeTool === "stamp" && hoverCell && !draggingStamp && !isDrawing) {
      const steps = rotSteps(nextStampRotation);
      const { w: effW, h: effH } = rotatedDims(nextFootprintW, nextFootprintH, steps);
      const maxX = Math.max(0, gridCols - effW);
      const maxY = Math.max(0, gridRows - effH);
      const ggx = Math.max(0, Math.min(hoverCell.gx, maxX));
      const ggy = Math.max(0, Math.min(hoverCell.gy, maxY));
      const ghost =
        chosenStamp.kind === "image"
          ? { type: "image", imageSrc: chosenStamp.dataUrl, gx: ggx, gy: ggy, rotation: nextStampRotation, footprintW: nextFootprintW, footprintH: nextFootprintH }
          : { type: "cells", cells: chosenStamp.cells, patternW: chosenStamp.w, patternH: chosenStamp.h, gx: ggx, gy: ggy, rotation: nextStampRotation, footprintW: nextFootprintW, footprintH: nextFootprintH, color: activeColor };
      drawStampOnCtx(ctx, ghost, cellPx, imageCacheRef, undefined, 0.4);
      ctx.strokeStyle = C.gold;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(ggx * cellPx + 1, ggy * cellPx + 1, effW * cellPx - 2, effH * cellPx - 2);
      ctx.setLineDash([]);
    }
  }, [project, gridCols, gridRows, showGrid, showAltShading, zoom, selection, selectedStampId, activeTool, hoverCell, chosenStamp, nextStampRotation, nextFootprintW, nextFootprintH, activeColor, draggingStamp, isDrawing]);

  useEffect(() => {
    drawCanvasRef.current = drawCanvas;
  }, [drawCanvas]);
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  /* --------------------------- pixel-cell painting --------------------------- */
  function beginStroke() {
    draftRef.current = deepClone(project);
  }
  function bresenhamLine(x0, y0, x1, y1) {
    const points = [];
    let dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy, x = x0, y = y0;
    while (true) {
      points.push([x, y]);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x += sx; }
      if (e2 < dx) { err += dx; y += sy; }
    }
    return points;
  }
  function paintLineLive(from, to, color) {
    const next = draftRef.current;
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    bresenhamLine(from.gx, from.gy, to.gx, to.gy).forEach(([x, y]) => {
      const key = `${x},${y}`;
      if (color === null) delete layer.cells[key];
      else layer.cells[key] = color;
    });
    setProject({ ...next });
  }
  function eraseLineLive(from, to) {
    const next = draftRef.current;
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    const pts = bresenhamLine(from.gx, from.gy, to.gx, to.gy);
    pts.forEach(([x, y]) => delete layer.cells[`${x},${y}`]);
    layer.stamps = layer.stamps.filter((st) => {
      const { w, h } = getEffectiveFootprint(st);
      return !pts.some(([x, y]) => x >= st.gx && x <= st.gx + w - 1 && y >= st.gy && y <= st.gy + h - 1);
    });
    setProject({ ...next });
  }
  function bucketFill(gx, gy, fillColor) {
    const next = deepClone(project);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    const target = layer.cells[`${gx},${gy}`] ?? null;
    if (target === fillColor) return;
    const stack = [[gx, gy]];
    const visited = new Set();
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || y < 0 || x >= gridCols || y >= gridRows) continue;
      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      visited.add(key);
      const cur = layer.cells[key] ?? null;
      if (cur !== target) continue;
      layer.cells[key] = fillColor;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    commit(next);
    addRecentColor(fillColor);
  }

  /* --------------------------- selection: move / rotate / delete --------------------------- */
  function updateMovePreview(newX0, newY0) {
    const next = deepClone(moveBaselineRef.current);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    Object.entries(movingBlockRef.current).forEach(([relKey, color]) => {
      const [rx, ry] = relKey.split(",").map(Number);
      layer.cells[`${newX0 + rx},${newY0 + ry}`] = color;
    });
    setProject(next);
    draftRef.current = next;
    const { w, h } = moveDimRef.current;
    setSelection({ x0: newX0, y0: newY0, x1: newX0 + w - 1, y1: newY0 + h - 1 });
  }
  function rotateSelection() {
    if (!selection || !activeLayer) return;
    const next = deepClone(project);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    const x0 = Math.min(selection.x0, selection.x1);
    const y0 = Math.min(selection.y0, selection.y1);
    const x1 = Math.max(selection.x0, selection.x1);
    const y1 = Math.max(selection.y0, selection.y1);
    const w = x1 - x0 + 1;
    const h = y1 - y0 + 1;
    const nx0 = Math.min(x0, Math.max(0, gridCols - h));
    const ny0 = Math.min(y0, Math.max(0, gridRows - w));
    const oldBlock = {};
    for (let x = x0; x <= x1; x++)
      for (let y = y0; y <= y1; y++) {
        const k = `${x},${y}`;
        if (layer.cells[k] !== undefined) {
          oldBlock[`${x - x0},${y - y0}`] = layer.cells[k];
          delete layer.cells[k];
        }
      }
    Object.entries(oldBlock).forEach(([relKey, color]) => {
      const [lx, ly] = relKey.split(",").map(Number);
      const nlx = h - 1 - ly;
      const nly = lx;
      layer.cells[`${nx0 + nlx},${ny0 + nly}`] = color;
    });
    commit(next);
    setSelection({ x0: nx0, y0: ny0, x1: nx0 + h - 1, y1: ny0 + w - 1 });
  }
  function deleteSelection() {
    if (!selection) return;
    const next = deepClone(project);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    const x0 = Math.min(selection.x0, selection.x1);
    const y0 = Math.min(selection.y0, selection.y1);
    const x1 = Math.max(selection.x0, selection.x1);
    const y1 = Math.max(selection.y0, selection.y1);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) delete layer.cells[`${x},${y}`];
    commit(next);
    setSelection(null);
  }

  /* --------------------------- stamps --------------------------- */
  function placeStamp(gx, gy) {
    if (!activeLayer || activeLayer.locked || !chosenStamp) return;
    const footprintW = Math.max(1, nextFootprintW);
    const footprintH = Math.max(1, nextFootprintH);
    const steps = rotSteps(nextStampRotation);
    const { w: effW, h: effH } = rotatedDims(footprintW, footprintH, steps);
    const cgx = Math.max(0, Math.min(gx, Math.max(0, gridCols - effW)));
    const cgy = Math.max(0, Math.min(gy, Math.max(0, gridRows - effH)));
    const stamp =
      chosenStamp.kind === "image"
        ? { id: uid(), type: "image", imageSrc: chosenStamp.dataUrl, gx: cgx, gy: cgy, rotation: nextStampRotation, footprintW, footprintH }
        : { id: uid(), type: "cells", cells: chosenStamp.cells, patternW: chosenStamp.w, patternH: chosenStamp.h, gx: cgx, gy: cgy, rotation: nextStampRotation, footprintW, footprintH, color: activeColor };
    const next = deepClone(project);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    layer.stamps.push(stamp);
    commit(next);
    if (stamp.type === "cells") addRecentColor(activeColor);
    setSelectedStampId(stamp.id);
  }
  function findStampAt(gx, gy) {
    if (!activeLayer) return null;
    const stamps = activeLayer.stamps || [];
    for (let i = stamps.length - 1; i >= 0; i--) {
      const st = stamps[i];
      const { w, h } = getEffectiveFootprint(st);
      if (gx >= st.gx && gx <= st.gx + w - 1 && gy >= st.gy && gy <= st.gy + h - 1) return st;
    }
    return null;
  }
  function rotateSelectedStamp() {
    if (!selectedStampId) return;
    const next = deepClone(project);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    const st = layer.stamps.find((s) => s.id === selectedStampId);
    if (!st) return;
    st.rotation = (st.rotation + 90) % 360;
    commit(next);
  }
  function deleteSelectedStamp() {
    if (!selectedStampId) return;
    const next = deepClone(project);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    layer.stamps = layer.stamps.filter((s) => s.id !== selectedStampId);
    commit(next);
    setSelectedStampId(null);
  }
  function updateStampColor(id, color) {
    const next = deepClone(project);
    const layer = next.layers.find((l) => l.id === next.activeLayerId);
    const st = layer.stamps.find((s) => s.id === id);
    if (!st || st.type === "image") return;
    st.color = color;
    commit(next);
  }
  function handleUploadStamp(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const entry = { id: uid(), kind: "image", name: file.name.replace(/\.[^.]+$/, ""), label: file.name.replace(/\.[^.]+$/, ""), dataUrl: ev.target.result };
      setCustomImageStamps((prev) => [...prev, entry]);
      setStampChoiceId(entry.id);
      setActiveTool("stamp");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }
  function handleAddCsvStamp() {
    const parsed = parseStampCSV(csvText);
    if (!parsed || parsed.cells.length === 0) {
      window.alert(`Format CSV tidak valid atau kosong.\nGunakan 0/1 dipisah titik-koma per baris (contoh: 000;010;000).\nUkuran mengikuti pola Anda, dibatasi hanya untuk keamanan performa di ${MAX_STAMP}×${MAX_STAMP}.`);
      return;
    }
    const entry = { id: uid(), kind: "cells", w: parsed.w, h: parsed.h, cells: parsed.cells, label: csvName.trim() || "Stempel CSV" };
    setCustomCsvStamps((prev) => [...prev, entry]);
    setStampChoiceId(entry.id);
    setActiveTool("stamp");
    setCsvText("");
    setCsvName("");
    setShowCsvForm(false);
  }

  function rotateActive() {
    if (selection) rotateSelection();
    else if (selectedStampId) rotateSelectedStamp();
  }
  function deleteActive() {
    if (selection) deleteSelection();
    else if (selectedStampId) deleteSelectedStamp();
  }

  /* --------------------------- pointer handlers --------------------------- */
  function handlePointerDown(e) {
    if (e.touches && e.touches.length > 1) return;
    
    e.preventDefault();
    try { canvasRef.current.setPointerCapture(e.pointerId); } catch (_) {}
    const { gx, gy } = getGridCoords(e);
    setHoverCell({ gx, gy });
    if (!activeLayer || activeLayer.locked) return;

    if (activeTool === "pencil" || activeTool === "eraser") {
      beginStroke();
      if (activeTool === "eraser") {
        eraseLineLive({ gx, gy }, { gx, gy });
      } else {
        paintLineLive({ gx, gy }, { gx, gy }, activeColor);
        addRecentColor(activeColor);
      }
      lastPaintRef.current = { gx, gy };
      setIsDrawing(true);
    } else if (activeTool === "line" || activeTool === "rect") {
      beginStroke();
      shapeBaselineRef.current = deepClone(draftRef.current);
      shapeStartRef.current = { gx, gy };
      setIsDrawing(true);
    } else if (activeTool === "bucket") {
      bucketFill(gx, gy, activeColor);
    } else if (activeTool === "stamp") {
      placeStamp(gx, gy);
    } else if (activeTool === "select") {
      const stampHit = findStampAt(gx, gy);
      if (stampHit) {
        setSelection(null);
        setSelectedStampId(stampHit.id);
        beginStroke();
        stampDragAnchorRef.current = { gx, gy };
        stampOrigRef.current = { gx: stampHit.gx, gy: stampHit.gy };
        setDraggingStamp(true);
        return;
      }
      setSelectedStampId(null);
      if (
        selection &&
        gx >= Math.min(selection.x0, selection.x1) &&
        gx <= Math.max(selection.x0, selection.x1) &&
        gy >= Math.min(selection.y0, selection.y1) &&
        gy <= Math.max(selection.y0, selection.y1)
      ) {
        const x0 = Math.min(selection.x0, selection.x1);
        const y0 = Math.min(selection.y0, selection.y1);
        const x1 = Math.max(selection.x0, selection.x1);
        const y1 = Math.max(selection.y0, selection.y1);
        const w = x1 - x0 + 1;
        const h = y1 - y0 + 1;
        beginStroke();
        const next = draftRef.current;
        const layer = next.layers.find((l) => l.id === next.activeLayerId);
        const block = {};
        for (let x = x0; x <= x1; x++)
          for (let y = y0; y <= y1; y++) {
            const k = `${x},${y}`;
            if (layer.cells[k] !== undefined) {
              block[`${x - x0},${y - y0}`] = layer.cells[k];
              delete layer.cells[k];
            }
          }
        movingBlockRef.current = block;
        moveBaselineRef.current = deepClone(next);
        moveAnchorRef.current = { x0, y0 };
        moveDimRef.current = { w, h };
        moveStartGridRef.current = { gx, gy };
        setProject({ ...next });
        setMovingSelection(true);
      } else {
        setIsDrawing(true);
        setSelection({ x0: gx, y0: gy, x1: gx, y1: gy });
      }
    }
  }

  function handlePointerMove(e) {
    if (e.touches && e.touches.length > 1) return;
    const { gx, gy } = getGridCoords(e);
    setHoverCell({ gx, gy });
    if (isDrawing && (activeTool === "pencil" || activeTool === "eraser")) {
      const from = lastPaintRef.current || { gx, gy };
      if (activeTool === "eraser") eraseLineLive(from, { gx, gy });
      else paintLineLive(from, { gx, gy }, activeColor);
      lastPaintRef.current = { gx, gy };
    } else if (isDrawing && (activeTool === "line" || activeTool === "rect") && shapeStartRef.current) {
      const next = deepClone(shapeBaselineRef.current);
      const layer = next.layers.find((l) => l.id === next.activeLayerId);
      const { gx: sx, gy: sy } = shapeStartRef.current;
      if (activeTool === "line") {
        bresenhamLine(sx, sy, gx, gy).forEach(([x, y]) => { layer.cells[`${x},${y}`] = activeColor; });
      } else {
        const x0 = Math.min(sx, gx), x1 = Math.max(sx, gx);
        const y0 = Math.min(sy, gy), y1 = Math.max(sy, gy);
        for (let x = x0; x <= x1; x++) {
          for (let y = y0; y <= y1; y++) {
            const onBorder = x === x0 || x === x1 || y === y0 || y === y1;
            if (rectFilled || onBorder) layer.cells[`${x},${y}`] = activeColor;
          }
        }
      }
      setProject(next);
      draftRef.current = next;
    } else if (isDrawing && activeTool === "select") {
      setSelection((sel) => (sel ? { ...sel, x1: gx, y1: gy } : sel));
    } else if (movingSelection && moveStartGridRef.current) {
      const dx = gx - moveStartGridRef.current.gx;
      const dy = gy - moveStartGridRef.current.gy;
      const { w, h } = moveDimRef.current;
      const newX0 = Math.max(0, Math.min(gridCols - w, moveAnchorRef.current.x0 + dx));
      const newY0 = Math.max(0, Math.min(gridRows - h, moveAnchorRef.current.y0 + dy));
      updateMovePreview(newX0, newY0);
    } else if (draggingStamp && selectedStampId && stampDragAnchorRef.current) {
      const next = draftRef.current;
      const layer = next.layers.find((l) => l.id === next.activeLayerId);
      const st = layer.stamps.find((s) => s.id === selectedStampId);
      if (st) {
        const { w, h } = getEffectiveFootprint(st);
        const dx = gx - stampDragAnchorRef.current.gx;
        const dy = gy - stampDragAnchorRef.current.gy;
        const newGx = Math.max(0, Math.min(Math.max(0, gridCols - w), stampOrigRef.current.gx + dx));
        const newGy = Math.max(0, Math.min(Math.max(0, gridRows - h), stampOrigRef.current.gy + dy));
        st.gx = newGx;
        st.gy = newGy;
        setProject({ ...next });
      }
    }
  }

  function handlePointerUp(e) {
    if (e.touches && e.touches.length > 1) return;
    if (isDrawing && (activeTool === "pencil" || activeTool === "eraser")) {
      if (activeTool === "eraser" && selectedStampId && draftRef.current) {
        const layer = draftRef.current.layers.find((l) => l.id === draftRef.current.activeLayerId);
        if (!layer || !layer.stamps.find((s) => s.id === selectedStampId)) setSelectedStampId(null);
      }
      pushHistory(draftRef.current);
      draftRef.current = null;
      lastPaintRef.current = null;
    } else if (isDrawing && (activeTool === "line" || activeTool === "rect")) {
      pushHistory(draftRef.current);
      addRecentColor(activeColor);
      draftRef.current = null;
      shapeBaselineRef.current = null;
      shapeStartRef.current = null;
    } else if (isDrawing && activeTool === "select") {
      setSelection((sel) =>
        sel
          ? {
              x0: Math.min(sel.x0, sel.x1),
              y0: Math.min(sel.y0, sel.y1),
              x1: Math.max(sel.x0, sel.x1),
              y1: Math.max(sel.y0, sel.y1),
            }
          : sel
      );
    } else if (movingSelection) {
      pushHistory(draftRef.current);
      draftRef.current = null;
      movingBlockRef.current = null;
      moveBaselineRef.current = null;
    } else if (draggingStamp) {
      pushHistory(draftRef.current);
      draftRef.current = null;
    }
    setIsDrawing(false);
    setMovingSelection(false);
    setDraggingStamp(false);
    try { canvasRef.current && canvasRef.current.releasePointerCapture(e.pointerId); } catch (_) {}
  }
  function handlePointerLeave() {
    if (!isDrawing && !movingSelection && !draggingStamp) setHoverCell(null);
  }
  
  /* --------------------------- gesture pinch to zoom --------------------------- */
  function getDistance(t1, t2) {
    return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
  }
  
  function handleTouchStart(e) {
    if (e.touches.length === 2) {
      pinchStartDistRef.current = getDistance(e.touches[0], e.touches[1]);
      pinchStartZoomRef.current = zoom;
    }
  }
  
  function handleTouchMove(e) {
    if (e.touches.length === 2 && pinchStartDistRef.current) {
      e.preventDefault();
      const dist = getDistance(e.touches[0], e.touches[1]);
      const scale = dist / pinchStartDistRef.current;
      const newZoom = Math.max(0.2, Math.min(5, pinchStartZoomRef.current * scale));
      setZoom(newZoom);
    }
  }

  function handleTouchEnd(e) {
    if (e.touches.length < 2) {
      pinchStartDistRef.current = null;
    }
  }
  
  function handleWheel(e) {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      setZoom((z) => Math.max(0.2, Math.min(5, z + delta)));
    }
  }

  useEffect(() => {
    const stage = document.getElementById("canvas-stage");
    if(stage) {
       stage.addEventListener('wheel', handleWheel, {passive: false});
       return () => stage.removeEventListener('wheel', handleWheel);
    }
  }, []);

  /* --------------------------- keyboard shortcuts --------------------------- */
  useEffect(() => {
    function onKey(e) {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selection) deleteSelection();
        else if (selectedStampId) deleteSelectedStamp();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selection, selectedStampId, project]);

  /* --------------------------- grid size --------------------------- */
  function applyGridSize(newCols, newRows, label) {
    const next = deepClone(project);
    next.layers.forEach((layer) => {
      const newCells = {};
      for (let ny = 0; ny < newRows; ny++)
        for (let nx = 0; nx < newCols; nx++) {
          const ox = Math.floor((nx * gridCols) / newCols);
          const oy = Math.floor((ny * gridRows) / newRows);
          const c = layer.cells[`${ox},${oy}`];
          if (c) newCells[`${nx},${ny}`] = c;
        }
      layer.cells = newCells;
    });
    commit(next);
    setGridCols(newCols);
    setGridRows(newRows);
    setCustomW(newCols);
    setCustomH(newRows);
    setGridSizeLabel(label || `${newCols}×${newRows}`);
  }

  /* --------------------------- layers --------------------------- */
  function addLayer() {
    const next = deepClone(project);
    const n = next.layers.length + 1;
    const layer = makeLayer(`Layer ${n}`);
    next.layers.push(layer);
    next.activeLayerId = layer.id;
    commit(next);
  }
  function removeLayer(id) {
    const next = deepClone(project);
    if (next.layers.length <= 1) return;
    next.layers = next.layers.filter((l) => l.id !== id);
    if (next.activeLayerId === id) next.activeLayerId = next.layers[0].id;
    commit(next);
  }
  function duplicateLayer(id) {
    const next = deepClone(project);
    const idx = next.layers.findIndex((l) => l.id === id);
    const clone = deepClone(next.layers[idx]);
    clone.id = uid();
    clone.name = clone.name + " copy";
    next.layers.splice(idx + 1, 0, clone);
    commit(next);
  }
  function toggleVisible(id) {
    const next = deepClone(project);
    const l = next.layers.find((x) => x.id === id);
    l.visible = !l.visible;
    commit(next);
  }
  function toggleLock(id) {
    const next = deepClone(project);
    const l = next.layers.find((x) => x.id === id);
    l.locked = !l.locked;
    commit(next);
  }
  function renameLayer(id, name) {
    const next = deepClone(project);
    next.layers.find((l) => l.id === id).name = name;
    commit(next);
  }
  function setOpacity(id, val) {
    const next = deepClone(project);
    next.layers.find((l) => l.id === id).opacity = val;
    commit(next);
  }
  function moveLayer(id, dir) {
    const next = deepClone(project);
    const idx = next.layers.findIndex((l) => l.id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= next.layers.length) return;
    const [item] = next.layers.splice(idx, 1);
    next.layers.splice(newIdx, 0, item);
    commit(next);
  }
  function mergeDown(id) {
    const next = deepClone(project);
    const idx = next.layers.findIndex((l) => l.id === id);
    if (idx <= 0) return;
    const below = next.layers[idx - 1];
    const cur = next.layers[idx];
    below.cells = { ...below.cells, ...cur.cells };
    below.stamps = [...below.stamps, ...cur.stamps];
    next.layers.splice(idx, 1);
    if (next.activeLayerId === cur.id) next.activeLayerId = below.id;
    commit(next);
  }
  function setActiveLayerId(id) {
    setProject((p) => ({ ...p, activeLayerId: id }));
  }

  /* --------------------------- file management --------------------------- */
  function newCanvas() {
    if (!window.confirm("Buat kanvas baru? Semua perubahan akan hilang.")) return;
    const layer = makeLayer("Layer 1");
    const next = { layers: [layer], activeLayerId: layer.id };
    commit(next);
    setSelection(null);
    setSelectedStampId(null);
  }
  function saveProject() {
    const data = JSON.stringify({ version: 4, gridCols, gridRows, project, customCsvStamps, customImageStamps }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projek.saku";
    a.click();
    URL.revokeObjectURL(url);
  }
  function handleOpenFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        setGridCols(data.gridCols);
        setGridRows(data.gridRows);
        setCustomW(data.gridCols);
        setCustomH(data.gridRows);
        setGridSizeLabel(`${data.gridCols}×${data.gridRows}`);
        setProject(data.project);
        setCustomCsvStamps(data.customCsvStamps || []);
        setCustomImageStamps(data.customImageStamps || []);
        pushHistory(data.project);
        setSelection(null);
        setSelectedStampId(null);
      } catch (err) {
        window.alert("File .saku tidak valid atau rusak.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  /* --------------------------- export --------------------------- */
  function renderToOffscreen(scale, withBg) {
    const off = document.createElement("canvas");
    off.width = gridCols * scale;
    off.height = gridRows * scale;
    const ctx = off.getContext("2d");
    if (withBg) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, off.width, off.height);
    }
    project.layers.forEach((layer) => {
      if (!layer.visible) return;
      ctx.globalAlpha = layer.opacity;
      Object.entries(layer.cells).forEach(([key, color]) => {
        const [x, y] = key.split(",").map(Number);
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      });
      layer.stamps.forEach((st) => drawStampOnCtx(ctx, st, scale, imageCacheRef));
    });
    ctx.globalAlpha = 1;
    return off;
  }
  function exportPNG() {
    const off = renderToOffscreen(exportScale, false);
    off.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sahabatku.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  }
  function exportSVG() {
    const scale = 20;
    let rects = "";
    project.layers.forEach((layer) => {
      if (!layer.visible) return;
      Object.entries(layer.cells).forEach(([key, color]) => {
        const [x, y] = key.split(",").map(Number);
        rects += `<rect x="${x * scale}" y="${y * scale}" width="${scale}" height="${scale}" fill="${color}" opacity="${layer.opacity}"/>`;
      });
      layer.stamps.forEach((st) => {
        const { w: effW, h: effH } = getEffectiveFootprint(st);
        const cx = (st.gx + effW / 2) * scale, cy = (st.gy + effH / 2) * scale;
        const boxW = st.footprintW * scale, boxH = st.footprintH * scale;
        if (st.type === "image") {
          rects += `<g transform="translate(${cx},${cy}) rotate(${st.rotation})" opacity="${layer.opacity}"><image href="${st.imageSrc}" x="${-boxW / 2}" y="${-boxH / 2}" width="${boxW}" height="${boxH}"/></g>`;
        } else {
          const subW = boxW / st.patternW, subH = boxH / st.patternH;
          let inner = "";
          st.cells.forEach(([px, py]) => {
            inner += `<rect x="${-boxW / 2 + px * subW}" y="${-boxH / 2 + py * subH}" width="${subW}" height="${subH}" fill="${st.color}"/>`;
          });
          rects += `<g transform="translate(${cx},${cy}) rotate(${st.rotation})" opacity="${layer.opacity}">${inner}</g>`;
        }
      });
    });
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${gridCols * scale}" height="${gridRows * scale}" viewBox="0 0 ${gridCols * scale} ${gridRows * scale}">${rects}</svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sahabatku.svg";
    a.click();
    URL.revokeObjectURL(url);
  }
  function exportPDF() {
    const off = renderToOffscreen(exportScale, true);
    const dataUrl = off.toDataURL("image/png");
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`<html><head><title>SahabatKu</title></head><body style="margin:0"><img src="${dataUrl}" style="width:100%" /></body></html>`);
    doc.close();
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    };
  }

  function zoomStep(dir) {
    const idx = ZOOM_STEPS.indexOf(zoom);
    const newIdx = Math.max(0, Math.min(ZOOM_STEPS.length - 1, (idx === -1 ? 2 : idx) + dir));
    setZoom(ZOOM_STEPS[newIdx]);
  }

  const hasActiveObject = !!selection || !!selectedStampId;

  /* ================================ render ================================ */
  return (
    <div style={{ background: C.chrome, color: C.text, fontFamily: "'Inter', ui-sans-serif, system-ui" }} className="w-full h-screen flex flex-col overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Inter:wght@400;500;600;700&display=swap');
        input[type=range]{ accent-color: ${C.gold}; }
        input[type=color]{ border:none; padding:0; background:none; }
        ::-webkit-scrollbar{ width:8px; height:8px; }
        ::-webkit-scrollbar-thumb{ background:${C.line}; border-radius:4px; }
        canvas{ -webkit-user-drag:none; user-select:none; -webkit-touch-callout:none; touch-action:none; }
      `}</style>

      {/* ---------- top bar ---------- */}
      <div className="flex items-center gap-2 mr-1">
          <img 
            src={customLogo} 
            alt="SahabatKu Logo" 
            style={{ height: "32px", width: "auto", objectFit: "contain" }} 
            className="shrink-0"
          />
        </div>
        <div className="w-px h-6 shrink-0" style={{ background: C.line }} />
        <IconBtn title="Baru" onClick={newCanvas}><FilePlus2 size={17} /></IconBtn>
        <IconBtn title="Simpan (.saku)" onClick={saveProject}><Save size={17} /></IconBtn>
        <IconBtn title="Buka file .saku" onClick={() => fileInputRef.current.click()}><FolderOpen size={17} /></IconBtn>
        <input ref={fileInputRef} type="file" accept=".saku,.json" className="hidden" onChange={handleOpenFile} />
        
        <div className="w-px h-6 shrink-0" style={{ background: C.line }} />
        <IconBtn title="Undo (Ctrl+Z)" disabled={!canUndo} onClick={undo}><Undo2 size={17} /></IconBtn>
        <IconBtn title="Redo (Ctrl+Shift+Z)" disabled={!canRedo} onClick={redo}><Redo2 size={17} /></IconBtn>
        
        <div className="hidden md:block w-px h-6 shrink-0" style={{ background: C.line }} />
        <div className="hidden md:flex items-center shrink-0">
            <IconBtn title="Perkecil" onClick={() => zoomStep(-1)}><ZoomOut size={17} /></IconBtn>
            <span className="text-xs w-10 text-center" style={{ color: C.muted }}>{Math.round(zoom * 100)}%</span>
            <IconBtn title="Perbesar" onClick={() => zoomStep(1)}><ZoomIn size={17} /></IconBtn>
        </div>
        
        <div className="flex-1 shrink-0 min-w-4" />
        
        {/* Export Dropdown & Buttons (hidden on small screens) */}
        <div className="hidden sm:flex items-center gap-1 shrink-0">
            <select 
               title="Skala Export (px per kotak)" 
               value={exportScale} 
               onChange={(e) => setExportScale(Number(e.target.value))} 
               className="text-[11px] px-1.5 py-1 rounded cursor-pointer mr-1" 
               style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}
            >
               <option value="1">Skala 1x</option>
               <option value="4">Skala 4x</option>
               <option value="8">Skala 8x</option>
               <option value="16">Skala 16x</option>
               <option value="20">Skala 20x</option>
            </select>
            <IconBtn title="Export PNG" onClick={exportPNG}><ImageIcon size={17} /></IconBtn>
            <IconBtn title="Export SVG" onClick={exportSVG}><FileText size={17} /></IconBtn>
            <IconBtn title="Export PDF (cetak browser)" onClick={exportPDF}><Printer size={17} /></IconBtn>
        </div>

        <div className="w-px h-6 shrink-0" style={{ background: C.line }} />
        <div className="flex items-center shrink-0">
            <PanelToggle title="Panel Grid" active={panels.grid.open} onClick={() => openPanelPinned("grid")}><Grid3x3 size={16} /></PanelToggle>
            <PanelToggle title="Panel Warna" active={panels.color.open} onClick={() => openPanelPinned("color")}><Palette size={16} /></PanelToggle>
            <PanelToggle title="Panel Stempel" active={panels.stamp.open} onClick={() => openPanelPinned("stamp")}><Stamp size={16} /></PanelToggle>
            <PanelToggle title="Panel Layer" active={panels.layer.open} onClick={() => openPanelPinned("layer")}><LayersIcon size={16} /></PanelToggle>
        </div>
      </div>

      {/* ---------- main area ---------- */}
      <div className="flex flex-1 min-h-0">
        {/* left toolbar */}
        <div className="w-14 shrink-0 border-r flex flex-col items-center py-3 gap-1" style={{ background: C.panel, borderColor: C.line }}>
          <ToolBtn active={activeTool === "pencil"} title="Pensil (klik & seret)" onClick={() => setActiveTool("pencil")}><Pencil size={18} /></ToolBtn>
          <ToolBtn active={activeTool === "eraser"} title="Penghapus (klik & seret — juga menghapus stempel)" onClick={() => setActiveTool("eraser")}><Eraser size={18} /></ToolBtn>
          <ToolBtn active={activeTool === "select"} title="Pilih / Select" onClick={() => setActiveTool("select")}><MousePointer2 size={18} /></ToolBtn>
          <ToolBtn active={activeTool === "bucket"} title="Paint Bucket" onClick={() => setActiveTool("bucket")}><PaintBucket size={18} /></ToolBtn>
          <ToolBtn active={activeTool === "line"} title="Line (klik & seret)" onClick={() => setActiveTool("line")}><Slash size={18} /></ToolBtn>
          <ToolBtn active={activeTool === "rect"} title="Rectangle (klik & seret)" onClick={() => setActiveTool("rect")}><Square size={18} /></ToolBtn>
          <div className="w-8 h-px my-1" style={{ background: C.line }} />
          <ToolBtn title="Rotasi objek terpilih 90°" disabled={!hasActiveObject} onClick={rotateActive}><RotateCw size={18} /></ToolBtn>
          <ToolBtn active={activeTool === "stamp"} title="Stempel" onClick={() => setActiveTool("stamp")}><Stamp size={18} /></ToolBtn>
        </div>

        {/* canvas stage */}
        <div id="canvas-stage" className="flex-1 min-w-0 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: "#12151A" }}>
          {hasActiveObject ? (
            <div className="absolute top-3 flex items-center gap-2 px-2 py-1.5 rounded shadow-lg z-10" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
              <span className="text-xs" style={{ color: C.muted }}>{selection ? "Seleksi aktif" : "Stempel terpilih"}</span>
              <button className="flex items-center gap-1 text-xs px-2 py-1 rounded" style={{ background: C.goldSoft, color: C.gold }} onClick={rotateActive}><RotateCw size={13} /> Rotasi 90°</button>
              <button className="flex items-center gap-1 text-xs px-2 py-1 rounded" style={{ background: "rgba(209,73,91,0.15)", color: C.danger }} onClick={deleteActive}><Trash2 size={13} /> Hapus</button>
              <button className="p-1 rounded" style={{ color: C.muted }} onClick={() => { setSelection(null); setSelectedStampId(null); }}><X size={14} /></button>
            </div>
          ) : activeTool === "rect" ? (
            <div className="absolute top-3 flex items-center gap-2 px-2 py-1.5 rounded shadow-lg z-10" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
              <span className="text-xs" style={{ color: C.muted }}>Kotak</span>
              <button
                onClick={() => setRectFilled((f) => !f)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded"
                style={{ background: rectFilled ? C.goldSoft : "transparent", color: rectFilled ? C.gold : C.text, border: `1px solid ${C.line}` }}
              >
                <Square size={13} /> {rectFilled ? "Terisi" : "Garis Tepi"}
              </button>
            </div>
          ) : null}
          <div 
             className="max-w-full max-h-full overflow-auto p-6 touch-none" 
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
          >
            <canvas
              ref={canvasRef}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerLeave={handlePointerLeave}
              style={{ cursor: activeTool === "select" ? "default" : "crosshair", boxShadow: "0 8px 30px rgba(0,0,0,0.5)", imageRendering: "pixelated" }}
            />
          </div>
          <p className="text-xs pb-3 hidden md:block" style={{ color: C.muted }}>
            Klik lalu seret untuk pensil/penghapus/line/rectangle. Untuk stempel, arahkan kursor untuk melihat pratinjau transparan sebelum klik. Scroll atau pinch untuk zoom.
          </p>
        </div>

        {/* right: auto-hide dock */}
        <div
          onMouseEnter={() => { clearTimeout(hoverTimerRef.current); setSidebarHovered(true); }}
          onMouseLeave={() => { hoverTimerRef.current = setTimeout(() => setSidebarHovered(false), 350); }}
          className="shrink-0 border-l flex"
          style={{ width: sidebarExpanded ? 288 : 44, transition: "width 0.18s ease", background: C.panel, borderColor: C.line, overflow: "hidden" }}
        >
          {sidebarExpanded ? (
            <div className="w-72 overflow-y-auto flex-1">
              <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: C.line }}>
                <span className="text-xs" style={{ color: C.muted }}>Panel (auto-hide)</span>
                <button
                  title={sidebarPinned ? "Lepas pin — panel akan auto-hide lagi" : "Pin panel agar tetap terbuka"}
                  onClick={() => setSidebarPinned((p) => !p)}
                  className="p-1 rounded"
                  style={{ color: sidebarPinned ? C.gold : C.muted, background: sidebarPinned ? C.goldSoft : "transparent" }}
                >
                  <Pin size={14} fill={sidebarPinned ? C.gold : "none"} />
                </button>
              </div>

              <Panel title="Kanvas & Grid" icon={<Grid3x3 size={13} />} open={panels.grid.open} collapsed={panels.grid.collapsed} onToggleCollapse={() => togglePanelCollapsed("grid")} onClose={() => closePanel("grid")}>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {GRID_PRESETS.map((p) => (
                    <button key={p.label} onClick={() => applyGridSize(p.cols, p.rows, p.label)} className="text-xs px-2 py-1 rounded border" style={{ borderColor: gridSizeLabel === p.label ? C.gold : C.line, color: gridSizeLabel === p.label ? C.gold : C.text }}>{p.label}</button>
                  ))}
                  <button onClick={() => setGridSizeLabel("custom")} className="text-xs px-2 py-1 rounded border" style={{ borderColor: gridSizeLabel === "custom" ? C.gold : C.line, color: gridSizeLabel === "custom" ? C.gold : C.text }}>Custom</button>
                </div>
                {gridSizeLabel === "custom" && (
                  <div className="flex items-center gap-2 mb-3">
                    <input type="number" min={4} max={128} value={customW} onChange={(e) => setCustomW(Number(e.target.value))} className="w-14 text-xs px-1.5 py-1 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                    <span className="text-xs" style={{ color: C.muted }}>×</span>
                    <input type="number" min={4} max={128} value={customH} onChange={(e) => setCustomH(Number(e.target.value))} className="w-14 text-xs px-1.5 py-1 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                    <button onClick={() => applyGridSize(customW, customH, "custom")} className="text-xs px-2 py-1 rounded" style={{ background: C.gold, color: C.chrome }}>Terapkan</button>
                  </div>
                )}
                <ToggleRow label="Tampilkan Grid" checked={showGrid} onChange={setShowGrid} />
                <ToggleRow label="Grid Alternatif (kotak selang-seling)" checked={showAltShading} onChange={setShowAltShading} />
                <p className="text-xs mt-1.5 leading-relaxed" style={{ color: C.muted }}>Ubah ukuran grid akan menskalakan ulang gambar bebas. Stempel tidak berubah karena tersimpan sebagai objek.</p>
              </Panel>

              <Panel title="Warna" icon={<Palette size={13} />} open={panels.color.open} collapsed={panels.color.collapsed} onToggleCollapse={() => togglePanelCollapsed("color")} onClose={() => closePanel("color")}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded border-2" style={{ background: activeColor, borderColor: C.line }} />
                  <input type="color" value={pickerColor} onChange={(e) => { setPickerColor(e.target.value); pickColor(e.target.value); }} className="w-9 h-9 rounded cursor-pointer" />
                  <button title="Simpan ke palet custom" onClick={() => setCustomPalette((prev) => (prev.includes(pickerColor) ? prev : [...prev, pickerColor].slice(-16)))} className="text-xs px-2 py-1.5 rounded flex items-center gap-1" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}><Plus size={12} /> Palet</button>
                </div>
                <select value={activePaletteName} onChange={(e) => setActivePaletteName(e.target.value)} className="w-full text-xs px-2 py-1.5 rounded mb-2" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }}>
                  {Object.keys(PALETTES).map((name) => (<option key={name} value={name}>{name}</option>))}
                </select>
                <div className="flex flex-wrap gap-1.5 mb-3">{PALETTES[activePaletteName].map((c) => (<Swatch key={c} color={c} active={c === activeColor} onClick={() => pickColor(c)} />))}</div>
                {customPalette.length > 0 && (<><p className="text-xs mb-1" style={{ color: C.muted }}>Palet Custom</p><div className="flex flex-wrap gap-1.5 mb-3">{customPalette.map((c) => (<Swatch key={c} color={c} active={c === activeColor} onClick={() => pickColor(c)} />))}</div></>)}
                {recentColors.length > 0 && (<><p className="text-xs mb-1" style={{ color: C.muted }}>Terakhir Dipakai</p><div className="flex flex-wrap gap-1.5">{recentColors.map((c, i) => (<Swatch key={c + i} color={c} active={c === activeColor} onClick={() => pickColor(c)} />))}</div></>)}
              </Panel>

              <Panel title="Stempel" icon={<Stamp size={13} />} open={panels.stamp.open} collapsed={panels.stamp.collapsed} onToggleCollapse={() => togglePanelCollapsed("stamp")} onClose={() => closePanel("stamp")}>
                <p className="text-xs mb-1.5" style={{ color: C.muted }}>Bentuk Bawaan</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {BUILTIN_STAMPS.map((s) => (
                    <button key={s.id} title={s.label} onClick={() => { setStampChoiceId(s.id); setActiveTool("stamp"); }} className="aspect-square rounded border p-1.5 flex items-center justify-center" style={{ borderColor: stampChoiceId === s.id ? C.gold : C.line, background: stampChoiceId === s.id ? C.goldSoft : C.panelAlt }}>
                      <MiniStampCells cells={s.cells} w={s.w} h={s.h} color={stampChoiceId === s.id ? C.gold : C.muted} />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs" style={{ color: C.muted }}>Stempel dari CSV (ukuran bebas)</p>
                  <button onClick={() => setShowCsvForm((s) => !s)} className="text-xs px-1.5 py-0.5 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.muted }}>{showCsvForm ? "Tutup" : "+ Baru"}</button>
                </div>
                {customCsvStamps.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {customCsvStamps.map((s) => (
                      <button key={s.id} title={s.label} onClick={() => { setStampChoiceId(s.id); setActiveTool("stamp"); }} className="aspect-square rounded border p-1.5 flex items-center justify-center" style={{ borderColor: stampChoiceId === s.id ? C.gold : C.line, background: stampChoiceId === s.id ? C.goldSoft : C.panelAlt }}>
                        <MiniStampCells cells={s.cells} w={s.w} h={s.h} color={stampChoiceId === s.id ? C.gold : C.muted} />
                      </button>
                    ))}
                  </div>
                )}
                {showCsvForm && (
                  <div className="mb-3 p-2 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}>
                    <input value={csvName} onChange={(e) => setCsvName(e.target.value)} placeholder="Nama stempel (mis. Alif)" className="w-full text-xs px-2 py-1.5 rounded mb-1.5" style={{ background: C.chrome, border: `1px solid ${C.line}`, color: C.text }} />
                    <textarea
                      value={csvText}
                      onChange={(e) => setCsvText(e.target.value)}
                      placeholder={"000000000;000000000;000010000;000010000;000010000;000010000;000010000;000000000;000000000"}
                      rows={4}
                      className="w-full text-[10px] font-mono px-2 py-1.5 rounded mb-1.5 leading-relaxed"
                      style={{ background: C.chrome, border: `1px solid ${C.line}`, color: C.text }}
                    />
                    <p className="text-[10px] mb-2 leading-relaxed" style={{ color: C.muted }}>Setiap baris dipisah titik-koma (;). 1 = sel terisi, 0 = kosong. Ukuran mengikuti pola Anda apa adanya (lebar = karakter terpanjang, tinggi = jumlah baris) — tidak harus persegi atau berukuran tetap.</p>
                    <button onClick={handleAddCsvStamp} className="w-full text-xs py-1.5 rounded" style={{ background: C.gold, color: C.chrome }}>Tambah Stempel</button>
                  </div>
                )}

                <p className="text-xs mb-1.5" style={{ color: C.muted }}>Stempel Custom (gambar sendiri)</p>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {customImageStamps.map((cs) => (
                    <button key={cs.id} title={cs.label} onClick={() => { setStampChoiceId(cs.id); setActiveTool("stamp"); }} className="aspect-square rounded border p-1 flex items-center justify-center overflow-hidden" style={{ borderColor: stampChoiceId === cs.id ? C.gold : C.line, background: C.panelAlt }}>
                      <img src={cs.dataUrl} alt={cs.label} className="w-full h-full object-contain" />
                    </button>
                  ))}
                  <button onClick={() => stampUploadRef.current.click()} className="aspect-square rounded border border-dashed flex items-center justify-center" style={{ borderColor: C.line, color: C.muted }} title="Unggah gambar stempel">
                    <Upload size={16} />
                  </button>
                  <input ref={stampUploadRef} type="file" accept="image/*" className="hidden" onChange={handleUploadStamp} />
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: C.muted }}>Ukuran di Kanvas</span>
                    {chosenStamp.kind === "cells" && (
                      <button
                        onClick={() => { setNextFootprintW(chosenStamp.w); setNextFootprintH(chosenStamp.h); }}
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.muted }}
                      >
                        Ukuran asli ({chosenStamp.w}×{chosenStamp.h})
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input type="number" min={1} max={MAX_STAMP} value={nextFootprintW} onChange={(e) => setNextFootprintW(Math.max(1, Math.min(MAX_STAMP, Number(e.target.value) || 1)))} className="w-14 text-xs px-1.5 py-1 rounded text-center" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                    <span className="text-xs" style={{ color: C.muted }}>×</span>
                    <input type="number" min={1} max={MAX_STAMP} value={nextFootprintH} onChange={(e) => setNextFootprintH(Math.max(1, Math.min(MAX_STAMP, Number(e.target.value) || 1)))} className="w-14 text-xs px-1.5 py-1 rounded text-center" style={{ background: C.panelAlt, border: `1px solid ${C.line}`, color: C.text }} />
                    <span className="text-xs" style={{ color: C.muted }}>sel</span>
                  </div>
                  {chosenStamp.kind === "cells" && (nextFootprintW !== chosenStamp.w || nextFootprintH !== chosenStamp.h) && (
                    <p className="text-[10px] mt-1 leading-relaxed" style={{ color: C.muted }}>
                      Pola {chosenStamp.w}×{chosenStamp.h} akan dipadatkan/diregangkan menjadi {nextFootprintW}×{nextFootprintH} sel di kanvas — cocok untuk memuat detail halus dalam ruang terbatas.
                    </p>
                  )}
                </div>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: C.muted }}>PNG transparan persegi memberi hasil terbaik untuk stempel gambar.</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: C.muted }}>Rotasi stempel berikutnya</span>
                  <button onClick={() => setNextStampRotation((r) => (r + 90) % 360)} className="flex items-center gap-1 text-xs px-2 py-1 rounded" style={{ background: C.panelAlt, border: `1px solid ${C.line}` }}><RotateCw size={12} /> {nextStampRotation}°</button>
                </div>
              </Panel>

              <Panel title="Layer" icon={<LayersIcon size={13} />} open={panels.layer.open} collapsed={panels.layer.collapsed} onToggleCollapse={() => togglePanelCollapsed("layer")} onClose={() => closePanel("layer")} noBorder>
                <button onClick={addLayer} className="w-full text-xs py-1.5 rounded mb-2 flex items-center justify-center gap-1" style={{ background: C.gold, color: C.chrome }}><Plus size={13} /> Tambah Layer</button>
                <div className="flex flex-col gap-1.5">
                  {displayLayers.map((layer) => (
                    <LayerRow
                      key={layer.id}
                      layer={layer}
                      active={layer.id === project.activeLayerId}
                      onSelect={() => setActiveLayerId(layer.id)}
                      onToggleVisible={() => toggleVisible(layer.id)}
                      onToggleLock={() => toggleLock(layer.id)}
                      onRename={(name) => renameLayer(layer.id, name)}
                      onDuplicate={() => duplicateLayer(layer.id)}
                      onDelete={() => removeLayer(layer.id)}
                      onOpacity={(v) => setOpacity(layer.id, v)}
                      onMoveUp={() => moveLayer(layer.id, 1)}
                      onMoveDown={() => moveLayer(layer.id, -1)}
                      onMerge={() => mergeDown(layer.id)}
                      canDelete={project.layers.length > 1}
                    />
                  ))}
                </div>
              </Panel>

              {!panels.grid.open && !panels.color.open && !panels.stamp.open && !panels.layer.open && (
                <p className="text-xs p-4 text-center" style={{ color: C.muted }}>Semua panel ditutup. Buka lagi lewat ikon di bar atas.</p>
              )}
            </div>
          ) : (
            <div className="w-11 flex flex-col items-center py-3 gap-1">
              <PanelToggle title="Buka Panel Grid" active={panels.grid.open} onClick={() => openPanelPinned("grid")}><Grid3x3 size={16} /></PanelToggle>
              <PanelToggle title="Buka Panel Warna" active={panels.color.open} onClick={() => openPanelPinned("color")}><Palette size={16} /></PanelToggle>
              <PanelToggle title="Buka Panel Stempel" active={panels.stamp.open} onClick={() => openPanelPinned("stamp")}><Stamp size={16} /></PanelToggle>
              <PanelToggle title="Buka Panel Layer" active={panels.layer.open} onClick={() => openPanelPinned("layer")}><LayersIcon size={16} /></PanelToggle>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ small components ------------------------------ */
function IconBtn({ children, title, onClick, disabled }) {
  return (
    <button title={title} onClick={onClick} disabled={disabled} className="p-1.5 rounded" style={{ color: disabled ? "#4A5361" : C.text, opacity: disabled ? 0.5 : 1 }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.background = C.panelAlt)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      {children}
    </button>
  );
}
function PanelToggle({ children, title, active, onClick }) {
  return (
    <button title={title} onClick={onClick} className="p-1.5 rounded" style={{ background: active ? C.goldSoft : "transparent", color: active ? C.gold : C.muted }}>
      {children}
    </button>
  );
}
function ToolBtn({ children, title, active, disabled, onClick }) {
  return (
    <button title={title} onClick={onClick} disabled={disabled} className="w-10 h-10 rounded flex items-center justify-center" style={{ background: active ? C.goldSoft : "transparent", color: disabled ? "#4A5361" : active ? C.gold : C.muted, opacity: disabled ? 0.5 : 1 }}>
      {children}
    </button>
  );
}
function Panel({ title, icon, open, collapsed, onToggleCollapse, onClose, children, noBorder }) {
  if (!open) return null;
  return (
    <div style={{ borderBottom: noBorder ? "none" : `1px solid ${C.line}` }}>
      <div className="flex items-center justify-between px-4 py-2.5 cursor-pointer" onClick={onToggleCollapse}>
        <div className="flex items-center gap-1.5" style={{ color: C.muted }}>{icon}<span className="text-xs uppercase tracking-wide font-semibold">{title}</span></div>
        <div className="flex items-center gap-0.5">
          <button onClick={(e) => { e.stopPropagation(); onToggleCollapse(); }} style={{ color: C.muted }} className="p-0.5">{collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}</button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} style={{ color: C.muted }} className="p-0.5" title="Tutup panel"><X size={14} /></button>
        </div>
      </div>
      {!collapsed && <div className="px-4 pb-3.5">{children}</div>}
    </div>
  );
}
function ToggleRow({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between py-1 cursor-pointer">
      <span className="text-xs" style={{ color: C.text }}>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
function Swatch({ color, active, onClick }) {
  return <button onClick={onClick} className="w-6 h-6 rounded" style={{ background: color, border: active ? `2px solid ${C.gold}` : `1px solid ${C.line}`, boxShadow: active ? "0 0 0 1px rgba(0,0,0,0.4)" : "none" }} />;
}
function MiniStampCells({ cells, w, h, color }) {
  return (
    <svg width="28" height="28" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid meet">
      {cells.map(([x, y], i) => (<rect key={i} x={x} y={y} width={1} height={1} fill={color} />))}
    </svg>
  );
}
function LayerRow({ layer, active, onSelect, onToggleVisible, onToggleLock, onRename, onDuplicate, onDelete, onOpacity, onMoveUp, onMoveDown, onMerge, canDelete }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(layer.name);
  return (
    <div onClick={onSelect} className="rounded px-2 py-2 cursor-pointer" style={{ background: active ? C.goldSoft : C.panelAlt, border: `1px solid ${active ? C.gold : C.line}` }}>
      <div className="flex items-center gap-1.5">
        <button onClick={(e) => { e.stopPropagation(); onToggleVisible(); }} style={{ color: C.muted }}>{layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}</button>
        <button onClick={(e) => { e.stopPropagation(); onToggleLock(); }} style={{ color: C.muted }}>{layer.locked ? <Lock size={14} /> : <Unlock size={14} />}</button>
        {editing ? (
          <input autoFocus value={name} onChange={(e) => setName(e.target.value)} onBlur={() => { setEditing(false); onRename(name); }} onKeyDown={(e) => e.key === "Enter" && e.target.blur()} onClick={(e) => e.stopPropagation()} className="flex-1 text-xs px-1 py-0.5 rounded min-w-0" style={{ background: C.chrome, border: `1px solid ${C.line}`, color: C.text }} />
        ) : (
          <span onDoubleClick={(e) => { e.stopPropagation(); setEditing(true); }} className="flex-1 text-xs truncate" title="Klik dua kali untuk ubah nama">{layer.name}</span>
        )}
        <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} style={{ color: C.muted }}><ChevronUp size={13} /></button>
        <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} style={{ color: C.muted }}><ChevronDown size={13} /></button>
        <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} style={{ color: C.muted }}><Copy size={13} /></button>
        <button onClick={(e) => { e.stopPropagation(); onMerge(); }} title="Gabung ke bawah" style={{ color: C.muted }}><ArrowUpDown size={13} /></button>
        {canDelete && (<button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ color: C.danger }}><Trash2 size={13} /></button>)}
      </div>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-[10px]" style={{ color: C.muted }}>Opasitas</span>
        <input type="range" min={0} max={1} step={0.05} value={layer.opacity} onClick={(e) => e.stopPropagation()} onChange={(e) => onOpacity(Number(e.target.value))} className="flex-1 h-1" />
      </div>
    </div>
  );
}
