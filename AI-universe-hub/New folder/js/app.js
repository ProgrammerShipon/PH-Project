// Initialize Value
let dataInitialize = 0;

// Loading Spinner call On
loadingSpinner(true);

// Loading Spinner
function loadingSpinner(isLoading) {
  const loadingEle = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingEle.classList.remove("hidden");
  } else {
    loadingEle.classList.add("hidden");
  }
}

// Main Data Load
async function mainDataLoad(dataLimit) {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status) {
      showDisplayData(data.data.tools, dataLimit);
    } else {
      console.log("Data Not Fount!! ");
    }
  } catch (err) {
    console.log(err);
  }
}

// Main Data Display
function showDisplayData(data, dataLimit) {
  const cardContainer = document.getElementById("cardItemsContainer");
  cardContainer.innerHTML = "";

  // Sorting Check
  if (typeof dataLimit === "string") {
    let sorting;

    // Ascending List
    if (dataLimit === "ascending") {
      sorting = dataInitialize.sort(
        (a, b) => new Date(a.published_in) - new Date(b.published_in)
      );

      // Descending List
    } else if (dataLimit === "descending") {
      sorting = dataInitialize.sort(
        (a, b) => new Date(b.published_in) - new Date(a.published_in)
      );
    } else {
      console.log("Give me Sorting Value and Create Function");
    }

    dataInitialize = sorting;
  } else {
    // Data & All Button Show conditions
    if (dataLimit && data.length > dataLimit) {
      dataInitialize = data.slice(0, dataLimit);
      document.getElementById("showAllBtn").classList.remove("hidden");
    } else {
      dataInitialize = data;
      document.getElementById("showAllBtn").classList.add("hidden");
    }
  }

  if (data.length === dataInitialize.length) {
    document.getElementById("showAllBtn").classList.add("hidden");
  }

  dataInitialize.forEach((singleAi) => {
    const { image, name, published_in, features, id } = singleAi;

    // new Cart
    const card = `
          <div class="card bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
              <img src="${image}" alt="${name}" class="rounded-xl" />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-3xl">Features</h2>
              <ol id="featuresList" class="list-decimal pl-4">
                ${oderListCreate(features)}
              </ol>
              <hr class="border border-gray-200 my-4 w-full" />
              <div class="text-left">
                <div>
                  <div class="flex justify-between">
                    <div>
                      <div class="font-bold">${name}</div>
                      <div class="text-sm opacity-90">${published_in}</div>
                    </div>
                    <div class="w-14">
                      <label for="showCardDetails" onclick="loadDetailsID('${id}')" class="cursor-pointer"><img
                        src="./img/icons/arrow-sing.png"
                        class="w-full cursor-pointer"
                      /></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;

    // display card
    cardContainer.innerHTML += card;
  });

  // Loading Spinner call Off
  loadingSpinner(false);
}

// Features Create li
function oderListCreate(listItems) {
  let listItem = "";
  if (!listItems) {
    return "No Data Found !";
  } else {
    listItems.forEach((lis) => {
      listItem += `<li> ${lis} </li>`;
    });
    return listItem;
  }
}

// Show All Data
function showAllData() {
  // Loading Spinner call On
  loadingSpinner(true);

  // Main Data Show
  mainDataLoad();
}

// Details Data load
async function loadDetailsID(id) {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.status) {
      displayData(data.data);
    } else {
      console.log("Data Not Fount!! ");
    }
  } catch (err) {
    console.log(err);
  }
}

// Display Data
function displayData(data) {
  const {
    pricing,
    features,
    accuracy,
    image_link,
    description,
    integrations,
    input_output_examples,
  } = data;

  const detailsContainer = document.getElementById("DetailsContainer");

  const detailsElements = `
    <div id="modalContainer">
      <label
        for="showCardDetails"
        class="-right-4 -top-4 absolute bg-[#EB5757] border-0 btn btn-circle btn-sm"
        >✕</label>
      <div class="p-10 max-h-[90vh] overflow-scroll">
        <div class="gap-8 md:flex md:flex-row-reverse">
          <div class="container mx-auto border md:w-1/2 p-6 relative">
              ${
                accuracy?.score
                  ? '<span class="absolute bg-[#EB5757] p-1 right-8 rounded-lg shadow-lg text-white top-8">' +
                    accuracy?.score * 100 +
                    "% accuracy </span>"
                  : ""
              }
            <figure class="">
              <img
                class="rounded-lg w-full"
                src="${image_link[0]}"
                alt=""
              />
            </figure>
            <div class="text-center">
              <h2 class="font-bold my-4 text-2xl text-[#111111]">
                ${
                  input_output_examples
                    ? input_output_examples[0]?.input
                    : "Can you give any example?"
                }
              </h2>
              <p class="text-[#585858] text-lg">
                ${
                  input_output_examples
                    ? input_output_examples[0]?.output
                    : "No! Not Yet! Take a break!!!"
                }
              </p>
            </div>
          </div>
          <div
            class="bg-red-50 border border-red-500 card-body md:w-1/2 rounded-lg" >
            <h2 class="card-title">
              ${description ? description : "No Description Found"}
            </h2>
            <div
              class="-right-4 gap-8 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 my-4 text-center"
            >
              <div class="font-semibold text-[#03A30A] text-lg">
                <h3>
                  ${pricing ? pricing[0]?.price : "Free of cost Basic"}, 
                  ${pricing ? pricing[0]?.plan : " "}
                </h3>
              </div>
              <div class="font-semibold text-[#F28927] text-lg">
                <h3>
                  ${pricing ? pricing[1]?.price : "Free of cost Basic"}, 
                  ${pricing ? pricing[1]?.plan : " "}
                </h3>
              </div>
              <div class="font-semibold text-[#EB5757] text-lg">
                <h3>
                  ${pricing ? pricing[2]?.price : "Free of cost Basic"}, 
                  ${pricing ? pricing[2]?.plan : " "}
                </h3>
              </div>
            </div>
            <div class="lg:flex lg:gap-3">
              <div class="lg:w-1/2 w-full" >
                <h1 class="font-semibold text-2xl">Features</h1>
                <ul class="list-disc pl-6 text-[#585858]">
                  <li>${
                    features[1]?.feature_name
                      ? features[1]?.feature_name
                      : "No data found"
                  }</li>
                  <li>${
                    features[2]?.feature_name
                      ? features[2]?.feature_name
                      : "No data found"
                  }</li>
                  <li>${
                    features[3]?.feature_name
                      ? features[3]?.feature_name
                      : "No data found"
                  }</li>
                </ul>
              </div>
              <div class="w-full lg:w-1/2">
                <h1 class="font-semibold text-2xl">Integrations</h1>
                <ul class="list-disc pl-6 text-[#585858]">
                ${oderListCreate(integrations)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // set or Display Pop
  detailsContainer.innerHTML = detailsElements;
}

// Sorting S
const sorting = (value) => {
  mainDataLoad(value);
};

// Main Data Show
mainDataLoad(6);
