import { Text } from "@/components/text";
import { Button } from "@/components/button";
import { Link } from "@/components/link";

const AcademicForum = () => {
  return (
    <section
      className="w-full flex justify-center items-center"
      id="Academic Forum"
    >
      <div className={"w-full flex flex-col gap-8 lg:gap-12 px-2 lg:px-0"}>
        <div className={"w-full flex justify-center"}>
          <Text textType={"sub_hero"} className="text-gradient text-center">
            Academic Forum
          </Text>
        </div>
        <div className="w-full flex justify-center">
          <Text as={"p"} className="text-left sm:max-w-[42rem]">
            We are delighted to announce the <b>Call for Extended Abstracts</b>{" "}
            for the academic forum at the 2025 TUM Blockchain Conference. This
            forum is part of the research track and hosted in collaboration with
            the TUM Chair of Network Architectures and Services.
            <br />
            <br />
            We invite researchers, academics, and industry professionals to
            present their latest work in the topics related to the Science of
            Blockchains.
          </Text>
        </div>
        <div className="w-full flex justify-center">
          <Link
              href={
                "https://apply.tum-blockchain.com/r/m6YOrA"
              }
            >
            <Button buttonType={"cta"} className="mt-6">
              Submit Abstract
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AcademicForum;
