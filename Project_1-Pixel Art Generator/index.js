let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        mobe: "touchmove",
        up: "touchend",
    },
};

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent"); // thêm sự kiện cảm ứng nếu báo lỗi sẽ dùng chuột
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

// duyệt xem chỗ nào cần vẽ lển
function checker(elementId) {
    let gridColumns = document.querySelectorAll(".gridCol");
    gridColumns.forEach((element) => {
        if (elementId == element.id) {
            if (draw && !erase) {
                element.style.backgroundColor = colorButton.value;
            } else if (draw && erase) {
                element.style.backgroundColor = "transparent";
            }
        }
    });
}

let draw = false;
let erase = false;

gridButton.addEventListener("click", () => {
    container.innerHTML = "";
    let count = 0;
    for (let i = 0; i < gridHeight.value; i++) {
        count += 2;
        let div = document.createElement("div");
        div.classList.add("gridRow");
        for (let j = 0; j < gridWidth.value; j++) {
            count += 2;
            let col = document.createElement("div");
            col.classList.add("gridCol");
            col.setAttribute("id", `gridCol${count}`);

            col.addEventListener(events[deviceType].down, () => { // khi mà nhấn chuột xuống 
                draw = true;
                if (erase)
                    col.style.backgroundColor = "transparent";
                else
                    col.style.backgroundColor = colorButton.value;
            });

            col.addEventListener(events[deviceType].move, (e) => { //khi mà chuột di chuyển
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, () => {//khi bỏ giữ chuột
                draw = false;
            });

            div.appendChild(col);
        }
        container.appendChild(div);
    }
});


clearGridButton.addEventListener("click", () => {container.innerHTML = "";});

eraseBtn.addEventListener("click", () => {erase = true;});

paintBtn.addEventListener("click", () => {erase = false;});

gridHeight.addEventListener("input", () => {
    heightValue.innerHTML = (gridHeight.value > 9)? gridHeight.value: `0${gridHeight.value}`;
});

gridWidth.addEventListener("input", () => {
    widthValue.innerHTML = (gridWidth.value > 9)? gridWidth.value: `0${gridWidth.value}`;
});

window.onload = () => {
    gridHeight.value = 0;
    gridWidth.value = 0;
};