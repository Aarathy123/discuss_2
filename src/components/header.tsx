import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "./headerAuth";
import SearchInput from "./search-input";
import { Suspense } from "react";

export default function Header() {
  return (
    <Navbar className="shadow mb-6 justify-center w-full">
      <NavbarBrand>
        <Link href="/">
          <h1 className="text-2xl font-bold">Discuss</h1>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense fallback={<Skeleton className="w-full h-10" />}>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"><HeaderAuth /></NavbarContent>
    </Navbar>
  );
}
