"use client";

import { Button } from "@/components/button";
import { Link } from "@/components/link";
import { Text } from "@/components/text";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type HeaderElement = React.ElementRef<"header">;
export type HeaderProps = React.ComponentPropsWithoutRef<"header"> & {
  logoUrl?: string;
};

type HeaderLink = {
  label: string;
  link: string;
  showsAtHome: boolean;
};

const links: HeaderLink[] = [
  // { label: "Home", link: "/", showsAtHome: false },
  { label: "Manifesto", link: "#manifesto", showsAtHome: true },
  // { label: "Speakers", link: "/speakers", showsAtHome: true },
  { label: "Sponsors", link: "#sponsors", showsAtHome: true },
  // { label: "Side Events", link: "/side-events", showsAtHome: true },
  // { label: "Agenda", link: "/agenda", showsAtHome: true },
  // { label: "Workshops", link: "/workshops", showsAtHome: true },
  // { label: "Student Grants", link: "#grants", showsAtHome: true },
  // { label: "FAQ", link: "#faq", showsAtHome: true },
];

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathName = usePathname();

  return (
    <div
      className={classNames(
        "fixed inset-0 z-[9999] transition-transform transform",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen,
        },
      )}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-64 bg-black p-6 shadow-lg">
        <Cross1Icon
          height={25}
          width={25}
          onClick={onClose}
          className="mb-8"
        ></Cross1Icon>
        <nav className="flex flex-col gap-8">
          {links.map((link) => {
            // Skip "Home" link if we're already on home page
            if (link.label === "Home" && pathName === "/") return null;

            // Only show links marked for home page when on home page
            if (link.link.startsWith("#") && pathName !== "/") return null;

            // Only show links that should appear on the current page
            if (
              link.showsAtHome &&
              pathName !== "/" &&
              !link.link.startsWith("/")
            )
              return null;

            return (
              <Text asChild key={link.label}>
                <Link href={link.link}>{link.label}</Link>
              </Text>
            );
          })}
          <Button buttonType={"primary"} disabled>
            Tickets
          </Button>
        </nav>
      </div>
    </div>
  );
};

export const Header = React.forwardRef<HeaderElement, HeaderProps>(
  (props, ref) => {
    const { className, logoUrl, ...propRest } = props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const handleSidebarClose = () => setIsSidebarOpen(false);
    const pathName = usePathname();

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
      <>
        <header
          {...propRest}
          className={classNames(
            className,
            "fixed z-[9999] w-full py-4 flex justify-center items-center px-6 md:px-12 lg:px-24 transition-all duration-300",
            {
              "dark:bg-black/50 backdrop-blur-md": isScrolled,
              "bg-transparent": !isScrolled,
            },
          )}
          ref={ref}
        >
          <div className={"max-w-7xl w-full flex justify-between items-center"}>
            <div className={"w-11 lg:w-16"}>
              <NextLink href={"/"}>
                <Image
                  src={logoUrl || "/logos/tbc-conference-logo.png"}
                  alt={"TUM Blockchain Conference 2024 Logo"}
                  className={"transition-all duration-300"}
                  width={isScrolled ? 48 : 64}
                  height={isScrolled ? 48 : 64}
                />
              </NextLink>
            </div>
            <nav
              className={
                "hidden sm:flex h-full justify-center gap-8 items-center"
              }
            >
              {links.map((link) => {
                // Skip "Home" link if we're already on home page
                if (link.label === "Home" && pathName === "/") return null;

                // Only show links marked for home page when on home page
                if (link.link.startsWith("#") && pathName !== "/") return null;

                // Only show links that should appear on the current page
                if (
                  link.showsAtHome &&
                  pathName !== "/" &&
                  !link.link.startsWith("/")
                )
                  return null;

                return (
                  <Text asChild key={link.label}>
                    <Link
                      href={link.link}
                      className={
                        link.label === "Side Events" ? "text-center" : ""
                      }
                    >
                      {link.label === "Student Grants" ? "Grants" : link.label}
                    </Link>
                  </Text>
                );
              })}
              <Button disabled>Tickets</Button>
            </nav>
            <div className="md:hidden py-2 px-4">
              <HamburgerMenuIcon
                height={"25"}
                width={"25"}
                onClick={() => setIsSidebarOpen(true)}
              />
            </div>
          </div>
        </header>
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      </>
    );
  },
);
Header.displayName = "Header";

/*

<Button buttonType={"cta"} data-tally-open="wAlAek" data-tally-emoji-text="👋" data-tally-emoji-animation="wave" data-tally-auto-close="2000">
                Join waitlist
            </Button>

            */
