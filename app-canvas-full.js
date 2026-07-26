import React, { useEffect, useRef, useState } from 'react';

// --- COMPOSANTS DE BASE UI ---
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[ 0 ].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      },
      { threshold: 0.1 } 
    );
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const MagneticWrapper = ({ children, multiplier = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * multiplier; 
    const y = (clientY - (top + height / 2)) * multiplier; 
    setPosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`, 
        transition: isHovered 
          ? 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)' 
          : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' 
      }}
      className="inline-block relative z-50"
    >
      {children}
    </div>
  );
};

const ScrollSpy = ({ isDarkMode }) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.3 });

    ['research', 'experience', 'curriculum', 'publications', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden xl:flex">
      {['research', 'experience', 'curriculum', 'publications', 'contact'].map(id => (
        <a 
          key={id} 
          href={`#${id}`} 
          className="relative group flex items-center justify-end"
          aria-label={`Go to ${id}`}
        >
          <span className={`absolute right-4 px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-gray-500 shadow-sm border border-gray-100'}`}>
            {id}
          </span>
          <div className={`w-1.5 rounded-full transition-all duration-300 ${
            activeSection === id 
              ? (isDarkMode ? 'h-6 bg-indigo-500' : 'h-6 bg-[#243bb5]') 
              : (isDarkMode ? 'h-1.5 bg-slate-700 hover:bg-slate-500' : 'h-1.5 bg-gray-300 hover:bg-gray-400')
          }`} />
        </a>
      ))}
    </div>
  );
};

