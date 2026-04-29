import { useState, useEffect } from "react";

// ── Pre-loaded pantry ──────────────────────────────────────────────────────────
const INITIAL_INGREDIENTS = [
  { id: 1, name: "Raspberries", qty: "12", unit: "oz" },
  { id: 2, name: "Bananas", qty: "6", unit: "lbs" },
  { id: 3, name: "Avocados", qty: "12", unit: "pcs" },
  { id: 4, name: "Fully cooked chicken sausages", qty: "70", unit: "pcs" },
  { id: 5, name: "Smoothie blend (mango, dragon fruit, passionfruit)", qty: "6×227g", unit: "" },
  { id: 6, name: "Organic ground paprika", qty: "13.2", unit: "oz" },
  { id: 7, name: "Organic coconut water", qty: "14×14 fl oz", unit: "" },
  { id: 8, name: "Blueberry sourdough bread", qty: "1", unit: "loaf" },
  { id: 9, name: "Multivitamin + gut health wellness shots", qty: "10", unit: "pcs" },
  { id: 10, name: "Organic chicken thighs", qty: "5", unit: "lbs" },
  { id: 11, name: "Medium cheddar cheese", qty: "40", unit: "oz" },
  { id: 12, name: "Beef bone broth", qty: "6×16.9 fl oz", unit: "" },
  { id: 13, name: "Organic chicken wings", qty: "5", unit: "lbs" },
  { id: 14, name: "Wagyu beef tallow", qty: "2×11.5 oz", unit: "" },
  { id: 15, name: "Chocolate peanut butter protein powder", qty: "16", unit: "oz" },
  { id: 16, name: "Protein oats", qty: "16", unit: "oz" },
  { id: 17, name: "Mangoes", qty: "6", unit: "pcs" },
  { id: 18, name: "Wildberry protein oats with flax and chia seeds", qty: "32", unit: "oz" },
  { id: 19, name: "Shelled walnuts", qty: "16", unit: "oz" },
  { id: 20, name: "Farfalle protein pasta", qty: "2×14.5 oz", unit: "" },
  { id: 21, name: "Elbow pasta", qty: "2 lbs", unit: "" },
  { id: 22, name: "Everyday matcha powder", qty: "12", unit: "oz" },
  { id: 23, name: "Organic wide egg noodles", qty: "16", unit: "oz" },
  { id: 24, name: "Raw unfiltered organic apple cider vinegar", qty: "8", unit: "oz" },
  { id: 25, name: "Pure vanilla extract", qty: "8", unit: "oz" },
  { id: 26, name: "Spaghetti pasta", qty: "3 lbs", unit: "" },
  { id: 27, name: "Fettuccine pasta", qty: "8", unit: "oz" },
  { id: 28, name: "Coconut bites (cacao nibs & dark chocolate)", qty: "8", unit: "oz" },
  { id: 29, name: "Medium shell pasta", qty: "8", unit: "oz" },
  { id: 30, name: "Toasted marshmallow syrup", qty: "25", unit: "fl oz" },
  { id: 31, name: "Organic dates", qty: "32", unit: "oz" },
  { id: 32, name: "Organic all-purpose flour", qty: "1", unit: "lb" },
  { id: 33, name: "Cornstarch", qty: "12", unit: "oz" },
  { id: 34, name: "Italian stewed tomatoes (basil, garlic, oregano)", qty: "14.5", unit: "oz" },
  { id: 35, name: "Organic spicy arrabbiata pasta sauce", qty: "25", unit: "oz" },
  { id: 36, name: "Justin's honey peanut butter spread", qty: "14", unit: "oz" },
  { id: 37, name: "Pure pumpkin, canned", qty: "30", unit: "oz" },
  { id: 38, name: "Lightly salted dry roasted peanuts", qty: "28", unit: "oz" },
  { id: 39, name: "Tomato paste, canned", qty: "6", unit: "oz" },
  { id: 40, name: "Dark chocolate baking chips (no sugar added)", qty: "32", unit: "oz" },
  { id: 41, name: "Heavy whipping cream", qty: "4", unit: "oz" },
  { id: 42, name: "Organic Greek yogurt, plain", qty: "48", unit: "oz" },
  { id: 43, name: "Organic cream top whole milk", qty: "0.5", unit: "gallon" },
  { id: 44, name: "Philadelphia 1/3 less fat cream cheese", qty: "16", unit: "oz" },
  { id: 45, name: "Dill pickle chips", qty: "52", unit: "fl oz" },
  { id: 46, name: "Pasture-raised eggs", qty: "20", unit: "pcs" },
  { id: 47, name: "Homemade cream cheese", qty: "6", unit: "oz" },
  { id: 48, name: "Philadelphia strawberry cream cheese", qty: "7", unit: "oz" },
  { id: 49, name: "Philadelphia honey pecan cream cheese", qty: "7", unit: "oz" },
  { id: 50, name: "Organic maple syrup", qty: "5", unit: "oz" },
  { id: 51, name: "Hellmann's light mayonnaise", qty: "10", unit: "oz" },
  { id: 52, name: "Organic ketchup", qty: "18", unit: "oz" },
  { id: 53, name: "Organic yellow mustard", qty: "2", unit: "oz" },
  { id: 54, name: "Chunky guacamole", qty: "12", unit: "oz" },
  { id: 55, name: "Soy sauce", qty: "3", unit: "fl oz" },
  { id: 56, name: "Grass-fed butter", qty: "4", unit: "oz" },
  { id: 57, name: "Garlic (heads)", qty: "6", unit: "pcs" },
  { id: 58, name: "Chicken sausages with Parmesan & cracked black pepper", qty: "7", unit: "pcs" },
  { id: 59, name: "Parmigiano Reggiano", qty: "1", unit: "lb" },
  { id: 60, name: "Fire roasted vegetable melange (brussels sprouts, bell peppers, mushrooms, red onion)", qty: "1", unit: "bag" },
  { id: 61, name: "Raw jumbo shrimp, peeled & deveined", qty: "2", unit: "lbs" },
  { id: 62, name: "Real Good Foods lightly breaded chicken breast chunks", qty: "16", unit: "oz" },
  { id: 63, name: "Frozen mixed vegetables (carrots, corn, green beans, peas)", qty: "48", unit: "oz" },
  { id: 64, name: "100% organic grass-fed ground beef", qty: "10.5", unit: "lbs" },
  { id: 65, name: "Honey wheat sliced bread", qty: "0.5", unit: "loaf" },
  { id: 66, name: "Chicago style poppy seed hot dog buns", qty: "6", unit: "pcs" },
  { id: 67, name: "Baby Dutch yellow potatoes", qty: "1", unit: "lb" },
  { id: 68, name: "Sweet potato", qty: "1", unit: "pc" },
  { id: 69, name: "Sourdough bread", qty: "1", unit: "loaf" },
  { id: 70, name: "Roast potatoes, unbaked", qty: "5", unit: "lbs" },
  { id: 71, name: "Jasmine rice, uncooked", qty: "2", unit: "lbs" },
  { id: 72, name: "Light sour cream", qty: "16", unit: "oz" },
  { id: 73, name: "Cotija Mexican style grated cheese", qty: "16", unit: "oz" },
  { id: 74, name: "La Chona Crema natural sour cream", qty: "24", unit: "oz" },
  { id: 75, name: "Shredded Chihuahua cheese", qty: "1", unit: "lb" },
  { id: 76, name: "Queso fresco", qty: "5", unit: "oz" },
  { id: 77, name: "Organic extra-virgin olive oil", qty: "1.5", unit: "L" },
  { id: 78, name: "Uncooked flour tortillas", qty: "4 lbs", unit: "" },
  { id: 79, name: "Everything bagels (8-count)", qty: "8", unit: "pcs" },
  { id: 80, name: "Avocado oil spray", qty: "13.5", unit: "oz" },
  { id: 81, name: "Granulated garlic seasoning", qty: "20", unit: "oz" },
  { id: 82, name: "Tabasco pepper sauce", qty: "4", unit: "fl oz" },
  { id: 83, name: "Fine grain sea salt", qty: "14", unit: "oz" },
  { id: 84, name: "Organic Saigon cinnamon, ground", qty: "10", unit: "oz" },
  { id: 85, name: "Double acting baking powder", qty: "6", unit: "oz" },
  { id: 86, name: "Mediterranean sea salt, coarse", qty: "30", unit: "oz" },
  { id: 87, name: "Ground cumin seasoning", qty: "14", unit: "oz" },
  { id: 88, name: "Baking soda", qty: "16", unit: "oz" },
  { id: 89, name: "Organic unsweetened cacao powder", qty: "8", unit: "oz" },
  { id: 90, name: "Dark chocolate sea salt caramel sauce", qty: "12.5", unit: "oz" },
  { id: 91, name: "Onion powder", qty: "2", unit: "oz" },
  { id: 92, name: "Organic cayenne pepper seasoning", qty: "2", unit: "oz" },
  { id: 93, name: "GOYA adobo all-purpose seasoning", qty: "1", unit: "jar" },
  { id: 94, name: "Italian seasoning", qty: "10", unit: "g" },
  { id: 95, name: "Lemon pepper seasoning", qty: "10", unit: "g" },
  { id: 96, name: "Old Bay seasoning", qty: "10", unit: "g" },
  { id: 97, name: "Chili powder blend", qty: "5", unit: "g" },
  { id: 98, name: "Ground coriander", qty: "10", unit: "oz" },
  { id: 99, name: "Organic pumpkin pie spice", qty: "1", unit: "oz" },
  { id: 100, name: "Rice seasoning", qty: "1", unit: "oz" },
  { id: 101, name: "Organic curry powder", qty: "1", unit: "oz" },
  { id: 102, name: "Ground ginger", qty: "2", unit: "oz" },
  { id: 103, name: "Red crushed chili pepper flakes", qty: "2", unit: "oz" },
  { id: 104, name: "Black pepper", qty: "1", unit: "oz" },
  { id: 105, name: "Whole kernel golden sweet corn, canned", qty: "15", unit: "oz" },
];

