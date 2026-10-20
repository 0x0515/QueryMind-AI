import { useState, useEffect } from "react";
import { NavLink, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Activity, ArrowDownRight, ArrowUpRight, BarChart3, Bell, BookOpen,
  Check, ChevronDown, CircleHelp, Database, FileText, Gauge, LayoutDashboard,
  Link2, LockKeyhole, LogOut, MessageSquare, Plus, Search, Send, Settings,
  ShieldCheck, Sparkles, Table2, WandSparkles, Zap
} from "lucide-react";

const recentQueries = [
  { question: "Which product categories generated the most revenue this quarter?", time: "12 min ago", type: "Sales analysis", status: "Completed" },
  { question: "Show inventory items below the reorder threshold", time: "Yesterday", type: "Inventory", status: "Completed" },
  { question: "Compare weekly sales across distribution centers", time: "Oct 16, 2026", type: "Performance", status: "Completed" },
];

function Brand() {
  return <div className="brand"><div className="brand-mark"><Sparkles size={19} /></div><div><strong>QUERYMIND<span> AI</span></strong><small>Business intelligence, reimagined</small></div></div>;
}

function Sidebar() {
  return <aside className="sidebar">
    <Brand />
    <div className="workspace"><div className="workspace-icon">N</div><div className="workspace-text"><strong>Ninja Workspace</strong><small>Business account</small></div><ChevronDown size={15} /></div>
    <div className="nav-label">WORKSPACE</div>
    <nav className="nav-links">
      <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><LayoutDashboard size={18}/> Overview</NavLink>
      <NavLink to="/chat" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><MessageSquare size={18}/> AI Analyst <span className="nav-new">NEW</span></NavLink>
      <NavLink to="/data-sources" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Database size={18}/> Data sources</NavLink>
      <a className="nav-link" href="#reports" onClick={(e)=>e.preventDefault()}><FileText size={18}/> Reports</a>
    </nav>
    <div className="nav-label nav-label-spaced">PREFERENCES</div>
    <nav className="nav-links">
      <NavLink to="/settings" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Settings size={18}/> Settings</NavLink>
      <a className="nav-link" href="#help" onClick={(e)=>e.preventDefault()}><CircleHelp size={18}/> Help center</a>
    </nav>
    <div className="sidebar-bottom">
      <div className="upgrade-card"><div className="upgrade-icon"><Zap size={16}/></div><strong>Unlock more insights</strong><p>Explore advanced analytics for your team.</p><button className="upgrade-btn" onClick={()=>alert("Demo only — plans will be added later.")}>Explore plans <ArrowUpRight size={14}/></button></div>
      <div className="user-profile"><div className="avatar">HA</div><div className="user-copy"><strong>Hassan Al-Hamed</strong><small>Workspace admin</small></div><button className="icon-btn" title="Sign out" onClick={()=>window.location.href="/login"}><LogOut size={16}/></button></div>
    </div>
  </aside>;
}

function Topbar({title, subtitle}) {
  return <header className="topbar"><div className="mobile-brand"><Brand/></div><div className="top-title"><div className="breadcrumb">Workspace <span>/</span> <b>{title}</b></div>{subtitle && <div className="top-subtitle">{subtitle}</div>}</div><div className="top-actions"><button className="search-box" onClick={()=>window.location.href="/chat"}><Search size={15}/><span>Ask or search...</span><kbd>⌘ K</kbd></button><button className="icon-btn notification" title="Notifications"><Bell size={18}/><i/></button><div className="top-avatar">HA</div></div></header>;
}

function Shell({title, subtitle, children}) {
  return <div className="app-shell"><Sidebar/><main className="main-area"><Topbar title={title} subtitle={subtitle}/><div className="page-content">{children}</div></main></div>;
}