const TechMarquee = ({ isDarkMode }) => {
  const skills = [
    "Deep Learning", "Generative Modeling", "Multi-Omics", "PyTorch", 
    "Diffusion Models", "Federated Learning", "Transformers", "Medical Imaging", 
    "Computer Vision", "Radiomics"
  ];
  const displaySkills = [...skills, ...skills, ...skills]; 

  return (
    <div className={`w-full py-4 overflow-hidden border-y pointer-events-none relative z-10 ${isDarkMode ? 'bg-slate-900/30 border-slate-800/50' : 'bg-[#f8f9fc]/50 border-gray-200/50'}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        {displaySkills.map((skill, index) => (
          <span key={index} className={`mx-8 text-[11px] font-bold uppercase tracking-widest font-mono ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// --- RÉSEAU DE NEURONES (AVEC MAPPING BIDIRECTIONNEL) ---
const MLPArchitecture = ({ isDarkMode, activeInputs, activeOutputs }) => {
  const inputYs = [ 24, 80, 136, 192, 248 ]; 
  const outputYs = [ 52, 108, 164, 220 ];  

  const mlpXs = [ 35, 45, 55, 65 ];
  const mlpYs = [
    [ 104, 120, 136, 152, 168 ], 
    [ 80, 94, 108, 122, 136, 150, 164, 178, 192 ], 
    [ 80, 94, 108, 122, 136, 150, 164, 178, 192 ], 
    [ 112, 128, 144, 160 ] 
  ];

  const baseColor = isDarkMode ? "rgba(99, 102, 241, 0.45)" : "rgba(36, 59, 181, 0.35)";
  const fadedColor = isDarkMode ? "rgba(99, 102, 241, 0.05)" : "rgba(36, 59, 181, 0.05)";
  const highlightColor = isDarkMode ? "rgba(129, 140, 248, 0.9)" : "rgba(36, 59, 181, 0.8)";
  
  const isNetworkActive = activeInputs.length > 0;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block h-[272px] w-full">
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 272" preserveAspectRatio="none">
        
        {/* Entrées */}
        {inputYs.map((y, i) => {
          const isActive = activeInputs.includes(i);
          const isFaded = isNetworkActive && !isActive;
          return (
            <path 
              key={`min-${i}`} 
              d={`M 0,${y} C 17.5,${y} 17.5,${mlpYs[ 0 ][ i ]} 35,${mlpYs[ 0 ][ i ]}`} 
              fill="none" 
              stroke={isActive ? highlightColor : (isFaded ? fadedColor : baseColor)} 
              vectorEffect="non-scaling-stroke" 
              strokeWidth={isActive ? "2" : "1.5"}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Sorties */}
        {outputYs.map((y, i) => {
          const isActive = activeOutputs.includes(i);
          const isFaded = isNetworkActive && !isActive;
          return (
            <path 
              key={`mout-${i}`} 
              d={`M 65,${mlpYs[ 3 ][ i ]} C 82.5,${mlpYs[ 3 ][ i ]} 82.5,${y} 100,${y}`} 
              fill="none" 
              stroke={isActive ? highlightColor : (isFaded ? fadedColor : baseColor)} 
              vectorEffect="non-scaling-stroke" 
              strokeWidth={isActive ? "2" : "1.5"}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Synapses internes */}
        {mlpYs.map((layer, lIdx) => {
          if (lIdx === mlpYs.length - 1) return null;
          const nextLayer = mlpYs[ lIdx + 1 ];
          return layer.map((y1, nIdx) => (
            nextLayer.map((y2, nnIdx) => {
              // Highlight path logic
              let isActivePath = false;
              if (isNetworkActive) {
                if (lIdx === 0 && activeInputs.includes(nIdx)) isActivePath = true;
                if (lIdx === 1 && (nIdx % 2 === 0 || nnIdx % 2 === 0)) isActivePath = true; // Pseudo-flow
                if (lIdx === 2 && activeOutputs.includes(nnIdx)) isActivePath = true;
              }

              const strokeOpacity = isActivePath 
                ? (isDarkMode ? "rgba(129, 140, 248, 0.4)" : "rgba(36, 59, 181, 0.4)") 
                : (isNetworkActive ? fadedColor : (isDarkMode ? "rgba(99, 102, 241, 0.15)" : "rgba(36, 59, 181, 0.12)"));

              return (
                <line 
                  key={`mlink-${lIdx}-${nIdx}-${nnIdx}`}
                  x1={mlpXs[ lIdx ]} y1={y1} x2={mlpXs[ lIdx + 1 ]} y2={y2}
                  stroke={strokeOpacity} 
                  strokeWidth={isActivePath ? "1.5" : "1"}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-300"
                />
              );
            })
          ));
        })}
      </svg>

      {/* Neurones */}
      {mlpYs.map((layer, lIdx) => (
        layer.map((y, nIdx) => {
          let isNodeActive = false;
          if (isNetworkActive) {
            if (lIdx === 0 && activeInputs.includes(nIdx)) isNodeActive = true;
            if (lIdx === 3 && activeOutputs.includes(nIdx)) isNodeActive = true;
            if (lIdx === 1 || lIdx === 2) isNodeActive = true;
          }

          const nodeClass = isNodeActive
            ? (isDarkMode ? 'bg-indigo-400 border-indigo-300 shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-[#243bb5] border-[#1d2f91]')
            : (isDarkMode ? 'bg-slate-900 border-indigo-400' : 'bg-white border-[#243bb5]');

          return (
            <div
              key={`mnode-${lIdx}-${nIdx}`}
              className={`absolute w-[5px] h-[5px] rounded-full shadow-sm border transition-all duration-300 ${nodeClass}`}
              style={{ left: `${mlpXs[ lIdx ]}%`, top: `${y}px`, transform: 'translate(-50%, -50%)' }}
            />
          );
        })
      ))}
    </div>
  );
};

export default function App() {
  const canvasRef = useRef(null);
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // États de l'Accordion des publications
  const [expandedPub, setExpandedPub] = useState(null);

  // État du filtre de pub (Prêt mais commenté dans le rendu)
  const [activePubFilter, setActivePubFilter] = useState('ALL');

  // États de l'interaction Réseau
  const [hoveredData, setHoveredData] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);

  // Mapping Bidirectionnel
  const dataToTasks = {
    0: [0, 1, 2, 3], // Medical Images -> All
    1: [0, 2],       // Radiomics -> Synth, Harmo
    2: [0],          // Clinical Notes -> Synth
    3: [1, 3],       // Genomics -> Seg, Spatiotemporal
    4: [0, 3]        // Demographics -> Synth, Spatiotemporal
  };

  const tasksToData = {
    0: [0, 1, 2, 4], // Synth <- Images, Radio, Notes, Demographics
    1: [0, 3],       // Seg <- Images, Genomics
    2: [0, 1],       // Harmo <- Images, Radio
    3: [0, 3, 4]     // Spatiotemporal <- Images, Genomics, Demographics
  };

  let activeInputs = [];
  let activeOutputs = [];

  if (hoveredData !== null) {
    activeInputs = [hoveredData];
    activeOutputs = dataToTasks[hoveredData];
  } else if (hoveredTask !== null) {
    activeOutputs = [hoveredTask];
    activeInputs = tasksToData[hoveredTask];
  }

  // Formulaire
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const tags = ["computer vision", "medical imaging", "generative modeling", "PET and MRI imaging"];
  const [currentTagIndex, setCurrentTagIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTagIndex((prevIndex) => (prevIndex + 1) % tags.length), 3500);
    return () => clearInterval(intervalId);
  }, [tags.length]);

  // ANIMATION DU CANVAS (Fixée pour le bug de l'accordéon)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight; // Toujours basé sur la fenêtre, pas sur le document
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX; 
      mouse.y = event.clientY;
    };
    
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x; let dy = mouse.y - this.y; let distance = Math.hypot(dx, dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += (dx / distance) * force * -2; this.y += (dy / distance) * force * -2;
          }
        }
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDarkMode ? 'rgba(165, 180, 252, 0.4)' : 'rgba(150, 150, 150, 0.4)'; ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = Math.hypot(particles[ a ].x - particles[ b ].x, particles[ a ].y - particles[ b ].y);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode ? `rgba(99, 102, 241, ${(1 - (distance / 150)) * 0.25})` : `rgba(36, 59, 181, ${(1 - (distance / 150)) * 0.3})`;
            ctx.lineWidth = 1; ctx.moveTo(particles[ a ].x, particles[ a ].y); ctx.lineTo(particles[ b ].x, particles[ b ].y); ctx.stroke();
          }
        }
        if (mouse.x != null && mouse.y != null) {
          let mouseDist = Math.hypot(particles[ a ].x - mouse.x, particles[ a ].y - mouse.y);
          if (mouseDist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode ? `rgba(129, 140, 248, ${(1 - (mouseDist / 180)) * 0.7})` : `rgba(138, 180, 255, ${(1 - (mouseDist / 180)) * 0.8})`; 
            ctx.lineWidth = 1.5; ctx.moveTo(particles[ a ].x, particles[ a ].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isParticlesEnabled) {
        particles.forEach(p => { p.update(); p.draw(); }); connectParticles();
        if (mouse.x != null && mouse.y != null) {
          ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode ? 'rgba(129, 140, 248, 0.9)' : 'rgba(138, 180, 255, 0.9)';
          ctx.shadowBlur = 15; ctx.shadowColor = isDarkMode ? 'rgba(129, 140, 248, 1)' : 'rgba(138, 180, 255, 1)';
          ctx.fill(); ctx.shadowBlur = 0; 
        }
      }
      animationFrameId = window.requestAnimationFrame(animate);
    };

    // On n'écoute plus le body (qui changeait avec l'accordéon), mais uniquement le resize de la fenêtre
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas(); initParticles(); animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId); 
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove); 
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isParticlesEnabled, isDarkMode]); 

  const publicationsData = [
    {
      date: "UPCOMING (2026)",
      title: "PseudoEARL-Net: a deep learning-based harmonization tool for retrospective EARL harmonization of multicenter FDG PET/CT",
      authors: "A. Kebaili, T. Carlier, A. Girard, A. Devillers, O. Humbert, S. Hapdey, C. Boucherie, F. Orlhac, P. Decazes",
      status: "ORAL PRESENTATION",
      venue: "EANM 2026",
      category: "IMAGING",
      abstract: "Aim/Introduction: EARL harmonization from raw PET data is critical for multicenter quantitative [18F]FDG PET/CT. We investigated whether non-harmonized standard PET images could be retrospectively standardized into EARL-compliant reconstructions through a data-efficient deep learning framework.\n\nMaterials and Methods: We developed a U-Net-based residual image-to-image translation framework (PseudoEARL-Net) that predicts a voxel-wise Δ-map between standard PET and EARL-reconstructed images. A log-SUV normalization was applied to improve recovery. We employed a 2D-to-3D patch-based strategy to preserve fine local textural details. The model was trained on a multicenter dataset from 3 sites.\n\nResults: Pseudo-EARL images demonstrated high fidelity to ground truth across all cohorts. Radiomic reproducibility for lesions was excellent, with global CCC [95% CI] of 0.987 to 0.997 depending on the cohort. Relative Bland-Altman biases for lesion features were negligible.\n\nConclusion: Our PseudoEARL-Net model enables robust high-fidelity pseudo-EARL translation from routine [18F]FDG PET/CT scans, supporting radiomic reproducibility and the inclusion of historical non-compliant datasets in multicenter nuclear medicine studies.",
      noLink: true
    },
    {
      date: "MAY 2026",
      title: "Multi-task diffusion approach for prediction of glioma tumor progression",
      authors: "A. Kebaili, R. Modzelewski, J. Lapuyade-Lahorgue, M. Fontanilles, S. Thureau, S. Ruan",
      status: "ARXIV",
      venue: "arXiv",
      category: "GENERATIVE",
      abstract: "We propose a multi-task diffusion architecture dedicated to the spatio-temporal prediction of glioma progression. This model jointly generates future FLAIR sequences and probabilistic evolution maps based on Signed Distance Fields (SDF), integrating uncertainty quantification. Evaluated on both public datasets and a private internal cohort, the approach confirms strong inter-center robustness.",
      link: "#"
    },
    {
      date: "2025",
      title: "Multi-modal MRI synthesis with conditional latent diffusion models for data augmentation in tumor segmentation",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "CMIG",
      category: "IMAGING",
      abstract: "This paper extends latent diffusion models to multi-modal frameworks, simultaneously generating multiple MRI sequences and associated masks while allowing condition-based tumor characteristics. The model produces coherent multi-modal datasets that significantly enhance downstream multi-sequence segmentation tasks on BRATS.",
      link: "#"
    },
    {
      date: "2025",
      title: "AMM-diff: Adaptive multi-modality diffusion network for missing modality imputation",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "ISBI 2025",
      category: "IMAGING",
      abstract: "We propose AMM-Diff, a solution for missing MRI modality imputation from any available combination using an Image-Frequency Fusion Network (IFFN). The method adopts an adaptive reconstruction strategy to produce complete and coherent modalities, providing robust segmentation performance even under incomplete acquisitions.",
      link: "#"
    },
    {
      date: "2024",
      title: "Discriminative hamiltonian variational autoencoder for accurate tumor segmentation in data-scarce regimes",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "Neurocomputing",
      category: "OMICS",
      abstract: "We present an HVAE with discriminative regularization designed to focus generation on relevant regions of interest. By integrating Hamiltonian dynamics for better latent space exploration, the model generates artifact-free image/mask pairs that improve Dice scores in data-scarce segmentation regimes.",
      link: "#"
    },
    {
      date: "2024",
      title: "3D MRI synthesis with slice-based latent diffusion models: Improving tumor segmentation tasks in data-scarce regimes",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "ISBI 2024",
      category: "GENERATIVE",
      abstract: "This work introduces a slice-by-slice latent diffusion model to jointly synthesize 3D MRI volumes and tumor masks. It drastically reduces memory and computational cost while preserving volumetric consistency, making it suitable for resource-constrained environments.",
      link: "#"
    },
    {
      date: "2023",
      title: "Deep learning approaches for data augmentation in medical imaging: a review",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, S. Ruan",
      status: "295+ CITATIONS",
      venue: "J. of Imaging",
      category: "IMAGING",
      abstract: "This review critically synthesizes and compares major generative model families (VAEs, GANs, diffusion models) applied to medical imaging data augmentation. We highlight trade-offs between visual quality, sample diversity, and computational cost, proposing practical clinical recommendations.",
      link: "#"
    },
    {
      date: "2023",
      title: "End-to-end autoencoding architecture for the simultaneous generation of medical images and corresponding segmentation mask",
      authors: "A. Kebaili, J. Lapuyade-Lahorgue, P. Vera, S. Ruan",
      status: "PUBLISHED",
      venue: "MICAD 2023",
      category: "OMICS",
      abstract: "We propose an end-to-end architecture based on a Hamiltonian VAE reinforced by attention modules and residual blocks to directly learn the joint image-mask distribution. Experiments on BRATS/HECKTOR show improved supervised segmentation training through realistic pair synthesis.",
      link: "#"
    }
  ];

  const filteredPublications = activePubFilter === 'ALL' 
    ? publicationsData 
    : publicationsData.filter(pub => pub.category === activePubFilter);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const emailSubject = encodeURIComponent(`[Portfolio] ${contactSubject}`);
    const emailBody = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\nSubject: ${contactSubject}\n\nMessage:\n${contactMessage}`);
    setTimeout(() => {
      setIsSubmitting(false); setSubmitSuccess(true);
      window.location.href = `mailto:aghiles.kebaili.1998@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      setContactName(''); setContactEmail(''); setContactSubject(''); setContactMessage('');
    }, 1000);
  };

  const borderDividerClass = isDarkMode ? 'border-slate-800/50' : 'border-gray-200/60';

  return (
    <div className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden flex flex-col ${isDarkMode ? 'bg-[#090D16] text-slate-100' : 'bg-[#fafafa] text-gray-900'}`} style={{ fontFamily: "'Inter', sans-serif", scrollBehavior: 'smooth' }}>
      
      <style>
        {`
          html { scroll-behavior: smooth; }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
          
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-33.33%); } }
          .animate-marquee { animation: marquee 30s linear infinite; }

          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)'}; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: ${isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.2)'}; }
        `}
      </style>

      {/* Sommaire Dynamique */}
      <ScrollSpy isDarkMode={isDarkMode} />

      {/* Backgrounds */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div className={`fixed top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-0 pointer-events-none transition-all duration-1000 ${isDarkMode ? 'bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.03)_0%,_rgba(9,13,22,0)_70%)]' : 'bg-[radial-gradient(circle_at_center,_rgba(36,59,181,0.04)_0%,_rgba(250,250,250,0)_70%)]'}`}></div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-40 h-32 flex items-start pt-6 px-8 md:px-16 pointer-events-none">
        <div className={`absolute inset-0 backdrop-blur-sm transition-colors duration-500 ${isDarkMode ? 'bg-[#090D16]/20' : 'bg-white/20'}`} style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)' }}></div>
        <div className="relative z-10 flex items-center justify-between w-full pointer-events-auto">
          <div className="w-24"></div>
          <nav className="hidden lg:flex space-x-8">
            {['Research', 'Experience', 'Curriculum', 'Publications', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${isDarkMode ? 'text-slate-400 hover:text-indigo-400' : 'text-gray-500 hover:text-[#243bb5]'}`}>{item}</a>
            ))}
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsDarkMode(!isDarkMode)}>
              <span className={`text-[10px] font-semibold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-600'}`}>Nightly</span>
              <div className={`w-9 h-5 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => setIsParticlesEnabled(!isParticlesEnabled)}>
              <span className={`text-[10px] font-semibold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-gray-400 group-hover:text-gray-600'}`}>Network</span>
              <div className={`w-9 h-5 rounded-full p-1 transition-colors duration-300 ${isParticlesEnabled ? (isDarkMode ? 'bg-indigo-600' : 'bg-[#243bb5]') : 'bg-gray-300'}`}>
                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isParticlesEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 pb-10 pt-32 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto" style={{ fontFamily: "'Germalt Alt Light', 'Germalt Alt', 'Manrope', sans-serif", fontWeight: 300 }}>
          <h2 className={`text-lg md:text-xl text-gray-500 mb-2 transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>Hey, I'm</h2>
          <h1 className={`text-4xl md:text-5xl lg:text-[3.2rem] font-light tracking-tight mb-5 leading-none transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>Aghiles Kebaili</h1>
          <p className={`text-sm md:text-base mb-8 leading-relaxed transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
            I'm a machine learning and artificial intelligence research engineer specialized in deep learning and computer vision models applied to medical imaging. Currently working on a federated medical imaging research project at <a href="https://www.becquerel.fr" className={`font-semibold hover:underline transition-colors duration-300 ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Henri Becquerel Cancer Center</a>.
            <br /><br />
            <span className="inline-flex items-center">
              Specialized in{' '}
              <span className="relative inline-flex items-center w-[280px] h-[1.5em] ml-1.5 overflow-hidden align-bottom">
                {tags.map((tag, index) => {
                  let positionClass = "translate-y-full opacity-0 blur-sm scale-95";
                  if (index === currentTagIndex) positionClass = "translate-y-0 opacity-100 blur-none scale-100";
                  else if (index === (currentTagIndex - 1 + tags.length) % tags.length) positionClass = "-translate-y-full opacity-0 blur-sm scale-105";
                  return <span key={tag} className={`absolute left-0 font-semibold whitespace-nowrap transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${positionClass} ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>{tag}</span>;
                })}
              </span>
            </span>
          </p>

          <div className={`flex flex-wrap gap-4 items-center transform transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-[400ms] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <MagneticWrapper multiplier={0.15}>
              <button 
                onClick={() => document.getElementById('research').scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-3 text-sm font-semibold tracking-wide text-white rounded-lg transition-all duration-300 flex items-center gap-2 group ${
                  isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_8px_20px_-4px_rgba(99,102,241,0.4)]' : 'bg-[#243bb5] hover:bg-[#1d2f91] hover:shadow-[0_8px_20px_-4px_rgba(36,59,181,0.4)]'
                }`}
              >
                See Research
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </MagneticWrapper>
            
            <MagneticWrapper multiplier={0.15}>
              <a href="https://linkedin.com/in/aghiles-kebaili" target="_blank" rel="noopener noreferrer" className={`inline-block px-8 py-3 text-sm font-medium tracking-wide border rounded-lg transition-all duration-300 ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-indigo-400/50 hover:text-indigo-400 hover:bg-slate-900' : 'bg-white/60 border-gray-200 text-gray-600 hover:border-[#243bb5]/50 hover:text-[#243bb5] hover:bg-white hover:shadow-[0_8px_20px_-4px_rgba(36,59,181,0.15)]'
              }`}>LinkedIn</a>
            </MagneticWrapper>

            <MagneticWrapper multiplier={0.15}>
              <a href="https://github.com/Arksyd96" target="_blank" rel="noopener noreferrer" className={`inline-block px-8 py-3 text-sm font-medium tracking-wide border rounded-lg transition-all duration-300 ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-indigo-400/50 hover:text-indigo-400 hover:bg-slate-900' : 'bg-white/60 border-gray-200 text-gray-600 hover:border-[#243bb5]/50 hover:text-[#243bb5] hover:bg-white hover:shadow-[0_8px_20px_-4px_rgba(36,59,181,0.15)]'
              }`}>GitHub</a>
            </MagneticWrapper>
          </div>
        </div>
      </main>

      <TechMarquee isDarkMode={isDarkMode} />

      {/* --- SECTION RESEARCH FOCUS --- */}
      <section id="research" className={`relative z-10 w-full px-4 py-20 pointer-events-none flex justify-center border-b ${borderDividerClass}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
        <div className="w-full max-w-[950px] pointer-events-auto">
          <ScrollReveal delay={0}>
            <div className="mb-8 text-center lg:text-left">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light mb-2 leading-tight tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                Designing multimodal foundation models for clinical decision support.
              </h2>
              <p className="text-gray-500 text-sm max-w-xl">
                Developing end-to-end architectures to monitor patient state and disease evolution by fusing Deep Learning, Generative AI, and Multi-Omics representations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={`relative w-full border rounded-3xl overflow-hidden transition-colors duration-500 ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]' : 'bg-white/70 border-gray-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]'
            }`}>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[200px_1fr_250px] gap-6 p-6 min-h-[300px]">
                
                {/* --- COLONNE 1 : DATA EXPERTISE --- */}
                <div className="flex flex-col z-10 justify-start">
                  <div className="mb-3 h-[24px]">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-[#243bb5]'}`} />
                      <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Data Expertise</h4>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 h-[272px]">
                    {[
                      { title: "Medical Images", sub: "MRI, PET, CT", icon: "🩻" },
                      { title: "Radiomics", sub: "High-throughput", icon: "🎯" },
                      { title: "Clinical Notes", sub: "EHR, History", icon: "📋" },
                      { title: "Genomics", sub: "DNA, Proteomics", icon: "🧬" },
                      { title: "Demographics", sub: "Lifestyle, Context", icon: "👤" }
                    ].map((item, i) => {
                      const isActiveData = activeInputs.includes(i);
                      const isNetworkActive = activeInputs.length > 0;
                      const isFadedData = isNetworkActive && !isActiveData;
                      
                      return (
                        <div 
                          key={i} 
                          onMouseEnter={() => setHoveredData(i)}
                          onMouseLeave={() => setHoveredData(null)}
                          className={`relative flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 h-[48px] ${
                            isActiveData 
                              ? (isDarkMode ? 'bg-indigo-950/60 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'bg-[#eceef8] border border-[#d3d8f3] shadow-sm') 
                              : (isFadedData ? 'opacity-40 border-transparent' : (isDarkMode ? 'bg-slate-950/20 border-transparent' : 'bg-[#f8f9fc]/50 border-transparent'))
                          }`}
                        >
                          <div className="text-sm">{item.icon}</div>
                          <div>
                            <h5 className={`text-[12px] font-semibold leading-tight ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>{item.title}</h5>
                            <p className="text-[9px] text-gray-500 font-medium leading-tight" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{item.sub}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* --- COLONNE 2 : ARCHITECTURE MLP --- */}
                <div className="relative flex flex-col z-0 w-full">
                  <div className="mb-3 h-[24px] flex items-center justify-center z-20">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-[#243bb5]'}`} />
                      <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Foundation Architectures</h4>
                    </div>
                  </div>
                  <div className="relative flex-grow w-full min-h-[272px]">
                    <MLPArchitecture isDarkMode={isDarkMode} activeInputs={activeInputs} activeOutputs={activeOutputs} />
                  </div>
                </div>

                {/* --- COLONNE 3 : CLINICAL TASKS --- */}
                <div className="flex flex-col z-10 justify-start">
                  <div className="mb-3 h-[24px]">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-[#243bb5]'}`} />
                      <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>Clinical Applications</h4>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-2 h-[272px]">
                    {[
                      { title: "Multimodal Synthesis", sub: "MRI to PET translation", icon: "🔄" },
                      { title: "Tumor Segmentation", sub: "Lesion delineation", icon: "🎯" },
                      { title: "Multicentric Harmonization", sub: "Site normalization", icon: "🌍" },
                      { title: "Spatiotemporal Forecasting", sub: "Evolution prediction", icon: "⏳" }
                    ].map((task, i) => {
                      const isActiveTask = activeOutputs.includes(i);
                      const isNetworkActive = activeInputs.length > 0;
                      const isFadedTask = isNetworkActive && !isActiveTask;

                      return (
                        <div 
                          key={i} 
                          onMouseEnter={() => setHoveredTask(i)}
                          onMouseLeave={() => setHoveredTask(null)}
                          className={`relative flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-300 h-[48px] ${
                            isActiveTask
                              ? (isDarkMode ? 'bg-indigo-950/60 border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 'bg-[#eceef8] border border-[#d3d8f3] shadow-sm')
                              : (isFadedTask ? 'opacity-40 border-transparent' : (isDarkMode ? 'bg-slate-950/20 border-transparent' : 'bg-[#f8f9fc]/50 border-transparent'))
                          }`}
                        >
                          <div className="text-sm">{task.icon}</div>
                          <div>
                            <h5 className={`text-[12px] font-semibold leading-tight ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>{task.title}</h5>
                            <p className="text-[9px] text-gray-500 font-medium leading-tight" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{task.sub}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- SECTION EXPERIENCES --- */}
      <section id="experience" className={`relative z-10 w-full px-4 py-20 pointer-events-none flex justify-center border-b ${borderDividerClass}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
        <div className="w-full max-w-[950px] pointer-events-auto">
          
          <ScrollReveal delay={0}>
            <div className="mb-10 text-center lg:text-left">
              <h2 className={`text-3xl md:text-4xl font-light mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                Experiences.
              </h2>
              <p className="text-gray-500 text-sm max-w-xl">
                Bridging clinical oncology and machine learning across leading cancer institutes.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col border-t border-gray-200/50">
              
              <MagneticWrapper multiplier={0.02}>
                <div className={`p-6 border-b transition-all duration-300 group hover:z-10 hover:shadow-xl cursor-default ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-white/40 border-gray-200/80 hover:bg-white/80'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-[#243bb5]'}`}>Nov. 2026 — Nov. 2028 (Incoming)</span>
                    <span className="text-xs text-gray-400 font-medium">Rouen / Paris, France</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                    <div>
                      <h3 className={`text-xl font-normal leading-snug transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                        Postdoctoral Researcher & Deep Learning Engineer
                      </h3>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Centre Henri Becquerel & Institut Curie</p>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    Research engineer in the PRT-K <strong>Federated-PET</strong> excellence project, dedicated to the harmonization of multicentric PET images.
                  </p>
                  <ul className={`list-none space-y-2 text-sm font-light ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    <li className="flex gap-2"><span className={isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}>•</span> Development and deployment of Federated Learning solutions on distributed clinical data.</li>
                    <li className="flex gap-2"><span className={isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}>•</span> Design of advanced generative models (CycleGAN & Diffusion Models) to standardize PET images and remove scanner-specific biases (EARL accreditations).</li>
                  </ul>
                </div>
              </MagneticWrapper>

              <MagneticWrapper multiplier={0.02}>
                <div className={`p-6 border-b transition-all duration-300 group hover:z-10 hover:shadow-xl cursor-default ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-white/40 border-gray-200/80 hover:bg-white/80'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-[#243bb5]'}`}>Sept. 2022 — Sept. 2025</span>
                    <span className="text-xs text-gray-400 font-medium">Rouen, France</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                    <div>
                      <h3 className={`text-xl font-normal leading-snug transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                        PhD Candidate & Research Assistant in Medical AI
                      </h3>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Université de Rouen-Normandie, Laboratoire AIMS (équipe Quantif)</p>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    Design of robust generative augmentation models (VAE, Diffusion) to spatially and longitudinally model the evolution of brain cancer (gliomas) from scarce and heterogeneous clinical acquisitions.
                  </p>
                  <ul className={`list-none space-y-2 text-sm font-light ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    <li className="flex gap-2"><span className={isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}>•</span> Development of a multi-task diffusion pipeline predicting tumor progression at the voxel level (75% Dice score at several months horizon).</li>
                    <li className="flex gap-2"><span className={isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}>•</span> Teaching assistant and module leader for <strong>Deep Learning in Medicine</strong> (MSc 2nd year) and <strong>Python</strong> (MSc 1st year) — 237 hours taught.</li>
                  </ul>
                </div>
              </MagneticWrapper>

              <MagneticWrapper multiplier={0.02}>
                <div className={`p-6 border-b transition-all duration-300 group hover:z-10 hover:shadow-xl cursor-default rounded-b-xl ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-white/40 border-gray-200/80 hover:bg-white/80'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-[#243bb5]'}`}>Oct. 2021 — Sept. 2022</span>
                    <span className="text-xs text-gray-400 font-medium">Poissy (Stellantis), France</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                    <div>
                      <h3 className={`text-xl font-normal leading-snug transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                        Data Scientist / NLP Engineer (M2 Apprentice)
                      </h3>
                      <p className={`text-sm font-semibold ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Stellantis, SoftwareX Group</p>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    Design of semantic architectures and facial recognition models applied to the automotive sector and post-merger global HR systems.
                  </p>
                  <ul className={`list-none space-y-2 text-sm font-light ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    <li className="flex gap-2"><span className={isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}>•</span> Design of semantic alignment models based on Transformer architectures (BERT, LDA) for Stellantis job nomenclatures.</li>
                    <li className="flex gap-2"><span className={isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}>•</span> Development of a computer vision pipeline for facial recognition using Vision Transformers and ArcFace loss function.</li>
                  </ul>
                </div>
              </MagneticWrapper>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- SECTION CURRICULUM --- */}
      <section id="curriculum" className={`relative z-10 w-full px-4 py-20 pointer-events-none flex justify-center border-b ${borderDividerClass}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
        <div className="w-full max-w-[950px] pointer-events-auto">
          
          <ScrollReveal delay={0}>
            <div className="mb-10 text-center lg:text-left">
              <h2 className={`text-3xl md:text-4xl font-light mb-2 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                Curriculum.
              </h2>
              <p className="text-gray-500 text-sm max-w-xl">
                A rigorous academic path with continuous honors in computer science, computer vision, and AI.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="flex flex-col border-t border-gray-200/50">
              
              {/* Doctorat */}
              <MagneticWrapper multiplier={0.02}>
                <div className={`p-6 border-b transition-all duration-300 group hover:z-10 hover:shadow-xl cursor-default ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-[#f8f9fc]/80 border-gray-200/80 hover:bg-white/90'
                }`}>
                  <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">2022 — 2025</span>
                  <h3 className={`text-lg font-semibold mt-2 leading-snug transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`}>
                    Ph.D. in Computer Science & Medical Imaging
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-3">Université de Rouen-Normandie, France</p>
                  <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    Thesis: "Modèles génératifs pour la prédiction de la progression du cancer à partir de données multimodales". Defended with praise on Sept 16, 2025.
                  </p>
                </div>
              </MagneticWrapper>

              {/* Master 2 */}
              <MagneticWrapper multiplier={0.02}>
                <div className={`p-6 border-b transition-all duration-300 group hover:z-10 hover:shadow-xl cursor-default ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-[#f8f9fc]/80 border-gray-200/80 hover:bg-white/90'
                }`}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">2021 — 2022</span>
                    <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>TOP OF CLASS</span>
                  </div>
                  <h3 className={`text-lg font-semibold mt-2 leading-snug transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`}>
                    M.Sc. in Computer Vision & Intelligent Machines
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-3">Université Paris-Descartes, France</p>
                  <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    Ranked 1st (~15/20 average). High specialization in deep convolutional architectures, statistical classifiers, and deep NLP aligners.
                  </p>
                </div>
              </MagneticWrapper>

              {/* Master 1 */}
              <MagneticWrapper multiplier={0.02}>
                <div className={`p-6 border-b transition-all duration-300 group hover:z-10 hover:shadow-xl cursor-default ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-[#f8f9fc]/80 border-gray-200/80 hover:bg-white/90'
                }`}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">2020 — 2021</span>
                    <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>TOP OF CLASS</span>
                  </div>
                  <h3 className={`text-lg font-semibold mt-2 leading-snug transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`}>
                    M.Sc. (M1) in Interactive & Intelligent Systems
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-3">Université de Bretagne Occidentale (UBO), France</p>
                  <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    Ranked 1st (~15/20 average). Curated study of hardware acceleration (FPGA, SIMD vectorization) and advanced optimization.
                  </p>
                </div>
              </MagneticWrapper>

              {/* Licence */}
              <MagneticWrapper multiplier={0.02}>
                <div className={`p-6 border-b transition-all duration-300 group hover:z-10 hover:shadow-xl cursor-default rounded-b-xl ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-[#f8f9fc]/80 border-gray-200/80 hover:bg-white/90'
                }`}>
                  <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider">2016 — 2019</span>
                  <h3 className={`text-lg font-semibold mt-2 leading-snug transition-colors ${isDarkMode ? 'text-white group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`}>
                    B.Sc. in Software Engineering & Intelligent Systems
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-3">USTHB, Algiers</p>
                  <p className={`text-sm font-light leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                    Acquired software development paradigms, design patterns, and completed a thesis using Deep Belief Networks (DBN) for NLP-based road accident tracking.
                  </p>
                </div>
              </MagneticWrapper>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- SECTION PUBLICATIONS (AVEC ACCORDÉON) --- */}
      <section id="publications" className={`relative z-10 w-full px-4 py-20 pointer-events-none flex justify-center border-b bg-transparent ${borderDividerClass}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
        <div className="w-full max-w-[950px] pointer-events-auto">
          
          <ScrollReveal delay={0}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
              <div>
                <h2 className={`text-3xl md:text-4xl font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                  Publications.
                </h2>
                <p className="text-gray-500 text-sm max-w-xl mt-2">
                  Selected peer-reviewed conference, journal and preprint paper.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Liste des Publications */}
          <ScrollReveal delay={150}>
            <div className="flex flex-col border-t border-gray-200/50 rounded-xl">
              {filteredPublications.map((pub, idx) => (
                <MagneticWrapper multiplier={0.015} key={idx}>
                  <div 
                    onClick={() => setExpandedPub(expandedPub === idx ? null : idx)}
                    className={`group relative flex flex-col p-6 border-b transition-all duration-300 hover:z-10 hover:shadow-xl cursor-pointer overflow-hidden ${
                      isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80' : 'bg-white/40 border-gray-200/80 hover:bg-white/90'
                    } ${idx === filteredPublications.length - 1 ? 'rounded-b-xl' : ''} ${idx === 0 ? 'rounded-t-xl' : ''}`}
                  >
                    
                    {/* Header de la carte publication */}
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr_120px] items-start w-full">
                      <div className="text-[10px] font-bold text-gray-400 font-mono tracking-wider pt-1.5 mb-2 md:mb-0">
                        {pub.date}
                      </div>

                      <div className="pr-8">
                        <h3 className={`text-base md:text-lg font-normal transition-colors leading-snug ${isDarkMode ? 'text-slate-100 group-hover:text-indigo-400' : 'text-gray-900 group-hover:text-[#243bb5]'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                          {pub.title}
                        </h3>
                        <p className={`text-sm mt-1 font-light ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                          {pub.authors.split(', ').map((author, aIdx) => (
                            <span key={aIdx}>
                              {author === 'A. Kebaili' || author === 'A. Kebaili1' ? <strong className={isDarkMode ? 'text-slate-100 font-semibold' : 'text-gray-800 font-semibold'}>{author}</strong> : author}
                              {aIdx < pub.authors.split(', ').length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                      </div>

                      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto mt-4 md:mt-0 gap-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-widest font-mono uppercase ${
                          pub.status === 'ARXIV' || pub.status === 'UNDER REVIEW' || pub.status === 'ORAL PRESENTATION'
                            ? (isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-600 border border-amber-200') 
                            : (isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border border-indigo-200')
                        }`}>
                          {pub.status}
                        </span>
                        <span className="text-[11px] font-semibold text-gray-400 font-mono tracking-wider">
                          {pub.venue}
                        </span>
                      </div>
                    </div>

                    {/* Partie Abstract Déroulante (Accordion) */}
                    <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${expandedPub === idx ? 'max-h-[800px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="md:pl-[100px] pr-4">
                        <h4 className={`text-[10px] font-bold uppercase tracking-wider font-mono mb-2 ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Abstract</h4>
                        <p className={`text-sm leading-relaxed mb-4 whitespace-pre-line ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`} style={{ fontFamily: "'Labrado B', 'Labrado', 'Manrope', sans-serif" }}>
                          {pub.abstract}
                        </p>
                        {!pub.noLink && (
                          <a 
                            href={pub.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                              isDarkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-[#243bb5] text-white hover:bg-[#1d2f91]'
                            }`}
                          >
                            View Publication
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Flèche + - indicateur */}
                    <div className="absolute right-4 top-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block">
                      {expandedPub === idx ? (
                        <svg className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                      ) : (
                        <svg className={`w-5 h-5 ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                      )}
                    </div>
                  </div>
                </MagneticWrapper>
              ))}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* --- SECTION CONTACT --- */}
      <section id="contact" className="relative z-10 w-full px-4 py-20 pointer-events-none flex justify-center bg-transparent" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 400 }}>
        <div className="w-full max-w-[950px] pointer-events-auto">
          
          <ScrollReveal delay={0}>
            <div className="mb-8 text-center lg:text-left">
              <h2 className={`text-3xl md:text-4xl font-light tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                Contact & Collaborations.
              </h2>
              <p className="text-gray-500 text-sm max-w-xl mt-2">
                Let's discuss computer vision challenges, multi-omics clinical research, or open ML research collaborations.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className={`grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-6 border p-6 lg:p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-colors duration-500 ${
              isDarkMode ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white/70 border-gray-200/60'
            }`}>
              
              {/* PARTIE GAUCHE */}
              <div className={`flex flex-col justify-between gap-6 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 ${
                isDarkMode ? 'border-slate-800' : 'border-gray-200/80'
              }`}>
                <div>
                  <h3 className={`text-xl font-normal mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                    Get in touch
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    If you are a clinician looking for AI assistance, a machine learning researcher, or a student looking for clinical imaging internships, feel free to drop a message.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-[#f8f9fc]/80 border-gray-100'}`}>
                      <span className={`text-[9px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Affiliation</span>
                      <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>Henri Becquerel Cancer Center - AIMS Lab</span>
                    </div>

                    <div className={`p-3 rounded-lg border ${isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-[#f8f9fc]/80 border-gray-100'}`}>
                      <span className={`text-[9px] font-bold uppercase tracking-wider block mb-1 ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Academic Email</span>
                      <a href="mailto:aghiles.kebaili@univ-rouen.fr" className={`text-xs font-semibold hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>
                        aghiles.kebaili@univ-rouen.fr
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-gray-400 font-mono">
                  Université de Rouen Normandie <br />
                  Rouen, France
                </div>
              </div>

              {/* PARTIE DROITE */}
              <div className="pl-0 lg:pl-4">
                <h3 className={`text-xl font-normal mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                  Send a message
                </h3>

                {submitSuccess ? (
                  <div className={`border rounded-xl p-6 text-center animate-fade-in ${
                    isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    <div className="w-10 h-10 bg-emerald-100/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h4 className="text-sm font-semibold">Message prepared successfully!</h4>
                    <p className="text-xs mt-1">Your email client has been opened to complete the transmission.</p>
                    <button onClick={() => setSubmitSuccess(false)} className={`text-xs font-semibold mt-4 hover:underline ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Name</label>
                        <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Your name" className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-indigo-400/40' : 'bg-[#f8f9fc]/80 border-gray-200/80 text-gray-900 focus:border-[#243bb5]/40'}`} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Email</label>
                        <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="your.email@example.com" className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-indigo-400/40' : 'bg-[#f8f9fc]/80 border-gray-200/80 text-gray-900 focus:border-[#243bb5]/40'}`} />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Subject</label>
                      <input type="text" required value={contactSubject} onChange={(e) => setContactSubject(e.target.value)} placeholder="Subject of your message" className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none transition-colors ${isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-indigo-400/40' : 'bg-[#f8f9fc]/80 border-gray-200/80 text-gray-900 focus:border-[#243bb5]/40'}`} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Message</label>
                      <textarea required rows="4" value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Write your research inquiries or message here..." className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none transition-colors resize-none ${isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-100 focus:border-indigo-400/40' : 'bg-[#f8f9fc]/80 border-gray-200/80 text-gray-900 focus:border-[#243bb5]/40'}`} />
                    </div>
                    <button type="submit" disabled={isSubmitting} className={`w-full text-white text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_4px_12px_rgba(99,102,241,0.3)]' : 'bg-[#243bb5] hover:bg-[#1d2f91] hover:shadow-[0_4px_12px_rgba(36,59,181,0.3)]'}`}>
                      {isSubmitting ? <span>Preparing...</span> : <><span>Submit Message</span><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg></>}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- SECTION CONCLUSION --- */}
      <section className="relative z-10 w-full px-4 py-12 flex justify-center bg-transparent" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <div className="w-full max-w-[950px] text-center pointer-events-auto">
          <ScrollReveal delay={100}>
            <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-slate-900/30 border-slate-800/60' : 'bg-[#f8f9fc]/30 border-gray-100'}`}>
              <h3 className={`text-2xl font-light mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Luxora Grotesk', 'Outfit', sans-serif" }}>
                Let's build the future of medicine together.
              </h3>
              <p className={`text-xs max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                I am continuously open to clinical research collaborations, advanced engineering opportunities, or open-source projects. If you are looking for a passionate research engineer to design robust, ethical, and clinically applicable AI pipelines, feel free to reach out.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* --- FOOTER MODERNE --- */}
      <footer className={`relative z-10 w-full px-8 py-12 mt-auto border-t transition-colors duration-500 ${isDarkMode ? 'bg-[#060910] border-slate-900 text-slate-400' : 'bg-white border-gray-100 text-gray-500'}`} style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
        <div className="max-w-[950px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <h4 className={`text-sm font-semibold tracking-wider uppercase font-mono ${isDarkMode ? 'text-indigo-400' : 'text-[#243bb5]'}`}>Aghiles Kebaili</h4>
            <p className="text-xs leading-relaxed font-light">Machine Learning Research Engineer in Medical Imaging. Specialized in generative models & deep radiomics.</p>
            <span className="text-[10px] font-mono text-gray-400">© 2026 — All Rights Reserved.</span>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono mb-1">Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#research" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>Research</a>
              <a href="#experience" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>Experience</a>
              <a href="#curriculum" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>Curriculum</a>
              <a href="#publications" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>Publications</a>
              <a href="#contact" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>Contact</a>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 font-mono">Social & Controls</h4>
            <div className="flex gap-4 text-xs font-medium mb-2">
              <a href="https://linkedin.com/in/aghiles-kebaili" target="_blank" rel="noopener noreferrer" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>LinkedIn</a>
              <a href="https://github.com/Arksyd96" target="_blank" rel="noopener noreferrer" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>GitHub</a>
              <a href="https://scholar.google.fr/citations?user=Sp3Q6LQAAAAJ&hl=fr" target="_blank" rel="noopener noreferrer" className={`hover:underline ${isDarkMode ? 'hover:text-indigo-400' : 'hover:text-[#243bb5]'}`}>Scholar</a>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsDarkMode(!isDarkMode)}>
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Nightly</span>
                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </div>
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsParticlesEnabled(!isParticlesEnabled)}>
                <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Particles</span>
                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${isParticlesEnabled ? (isDarkMode ? 'bg-indigo-600' : 'bg-[#243bb5]') : 'bg-gray-300'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isParticlesEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}