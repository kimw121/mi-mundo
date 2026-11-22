
"use client";

import { useEffect, useState } from "react";

type Place =
  | "home"
  | "treasure"
  | "kitchen"
  | "restaurant"
  | "mystery"
  | "market"
  | "smoothie"
  | "delivery"
  | "picnic";

type Category =
  | "fruit"
  | "vegetable"
  | "ingredient"
  | "meal"
  | "dessert"
  | "drink";

type Food = {
  id: string;
  es: string;
  en: string;
  order: string;
  emoji: string;
  category: Category;
};

type Player = {
  name: string;
  avatar: string;
  age: 6 | 9;
  stars: number;
  coins: number;
  full: number;
  completed: Place[];
};

const FOODS: Food[] = [
  // FRUITS
  { id:"apple", es:"la manzana", en:"apple", order:"una manzana", emoji:"🍎", category:"fruit" },
  { id:"banana", es:"el plátano", en:"banana", order:"un plátano", emoji:"🍌", category:"fruit" },
  { id:"strawberry", es:"la fresa", en:"strawberry", order:"una fresa", emoji:"🍓", category:"fruit" },
  { id:"orange", es:"la naranja", en:"orange", order:"una naranja", emoji:"🍊", category:"fruit" },
  { id:"pineapple", es:"la piña", en:"pineapple", order:"una piña", emoji:"🍍", category:"fruit" },
  { id:"mango", es:"el mango", en:"mango", order:"un mango", emoji:"🥭", category:"fruit" },
  { id:"grapes", es:"las uvas", en:"grapes", order:"uvas", emoji:"🍇", category:"fruit" },
  { id:"watermelon", es:"la sandía", en:"watermelon", order:"sandía", emoji:"🍉", category:"fruit" },
  { id:"pear", es:"la pera", en:"pear", order:"una pera", emoji:"🍐", category:"fruit" },
  { id:"coconut", es:"el coco", en:"coconut", order:"un coco", emoji:"🥥", category:"fruit" },

  // VEGETABLES
  { id:"tomato", es:"el tomate", en:"tomato", order:"un tomate", emoji:"🍅", category:"vegetable" },
  { id:"lettuce", es:"la lechuga", en:"lettuce", order:"lechuga", emoji:"🥬", category:"vegetable" },
  { id:"carrot", es:"la zanahoria", en:"carrot", order:"una zanahoria", emoji:"🥕", category:"vegetable" },
  { id:"cucumber", es:"el pepino", en:"cucumber", order:"un pepino", emoji:"🥒", category:"vegetable" },
  { id:"onion", es:"la cebolla", en:"onion", order:"una cebolla", emoji:"🧅", category:"vegetable" },
  { id:"pepper", es:"el pimiento", en:"bell pepper", order:"un pimiento", emoji:"🫑", category:"vegetable" },

  // INGREDIENTS
  { id:"bread", es:"el pan", en:"bread", order:"pan", emoji:"🍞", category:"ingredient" },
  { id:"eggs", es:"los huevos", en:"eggs", order:"huevos", emoji:"🥚", category:"ingredient" },
  { id:"rice", es:"el arroz", en:"rice", order:"arroz", emoji:"🍚", category:"ingredient" },
  { id:"cheese", es:"el queso", en:"cheese", order:"queso", emoji:"🧀", category:"ingredient" },
  { id:"chicken", es:"el pollo", en:"chicken", order:"pollo", emoji:"🍗", category:"ingredient" },
  { id:"fish", es:"el pescado", en:"fish", order:"pescado", emoji:"🐟", category:"ingredient" },
  { id:"flour", es:"la harina", en:"flour", order:"harina", emoji:"🌾", category:"ingredient" },
  { id:"milk", es:"la leche", en:"milk", order:"leche", emoji:"🥛", category:"drink" },
  { id:"butter", es:"la mantequilla", en:"butter", order:"mantequilla", emoji:"🧈", category:"ingredient" },
  { id:"beans", es:"los frijoles", en:"beans", order:"frijoles", emoji:"🫘", category:"ingredient" },
  { id:"ackee", es:"el ackee", en:"ackee", order:"ackee", emoji:"🍈", category:"ingredient" },
  { id:"saltfish", es:"el bacalao salado", en:"saltfish", order:"bacalao salado", emoji:"🐟", category:"ingredient" },

  // MEALS
  { id:"pizza", es:"la pizza", en:"pizza", order:"pizza", emoji:"🍕", category:"meal" },
  { id:"burger", es:"la hamburguesa", en:"burger", order:"una hamburguesa", emoji:"🍔", category:"meal" },
  { id:"sandwich", es:"el sándwich", en:"sandwich", order:"un sándwich", emoji:"🥪", category:"meal" },
  { id:"omelette", es:"la tortilla de huevo", en:"omelette", order:"una tortilla de huevo", emoji:"🍳", category:"meal" },
  { id:"jerk", es:"el pollo jerk", en:"jerk chicken", order:"pollo jerk", emoji:"🍗", category:"meal" },
  { id:"curry", es:"el pollo al curry", en:"curry chicken", order:"pollo al curry", emoji:"🍛", category:"meal" },
  { id:"patty", es:"la empanada jamaicana", en:"Jamaican patty", order:"una empanada jamaicana", emoji:"🥟", category:"meal" },
  { id:"ackeemeal", es:"el ackee con bacalao", en:"ackee and saltfish", order:"ackee con bacalao", emoji:"🍲", category:"meal" },
  { id:"tacos", es:"los tacos", en:"tacos", order:"tacos", emoji:"🌮", category:"meal" },
  { id:"spaghetti", es:"los espaguetis", en:"spaghetti", order:"espaguetis", emoji:"🍝", category:"meal" },
  { id:"soup", es:"la sopa", en:"soup", order:"una sopa", emoji:"🍜", category:"meal" },
  { id:"salad", es:"la ensalada", en:"salad", order:"una ensalada", emoji:"🥗", category:"meal" },
  { id:"fries", es:"las papas fritas", en:"fries", order:"papas fritas", emoji:"🍟", category:"meal" },

  // DESSERTS
  { id:"icecream", es:"el helado", en:"ice cream", order:"un helado", emoji:"🍦", category:"dessert" },
  { id:"cake", es:"el pastel", en:"cake", order:"un pastel", emoji:"🍰", category:"dessert" },
  { id:"cookies", es:"las galletas", en:"cookies", order:"galletas", emoji:"🍪", category:"dessert" },
  { id:"chocolate", es:"el chocolate", en:"chocolate", order:"chocolate", emoji:"🍫", category:"dessert" },

  // DRINKS
  { id:"water", es:"el agua", en:"water", order:"agua", emoji:"💧", category:"drink" },
  { id:"orangejuice", es:"el jugo de naranja", en:"orange juice", order:"jugo de naranja", emoji:"🍊", category:"drink" },
  { id:"mangojuice", es:"el jugo de mango", en:"mango juice", order:"jugo de mango", emoji:"🥭", category:"drink" },
  { id:"lemonade", es:"la limonada", en:"lemonade", order:"una limonada", emoji:"🍋", category:"drink" },
  { id:"coconutwater", es:"el agua de coco", en:"coconut water", order:"agua de coco", emoji:"🥥", category:"drink" },
  { id:"tea", es:"el té", en:"tea", order:"té", emoji:"🍵", category:"drink" },
  { id:"hotchocolate", es:"el chocolate caliente", en:"hot chocolate", order:"chocolate caliente", emoji:"☕", category:"drink" },
  { id:"smoothie", es:"el batido de frutas", en:"fruit smoothie", order:"un batido de frutas", emoji:"🥤", category:"drink" },
  { id:"milkshake", es:"el batido de leche", en:"milkshake", order:"un batido de leche", emoji:"🥛", category:"drink" },
];

