const RetroCrtCard = () => {
  return (
    <div className="retro-crt-card">
      <div className="crt-overlay"></div>

      <div className="crt-screen">
        <div className="screen-header">
          <span className="dir-path">A:&gt; SYS_DIAGNOSTICS</span>
          <span className="pulse-led">● LIVE</span>
        </div>

        <div className="screen-outputs">
          <a
            href="https://mini-siti-builder.netlify.app/"
            className="output-line"
            target="_blank"
            rel="noopener noreferrer"
          >
            &gt; Mini Siti Builder
          </a>

          <p className="output-line success">
            &gt; Imparare Html e Css:{" "}
            <a
              href="https://impara-html-e-css-579414217719.europe-west2.run.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OK
            </a>
          </p>

          <br />

          <a
            href="https://tailwind-code-lab.vercel.app/"
            className="output-line"
            target="_blank"
            rel="noopener noreferrer"
          >
            &gt; TAILWIND LAB
          </a>

          <p className="output-line success">
            &gt; Creative Card Artistiche:{" "}
            <a
              href="https://creative-card-artist.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OK
            </a>
          </p>

          <br />

          <a
            href="https://disegno-vettoriale.vercel.app/"
            className="output-line"
            target="_blank"
            rel="noopener noreferrer"
          >
            &gt; Disegno Vettoriale
          </a>

          <p className="output-line success">
            &gt; Lettore JSON Universale:{" "}
            <a
              href="https://lettore-json-universale.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OK
            </a>
          </p>
        </div>

        <div className="screen-loader">
          <span className="loader-label">BUFFERING CORE:</span>

          <div className="discrete-progress">
            <div className="progress-block"></div>
            <div className="progress-block"></div>
            <div className="progress-block"></div>
            <div className="progress-block"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroCrtCard;
