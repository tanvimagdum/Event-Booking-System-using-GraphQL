function Exam() {

    //Q9
    const w = ["ewq", "dsa", "asd", "tre", "zxc"]
    const r = w.find((a, b) => a === "tre")
    
    //Q18
    const qwe = 234
    const asd = 321
    const zxc = [321, qwe, 432, asd, 543]
    const [ewq, rew] = zxc
    console.log(ewq)
    console.log(rew)

    return (
        <div>
            r = {r}
        </div>
    );
}

export default Exam;