function StatCard({label,value,change,icon:Icon,positive=true}) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={18}/></div></div><div className="stat-value">{value}</div><div className={positive ? "stat-change positive" : "stat-change neutral"}>{positive ? <ArrowUpRight size={14}/> : <Activity size={14}/>} {change}</div></div>;
}


  
function Dashboard() {
  const navigate = useNavigate();

  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboards() {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/dashboards"
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        setDashboards(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboards");
      } finally {
        setLoading(false);
      }
    }

    loadDashboards();
  }, []);

  return (
    <Shell title="Overview" subtitle="Here's what's happening with your workspace.">
      <section className="panel">
  <h2>Dashboards from FastAPI</h2>

  {loading && <p>Loading dashboards...</p>}

  {error && <p role="alert">Error: {error}</p>}

  {!loading && !error && dashboards.map((dashboard) => (
    <div key={dashboard.id}>
      <h3>{dashboard.title}</h3>
      <p>Visualization: {dashboard.visualization}</p>
      <p>Records: {dashboard.data.length}</p>
    </div>
  ))}
</section>
    </Shell>
  );
}
 
function SourceRow({letter,color,name,meta,status}) { return <div className="source-row"><div className={`source-logo ${color}`}>{letter}</div><div className="source-details"><strong>{name}</strong><small>{meta}</small></div><span className="connected"><i/>{status}</span></div>; }

function Chat() {
  const [messages,setMessages] = useState([{role:"assistant",text:"Hi Hassan! I'm your AI data analyst. Ask a question about your business, and I'll help you explore the numbers.",time:"Just now"}]);
  const [input,setInput] = useState("");
  const [sent,setSent] = useState(false);
  const send = (value=input) => {
    const clean=value.trim(); if(!clean) return;
    setMessages(m=>[...m,{role:"user",text:clean,time:"Just now"}]);
    setInput(""); setSent(true);
    setTimeout(()=>setMessages(m=>[...m,{role:"assistant",text:"This is a frontend preview, so I haven't queried a real database yet. Once we connect FastAPI, this area will show the verified answer, data table, and optional visualization.",time:"Just now"}]),350);
  };
  return <Shell title="AI Analyst" subtitle="Ask questions in plain English. Get answers from your business data.">
    <div className="chat-layout"><section className="chat-main panel"><div className="chat-head"><div className="chat-agent"><div className="agent-icon"><Sparkles size={19}/></div><div><strong>QueryMind Analyst</strong><small><span className="live-dot"/> Preview mode · No database connected</small></div></div><button className="icon-btn" title="New conversation" onClick={()=>{setMessages([{role:"assistant",text:"New conversation started. What would you like to know about your business?",time:"Just now"}]);setSent(false)}}><Plus size={18}/></button></div><div className="chat-messages">{messages.map((m,i)=><div className={`message ${m.role}`} key={i}><div className={m.role==="assistant"?"message-avatar":"message-user-avatar"}>{m.role==="assistant"?<Sparkles size={15}/>: "HA"}</div><div className="message-body"><div className="message-name">{m.role==="assistant"?"QueryMind AI":"You"} <span>{m.time}</span></div><div className="message-bubble">{m.text}</div>{m.role==="assistant" && i===0 && <div className="suggestion-list"><span>Try asking</span>{["What were our top-selling products?","Summarize inventory levels","Compare sales this month vs last month"].map(s=><button key={s} onClick={()=>send(s)}>{s}<ArrowUpRight size={13}/></button>)}</div>}</div></div>)}</div><div className="chat-composer"><div className="composer-tools"><span><WandSparkles size={14}/> Ask a business question</span><span className="mock-tag">MOCK RESPONSE</span></div><form onSubmit={e=>{e.preventDefault();send()}}><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder="e.g. What were our total sales last month?" rows="2"/><div className="composer-bottom"><span>AI can make mistakes. Verify important business decisions.</span><button className="send-btn" type="submit" disabled={!input.trim()}><Send size={15}/> Send</button></div></form></div></section><aside className="chat-side"><div className="panel side-card"><div className="side-card-title"><Zap size={17}/><h3>How it works</h3></div><div className="steps"><div className="step"><div>1</div><span><strong>Ask naturally</strong><small>Use everyday language to ask a business question.</small></span></div><div className="step"><div>2</div><span><strong>AI analyzes</strong><small>The backend will generate and validate a query.</small></span></div><div className="step"><div>3</div><span><strong>Get insights</strong><small>See an answer with data and visualizations.</small></span></div></div></div><div className="panel side-card"><div className="side-card-title"><Database size={17}/><h3>Data context</h3></div><p className="muted small-copy">No live sources are connected in this prototype.</p><button className="outline-btn full-btn" onClick={()=>window.location.href="/data-sources"}><Link2 size={15}/> Connect a source</button></div><div className="privacy-note"><LockKeyhole size={16}/><div><strong>Designed for business data</strong><p>When connected, database credentials and query permissions should be handled securely by the backend.</p></div></div></aside></div>
  </Shell>;
}

