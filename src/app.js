const PLAYERS = [
    "Spiderman",
    "Captain America",
    "Wonderwoman",
    "Popcorn",
    "Gemwoman",
    "Slingo",
    "Antwoman",
    "Mask",
    "Tiger",
    "Cap Shield",
    "Catwoman",
    "Fish",
    "Hulk",
    "Deadpool",
    "Black Panther",
    "Doctor Strange",
    "Thor",
    "Manhunter",
    "Yellowjacket",
    "Thanos",
  ];
  var hero_strength = 0;
  var vill_strength = 0;
  function rand(s,index){
    if(index % 2 == 0){
      hero_strength += s
      return "hero"
    }
    vill_strength+=s;
    return "villain"  
  };
  // initialize players with image and strength
  const initPlayers = (players) => {
    let detailedPlayers = [];
    // Create players using for loop
    // Type your code here
    players.forEach((player, index) => {
      detailedPlayers.push({
        name: player,
        strength: k = getRandomStrength(),
        image: "images/super-" + (index + 1) + ".png",
        type: rand(k,index),
        id: index + 1,
      });
    });
    return detailedPlayers;
    // console.log(initPlayers);
  };
  
  // getting random strength
  const getRandomStrength = () => {
    // Return a random integer (0,100]
    // Note: You can use Math.random() and Math.ceil()
    return Math.ceil(Math.random() * 100);
  };

  
  // Loop through players and accumulate HTML template
  // depending of type of player(hero|villain)
  // Type your code here
  
  const view = (playerObject) => {
    let player = document.createElement("div");
    player.classList.add("player");
  
    let name = document.createElement("div");
    name.className = "name";
    name.textContent = playerObject.name;
  
    let strength = document.createElement("div");
    strength.textContent = playerObject.strength;
    strength.className = "strength";
  
    let image = document.createElement("img");
    image.setAttribute("src", playerObject.image);
    image.setAttribute("alt", "");
  
    player.append(image, name, strength);
    return player;
  };
  
  
  const buildPlayers = (players, type) => {
    let fragment = document.createElement("div");
    players
      .filter((player) => player.type == type)
      .forEach((player) => fragment.append(view(player)));
    return fragment.innerHTML;
  };
  
  // Display players in HTML
  const viewPlayers = (players) => {
    document.getElementById("heroes").innerHTML = buildPlayers(players, "hero");
    document.getElementById("villains").innerHTML = buildPlayers(
      players,
      "villain"
    );
  };

  
  //score update and strength update
  let arr1 = [];
  let arr2 = [];
  
  let sum1 = 0;
  let sum2 = 0;
  
  const updateScore = () => {
    if (sum1 > sum2) {
      HScore++;
    } else if (sum2 > sum1) {
      VScore++;
    }
    scoreDiv.textContent = `${HScore}-${VScore}`;
    sessionStorage.setItem('HScore', HScore.toString()); 
    sessionStorage.setItem('VScore', VScore.toString()); 
  
    // Check for the winning condition
    if (HScore === 5){
       swal("Hero Wins");
          } 
    else if (VScore === 5) {
      swal("Villain Wins");
      }
  
    
  };
  
  const viewPlayerss = (players) => {
    const heroesContainer = document.getElementById("heroes");
    const villainsContainer = document.getElementById("villains");
  
    heroesContainer.innerHTML = buildPlayers(players, "hero");
    villainsContainer.innerHTML = buildPlayers(players, "villain");
    arr1 = players.filter(player => player.type === "hero").map(hero => hero.strength);
    arr2 = players.filter(player => player.type === "villain").map(villain => villain.strength);
    console.log(arr1);
    console.log(arr2);
  };
  
  window.onload = () => {
    viewPlayerss(initPlayers(PLAYERS));
  
    for (let i = 0; i < arr1.length; i++) {
      sum1 += arr1[i];
    }
    console.log(sum1);
    for (let i = 0; i < arr2.length; i++) {
      sum2 += arr2[i];
    }
    console.log(sum2);
  
  
    HScore = Math.floor(sessionStorage.getItem('HScore'));
    VScore = Math.floor(sessionStorage.getItem('VScore'));
  
    updateScore();
  };
  
  var scoreDiv = document.getElementById("score");
  var scoreText = scoreDiv.textContent;
  var scores = scoreText.split('-');
  
  var HScore = Math.floor(scores[0]);
  var VScore = Math.floor(scores[1]);
  
  console.log(HScore);
  console.log(VScore);