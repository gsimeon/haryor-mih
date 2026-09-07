import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { ToastContainer } from './components/common/ToastContainer';
import { HomePage } from './components/public/HomePage';
import { QuoteWizardPage } from './components/public/QuoteWizardPage';
import { TrackingPage } from './components/public/TrackingPage';
import { AutoTradePage } from './components/public/AutoTradePage';
import { ServicesPage } from './components/public/ServicesPage';
import { ShippingHubPage } from './components/public/ShippingHubPage';
import { GlobalNetworkPage } from './components/public/GlobalNetworkPage';
import { AboutPage } from './components/public/AboutPage';
import { ResourcesPage } from './components/public/ResourcesPage';
import { ContactPage } from './components/public/ContactPage';
import { CustomerPortal } from './components/portal/CustomerPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AuthPortal } from './components/auth/AuthPortal';
import { MessageSquare } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderRoute = () => {
    if (currentRoute === '/') return <HomePage />;
    if (currentRoute === '/quote') return <QuoteWizardPage />;
    if (currentRoute === '/track') return <TrackingPage />;
    if (currentRoute.startsWith('/autotrade')) return <AutoTradePage />;
    if (currentRoute.startsWith('/services')) return <ServicesPage />;
    if (currentRoute === '/shipping') return <ShippingHubPage />;
    if (currentRoute === '/network' || currentRoute === '/global-network') return <GlobalNetworkPage />;
    if (currentRoute === '/about') return <AboutPage />;
    if (currentRoute === '/resources' || currentRoute === '/faq') return <ResourcesPage />;
    if (currentRoute === '/contact') return <ContactPage />;
    if (currentRoute === '/login' || currentRoute === '/auth') return <AuthPortal defaultRole="OPERATIONS" />;
    if (currentRoute === '/admin/login') return <AuthPortal defaultRole="SUPER_ADMIN" />;
    if (currentRoute === '/ops/login' || currentRoute === '/operations/login') return <AuthPortal defaultRole="OPERATIONS" />;
    if (currentRoute === '/portal/login' || currentRoute === '/client/login') return <AuthPortal defaultRole="CUSTOMER" />;
    if (currentRoute.startsWith('/portal')) return <CustomerPortal />;
    if (currentRoute.startsWith('/admin')) return <AdminDashboard />;
    return <HomePage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-slate-100 selection:bg-[#FF6B00] selection:text-white relative overflow-x-hidden">
      {/* Frosted Glass Ambient Glowing Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] bg-purple-600/25 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed top-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-pink-500/15 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="fixed top-[55%] left-[-5%] w-[40vw] h-[40vw] max-w-[550px] max-h-[550px] bg-indigo-600/20 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-[15%] left-[25%] w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] bg-[#FF6B00]/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{renderRoute()}</main>
        <Footer />
        <MobileBottomBar />
        <ToastContainer />
      </div>

      {/* Floating WhatsApp Quick Action with frosted sheen */}
      <a
        href="https://wa.me/2348032345678?text=Hello%20Haryor-Mih%20Logistics%2C%20I%20would%20like%20to%20inquire%20about%20cargo%20shipping%20and%20rates."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-6 z-40 bg-emerald-500/80 hover:bg-emerald-500 backdrop-blur-xl text-white p-3.5 rounded-full shadow-2xl transition hover:scale-105 flex items-center justify-center border border-white/30"
        title="WhatsApp Cargo Support"
      >
        <MessageSquare className="w-6 h-6" />
      </a>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