function Auth({mode="login"}) {
  const [showPassword,setShowPassword] = useState(false);
  const navigate=useNavigate();
  const isRegister=mode==="register";
  return <div className="auth-page"><div className="auth-top"><Brand/><a href="/dashboard" className="back-link">Back to preview <ArrowUpRight size={14}/></a></div><div className="auth-center"><div className="auth-card"><div className="auth-badge"><Sparkles size={19}/></div><div className="auth-heading"><h1>{isRegister?"Create your workspace":"Welcome back"}</h1><p>{isRegister?"Start turning your business data into insights.":"Sign in to continue to your intelligence hub."}</p></div><button className="sso-btn" onClick={()=>alert("SSO will be implemented in a future backend step.")}><span className="google-mark">G</span> Continue with Google</button><div className="or-divider"><span/>or continue with email<span/></div><form onSubmit={e=>{e.preventDefault();alert("Demo only: authentication is not connected to FastAPI yet.");}} className="auth-form">{isRegister&&<label>Full name<input type="text" placeholder="Your name" required/></label>}<label>Work email<input type="email" placeholder="you@company.com" required/></label><label>Password<div className="password-input"><input type={showPassword?"text":"password"} placeholder="Enter your password" required minLength="6"/><button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?"Hide":"Show"}</button></div></label>{!isRegister&&<div className="auth-options"><label className="remember"><input type="checkbox"/> Remember me</label><a href="#forgot" onClick={e=>{e.preventDefault();alert("Password reset will be implemented later.")}}>Forgot password?</a></div>}<button className="primary-btn auth-submit" type="submit">{isRegister?"Create account":"Sign in"} <ArrowUpRight size={16}/></button></form><div className="auth-switch">{isRegister?"Already have an account?":"Don't have an account?"} <button onClick={()=>navigate(isRegister?"/login":"/register")}>{isRegister?"Sign in":"Create account"}</button></div></div><div className="auth-foot"><ShieldCheck size={14}/> Secure access to your business intelligence</div></div><div className="auth-decoration deco-one"/><div className="auth-decoration deco-two"/></div>;
}

