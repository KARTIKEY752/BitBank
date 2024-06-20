import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function () {
    update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Submitted.");

    const button = event.target.querySelector("#submit-btn");


    const inputAmount = parseFloat(document.getElementById("input-amount").value);

    if (document.getElementById("input-amount").value.length != 0) {
        await dbank.topup(inputAmount);
    }

    const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);
    if (document.getElementById("withdrawal-amount") != 0) {
        await dbank.withdraw(outputAmount);
    }
    update()
    await dbank.compoundInterest();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";

    button.removeAttribute("disabled");

});
async function update() {
    const currentAmount = await dbank.checkbalance();
    document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}; 