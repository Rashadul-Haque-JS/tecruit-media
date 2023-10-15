import { faTags,faBolt,faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const smartCardData = [
  {
    id: "sm1",
    title: "UI/UX Review",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "Read More",
    link: "http://tech-beach.com",
    icon:faPaperPlane,
    flipIcon: "horizontal",
  },
  {
    id: "sm2",
    title: "Awesome Features",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "Discover More",
    link: "http://tecruit-beach.com",
    icon: faBolt,
    flipIcon: false,
  },
  {
    id: "sm3",
    title: "Special Offer",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "Claim Offer",
    link: "http://it-beach.com",
    icon: faTags,
    flipIcon: false,
  },
];

export default smartCardData;
