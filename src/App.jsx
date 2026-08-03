import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
//  CATÁLOGO — DATASET DEMO (sanitizado)
//  El piloto real corrió con el catálogo completo de la tienda
//  (78 SKUs con gramaje y vida útil oficiales). Este repo publica
//  una muestra genérica por confidencialidad.
// ═══════════════════════════════════════════════════════════════
const CATALOGO = [
  // COCIDOS
  { id:"arroz_integral",  cat:"COCIDOS",       nombre:"Arroz Integral PQ x 100 GR",    unidad:"UND", gramaje:"100g",   vidaUtil:5,  conservacion:"Refrigeración 1–4°C" },
  { id:"papa_cocida",     cat:"COCIDOS",       nombre:"Papa Cocida PQ x 250 GR",       unidad:"UND", gramaje:"250g",   vidaUtil:5,  conservacion:"Refrigeración 1–4°C" },
  { id:"huevo_cocido",    cat:"COCIDOS",       nombre:"Huevo Cocido x 10 UND",         unidad:"UND", gramaje:"10 und", vidaUtil:4,  conservacion:"Refrigeración 1–4°C" },
  // PROTEÍNAS
  { id:"pollo_grillado",  cat:"PROTEÍNAS",     nombre:"Pollo Grillado PQ x 100 GR",    unidad:"UND", gramaje:"100g",   vidaUtil:7,  conservacion:"Refrigeración 1–4°C" },
  { id:"jamon_pavo",      cat:"PROTEÍNAS",     nombre:"Jamón de Pavo PQ x 120 GR",     unidad:"UND", gramaje:"120g",   vidaUtil:4,  conservacion:"Refrigeración 1–4°C" },
  // PREPARACIONES
  { id:"crutones",        cat:"PREPARACIONES", nombre:"Crutones PQ x 150 GR",          unidad:"UND", gramaje:"150g",   vidaUtil:10, conservacion:"Temperatura Ambiente" },
  { id:"falafel",         cat:"PREPARACIONES", nombre:"Falafel PQ x 8 UND",            unidad:"UND", gramaje:"8 und",  vidaUtil:15, conservacion:"Congelación -16°C" },
  // SALSAS
  { id:"honey_mustard",   cat:"SALSAS",        nombre:"Honey Mustard PQ x 500 ML",     unidad:"UND", gramaje:"500ml",  vidaUtil:15, conservacion:"Refrigeración 1–4°C" },
  { id:"pesto",           cat:"SALSAS",        nombre:"Pesto PQ x 250 ML",             unidad:"UND", gramaje:"250ml",  vidaUtil:15, conservacion:"Congelación -16°C" },
  { id:"vinagreta",       cat:"SALSAS",        nombre:"Vinagreta de la Casa x 500 ML", unidad:"UND", gramaje:"500ml",  vidaUtil:5,  conservacion:"Refrigeración 1–4°C" },
  // VEGANO
  { id:"coleslaw",        cat:"VEGANO",        nombre:"Coleslaw PQ x 100 GR",          unidad:"UND", gramaje:"100g",   vidaUtil:3,  conservacion:"Refrigeración 1–4°C" },
  // POSTRES
  { id:"brownie",         cat:"POSTRES",       nombre:"Brownie Molde x 10 UND",        unidad:"UND", gramaje:"molde",  vidaUtil:15, conservacion:"Refrigeración 1–4°C" },
  { id:"cookie",          cat:"POSTRES",       nombre:"Galleta de Chocolate PQ x 5",   unidad:"UND", gramaje:"5 und",  vidaUtil:7,  conservacion:"Refrigeración 1–4°C" },
  // ABARROTES
  { id:"nachos",          cat:"ABARROTES",     nombre:"Nachos",                        unidad:"UND", gramaje:"und",    vidaUtil:15, conservacion:"Temperatura Ambiente" },
  // VERDURAS
  { id:"lechuga",         cat:"VERDURAS",      nombre:"Lechuga Hidropónica",           unidad:"KG",  gramaje:"kg",     vidaUtil:3,  conservacion:"Refrigeración 1–4°C" },
  { id:"palta",           cat:"VERDURAS",      nombre:"Palta",                         unidad:"KG",  gramaje:"kg",     vidaUtil:4,  conservacion:"Refrigeración 1–4°C" },
  { id:"tomate",          cat:"VERDURAS",      nombre:"Tomate",                        unidad:"KG",  gramaje:"kg",     vidaUtil:5,  conservacion:"Refrigeración 1–4°C" },
];

