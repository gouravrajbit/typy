'use client';
import { generate, count } from 'random-words';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Letter } from '../types/Letter';

const processSentence = (sentence: string) => {
  const chars: string[] = sentence.split('');
  const letterArray: Letter[] = chars.map((char, idx) => ({
    value: char,
    typed: false,
    position: idx,
    correct: false
  }));

  return letterArray;
};

function textStyler(letters: Letter[]) {
  return (
    <div>
      {letters.map((letter: Letter, idx: number) => (
        <span
          key={idx}
          style={{
            color: letter.typed ? (letter.correct ? 'green' : 'red') : 'white'
          }}
        >
          {letter.value}
        </span>
      ))}
    </div>
  );
}

export default function TypeBox() {
  const generateSentence = () => {
    const words: string[] = generate({ min: 20, max: 30 });
    const sentence: string = words.join(' ');
    console.log('in the making ->' + sentence);
    return sentence;
  };

  const [sentence, setSentence] = useState<string>('');
  const [written, setWritten] = useState<string>('');
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    setSentence(() => {
      const framedSentence = generateSentence();
      setLetters(processSentence(framedSentence));
      return framedSentence;
    });

    console.log('sent' + sentence.length);

    console.log('letter' + letters);
  }, []);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const typedLength = value.length;

    if (value.length === sentence.length) {
      setSentence(generateSentence());
      setWritten('');
    } else {
      setLetters((oldLetters) => {
        return oldLetters.map((letter, idx) => {
          if (letter.position < typedLength) {
            const newLetter = {
              ...letter,
              typed: true,
              correct: value[idx] === letter.value
            };

            return newLetter;
          }

          return letter;
        });
      });
    }

    setWritten(event.target.value);
  };

  return (
    <div className="mt-[30vh] font-mono text-2xl px-20">
      {textStyler(letters)}

      <input
        className="text-black"
        type="text"
        value={written}
        onChange={inputHandler}
        autoFocus
      />
    </div>
  );
}
