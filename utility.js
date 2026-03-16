let started_music = false

let buttons = {"#econ-tab": {"header": "Economy", "body-id": "#econ-body"},
           "#stat-tab": {"header": "Statistics", "body-id": "#stat-body"},
           "#hamster-tab": {"header": "Your Hamsters", "body-id": "#hamster-body"}}

function switch_tab(tab){
    for (const tabid of Object.keys(buttons)){
        document.querySelector(tabid).className = ""
        document.querySelector(buttons[tabid]["body-id"]).style.display = "none";
    }

    document.querySelector(tab).className = "active"
    document.querySelector(buttons[tab]["body-id"]).style.display = "block";
    document.querySelector("#sidebar-head").textContent = buttons[tab]["header"];

}

const music_player = new Audio("music.mp3")
music_player.loop = true;
music_player.volume = 0.05;

const print_money_sfx = new Audio("money.mp3")
print_money_sfx.volume = 0.5

const tab_switch_sfx = new Audio("tab.mp3")
tab_switch_sfx.volume = 0.5
const slider_sound = new Audio("slide.mp3")
slider_sound.volume = 0.8

function toggleMusic(){
    if (! started_music){
        music_player.play();
        document.querySelector("#music-player").textContent = "🔊";
        started_music = true;
    }
    else{
        music_player.pause();
        document.querySelector("#music-player").textContent = "🔇";
        started_music = false;
    }
}

function playTabSound(){
    tab_switch_sfx.pause()
    tab_switch_sfx.currentTime = 0;
    tab_switch_sfx.play()
}

function playSliderSound(){
    slider_sound.play();
}

function initialToggle(){
    toggleMusic(); 
    document.removeEventListener("click", initialToggle); 
}


document.querySelector("#econ-tab").addEventListener("click", function(){switch_tab("#econ-tab"); playTabSound()})
document.querySelector("#stat-tab").addEventListener("click", function(){switch_tab("#stat-tab"); playTabSound()})
document.querySelector("#hamster-tab").addEventListener("click", function(){switch_tab("#hamster-tab"); playTabSound()})

document.querySelector("#tax-slider").addEventListener("input", function(){document.querySelector("#tax-indicator").textContent = "Tax: " + document.querySelector("#tax-slider").value + "%"; playSliderSound()})
document.querySelector("#interest-slider").addEventListener("input", function(){document.querySelector("#interest-indicator").textContent = "Interest Rate: " + document.querySelector("#interest-slider").value + "%"; playSliderSound()})

document.querySelector("#pn-slider").addEventListener("input", function(){document.querySelector("#pn-indicator").textContent = "Utilities: " + document.querySelector("#pn-slider").value + "%"; playSliderSound()})
// document.querySelector("#rd-slider").addEventListener("input", function(){document.querySelector("#rd-indicator").textContent = "Research and Development: " + document.querySelector("#rd-slider").value + "%"; playSliderSound()})
document.querySelector("#h-slider").addEventListener("input", function(){document.querySelector("#h-indicator").textContent = "Housing: " + document.querySelector("#h-slider").value + "%"; playSliderSound()})


document.querySelector("#music-player").addEventListener("click", toggleMusic)
document.querySelector("#print-money").addEventListener("click", function(){print_money_sfx.pause(); print_money_sfx.currentTime = 0; print_money_sfx.play()})
document.addEventListener("click", initialToggle);