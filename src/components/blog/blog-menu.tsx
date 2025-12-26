"use client"

import * as React from "react"
import Link from "next/link"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function BlogMenu() {
  const isMobile = useIsMobile()

  return (
    <nav className="flex justify-end pr-36">

      <NavigationMenu viewport={isMobile}>
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/*<NavigationMenuItem className="hidden md:block ">
            <NavigationMenuTrigger>News</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">Tech</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">World</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Brazil</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>*/}
        </NavigationMenuList>
      </NavigationMenu> 
    </nav>

  )
}
