type ComicLink = {
  label: string;
  href: string;
  note: string;
};

type ComicLinksCardProps = {
  title?: string;
  subtitle?: string;
  burstText?: string;
  badgeText?: string;
  links?: ComicLink[];
};

const defaultLinks: ComicLink[] = [
  {
    label: "Ghibli Me",
    href: "https://ghibli-me-anime-avatar-creator.vercel.app/",
    note: "Avatar style"
  },
  {
    label: "Bichi Creator",
    href: "https://bichi-creator.vercel.app/",
    note: "Character maker"
  },
  {
    label: "Chibi Master",
    href: "https://chibi-master.vercel.app/",
    note: "Cute editor"
  },
  {
    label: "Chibi Creator",
    href: "https://chibi-creator.netlify.app/",
    note: "Mini figures"
  },
{
    label: "Bichi Studio",
    href: "https://chibi-creator.netlify.app/",
    note: "Cute Crature"
  }

];
https://bichi-sticker-studio.vercel.app/


export default function ComicLinksCard({
  title = "Anime avatar lab",
  subtitle = "Mini pannello stile fumetto per aprire al volo i creator più carini.",
  burstText = "Pow!",
  badgeText = "Comic links",
  links = defaultLinks
}: ComicLinksCardProps) {
  return (
    <article className="comic-paper-card desk-card hover-rot-2" style={{ ['--hover-rot' as any]: '1.2deg' }}>
      <div className="comic-paper-card__splash" aria-hidden="true" />
      <div className="comic-paper-card__burst" aria-hidden="true">{burstText}</div>

      <div className="comic-paper-card__content">
        <div className="comic-paper-card__badge">{badgeText}</div>

        <h3 className="comic-paper-card__title">{title}</h3>
        <p className="comic-paper-card__subtitle">{subtitle}</p>

        <div className="comic-paper-card__links">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`comic-paper-link comic-paper-link--${(index % 5) + 1}`}
            >
              <span className="comic-paper-link__num">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="comic-paper-link__label">
                <strong>{link.label}</strong>
                <span>{link.note}</span>
              </span>

              <span className="comic-paper-link__cta" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <div className="comic-paper-card__footer-note">
          <svg viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="comic-paper-card__scribble" aria-hidden="true">
            <path
              d="M2 9C10 2 18 11 26 4C34 -1 42 10 58 3"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          avatar tools
        </div>
      </div>
    </article>
  );
}
