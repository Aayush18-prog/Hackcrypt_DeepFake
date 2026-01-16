import { Eye, Lock, Layers, Zap, Fingerprint, RefreshCcw } from 'lucide-react';

export const Features = () => {
    const features = [
        {
            icon: Eye,
            title: "Deep Facial Forensics",
            description: "Advanced extraction and cropping of facial regions to analyze micro-expressions and inconsistencies."
        },
        {
            icon: Layers,
            title: "Heatmap Overlay",
            description: "Visual authentication showing exactly where the image pixels have been manipulated or warped."
        },
        {
            icon: Lock,
            title: "Ephemeral Privacy",
            description: "Zero data retention. Videos are processed in volatile memory and instantly deleted after analysis."
        },
        {
            icon: Zap,
            title: "Real-time Processing",
            description: "Optimized efficientNet architecture running on edge-ready inference engines for sub-second results."
        },
        {
            icon: Fingerprint,
            title: "Digital Fingerprinting",
            description: "Generate unique hashes for media to track provenance and detect future tampering attempts."
        },
        {
            icon: RefreshCcw,
            title: "Adaptive Learning",
            description: "System continuously updates against new GANs and diffusion models via adversarial training."
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
                        Forensic-Grade Capabilities
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Built for security professionals, journalists, and platforms requiring absolute certainty.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors duration-300">
                                <feature.icon className="w-6 h-6 text-electric-blue group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-100">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
