import React from 'react';

export default function AsianCyrillicWritingAppsCard({
  title = "Scrittura & Calligrafia",
  subtitle = "Cinese, Coreano e Cirillico",
  badge = "LINGUE & CARATTERI",
  apps = []
}) {
  // Lista di default specializzata per la scrittura di Cinese, Coreano e Russo
  const defaultApps = [
    { name: "Skritter", category: "Cinese", script: "汉字", rating: "4.9", url: "https://hanzi-pro-build.netlify.app/" },
    { name: "Write It! Korean", category: "Tratti Hangul", script: "한글", rating: "4.8", url: "https://scrittura-coreana.vercel.app/" },
     { name: "Write It! Korean", category: "Tratti Hangul", script: "한글", rating: "4.8", url: "https://generatore-di-fogli-di-scrittura-co.vercel.app/" },
    { name: "Write It! Russian", category: "Corsivo Cirillico", script: "Русс", rating: "4.8", url: "https://generatore-di-esercizi-di-scrittura.vercel.app/" },
    { name: "HanziCraft", category: "Decomposizione Cinese", script: "中文", rating: "4.7", url: "https://pinyin-converter-ashen.vercel.app/" },
    { name: "Mirinae Korean", category: "Sintassi & Tratti", script: "한국어", rating: "4.8", url: "https://eserciziario-di-lingua-coreana.vercel.app/" },
    { name: "Lingue", category: "Quaderni", script: "CKR", rating: "4.6", url: "https://quaderni-di-scrittura.vercel.app/" }
  ];

  const appList = apps.length > 0 ? apps : defaultApps;

  return (
    <div className="liquid-pop-wrapper">
      <style>{`
        /* --- LIQUID POP CARD STYLES (Asian & Cyrillic Ink Theme) --- */
        .liquid-pop-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .liquid-card {
          position: relative;
          width: 330px;
          min-height: 480px;
          background: #ffffff;
          border-radius: 28px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          padding: 24px;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .liquid-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 30px 60px rgba(16, 185, 129, 0.2), 0 10px 20px rgba(0, 0, 0, 0.05);
        }

        /* --- BLOB LIQUIDI (Inchiostro & Giada) --- */
        .liquid-blob-1 {
          position: absolute;
          top: -60px;
          right: -60px;
          width: 220px;
          height: 220px;
          background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
          border-radius: 50%;
          z-index: 1;
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          filter: blur(28px);
          opacity: 0.45;
          animation: blobFloat1 8s infinite alternate ease-in-out;
        }

        .liquid-blob-2 {
          position: absolute;
          bottom: -40px;
          left: -40px;
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          border-radius: 50%;
          z-index: 1;
          transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
          filter: blur(24px);
          opacity: 0.35;
          animation: blobFloat2 6s infinite alternate ease-in-out;
        }

        .liquid-card:hover .liquid-blob-1 {
          transform: scale(1.3) translate(-20px, 30px);
          opacity: 0.65;
          filter: blur(22px);
        }

        .liquid-card:hover .liquid-blob-2 {
          transform: scale(1.25) translate(20px, -20px);
          opacity: 0.55;
          filter: blur(20px);
        }

        /* --- HEADER --- */
        .liquid-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }

        .liquid-icon-container {
          position: relative;
          width: 72px;
          height: 72px;
          background: #ffffff;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.15);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
          overflow: hidden;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .liquid-card:hover .liquid-icon-container {
          transform: scale(1.08) rotate(-4deg);
          box-shadow: 0 12px 30px rgba(16, 185, 129, 0.35);
        }

        .lottie-box {
          width: 56px;
          height: 56px;
        }

        .liquid-title-group {
          display: flex;
          flex-direction: column;
        }

        .liquid-badge {
          align-self: flex-start;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #0d9488;
          background: rgba(13, 148, 136, 0.1);
          padding: 3px 8px;
          border-radius: 12px;
          margin-bottom: 4px;
          text-transform: uppercase;
        }

        .liquid-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin: 0;
        }

        .liquid-subtitle {
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 2px;
        }

        /* --- LISTA APP / LINK --- */
        .apps-list {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
          max-height: 290px;
          overflow-y: auto;
          padding-right: 4px;
        }

        .apps-list::-webkit-scrollbar {
          width: 4px;
        }
        .apps-list::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.02);
        }
        .apps-list::-webkit-scrollbar-thumb {
          background: rgba(13, 148, 136, 0.4);
          border-radius: 4px;
        }

        .app-item-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .app-item-card:hover {
          background: #ffffff;
          border-color: #0d9488;
          transform: translateX(4px);
          box-shadow: 0 8px 16px rgba(13, 148, 136, 0.15);
        }

        .app-info {
          display: flex;
          flex-direction: column;
        }

        .app-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #1e293b;
          transition: color 0.2s ease;
        }

        .app-item-card:hover .app-name {
          color: #0d9488;
        }

        .app-category {
          font-size: 0.72rem;
          color: #64748b;
        }

        .app-meta {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .app-script-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: #0f766e;
          background: #f0fdf4;
          padding: 2px 7px;
          border-radius: 8px;
          border: 1px solid #ccfbf1;
        }

        .app-arrow {
          font-size: 0.9rem;
          color: #cbd5e1;
          transition: all 0.2s ease;
        }

        .app-item-card:hover .app-arrow {
          color: #0d9488;
          transform: translateX(2px);
        }

        @keyframes blobFloat1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-15px, 15px) rotate(10deg); }
        }

        @keyframes blobFloat2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(15px, -15px) rotate(-10deg); }
        }
      `}</style>

      <div className="liquid-card">
        {/* Sfondi Animati Liquidi */}
        <div className="liquid-blob-1"></div>
        <div className="liquid-blob-2"></div>

        {/* Intestazione Card */}
        <div className="liquid-header">
          <div className="liquid-icon-container">
            <div className="lottie-box">
              {/* Animazione Lottie di un pennello/penna che scrive */}
              <iframe
                src="https://embed.lottiefiles.com/animation/98723"
                style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
                title="Writing Pencil Brush Icon"
              />
            </div>
          </div>

          <div className="liquid-title-group">
            <span className="liquid-badge">{badge}</span>
            <h3 className="liquid-title">{title}</h3>
            <span className="liquid-subtitle">{subtitle}</span>
          </div>
        </div>

        {/* Lista App interattiva */}
        <div className="apps-list">
          {appList.map((app, index) => (
            <a
              key={index}
              href={app.url}
              className="app-item-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="app-info">
                <span className="app-name">{app.name}</span>
                <span className="app-category">{app.category}</span>
              </div>
              <div className="app-meta">
                {app.script && <span className="app-script-tag">{app.script}</span>}
                <span className="app-arrow">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
