import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Building,
  CheckCircle2,
  Send,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactPage: React.FC = () => {
  const { createLead } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Air Freight Priority');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    createLead({
      name,
      email,
      phone,
      serviceInterest: service,
      source: 'WEBSITE_CONTACT_FORM',
      notes: message,
    });

    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="bg-transparent min-h-screen py-12 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold text-orange-400 tracking-widest uppercase mb-1">
            24/7 International Desk &amp; Consignment Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Montserrat']">
            CONTACT HARYOR-MIH
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-3 leading-relaxed">
            Have questions regarding cargo bookings, container schedules, or vehicle sourcing? Our dedicated logistics officers in Lagos and London are ready to assist.
          </p>
        </div>

        {/* Office Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Lagos HQ */}
          <div className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl p-8 border border-white/15 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                Corporate Headquarters &amp; Bonded Ops
              </div>
              <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded">
                Open Now
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
              Lagos Commercial Operations Hub
            </h2>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  Plot 14 Commercial Avenue, Apapa Maritime District / Ikeja Aviation Cargo Corridor, Lagos State, Nigeria
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-mono font-medium text-white/90">+234 (0) 803 234 5678 / +234 1 888 4422</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>info@haryor-mihlogistics.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Monday – Friday: 08:00 – 18:00 WAT | Sat: 09:00 – 14:00 WAT</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/2348032345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-600/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Lagos Desk on WhatsApp
              </a>
            </div>
          </div>

          {/* London Hub */}
          <div className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl p-8 border border-white/15 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                United Kingdom Receiving Hub
              </div>
              <span className="text-[10px] bg-sky-500/20 border border-sky-500/30 text-sky-400 font-bold px-2 py-0.5 rounded">
                Open Now
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white font-['Montserrat']">
              London Consolidation &amp; Depot
            </h2>
            <div className="space-y-3 text-xs text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  Unit 7, Heathrow Cargo Way, London Airport Logistics Park &amp; Tilbury Maritime Gateways, United Kingdom
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-mono font-medium text-white/90">+44 (0) 20 7946 0912</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>ukdesk@haryor-mihlogistics.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Monday – Friday: 08:30 – 17:30 GMT</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/2348032345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-white text-xs font-bold rounded-xl transition cursor-pointer backdrop-blur-md"
              >
                <Mail className="w-4 h-4" />
                Email UK Export Desk
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white/[0.06] backdrop-blur-2xl rounded-3xl border border-white/15 p-8 sm:p-12 shadow-2xl max-w-3xl mx-auto text-white">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                INQUIRY LOGGED SUCCESSFULLY
              </h2>
              <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{name}</strong>. Your inquiry has been routed to our commercial desk. A duty specialist will reach out to you via WhatsApp or email promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-xl cursor-pointer shadow-lg shadow-orange-500/20"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white font-['Montserrat']">
                  Send an Inquiry or Schedule a Cargo Assessment
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  Fill out the form below. For immediate shipping rate quotes, please use our interactive Quote Wizard.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                    Your Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kenneth Okeke"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. k.okeke@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                    Phone / WhatsApp <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +234 803 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                    Service of Interest
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500/50"
                  >
                    <option value="Air Freight Priority" className="bg-slate-900 text-white">Air Freight Priority</option>
                    <option value="Ocean Freight (FCL Container)" className="bg-slate-900 text-white">Ocean Freight (FCL Container)</option>
                    <option value="Ocean Freight (LCL Consolidation)" className="bg-slate-900 text-white">Ocean Freight (LCL Consolidation)</option>
                    <option value="Customs Brokerage & PAAR" className="bg-slate-900 text-white">Customs Brokerage &amp; PAAR</option>
                    <option value="AutoTrade & Vehicle RoRo" className="bg-slate-900 text-white">AutoTrade &amp; Vehicle RoRo</option>
                    <option value="International Household Relocation" className="bg-slate-900 text-white">International Household Relocation</option>
                    <option value="Interstate Road Haulage" className="bg-slate-900 text-white">Interstate Road Haulage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/70 uppercase mb-1">
                  Inquiry Message or Cargo Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide any details regarding cargo origin, destination, volume, or specific questions."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 backdrop-blur-md"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Dispatch Message to Operations Desk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
