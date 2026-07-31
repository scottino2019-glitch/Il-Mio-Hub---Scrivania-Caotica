import React from 'react';

export default function RotoScopioAppsCard({
  title = "Animazione 2D & VFX",
  subtitle = "Toolkit Creativo Professionale",
  badge = "RELAX & MOTION",
  // Animazione Lottie Lottiefiles incorporata (icona ciak / videocamera animata)
  apps = []
}) {
  // Lista di default delle app se non vengono passati dati tramite props
  const defaultApps = [
    { name: "CSS Art Studio", category: "Animation", rating: "4.9", url: "https://css-art-animation-studio.vercel.app/" },
    { name: "CSS.PLAYGROUND", category: "Skeletal Animation", rating: "4.8", url: "https://css-animation-laboratory.vercel.app/" },
    { name: "HoverCraft", category: "Hover Animation", rating: "4.7", url: "https://hover-craft-tau.vercel.app/" },
    { name: "Artistic.Box", category: "Div Generator", rating: "4.9", url: "https://div-generator.vercel.app/" },
    { name: "Parallax Studio", category: "Background Animation", rating: "4.6", url: "https://parallax-studio-sage.vercel.app/" },
    { name: "Scroll Creator", category: "Background", rating: "4.8", url: "https://scroll-creator.vercel.app/" },
     { name: "Artisan Studio", category: "Siti Creator", rating: "4.8", url: "https://artisan-studio-psi.vercel.app/" },
    { name: "Modal Code Studio", category: "Siti Creator", rating: "4.8", url: "https://modal-code-studio.vercel.app/" },
  ];
  const appList = apps.length > 0 ? apps : defaultApps;

  return (
    <div className="roto-wrapper">
      <style>{`
        /* --- ROTO-SCOPIO CARD STYLES --- */
        .roto-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .roto-card {
          position: relative;
          width: 330px;
          min-height: 490px;
          background-color: #121318;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          padding: 24px;
          box-sizing: border-box;
          color: #ffffff;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
        }

        /* --- BORDO NEON ROTANTE --- */
        .roto-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            #ff0055, 
            #ffdd00, 
            #00ddff, 
            #a855f7, 
            #ff0055
          );
          animation: ruotaBordo 4s linear infinite;
          z-index: 1;
        }

        /* Maschera interna scura per creare il solo perimetro neon */
        .roto-card::after {
          content: '';
          position: absolute;
          inset: 3px; /* Spessore del bordo neon */
          background-color: #0b0c10;
          border-radius: 21px;
          z-index: 2;
        }

        /* HOVER EFFECTS: Tilt 3D & Neon Glow */
        .roto-card:hover {
          transform: translateY(-8px) rotateX(6deg) rotateY(-4deg) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 221, 255, 0.25), 0 0 20px rgba(255, 0, 85, 0.2);
        }

        /* --- CONTENUTI SUPERIORI (Z-INDEX SOPRA LA MASCHERA) --- */
        .roto-content-head {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .roto-icon-box {
          position: relative;
          width: 70px;
          height: 70px;
          background: #181a22;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: inset 0 0 12px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          flex-shrink: 0;
          animation: fluttua 4s ease-in-out infinite;
        }

        .lottie-box {
          width: 52px;
          height: 52px;
        }

        .roto-title-group {
          display: flex;
          flex-direction: column;
        }

        .roto-badge {
          align-self: flex-start;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: #00ddff;
          background: rgba(0, 221, 255, 0.12);
          border: 1px solid rgba(0, 221, 255, 0.3);
          padding: 3px 8px;
          border-radius: 10px;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .roto-title {
          font-size: 1.2rem;
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
          background: linear-gradient(135deg, #ffffff 0%, #ffdd00 50%, #ff0055 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .roto-subtitle {
          font-size: 0.75rem;
          color: #8b92a5;
          margin-top: 3px;
        }

        /* --- LISTA APP / LINK NEON --- */
        .roto-apps-list {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
          max-height: 290px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .roto-apps-list::-webkit-scrollbar {
          width: 3px;
        }
        .roto-apps-list::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .roto-apps-list::-webkit-scrollbar-thumb {
          background: rgba(0, 221, 255, 0.4);
          border-radius: 3px;
        }

        .roto-app-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(24, 26, 34, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.25s ease-in-out;
        }

        .roto-app-item:hover {
          background: rgba(0, 221, 255, 0.08);
          border-color: #00ddff;
          transform: translateX(4px);
          box-shadow: 0 0 12px rgba(0, 221, 255, 0.2);
        }

        .roto-app-info {
          display: flex;
          flex-direction: column;
        }

        .roto-app-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #e2e8f0;
          transition: color 0.2s ease;
        }

        .roto-app-item:hover .roto-app-name {
          color: #00ddff;
        }

        .roto-app-cat {
          font-size: 0.7rem;
          color: #64748b;
        }

        .roto-app-meta {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .roto-app-rating {
          font-size: 0.72rem;
          font-weight: 700;
          color: #ffdd00;
          background: rgba(255, 221, 0, 0.1);
          padding: 2px 6px;
          border-radius: 6px;
          border: 1px solid rgba(255, 221, 0, 0.2);
        }

        .roto-app-arrow {
          font-size: 0.85rem;
          color: #475569;
          transition: all 0.2s ease;
        }

        .roto-app-item:hover .roto-app-arrow {
          color: #ff0055;
          transform: translateX(3px);
        }

        /* ANIMAZIONI KEYFRAMES */
        @keyframes ruotaBordo {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fluttua {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>

      <div className="roto-card">
        {/* Header con Icona Lottie e Titolo */}
        <div className="roto-content-head">
          <div className="roto-icon-box">
            <div className="lottie-box">
              <iframe
                src="https://embed.lottiefiles.com/animation/67626"
                style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                title="Animation Icon Neon"
              />
            </div>
          </div>

          <div className="roto-title-group">
            <span className="roto-badge">{badge}</span>
            <h3 className="roto-title">{title}</h3>
            <span className="roto-subtitle">{subtitle}</span>
          </div>
        </div>

        {/* Lista App integrata */}
        <div className="roto-apps-list">
          {appList.map((app, index) => (
            <a
              key={index}
              href={app.url}
              className="roto-app-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="roto-app-info">
                <span className="roto-app-name">{app.name}</span>
                <span className="roto-app-cat">{app.category}</span>
              </div>
              <div className="roto-app-meta">
                {app.rating && <span className="roto-app-rating">★ {app.rating}</span>}
                <span className="roto-app-arrow">➔</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
