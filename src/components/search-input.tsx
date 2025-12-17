"use client";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

interface SearchInputProps {
  onSearch?: (search: string) => void;
  placeholder?: string;
  value?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = "Search",
  value,
}: SearchInputProps) {
  const [search, setSearch] = useState(value);
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("term");

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.currentTarget.value);
    onSearch?.(e.currentTarget.value);
  };
  return (
    <form action={actions.searchAction}>
      <Input
        name="term"
        defaultValue={initialSearch ?? undefined}
        placeholder={placeholder}
        value={search}
        onChange={handleSearch}
      />
    </form>
  );
}
