import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem("token", data.accessToken)
        localStorage.setItem("role", data.role)
        localStorage.setItem("userId", data.userId)
        
        if (data.role === "admin" || data.role === "staff") {
          navigate("/dashboard")
        } else {
          navigate("/")
        }
      } else {
        setError(data.message || "Invalid credentials")
      }
    } catch (err) {
      setError("Failed to connect to the server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-16 px-6 bg-[#f7f9fb] min-h-screen flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl border border-white">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#070235] text-[#D4AF37] rounded-2xl flex items-center justify-center text-3xl font-serif font-bold mx-auto mb-6 shadow-xl">P</div>
          <h1 className="text-4xl font-serif text-[#070235] mb-3">Control Center</h1>
          <p className="text-[#475569] text-sm font-medium">Global Authentication Service</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-bold mb-8 border border-red-100 flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">warning</span>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#070235] uppercase tracking-widest ml-1">Corporate Email</label>
            <input 
              className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all"
              type="email"
              required 
              placeholder="e.g. admin@prymage.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-[#070235] uppercase tracking-widest ml-1">Password</label>
            <input 
              className="w-full bg-[#f8fafc] border border-gray-100 rounded-2xl p-5 focus:bg-white focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/5 outline-none transition-all"
              type="password"
              required 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#070235] text-white py-5 rounded-2xl font-bold hover:bg-[#1E1B4B] disabled:opacity-50 transition-all shadow-xl shadow-[#070235]/20 uppercase tracking-widest text-[10px]"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-gray-50 text-center">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest cursor-help hover:text-[#070235] transition-colors">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  )
}
