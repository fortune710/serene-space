const moodIcons = document?.getElementsByClassName("mood-icon");

const dialog = document.getElementsByTagName("dialog")[0];
const resultDialog = document.getElementsByTagName("dialog")[1];


const positiveMoods = document.getElementById("postive-moods");
const negativeMoods = document.getElementById("negative-moods");
const moodTitle = document.getElementById("mood-title");
const moodScoreContainer = document.getElementById("mood-score");


let mainEmotion = "";
let positiveEmotions = ["happy", "proud", "calm", "confident", "content", "hopeful", "joyful", "excited", "grateful", "optimistic"];
let negativeEmotions = ["sad", "angry", "afraid", "ashamed", "disapointed", "lonely", "guilty", "nervous", "upset", "tired"];

let selectedEmotions = [];

for (let i = 0; i < moodIcons.length; i++) {
    const mood = document.getElementById(moodIcons.item(i).id);

    mood?.addEventListener('click', () => {
        mainEmotion = moodIcons.item(i).id;
        const text = document.createTextNode(mainEmotion);
        moodTitle.appendChild(text)


        positiveEmotions.map((emotion) => {
            const text = document.createTextNode(emotion)
            const chip = document.createElement("p") 
            chip.appendChild(text)
            chip.classList.add("mood-chip")

            chip?.addEventListener('click', () => {
                if(selectedEmotions.includes(emotion)) {
                    chip.classList.replace("mood-chip-selected", "mood-chip")
                } else if (selectedEmotions.length < 3) {
                    chip.classList.replace("mood-chip", "mood-chip-selected")
                }

                return pickEmotion(emotion)
            })

            positiveMoods?.appendChild(chip)
        })

        negativeEmotions.map((emotion) => {
            const text = document.createTextNode(emotion)
            const chip = document.createElement("p") 
            chip.appendChild(text)
            chip.classList.add("mood-chip")

            chip?.addEventListener('click', () => {
                if(selectedEmotions.includes(emotion)) {
                    chip.classList.replace("mood-chip-selected", "mood-chip")
                } else if (selectedEmotions.length < 3) {
                    chip.classList.replace("mood-chip", "mood-chip-selected")
                }
                return pickEmotion(emotion)
            })

            negativeMoods?.appendChild(chip)
        })

        dialog.showModal()
    })

}

const closeModal = () => {
    while (negativeMoods.firstChild) {
        negativeMoods.removeChild(negativeMoods.firstChild)
    }

    while (positiveMoods.firstChild) {
        positiveMoods.removeChild(positiveMoods.firstChild)
    }

    moodTitle.removeChild(moodTitle.firstChild)

    dialog.close()
}

const closeResultModal = () => {
    while (resultDialog.firstChild) {
        resultDialog.removeChild(resultDialog.firstChild)
    }

    selectedEmotions = []
    resultDialog.close()
}

const pickEmotion = (emotion) => {
    if(selectedEmotions.includes(emotion)) {
        const remainingEmotions = selectedEmotions.filter((value) => value !== emotion);
        selectedEmotions = remainingEmotions
        return
    }

    if(selectedEmotions.length === 3) {
        return alert("You can only select 3")
    }

    return selectedEmotions.push(emotion)
}

const returnEmotionScore = () => {
    closeModal()

    const result = distributeRandomly(selectedEmotions);
    const objectKeys = Object.keys(result);

    objectKeys.map((value) => {
        const div = document.createElement("div");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");

        const emotion = value;
        const score = result[value];

        const emotionText = document.createTextNode(emotion);
        const scoreText = document.createTextNode(score + "%");

        h3.appendChild(emotionText);
        h3.classList.add("text-transform");

        h4.appendChild(scoreText);
        h4.classList.add("font-big")

        div.appendChild(h3);
        div.appendChild(h4);

        div.classList.add("result-item");

        moodScoreContainer.appendChild(div)


    })
    resultDialog.showModal()

}


function distributeRandomly(array) {
    const total = array.length;
  
    // Ensure the array is not empty to avoid division by zero
    if (total === 0) {
      console.error("Array is empty");
      return;
    }
  
    let remaining = 100;
    const result = {};
  
    // Loop through the array
    array.forEach((item, index) => {
      // For the last item, assign the remaining value to avoid rounding errors
      if (index === total - 1) {
        result[item] = remaining;
      } else {
        // Generate a random number between 1 and the remaining value
        const randomShare = Math.floor(Math.random() * (remaining - (total - index - 1))) + 1;
        
        // Assign the random share to the current item
        result[item] = randomShare;
  
        // Subtract the assigned value from the remaining total
        remaining -= randomShare;
      }
    });
  
    return result;
}



let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

