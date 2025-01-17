"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { exCountries } from "@/lib/lib";

export default function Page() {
  const [countries, setCountries] = useState(exCountries);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [savedCountry, setSavedCountry] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("savedCountry");
    if (saved) {
      setSavedCountry(saved);
      setSelectedCountry(saved);
    }
  }, []);
  useEffect(() => {
    if (!isOpen && searchInput.length !== 0) setIsOpen(true);
  }, [searchInput, isOpen]);

  const filteredCountry = countries.filter((country) =>
    country.label.toLowerCase().includes(searchInput.toLowerCase())
  );
  const removeSelectedCountry = (value) => {
    setCountries((prevCountries) =>
      prevCountries.filter((country) => country.value !== value)
    );
    setIsOpen(false);
  };

  const handleSave = () => {
    if (selectedCountry) {
      sessionStorage.setItem("savedCountry", selectedCountry);
      setSavedCountry(selectedCountry);
    }
  };
  const deleteSavedItem = () => {
    sessionStorage.clear();
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-slate-100 text-black">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[300px]">
        <h1 className="text-xl font-semibold mb-4">Select country</h1>

        <div className="space-y-4">
          <div className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search country..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-2 border rounded-md hover:bg-slate-50 transition-colors"
              >
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-slate-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-600" />
                )}
              </button>
            </div>

            {isOpen && (
              <div className="absolute w-full mt-1 max-h-48 overflow-auto bg-white border rounded-md shadow-lg">
                {filteredCountry.map((country) => (
                  <button
                    key={country.value}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors"
                    onClick={(e) => {
                      setSelectedCountry(country.label);
                      setSearchInput(country.label);
                      removeSelectedCountry(country.value);
                      setIsOpen(false);
                    }}
                  >
                    {country.value}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSave}
            disabled={!selectedCountry}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            Save
          </button>

          {savedCountry && (
            <div className="mt-4 p-3 bg-slate-50 rounded-md flex justify-between">
              <div>
                <span className="text-slate-600">Saved country: </span>
                <span className="font-medium">{savedCountry}</span>
              </div>
              <button onClick={deleteSavedItem}>X</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