// ── Macro targets for lean bulk (155 lbs, 6'0", ~19% BF, active, goal +25 lbs muscle) ──
// TDEE ~2,800 kcal → lean bulk target ~3,100 kcal
// Protein: 1g per lb LBW (~125g LBW) → 175g
// Fat: 25% cals → ~86g
// Carbs: remainder → ~380g
const MACRO_TARGETS = { calories: 3100, protein: 175, carbs: 380, fat: 86 };
const GOAL_WEIGHT = 180; // lbs (mid of +20-30 range)
const START_WEIGHT = 155;

const STORAGE_KEY = "pantry_v3";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    ingredients: INITIAL_INGREDIENTS,
    mealLog: [],
    weightLog: [{ date: new Date().toISOString().split("T")[0], weight: 155 }],
    todaysMeals: null,
    lastGenerated: null,
    mealMood: "",
  };
}

function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

// ── Pantry decrement helpers ─────────────────────────────────────────────────
const UNIT_MAP = {
  "lb": "lbs", "lbs": "lbs", "pound": "lbs", "pounds": "lbs",
  "oz": "oz", "ounce": "oz", "ounces": "oz",
  "g": "g", "gram": "g", "grams": "g",
  "kg": "kg", "kilogram": "kg", "kilograms": "kg",
  "ml": "ml", "milliliter": "ml", "milliliters": "ml",
  "l": "l", "liter": "l", "liters": "l",
  "pc": "pcs", "pcs": "pcs", "piece": "pcs", "pieces": "pcs", "ct": "pcs", "count": "pcs",
  "fl oz": "fl oz", "floz": "fl oz",
  "cup": "cup", "cups": "cup",
  "tsp": "tsp", "teaspoon": "tsp", "teaspoons": "tsp",
  "tbsp": "tbsp", "tablespoon": "tbsp", "tablespoons": "tbsp",
};
const KNOWN_UNITS = new Set(Object.values(UNIT_MAP));

function normalizeUnit(u) {
  if (!u) return "";
  const k = String(u).toLowerCase().replace(/\s+/g, " ").trim();
  return UNIT_MAP[k] || k;
}

function parseAmount(amountStr) {
  if (!amountStr) return null;
  const m = String(amountStr).trim().match(/^([\d.]+)\s*(.*)$/);
  if (!m) return null;
  const value = parseFloat(m[1]);
  if (!isFinite(value) || value <= 0) return null;
  const rest = (m[2] || "").trim().toLowerCase();
  const unitMatch = rest.match(/^(fl\s*oz|[a-z]+)/);
  const unit = unitMatch ? normalizeUnit(unitMatch[1]) : "";
  return { value, unit };
}

function unitsCompatible(amountUnit, pantryUnit) {
  const a = normalizeUnit(amountUnit);
  const p = normalizeUnit(pantryUnit);
  if (a === p) return true;
  if (p === "pcs" && !KNOWN_UNITS.has(a)) return true;
  return false;
}

function findPantryMatch(itemName, pantry) {
  const needle = String(itemName || "").toLowerCase().trim();
  if (!needle) return null;
  let m = pantry.find(p => p.name.toLowerCase() === needle);
  if (m) return m;
  m = pantry.find(p => p.name.toLowerCase().includes(needle));
  if (m) return m;
  m = pantry.find(p => needle.includes(p.name.toLowerCase()));
  if (m) return m;
  const words = needle.split(/\s+/).filter(w => w.length > 3);
  for (const w of words) {
    m = pantry.find(p => p.name.toLowerCase().includes(w));
    if (m) return m;
  }
  return null;
}

// direction: -1 to deduct (eaten), +1 to restore (un-ate)
function applyMealToInventory(ingredients, meal, direction) {
  if (!meal?.ingredients_with_amounts) return ingredients;
  const updated = ingredients.map(i => ({ ...i }));
  const claimed = new Set();
  for (const mi of meal.ingredients_with_amounts) {
    const candidates = updated.filter(p => !claimed.has(p.id));
    const match = findPantryMatch(mi.item, candidates);
    if (!match) continue;
    const amt = parseAmount(mi.amount);
    if (!amt) continue;
    if (!unitsCompatible(amt.unit, match.unit)) continue;
    const pantryQty = parseFloat(match.qty);
    if (!isFinite(pantryQty)) continue;
    const newQty = Math.max(0, pantryQty + direction * amt.value);
    match.qty = String(+newQty.toFixed(2));
    claimed.add(match.id);
  }
  return updated;
}

const TABS = [
  { id: "meals", icon: "🍳", label: "Meals" },
  { id: "macros", icon: "📊", label: "Macros" },
  { id: "weight", icon: "⚖️", label: "Weight" },
  { id: "pantry", icon: "🧺", label: "Pantry" },
];

const MEAL_META = {
  breakfast: { icon: "☀️", color: "#f4a261", label: "BREAKFAST" },
  lunch:     { icon: "🥗", color: "#52b788", label: "LUNCH" },
  dinner:    { icon: "🌙", color: "#5e81f4", label: "DINNER" },
  snack:     { icon: "⚡", color: "#f9c74f", label: "SNACK" },
};

