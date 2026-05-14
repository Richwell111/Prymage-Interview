export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 hero-gradient relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8 border border-white/20">
              <span className="material-symbols-outlined text-[#D4AF37] text-[16px]">verified</span>
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">West Africa's Leading ERP Partner</span>
            </div>
            <h1 className="font-serif text-6xl text-white mb-6 leading-tight">
              ERP & Accounting Software Company in <span className="text-[#D4AF37]">Ghana and Nigeria</span>
            </h1>
            <p className="text-lg text-white/80 mb-12 max-w-lg leading-relaxed">
              Expert implementation of ERPNext, Odoo, Enquest ERP, Tally, and QuickBooks. Streamline operations and scale your business across West Africa with precision-engineered solutions.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-[#D4AF37] text-[#1E1B4B] px-8 py-4 rounded font-bold hover:shadow-lg transition-all flex items-center gap-2">
                Start Free Consultation <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">play_circle</span> Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-6 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
              <div className="bg-[#1e1b4b] p-8 rounded-xl text-center border border-white/5">
                <p className="text-[#D4AF37] text-4xl font-bold mb-1">3.5k+</p>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Successful Projects</p>
              </div>
              <div className="bg-[#1e1b4b] p-8 rounded-xl text-center border border-white/5">
                <p className="text-[#D4AF37] text-4xl font-bold mb-1">18+</p>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="bg-[#1e1b4b] p-8 rounded-xl text-center border border-white/5">
                <p className="text-[#D4AF37] text-4xl font-bold mb-1">8.6k+</p>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Students Trained</p>
              </div>
              <div className="bg-[#1e1b4b] p-8 rounded-xl text-center border border-white/5">
                <p className="text-[#D4AF37] text-4xl font-bold mb-1">45+</p>
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Expert Consultants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto px-16 text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-[#712ae2]/10 text-[#712ae2] px-4 py-1 rounded-full text-xs font-bold uppercase">Our Services</span>
          </div>
          <h2 className="font-serif text-5xl text-[#070235] mb-6">Comprehensive Business <span className="text-[#7C3AED]">Solutions</span></h2>
          <p className="text-[#475569] max-w-2xl mx-auto mb-16 leading-relaxed">End-to-end services to digitize and streamline your business operations with world-class expertise.</p>
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: 'desktop_windows', title: 'ERP Implementation', desc: 'Seamless integration of accounting software tailored to your specific business needs and scale.' },
              { icon: 'settings_input_component', title: 'Integration & Customization', desc: 'Seamless integrations with CRMs, e-commerce, and POS systems plus custom modules for workflows.' },
              { icon: 'support_agent', title: 'Support & Maintenance', desc: 'Dedicated support for queries, troubleshooting, and system maintenance to ensure zero downtime.' },
              { icon: 'auto_awesome', title: 'AI Automation', desc: 'Leverage AI to automate workflows, reduce manual tasks, and boost organizational productivity.', badge: 'NEW' }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#c8c5d0] hover:border-[#7C3AED] transition-all group text-left relative overflow-hidden">
                {s.badge && <span className="absolute top-4 right-4 bg-[#7C3AED] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{s.badge}</span>}
                <div className="w-14 h-14 bg-[#f7f9fb] flex items-center justify-center rounded-xl mb-8 group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                </div>
                <h3 className="font-serif text-2xl text-[#070235] mb-4">{s.title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <button className="border border-[#475569]/30 text-[#070235] px-10 py-4 rounded font-bold hover:border-[#070235] transition-all shadow-sm">
            View All Services
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-16 text-center">
          <div className="flex justify-center mb-4">
            <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-1 rounded-full text-xs font-bold uppercase">Our Products</span>
          </div>
          <h2 className="font-serif text-5xl text-[#070235] mb-6">Software Solutions <span className="text-[#D4AF37]">We Implement</span></h2>
          <p className="text-[#475569] max-w-2xl mx-auto mb-16">Certified partners in leading ERP and accounting platforms globally.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'ERPNext', color: 'text-[#070235]', subtitle: 'Comprehensive ERP', desc: 'Full-featured open source ERP trusted by 10,000+ companies worldwide.', rating: '4.9' },
              { title: 'odoo', color: 'text-[#875A7B]', subtitle: 'Business Management Suite', desc: 'Modular ERP with 82+ integrated apps for growing modern businesses.', rating: '4.8' },
              { title: 'selby.', color: 'text-[#712ae2]', subtitle: 'AI-Native Enterprise ERP', desc: 'Built-in AI in every module, GRA-ready for seamless compliance.', rating: '4.7' },
              { title: 'enquest', color: 'text-[#070235]', subtitle: 'All-In-One Platform', desc: 'Feature-rich ERP for retail, multi-store, and growing medium enterprises.', rating: '4.6' },
              { title: 'TallyPrime', color: 'text-[#0089BA]', subtitle: 'Accounting Giant', desc: 'Trusted by over 2 million businesses globally for financial management.', rating: '4.8' },
              { title: 'QuickBooks', color: 'text-[#2CA01C]', subtitle: 'Small Business Accounting', desc: 'Cloud-based accounting for easy invoicing, expenses, and tax filing.', rating: '4.5' }
            ].map((p, i) => (
              <div key={i} className="p-8 border border-[#c8c5d0] rounded-2xl text-left hover:shadow-xl hover:translate-y-[-4px] transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className={`${p.color} font-bold text-3xl`}>{p.title}</div>
                  <div className="flex items-center gap-1 bg-[#f7f9fb] px-3 py-1.5 rounded-lg border border-[#c8c5d0]">
                    <span className="material-symbols-outlined text-[#D4AF37] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-sm font-bold text-[#070235]">{p.rating}</span>
                  </div>
                </div>
                <h4 className="font-serif text-2xl text-[#070235] mb-3">{p.subtitle}</h4>
                <p className="text-[#475569] text-sm mb-8 leading-relaxed">{p.desc}</p>
                <a className="text-[#7C3AED] font-bold text-sm flex items-center gap-2 group" href="#">
                  Learn more <span className="material-symbols-outlined text-[20px] group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
