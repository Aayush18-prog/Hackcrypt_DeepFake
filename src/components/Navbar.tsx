import { ShieldCheck } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div className="bg-security-green/10 p-2 rounded-lg">
                            <ShieldCheck className="h-6 w-6 text-security-green" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            DeepGuard <span className="text-security-green">AI</span>
                        </span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a href="#demo" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Live Demo</a>
                            <a href="#architecture" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Architecture</a>
                            <a href="#features" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
                            <button className="bg-security-green hover:bg-green-500 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                                Launch App
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
