import { faTags,faBolt,faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const smartCardData = [
  {
    id: "sm1",
    title: "UI/UX Review",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "Read More",
    link: "/tecruit-ui-ux",
    icon:faPaperPlane,
    flipIcon: "horizontal",
  },
  {
    id: "sm2",
    title: "Awesome Features",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "Discover More",
    link: "/tecruit-feature",
    icon: faBolt,
    flipIcon: false,
  },
  {
    id: "sm3",
    title: "Special Offer",
    description:
      "Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    buttonText: "Claim Offer",
    link: "/tecruit-offer",
    icon: faTags,
    flipIcon: false,
  },
];

export default smartCardData;
