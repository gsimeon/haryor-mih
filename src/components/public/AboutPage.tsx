import React, { useState } from 'react';
import {
  ShieldCheck,
  Target,
  Award,
  Globe2,
  Download,
  Users,
  Building,
  CheckCircle2,
  FileText,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <div id="about-page" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">
            Corporate Profile &amp; Governance
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            ABOUT HARYOR-MIH LOGISTICS
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
            Haryor-Mih International Logistics Services Ltd. is a premier multimodal freight forwarding, customs brokerage, and automobile import enterprise headquartered in Lagos, Nigeria with operations in the United Kingdom and United States.
          </p>
        </div>

        {/* Mission, Vision & Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white/[0.06] backdrop-blur-2xl p-8 rounded-3xl border border-white/15 shadow-2xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Montserrat']">Our Mission</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              To deliver seamless, transparent, and technology-driven global freight forwarding, customs clearance, and automobile logistics solutions that empower African businesses and global shippers to trade without borders.
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-2xl p-8 rounded-3xl border border-white/15 shadow-2xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Montserrat']">Our Vision</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              To be the most reliable and trusted international logistics and automotive trade bridge connecting West Africa to the United Kingdom, North America, Europe, and Asia through operational excellence.
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-2xl p-8 rounded-3xl border border-white/15 shadow-2xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Montserrat']">Core Values</h3>
            <ul className="text-xs text-white/70 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong className="text-white">Integrity &amp; Compliance:</strong> Strict adherence to statutory customs laws.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong className="text-white">Speed &amp; Reliability:</strong> Guaranteed flight and vessel schedules.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong className="text-white">Transparency:</strong> No hidden port charges or surprise fees.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate History & Executive Statement */}
        <div className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl border border-white/15 p-8 sm:p-12 mb-14 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
              Leadership &amp; Operational Heritage
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Montserrat']">
              Delivering Excellence in Global Multimodal Logistics
            </h2>
            <p className="text-xs text-white/70 leading-relaxed">
              Founded with the singular purpose of eliminating friction in international freight to and from Nigeria, Haryor-Mih has evolved into an end-to-end supply chain operator. From small air parcels to 40ft high cube factory containers and luxury automobile RoRo shipping, our operations integrate customs brokerage, bonded terminal clearance, and nationwide haulage.
            </p>
            <p className="text-xs text-white/70 leading-relaxed">
              Our direct presence in London, combined with key port partnerships in the United States and China, enables us to offer door-to-door oversight that general freight brokers cannot match.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setShowProfileModal(true)}
                className="px-6 py-3 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <FileText className="w-4 h-4 text-orange-400" />
                View Company Profile
              </button>
              <button
                onClick={() => navigateTo('/quote')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                Request Quotation
              </button>
            </div>
          </div>

          <div className="bg-white/[0.04] p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4 backdrop-blur-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Accreditations &amp; Institutional Governance
            </h3>
            <div className="space-y-3 text-xs text-white/80">
              <div className="p-3 bg-white/[0.05] rounded-xl border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Nigeria Customs Service (NCS):</strong> Licensed customs clearing agent authorized for Apapa, Tin Can, PTML, and Murtala Muhammed Airport.
                </div>
              </div>

              <div className="p-3 bg-white/[0.05] rounded-xl border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Corporate Affairs Commission (CAC):</strong> Duly incorporated under the Companies and Allied Matters Act, Federal Republic of Nigeria.
                </div>
              </div>

              <div className="p-3 bg-white/[0.05] rounded-xl border border-white/10 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Port Health &amp; Regulatory Agencies:</strong> Full registration with Nigerian Ports Authority (NPA), CRFFN, and regulatory bodies.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPANY PROFILE MODAL */}
        {showProfileModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-950/90 backdrop-blur-2xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-white/15 relative text-left text-white">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">
                Official Corporate Dossier
              </div>
              <h2 className="text-2xl font-extrabold text-white font-['Montserrat']">
                Haryor-Mih International Logistics Services Ltd.
              </h2>
              <p className="text-xs text-white/50 font-mono mt-1">
                Incorporation: Federal Republic of Nigeria • RC Registered
              </p>

              <div className="my-6 space-y-4 text-xs text-white/80 leading-relaxed">
                <div className="p-4 bg-white/[0.05] rounded-xl border border-white/10 backdrop-blur-md">
                  <strong className="text-white">Operating Divisions:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-white/70">
                    <li>Air Freight Priority (LHR / US &rarr; LOS Cargo)</li>
                    <li>Ocean Freight FCL &amp; LCL (Apapa &amp; Tin Can Island Terminals)</li>
                    <li>Licensed Customs Brokerage (Form M &amp; PAAR Issuance)</li>
                    <li>AutoTrade Division (Copart/Manheim Vehicle Imports &amp; Luxury Showroom)</li>
                    <li>Interstate Fleet Haulage &amp; Warehouse Evacuation</li>
                  </ul>
                </div>

                <div className="p-4 bg-white/[0.05] rounded-xl border border-white/10 backdrop-blur-md">
                  <strong className="text-white">Operating Facilities:</strong>
                  <p className="mt-1 text-white/70">
                    Lagos Corporate Office &amp; Terminal: 14 Commercial Avenue, Apapa / Aviation Cargo Way, Ikeja, Lagos State.
                    <br />
                    UK Consolidation Desk: Unit 7 Heathrow Cargo Way &amp; Tilbury Docks, United Kingdom.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    alert('Official corporate PDF summary generated and ready for print.');
                    window.print();
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
                >
                  <Download className="w-4 h-4" />
                  Print / Download Dossier
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="px-6 py-3 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer backdrop-blur-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
