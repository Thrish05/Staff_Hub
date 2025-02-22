"use client";
import { TypewriterEffectSmooth } from "./components/ui/typewriter-effect";

interface TypewriterEffectSmoothDemoProps {
  sentence: string;
  class_size: string;
}

interface WordObject {
  text: string;
  className?: string;
}

export function TypewriterEffectSmoothDemo({
  sentence,
  class_size,
}: TypewriterEffectSmoothDemoProps) {
  const words = sentence.split(" ");
  let words_final: WordObject[] = [];

  for (let i = 0; i < words.length; i++) {
    // Check if it's the last word
    if (i === words.length - 1) {
      words_final.push({
        text: words[i],
        className: "text-blue-500 dark:text-blue-500 text-[50px]",
      });
    } else {
      words_final.push({ text: words[i] });
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center ${class_size} text-[50px]`}>
      <TypewriterEffectSmooth words={words_final} />
    </div>
  );
}