function DataSources() {
  const [showForm,setShowForm]=useState(false);
  const [dbType,setDbType]=useState("PostgreSQL");
  return <Shell title="Data sources" subtitle="Manage the systems QUERYMIND AI can use to answer your questions."><div className="page-intro"><div><h1>Your data, connected.</h1><p className="muted">Connect a database or business tool to start asking questions about your data.</p></div><button className="primary-btn" onClick={()=>setShowForm(!showForm)}><Plus size={17}/> Add data source</button></div>{showForm&&<div className="panel connection-form"><div className="panel-heading"><div><h2>Connect a source</h2><p>Prototype form — connection is not performed.</p></div><button className="icon-btn" onClick={()=>setShowForm(false)}>×</button></div><label>Source type<select value={dbType} onChange={e=>setDbType(e.target.value)}><option>PostgreSQL</option><option>MySQL</option><option>SQL Server</option><option>CSV file</option></select></label><div className="form-grid"><label>Connection name<input placeholder="e.g. Production database"/></label><label>{dbType==="CSV file"?"File path":"Host"}<input placeholder={dbType==="CSV file"?"Choose a file later":"db.company.com"}/></label><label>{dbType==="CSV file"?"—":"Port"}<input placeholder={dbType==="PostgreSQL"?"5432":"Port number"} disabled={dbType==="CSV file"}/></label><label>{dbType==="CSV file"?"—":"Database name"}<input placeholder="Database name" disabled={dbType==="CSV file"}/></label></div><p className="security-hint"><LockKeyhole size={14}/> Do not put real passwords or credentials in this demo form. We'll handle secrets securely on the backend.</p><button className="primary-btn" onClick={()=>alert("Demo only. Next step: create a secure FastAPI connection endpoint.")}><Link2 size={16}/> Test connection</button></div>}<div className="source-summary"><div className="summary-icon"><Database size={21}/></div><div><strong>4 sample connections</strong><p>These are illustrative entries for the UI preview, not live connections.</p></div><span className="status-pill"><i/> Preview only</span></div><div className="source-cards"><ConnectionCard letter="P" color="pg" title="PostgreSQL" subtitle="Production database" detail="Last sync: 8 minutes ago" tables="24 tables"/><ConnectionCard letter="S" color="sf" title="Salesforce" subtitle="Customer relationships" detail="Last sync: 8 minutes ago" tables="12 objects"/><ConnectionCard letter="E" color="ex" title="Excel Online" subtitle="Operations workbooks" detail="Last sync: Yesterday" tables="3 workbooks"/><ConnectionCard letter="W" color="wh" title="Warehouse DB" subtitle="Inventory & logistics" detail="Last sync: 1 hour ago" tables="18 tables"/></div></Shell>;
}
function ConnectionCard({letter,color,title,subtitle,detail,tables}) {return <div className="panel connection-card"><div className="connection-card-top"><div className={`source-logo large ${color}`}>{letter}</div><span className="connected"><i/> Connected (demo)</span></div><h3>{title}</h3><p className="muted">{subtitle}</p><div className="connection-meta"><span><Table2 size={14}/>{tables}</span><span>{detail}</span></div><div className="connection-actions"><button className="outline-btn" onClick={()=>alert("Connection details will be available after backend integration.")}>View details</button><button className="icon-btn" title="More options" onClick={()=>alert("More actions will be added later.")}>···</button></div></div>}

function SettingsPage() {
  const [name,setName]=useState("Hassan Al-Hamed");
  const [email,setEmail]=useState("hassan@company.com");
  const [saved,setSaved]=useState(false);
  return <Shell title="Settings" subtitle="Manage your profile and workspace preferences."><div className="page-intro"><div><h1>Settings</h1><p className="muted">A place for your profile, workspace and future security preferences.</p></div></div><div className="settings-layout"><aside className="panel settings-nav"><button className="settings-tab active"><Settings size={16}/> Profile</button><button className="settings-tab" onClick={()=>alert("Workspace settings will be added later.")}><Gauge size={16}/> Workspace</button><button className="settings-tab" onClick={()=>alert("Security settings will be added later.")}><ShieldCheck size={16}/> Security</button></aside><section className="panel settings-panel"><div className="panel-heading"><div><h2>Profile information</h2><p>Update the details associated with your account.</p></div></div><div className="profile-edit"><div className="profile-large">HA</div><div><strong>Profile photo</strong><p className="muted small-copy">Image uploads will be supported later.</p><button className="outline-btn" onClick={()=>alert("Profile photo upload is not implemented.")}>Change photo</button></div></div><form className="settings-form" onSubmit={e=>{e.preventDefault();setSaved(true);setTimeout(()=>setSaved(false),2500)}}><label>Full name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Workspace role<input value="Workspace admin" disabled/></label><div className="settings-save"><span className="muted small-copy">{saved&&<><Check size={14}/> Demo changes saved locally for this screen.</>}</span><button className="primary-btn" type="submit">Save changes</button></div></form></section></div></Shell>;
}

function NotFound(){return <Shell title="Not found"><div className="empty-state"><div className="auth-badge"><Search size={20}/></div><h1>Page not found</h1><p className="muted">This page isn't part of the current preview.</p><a className="primary-btn" href="/dashboard">Back to dashboard</a></div></Shell>}

export default function App() {
  const location=useLocation();
  if(location.pathname==="/login") return <Auth mode="login"/>;
  if(location.pathname==="/register") return <Auth mode="register"/>;
  return <Routes><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/chat" element={<Chat/>}/><Route path="/data-sources" element={<DataSources/>}/><Route path="/settings" element={<SettingsPage/>}/><Route path="*" element={<NotFound/>}/></Routes>;
}