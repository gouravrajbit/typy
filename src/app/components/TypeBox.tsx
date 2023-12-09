import { generate, count } from 'random-words';

export default function TypeBox() {
  const words: string[] = generate({ min: 20, max: 30 });

  const sentence: string = words.join(' ');

  return (
    <div className="mt-[30vh] font-mono text-2xl px-20">
      <p>{sentence}</p>
    </div>
  );
}
