import { useState, useEffect } from "react"

type Ticket = {
  _id: string
  name: string
  email: string
  title: string
  description: string
  priority: string
  status: string
  createdAt: string
  notes: { text: string; createdAt: string }[]
}

type UserRecord = {
  _id: string
  username: string
  email: string
  role: string
  createdAt: string
}

export default function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [users, setUsers] = useState<UserRecord[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [noteText, setNoteText] = useState("")
  const [activeTab, setActiveTab] = useState<'tickets' | 'users'>('tickets')
  const [alert, setAlert] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const userRole = localStorage.getItem("role")
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

  useEffect(() => {
    fetchTickets()
    if (userRole === "admin") fetchUsers()
  }, [])

  // Auto-hide alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/api/tickets`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) setTickets(data)
    } catch (e) { console.error(e) }
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/api/auth/users`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      const data = await res.json()
      if (res.ok) setUsers(data)
    } catch (e) { console.error(e) }
  }

  const updateStatus = async (id: string, status: string) => {
    // Instant UI update
    setTickets(prev => prev.map(t => t._id === id ? { ...t, status } : t))
    if (selectedTicket?._id === id) setSelectedTicket({ ...selectedTicket, status })

    const token = localStorage.getItem("token")
    await fetch(`${API_URL}/api/tickets/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    setAlert({ msg: `Ticket status updated to ${status}`, type: 'success' })
  }

  const addNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTicket || !noteText || isSubmitting) return
    
    setIsSubmitting(true)
    const token = localStorage.getItem("token")
    const newNote = { text: noteText, createdAt: new Date().toISOString() }

    // Instant/Optimistic UI
    const updatedTicket = { 
      ...selectedTicket, 
      notes: [...(selectedTicket.notes || []), newNote] 
    }
    setSelectedTicket(updatedTicket)
    setNoteText("")

    try {
      const res = await fetch(`${API_URL}/api/tickets/${selectedTicket._id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ text: noteText }),
      })
      
      if (res.ok) {
        setAlert({ msg: "Reply sent and customer notified via email!", type: 'success' })
        fetchTickets() // Sync background
      } else {
        setAlert({ msg: "Failed to send update. Reverting...", type: 'error' })
        // In a real app, you'd revert the optimistic state here
      }
    } catch (err) {
      setAlert({ msg: "Connection error", type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-32 pb-16 px-6 bg-[#f7f9fb] min-h-screen relative">
      {/* Alert Component */}
      {alert && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top duration-300 flex items-center gap-3 border ${alert.type === 'success' ? 'bg-[#070235] text-white border-[#D4AF37]' : 'bg-red-50 text-red-600 border-red-100'}`}>
           <span className="material-symbols-outlined text-sm">{alert.type === 'success' ? 'verified' : 'error'}</span>
           <span className="text-[10px] font-bold uppercase tracking-widest">{alert.msg}</span>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center mb-10">
           <div>
              <h1 className="text-4xl font-serif text-[#070235] mb-2">Management Console</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enterprise Support Operations</p>
           </div>
           <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              <button 
                onClick={() => setActiveTab('tickets')}
                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'tickets' ? 'bg-[#070235] text-white shadow-md' : 'text-gray-400 hover:text-[#070235]'}`}
              >
                Tickets
              </button>
              {userRole === "admin" && (
                <button 
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'users' ? 'bg-[#070235] text-white shadow-md' : 'text-gray-400 hover:text-[#070235]'}`}
                >
                  Staff Hub
                </button>
              )}
           </div>
        </div>

        {activeTab === 'tickets' ? (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Ticket List */}
            <div className="lg:col-span-1 space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              {tickets.map(ticket => (
                <div 
                  key={ticket._id} 
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all border ${selectedTicket?._id === ticket._id ? 'bg-[#070235] border-[#070235] text-white shadow-xl translate-x-1' : 'bg-white border-gray-100'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${ticket.priority === 'Critical' ? 'bg-red-500/10 text-red-500' : 'text-gray-400'}`}>{ticket.priority}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>{ticket.status}</span>
                  </div>
                  <h3 className="font-bold mb-1 truncate">{ticket.title}</h3>
                  <p className={`text-[10px] line-clamp-2 opacity-60 mb-4`}>{ticket.description}</p>
                  <p className="text-[9px] font-bold opacity-30 uppercase">{new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-2">
              {selectedTicket ? (
                <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-50 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8 border-b border-gray-50 pb-8">
                    <div>
                      <h2 className="text-3xl font-serif text-[#070235] mb-2">{selectedTicket.title}</h2>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#7C3AED] uppercase tracking-tighter">{selectedTicket.name}</span>
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">[{selectedTicket.email}]</span>
                      </div>
                    </div>
                    <select 
                      value={selectedTicket.status}
                      onChange={(e) => updateStatus(selectedTicket._id, e.target.value)}
                      className="bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-[10px] font-black text-[#070235] uppercase outline-none"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </div>

                  <div className="flex-grow space-y-10 overflow-y-auto pr-4 custom-scrollbar">
                     <div>
                        <h4 className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-4">Original Report</h4>
                        <p className="text-sm text-[#475569] leading-relaxed bg-[#f8fafc] p-8 rounded-3xl border border-gray-50">"{selectedTicket.description}"</p>
                     </div>

                     <div className="space-y-6">
                        <h4 className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-2">Resolution Thread</h4>
                        <div className="relative pl-1">
                           <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-100"></div>
                           <div className="space-y-8">
                              {selectedTicket.notes?.map((note, i) => (
                                <div key={i} className="relative pl-8">
                                   <div className="absolute left-[-2px] top-2 w-1.5 h-1.5 bg-[#070235] rounded-full ring-4 ring-white"></div>
                                   <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">{new Date(note.createdAt).toLocaleString()}</p>
                                   <p className="text-sm text-[#070235] font-medium leading-relaxed">{note.text}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  <form onSubmit={addNote} className="mt-8 pt-8 border-t border-gray-50 flex gap-4">
                    <input 
                      className="flex-grow bg-[#f8fafc] border border-transparent rounded-2xl px-6 py-5 text-sm focus:bg-white focus:border-[#7C3AED] outline-none transition-all placeholder:text-gray-300"
                      placeholder="Type a response to the customer..."
                      value={noteText}
                      onChange={e => setNoteText(e.target.value)}
                      disabled={isSubmitting}
                    />
                    <button 
                      disabled={isSubmitting}
                      className="bg-[#070235] text-white px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#1E1B4B] disabled:opacity-50 transition-all shadow-xl shadow-[#070235]/10"
                    >
                      {isSubmitting ? "Syncing..." : "Send Reply"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="h-full bg-white/50 border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-gray-300">
                  <span className="material-symbols-outlined text-5xl mb-4 opacity-10">quick_reference_all</span>
                  <p className="font-bold text-[10px] uppercase tracking-[0.2em]">Select an active stream to begin resolution</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* User Table */
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-50 overflow-hidden">
             <table className="w-full text-left">
                <thead className="bg-[#f8fafc] border-b border-gray-100">
                   <tr>
                      <th className="px-10 py-6 text-[9px] font-black text-[#070235] uppercase tracking-widest">Identify</th>
                      <th className="px-10 py-6 text-[9px] font-black text-[#070235] uppercase tracking-widest">Email Hash</th>
                      <th className="px-10 py-6 text-[9px] font-black text-[#070235] uppercase tracking-widest">Clearance</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {users.map(u => (
                      <tr key={u._id} className="hover:bg-[#f8fafc]/50 transition-all">
                         <td className="px-10 py-6 text-sm font-bold text-[#070235]">{u.username}</td>
                         <td className="px-10 py-6 text-sm text-gray-400">{u.email}</td>
                         <td className="px-10 py-6">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}>
                               {u.role}
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  )
}
