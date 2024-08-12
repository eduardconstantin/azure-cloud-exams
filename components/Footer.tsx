import {
  SiDiscord,
  SiEbay,
  SiEtsy,
  SiGithub,
  SiGoogleplay,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiReddit,
  SiUdemy,
  SiX,
} from "react-icons/si";
import "styles/footer.css";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const iconSize = 28;

  const socialMediaLinks = [
    {
      url: "https://discord.gg/RFjtXKfJy3",
      icon: <SiDiscord className="discord" size={iconSize} />,
    },
    {
      url: "https://ebay.com/usr/ditectrev",
      icon: <SiEbay className="ebay" size={iconSize} />,
    },
    {
      url: "https://ditectrev.etsy.com",
      icon: <SiEtsy className="etsy" size={iconSize} />,
    },
    {
      url: "https://facebook.com/ditectrev",
      icon: <SiFacebook className="facebook" size={iconSize} />,
    },
    {
      url: "https://github.com/ditectrev",
      icon: <SiGithub className="github" size={iconSize} />,
    },
    {
      url: "https://play.google.com/store/books/collection/cluster?gsr=SheCARQKEAoMWjZNR0VRQUFRQkFKEAkQBA%3D%3D:S:ANO1ljK1zJ0",
      icon: <SiGoogleplay className="googleplay" size={iconSize} />,
    },
    {
      url: "https://instagram.com/ditectrev",
      icon: <SiInstagram className="instagram" size={iconSize} />,
    },
    {
      url: "https://linkedin.com/company/ditectrev",
      icon: <SiLinkedin className="linkedin" size={iconSize} />,
    },
    {
      url: "https://reddit.com/user/Ditectrev",
      icon: <SiReddit className="reddit" size={iconSize} />,
    },
    {
      url: "https://udemy.com/user/social-ditectrev",
      icon: <SiUdemy className="udemy" size={iconSize} />,
    },
    {
      url: "https://x.com/ditectrev",
      icon: <SiX className="x" size={iconSize} />,
    },
  ];

  return (
    <footer>
      <div
        style={{ color: "white" }}
        className="mx-3 my-3 social-icons-container"
      >
        {socialMediaLinks.map((link, index) => (
          <a
            key={index}
            className="px-2"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${link.url}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
      <p className="text-white text-sm flex justify-center">
        &copy; {currentYear} Ditectrev
      </p>
    </footer>
  );
};

export default Footer;
