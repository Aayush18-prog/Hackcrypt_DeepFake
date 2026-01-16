import { Github, Twitter } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-slate-400 text-sm">
                    © 2024 DeepGuard AI. Built for the Hackathon.
                </div>

                <div className="flex items-center gap-6">
                    <span className="text-slate-500 text-xs font-mono">
                        POWERED BY PYTORCH
                    </span>
                    <div className="flex gap-4">
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-slate-400 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
