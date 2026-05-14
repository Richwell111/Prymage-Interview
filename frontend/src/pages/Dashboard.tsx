import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Ticket = {
  _id: string
  title: string
  status: string
  priority: string
  createdAt: string
}

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 })
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  const userRole = localStorage.getItem("role")
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/api/tickets`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) navigate("/login")
        return
      }
      const data = await res.json()
      setStats({
        total: data.length,
        open: data.filter((t: any) => t.status === "Open").length,
        resolved: data.filter((t: any) => t.status === "Resolved").length
      })
      setRecentTickets(data.slice(0, 5))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="pt-32 text-center font-serif text-gray-300 italic">Synchronizing Secure Session...</div>

  return (
    <div className="pt-32 pb-16 px-6 md:px-16 bg-[#f7f9fb] min-h-screen">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <h1 className="text-4xl text-[#070235] font-serif font-bold">Control Center</h1>
               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${userRole === 'admin' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'}`}>
                  {userRole} Access
               </span>
            </div>
            <p className="text-gray-400 text-sm font-medium">Monitoring West Africa's Digital Infrastructure</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
             <p className="text-xs text-[#070235] font-black">SYSTEM STATUS: <span className="text-green-500 animate-pulse">ACTIVE</span></p>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white">
            <div className="flex justify-between items-start mb-4">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Volume</p>
               <span className="material-symbols-outlined text-gray-200">database</span>
            </div>
            <p className="text-5xl font-bold text-[#070235] mb-6">{stats.total}</p>
            <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
               <div className="bg-[#070235] h-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white">
            <div className="flex justify-between items-start mb-4">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Urgent / Pending</p>
               <span className="material-symbols-outlined text-blue-200">warning</span>
            </div>
            <p className="text-5xl font-bold text-blue-600 mb-6">{stats.open}</p>
            <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
               <div className="bg-blue-600 h-full" style={{ width: `${(stats.open/stats.total)*100}%` }}></div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white">
            <div className="flex justify-between items-start mb-4">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Efficiency</p>
               <span className="material-symbols-outlined text-green-200">bolt</span>
            </div>
            <p className="text-5xl font-bold text-green-600 mb-6">{Math.round((stats.resolved / stats.total) * 100) || 0}%</p>
            <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
               <div className="bg-green-600 h-full" style={{ width: `${(stats.resolved/stats.total)*100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Main Area */}
          <div className="lg:col-span-3 bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-serif text-[#070235] mb-1">Queue Overview</h3>
                <p className="text-xs text-gray-400 font-medium">Real-time support stream</p>
              </div>
              <button onClick={() => navigate("/admin")} className="bg-[#f8fafc] text-[#7C3AED] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#7C3AED] hover:text-white transition-all">Expand View</button>
            </div>
            <div className="space-y-6">
              {recentTickets.map(ticket => (
                <div key={ticket._id} className="group flex justify-between items-center p-6 bg-[#f8fafc] hover:bg-white hover:shadow-lg rounded-2xl border border-transparent hover:border-gray-100 transition-all cursor-pointer" onClick={() => navigate("/admin")}>
                  <div className="flex gap-4 items-center">
                    <div className={`w-2 h-10 rounded-full ${ticket.priority === 'Critical' ? 'bg-red-500' : 'bg-[#070235]'}`}></div>
                    <div>
                      <p className="text-sm font-bold text-[#070235] group-hover:text-[#7C3AED] transition-colors">{ticket.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">{new Date(ticket.createdAt).toLocaleDateString()} • {ticket.priority}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Open' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                    {ticket.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Role Based Sidebar */}
          <div className="lg:col-span-2 space-y-8">
             {userRole === 'admin' ? (
                <div className="bg-[#070235] p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden h-full min-h-[400px]">
                   <div className="relative z-10 h-full flex flex-col">
                      <h3 className="text-3xl font-serif mb-4">Admin Hub</h3>
                      <p className="text-white/50 text-sm mb-12 leading-relaxed">Executive oversight and systems configuration. Manage teams and analyze throughput.</p>
                      <div className="space-y-4 flex-grow">
                         <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Active Staff</p>
                            <p className="text-2xl font-bold">Manage Roles</p>
                         </div>
                         <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Security Audit</p>
                            <p className="text-2xl font-bold">View Logs</p>
                         </div>
                      </div>
                      <button onClick={() => navigate("/admin")} className="w-full bg-[#D4AF37] text-[#070235] py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all">Go to Team Console</button>
                   </div>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                </div>
             ) : (
                <div className="bg-gradient-to-br from-[#7C3AED] to-[#5a21b3] p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden h-full min-h-[400px]">
                   <div className="relative z-10 h-full flex flex-col">
                      <h3 className="text-3xl font-serif mb-4">Staff Desk</h3>
                      <p className="text-white/50 text-sm mb-12 leading-relaxed">Focus on resolution efficiency and customer satisfaction. Your active backlog is prioritized below.</p>
                      <div className="space-y-4 flex-grow">
                         <div className="p-5 bg-black/10 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-bold text-purple-200 uppercase tracking-widest mb-1">My Performance</p>
                            <p className="text-2xl font-bold">98% Positive</p>
                         </div>
                         <div className="p-5 bg-black/10 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-bold text-purple-200 uppercase tracking-widest mb-1">Avg Response</p>
                            <p className="text-2xl font-bold">2.4 Hours</p>
                         </div>
                      </div>
                      <button onClick={() => navigate("/admin")} className="w-full bg-white text-[#7C3AED] py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">Open Desk</button>
                   </div>
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
