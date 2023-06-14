
//Q13 doubt
const Jkl = () => {
    let qwe = { ert: 6 };
    const wer = (ewq) => console.log(ewq.ert);
    return (
      <div>
        <button onClick={() => wer({ ...qwe, ert: qwe.ert + 1 })}>Lvp</button>
        <button onClick={() => wer({ ...qwe, ert: qwe.ert - 3 })}>Poi</button>
      </div>
    );
  };

  export default Jkl;