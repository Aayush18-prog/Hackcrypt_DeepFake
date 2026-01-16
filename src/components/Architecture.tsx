import { Smartphone, Server, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Architecture = () => {
    return (
        <section id="architecture" className="py-24 bg-slate-900/20 border-y border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">System Architecture</h2>
                    <p className="text-slate-400">Secure, Scalable High-Performance Pipeline</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
                    {/* Animated Connecting Lines (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-electric-blue to-transparent opacity-20 animate-pulse"></div>
                    </div>

                    {[
                        {
                            title: "Client Layer",
                            icon: Smartphone,
                            tech: "React + Vite",
                            desc: "Responsive web interface and secure media upload handling.",
                            step: "01"
                        },
                        {
                            title: "Secure Gateway",
                            icon: Server,
                            tech: "FastAPI / Python",
                            desc: "Request validation, rate limiting, and task orchestration.",
                            step: "02"
                        },
                        {
                            title: "Inference Engine",
                            icon: Cpu,
                            tech: "PyTorch + CUDA",
                            desc: "EfficientNet-B4 model processing video frames in parallel.",
                            step: "03"
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-slate-950 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center z-10 hover:border-electric-blue/50 transition-colors duration-300"
                            whileHover={{ y: -5 }}
                        >
                            <div className="absolute -top-4 bg-slate-900 px-3 py-1 rounded-full text-xs font-mono text-electric-blue border border-slate-700">
                                STEP {item.step}
                            </div>

                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl ring-1 ring-slate-800">
                                <item.icon className="w-10 h-10 text-slate-300" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <div className="text-electric-blue font-mono text-sm mb-4">{item.tech}</div>
                            <p className="text-slate-400 text-sm">{item.desc}</p>

                            {index < 2 && (
                                <div className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-slate-600">
                                    <ArrowRight className="w-6 h-6 rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