const PLACES: {
  id: Place;
  icon: string;
  es: string;
  en: string;
  minutes: string;
  scenery: string;
}[] = [
  { id:"home", icon:"🏡", es:"La casa", en:"Greeting Quest", minutes:"6 min", scenery:"🛋️ 🪴 🚪" },
  { id:"treasure", icon:"🗝️", es:"El tesoro", en:"Treasure Hunt", minutes:"7 min", scenery:"🧊 📦 🔑" },
  { id:"kitchen", icon:"👩‍🍳", es:"La cocina", en:"Cooking Game", minutes:"10 min", scenery:"🍳 🥘 🍽️" },
  { id:"restaurant", icon:"🍽️", es:"El restaurante", en:"Restaurant Rescue", minutes:"8 min", scenery:"🍕 🪑 🍔" },
  { id:"mystery", icon:"🎁", es:"La sorpresa", en:"Mystery Boxes", minutes:"5 min", scenery:"🎁 🎈 ⭐" },
  { id:"market", icon:"🛒", es:"El supermercado", en:"Shopping Game", minutes:"7 min", scenery:"🥕 🍞 🧃" },
  { id:"smoothie", icon:"🥤", es:"La tienda de batidos", en:"Smoothie Maker", minutes:"7 min", scenery:"🍓 🥭 🍌" },
  { id:"delivery", icon:"🚲", es:"Las entregas", en:"Food Delivery", minutes:"5 min", scenery:"🚲 🏠 🍕" },
  { id:"picnic", icon:"🧺", es:"El picnic", en:"Picnic Challenge", minutes:"5 min", scenery:"🌳 🌸 🧺" },
];

const PEOPLE = [
  {
    npc:"👩🏽", who:"Mamá / Mom",
    es:"¡Buenos días! ¿Cómo estás?",
    en:"Good morning! How are you?",
    choices:[
      ["Estoy bien, gracias.","I'm fine, thank you."],
      ["Quiero arroz.","I want rice."],
      ["Buenas noches.","Good night."],
    ],
    correct:0,
    easy:"Estoy bien.",
    hard:"¡Buenos días! Estoy muy bien, gracias.",
  },
  {
    npc:"👨🏽", who:"Papá / Dad",
    es:"¡Hola! ¿Tienes hambre?",
    en:"Hello! Are you hungry?",
    choices:[
      ["Hasta luego.","See you later."],
      ["¡Sí, tengo hambre!","Yes, I'm hungry!"],
      ["Me llamo pizza.","My name is pizza."],
    ],
    correct:1,
    easy:"Tengo hambre.",
    hard:"¡Sí, papá! Tengo mucha hambre.",
  },
  {
    npc:"👵🏾", who:"Abuela / Grandma",
    es:"¿Qué quieres comer?",
    en:"What would you like to eat?",
    choices:[
      ["Quiero pollo, por favor.","I want chicken, please."],
      ["Estoy feliz.","I'm happy."],
      ["¡Adiós!","Goodbye!"],
    ],
    correct:0,
    easy:"Quiero pollo.",
    hard:"Quiero pollo con arroz, por favor.",
  },
  {
    npc:"👧🏻", who:"Una amiga / A friend",
    es:"¡Hola! ¿Cómo te llamas?",
    en:"Hello! What's your name?",
    choices:[
      ["Tengo leche.","I have milk."],
      ["¡Buenos días!","Good morning!"],
      ["Me llamo... ¡Mucho gusto!","My name is... Nice to meet you!"],
    ],
    correct:2,
    easy:"Me llamo...",
    hard:"¡Hola! Me llamo... ¡Mucho gusto!",
  },
  {
    npc:"👨‍🍳", who:"El cocinero / Chef",
    es:"¿Te gusta la pizza?",
    en:"Do you like pizza?",
    choices:[
      ["¡Hasta mañana!","See you tomorrow!"],
      ["¡Sí! Me gusta la pizza.","Yes! I like pizza."],
      ["Me llamo arroz.","My name is rice."],
    ],
    correct:1,
    easy:"¡Sí! Me gusta.",
    hard:"¡Sí! Me gusta mucho la pizza.",
  },
];

const HUNTS = [
  { target:"mango", tiles:["pizza","bread","water","mango","banana","chicken","cake","rice","milk"] },
  { target:"cheese", tiles:["apple","cheese","orange","fish","soup","bread","grapes","pizza","water"] },
  { target:"jerk", tiles:["rice","burger","jerk","fries","mango","milk","salad","egg","water"].filter(x=>x!=="egg") },
  { target:"strawberry", tiles:["water","banana","bread","cheese","strawberry","cake","fish","apple","pizza"] },
  { target:"coconutwater", tiles:["orangejuice","water","milk","smoothie","coconutwater","lemonade","tea","mangojuice","hotchocolate"] },
  { target:"patty", tiles:["omelette","soup","pizza","burger","patty","spaghetti","tacos","sandwich","salad"] },
  { target:"pineapple", tiles:["mango","apple","pear","watermelon","pineapple","banana","grapes","orange","coconut"] },
  { target:"ackee", tiles:["tomato","lettuce","ackee","eggs","onion","rice","cheese","carrot","beans"] },
];

const RECIPES = [
  { es:"el sándwich", en:"sandwich", emoji:"🥪", ingredients:["bread","cheese","tomato"] },
  { es:"la tortilla", en:"omelette", emoji:"🍳", ingredients:["eggs","cheese","tomato"] },
  { es:"el pollo con arroz", en:"chicken with rice", emoji:"🍛", ingredients:["chicken","rice","beans"] },
  { es:"la ensalada de frutas", en:"fruit salad", emoji:"🥗", ingredients:["mango","banana","strawberry"] },
  { es:"la pizza", en:"pizza", emoji:"🍕", ingredients:["flour","tomato","cheese"] },
  { es:"el pescado con arroz", en:"fish with rice", emoji:"🐟", ingredients:["fish","rice","pepper"] },
  { es:"la hamburguesa de pollo", en:"chicken burger", emoji:"🍔", ingredients:["bread","chicken","lettuce"] },
  { es:"el ackee con bacalao", en:"ackee and saltfish", emoji:"🍲", ingredients:["ackee","saltfish","onion"] },
];

const CUSTOMERS = [
  { npc:"👩🏽", food:"jerk" },
  { npc:"👨🏾", food:"pizza" },
  { npc:"👵🏼", food:"soup" },
  { npc:"🧒🏻", food:"icecream" },
  { npc:"👧🏾", food:"patty" },
  { npc:"👨🏼", food:"burger" },
  { npc:"👩🏻", food:"curry" },
  { npc:"🧑🏽", food:"sandwich" },
  { npc:"👩🏾", food:"ackeemeal" },
  { npc:"👨🏻", food:"mangojuice" },
  { npc:"👧🏼", food:"tacos" },
  { npc:"🧑🏿", food:"milkshake" },
];

const MYSTERIES = [
  {
    es:"¡Buenos días!", en:"Good morning!",
    choices:[["¡Buenos días!","Good morning!"],["Buenas noches.","Good night."],["Quiero queso.","I want cheese."]],
    correct:0,
  },
  {
    es:"¿Dónde está el agua?", en:"Where is the water?",
    choices:[["🍎 La manzana","Apple"],["💧 El agua","Water"],["🍕 La pizza","Pizza"]],
    correct:1,
  },
  {
    es:"¿Cómo estás?", en:"How are you?",
    choices:[["Quiero arroz.","I want rice."],["Hasta luego.","See you later."],["Estoy feliz.","I'm happy."]],
    correct:2,
  },
  {
    es:"¡Buen provecho!", en:"Enjoy your meal!",
    choices:[["¡Gracias!","Thank you!"],["Me llamo pan.","My name is bread."],["¡Buenos días!","Good morning!"]],
    correct:0,
  },
  {
    es:"¿Qué quieres beber?", en:"What would you like to drink?",
    choices:[["Quiero pollo.","I want chicken."],["Quiero jugo de mango.","I want mango juice."],["Estoy bien.","I'm fine."]],
    correct:1,
  },
  {
    es:"¿Qué quieres comer?", en:"What would you like to eat?",
    choices:[["Hasta luego.","See you later."],["¡Mucho gusto!","Nice to meet you!"],["Quiero pizza, por favor.","I want pizza, please."]],
    correct:2,
  },
];

const SHOPPING_LISTS = [
  ["bread","cheese","milk"],
  ["chicken","rice","beans"],
  ["apple","banana","mango"],
  ["eggs","tomato","onion"],
  ["fish","pepper","water"],
  ["strawberry","pineapple","orangejuice"],
];

