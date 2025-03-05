import { Text } from "@/components/text";

const Manifesto = () => {
  return (
    <section className="w-full flex justify-center items-center" id="manifesto">
      <div className={"w-full flex flex-col gap-12 lg:gap-20 px-2 lg:px-0"}>
        <div className={"w-full flex justify-center"}>
          <Text textType={"sub_hero"} className="text-gradient">
            Manifesto
          </Text>
        </div>
        <div className="w-full flex justify-center">
          <Text
            as={"p"}
            className="text-center lg:text-left md:text-left max-w-[80%] sm:max-w-[42rem]"
          >
            Web3 marks a fundamental shift in digital trust and connectivity,
            transcending industries and borders—yet{" "}
            <b>ecosystem fragmentation</b> persists.
            <br />
            <br />
            At the 3rd TUM Blockchain Conference, developers, policymakers,
            academics, and leaders unite to break down these silos.
            <br />
            <br />
            Together, we’ll explore decentralized solutions for societal,
            environmental, and technological progress, integrating AI, IoT, and
            other emerging technologies to redefine Web3’s future in a
            non-profit setting.
            <br />
            <br />
            Through talks, panels, workshops, and real-world showcases, we’ll{" "}
            <b>bridge education, research, regulation, and ecosystems</b> to
            unlock transformative applications in finance, governance, and
            sustainability.
            <br />
            <br />
            Our mission is clear: unify decentralized systems, foster
            interoperability, and empower actionable change for a
            connected world.
          </Text>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