// ── Storage classification ───────────────────────────────────────────────────
// Manny's rule: shelf-stable = goes in the pantry. Anything in the fridge,
// freezer, or that goes bad on the counter is perishable.
const PERISHABLE_KEYWORDS = [
  "raspberry","raspberries","banana","avocado","mango","shrimp","egg","milk","cream","yogurt","berry","berries","fresh","produce","chicken thigh","chicken wing","ground beef","beef",
  "bread","sourdough","bagel","bun","tortilla","loaf",
  "cheese","cheddar","parmesan","parmigiano","cotija","chihuahua","queso","fresco",
  "butter","crema",
  "sweet potato","potato",
  "pickle","guacamole","mayo","mayonnaise","mustard","ketchup",
  "broth","stock",
  "frozen","smoothie","melange",
  "chicken","sausage",
  "strawberry","blueberry","blackberry",
];
const FROZEN_KEYWORDS = [
  "frozen","smoothie blend","melange","ground beef","shrimp","real good foods","lightly breaded chicken","chicken wings","chicken thigh",
];

function isPerishable(item) {
  if (!item) return false;
  if (typeof item.perishable === "boolean") return item.perishable;
  return PERISHABLE_KEYWORDS.some(k => item.name.toLowerCase().includes(k));
}
function isFrozen(item) {
  if (!item) return false;
  if (typeof item.frozen === "boolean") return item.frozen;
  return FROZEN_KEYWORDS.some(k => item.name.toLowerCase().includes(k));
}