const SMOOTHIES = [
  { es:"Batido de mango", en:"Mango smoothie", emoji:"🥭", ingredients:["mango","banana","milk"] },
  { es:"Batido de fresa", en:"Strawberry smoothie", emoji:"🍓", ingredients:["strawberry","banana","milk"] },
  { es:"Batido tropical", en:"Tropical smoothie", emoji:"🍍", ingredients:["pineapple","mango","coconutwater"] },
];

const DELIVERIES = [
  { npc:"👵🏽", food:"soup", house:0 },
  { npc:"👨🏾", food:"jerk", house:2 },
  { npc:"👧🏽", food:"pizza", house:1 },
  { npc:"👩🏼", food:"salad", house:0 },
  { npc:"🧑🏾", food:"patty", house:2 },
];

const HOUSES = [
  { emoji:"🏡", es:"la casa verde", en:"green house" },
  { emoji:"🏠", es:"la casa azul", en:"blue house" },
  { emoji:"🏘️", es:"la casa amarilla", en:"yellow house" },
];

const PICNIC_ROUNDS = [
  { category:"drink" as Category, es:"una bebida", en:"a drink", choices:["pizza","water","bread"], answer:"water" },
  { category:"fruit" as Category, es:"una fruta", en:"a fruit", choices:["chicken","mango","cheese"], answer:"mango" },
  { category:"meal" as Category, es:"una comida", en:"a meal", choices:["orange","sandwich","milk"], answer:"sandwich" },
  { category:"dessert" as Category, es:"un postre", en:"a dessert", choices:["rice","lettuce","cake"], answer:"cake" },
  { category:"drink" as Category, es:"una bebida", en:"a drink", choices:["mangojuice","burger","carrot"], answer:"mangojuice" },
  { category:"fruit" as Category, es:"una fruta", en:"a fruit", choices:["strawberry","cheese","bread"], answer:"strawberry" },
];

const NEW_PLAYERS: Player[] = [
  { name:"Superchef", avatar:"👦🏽", age:6, stars:0, coins:20, full:45, completed:[] },
  { name:"Exploradora", avatar:"👧🏽", age:9, stars:0, coins:20, full:45, completed:[] },
];

function getFood(id: string): Food {
  return FOODS.find(f => f.id === id) || FOODS[0];
}

function say(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const voiceText = new SpeechSynthesisUtterance(text);
  voiceText.lang = "es-ES";
  voiceText.rate = 0.78;

  const voice = window.speechSynthesis
    .getVoices()
    .find(v => v.lang.toLowerCase().startsWith("es"));

  if (voice) voiceText.voice = voice;

  window.speechSynthesis.speak(voiceText);
}

function Listen({ text }: { text:string }) {
  return (
    <button className="listen" onClick={() => say(text)}>
      🔊 Escuchar / Listen
    </button>
  );
}

