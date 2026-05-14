export default function Footer() {
  return (
    <footer className="bg-[#070235] pt-16 pb-8 text-white">
      <div className="max-w-[1280px] mx-auto px-16 grid md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#070235] font-bold text-lg">P</div>
            <span className="font-serif text-2xl font-bold text-[#D4AF37] block">PRYMAGE</span>
          </div>
          <p className="text-sm text-white/50 mb-6 leading-relaxed">West Africa's leading ERP and accounting software implementation partner. Empowering businesses with world-class technology solutions.</p>
          <div className="flex gap-4">
             {/* Social links */}
          </div>
        </div>
        <div>
          <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Products</h5>
          <ul className="space-y-3">
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">ERPNext</a></li>
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">Odoo</a></li>
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">Tally Prime</a></li>
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">QuickBooks</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Services</h5>
          <ul className="space-y-3">
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">Training</a></li>
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">Custom Development</a></li>
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">AI Automation</a></li>
            <li><a className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm" href="#">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Newsletter</h5>
          <p className="text-sm text-white/50 mb-4">Stay updated with latest ERP trends in West Africa.</p>
          <form className="flex gap-2">
            <input className="bg-white/10 border-none rounded p-3 flex-1 text-white placeholder:text-white/20 text-sm focus:ring-1 focus:ring-[#D4AF37] outline-none" placeholder="Email" type="email"/>
            <button className="bg-[#D4AF37] text-[#070235] p-3 rounded font-bold hover:scale-105 transition-all">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-16 mt-16 pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center text-[10px] text-white/30 gap-4 uppercase tracking-widest font-bold">
        <p>© 2024 Prymage Consultancy Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
