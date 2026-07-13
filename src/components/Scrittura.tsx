const Scrittura = () => {
  return (
    <div className="flex w-full max-w-[580px] mx-auto relative">
      <div className="flex flex-col justify-around w-[40px] py-[40px] bg-transparent z-10">
        <div className="w-[14px] h-[14px] rounded-full bg-[#2c3e50] relative left-[30px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),2px_2px_0px_rgba(255,255,255,0.4)]"></div>
        <div className="w-[14px] h-[14px] rounded-full bg-[#2c3e50] relative left-[30px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),2px_2px_0px_rgba(255,255,255,0.4)]"></div>
        <div className="w-[14px] h-[14px] rounded-full bg-[#2c3e50] relative left-[30px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),2px_2px_0px_rgba(255,255,255,0.4)]"></div>
        <div className="w-[14px] h-[14px] rounded-full bg-[#2c3e50] relative left-[30px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),2px_2px_0px_rgba(255,255,255,0.4)]"></div>
        <div className="w-[14px] h-[14px] rounded-full bg-[#2c3e50] relative left-[30px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8),2px_2px_0px_rgba(255,255,255,0.4)]"></div>
      </div>

      <div
        className="grow relative rounded-[3px_12px_12px_3px] border border-[#ccd1d9] border-l-[2px] border-l-[#aab2bd] pt-[24px] pr-[24px] pb-[24px] pl-[44px] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15),inset_-1px_0px_5px_rgba(0,0,0,0.05)] bg-[#f7f9fa] bg-[length:16px_16px] bg-[image:linear-gradient(rgba(200,224,240,0.45)_1px,transparent_1.5px),linear-gradient(90deg,rgba(200,224,240,0.45)_1px,transparent_1.5px)]"
      >
        <div className="absolute top-0 bottom-0 left-[40px] w-[2px] bg-[rgba(235,77,75,0.6)] pointer-events-none"></div>

        <div>
          <header>
            <div className="flex justify-between border-b-[2px] border-b-[#aab2bd] pb-[6px] mb-[16px] font-caveat text-[1.2rem] text-[#4b6584]">
              <span>
                Materia: <strong className="font-bold text-[#0c2461]">Esercizi di scrittura</strong>
              </span>
              <span>
                Lingue: <strong className="font-bold text-[#0c2461]">Cinese-Coreano-Russo</strong>
              </span>
            </div>

            <h2 className="font-inter text-[0.95rem] font-bold uppercase tracking-[0.8px] text-[#57606f] mt-[12px] mr-0 mb-[24px] ml-0">
              Quaderni e mini app
            </h2>
          </header>

          <ul className="list-none p-0 flex flex-col gap-[24px]">
            <li className="flex flex-col relative">
              <span className="absolute left-[-28px] top-[2px] font-inter text-[0.95rem] text-[#778ca3]">
                &#9634;
              </span>
              <a
                href="https://hanzi-pro-build.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block self-start relative no-underline text-[1.35rem] font-bold text-[#0c2461] px-[4px] py-0 rounded-[4px] transition-all duration-300 ease-in hover:text-black hover:rotate-[-0.5deg] hover:scale-[1.02] before:content-[''] before:absolute before:inset-[1px_-2px] before:bg-[#fff200] before:opacity-0 before:-z-10 before:rounded-[4px_10px_4px_6px] before:scale-y-[0.7] before:scale-x-0 before:origin-left before:transition-[transform,opacity] before:duration-[200ms,150ms] before:[transition-timing-function:cubic-bezier(0.19,1,0.22,1),ease] hover:before:opacity-[0.65] hover:before:scale-y-100 hover:before:scale-x-100"
              >
                Lingua Cinese
              </a>
              <span className="mt-[1px] text-[1.1rem] text-[#57606f]">
                ~ Creare quaderni e app
              </span>
            </li>

            <li className="flex flex-col relative">
              <span className="absolute left-[-28px] top-[2px] font-inter text-[0.95rem] text-[#778ca3]">
                &#9634;
              </span>
              <a
                href="https://generatore-di-esercizi-di-scrittura.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block self-start relative no-underline text-[1.35rem] font-bold text-[#0c2461] px-[4px] py-0 rounded-[4px] transition-all duration-300 ease-in hover:text-black hover:rotate-[-0.5deg] hover:scale-[1.02] before:content-[''] before:absolute before:inset-[1px_-2px] before:bg-[#fff200] before:opacity-0 before:-z-10 before:rounded-[4px_10px_4px_6px] before:scale-y-[0.7] before:scale-x-0 before:origin-left before:transition-[transform,opacity] before:duration-[200ms,150ms] before:[transition-timing-function:cubic-bezier(0.19,1,0.22,1),ease] hover:before:opacity-[0.65] hover:before:scale-y-100 hover:before:scale-x-100"
              >
                Lingua Russa
              </a>
              <span className="mt-[1px] text-[1.1rem] text-[#57606f]">
                ~ Cirillico corsivo e stampatello
              </span>
            </li>

            <li className="flex flex-col relative">
              <span className="absolute left-[-28px] top-[2px] font-inter text-[0.95rem] text-[#778ca3]">
                &#9634;
              </span>
              <a
                href="https://generatore-di-fogli-di-scrittura-co.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block self-start relative no-underline text-[1.35rem] font-bold text-[#0c2461] px-[4px] py-0 rounded-[4px] transition-all duration-300 ease-in hover:text-black hover:rotate-[-0.5deg] hover:scale-[1.02] before:content-[''] before:absolute before:inset-[1px_-2px] before:bg-[#fff200] before:opacity-0 before:-z-10 before:rounded-[4px_10px_4px_6px] before:scale-y-[0.7] before:scale-x-0 before:origin-left before:transition-[transform,opacity] before:duration-[200ms,150ms] before:[transition-timing-function:cubic-bezier(0.19,1,0.22,1),ease] hover:before:opacity-[0.65] hover:before:scale-y-100 hover:before:scale-x-100"
              >
                Lingua Coreana
              </a>
              <span className="mt-[1px] text-[1.1rem] text-[#57606f]">
                ~ Quaderni e App
              </span>
            </li>
             <li className="flex flex-col relative">
              <span className="absolute left-[-28px] top-[2px] font-inter text-[0.95rem] text-[#778ca3]">
                &#9634;
              </span>
              <a
                href="https://pinyin-converter-ashen.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block self-start relative no-underline text-[1.35rem] font-bold text-[#0c2461] px-[4px] py-0 rounded-[4px] transition-all duration-300 ease-in hover:text-black hover:rotate-[-0.5deg] hover:scale-[1.02] before:content-[''] before:absolute before:inset-[1px_-2px] before:bg-[#fff200] before:opacity-0 before:-z-10 before:rounded-[4px_10px_4px_6px] before:scale-y-[0.7] before:scale-x-0 before:origin-left before:transition-[transform,opacity] before:duration-[200ms,150ms] before:[transition-timing-function:cubic-bezier(0.19,1,0.22,1),ease] hover:before:opacity-[0.65] hover:before:scale-y-100 hover:before:scale-x-100"
              >
                Pinyin Converter
              </a>
              <span className="mt-[1px] text-[1.1rem] text-[#57606f]">
                ~ Convertire Ideogrammi in pinyin
              </span>
            </li>
          </ul>

          <div className="absolute bottom-[12px] right-[20px] opacity-40 pointer-events-none">
            <div className="text-[1.4rem] text-[#4b6584]">★</div>
            <div className="w-[16px] h-[16px] border-[1.5px] border-[#4b6584] mt-[4px] rotate-[15deg]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scrittura;
