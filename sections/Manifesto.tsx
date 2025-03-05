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
            Web3 is more than a buzzword; it’s a fundamental shift in how we
            trust, transact, and connect in a digital world. Similarly,
            blockchain technology isn’t just about financial gains—it’s about
            creating progress that transcends borders, industries, and silos.
            Yet, fragmentation within the ecosystem remains a challenge.
            <br />
            <br />
            At the 3rd edition of the TUM Blockchain Conference, we aim to break
            down these silos. Together, we’ll explore how decentralized
            solutions are driving societal, environmental, and technological
            change, while examining the role of AI and other emerging
            technologies in shaping the future of Web3.
            <br />
            <br />
            This year, we are bringing together visionaries: developers,
            policymakers, academics, industry leaders, and legal experts to
            bridge divides across industries and geographies. Together, we’ll
            pave the way for an integrated and interoperable Web3 ecosystem.
            <br />
            <br />
            Building on our five core tracks—Education, Research, Ecosystem,
            Applications, and Regulation—this year’s conference emphasizes
            integration and impact. We’ll dive into how Web3 converges with AI,
            IoT, and other technologies, unlocking transformative use cases in
            finance, governance, sustainability, and beyond.
            <br />
            <br />
            Through a mix of thought-provoking panels, talks, hands-on
            workshops, and use-case showcases, we’re not just discussing
            Web3—we’re building its future.
            <br />
            <br />
            Our goal is clear: to unify fragmented ecosystems, empower
            individuals to create meaningful change, and redefine what’s
            possible in a decentralized, interoperable world.
          </Text>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
