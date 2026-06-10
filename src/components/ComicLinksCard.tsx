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
    note: "Avatar style",
  },
  {
    label: "Bichi Creator",
    href: "https://bichi-creator.vercel.app/",
    note: "Character maker",
  },
  {
    label: "Chibi Master",
    href: "https://chibi-master.vercel.app/",
    note: "Cute editor",
  },
  {
    label: "Chibi Creator",
    href: "https://chibi-creator.netlify.app/",
    note: "Mini figures",
  },
{
    label: "Chibi Sudio",
    href: "https://chibi-studio.netlify.app/",
    note: "Mini figures",
  },
{
    label: "Bichi Studio",
    href: "https://bichi-sticker-studio.vercel.app/?bichi=%7B%22body%22%3A%22blob%22%2C%22color%22%3A%22%23FF9EAE%22%2C%22colorSecondary%22%3A%22%23FF7086%22%2C%22eyes%22%3A%22anime%22%2C%22eyesScale%22%3A1%2C%22eyesOffsetY%22%3A0%2C%22ears%22%3A%22bunny%22%2C%22earsScale%22%3A1%2C%22earsOffsetY%22%3A0%2C%22nose%22%3A%22snout%22%2C%22noseScale%22%3A1%2C%22noseOffsetY%22%3A0%2C%22mouth%22%3A%22smile%22%2C%22mouthScale%22%3A1%2C%22mouthOffsetY%22%3A0%2C%22accessory%22%3A%22none%22%2C%22accessoryScale%22%3A1%2C%22accessoryOffsetX%22%3A0%2C%22accessoryOffsetY%22%3A0%2C%22background%22%3A%22grid%22%2C%22backgroundColor%22%3A%22%23FFFFFF%22%2C%22filter%22%3A%22normal%22%2C%22animation%22%3A%22none%22%2C%22animationSpeed%22%3A1%2C%22textOverlays%22%3A%5B%5D%7D",
    note: "Cute Creature",
  },
];

export default function ComicLinksCard({
  title = "Anime avatar lab",
  subtitle = "Mini pannello stile fumetto per aprire al volo i creator più carini.",
  burstText = "Pow!",
  badgeText = "Comic links",
  links = defaultLinks,
}: ComicLinksCardProps) {
  return (
    <article className="comic-paper-card desk-card hover-rot-2">
      <div className="comic-paper-card__splash" aria-hidden="true" />
      <div className="comic-paper-card__burst" aria-hidden="true">
        {burstText}
      </div>

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

              <span className="comic-paper-link__cta" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="comic-paper-card__footer-note">
          <svg
            viewBox="0 0 60 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="comic-paper-card__scribble"
            aria-hidden="true"
          >
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