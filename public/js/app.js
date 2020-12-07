const ui = new UI();
const ft = new Fetch();

//add event listeners

const search = document.getElementById("city");
const button = document.getElementById("submit");


function togglePopup(){
    //document.getElementById("content").style.display = "block";
    //document.getElementById("buttonBack").style.display = "block";
    const currentVal = search.value;

   ft.getCurrent(currentVal).then((data) => {

      ui.populate(data);

    });

    displayPopup();
}

function disPopup(){
    document.getElementById("content").style.display = "none";
    document.getElementById("buttonBack").style.display = "none";
}

function displayPopup() {
  document.getElementById("popup-1").classList.toggle("active");
}
