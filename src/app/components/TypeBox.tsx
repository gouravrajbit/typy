'use client';
import { generate, count } from 'random-words';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
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
          className={letter.active ? 'underline underline-offset-2' : ''}
        >
          {letter.value}
        </span>
      ))}
    </div>
  );
}

export default function TypeBox() {
  const generateSentence = () => {
    const words: string[] = generate({ min: 28, max: 30 });
    const sentence: string = words.join(' ');
    console.log('in the making ->' + sentence);
    return sentence;
  };

  const [sentence, setSentence] = useState<string>('');
  const [written, setWritten] = useState<string>('');
  const [letters, setLetters] = useState<Letter[]>([]);

  const freshen = () => {
    setSentence(() => {
      const framedSentence = generateSentence();
      setLetters(processSentence(framedSentence));
      setWritten('');
      return framedSentence;
    });
  };

  useEffect(() => {
    freshen();
  }, []);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const typedLength = value.length;

    if (value.length === sentence.length) {
      freshen();
    } else {
      setLetters((oldLetters) => {
        return oldLetters.map((letter, idx) => {
          let newLetter = Object.assign({}, letter);
          if (letter.position < typedLength) {
            newLetter = {
              ...letter,
              typed: true,
              correct: value[idx] === letter.value,
              active: false
            };
          } else if (letter.position === typedLength) {
            newLetter.active = true;
          }

          return newLetter;
        });
      });
    }

    setWritten(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Function to focus on the input
  const focusInput = () => {
    // Check if the ref is available before calling focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="mt-[27vh] font-mono text-2xl w-[70%] mx-auto leading-loose"
      onClick={focusInput}
    >
      {textStyler(letters)}

      <input
        ref={inputRef}
        className="text-black"
        style={{ opacity: '0' }}
        type="text"
        value={written}
        onChange={inputHandler}
        autoFocus
      />
    </div>
  );
}
