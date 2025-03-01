import Image from "next/image";
import { Text } from "@/components/text";
import { Track } from "@/components/track";
import { Camera } from "lucide-react";

export const trackItems = [
  {
    title: "Education",
    img: "/tracks/graduation.svg",
    description: (
      <>
        Blockchain 101, Scaling 101, ZK 101, and DeFi 101. These are just some
        of the talks from our Education Track that help you get started in web3.
      </>
    ),
  },
  {
    title: "Applications",
    img: "/tracks/earth.svg",
    description: (
      <>
        Learn about the untapped potential of blockchain and cryptography in
        medicine, finance, identity, and more. From private AI-inference to
        secure voting, this track explores the real-world applications of web3.
      </>
    ),
  },
  {
    title: "Research",
    img: "/tracks/lab.svg",
    description: (
      <>
        Top researchers and experts present the state-of-the-art in Distributed
        Systems, Cryptography, Security, and Cryptoeconomics and where each
        field is heading.
      </>
    ),
  },
  {
    title: "Regulation",
    img: "/tracks/paragraph.svg",
    description: (
      <>
        Hear from legal experts and policy makers what businesses, builders, and
        users must know when navigating the legal landscape of web3. This track
        covers everything from compliance to crypto-taxes.
      </>
    ),
  },
  {
    title: "Ecosystem",
    img: "/tracks/ecosystem.svg",
    description: (
      <>
        Explore the blockchain ecosystem from protocols to corporates. Uncover
        diverse insights, future visions and connect with industry leaders.
      </>
    ),
  },
];

const Tracks = () => {
  return (
    <section className="w-full flex flex-col items-center" id="tracks">
      <Text textType={"sub_hero"} className="text-gradient text-center">
        Tracks
      </Text>
      <div className="md:flex justify-center md:gap-x-8 mt-20">
        <Track
          imageAlt="hat"
          imageSrc={trackItems[0].img}
          title={trackItems[0].title}
          desc={trackItems[0].description}
          dimension={70}
        />
        <Track
          imageAlt="globe"
          className="mt-10 md:mt-0"
          imageSrc={trackItems[1].img}
          title={trackItems[1].title}
          desc={trackItems[1].description}
          dimension={70}
        />
        <Track
          imageAlt="lab"
          className="mt-10 md:mt-0"
          imageSrc={trackItems[2].img}
          title={trackItems[2].title}
          desc={trackItems[2].description}
          dimension={70}
        />
      </div>
      <div className="md:flex justify-center md:gap-x-8 md:mt-20">
        <Track
          imageAlt="paragraph"
          className="mt-10 md:mt-0"
          imageSrc={trackItems[3].img}
          title={trackItems[3].title}
          desc={trackItems[3].description}
          dimension={70}
        />
        <Track
          imageAlt="objects"
          className="mt-10 md:mt-0"
          imageSrc={trackItems[4].img}
          title={trackItems[4].title}
          desc={trackItems[4].description}
          dimension={70}
        />
      </div>
    </section>
  );
};

export default Tracks;
