import TypeBox from './components/TypeBox';

export default function Home() {
  return (
    <div className="bg-purple-700 h-[100vh]">
      <header>
        <h1 className="font-mono text-2xl pt-10 font-extrabold text-center">
          typy _/
        </h1>
      </header>
      <main>
        <TypeBox />
      </main>
      <footer></footer>
    </div>
  );
}