// ═══════════════════════════════════════════════════════════════
//  PEDIDOS DEMO
//  Calendario: MARTES→cubre Jue+Vie | JUEVES→Sáb+Dom+Lun | VIERNES→Mar+Mié
// ═══════════════════════════════════════════════════════════════
const PEDIDOS_SEED = [
  {
    id:"p_demo_1", fecha:"2026-07-16", tipoPedido:"jueves",
    diasQueCubre:["2026-07-18","2026-07-19","2026-07-20"],
    notas:"Pedido demo — cubre sáb, dom, lun",
    items:[
      {pid:"arroz_integral",n:"Arroz Integral",q:40,u:"UND"},
      {pid:"papa_cocida",n:"Papa Cocida",q:6,u:"UND"},
      {pid:"huevo_cocido",n:"Huevo Cocido",q:8,u:"UND"},
      {pid:"pollo_grillado",n:"Pollo Grillado",q:60,u:"UND"},
      {pid:"jamon_pavo",n:"Jamón de Pavo",q:14,u:"UND"},
      {pid:"crutones",n:"Crutones",q:2,u:"UND"},
      {pid:"honey_mustard",n:"Honey Mustard",q:4,u:"UND"},
      {pid:"vinagreta",n:"Vinagreta de la Casa",q:6,u:"UND"},
      {pid:"coleslaw",n:"Coleslaw",q:20,u:"UND"},
      {pid:"brownie",n:"Brownie Molde",q:2,u:"UND"},
      {pid:"lechuga",n:"Lechuga Hidropónica",q:16,u:"KG"},
      {pid:"palta",n:"Palta",q:12,u:"KG"},
      {pid:"tomate",n:"Tomate",q:15,u:"KG"},
    ]
  },
  {
    id:"p_demo_2", fecha:"2026-07-21", tipoPedido:"martes",
    diasQueCubre:["2026-07-23","2026-07-24"],
    notas:"Pedido demo — cubre jue, vie",
    items:[
      {pid:"arroz_integral",n:"Arroz Integral",q:30,u:"UND"},
      {pid:"papa_cocida",n:"Papa Cocida",q:4,u:"UND"},
      {pid:"huevo_cocido",n:"Huevo Cocido",q:5,u:"UND"},
      {pid:"pollo_grillado",n:"Pollo Grillado",q:45,u:"UND"},
      {pid:"jamon_pavo",n:"Jamón de Pavo",q:10,u:"UND"},
      {pid:"falafel",n:"Falafel",q:1,u:"UND"},
      {pid:"pesto",n:"Pesto",q:2,u:"UND"},
      {pid:"vinagreta",n:"Vinagreta de la Casa",q:4,u:"UND"},
      {pid:"coleslaw",n:"Coleslaw",q:15,u:"UND"},
      {pid:"cookie",n:"Galleta de Chocolate",q:3,u:"UND"},
      {pid:"nachos",n:"Nachos",q:1,u:"UND"},
      {pid:"lechuga",n:"Lechuga Hidropónica",q:12,u:"KG"},
      {pid:"palta",n:"Palta",q:10,u:"KG"},
      {pid:"tomate",n:"Tomate",q:12,u:"KG"},
    ]
  }
];

// Merma demo: salida de stock de ejemplo
const MERMA_SEED = [
  {
    id:"m_demo_1", pedidoId:"p_demo_1", fecha:"2026-07-20",
    codigo:"#0001", razon:"Vencimiento", totalS:44.10,
    items:[
      {pid:"lechuga",n:"Lechuga Hidropónica",q:1.5,u:"KG",s:9.00},
      {pid:"palta",n:"Palta",q:2,u:"KG",s:16.00},
      {pid:"coleslaw",n:"Coleslaw",q:4,u:"UND",s:10.40},
      {pid:"pollo_grillado",n:"Pollo Grillado",q:3,u:"UND",s:8.70},
    ]
  }
];

// ═══════════════════════════════════════════════════════════════
//  UTILIDADES
// ═══════════════════════════════════════════════════════════════
const DIAS_ES = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const MESES_ES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];

function formatFecha(iso) {
  const d = new Date(iso + "T12:00:00");
  return `${d.getDate()} ${MESES_ES[d.getMonth()]} ${d.getFullYear()}`;
}
function diaSemana(iso) {
  return DIAS_ES[new Date(iso + "T12:00:00").getDay()];
}
function genId() { return "id_" + Date.now() + "_" + Math.random().toString(36).slice(2,7); }
function addDays(iso, n) {
  const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate()+n);
  return d.toISOString().split("T")[0];
}

const ORDEN_TIPO = { martes:{cubre:2}, jueves:{cubre:3}, viernes:{cubre:2} };

// Días que cubre un pedido según el calendario fijo de la tienda
function calcCubre(fecha, tipo) {
  if(tipo==="martes")  return [addDays(fecha,2), addDays(fecha,3)];            // jue, vie
  if(tipo==="jueves")  return [addDays(fecha,2), addDays(fecha,3), addDays(fecha,4)]; // sáb, dom, lun
  return [addDays(fecha,4), addDays(fecha,5)];                                  // vie → mar, mié
}

function getProximoPedido() {
  const hoy = new Date();
  const dow = hoy.getDay(); // 0=dom … 6=sab
  const orderDays = [2,4,5]; // mar, jue, vie
  for(let i=1; i<=7; i++){
    const nextDow = (dow+i)%7;
    if(orderDays.includes(nextDow)){
      const next = new Date(hoy); next.setDate(hoy.getDate()+i);
      const tipo = nextDow===2?"martes": nextDow===4?"jueves":"viernes";
      return { fecha: next.toISOString().split("T")[0], tipo, diasHasta:i };
    }
  }
}

