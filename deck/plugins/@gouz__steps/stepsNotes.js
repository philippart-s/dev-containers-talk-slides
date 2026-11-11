const checkStepConditions = () =>
    [...document.querySelector("#sd-sv-current .sd-slide").classList].includes(
        "steps",
    );

window.slidesk.prepareSteps = () => {
    if (checkStepConditions()) {
        window.slidesk.step = 0;
        window.slidesk.$lis = document.querySelectorAll("#sd-sv-current .sd-slide li");
        [...window.slidesk.$lis].forEach((li, _) =>
            li.classList.remove("step-shown"),
        );
    }
};

window.slidesk.nextStep = (data) => {
    window.slidesk.$lis[data.payload].classList.add("step-shown");
}