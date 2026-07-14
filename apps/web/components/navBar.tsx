"use client"

import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavBar() {
  return (
    <div className="w-full">
        <NavigationMenu  className={""}>
      <NavigationMenuList  className={"flex justify-between"}>
        <NavigationMenuItem className="cursor-pointer flex gap-2">
            <div className="text-2xl font-stretch-ultra-condensed font-bold ">status up</div>
            <Image src="/wifi.jpg" width={30} className="rounded-sm" height={30} alt={"logo"}/> 
        </NavigationMenuItem>
      <div className="flex gap-4"> 
         <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link className="text-lg bg-amber-600" href="/signup">Book a free trial</Link> } > </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink  render={<Link className="text-lg underline " href="/signin">Log In</Link>} />

        </NavigationMenuItem></div>
      </NavigationMenuList>
    </NavigationMenu>
    {/* <Link href={"#"} className="underline decoration-2 decoration-wavy">aa</Link> */}
    </div>
  )
}