// Persistencia local — port del window.storage del artefacto original a localStorage
function storeSave(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){}
}
function storeLoad(key){
  try{ const r = localStorage.getItem(key); return r ? JSON.parse(r) : null; }
  catch(e){ return null; }
}

const CAT_COLORS = {
  COCIDOS:"#0F766E",PROTEÍNAS:"#B45309",PREPARACIONES:"#7C3AED",
  SALSAS:"#0369A1",VEGANO:"#15803D",POSTRES:"#BE185D",
  CUCHAREABLE:"#92400E",ABARROTES:"#374151",VERDURAS:"#4D7C0F",
};
function catColor(c){ return CAT_COLORS[c]||"#374151"; }

// ═══════════════════════════════════════════════════════════════
//  MODAL: NUEVO PEDIDO
// ═══════════════════════════════════════════════════════════════
function ModalPedido({ onSave, onClose }){
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [tipo, setTipo] = useState("martes");
  const [notas, setNotas] = useState("");
  const [items, setItems] = useState([]);
  const [pid, setPid] = useState(CATALOGO[0].id);
  const [qty, setQty] = useState("");

  function addItem(){
    const p = CATALOGO.find(c=>c.id===pid);
    const q = parseFloat(qty);
    if(!p || !q || q<=0) return;
    setItems(prev=>[...prev.filter(i=>i.pid!==pid), {pid:p.id, n:p.nombre, q, u:p.unidad}]);
    setQty("");
  }
  function save(){
    if(items.length===0) return;
    onSave({ id:genId(), fecha, tipoPedido:tipo, diasQueCubre:calcCubre(fecha,tipo), notas, items });
    onClose();
  }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"white",borderRadius:14,width:"100%",maxWidth:460,maxHeight:"85vh",overflowY:"auto"}}>
        <div style={{background:"#14532D",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"white",fontWeight:800,fontSize:15}}>📦 Nuevo pedido</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"white",fontSize:18,cursor:"pointer"}}>×</button>
        </div>
        <div style={{padding:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            <label style={{fontSize:12,color:"#374151",fontWeight:600}}>Fecha
              <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)}
                style={{width:"100%",marginTop:4,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:13}}/>
            </label>
            <label style={{fontSize:12,color:"#374151",fontWeight:600}}>Día de pedido
              <select value={tipo} onChange={e=>setTipo(e.target.value)}
                style={{width:"100%",marginTop:4,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:13}}>
                <option value="martes">Martes (cubre jue-vie)</option>
                <option value="jueves">Jueves (cubre sáb-dom-lun)</option>
                <option value="viernes">Viernes (cubre mar-mié)</option>
              </select>
            </label>
          </div>
          <label style={{fontSize:12,color:"#374151",fontWeight:600}}>Notas
            <input value={notas} onChange={e=>setNotas(e.target.value)} placeholder="Opcional"
              style={{width:"100%",marginTop:4,marginBottom:10,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:13,boxSizing:"border-box"}}/>
          </label>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            <select value={pid} onChange={e=>setPid(e.target.value)}
              style={{flex:1,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:12}}>
              {CATALOGO.map(p=><option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
            <input type="number" value={qty} onChange={e=>setQty(e.target.value)} placeholder="Cant."
              style={{width:70,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:12}}/>
            <button onClick={addItem} style={{background:"#14532D",color:"white",border:"none",borderRadius:8,padding:"0 12px",fontWeight:700,cursor:"pointer"}}>+</button>
          </div>
          {items.length>0&&(
            <div style={{marginBottom:12,display:"flex",flexWrap:"wrap",gap:4}}>
              {items.map(i=>(
                <span key={i.pid} style={{background:"#F3F4F6",borderRadius:6,padding:"3px 8px",fontSize:11,color:"#374151"}}>
                  {i.n}: <strong>{i.q}</strong> {i.u}
                  <button onClick={()=>setItems(prev=>prev.filter(x=>x.pid!==i.pid))}
                    style={{background:"none",border:"none",color:"#B91C1C",cursor:"pointer",marginLeft:4,fontWeight:700}}>×</button>
                </span>
              ))}
            </div>
          )}
          <button onClick={save} disabled={items.length===0}
            style={{width:"100%",background:items.length?"#14532D":"#D1D5DB",color:"white",border:"none",borderRadius:10,padding:"11px 0",fontWeight:800,fontSize:14,cursor:items.length?"pointer":"default"}}>
            Guardar pedido ({items.length} productos)
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MODAL: REGISTRAR MERMA
// ═══════════════════════════════════════════════════════════════
function ModalMerma({ pedidos, onSave, onClose }){
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [codigo, setCodigo] = useState("");
  const [razon, setRazon] = useState("Vencimiento");
  const [pedidoId, setPedidoId] = useState("");
  const [items, setItems] = useState([]);
  const [pid, setPid] = useState(CATALOGO[0].id);
  const [qty, setQty] = useState("");
  const [costo, setCosto] = useState("");

  function addItem(){
    const p = CATALOGO.find(c=>c.id===pid);
    const q = parseFloat(qty); const s = parseFloat(costo);
    if(!p || !q || q<=0 || isNaN(s)) return;
    setItems(prev=>[...prev.filter(i=>i.pid!==pid), {pid:p.id, n:p.nombre, q, u:p.unidad, s}]);
    setQty(""); setCosto("");
  }
  function save(){
    if(items.length===0) return;
    const totalS = items.reduce((sum,i)=>sum+i.s,0);
    onSave({ id:genId(), pedidoId:pedidoId||null, fecha, codigo:codigo||"s/c", razon, totalS, items });
    onClose();
  }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"white",borderRadius:14,width:"100%",maxWidth:460,maxHeight:"85vh",overflowY:"auto"}}>
        <div style={{background:"#DC2626",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{color:"white",fontWeight:800,fontSize:15}}>⚠️ Registrar merma</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"white",fontSize:18,cursor:"pointer"}}>×</button>
        </div>
        <div style={{padding:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            <label style={{fontSize:12,color:"#374151",fontWeight:600}}>Fecha
              <input type="date" value={fecha} onChange={e=>setFecha(e.target.value)}
                style={{width:"100%",marginTop:4,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:13}}/>
            </label>
            <label style={{fontSize:12,color:"#374151",fontWeight:600}}>Código de salida
              <input value={codigo} onChange={e=>setCodigo(e.target.value)} placeholder="#0002"
                style={{width:"100%",marginTop:4,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:13,boxSizing:"border-box"}}/>
            </label>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
            <label style={{fontSize:12,color:"#374151",fontWeight:600}}>Razón
              <select value={razon} onChange={e=>setRazon(e.target.value)}
                style={{width:"100%",marginTop:4,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:13}}>
                <option>Vencimiento</option><option>Daño</option><option>Preparación</option><option>Otro</option>
              </select>
            </label>
            <label style={{fontSize:12,color:"#374151",fontWeight:600}}>Del pedido
              <select value={pedidoId} onChange={e=>setPedidoId(e.target.value)}
                style={{width:"100%",marginTop:4,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:13}}>
                <option value="">— ninguno —</option>
                {pedidos.map(p=><option key={p.id} value={p.id}>{p.tipoPedido} {formatFecha(p.fecha)}</option>)}
              </select>
            </label>
          </div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            <select value={pid} onChange={e=>setPid(e.target.value)}
              style={{flex:1,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:12}}>
              {CATALOGO.map(p=><option key={p.id} value={p.id}>{p.nombre}</option>)}
            </select>
            <input type="number" value={qty} onChange={e=>setQty(e.target.value)} placeholder="Cant."
              style={{width:60,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:12}}/>
            <input type="number" value={costo} onChange={e=>setCosto(e.target.value)} placeholder="S/"
              style={{width:60,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:12}}/>
            <button onClick={addItem} style={{background:"#DC2626",color:"white",border:"none",borderRadius:8,padding:"0 12px",fontWeight:700,cursor:"pointer"}}>+</button>
          </div>
          {items.length>0&&(
            <div style={{marginBottom:12}}>
              {items.map(i=>(
                <div key={i.pid} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:12,color:"#374151"}}>
                  <span>{i.n} · {i.q} {i.u}</span>
                  <span style={{fontFamily:"monospace",fontWeight:700,color:"#B91C1C"}}>
                    S/ {i.s.toFixed(2)}
                    <button onClick={()=>setItems(prev=>prev.filter(x=>x.pid!==i.pid))}
                      style={{background:"none",border:"none",color:"#B91C1C",cursor:"pointer",marginLeft:6,fontWeight:700}}>×</button>
                  </span>
                </div>
              ))}
            </div>
          )}
          <button onClick={save} disabled={items.length===0}
            style={{width:"100%",background:items.length?"#DC2626":"#D1D5DB",color:"white",border:"none",borderRadius:10,padding:"11px 0",fontWeight:800,fontSize:14,cursor:items.length?"pointer":"default"}}>
            Registrar merma (S/ {items.reduce((s,i)=>s+i.s,0).toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function App(){
  const [tab, setTab] = useState("dashboard");
  const [pedidos, setPedidos] = useState([]);
  const [mermas, setMermas] = useState([]);
  const [ready, setReady] = useState(false);
  const [modal, setModal] = useState(null); // "pedido" | "merma"
  const [stockInput, setStockInput] = useState({});
  const [filterCat, setFilterCat] = useState("TODAS");
  const [searchQ, setSearchQ] = useState("");

  // ── Cargar datos al iniciar ──────────────────────────────────
  useEffect(()=>{
    setPedidos(storeLoad("sm_pedidos")||PEDIDOS_SEED);
    setMermas(storeLoad("sm_mermas")||MERMA_SEED);
    setReady(true);
  },[]);

  // ── Guardar cuando cambian datos ─────────────────────────────
  useEffect(()=>{ if(ready){ storeSave("sm_pedidos",pedidos); } },[pedidos,ready]);
  useEffect(()=>{ if(ready){ storeSave("sm_mermas",mermas); } },[mermas,ready]);

  if(!ready) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#EBF0EB",fontFamily:"system-ui,sans-serif"}}>
      <div style={{textAlign:"center",color:"#14532D"}}>
        <div style={{fontSize:32,marginBottom:8}}>🌿</div>
        <div style={{fontWeight:700}}>Cargando Smart Merma...</div>
      </div>
    </div>
  );

  // ── Recomendación: consumo promedio (pedido − merma) vs stock ─
  function calcRecomendacion(productoId, stockActual){
    const historial = pedidos.map(p=>{
      const item = p.items.find(i=>i.pid===productoId);
      if(!item||item.q===0) return null;
      const mermaProd = mermas
        .filter(m=>m.pedidoId===p.id)
        .flatMap(m=>m.items)
        .filter(mi=>mi.pid===productoId)
        .reduce((s,mi)=>s+mi.q,0);
      return { fecha:p.fecha, tipo:p.tipoPedido, pedido:item.q, merma:mermaProd, consumo:Math.max(0,item.q-mermaProd) };
    }).filter(Boolean);

    if(historial.length===0) return { recomendado:0, historial:[], sinDatos:true };
    const avgConsumo = historial.reduce((s,h)=>s+h.consumo,0)/historial.length;
    const stock = stockActual||0;
    const recomendado = Math.max(0, Math.ceil(avgConsumo - stock));
    return { recomendado, avgConsumo:avgConsumo.toFixed(1), historial };
  }

  // ── Totales ───────────────────────────────────────────────────
  const totalMermaS = mermas.reduce((s,m)=>s+m.totalS,0);
  const proximoPedido = getProximoPedido();
  const prodCriticos = CATALOGO.filter(p=>p.vidaUtil<=3).length;
  const CATS = ["TODAS",...new Set(CATALOGO.map(p=>p.cat))];

  const catalogoFiltrado = CATALOGO
    .filter(p=>filterCat==="TODAS"||p.cat===filterCat)
    .filter(p=>p.nombre.toLowerCase().includes(searchQ.toLowerCase()));

  // ══════════════════════════════════════════════════════════════
  //  RENDER
  // ══════════════════════════════════════════════════════════════
  return(
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:"#EBF0EB",minHeight:"100vh",paddingBottom:80}}>

      {/* HEADER */}
      <div style={{background:"#14532D",padding:"14px 16px 12px",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(0,0,0,0.2)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{color:"white",fontWeight:900,fontSize:17,letterSpacing:-0.5}}>
              <span style={{color:"#4ADE80",marginRight:6}}>◈</span>Smart Merma
            </div>
            <div style={{color:"#86EFAC",fontSize:11,marginTop:1}}>Demo Store · José Luis Monteza</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{color:"#FCA5A5",fontFamily:"monospace",fontWeight:800,fontSize:15}}>S/ {totalMermaS.toFixed(2)}</div>
            <div style={{color:"#FCA5A5",fontSize:9,opacity:.8}}>merma registrada</div>
          </div>
        </div>
      </div>

      {/* CONTENIDO POR PESTAÑA */}
      <div style={{maxWidth:860,margin:"0 auto",padding:"12px 12px 0"}}>

        {/* ── DASHBOARD ─────────────────────────────────────── */}
        {tab==="dashboard"&&<>
          {proximoPedido&&(
            <div style={{background:"#14532D",borderRadius:12,padding:"14px 16px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{color:"#86EFAC",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>Próximo pedido</div>
                <div style={{color:"white",fontWeight:800,fontSize:18,marginTop:2,textTransform:"capitalize"}}>{proximoPedido.tipo} {formatFecha(proximoPedido.fecha)}</div>
                <div style={{color:"#A7F3D0",fontSize:12,marginTop:2}}>
                  {proximoPedido.diasHasta===1?"Mañana":`En ${proximoPedido.diasHasta} días`} · cubre {ORDEN_TIPO[proximoPedido.tipo]?.cubre} días
                </div>
              </div>
              <button onClick={()=>setTab("recomendacion")} style={{background:"#4ADE80",color:"#14532D",border:"none",borderRadius:8,padding:"8px 14px",fontWeight:800,fontSize:13,cursor:"pointer"}}>
                Ver qué pedir →
              </button>
            </div>
          )}

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:12}}>
            {[
              {label:"Pedidos registrados",val:pedidos.length,icon:"📦",color:"#0369A1",bg:"#EFF6FF"},
              {label:"Registros de merma",val:mermas.length,icon:"⚠️",color:"#B45309",bg:"#FFFBEB"},
              {label:"Productos críticos",val:prodCriticos,icon:"🕐",color:"#DC2626",bg:"#FEF2F2",sub:"vida útil ≤ 3 días"},
            ].map((s,i)=>(
              <div key={i} style={{background:s.bg,borderRadius:10,padding:"11px 12px",border:`1px solid ${s.color}22`}}>
                <div style={{fontSize:18,marginBottom:4}}>{s.icon}</div>
                <div style={{color:s.color,fontFamily:"monospace",fontWeight:900,fontSize:20}}>{s.val}</div>
                <div style={{color:"#6B7280",fontSize:10,fontWeight:600,marginTop:2}}>{s.label}</div>
                {s.sub&&<div style={{color:"#9CA3AF",fontSize:9}}>{s.sub}</div>}
              </div>
            ))}
          </div>

          <div style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.07)",marginBottom:12}}>
            <div style={{padding:"11px 14px",borderBottom:"1px solid #F3F4F6",fontWeight:700,color:"#111827",fontSize:13}}>
              📋 Pedidos recientes
            </div>
            {[...pedidos].sort((a,b)=>b.fecha.localeCompare(a.fecha)).slice(0,5).map(p=>{
              const mermaDePedido = mermas.filter(m=>m.pedidoId===p.id).reduce((s,m)=>s+m.totalS,0);
              return(
                <div key={p.id} style={{padding:"10px 14px",borderTop:"1px solid #F9FAFB",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:600,color:"#111827",fontSize:13,textTransform:"capitalize"}}>{p.tipoPedido} {formatFecha(p.fecha)}</div>
                    <div style={{color:"#9CA3AF",fontSize:11}}>{p.items.length} productos · cubre {p.diasQueCubre.map(d=>diaSemana(d)).join(", ")}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    {mermaDePedido>0&&<div style={{color:"#DC2626",fontFamily:"monospace",fontWeight:700,fontSize:13}}>-S/ {mermaDePedido.toFixed(2)}</div>}
                    {mermaDePedido===0&&<div style={{color:"#16A34A",fontSize:11,fontWeight:600}}>Sin merma</div>}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
            <div style={{padding:"11px 14px",borderBottom:"1px solid #F3F4F6",fontWeight:700,color:"#111827",fontSize:13}}>
              🕐 Productos con vida útil corta (≤ 5 días)
            </div>
            {CATALOGO.filter(p=>p.vidaUtil<=5).sort((a,b)=>a.vidaUtil-b.vidaUtil).map(p=>(
              <div key={p.id} style={{padding:"8px 14px",borderTop:"1px solid #F9FAFB",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:12,fontWeight:600,color:"#1F2937"}}>{p.nombre}</div>
                  <div style={{fontSize:10,color:"#9CA3AF"}}>{p.gramaje} · {p.conservacion}</div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{background:p.vidaUtil<=3?"#FEE2E2":"#FEF3C7",color:p.vidaUtil<=3?"#B91C1C":"#92400E",padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:800}}>
                    {p.vidaUtil}d
                  </span>
                  <span style={{fontSize:10,fontWeight:600,color:catColor(p.cat)}}>{p.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </>}

        {/* ── PEDIDOS ───────────────────────────────────────── */}
        {tab==="pedidos"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontWeight:800,color:"#14532D",fontSize:15}}>📦 Pedidos ({pedidos.length})</div>
            <button onClick={()=>setModal("pedido")} style={{background:"#14532D",color:"white",border:"none",borderRadius:8,padding:"8px 14px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
              + Nuevo pedido
            </button>
          </div>
          {[...pedidos].sort((a,b)=>b.fecha.localeCompare(a.fecha)).map(p=>{
            const mermaP = mermas.filter(m=>m.pedidoId===p.id).reduce((s,m)=>s+m.totalS,0);
            const cats = [...new Set(p.items.map(i=>{const c=CATALOGO.find(c=>c.id===i.pid); return c?c.cat:null}).filter(Boolean))];
            return(
              <div key={p.id} style={{background:"white",borderRadius:12,marginBottom:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
                <div style={{padding:"12px 14px",background:"#F7FAF7",borderBottom:"1px solid #E5E7EB",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontWeight:800,color:"#14532D",fontSize:14,textTransform:"capitalize"}}>{p.tipoPedido} {formatFecha(p.fecha)}</div>
                    <div style={{color:"#6B7280",fontSize:11,marginTop:2}}>
                      Cubre: {p.diasQueCubre.map(d=>diaSemana(d)).join(", ")} · {p.items.length} productos
                    </div>
                    {p.notas&&<div style={{color:"#9CA3AF",fontSize:10,marginTop:1,fontStyle:"italic"}}>{p.notas}</div>}
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={()=>setPedidos(prev=>prev.filter(x=>x.id!==p.id))}
                      style={{background:"#FEE2E2",color:"#B91C1C",border:"none",borderRadius:6,padding:"4px 8px",fontSize:11,cursor:"pointer",fontWeight:600}}>
                      Eliminar
                    </button>
                  </div>
                </div>
                <div style={{padding:"10px 14px"}}>
                  {cats.map(cat=>{
                    const items=p.items.filter(i=>{const c=CATALOGO.find(c=>c.id===i.pid);return c&&c.cat===cat;});
                    return(
                      <div key={cat} style={{marginBottom:8}}>
                        <div style={{fontSize:10,fontWeight:800,color:catColor(cat),textTransform:"uppercase",letterSpacing:0.8,marginBottom:4}}>{cat}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                          {items.filter(i=>i.q>0).map(i=>(
                            <span key={i.pid} style={{background:"#F3F4F6",borderRadius:6,padding:"2px 8px",fontSize:11,color:"#374151"}}>
                              {i.n}: <strong>{i.q}</strong> {i.u}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {mermaP>0&&(
                    <div style={{marginTop:8,padding:"6px 10px",background:"#FEF2F2",borderRadius:6,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{color:"#B91C1C",fontSize:11,fontWeight:600}}>⚠️ Merma registrada</span>
                      <span style={{color:"#B91C1C",fontFamily:"monospace",fontWeight:800,fontSize:12}}>S/ {mermaP.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </>}

        {/* ── MERMA ────────────────────────────────────────── */}
        {tab==="merma"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontWeight:800,color:"#14532D",fontSize:15}}>⚠️ Merma ({mermas.length})</div>
            <button onClick={()=>setModal("merma")} style={{background:"#DC2626",color:"white",border:"none",borderRadius:8,padding:"8px 14px",fontWeight:700,fontSize:13,cursor:"pointer"}}>
              + Registrar merma
            </button>
          </div>

          <div style={{background:"#FEF2F2",borderRadius:10,padding:"12px 14px",marginBottom:12,border:"1px solid #FECACA"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{color:"#B91C1C",fontSize:11,fontWeight:700,textTransform:"uppercase"}}>Pérdida total registrada</div>
                <div style={{color:"#7F1D1D",fontFamily:"monospace",fontWeight:900,fontSize:24,marginTop:2}}>S/ {totalMermaS.toFixed(2)}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{color:"#B91C1C",fontSize:11}}>{mermas.reduce((s,m)=>s+m.items.length,0)} productos</div>
                <div style={{color:"#9CA3AF",fontSize:10}}>en {mermas.length} salidas</div>
              </div>
            </div>
          </div>

          {[...mermas].sort((a,b)=>b.fecha.localeCompare(a.fecha)).map(m=>(
            <div key={m.id} style={{background:"white",borderRadius:12,marginBottom:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
              <div style={{padding:"11px 14px",background:"#FEF2F2",borderBottom:"1px solid #FECACA",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontWeight:800,color:"#B91C1C",fontSize:13}}>Salida {m.codigo} · {formatFecha(m.fecha)}</div>
                  <div style={{color:"#9CA3AF",fontSize:11}}>Razón: {m.razon} · {m.items.length} productos</div>
                  {m.pedidoId&&<div style={{color:"#9CA3AF",fontSize:10}}>Del pedido: {pedidos.find(p=>p.id===m.pedidoId)?.fecha||m.pedidoId}</div>}
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <div style={{textAlign:"right",marginRight:6}}>
                    <div style={{color:"#B91C1C",fontFamily:"monospace",fontWeight:800,fontSize:16}}>S/ {m.totalS.toFixed(2)}</div>
                  </div>
                  <button onClick={()=>setMermas(prev=>prev.filter(x=>x.id!==m.id))}
                    style={{background:"#FEE2E2",color:"#B91C1C",border:"none",borderRadius:6,padding:"4px 8px",fontSize:11,cursor:"pointer",fontWeight:600}}>
                    ×
                  </button>
                </div>
              </div>
              <div style={{padding:"10px 14px"}}>
                {m.items.map((mi,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid #F9FAFB",alignItems:"center"}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#1F2937"}}>{mi.n}</div>
                    <div style={{display:"flex",gap:12,alignItems:"center"}}>
                      <span style={{fontSize:11,color:"#6B7280"}}>{mi.q} {mi.u}</span>
                      <span style={{fontFamily:"monospace",fontWeight:700,color:"#B91C1C",fontSize:12}}>S/ {mi.s.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>}

        {/* ── RECOMENDACIÓN ──────────────────────────────────── */}
        {tab==="recomendacion"&&<>
          {proximoPedido&&(
            <div style={{background:"#14532D",borderRadius:12,padding:"12px 14px",marginBottom:12}}>
              <div style={{color:"#86EFAC",fontSize:11,fontWeight:700,textTransform:"uppercase"}}>Calculando para</div>
              <div style={{color:"white",fontWeight:900,fontSize:18,marginTop:2,textTransform:"capitalize"}}>
                Pedido {proximoPedido.tipo} · {formatFecha(proximoPedido.fecha)}
              </div>
              <div style={{color:"#A7F3D0",fontSize:11,marginTop:2}}>
                Cubre {ORDEN_TIPO[proximoPedido.tipo]?.cubre} días · Ingresa tu stock actual abajo
              </div>
            </div>
          )}

          <div style={{background:"#FFF9C4",border:"1px solid #FDE68A",borderRadius:8,padding:"10px 12px",marginBottom:12,fontSize:12,color:"#92400E"}}>
            💡 Ingresa cuánto tienes en tienda ahora mismo. La app calcula qué pedir según el consumo real (pedido − merma) de los pedidos anteriores.
          </div>

          <input
            value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="🔍 Buscar producto..."
            style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",border:"1px solid #D1D5DB",borderRadius:10,fontSize:13,marginBottom:10,background:"white"}}
          />

          {catalogoFiltrado.map(p=>{
            const stock = parseFloat(stockInput[p.id])||0;
            const rec = calcRecomendacion(p.id, stock);
            if(rec.sinDatos) return null;
            return(
              <div key={p.id} style={{background:"white",borderRadius:12,marginBottom:8,padding:"11px 14px",boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#1F2937"}}>{p.nombre}</div>
                    <div style={{fontSize:10,color:"#9CA3AF"}}>{p.gramaje} · consumo prom. {rec.avgConsumo} {p.unidad}</div>
                  </div>
                  <input
                    type="number" placeholder="Stock"
                    value={stockInput[p.id]||""}
                    onChange={e=>setStockInput(prev=>({...prev,[p.id]:e.target.value}))}
                    style={{width:64,padding:"7px 8px",border:"1px solid #D1D5DB",borderRadius:8,fontSize:12,textAlign:"center"}}
                  />
                  <div style={{textAlign:"center",minWidth:70}}>
                    <div style={{fontFamily:"monospace",fontWeight:900,fontSize:20,color:rec.recomendado>0?"#14532D":"#9CA3AF"}}>{rec.recomendado}</div>
                    <div style={{fontSize:9,color:"#6B7280",fontWeight:600}}>pedir ({p.unidad})</div>
                  </div>
                </div>
                <div style={{marginTop:6,display:"flex",flexWrap:"wrap",gap:4}}>
                  {rec.historial.map((h,i)=>(
                    <span key={i} style={{background:"#F3F4F6",borderRadius:6,padding:"2px 7px",fontSize:10,color:"#6B7280"}}>
                      {formatFecha(h.fecha)}: pediste <strong>{h.pedido}</strong>{h.merma>0&&<> · merma <strong style={{color:"#B91C1C"}}>{h.merma}</strong></>} → consumo {h.consumo}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </>}

        {/* ── CATÁLOGO ─────────────────────────────────────── */}
        {tab==="catalogo"&&<>
          <div style={{fontWeight:800,color:"#14532D",fontSize:15,marginBottom:10}}>📚 Catálogo ({catalogoFiltrado.length})</div>
          <input
            value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="🔍 Buscar producto..."
            style={{width:"100%",boxSizing:"border-box",padding:"10px 12px",border:"1px solid #D1D5DB",borderRadius:10,fontSize:13,marginBottom:10,background:"white"}}
          />
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:12}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>setFilterCat(c)}
                style={{background:filterCat===c?"#14532D":"white",color:filterCat===c?"white":"#374151",border:"1px solid #D1D5DB",borderRadius:16,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                {c}
              </button>
            ))}
          </div>
          <div style={{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
            {catalogoFiltrado.map(p=>(
              <div key={p.id} style={{padding:"10px 14px",borderTop:"1px solid #F9FAFB",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:"#1F2937"}}>{p.nombre}</div>
                  <div style={{fontSize:10,color:"#9CA3AF"}}>{p.gramaje} · {p.conservacion}</div>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{background:p.vidaUtil<=3?"#FEE2E2":p.vidaUtil<=5?"#FEF3C7":"#DCFCE7",color:p.vidaUtil<=3?"#B91C1C":p.vidaUtil<=5?"#92400E":"#166534",padding:"2px 8px",borderRadius:10,fontSize:10,fontWeight:800}}>
                    {p.vidaUtil}d
                  </span>
                  <span style={{fontSize:10,fontWeight:700,color:catColor(p.cat)}}>{p.cat}</span>
                </div>
              </div>
            ))}
          </div>
        </>}

      </div>

      {/* NAVEGACIÓN INFERIOR */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"1px solid #E5E7EB",display:"flex",zIndex:150,boxShadow:"0 -2px 8px rgba(0,0,0,0.06)"}}>
        {[
          {id:"dashboard",icon:"🏠",label:"Inicio"},
          {id:"pedidos",icon:"📦",label:"Pedidos"},
          {id:"merma",icon:"⚠️",label:"Merma"},
          {id:"recomendacion",icon:"💡",label:"Recomendar"},
          {id:"catalogo",icon:"📚",label:"Catálogo"},
        ].map(t=>(
          <button key={t.id} onClick={()=>{setTab(t.id); setSearchQ("");}}
            style={{flex:1,background:"none",border:"none",padding:"9px 0 10px",cursor:"pointer",color:tab===t.id?"#14532D":"#9CA3AF"}}>
            <div style={{fontSize:17}}>{t.icon}</div>
            <div style={{fontSize:10,fontWeight:tab===t.id?800:600,marginTop:1}}>{t.label}</div>
          </button>
        ))}
      </div>

      {/* MODALES */}
      {modal==="pedido"&&<ModalPedido onSave={p=>setPedidos(prev=>[...prev,p])} onClose={()=>setModal(null)} />}
      {modal==="merma"&&<ModalMerma pedidos={pedidos} onSave={m=>setMermas(prev=>[...prev,m])} onClose={()=>setModal(null)} />}

    </div>
  );
}
