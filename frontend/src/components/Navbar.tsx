import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-[#c8c5d0]">
      <div className="max-w-[1280px] mx-auto px-16 flex justify-between items-center h-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-[#070235] rounded flex items-center justify-center text-[#D4AF37] font-bold text-xl shadow-inner">P</div>
          <span className="font-serif text-2xl font-bold text-[#070235] tracking-tight">PRYMAGE</span>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <a className="text-sm font-bold text-[#070235] hover:text-[#7C3AED] transition-colors" href="/">Home</a>
          <a className="text-sm font-bold text-[#475569] hover:text-[#7C3AED] transition-colors" href="/#services">Services</a>
          <a className="text-sm font-bold text-[#475569] hover:text-[#7C3AED] transition-colors" href="/#products">Products</a>
          <a className="text-sm font-bold text-[#475569] hover:text-[#7C3AED] transition-colors" href="/support">Support</a>
        </nav>
        <div className="flex gap-4 items-center">
          {isLoggedIn ? (
            <>
              <button 
                onClick={() => navigate("/dashboard")}
                className="text-sm font-bold text-[#712ae2] hover:underline"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-6 py-2 rounded-lg text-xs font-bold hover:bg-red-100 transition-all border border-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate("/login")}
              className="bg-[#070235] text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-[#1E1B4B] transition-all shadow-lg shadow-[#070235]/10"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
