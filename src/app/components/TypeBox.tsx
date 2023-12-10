'use client';
import { generate, count } from 'random-words';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

export default function TypeBox() {
  const generateSentence = () => {
    const words: string[] = generate({ min: 20, max: 30 });
    const sentence: string = words.join(' ');
    return sentence;
  };

  const [sentence, setSentence] = useState<string>('');
  const [written, setWritten] = useState<string>('');

  useEffect(() => {
    setSentence(generateSentence());
  }, []);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    if (value.length === sentence.length) {
      setSentence(generateSentence());
      setWritten('');
    } else {
      setWritten(event.target.value);
    }
  };

  return (
    <div className="mt-[30vh] font-mono text-2xl px-20">
      <p>{sentence}</p>

      <input
        className="text-black"
        type="text"
        value={written}
        onChange={inputHandler}
      />
    </div>
  );
}
