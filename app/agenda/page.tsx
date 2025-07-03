export const dynamic = "force-static";

import Agenda from "@/app/agenda/agenda";
import { Container } from "@/components/container";
import { Text } from "@/components/text";
import { useSession } from "@/hooks/useSession";
import { Session, Stages, Tracks } from "@/model/session";

const AgendaPage = async () => {
  const sessions: Session[] = [
    {
      title: "Blockchain 101: The Historic Evolution of Blockchain",
      description:
        "Even though blockchains have been around for just a few years, many projects push the boundaries forward. We provide a short overview of the stepping-stone projects and various design choices to consider. Last, we contextualized many previous decades of research and how current systems are built on top of those experiences.",
      startTime: "2024-09-12T09:15:00+02:00",
      endTime: "2024-09-12T09:25:00+02:00",
      room: Stages[1],
      track: Tracks[0],
      isSpecialSession: true,
      type: "Talk",
      speakers: [
        {
          name: "Filip Rezabek",
          description: "PhD, TUM",
          priority: 2,
        },
      ],
    },
    {
      title: "New Forms of Money",
      description:
        "Overview on emerging DLT-based forms of money incl. Tokenized Deposits, Stablecoins and CBDCs.",
      startTime: "2024-09-12T11:00:00+02:00",
      endTime: "2024-09-12T12:00:00+02:00",
      room: Stages[2],
      track: Tracks[1],
      isSpecialSession: false,
      type: "Talk",
      speakers: [
        {
          name: "Maximilian Baum",
          description: "Digital Currencies, Deutsche Bank",
          priority: 1,
        },
      ],
    },
    {
      title: "Ethereum Protocol R&D Roadmap",
      description:
        "The talk explains the latest roadmap of Ethereum protocol development. It provides a technical dive into the current state of the protocol, recent and upcoming upgrades. We will dive into proposed solutions like PeerDAS, EOF, verkle trees and more.",
      startTime: "2024-09-12T11:00:00+02:00",
      endTime: "2024-09-12T12:00:00+02:00",
      room: Stages[3],
      track: Tracks[2],
      isSpecialSession: false,
      type: "Workshop",
      speakers: [
        {
          name: "Mario Havel",
          description: "Protocol Supporter, Ethereum Foundation",
          priority: 2,
        },
        {
          name: "David Kim",
          description: "Protocol Architect",
          priority: 3,
        },
      ],
    },
    {
      title: "Introduction to Regulation of Crypto Assets",
      description:
        "Alireza will present an Introduction to the Regulation of Crypto Assets, beginning with an overview of how crypto asset regulation has evolved from both a global and EU perspective. He will also explore the future direction of these regulations. The presentation will delve into the regulation of specific use cases and provide an in-depth discussion on the regulation of decentralized finance (DeFi).",
      startTime: "2024-09-13T10:30:00+02:00",
      endTime: "2024-09-13T11:30:00+02:00",
      room: Stages[3],
      track: Tracks[3],
      isSpecialSession: false,
      type: "Talk",
      speakers: [
        {
          name: "Alireza Siadat",
          description: "Crypto & DLT Advisor",
          priority: 2,
        },
      ],
    },
    {
      title:
        "Enhancing Smart Contract Security through AI: Promises and Limitations",
      description:
        "This talk explores the potential of AI in advancing DeFi security. We'll examine how AI can guide fuzzers to uncover smart contract vulnerabilities and work towards real-time detection of exploit transactions. While AI offers exciting possibilities, it's not a silver bullet. We'll balance the discussion by highlighting areas where traditional approaches may still have an edge, providing a comprehensive view of the current state and future potential of AI in DeFi security.",
      startTime: "2024-09-13T10:30:00+02:00",
      endTime: "2024-09-13T11:30:00+02:00",
      room: Stages[0],
      track: Tracks[4],
      isSpecialSession: true,
      type: "Talk",
      speakers: [
        {
          name: "Arthur Gervais",
          description: "Prof. of Information Security, UCL & Co-Founder, D23E",
          priority: 2,
        },
      ],
    },
    {
      title:
        "Deanonymizing Ethereum Validators: The P2P Network Has a Privacy Issue",
      description:
        "This presentation reveals how easily validators can be deanonymized in the Ethereum P2P network. We explore extracted data such as validator distribution and geolocation, discuss associated security risks, and propose solutions to improve privacy.",
      startTime: "2024-09-13T10:30:00+02:00",
      endTime: "2024-09-13T11:30:00+02:00",
      room: Stages[3],
      track: Tracks[5],
      isSpecialSession: true,
      type: "Talk",
      speakers: [
        {
          name: "Yann Vonlanthen",
          description: "PhD student, ETH Zurich",
          priority: 2,
        },
      ],
    },
  ];

  return (
    <div className={"flex justify-center"}>
      <main className={"w-full h-full max-w-7xl pt-[25px] lg:pt-0 pb-40"}>
        <Container>
          <div className={"mt-[100px] md:mt-[20vh] z-10"}>
            <div className="flex items-center overflow-hidden h-30">
              <Text
                textType={"sub_hero"}
                className="text-gradient text-left text-top h-40"
              >
                Stay On Track With Our Agenda
              </Text>
            </div>
          </div>
          <Agenda sessions={sessions} />
        </Container>
      </main>
    </div>
  );
};

export default AgendaPage;
