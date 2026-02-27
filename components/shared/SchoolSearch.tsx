"use client";

import { useEffect, useRef, useState } from "react";

const SCHOOLS = [
  // Waterloo always first
  "University of Waterloo",
  // Ontario
  "University of Toronto",
  "Western University",
  "McMaster University",
  "Queen's University",
  "Wilfrid Laurier University",
  "Toronto Metropolitan University",
  "York University",
  "University of Ottawa",
  "Carleton University",
  "University of Guelph",
  "Brock University",
  "Ontario Tech University",
  // Other Canada
  "UBC",
  "McGill University",
  "Concordia University",
  "University of Alberta",
  "University of Calgary",
  "University of Victoria",
  "Simon Fraser University",
  "Dalhousie University",
  "University of Manitoba",
  "University of Saskatchewan",
  "University of New Brunswick",
  "Memorial University",
  // USA — Ivy / Elite
  "MIT",
  "Stanford University",
  "Harvard University",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "Cornell University",
  "University of Pennsylvania",
  "Dartmouth College",
  "Brown University",
  // USA — Top Engineering / CS
  "Carnegie Mellon University",
  "Georgia Tech",
  "Caltech",
  "University of Illinois Urbana-Champaign",
  "Purdue University",
  "University of Michigan",
  "University of Texas at Austin",
  "UC Berkeley",
  "UCLA",
  "UC San Diego",
  "University of Washington",
  "University of Wisconsin-Madison",
  // USA — Other popular
  "Duke University",
  "Johns Hopkins University",
  "Northwestern University",
  "NYU",
  "Boston University",
  "University of Southern California",
  "Ohio State University",
  "Penn State",
  "University of Virginia",
  "University of North Carolina",
  "University of Florida",
  "University of Maryland",
  "Arizona State University",
  "University of Arizona",
  "Michigan State University",
  "Northeastern University",
  "Rutgers University",
  "Virginia Tech",
  "University of Minnesota",
  "Indiana University",
  // Other
  "Other",
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SchoolSearch({ value, onChange }: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered =
    query.trim() === ""
      ? SCHOOLS
      : SCHOOLS.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        // If they typed something not in the list, clear it
        if (!SCHOOLS.includes(query)) {
          setQuery(value);
        }
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [query, value]);

  function select(school: string) {
    onChange(school);
    setQuery(school);
    setOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
    if (e.target.value === "") {
      onChange("");
    }
  }

  function handleClear() {
    setQuery("");
    onChange("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          placeholder="School (optional) — search or browse"
          className="w-full px-4 py-2.5 pr-8 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Clear"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl max-h-48 overflow-y-auto text-sm">
          {filtered.map((school) => (
            <li key={school}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); select(school); }}
                className={`w-full text-left px-4 py-2 transition-colors ${
                  school === value
                    ? "text-yellow-400 bg-zinc-800"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                {school === "University of Waterloo" ? (
                  <span>
                    {school}
                    <span className="ml-2 text-zinc-600 text-xs">✦</span>
                  </span>
                ) : school}
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-2 text-zinc-600">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
