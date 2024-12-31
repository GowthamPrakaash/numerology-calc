"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const NumerologyCalculator = () => {
  const [name, setName] = useState("");
  interface CalculationResults {
    nameNumber: number;
    pyramidStages: number[][];
    letterCalculations: { letter: string; value: number }[];
  }

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  type LetterMap = { [key: string]: number };
  // Letter to number mapping
  const letterValues: LetterMap = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 8,
    G: 3,
    H: 5,
    I: 1,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 7,
    P: 8,
    Q: 1,
    R: 2,
    S: 3,
    T: 4,
    U: 6,
    V: 6,
    W: 6,
    X: 5,
    Y: 1,
    Z: 7,
  };

  // Calculate name number
  const calculateNameNumber = (name: string) => {
    return name
      .toUpperCase()
      .split("")
      .filter((char: string) => letterValues[char])
      .reduce((sum: number, char: string) => sum + letterValues[char], 0);
  };

  // Calculate pyramid stages
  const calculatePyramidStages = (name: string) => {
    const numbers = name
      .toUpperCase()
      .split("")
      .filter((char: string) => letterValues[char])
      .map((char: string) => letterValues[char]);

    const stages = [numbers];
    let currentArray = numbers;

    while (currentArray.length > 2) {
      const newArray = [];
      for (let i = 0; i < currentArray.length - 1; i++) {
        const sum = currentArray[i] + currentArray[i + 1];
        newArray.push(
          sum > 9
            ? Number(
                String(sum)
                  .split("")
                  .reduce((a, b) => Number(a) + Number(b), 0)
              )
            : sum
        );
      }
      stages.push(newArray);
      currentArray = newArray;
    }

    return stages;
  };

  const handleCalculate = async () => {
    if (!name.trim()) return;

    setIsCalculating(true);
    setResults(null);

    // Simulate calculation delay for animation
    await new Promise((resolve) => setTimeout(resolve, 600));

    const nameNumber = calculateNameNumber(name);
    const pyramidStages = calculatePyramidStages(name);

    setResults({
      nameNumber,
      pyramidStages,
      letterCalculations: name
        .toUpperCase()
        .split("")
        .filter((char) => letterValues[char])
        .map((char) => ({ letter: char, value: letterValues[char] })),
    });

    setIsCalculating(false);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Numerology Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a name..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleCalculate()}
              />
              <Button
                onClick={handleCalculate}
                disabled={!name.trim() || isCalculating}
                className={`transition-all duration-300 ${
                  isCalculating ? "animate-pulse" : ""
                }`}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate
              </Button>
            </div>
          </div>

          {results && (
            <div className="space-y-4 animate-[fadeIn_0.5s_ease-in]">
              <div className="p-4 bg-slate-100 rounded-lg transition-all duration-300 hover:shadow-md">
                <h3 className="font-semibold mb-2">
                  Name Number: {results.nameNumber}
                </h3>
                <div className="text-sm flex flex-wrap gap-2">
                  {results.letterCalculations.map(
                    (
                      { letter, value }: { letter: string; value: number },
                      i: number
                    ) => (
                      <span
                        key={i}
                        className="bg-white px-2 py-1 rounded"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {letter}={value}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-100 rounded-lg transition-all duration-300 hover:shadow-md">
                <h3 className="font-semibold mb-2">
                  Pyramid Number:{" "}
                  {results.pyramidStages[results.pyramidStages.length - 1].join(
                    ""
                  )}
                </h3>
                <div className="space-y-2">
                  {results.pyramidStages.map((stage: number[], i: number) => (
                    <div
                      key={i}
                      className="flex justify-center"
                      style={{
                        animationDelay: `${i * 200}ms`,
                        animation: "fadeInUp 0.5s ease-in forwards",
                      }}
                    >
                      <div className="bg-white px-3 py-1 rounded shadow-sm hover:shadow-md transition-shadow duration-300">
                        {stage.map((num: number, j: number) => (
                          <span
                            key={j}
                            className="mx-1 inline-block"
                            style={{
                              animationDelay: `${i * 200 + j * 100}ms`,
                              animation: "fadeIn 0.5s ease-in forwards",
                            }}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <style jsx global>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </CardContent>
      </Card>
    </div>
  );
};

export default NumerologyCalculator;