function FoodButton({
  id,
  onClick,
  disabled = false,
}: {
  id:string;
  onClick:() => void;
  disabled?:boolean;
}) {
  const food = getFood(id);

  return (
    <button className="food-button" onClick={onClick} disabled={disabled}>
      <span>{food.emoji}</span>
      <b>{food.es}</b>
      <small>{food.en}</small>
    </button>
  );
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>(NEW_PLAYERS);
  const [active, setActive] = useState(0);
  const [place, setPlace] = useState<Place>("home");
  const [loaded, setLoaded] = useState(false);

  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [found, setFound] = useState<number[]>([]);
  const [selectedFood, setSelectedFood] = useState<string[]>([]);
  const [recipe, setRecipe] = useState(0);
  const [smoothie, setSmoothie] = useState(0);
  const [taps, setTaps] = useState(0);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState("");

  const player = players[active];
  const young = player.age === 6;
  const placeData = PLACES.find(p => p.id === place) || PLACES[0];

  const person = PEOPLE[round % PEOPLE.length];
  const hunt = HUNTS[round % HUNTS.length];
  const recipeData = RECIPES[recipe];
  const customer = CUSTOMERS[round % CUSTOMERS.length];
  const mystery = MYSTERIES[round % MYSTERIES.length];
  const list = SHOPPING_LISTS[round % SHOPPING_LISTS.length];
  const smoothieData = SMOOTHIES[smoothie];
  const delivery = DELIVERIES[round % DELIVERIES.length];
  const picnic = PICNIC_ROUNDS[round % PICNIC_ROUNDS.length];

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("mi-mundo-big-adventure-v6") || "null"
      );

      if (
        Array.isArray(saved) &&
        saved.length === 2 &&
        saved.every(p => p && Array.isArray(p.completed))
      ) {
        setPlayers(saved);
      }
    } catch {
      // A fresh game can start.
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        "mi-mundo-big-adventure-v6",
        JSON.stringify(players)
      );
    } catch {
      // Saving is optional.
    }
  }, [players, loaded]);

  function updatePlayer(fn:(p:Player) => Player) {
    setPlayers(old =>
      old.map((p, index) => index === active ? fn(p) : p)
    );
  }

  function reward(amount = 1, meal = 0) {
    updatePlayer(p => ({
      ...p,
      stars:p.stars + amount,
      coins:p.coins + amount * 2,
      full:Math.min(100, p.full + meal),
      completed:p.completed.includes(place)
        ? p.completed
        : [...p.completed, place],
    }));
  }

  function resetRound() {
    setPhase(0);
    setChoice(null);
    setFound([]);
    setSelectedFood([]);
    setTaps(0);
    setSuccess(false);
    setFeedback("");
  }

  function travel(next:Place) {
    setPlace(next);
    setRound(0);
    resetRound();
  }

  function nextRound() {
    setRound(n => n + 1);
    resetRound();
  }

  function switchPlayer(index:number) {
    setActive(index);
    setRound(0);
    resetRound();
  }

  function correct(message = "⭐ ¡Excelente! / Excellent!") {
    setFeedback(message);
    say("¡Muy bien!");
  }

  function incorrect() {
    setFeedback("💛 ¡Otra vez! / Try again!");
    say("¡Inténtalo otra vez!");
  }

  function complete(amount = 1, meal = 0) {
    if (success) return;
    reward(amount, meal);
    setSuccess(true);
    correct("🏆 ¡Ganaste! / You won!");
  }

  // GREETING QUEST
  function unlockDoor(index:number) {
    if (success) return;
    setChoice(index);

    if (index !== person.correct) {
      incorrect();
      return;
    }

    complete(1);
  }

  // TREASURE HUNT
  function openCupboard(index:number) {
    if (success || found.includes(index)) return;

    const item = hunt.tiles[index];
    setFound(old => [...old, index]);
    say(getFood(item).es);

    if (item === hunt.target) {
      complete(2);
    } else {
      setFeedback(
        `🔎 ${getFood(item).es} / ${getFood(item).en}. Keep looking!`
      );
    }
  }

  // KITCHEN GAME
  function chooseIngredient(id:string, requirements:string[]) {
    if (selectedFood.length >= requirements.length) return;

    const required = requirements[selectedFood.length];

    if (id !== required) {
      incorrect();
      return;
    }

    setSelectedFood(old => [...old, id]);
    correct(`✅ ${getFood(id).es} / ${getFood(id).en}`);
    say(getFood(id).es);
  }

  function kitchenAction() {
    if (phase === 0) {
      setPhase(1);
      setTaps(0);
      say("¡Vamos a preparar!");
      return;
    }

    if (phase === 1) {
      if (taps + 1 >= 3) {
        setPhase(2);
        setTaps(0);
        say("¡Vamos a cocinar!");
      } else {
        setTaps(n => n + 1);
      }
      return;
    }

    if (phase === 2) {
      if (taps + 1 >= 4) {
        setPhase(3);
        setTaps(0);
        say("¡La comida está lista!");
      } else {
        setTaps(n => n + 1);
      }
      return;
    }

    if (phase === 3) {
      setPhase(4);
      say("¡Buen provecho!");
      return;
    }

    complete(3, 30);
  }

  // RESTAURANT GAME
  function restaurantChoice(id:string) {
    if (id !== customer.food) {
      incorrect();
      return;
    }

    setPhase(2);
    correct("🍽️ ¡Pedido correcto! / Correct order!");
  }

  // SUPERMARKET GAME
  function buyItem(id:string) {
    const required = list[selectedFood.length];

    if (id !== required) {
      incorrect();
      return;
    }

    const next = [...selectedFood, id];
    setSelectedFood(next);
    say(getFood(id).es);

    if (next.length === list.length) {
      complete(3);
    } else {
      correct(`🛒 ${getFood(id).es} / Added to basket!`);
    }
  }

  // SMOOTHIE GAME
  function smoothieAction() {
    if (phase === 0) {
      setPhase(1);
      setTaps(0);
      say("¡A mezclar!");
      return;
    }

    if (phase === 1) {
      if (taps + 1 >= 5) {
        setPhase(2);
        setTaps(0);
        say("¡El batido está listo!");
      } else {
        setTaps(n => n + 1);
      }
      return;
    }

    complete(3, 20);
  }

  // DELIVERY GAME
  function deliveryChoice(index:number) {
    setChoice(index);

    if (index !== delivery.house) {
      incorrect();
      return;
    }

    setPhase(2);
    correct("🏠 ¡Casa correcta! / Correct house!");
  }

  const speakToCustomer = young
    ? `¡Hola! Quiero ${getFood(customer.food).order}.`
    : `¡Buenas tardes! Quisiera ${getFood(customer.food).order}, por favor.`;

  const foodOptions = Array.from(
    new Set([
      customer.food,
      "pizza","burger","jerk","soup",
      "patty","salad","sandwich","curry",
      "icecream","mangojuice","milkshake","tacos",
      "ackeemeal",
    ])
  );

  return (
    <main className="mundo">
      <style>{CSS}</style>

      <header className="header">
        <div>
          <strong>🌎 MI MUNDO</strong>
          <small>
            ¡Mi gran aventura! / My Big Adventure
          </small>
        </div>

        <div className="scores">
          ⭐ {player.stars}
          <span>🪙 {player.coins}</span>
        </div>
      </header>

      <div className="container">
        <div className="player-tabs">
          {players.map((p,i) => (
            <button
              key={i}
              className={active === i ? "active" : ""}
              onClick={() => switchPlayer(i)}
            >
              <span>{p.avatar}</span>
              <div>
                <b>{p.name}</b>
                <small>
                  {i === 0
                    ? "Niño / Boy · 6"
                    : "Niña / Girl · 9"}
                </small>
              </div>
            </button>
          ))}
        </div>

        <section className="status">
          <div className="big-avatar">{player.avatar}</div>

          <label>
            Nombre / Name
            <input
              maxLength={20}
              value={player.name}
              onChange={e =>
                updatePlayer(p => ({
                  ...p,
                  name:e.target.value,
                }))
              }
            />
          </label>

          <div className="tummy">
            <b>
              🍎 Barriguita llena / Full tummy
            </b>

            <div className="meter">
              <div
                style={{
                  width:`${player.full}%`,
                }}
              />
            </div>
          </div>

          <strong>
            ⭐ {player.stars} estrellas
          </strong>
        </section>

        <div className="world-title">
          <h2>🏘️ Mi barrio / My Neighbourhood</h2>
          <p>Choose a place to visit / Elige un lugar para visitar</p>
        </div>

        <nav className="world-map">
          {PLACES.map(p => (
            <button
              key={p.id}
              className={place === p.id ? "current" : ""}
              onClick={() => travel(p.id)}
            >
              <span>{p.icon}</span>
              <b>{p.es}</b>
              <small>{p.en}</small>
              <em>{p.minutes}</em>

              {player.completed.includes(p.id) && (
                <i>⭐</i>
              )}
            </button>
          ))}
        </nav>

        <section className={`world-scene scene-${place}`}>
          <div className="scene-sign">
            <strong>{placeData.icon} {placeData.es}</strong>
            <small>{placeData.en}</small>
          </div>

          <div className="scene-decor">
            {placeData.scenery}
          </div>

          <div className="characters">
            <div className="person">
              <span>{player.avatar}</span>
              <b>{player.name}</b>
            </div>

            <div className="bubble">
              <strong>
                {place === "home" && "¡Hola! ¿Cómo estás?"}
                {place === "treasure" && "¡Busca el tesoro!"}
                {place === "kitchen" && "¡Tengo hambre!"}
                {place === "restaurant" && "¿Qué quieres comer?"}
                {place === "mystery" && "¡Sorpresa!"}
                {place === "market" && "¡Vamos de compras!"}
                {place === "smoothie" && "¡Quiero un batido!"}
                {place === "delivery" && "¡Una entrega!"}
                {place === "picnic" && "¡Vamos al picnic!"}
              </strong>

              <small>
                {place === "home" && "Hello! How are you?"}
                {place === "treasure" && "Find the treasure!"}
                {place === "kitchen" && "I'm hungry!"}
                {place === "restaurant" && "What would you like to eat?"}
                {place === "mystery" && "Surprise!"}
                {place === "market" && "Let's go shopping!"}
                {place === "smoothie" && "I want a smoothie!"}
                {place === "delivery" && "A food delivery!"}
                {place === "picnic" && "Let's have a picnic!"}
              </small>
            </div>

            <div className="person">
              <span>
                {place === "home" && person.npc}
                {place === "treasure" && "🕵🏽"}
                {place === "kitchen" && "👩‍🍳"}
                {place === "restaurant" && customer.npc}
                {place === "mystery" && "🧙🏽"}
                {place === "market" && "👨‍🍳"}
                {place === "smoothie" && "🧑🏽‍🍳"}
                {place === "delivery" && "🚲"}
                {place === "picnic" && "🧺"}
              </span>
            </div>
          </div>
        </section>

        <section className="play-area">

          {/* 1: GREETING QUEST */}
          {place === "home" && (
            <>
              <div className="section-heading">
                <h2>🔐 ¡Abre las puertas! / Unlock the Doors!</h2>
                <p>Greet the person behind each door to unlock it.</p>
              </div>

              <div className="challenge">
                <div className="huge">
                  {success ? "🚪✨" : "🚪🔒"}
                </div>

                <div className="npc">
                  <span>{person.npc}</span>

                  <div>
                    <b>{person.who}</b>
                    <h2>{person.es}</h2>
                    <p>{person.en}</p>
                    <Listen text={person.es} />
                  </div>
                </div>

                {!success ? (
                  <div className="choices">
                    {person.choices.map((c,i) => (
                      <button
                        key={i}
                        className={
                          choice === i
                            ? i === person.correct
                              ? "right"
                              : "wrong"
                            : ""
                        }
                        onClick={() => unlockDoor(i)}
                      >
                        <b>{c[0]}</b>
                        <small>{c[1]}</small>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="victory">
                    <h2>🔓 ¡Puerta abierta! / Door unlocked!</h2>
                    <p>🎤 Say it aloud / Dilo en voz alta</p>

                    <h2>{young ? person.easy : person.hard}</h2>

                    <Listen text={young ? person.easy : person.hard} />

                    <button className="main-button" onClick={nextRound}>
                      🚪 Otra puerta / Next door ➜
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 2: TREASURE HUNT */}
          {place === "treasure" && (
            <>
              <div className="section-heading">
                <h2>🗝️ ¡Busca el tesoro! / Food Treasure Hunt!</h2>
                <p>Open the cupboards and find the secret food.</p>
              </div>

              <div className="clue">
                <span>🕵🏽</span>

                <div>
                  <small>PISTA SECRETA / SECRET CLUE</small>
                  <h2>¡Busca {getFood(hunt.target).es}!</h2>
                  <p>Find the {getFood(hunt.target).en}!</p>

                  <Listen text={getFood(hunt.target).es} />
                </div>
              </div>

              <div className="cupboards">
                {hunt.tiles.map((id,i) => {
                  const opened = found.includes(i);
                  const item = getFood(id);

                  return (
                    <button
                      key={i}
                      disabled={opened || success}
                      className={
                        opened
                          ? id === hunt.target
                            ? "treasure"
                            : "opened"
                          : ""
                      }
                      onClick={() => openCupboard(i)}
                    >
                      <span>{opened ? item.emoji : "🚪"}</span>
                      <b>
                        {opened
                          ? item.es
                          : `Armario ${i+1}`}
                      </b>
                      <small>
                        {opened
                          ? item.en
                          : `Cupboard ${i+1}`}
                      </small>
                    </button>
                  );
                })}
              </div>

              {success && (
                <div className="victory">
                  <div className="huge">
                    🗝️ {getFood(hunt.target).emoji}
                  </div>

                  <h2>¡Tesoro encontrado! / Treasure found!</h2>

                  <button className="main-button" onClick={nextRound}>
                    🔎 Nueva búsqueda / New treasure hunt ➜
                  </button>
                </div>
              )}
            </>
          )}

          {/* 3: KITCHEN */}
          {place === "kitchen" && (
            <>
              <div className="section-heading">
                <h2>👩‍🍳 ¡Chef por un día! / Chef for a Day!</h2>
                <p>Pick a meal, find the ingredients, cook and eat!</p>
              </div>

              <div className="recipe-grid">
                {RECIPES.map((r,i) => (
                  <button
                    key={i}
                    className={recipe === i ? "selected" : ""}
                    onClick={() => {
                      setRecipe(i);
                      resetRound();
                    }}
                  >
                    <span>{r.emoji}</span>
                    <b>{r.es}</b>
                    <small>{r.en}</small>
                  </button>
                ))}
              </div>

              <div className="challenge">
                <h2>{recipeData.emoji} {recipeData.es}</h2>
                <p>{recipeData.en}</p>

                {selectedFood.length < 3 ? (
                  <>
                    <div className="clue">
                      <span>🧺</span>

                      <div>
                        <small>
                          INGREDIENTE / INGREDIENT{" "}
                          {selectedFood.length + 1} OF 3
                        </small>

                        <h2>
                          ¡Busca{" "}
                          {getFood(
                            recipeData.ingredients[selectedFood.length]
                          ).es}!
                        </h2>

                        <p>
                          Find the{" "}
                          {getFood(
                            recipeData.ingredients[selectedFood.length]
                          ).en}!
                        </p>

                        <Listen
                          text={
                            getFood(
                              recipeData.ingredients[selectedFood.length]
                            ).es
                          }
                        />
                      </div>
                    </div>

                    <div className="food-grid">
                      {Array.from(new Set([
                        ...recipeData.ingredients,
                        "apple","rice","bread","cheese",
                        "chicken","milk","mango",
                        "tomato","onion","eggs",
                      ])).map(id => (
                        <FoodButton
                          key={id}
                          id={id}
                          onClick={() =>
                            chooseIngredient(id, recipeData.ingredients)
                          }
                        />
                      ))}
                    </div>

                    <div className="basket">
                      🧺 {selectedFood.map(id => getFood(id).emoji).join(" ")}
                      {" "}{selectedFood.length}/3
                    </div>
                  </>
                ) : (
                  <>
                    {!success ? (
                      <div className="cooking">
                        <div className="huge dancing">
                          {["🧺","🔪","🥘","🍽️","😋"][phase]}
                          {" "}{recipeData.emoji}
                        </div>

                        <h2>
                          {[
                            "¡Preparar! / Prepare!",
                            "¡Cortar! / Chop!",
                            "¡Cocinar! / Cook!",
                            "¡Servir! / Serve!",
                            "¡Comer! / Eat!",
                          ][phase]}
                        </h2>

                        {(phase === 1 || phase === 2) && (
                          <div className="tap-dots">
                            {Array.from({
                              length:phase === 1 ? 3 : 4,
                            }).map((_,i) => (
                              <span
                                key={i}
                                className={i < taps ? "filled" : ""}
                              />
                            ))}
                          </div>
                        )}

                        <button
                          className="main-button"
                          onClick={kitchenAction}
                        >
                          {[
                            "👩‍🍳 ¡Empezar! / Start!",
                            "🔪 ¡Cortar! / Chop!",
                            "🥄 ¡Remover! / Stir!",
                            "🍽️ ¡Servir! / Serve!",
                            "😋 ¡Comer! / Eat!",
                          ][phase]}
                        </button>
                      </div>
                    ) : (
                      <div className="victory">
                        <div className="huge dancing">
                          {player.avatar} {recipeData.emoji}
                        </div>

                        <h2>¡Qué rico! / Delicious!</h2>

                        <button
                          className="main-button"
                          onClick={resetRound}
                        >
                          🍳 Cocinar otra vez / Cook again ➜
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {/* 4: RESTAURANT */}
          {place === "restaurant" && (
            <>
              <div className="section-heading">
                <h2>🍽️ ¡Rescata el restaurante!</h2>
                <p>Restaurant Rescue! Greet customers and serve meals.</p>
              </div>

              <div className="challenge">
                <div className="npc">
                  <span>{customer.npc}</span>
                  <div>
                    <b>Cliente {round+1} / Customer {round+1}</b>

                    <h2>
                      {phase === 0
                        ? "¡Hola! ¡Tengo hambre!"
                        : `Quiero ${getFood(customer.food).order}, por favor.`}
                    </h2>

                    <p>
                      {phase === 0
                        ? "Hello! I'm hungry!"
                        : `I want ${getFood(customer.food).en}, please.`}
                    </p>

                    <Listen
                      text={
                        phase === 0
                          ? "¡Hola! ¡Tengo hambre!"
                          : `Quiero ${getFood(customer.food).order}, por favor.`
                      }
                    />
                  </div>
                </div>

                {phase === 0 && (
                  <div className="game-center">
                    <h2>👋 ¡Saluda! / Say hello!</h2>

                    <h2>
                      {young
                        ? "¡Hola!"
                        : "¡Buenas tardes! ¿Cómo está?"}
                    </h2>

                    <Listen
                      text={
                        young
                          ? "¡Hola!"
                          : "¡Buenas tardes! ¿Cómo está?"
                      }
                    />

                    <button
                      className="main-button"
                      onClick={() => setPhase(1)}
                    >
                      👋 ¡Bienvenido! / Welcome customer ➜
                    </button>
                  </div>
                )}

                {phase === 1 && (
                  <>
                    <h2>🍕 ¡Encuentra el plato! / Find the meal!</h2>

                    <div className="food-grid">
                      {foodOptions.map(id => (
                        <FoodButton
                          key={id}
                          id={id}
                          onClick={() => restaurantChoice(id)}
                        />
                      ))}
                    </div>
                  </>
                )}

                {phase === 2 && (
                  <div className="game-center">
                    <div className="huge dancing">
                      🍽️ {getFood(customer.food).emoji}
                    </div>

                    <h2>¡Aquí tiene! ¡Buen provecho!</h2>
                    <p>Here you are! Enjoy your meal!</p>

                    <Listen text="¡Aquí tiene! ¡Buen provecho!" />

                    <button
                      className="main-button"
                      onClick={() => {
                        complete(2, 10);
                        setPhase(3);
                      }}
                    >
                      🍽️ ¡Servir! / Serve the customer!
                    </button>
                  </div>
                )}

                {phase === 3 && (
                  <div className="victory">
                    <div className="huge dancing">
                      {customer.npc} 😋
                    </div>

                    <h2>¡Muchas gracias! / Thank you very much!</h2>

                    <button className="main-button" onClick={nextRound}>
                      🔔 Otro cliente / Next customer ➜
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 5: MYSTERY BOXES */}
          {place === "mystery" && (
            <>
              <div className="section-heading">
                <h2>🎁 ¡Las cajas misteriosas!</h2>
                <p>Open a box and solve a surprise challenge.</p>
              </div>

              <div className="challenge">
                {phase === 0 ? (
                  <div className="game-center">
                    <div className="huge dancing">🎁</div>

                    <h2>¿Qué hay en la caja?</h2>
                    <p>What's inside the box?</p>

                    <button
                      className="main-button"
                      onClick={() => {
                        setPhase(1);
                        say("¡Sorpresa!");
                      }}
                    >
                      🎁 ¡Abrir la caja! / Open the box!
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="huge">✨ 🎁 ✨</div>

                    <h2>{mystery.es}</h2>
                    <p>{mystery.en}</p>
                    <Listen text={mystery.es} />

                    <div className="choices">
                      {mystery.choices.map((c,i) => (
                        <button
                          key={i}
                          className={
                            choice === i
                              ? i === mystery.correct
                                ? "right"
                                : "wrong"
                              : ""
                          }
                          onClick={() => {
                            setChoice(i);

                            if (i === mystery.correct) complete(2);
                            else incorrect();
                          }}
                        >
                          <b>{c[0]}</b>
                          <small>{c[1]}</small>
                        </button>
                      ))}
                    </div>

                    {success && (
                      <div className="victory">
                        <h2>🏆 ¡Ganaste! / You won!</h2>

                        <button className="main-button" onClick={nextRound}>
                          🎁 Otra caja / Another mystery box ➜
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {/* 6: SUPERMARKET */}
          {place === "market" && (
            <>
              <div className="section-heading">
                <h2>🛒 ¡La carrera de compras!</h2>
                <p>Shopping Race! Find the three foods on your list.</p>
              </div>

              <div className="clue">
                <span>📝</span>

                <div>
                  <h2>Mi lista / My shopping list</h2>

                  {list.map((id,i) => (
                    <p key={id}>
                      {selectedFood.length > i ? "✅" : "🔎"}{" "}
                      {getFood(id).es} / {getFood(id).en}
                    </p>
                  ))}
                </div>
              </div>

              {!success ? (
                <>
                  <h2 className="center">
                    ¡Busca{" "}
                    {getFood(list[selectedFood.length]).es}!
                  </h2>

                  <p className="center">
                    Find the{" "}
                    {getFood(list[selectedFood.length]).en}!
                  </p>

                  <div className="center">
                    <Listen
                      text={getFood(list[selectedFood.length]).es}
                    />
                  </div>

                  <div className="food-grid">
                    {Array.from(new Set([
                      ...list,
                      "pizza","mango","rice","bread",
                      "cheese","water","chicken",
                      "apple","milk","orangejuice",
                      "tomato","banana",
                    ])).map(id => (
                      <FoodButton
                        key={id}
                        id={id}
                        onClick={() => buyItem(id)}
                      />
                    ))}
                  </div>

                  <div className="basket">
                    🛒 {selectedFood.map(id => getFood(id).emoji).join(" ")}
                    {" "}{selectedFood.length}/3
                  </div>
                </>
              ) : (
                <div className="victory">
                  <div className="huge">
                    🛒 {list.map(id => getFood(id).emoji).join(" ")}
                  </div>

                  <h2>¡Compra completa! / Shopping complete!</h2>

                  <button className="main-button" onClick={nextRound}>
                    🛒 Nueva lista / New shopping list ➜
                  </button>
                </div>
              )}
            </>
          )}

          {/* 7: SMOOTHIE SHOP */}
          {place === "smoothie" && (
            <>
              <div className="section-heading">
                <h2>🥤 ¡Prepara un batido!</h2>
                <p>Choose fruit, find ingredients, blend and drink!</p>
              </div>

              <div className="recipe-grid">
                {SMOOTHIES.map((s,i) => (
                  <button
                    key={i}
                    className={smoothie === i ? "selected" : ""}
                    onClick={() => {
                      setSmoothie(i);
                      resetRound();
                    }}
                  >
                    <span>{s.emoji}</span>
                    <b>{s.es}</b>
                    <small>{s.en}</small>
                  </button>
                ))}
              </div>

              <div className="challenge">
                <h2>{smoothieData.es}</h2>
                <p>{smoothieData.en}</p>

                {selectedFood.length < 3 ? (
                  <>
                    <div className="clue">
                      <span>🥤</span>

                      <div>
                        <h2>
                          ¡Busca{" "}
                          {getFood(
                            smoothieData.ingredients[selectedFood.length]
                          ).es}!
                        </h2>

                        <p>
                          Find{" "}
                          {getFood(
                            smoothieData.ingredients[selectedFood.length]
                          ).en}!
                        </p>

                        <Listen
                          text={
                            getFood(
                              smoothieData.ingredients[selectedFood.length]
                            ).es
                          }
                        />
                      </div>
                    </div>

                    <div className="food-grid">
                      {Array.from(new Set([
                        ...smoothieData.ingredients,
                        "apple","strawberry","banana",
                        "orange","water","mango",
                        "pineapple","milk","coconutwater",
                      ])).map(id => (
                        <FoodButton
                          key={id}
                          id={id}
                          onClick={() =>
                            chooseIngredient(id, smoothieData.ingredients)
                          }
                        />
                      ))}
                    </div>

                    <div className="basket">
                      🧺 {selectedFood.map(id => getFood(id).emoji).join(" ")}
                    </div>
                  </>
                ) : !success ? (
                  <div className="game-center">
                    <div className="huge dancing">
                      {phase === 2 ? "🥤" : "🫙"}
                      {" "}{smoothieData.emoji}
                    </div>

                    <h2>
                      {phase === 0 && "¡Ingredientes listos! / Ingredients ready!"}
                      {phase === 1 && "¡Mezclar! / Blend!"}
                      {phase === 2 && "¡Beber! / Drink!"}
                    </h2>

                    {phase === 1 && (
                      <div className="tap-dots">
                        {[0,1,2,3,4].map(i => (
                          <span
                            key={i}
                            className={i < taps ? "filled" : ""}
                          />
                        ))}
                      </div>
                    )}

                    <button
                      className="main-button"
                      onClick={smoothieAction}
                    >
                      {phase === 0 && "🥤 Empezar / Start!"}
                      {phase === 1 && "🌀 ¡Mezclar! / Blend!"}
                      {phase === 2 && "😋 ¡Beber! / Drink!"}
                    </button>
                  </div>
                ) : (
                  <div className="victory">
                    <div className="huge dancing">
                      {player.avatar} 🥤
                    </div>

                    <h2>¡Delicioso! / Delicious!</h2>

                    <button className="main-button" onClick={resetRound}>
                      🥤 Otro batido / Another smoothie ➜
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 8: FOOD DELIVERY */}
          {place === "delivery" && (
            <>
              <div className="section-heading">
                <h2>🚲 ¡Entrega la comida! / Food Delivery!</h2>
                <p>Find the right house and deliver the meal.</p>
              </div>

              <div className="challenge">
                <div className="huge">🚲 📦</div>

                <h2>
                  Entrega {round+1} / Delivery {round+1}
                </h2>

                <div className="clue">
                  <span>{delivery.npc}</span>

                  <div>
                    <h2>
                      Quiero {getFood(delivery.food).order}.
                    </h2>

                    <p>I want {getFood(delivery.food).en}.</p>

                    <Listen
                      text={`Quiero ${getFood(delivery.food).order}.`}
                    />

                    <h3>
                      ¡Ve a {HOUSES[delivery.house].es}!
                    </h3>

                    <p>
                      Go to the {HOUSES[delivery.house].en}!
                    </p>
                  </div>
                </div>

                {phase < 2 && (
                  <div className="houses">
                    {HOUSES.map((h,i) => (
                      <button
                        key={i}
                        className={choice === i ? "chosen" : ""}
                        onClick={() => deliveryChoice(i)}
                      >
                        <span>{h.emoji}</span>
                        <b>{h.es}</b>
                        <small>{h.en}</small>
                      </button>
                    ))}
                  </div>
                )}

                {phase === 2 && !success && (
                  <div className="game-center">
                    <div className="huge">
                      {delivery.npc} {getFood(delivery.food).emoji}
                    </div>

                    <h2>
                      {young
                        ? "¡Aquí tiene!"
                        : "¡Hola! Aquí tiene su comida. ¡Buen provecho!"}
                    </h2>

                    <p>
                      {young
                        ? "Here you are!"
                        : "Hello! Here is your food. Enjoy your meal!"}
                    </p>

                    <Listen
                      text={
                        young
                          ? "¡Aquí tiene!"
                          : "¡Hola! Aquí tiene su comida. ¡Buen provecho!"
                      }
                    />

                    <button
                      className="main-button"
                      onClick={() => complete(2)}
                    >
                      📦 ¡Entregar! / Deliver the meal!
                    </button>
                  </div>
                )}

                {success && (
                  <div className="victory">
                    <h2>📦 ¡Entrega completa! / Delivery complete!</h2>

                    <button className="main-button" onClick={nextRound}>
                      🚲 Otra entrega / Next delivery ➜
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 9: PICNIC */}
          {place === "picnic" && (
            <>
              <div className="section-heading">
                <h2>🧺 ¡Prepara el picnic! / Picnic Challenge!</h2>
                <p>Pack the right foods and drinks for the picnic.</p>
              </div>

              <div className="challenge">
                <div className="huge">🌳 🧺 🌸</div>

                <h2>¡Necesitamos {picnic.es}!</h2>
                <p>We need {picnic.en}!</p>

                <Listen text={`Necesitamos ${picnic.es}.`} />

                {!success ? (
                  <div className="choices food-choices">
                    {picnic.choices.map(id => (
                      <FoodButton
                        key={id}
                        id={id}
                        onClick={() => {
                          if (id === picnic.answer) complete(2);
                          else incorrect();
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="victory">
                    <div className="huge dancing">
                      🧺 {getFood(picnic.answer).emoji} ⭐
                    </div>

                    <h2>¡Perfecto! / Perfect!</h2>

                    <button className="main-button" onClick={nextRound}>
                      🧺 Otra misión / New picnic mission ➜
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {feedback && (
            <div className="feedback" role="status">
              {feedback}
            </div>
          )}

          <div className="bottom-actions">
            <button
              onClick={() => switchPlayer(active === 0 ? 1 : 0)}
            >
              🔄 Cambiar jugador / Switch player
            </button>

            <button
              onClick={() => {
                const index = PLACES.findIndex(p => p.id === place);
                travel(PLACES[(index+1) % PLACES.length].id);
              }}
            >
              ➜ Próximo lugar / Next place
            </button>
          </div>
        </section>

        <footer className="teacher-note">
          👩‍🏫 <b>Teacher:</b> Let the children take turns directing
          the adventure. Use the 🔊 buttons for Spanish pronunciation.
          Ask the 6-year-old for short expressions and the 9-year-old
          for complete sentences. You can revisit any location.
        </footer>
      </div>
    </main>
  );
}

const CSS = `
body {margin:0}

.mundo {
  min-height:100vh;
  background:#eff8ff;
  font-family:Arial,Helvetica,sans-serif;
  color:#29475d;
}

.mundo * {box-sizing:border-box}

.mundo button,.mundo input {font:inherit}

.mundo button {
  cursor:pointer;
  transition:transform .15s,background .15s;
}

.mundo button:active {transform:scale(.97)}

.mundo button:disabled {
  opacity:.55;
  cursor:not-allowed;
}

.mundo button:focus-visible {
  outline:3px solid #ffa44f;
  outline-offset:3px;
}

.header {
  background:white;
  border-bottom:5px solid #b6eaf1;
  padding:17px 25px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  flex-wrap:wrap;
  gap:12px;
}

.header strong {
  display:block;
  color:#ea64a0;
  font-size:27px;
}

.header small {
  display:block;
  margin-top:4px;
  color:#7296aa;
}

.scores {
  font-size:21px;
  color:#bd8d2e;
  font-weight:900;
}

.scores span {margin-left:15px}

.container {
  max-width:1380px;
  margin:auto;
  padding:17px;
}

.player-tabs {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:11px;
  margin-bottom:13px;
}

.player-tabs button {
  display:flex;
  align-items:center;
  gap:14px;
  padding:10px 14px;
  background:white;
  color:#466d82;
  border:3px solid #dbe9f2;
  border-radius:17px;
  text-align:left;
}

.player-tabs button.active {
  background:#fff0f8;
  border-color:#ed8ab4;
}

.player-tabs span {font-size:46px}

.player-tabs b,.player-tabs small {display:block}

.player-tabs small {
  margin-top:4px;
  color:#7899aa;
  font-size:11px;
}

.status {
  background:white;
  border-radius:17px;
  border:2px solid #dbeaf3;
  padding:13px 19px;
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:18px;
  margin-bottom:17px;
}

.big-avatar {font-size:56px}

.status label {
  font-weight:900;
  color:#678fa3;
  font-size:11px;
}

.status input {
  display:block;
  margin-top:5px;
  border:2px solid #d6e9f1;
  color:#29475d;
  background:white;
  border-radius:10px;
  padding:9px;
  width:155px;
}

.tummy {
  flex:1;
  min-width:180px;
  font-size:12px;
}

.meter {
  margin-top:9px;
  height:15px;
  border-radius:15px;
  background:#e7edf2;
  overflow:hidden;
}

.meter div {
  height:100%;
  background:#ffb45d;
  border-radius:15px;
  transition:width .3s;
}

.status > strong {color:#ba8d2c}

.world-title {text-align:center;margin:20px auto}

.world-title h2 {
  color:#438eaf;
  margin-bottom:5px;
}

.world-title p {color:#7696a7}

.world-map {
  display:grid;
  grid-template-columns:repeat(9,minmax(0,1fr));
  gap:7px;
  margin:16px 0;
}

.world-map button {
  position:relative;
  background:white;
  border:3px solid #d9e9f4;
  border-radius:16px;
  color:#416c85;
  padding:11px 4px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:5px;
  min-height:116px;
}

.world-map button.current {
  background:#fff0f8;
  border-color:#ed8eb7;
  color:#c94e86;
}

.world-map span {font-size:30px}

.world-map b {
  font-size:11px;
  text-align:center;
}

.world-map small {
  font-size:10px;
  text-align:center;
}

.world-map em {
  font-size:9px;
  color:#93aab7;
  font-style:normal;
}

.world-map i {
  position:absolute;
  right:3px;
  top:1px;
  font-size:11px;
  font-style:normal;
}

.world-scene {
  position:relative;
  height:275px;
  border:6px solid white;
  border-radius:24px;
  overflow:hidden;
  background:linear-gradient(#ffe0cd 0 65%,#c99b76 65%);
  box-shadow:0 6px 0 #c5e0ea;
  margin-bottom:20px;
}

.scene-treasure,.scene-market {
  background:linear-gradient(#cfeeff 0 65%,#b5d39e 65%);
}

.scene-kitchen,.scene-smoothie {
  background:linear-gradient(#fff0bb 0 65%,#9ac7aa 65%);
}

.scene-restaurant {
  background:linear-gradient(#f9cfb3 0 65%,#ab765b 65%);
}

.scene-mystery {
  background:linear-gradient(#eed6ff 0 65%,#b38bc9 65%);
}

.scene-delivery,.scene-picnic {
  background:linear-gradient(#a7e5ff 0 65%,#8fd08a 65%);
}

.scene-sign {
  position:absolute;
  top:13px;
  left:15px;
  z-index:2;
  background:#ffffffef;
  border-radius:13px;
  padding:10px 15px;
}

.scene-sign strong,.scene-sign small {display:block}

.scene-sign small {
  font-size:12px;
  color:#7c98a8;
  margin-top:3px;
}

.scene-decor {
  position:absolute;
  top:23px;
  right:6%;
  font-size:55px;
  opacity:.9;
}

.characters {
  position:absolute;
  bottom:13px;
  width:100%;
  display:flex;
  justify-content:center;
  align-items:flex-end;
  gap:30px;
  z-index:2;
  padding:0 10px;
}

.person {
  font-size:72px;
  text-align:center;
  animation:float 2.4s ease-in-out infinite;
}

.person span {display:block}

.person b {
  display:block;
  background:#ffffffdd;
  padding:5px;
  border-radius:10px;
  font-size:11px;
}

.bubble {
  align-self:center;
  background:white;
  border:3px solid #dcecf3;
  border-radius:18px;
  max-width:290px;
  padding:15px;
  text-align:center;
}

.bubble strong {
  display:block;
  color:#368cb5;
  font-size:19px;
}

.bubble small {
  display:block;
  color:#7996a6;
  margin-top:6px;
}

.play-area {
  padding:24px;
  background:white;
  border:3px solid #dfeaf4;
  border-radius:25px;
}

.section-heading {
  text-align:center;
  margin:0 auto 20px;
}

.section-heading h2 {
  color:#e86b9d;
  font-size:clamp(24px,4vw,36px);
  margin:0 0 8px;
}

.section-heading p {
  color:#7893a4;
  line-height:1.5;
}

.challenge {
  max-width:980px;
  margin:15px auto;
  padding:23px;
  background:#fff8ed;
  border:3px solid #efd9b4;
  border-radius:23px;
  text-align:center;
}

.challenge h2,.clue h2 {
  color:#388ab3;
}

.challenge p,.clue p {
  line-height:1.5;
}

.huge {
  font-size:80px;
  margin:15px auto;
}

.npc,.clue {
  max-width:780px;
  margin:17px auto;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:17px;
  border-radius:18px;
  padding:17px;
  background:#eaf8ff;
  text-align:left;
}

.npc > span,.clue > span {
  font-size:72px;
  flex-shrink:0;
}

.npc h2,.clue h2 {
  font-size:clamp(22px,3vw,31px);
  margin:8px 0;
}

.npc p,.clue p {
  margin:6px 0 11px;
}

.clue {
  background:#fff1d3;
  border:3px dashed #eac178;
}

.clue h2 {color:#ac772b}

.clue small {font-weight:900;color:#ac853e}

.listen {
  background:#68b8e5;
  color:white;
  border:0;
  border-radius:12px;
  padding:12px 17px;
  font-weight:900;
  margin:8px 0;
}

.choices {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:12px;
  margin:20px auto;
}

.choices button {
  background:#fff0d5;
  color:#765734;
  border:3px solid #eed0a0;
  border-radius:16px;
  padding:17px 10px;
  min-height:85px;
}

.choices b,.choices small {display:block}

.choices small {
  margin-top:6px;
  color:#887966;
  font-size:12px;
}

.choices button.right {
  background:#e0ffed;
  border-color:#65cb96;
}

.choices button.wrong {
  background:#ffe5e9;
  border-color:#eaa2b0;
}

.main-button {
  display:block;
  background:linear-gradient(120deg,#ff85b2,#e95796);
  color:white;
  border:0;
  border-radius:16px;
  box-shadow:0 5px 0 #b63875;
  font-weight:900;
  min-height:57px;
  padding:16px 20px;
  width:min(100%,530px);
  margin:20px auto;
  font-size:16px;
}

.victory {
  background:#e5ffed;
  border:3px solid #a3e3bb;
  border-radius:19px;
  padding:18px;
  text-align:center;
  margin:20px auto;
}

.victory h2 {color:#2b965d}

.cupboards {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:13px;
  margin:23px auto;
  max-width:720px;
}

.cupboards button {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:7px;
  min-height:136px;
  background:#b78a60;
  color:white;
  border:5px solid #946941;
  border-radius:18px;
  padding:12px;
}

.cupboards span {font-size:50px}

.cupboards b,.cupboards small {text-align:center}

.cupboards b {font-size:13px}

.cupboards small {font-size:11px}

.cupboards button.opened {
  background:#f7e9d4;
  color:#617385;
  border-color:#e5cdaf;
}

.cupboards button.treasure {
  background:#dfffe7;
  color:#287a50;
  border-color:#60cb91;
}

.recipe-grid {
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:10px;
  margin:15px auto 24px;
}

.recipe-grid button {
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:6px;
  background:#f4faff;
  color:#3b6b82;
  border:3px solid #d9eaf3;
  border-radius:16px;
  padding:13px 6px;
}

.recipe-grid button.selected {
  background:#fff1d2;
  border-color:#efb962;
}

.recipe-grid span {font-size:44px}

.recipe-grid b,.recipe-grid small {
  text-align:center;
}

.recipe-grid b {font-size:13px}

.recipe-grid small {font-size:11px}

.food-grid {
  display:grid;
  grid-template-columns:repeat(5,minmax(0,1fr));
  gap:9px;
  margin:20px auto;
}

.food-button {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:6px;
  padding:11px 5px;
  background:#f2faff;
  color:#3f6b82;
  border:3px solid #d7e9f2;
  border-radius:15px;
  min-height:114px;
}

.food-button:hover {
  background:#fff1d6;
  border-color:#edc17c;
}

.food-button span {font-size:38px}

.food-button b,.food-button small {
  display:block;
  text-align:center;
}

.food-button b {font-size:12px}

.food-button small {
  color:#7894a3;
  font-size:11px;
}

.basket {
  background:#f1ecff;
  border:2px dashed #bda5ee;
  border-radius:14px;
  padding:16px;
  margin:18px auto;
  font-size:23px;
  font-weight:900;
}

.game-center {
  text-align:center;
  padding:15px;
}

.tap-dots {
  display:flex;
  justify-content:center;
  gap:9px;
  margin:19px auto;
}

.tap-dots span {
  width:22px;
  height:22px;
  border-radius:50%;
  background:#e3e9ef;
}

.tap-dots span.filled {
  background:#66ce93;
}

.houses {
  display:grid;
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:13px;
  margin:22px auto;
}

.houses button {
  background:#f1faff;
  color:#3c6d86;
  border:3px solid #d5e8f4;
  border-radius:18px;
  padding:20px 9px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;
}

.houses button.chosen {
  background:#fff0d0;
  border-color:#ebba62;
}

.houses span {font-size:70px}

.houses b,.houses small {text-align:center}

.food-choices {
  max-width:720px;
  margin:25px auto;
}

.feedback {
  max-width:800px;
  margin:20px auto;
  padding:17px;
  background:#e5fff0;
  border:2px solid #8bdbaf;
  border-radius:15px;
  text-align:center;
  font-weight:900;
}

.bottom-actions {
  display:flex;
  justify-content:space-between;
  gap:12px;
  flex-wrap:wrap;
  border-top:2px solid #edf2f6;
  padding-top:20px;
  margin-top:25px;
}

.bottom-actions button {
  background:#e6f4ff;
  color:#3b789c;
  border:0;
  border-radius:12px;
  padding:14px;
  font-weight:900;
}

.teacher-note {
  margin:20px 0;
  padding:18px;
  background:#e1f7e9;
  border:2px solid #b7e2c7;
  border-radius:15px;
  font-size:13px;
  line-height:1.7;
}

.center {text-align:center}

.dancing {
  animation:float 1.4s ease-in-out infinite;
}

@keyframes float {
  0%,100% {transform:translateY(0)}
  50% {transform:translateY(-9px)}
}

@media(max-width:1150px) {
  .world-map {
    grid-template-columns:repeat(5,minmax(0,1fr));
  }
  .food-grid {
    grid-template-columns:repeat(4,minmax(0,1fr));
  }
}

@media(max-width:800px) {
  .world-map {
    grid-template-columns:repeat(3,minmax(0,1fr));
  }
  .recipe-grid {
    grid-template-columns:repeat(2,minmax(0,1fr));
  }
  .food-grid {
    grid-template-columns:repeat(3,minmax(0,1fr));
  }
  .scene-decor {font-size:35px}
}

@media(max-width:550px) {
  .container {padding:9px}
  .play-area {padding:13px}
  .challenge {padding:12px}

  .header {padding:12px}
  .header strong {font-size:22px}

  .player-tabs span {font-size:34px}
  .player-tabs b {font-size:12px}
  .player-tabs small {font-size:10px}

  .status {gap:9px;padding:10px}
  .big-avatar {font-size:38px}

  .world-map {gap:6px}
  .world-map button {
    min-height:105px;
    padding:8px 3px;
  }
  .world-map span {font-size:25px}
  .world-map b {font-size:10px}
  .world-map small,.world-map em {font-size:9px}

  .world-scene {height:210px}
  .characters {gap:8px}
  .person {font-size:47px}
  .bubble {padding:8px;max-width:145px}
  .bubble strong {font-size:13px}
  .bubble small {font-size:10px}
  .scene-decor {top:58px;font-size:23px}

  .npc,.clue {padding:10px;gap:10px}
  .npc > span,.clue > span {font-size:43px}

  .choices {grid-template-columns:1fr}
  .cupboards {gap:6px}
  .cupboards button {min-height:104px;padding:6px}
  .cupboards span {font-size:34px}
  .cupboards b,.cupboards small {font-size:10px}

  .food-grid {gap:6px}
  .food-button {min-height:96px;padding:8px 3px}
  .food-button span {font-size:28px}
  .food-button b {font-size:10px}
  .food-button small {font-size:9px}

  .recipe-grid span {font-size:36px}
  .houses span {font-size:40px}
  .houses b,.houses small {font-size:10px}

  .huge {font-size:58px}
  .bottom-actions button {font-size:12px;padding:11px}
}
`;