export default function App() {
  const [state, setState] = useState(loadState);
  const [tab, setTab] = useState("meals");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [macroInput, setMacroInput] = useState({ calories: "", protein: "", carbs: "", fat: "" });
  const [showMacroLog, setShowMacroLog] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [mealEditForm, setMealEditForm] = useState(null);

  useEffect(() => { saveState(state); }, [state]);

  // ── Meal generation ──────────────────────────────────────────────────────────
  async function generateMeals() {
    setLoading(true); setError("");
    const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    const recent = state.mealLog.slice(-8).map(m => m.name).join(", ");
    const pantry = state.ingredients.map(i => i.name).join(", ");

    const mealSchema = '{"name":"","description":"one sentence overview","ingredients_with_amounts":[{"item":"ingredient name","amount":"e.g. 2 eggs or 1 cup rice"}],"recipe_steps":["Step 1...","Step 2...","Step 3..."],"macros":{"calories":0,"protein":0,"carbs":0,"fat":0}}';
    const schema = '{"date":"DATE","total_macros":{"calories":0,"protein":0,"carbs":0,"fat":0},"breakfast":' + mealSchema + ',"lunch":' + mealSchema + ',"dinner":' + mealSchema + ',"snack":' + mealSchema + ',"tip":""}';

    const moodLine = state.mealMood?.trim()
      ? "Tailor meals to this mood/craving: " + state.mealMood.trim()
      : null;
    const frozenItems = state.ingredients.filter(isFrozen).map(i => i.name);
    const frozenLine = frozenItems.length > 0
      ? "Frozen ingredients (must be thawed before use): " + frozenItems.join(", ") + ". If a meal uses any frozen ingredient, include a thaw reminder in that meal's description (e.g. \"Move ground beef from freezer to fridge the night before\")."
      : null;

    const lines = [
      "You are a meal planner. Your ENTIRE response must be a single valid JSON object with no markdown, no code fences, no text before or after. Start with { and end with }.",
      "",
      "Plan a full day for Manny: 18yo male, 6ft, 155lbs, lean bulk, ~3100 cal/day, 175g protein. Today is " + today + ".",
      "Use ONLY these pantry ingredients (salt, pepper, oil, water always available): " + pantry,
      "Avoid repeating: " + (recent || "none"),
      ...(moodLine ? [moodLine] : []),
      ...(frozenLine ? [frozenLine] : []),
      "",
      "IMPORTANT: For each meal include:",
      "- ingredients_with_amounts: exact amounts for each ingredient (e.g. '3 eggs', '1 cup jasmine rice', '6oz chicken thigh')",
      "- recipe_steps: 3-5 clear numbered cooking steps",
      "- description: one sentence overview of the dish",
      "",
      "Fill in this exact JSON structure:",
      schema
    ];
    const prompt = lines.join("\n");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4000,
          system: "You are a meal planner API. You ONLY output raw valid JSON. Never use markdown. Never use code fences. Your response must always start with { and end with }. Every meal object MUST include: name, description, ingredients_with_amounts (array of {item, amount} objects), recipe_steps (array of strings), and macros ({calories, protein, carbs, fat}).",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const rawText = data.content?.find(b => b.type === "text")?.text || "";
      const start = rawText.indexOf("{");
      const end = rawText.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No JSON in response: " + rawText.slice(0, 150));
      const meals = JSON.parse(rawText.slice(start, end + 1));
      console.log("PARSED MEALS:", JSON.stringify(meals.breakfast, null, 2));
      setState(s => ({
        ...s,
        todaysMeals: meals,
        lastGenerated: new Date().toISOString(),
        ateToday: [],
        planHistory: s.todaysMeals
          ? [{ plan: s.todaysMeals, ateToday: s.ateToday || [], savedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }, ...(s.planHistory || [])].slice(0, 10)
          : (s.planHistory || []),
        mealLog: [...s.mealLog,
          ...(["breakfast","lunch","dinner","snack"].map(t => ({ name: meals[t]?.name || t, date: meals.date, type: t })))
        ].slice(-40)
      }));
      setTab("meals");
    } catch (e) {
      setError("Error: " + (e.message || "Generation failed — try again."));
    }
    setLoading(false);
  }

  // ── Weight log ───────────────────────────────────────────────────────────────
  function logWeight() {
    const w = parseFloat(weightInput);
    if (!w || w < 80 || w > 400) return;
    const today = new Date().toISOString().split("T")[0];
    setState(s => ({
      ...s,
      weightLog: [...s.weightLog.filter(e => e.date !== today), { date: today, weight: w }]
        .sort((a, b) => a.date.localeCompare(b.date))
    }));
    setWeightInput("");
  }

  // ── Macro log ────────────────────────────────────────────────────────────────
  function logMacros() {
    const { calories, protein, carbs, fat } = macroInput;
    if (!calories) return;
    const today = new Date().toISOString().split("T")[0];
    const entry = {
      date: today,
      calories: +calories || 0,
      protein: +protein || 0,
      carbs: +carbs || 0,
      fat: +fat || 0,
    };
    setState(s => ({
      ...s,
      macroLog: [...(s.macroLog || []).filter(e => e.date !== today), entry]
        .sort((a, b) => a.date.localeCompare(b.date)).slice(-30)
    }));
    setMacroInput({ calories: "", protein: "", carbs: "", fat: "" });
  }

  const meals = state.todaysMeals;
  const latestWeight = state.weightLog.length ? state.weightLog[state.weightLog.length - 1].weight : START_WEIGHT;
  const lbsGained = +(latestWeight - START_WEIGHT).toFixed(1);
  const progressPct = Math.min(100, Math.max(0, (lbsGained / (GOAL_WEIGHT - START_WEIGHT)) * 100));
  const todayMacroLog = (state.macroLog || []).find(e => e.date === new Date().toISOString().split("T")[0]);

  return (
    <div style={{ minHeight: "100vh", background: "#111216", color: "#eee", fontFamily: "'DM Serif Display', Georgia, serif", maxWidth: 640, margin: "0 auto" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; }
        input, select, textarea { outline: none; }
        button { cursor: pointer; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
        @keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }
        .shimmer { animation: shimmer 1.5s ease-in-out infinite; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding: "28px 20px 0", borderBottom: "1px solid #1e1f24" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "3px", color: "#666", marginBottom: 4, textTransform: "uppercase" }}>Manny · Lean Bulk</div>
            <h1 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.5px", color: "#f0e6d0" }}>Pantry Planner</h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#888" }}>
              <span style={{ color: "#f4a261", fontWeight: 600 }}>{latestWeight} lbs</span> / {GOAL_WEIGHT} lbs goal
            </div>
            <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
              {lbsGained >= 0 ? `+${lbsGained}` : lbsGained} lbs gained
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: "#1e1f24", marginBottom: 16, position: "relative" }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #f4a261, #f9c74f)", transition: "width 0.8s ease" }} />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, background: "none", border: "none", padding: "10px 0",
              color: tab === t.id ? "#f0e6d0" : "#555",
              borderBottom: tab === t.id ? "2px solid #f4a261" : "2px solid transparent",
              fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "1px",
              transition: "all 0.2s"
            }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{t.icon}</div>
              <div>{t.label.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px 40px" }}>

        {/* ══ MEALS TAB ══ */}
        {tab === "meals" && (
          <div className="fade-up">
            {/* Mood / craving input — feeds into meal generation */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 6 }}>
                WHAT ARE YOU FEELING LIKE EATING TODAY?
              </label>
              <input
                type="text"
                value={state.mealMood || ""}
                onChange={e => setState(s => ({ ...s, mealMood: e.target.value }))}
                placeholder="e.g. savory, sweet, light, comfort food, beef, chicken"
                style={{ width: "100%", background: "#1a1b20", border: "1px solid #2a2a30", color: "#eee", fontSize: 13, padding: "9px 12px", fontFamily: "'DM Mono', monospace", boxSizing: "border-box" }}
              />
            </div>
            {!meals ? (
              <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🍽️</div>
                <p style={{ color: "#666", fontSize: 15, marginBottom: 24, fontStyle: "italic" }}>
                  No meals yet for today. Generate your plan from your pantry.
                </p>
                <button onClick={generateMeals} disabled={loading} style={genBtnStyle(loading)}>
                  {loading ? <span className="shimmer">GENERATING…</span> : "✦ GENERATE TODAY'S MEALS"}
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 14, color: "#f0e6d0", marginBottom: 2 }}>{meals.date}</div>
                    {meals.total_macros && (
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#888" }}>
                        ~{meals.total_macros.calories} kcal · {meals.total_macros.protein}g protein · {meals.total_macros.carbs}g carbs · {meals.total_macros.fat}g fat
                      </div>
                    )}
                  </div>
                  <button onClick={generateMeals} disabled={loading} style={{ background: "none", border: "1px solid #2a2a30", color: "#888", padding: "7px 12px", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>
                    {loading ? "…" : "↺ NEW"}
                  </button>
                </div>

                {/* Macro progress vs targets */}
                {meals.total_macros && (
                  <div style={{ background: "#1a1b20", border: "1px solid #1e1f24", padding: 14, marginBottom: 18 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 10 }}>TODAY vs TARGETS</div>
                    {[
                      { label: "Calories", val: meals.total_macros.calories, target: MACRO_TARGETS.calories, color: "#f4a261", suffix: "kcal" },
                      { label: "Protein", val: meals.total_macros.protein, target: MACRO_TARGETS.protein, color: "#52b788", suffix: "g" },
                      { label: "Carbs", val: meals.total_macros.carbs, target: MACRO_TARGETS.carbs, color: "#5e81f4", suffix: "g" },
                      { label: "Fat", val: meals.total_macros.fat, target: MACRO_TARGETS.fat, color: "#f9c74f", suffix: "g" },
                    ].map(m => {
                      const pct = Math.min(100, Math.round((m.val / m.target) * 100));
                      const over = m.val > m.target;
                      return (
                        <div key={m.label} style={{ marginBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666" }}>{m.label}</span>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: over ? "#f9c74f" : m.color }}>
                              {m.val}{m.suffix} / {m.target}{m.suffix}
                            </span>
                          </div>
                          <div style={{ height: 4, background: "#111216", borderRadius: 2 }}>
                            <div style={{ height: "100%", width: `${pct}%`, background: over ? "#f9c74f" : m.color, borderRadius: 2, transition: "width 0.6s ease" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Meal cards */}
                {["breakfast", "lunch", "dinner", "snack"].map((type, i) => {
                  const meal = meals[type];
                  const meta = MEAL_META[type];
                  const ate = (state.ateToday || []).includes(type);
                  const today = new Date().toISOString().split("T")[0];
                  return (
                    <div key={type} className="fade-up" style={{ animationDelay: `${i * 0.08}s`, background: "#15161a", border: `1px solid ${ate ? meta.color + "66" : meta.color + "22"}`, borderLeft: `3px solid ${meta.color}`, padding: 16, marginBottom: 12, opacity: ate ? 0.75 : 1 }}>
                      {/* Header row */}
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 16 }}>{meta.icon}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "2px", color: meta.color }}>{meta.label}</span>
                        {meal.macros && (
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555", marginLeft: "auto" }}>
                            {meal.macros.calories} kcal · {meal.macros.protein}g P
                          </span>
                        )}
                      </div>

                      {editingMeal === type && mealEditForm ? (
                        <MealEditPanel
                          form={mealEditForm}
                          setForm={setMealEditForm}
                          meta={meta}
                          onCancel={() => { setEditingMeal(null); setMealEditForm(null); }}
                          onSave={() => {
                            setState(s => {
                              const oldMeal = s.todaysMeals?.[type] || {};
                              const cleanIngs = (mealEditForm.ingredients_with_amounts || []).filter(i => (i.item || "").trim());
                              const cleanSteps = (mealEditForm.recipe_steps || []).filter(st => (st || "").trim());
                              const newMeal = {
                                ...oldMeal,
                                name: (mealEditForm.name || "").trim() || oldMeal.name,
                                description: mealEditForm.description ?? oldMeal.description,
                                macros: {
                                  calories: +mealEditForm.macros.calories || 0,
                                  protein:  +mealEditForm.macros.protein  || 0,
                                  carbs:    +mealEditForm.macros.carbs    || 0,
                                  fat:      +mealEditForm.macros.fat      || 0,
                                },
                                ingredients_with_amounts: cleanIngs,
                                recipe_steps: cleanSteps,
                              };

                              let macroLog = s.macroLog || [];
                              let ingredients = s.ingredients;
                              const isAte = (s.ateToday || []).includes(type);
                              if (isAte) {
                                const todayStr = new Date().toISOString().split("T")[0];
                                const oldM = oldMeal.macros || { calories: 0, protein: 0, carbs: 0, fat: 0 };
                                const newM = newMeal.macros;
                                const existing = macroLog.find(e => e.date === todayStr) || { date: todayStr, calories: 0, protein: 0, carbs: 0, fat: 0 };
                                const updatedLog = {
                                  ...existing,
                                  calories: Math.max(0, (existing.calories || 0) - (oldM.calories || 0) + (newM.calories || 0)),
                                  protein:  Math.max(0, (existing.protein  || 0) - (oldM.protein  || 0) + (newM.protein  || 0)),
                                  carbs:    Math.max(0, (existing.carbs    || 0) - (oldM.carbs    || 0) + (newM.carbs    || 0)),
                                  fat:      Math.max(0, (existing.fat      || 0) - (oldM.fat      || 0) + (newM.fat      || 0)),
                                };
                                macroLog = [...macroLog.filter(e => e.date !== todayStr), updatedLog];
                                ingredients = applyMealToInventory(ingredients, oldMeal, +1);
                                ingredients = applyMealToInventory(ingredients, newMeal, -1);
                              }

                              const total_macros = ["breakfast","lunch","dinner","snack"].reduce((acc, t) => {
                                const m = (t === type ? newMeal : s.todaysMeals?.[t])?.macros || {};
                                return {
                                  calories: (acc.calories || 0) + (+m.calories || 0),
                                  protein:  (acc.protein  || 0) + (+m.protein  || 0),
                                  carbs:    (acc.carbs    || 0) + (+m.carbs    || 0),
                                  fat:      (acc.fat      || 0) + (+m.fat      || 0),
                                };
                              }, { calories: 0, protein: 0, carbs: 0, fat: 0 });

                              return {
                                ...s,
                                todaysMeals: { ...s.todaysMeals, [type]: newMeal, total_macros },
                                macroLog,
                                ingredients,
                              };
                            });
                            setEditingMeal(null);
                            setMealEditForm(null);
                          }}
                        />
                      ) : (
                        <>
                          {/* Name + action buttons */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 8 }}>
                            <div style={{ fontSize: 17, color: "#f0e6d0", flex: 1 }}>{meal.name}</div>
                            <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                              <button
                                onClick={() => setState(s => {
                                  const cur = s.ateToday || [];
                                  const alreadyAte = cur.includes(type);
                                  const next = alreadyAte ? cur.filter(x => x !== type) : [...cur, type];
                                  const todayStr = new Date().toISOString().split("T")[0];
                                  const existing = (s.macroLog || []).find(e => e.date === todayStr) || { date: todayStr, calories: 0, protein: 0, carbs: 0, fat: 0 };
                                  const m = meal.macros || { calories: 0, protein: 0, carbs: 0, fat: 0 };
                                  const dir = alreadyAte ? -1 : 1;
                                  const updated = {
                                    ...existing,
                                    calories: Math.max(0, (existing.calories || 0) + dir * (m.calories || 0)),
                                    protein:  Math.max(0, (existing.protein  || 0) + dir * (m.protein  || 0)),
                                    carbs:    Math.max(0, (existing.carbs    || 0) + dir * (m.carbs    || 0)),
                                    fat:      Math.max(0, (existing.fat      || 0) + dir * (m.fat      || 0)),
                                  };
                                  const newMacroLog = [...(s.macroLog || []).filter(e => e.date !== todayStr), updated];
                                  const newIngredients = applyMealToInventory(s.ingredients, meal, -dir);
                                  return {
                                    ...s,
                                    ateToday: next,
                                    macroLog: newMacroLog,
                                    ingredients: newIngredients,
                                    ateLog: [...(s.ateLog || []), ...(!alreadyAte ? [{ type, name: meal.name, date: todayStr, macros: m }] : [])]
                                  };
                                })}
                                style={{ background: ate ? meta.color : "none", border: `1px solid ${meta.color}`, color: ate ? "#111" : meta.color, fontSize: 10, padding: "4px 8px", fontFamily: "'DM Mono', monospace", cursor: "pointer", letterSpacing: "0.5px", whiteSpace: "nowrap" }}
                              >{ate ? "✓ ATE" : "ATE THIS"}</button>
                              <button
                                onClick={() => {
                                  setEditingMeal(type);
                                  setMealEditForm({
                                    name: meal.name || "",
                                    description: meal.description || "",
                                    macros: {
                                      calories: meal.macros?.calories ?? 0,
                                      protein:  meal.macros?.protein  ?? 0,
                                      carbs:    meal.macros?.carbs    ?? 0,
                                      fat:      meal.macros?.fat      ?? 0,
                                    },
                                    ingredients_with_amounts: (meal.ingredients_with_amounts || []).map(i => ({ item: i.item || "", amount: i.amount || "" })),
                                    recipe_steps: [...(meal.recipe_steps || [])],
                                  });
                                }}
                                style={{ background: "none", border: "1px solid #2a2a30", color: "#666", fontSize: 10, padding: "4px 8px", fontFamily: "'DM Mono', monospace", cursor: "pointer" }}
                              >EDIT</button>
                            </div>
                          </div>

                          {meal.description && <div style={{ fontSize: 12, color: "#777", lineHeight: 1.5, marginBottom: 12, fontStyle: "italic" }}>{meal.description}</div>}

                          {/* Ingredients with amounts */}
                          {meal.ingredients_with_amounts?.length > 0 && (
                            <div style={{ marginBottom: 12 }}>
                              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: meta.color, letterSpacing: "2px", marginBottom: 6 }}>INGREDIENTS</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {meal.ingredients_with_amounts.map((ing, j) => (
                                  <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                    <span style={{ fontSize: 12, color: "#ccc" }}>{ing.item}</span>
                                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: meta.color, marginLeft: 8, whiteSpace: "nowrap" }}>{ing.amount}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Recipe steps */}
                          {meal.recipe_steps?.length > 0 && (
                            <div>
                              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: meta.color, letterSpacing: "2px", marginBottom: 6 }}>HOW TO MAKE IT</div>
                              <ol style={{ margin: 0, paddingLeft: 18 }}>
                                {meal.recipe_steps.map((step, j) => (
                                  <li key={j} style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6, marginBottom: 4 }}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}

                {meals.tip && (
                  <div style={{ background: "#15161a", border: "1px dashed #2a2a30", padding: 14, marginTop: 4 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "2px", color: "#f9c74f" }}>💡 TIP  </span>
                    <span style={{ fontSize: 13, color: "#999", fontStyle: "italic" }}>{meals.tip}</span>
                  </div>
                )}

                <button onClick={generateMeals} disabled={loading} style={{ ...genBtnStyle(loading), marginTop: 20 }}>
                  {loading ? <span className="shimmer">GENERATING…</span> : "✦ REGENERATE TODAY'S PLAN"}
                </button>

                {/* Plan history */}
                {(state.planHistory || []).length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <button
                      onClick={() => setState(s => ({ ...s, showHistory: !s.showHistory }))}
                      style={{ width: "100%", background: "none", border: "1px solid #2a2a30", color: "#666", padding: "10px 0", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "2px", cursor: "pointer" }}
                    >
                      {state.showHistory ? "▲ HIDE PREVIOUS PLANS" : `▼ VIEW PREVIOUS PLANS (${(state.planHistory || []).length})`}
                    </button>

                    {state.showHistory && (
                      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
                        {(state.planHistory || []).map((entry, idx) => (
                          <div key={idx} style={{ background: "#15161a", border: "1px solid #1e1f24", padding: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                              <div>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "1px" }}>
                                  PLAN FROM {entry.savedAt}
                                </div>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#444", marginTop: 2 }}>
                                  {(entry.ateToday || []).length > 0 ? "✓ ate: " + entry.ateToday.join(", ") : "none marked as eaten"}
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  if (!window.confirm("Restore this plan? Your current plan will be saved to history.")) return;
                                  setState(s => ({
                                    ...s,
                                    todaysMeals: entry.plan,
                                    ateToday: entry.ateToday || [],
                                    showHistory: false,
                                    planHistory: [
                                      { plan: s.todaysMeals, ateToday: s.ateToday || [], savedAt: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) },
                                      ...s.planHistory.filter((_, i) => i !== idx)
                                    ].slice(0, 10)
                                  }));
                                }}
                                style={{ background: "#f4a261", color: "#111", border: "none", padding: "6px 12px", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", cursor: "pointer" }}
                              >RESTORE</button>
                            </div>
                            {/* Mini preview of the 4 meals */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                              {["breakfast","lunch","dinner","snack"].map(type => {
                                const meta = MEAL_META[type];
                                const wasAte = (entry.ateToday || []).includes(type);
                                return (
                                  <div key={type} style={{ background: "#111216", border: `1px solid ${wasAte ? meta.color + "55" : "#1e1f24"}`, padding: "7px 10px" }}>
                                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: meta.color, letterSpacing: "1px", marginBottom: 2 }}>{meta.icon} {type.toUpperCase()}</div>
                                    <div style={{ fontSize: 11, color: wasAte ? "#f0e6d0" : "#888", lineHeight: 1.3 }}>{entry.plan[type]?.name || "—"}</div>
                                    {wasAte && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: meta.color, marginTop: 2 }}>✓ eaten</div>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {error && <p style={{ color: "#e63946", fontSize: 13, marginTop: 12, fontFamily: "'DM Mono', monospace" }}>{error}</p>}
          </div>
        )}

        {/* ══ MACROS TAB ══ */}
        {tab === "macros" && (
          <div className="fade-up">
            {/* Today's actual intake — auto-updates from ATE buttons */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 12 }}>TODAY'S INTAKE</div>
              <div style={{ background: "#15161a", border: "1px solid #1e1f24", padding: 14 }}>
                {[
                  { label: "Calories", val: todayMacroLog?.calories || 0, target: MACRO_TARGETS.calories, color: "#f4a261", suffix: "kcal" },
                  { label: "Protein", val: todayMacroLog?.protein || 0, target: MACRO_TARGETS.protein, color: "#52b788", suffix: "g" },
                  { label: "Carbs", val: todayMacroLog?.carbs || 0, target: MACRO_TARGETS.carbs, color: "#5e81f4", suffix: "g" },
                  { label: "Fat", val: todayMacroLog?.fat || 0, target: MACRO_TARGETS.fat, color: "#f9c74f", suffix: "g" },
                ].map(m => {
                  const pct = m.target > 0 ? Math.min(100, Math.round((m.val / m.target) * 100)) : 0;
                  const over = m.val > m.target;
                  return (
                    <div key={m.label} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#888" }}>{m.label}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: over ? "#f9c74f" : m.color }}>
                          {Math.round(m.val)}{m.suffix} / {m.target}{m.suffix}
                        </span>
                      </div>
                      <div style={{ height: 5, background: "#111216", borderRadius: 2 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: over ? "#f9c74f" : m.color, borderRadius: 2, transition: "width 0.6s ease" }} />
                      </div>
                    </div>
                  );
                })}
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#555", marginTop: 8, fontStyle: "italic" }}>
                  Updates as you mark meals eaten on the Meals tab.
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 12 }}>YOUR DAILY TARGETS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {[
                  { label: "Calories", val: MACRO_TARGETS.calories, suffix: "kcal", color: "#f4a261" },
                  { label: "Protein", val: MACRO_TARGETS.protein, suffix: "g", color: "#52b788" },
                  { label: "Carbs", val: MACRO_TARGETS.carbs, suffix: "g", color: "#5e81f4" },
                  { label: "Fat", val: MACRO_TARGETS.fat, suffix: "g", color: "#f9c74f" },
                ].map(m => (
                  <div key={m.label} style={{ background: "#15161a", border: `1px solid ${m.color}33`, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", marginBottom: 4 }}>{m.label.toUpperCase()}</div>
                    <div style={{ fontSize: 24, color: m.color }}>{m.val}<span style={{ fontSize: 12, color: "#555" }}>{m.suffix}</span></div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#15161a", border: "1px solid #1e1f24", padding: 14, marginBottom: 16 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 6 }}>WHY THESE NUMBERS</div>
                <p style={{ fontSize: 13, color: "#999", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                  Based on your stats (155 lbs, 6'0", ~19% BF, training 4–5×/week), your estimated TDEE is ~2,800 kcal.
                  A lean bulk adds ~300 kcal surplus to hit <strong style={{ color: "#f0e6d0" }}>3,100 kcal/day</strong>.
                  Protein at <strong style={{ color: "#f0e6d0" }}>175g</strong> supports maximum muscle protein synthesis for your lean body mass.
                  This rate of gain targets roughly 0.5–1 lb/week — mostly muscle, minimal fat.
                </p>
              </div>
            </div>

            {/* Log today's macros */}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 10 }}>LOG TODAY'S ACTUAL INTAKE</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
              {["calories", "protein", "carbs", "fat"].map(k => (
                <input key={k} type="number" placeholder={k.charAt(0).toUpperCase() + k.slice(1) + (k === "calories" ? " (kcal)" : " (g)")}
                  value={macroInput[k]} onChange={e => setMacroInput(p => ({ ...p, [k]: e.target.value }))}
                  style={{ background: "#1a1b20", border: "1px solid #2a2a30", color: "#eee", fontSize: 13, padding: "10px 12px", fontFamily: "'DM Mono', monospace" }}
                />
              ))}
            </div>
            <button onClick={logMacros} style={{ background: "#f4a261", color: "#111", border: "none", padding: "11px 0", width: "100%", fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: "2px" }}>
              SAVE TODAY'S MACROS
            </button>

            {/* Recent macro log */}
            {(state.macroLog || []).length > 0 && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px" }}>RECENT INTAKE</div>
                  <button onClick={() => setShowMacroLog(!showMacroLog)} style={{ background: "none", border: "none", color: "#666", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{showMacroLog ? "HIDE" : "SHOW"}</button>
                </div>
                {showMacroLog && [...(state.macroLog || [])].reverse().slice(0, 10).map((entry, i) => (
                  <div key={i} style={{ background: "#15161a", border: "1px solid #1e1f24", padding: "10px 14px", marginBottom: 6, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>
                    <div style={{ color: "#888", marginBottom: 4 }}>{entry.date}</div>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <span style={{ color: "#f4a261" }}>{entry.calories} kcal</span>
                      <span style={{ color: "#52b788" }}>{entry.protein}g P</span>
                      <span style={{ color: "#5e81f4" }}>{entry.carbs}g C</span>
                      <span style={{ color: "#f9c74f" }}>{entry.fat}g F</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ WEIGHT TAB ══ */}
        {tab === "weight" && (
          <div className="fade-up">
            {/* Goal card */}
            <div style={{ background: "#15161a", border: "1px solid #f4a26133", borderLeft: "3px solid #f4a261", padding: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 8 }}>LEAN BULK GOAL</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 28, color: "#f0e6d0" }}>{latestWeight} <span style={{ fontSize: 14, color: "#888" }}>lbs</span></div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>Start: {START_WEIGHT} lbs → Goal: {GOAL_WEIGHT} lbs</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, color: lbsGained >= 0 ? "#52b788" : "#e63946" }}>
                    {lbsGained >= 0 ? "+" : ""}{lbsGained} lbs
                  </div>
                  <div style={{ fontSize: 11, color: "#666", fontFamily: "'DM Mono', monospace" }}>{Math.round(progressPct)}% to goal</div>
                </div>
              </div>
              <div style={{ marginTop: 12, height: 6, background: "#111216", borderRadius: 3 }}>
                <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #f4a261, #f9c74f)", borderRadius: 3, transition: "width 0.8s ease" }} />
              </div>
            </div>

            {/* Log weight */}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 10 }}>LOG TODAY'S WEIGHT</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <input type="number" placeholder="e.g. 156.5" value={weightInput}
                onChange={e => setWeightInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && logWeight()}
                style={{ flex: 1, background: "#1a1b20", border: "1px solid #2a2a30", color: "#eee", fontSize: 15, padding: "11px 14px", fontFamily: "'DM Mono', monospace" }}
              />
              <button onClick={logWeight} style={{ background: "#52b788", color: "#111", border: "none", padding: "11px 20px", fontSize: 13, fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>LOG</button>
            </div>

            {/* Mini chart — simple bar visualization */}
            {state.weightLog.length > 1 && (
              <div style={{ background: "#15161a", border: "1px solid #1e1f24", padding: 14, marginBottom: 16 }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 12 }}>WEIGHT TREND</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
                  {state.weightLog.slice(-12).map((entry, i) => {
                    const allWeights = state.weightLog.slice(-12).map(e => e.weight);
                    const minW = Math.min(...allWeights) - 2;
                    const maxW = Math.max(...allWeights) + 2;
                    const h = Math.max(4, ((entry.weight - minW) / (maxW - minW)) * 70);
                    const isLatest = i === state.weightLog.slice(-12).length - 1;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <div style={{ fontSize: 9, color: isLatest ? "#f4a261" : "#555", fontFamily: "'DM Mono', monospace" }}>
                          {isLatest ? entry.weight : ""}
                        </div>
                        <div style={{ width: "100%", height: h, background: isLatest ? "#f4a261" : "#2a2a30", transition: "height 0.4s ease", minHeight: 4 }} />
                        <div style={{ fontSize: 8, color: "#444", fontFamily: "'DM Mono', monospace", transform: "rotate(-45deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>
                          {entry.date.slice(5)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weight history list */}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px", marginBottom: 10 }}>HISTORY</div>
            {[...state.weightLog].reverse().map((entry, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", background: "#15161a", border: "1px solid #1e1f24", padding: "10px 14px", marginBottom: 5 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#888" }}>{entry.date}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#f4a261" }}>{entry.weight} lbs</span>
              </div>
            ))}
          </div>
        )}

        {/* ══ PANTRY TAB ══ */}
        {tab === "pantry" && (
          <PantryTab
            state={state}
            setState={setState}
            generateMeals={generateMeals}
            loading={loading}
            newIngredient={newIngredient}
            setNewIngredient={setNewIngredient}
          />
        )}
      </div>
    </div>
  );
}

function PantryTab({ state, setState, generateMeals, loading, newIngredient, setNewIngredient }) {
  const [editingId, setEditingId] = useState(null);
  const [editVal, setEditVal] = useState({ name: "", qty: "", unit: "", perishable: false, frozen: false });
  const [filter, setFilter] = useState("all"); // all | perishable | pantry | frozen
  const [searchQuery, setSearchQuery] = useState("");

  function startEdit(item) {
    setEditingId(item.id);
    setEditVal({
      name: item.name,
      qty: item.qty || "",
      unit: item.unit || "",
      perishable: isPerishable(item),
      frozen: isFrozen(item),
    });
  }
  function saveEdit(id) {
    setState(s => ({
      ...s,
      ingredients: s.ingredients.map(i => i.id === id
        ? { ...i, name: editVal.name, qty: editVal.qty, unit: editVal.unit, perishable: editVal.perishable, frozen: editVal.frozen }
        : i),
    }));
    setEditingId(null);
  }
  function deleteItem(id) {
    setState(s => ({ ...s, ingredients: s.ingredients.filter(i => i.id !== id) }));
    if (editingId === id) setEditingId(null);
  }
  function addIngredient() {
    if (!newIngredient.trim()) return;
    const name = newIngredient.trim();
    const lower = name.toLowerCase();
    const newItem = {
      id: Date.now(),
      name,
      qty: "",
      unit: "",
      perishable: PERISHABLE_KEYWORDS.some(k => lower.includes(k)),
      frozen: FROZEN_KEYWORDS.some(k => lower.includes(k)),
    };
    setState(s => ({ ...s, ingredients: [...s.ingredients, newItem] }));
    setNewIngredient("");
  }

  const q = searchQuery.trim().toLowerCase();
  const filtered = state.ingredients.filter(item => {
    if (filter === "perishable" && !(isPerishable(item) && !isFrozen(item))) return false;
    if (filter === "pantry" && (isPerishable(item) || isFrozen(item))) return false;
    if (filter === "frozen" && !isFrozen(item)) return false;
    if (q && !item.name.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="fade-up">
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", letterSpacing: "2px" }}>
          {state.ingredients.length} INGREDIENTS
        </div>
        <button onClick={generateMeals} disabled={loading} style={{ background: "#f4a261", color: "#111", border: "none", padding: "8px 14px", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "2px" }}>
          {loading ? "…" : "✦ GENERATE MEALS"}
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 14, borderBottom: "1px solid #1e1f24", flexWrap: "wrap" }}>
        {[["all","All"], ["perishable","🍌 Perishable"], ["pantry","🥫 Shelf Stable"], ["frozen","❄️ Frozen"]].map(([val, label]) => (
          <button key={val} onClick={() => setFilter(val)} style={{
            background: "none", border: "none", padding: "7px 12px",
            color: filter === val ? "#f0e6d0" : "#555",
            borderBottom: filter === val ? "2px solid #f4a261" : "2px solid transparent",
            fontSize: 11, fontFamily: "'DM Mono', monospace", cursor: "pointer", letterSpacing: "0.5px"
          }}>{label}</button>
        ))}
      </div>

      {filter === "perishable" && (
        <div style={{ background: "#1a1b20", border: "1px solid #f4a26133", padding: "10px 12px", marginBottom: 12, fontSize: 12, color: "#f4a261", fontStyle: "italic" }}>
          ⚠️ These items go bad faster — remove them from your pantry once they're gone so meals stay accurate.
        </div>
      )}

      {state.ingredients.some(isFrozen) && (
        <div style={{ background: "#1a1b20", border: "1px solid #5e81f433", padding: "10px 12px", marginBottom: 12, fontSize: 12, color: "#5e81f4", fontStyle: "italic" }}>
          ❄️ Frozen items need to be thawed ahead of meals that use them.
        </div>
      )}

      {/* Add ingredient */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <input value={newIngredient} onChange={e => setNewIngredient(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addIngredient()}
          placeholder="Add ingredient (press Enter)"
          style={{ flex: 1, background: "#1a1b20", border: "1px solid #2a2a30", color: "#eee", fontSize: 13, padding: "9px 12px", fontFamily: "'DM Mono', monospace" }}
        />
        <button onClick={addIngredient} style={{ background: "#f4a261", color: "#111", border: "none", padding: "9px 14px", fontSize: 16, fontWeight: 700 }}>+</button>
      </div>

      {/* Search ingredients */}
      <div style={{ marginBottom: 14 }}>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="🔍 Search ingredients..."
          style={{ width: "100%", background: "#1a1b20", border: "1px solid #2a2a30", color: "#eee", fontSize: 13, padding: "9px 12px", fontFamily: "'DM Mono', monospace", boxSizing: "border-box" }}
        />
      </div>

      {/* Ingredient list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {filtered.map(item => (
          <div key={item.id}>
            {editingId === item.id ? (
              /* Edit mode */
              <div style={{ background: "#1a1b20", border: "1px solid #f4a26155", padding: 12 }}>
                <input value={editVal.name} onChange={e => setEditVal(v => ({ ...v, name: e.target.value }))}
                  style={{ width: "100%", background: "#111216", border: "1px solid #2a2a30", color: "#eee", fontSize: 13, padding: "7px 10px", fontFamily: "'DM Mono', monospace", marginBottom: 6, boxSizing: "border-box" }}
                />
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <input value={editVal.qty} onChange={e => setEditVal(v => ({ ...v, qty: e.target.value }))}
                    placeholder="Qty" style={{ width: 70, background: "#111216", border: "1px solid #2a2a30", color: "#eee", fontSize: 12, padding: "6px 8px", fontFamily: "'DM Mono', monospace" }}
                  />
                  <input value={editVal.unit} onChange={e => setEditVal(v => ({ ...v, unit: e.target.value }))}
                    placeholder="Unit (oz, lbs...)" style={{ flex: 1, background: "#111216", border: "1px solid #2a2a30", color: "#eee", fontSize: 12, padding: "6px 8px", fontFamily: "'DM Mono', monospace" }}
                  />
                </div>
                <div style={{ display: "flex", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>
                    <input type="checkbox" checked={!!editVal.perishable}
                      onChange={e => setEditVal(v => ({ ...v, perishable: e.target.checked }))}
                    />
                    🍌 Perishable
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>
                    <input type="checkbox" checked={!!editVal.frozen}
                      onChange={e => setEditVal(v => ({ ...v, frozen: e.target.checked }))}
                    />
                    ❄️ Frozen
                  </label>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => saveEdit(item.id)} style={{ flex: 1, background: "#52b788", color: "#111", border: "none", padding: "7px 0", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>SAVE</button>
                  <button onClick={() => deleteItem(item.id)} style={{ flex: 1, background: "#e63946", color: "#fff", border: "none", padding: "7px 0", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "1px" }}>DELETE</button>
                  <button onClick={() => setEditingId(null)} style={{ flex: 1, background: "none", border: "1px solid #2a2a30", color: "#666", padding: "7px 0", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>CANCEL</button>
                </div>
              </div>
            ) : (
              /* View mode */
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#15161a", border: `1px solid ${isFrozen(item) ? "#5e81f422" : isPerishable(item) ? "#f4a26122" : "#1e1f24"}`, padding: "9px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
                  {isPerishable(item) && !isFrozen(item) && <span style={{ fontSize: 10, flexShrink: 0 }}>🍌</span>}
                  {isFrozen(item) && <span style={{ fontSize: 10, flexShrink: 0 }}>❄️</span>}
                  <span style={{ fontSize: 13, color: "#ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  {(item.qty || item.unit) && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#555" }}>{item.qty} {item.unit}</span>}
                  <button onClick={() => startEdit(item)} style={{ background: "none", border: "1px solid #2a2a30", color: "#666", fontSize: 10, padding: "3px 8px", fontFamily: "'DM Mono', monospace", cursor: "pointer" }}>EDIT</button>
                  <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "none", color: "#3a3a40", fontSize: 18, padding: 0, lineHeight: 1, cursor: "pointer" }}>×</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0", color: "#444", fontSize: 13, fontStyle: "italic" }}>
            {q ? `No matches for "${searchQuery}"` : "No items in this category"}
          </div>
        )}
      </div>
    </div>
  );
}

function MealEditPanel({ form, setForm, meta, onSave, onCancel }) {
  const inputBase = { background: "#111216", border: "1px solid #2a2a30", color: "#eee", fontFamily: "'DM Mono', monospace", boxSizing: "border-box" };
  return (
    <div>
      <input
        type="text"
        value={form.name}
        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        placeholder="Meal name"
        style={{ ...inputBase, width: "100%", color: "#f0e6d0", fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 16, padding: "8px 10px", border: `1px solid ${meta.color}55`, marginBottom: 10 }}
      />

      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: meta.color, letterSpacing: "2px", marginBottom: 6 }}>MACROS</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
        {[
          { k: "calories", lbl: "kcal" },
          { k: "protein",  lbl: "P (g)" },
          { k: "carbs",    lbl: "C (g)" },
          { k: "fat",      lbl: "F (g)" },
        ].map(({ k, lbl }) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <input
              type="number"
              value={form.macros[k]}
              onChange={e => setForm(f => ({ ...f, macros: { ...f.macros, [k]: e.target.value } }))}
              style={{ ...inputBase, fontSize: 12, padding: "6px 8px", textAlign: "center" }}
            />
            <span style={{ fontSize: 9, color: "#555", fontFamily: "'DM Mono', monospace", textAlign: "center" }}>{lbl}</span>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: meta.color, letterSpacing: "2px", marginBottom: 6 }}>INGREDIENTS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 6 }}>
        {form.ingredients_with_amounts.map((ing, idx) => (
          <div key={idx} style={{ display: "flex", gap: 4 }}>
            <input
              type="text"
              value={ing.item}
              onChange={e => setForm(f => {
                const ings = [...f.ingredients_with_amounts];
                ings[idx] = { ...ings[idx], item: e.target.value };
                return { ...f, ingredients_with_amounts: ings };
              })}
              placeholder="ingredient"
              style={{ ...inputBase, flex: 2, fontSize: 12, padding: "5px 8px", color: "#ccc", minWidth: 0 }}
            />
            <input
              type="text"
              value={ing.amount}
              onChange={e => setForm(f => {
                const ings = [...f.ingredients_with_amounts];
                ings[idx] = { ...ings[idx], amount: e.target.value };
                return { ...f, ingredients_with_amounts: ings };
              })}
              placeholder="amount"
              style={{ ...inputBase, flex: 1, fontSize: 12, padding: "5px 8px", color: meta.color, minWidth: 0 }}
            />
            <button
              onClick={() => setForm(f => ({ ...f, ingredients_with_amounts: f.ingredients_with_amounts.filter((_, i) => i !== idx) }))}
              style={{ background: "none", border: "none", color: "#3a3a40", fontSize: 18, padding: "0 6px", lineHeight: 1, cursor: "pointer" }}
            >×</button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setForm(f => ({ ...f, ingredients_with_amounts: [...f.ingredients_with_amounts, { item: "", amount: "" }] }))}
        style={{ background: "none", border: "1px dashed #2a2a30", color: "#666", padding: "5px 10px", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginBottom: 14, width: "100%", cursor: "pointer" }}
      >+ ADD INGREDIENT</button>

      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: meta.color, letterSpacing: "2px", marginBottom: 6 }}>RECIPE STEPS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 6 }}>
        {form.recipe_steps.map((step, idx) => (
          <div key={idx} style={{ display: "flex", gap: 4, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", paddingTop: 6, minWidth: 14 }}>{idx + 1}.</span>
            <textarea
              value={step}
              onChange={e => setForm(f => {
                const steps = [...f.recipe_steps];
                steps[idx] = e.target.value;
                return { ...f, recipe_steps: steps };
              })}
              rows={2}
              style={{ ...inputBase, flex: 1, fontSize: 12, padding: "5px 8px", color: "#aaa", resize: "vertical" }}
            />
            <button
              onClick={() => setForm(f => ({ ...f, recipe_steps: f.recipe_steps.filter((_, i) => i !== idx) }))}
              style={{ background: "none", border: "none", color: "#3a3a40", fontSize: 18, padding: "0 6px", lineHeight: 1, cursor: "pointer" }}
            >×</button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setForm(f => ({ ...f, recipe_steps: [...f.recipe_steps, ""] }))}
        style={{ background: "none", border: "1px dashed #2a2a30", color: "#666", padding: "5px 10px", fontSize: 10, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", marginBottom: 12, width: "100%", cursor: "pointer" }}
      >+ ADD STEP</button>

      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={onSave}
          style={{ flex: 1, background: meta.color, color: "#111", border: "none", padding: "9px 0", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", cursor: "pointer" }}
        >SAVE</button>
        <button
          onClick={onCancel}
          style={{ flex: 1, background: "none", border: "1px solid #2a2a30", color: "#888", padding: "9px 0", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "1px", cursor: "pointer" }}
        >CANCEL</button>
      </div>
    </div>
  );
}

function genBtnStyle(loading) {
  return {
    background: loading ? "#2a2a30" : "#f4a261",
    color: loading ? "#666" : "#111",
    border: "none", padding: "14px 0", width: "100%",
    fontSize: 12, fontFamily: "'DM Mono', monospace",
    letterSpacing: "3px", transition: "all 0.2s",
    cursor: loading ? "not-allowed" : "pointer"
  };
}
