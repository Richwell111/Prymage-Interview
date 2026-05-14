import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    priority: "Low",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [alert, setAlert] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

  // Auto-hide alerts
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [alert])

  const validateForm = () => {
    if (formData.name.length < 2) {
      setAlert({ msg: "Please enter your full name", type: 'error' })
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setAlert({ msg: "Please enter a valid business email", type: 'error' })
      return false
    }
    if (formData.description.length < 10) {
      setAlert({ msg: "Please provide more detail about the issue", type: 'error' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || loading) return

    setLoading(true)
    // "Optimistic" Step: We stay on the page but show a "Sending" notification
    setAlert({ msg: "Initiating secure transmission...", type: 'success' })

    try {
      const response = await fetch(`${API_URL}/api/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setSubmitted(true)
        setAlert(null)
      } else {
        const data = await response.json()
        setAlert({ msg: data.message || "Transmission failed. Please try again.", type: 'error' })
      }
    } catch (error) {
      setAlert({ msg: "Connection unstable. Check your network.", type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-6 flex justify-center bg-[#f7f9fb] min-h-screen w-full animate-in fade-in duration-700">
        <div className="w-full max-w-md text-center bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
            <span className="material-symbols-outlined text-green-500 text-6xl animate-bounce">verified</span>
          </div>
          <h2 className="text-4xl font-serif text-[#070235] mb-4">Transmission Successful</h2>
          <p className="text-gray-400 mb-10 leading-relaxed text-sm">Your support request has been logged. A confirmation email has been dispatched to <span className="text-[#070235] font-bold">{formData.email}</span>.</p>
          <button 
            onClick={() => { setSubmitted(false); setFormData({name:"", email:"", title:"", description:"", priority: "Low"}) }}
            className="w-full bg-[#070235] text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#1E1B4B] transition-all"
          >
            Submit New Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-40 pb-20 px-6 bg-[#f7f9fb] min-h-screen w-full relative">
      {/* Alert Overlay */}
      {alert && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-top duration-300 flex items-center gap-3 border ${alert.type === 'success' ? 'bg-[#070235] text-white border-[#D4AF37]' : 'bg-red-50 text-red-600 border-red-100'}`}>
           <span className="material-symbols-outlined text-sm">{alert.type === 'success' ? 'sync' : 'error'}</span>
           <span className="text-[10px] font-bold uppercase tracking-widest">{alert.msg}</span>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto flex flex-col items-center">
        <div className="w-full max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/5 px-4 py-2 rounded-full mb-6 border border-[#7C3AED]/10">
            <span className="material-symbols-outlined text-[#7C3AED] text-sm">verified_user</span>
            <span className="text-[#7C3AED] text-[9px] font-black uppercase tracking-widest">Enterprise Support Portal</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-[#070235] mb-6 leading-tight">
            Need <span className="text-[#7C3AED] italic">Assistance?</span>
          </h1>
          <p className="text-[#475569] text-xl max-w-lg mx-auto leading-relaxed">
            Fill out the secure form below. Our support infrastructure is active 24/7.
          </p>
        </div>

        <div className="w-full max-w-2xl bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-gray-200/60 border border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#7C3AED]/5 to-transparent rounded-full -mr-20 -mt-20"></div>
          
          <h2 className="text-3xl font-serif text-[#070235] mb-12 flex items-center gap-3">
            <span className="w-12 h-1 bg-[#D4AF37] rounded-full"></span>
            Report Details
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-[#070235] uppercase tracking-[0.2em] ml-1">Client Identity</label>
                <input 
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 focus:bg-white focus:border-[#7C3AED] outline-none transition-all placeholder:text-gray-300"
                  required 
                  placeholder="Full Name" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  disabled={loading}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-[#070235] uppercase tracking-[0.2em] ml-1">Communications</label>
                <input 
                  className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 focus:bg-white focus:border-[#7C3AED] outline-none transition-all placeholder:text-gray-300"
                  type="email" 
                  required 
                  placeholder="Business Email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-[#070235] uppercase tracking-[0.2em] ml-1">Issue Overview</label>
              <input 
                className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 focus:bg-white focus:border-[#7C3AED] outline-none transition-all placeholder:text-gray-300"
                required 
                placeholder="Brief summary of the issue" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                disabled={loading}
              />
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-[#070235] uppercase tracking-[0.2em] text-center block mb-4">Select Criticality Level</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {['Low', 'Medium', 'High', 'Critical'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({...formData, priority: p})}
                    disabled={loading}
                    className={`py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                      formData.priority === p 
                        ? 'bg-[#070235] text-white border-[#070235] shadow-xl translate-y-[-2px]' 
                        : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-[#070235] uppercase tracking-[0.2em] ml-1">Technical Description</label>
              <textarea 
                className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 focus:bg-white focus:border-[#7C3AED] outline-none transition-all min-h-[160px] resize-none placeholder:text-gray-300"
                required 
                placeholder="Please describe the steps to reproduce the issue..." 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                disabled={loading}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#070235] text-white py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#1E1B4B] hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-0 disabled:opacity-50 transition-all shadow-xl shadow-[#070235]/10"
              disabled={loading}
            >
              {loading ? "Transmitting Data..." : "Finalize Support Ticket"}
            </button>
          </form>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center gap-10 text-gray-400">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">GRA Compliant Encryption</span>
           </div>
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[16px]">language</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">Regional Support Active</span>
           </div>
        </div>
      </div>
    </div>
  )
}
