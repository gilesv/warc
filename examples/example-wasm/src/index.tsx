export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any
    }
  }
}

// @ts-ignore
import("fusion-wasm").then(({ default: Fusion }: any) => {
  function Note(props: any) {
    return <note-name className="note">✅ {props.name}</note-name>
  };

  function App(props: any) {
    const notes = props.notes;

    return (
      <main>
        <h2>Melhores séries</h2>
        {
          notes.map((name: string) =>{
            return <Note name={name} />
          })
        }
        <status>it's {props.status}</status>
      </main>
    );
  }

  let notes = [
    "Cobra Kai",
    "Dark",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
    "Game of Thrones",
  ];

  Fusion.render(<App status="WORKING" notes={notes} />, document.getElementById("root") as any);
  
  setTimeout(() => {
    notes.push("Jane the virgin");
    Fusion.render(<App status="UPDATING" notes={notes} />, document.getElementById("root") as any);
  }, 5000);
});
