// Final crossword matrix with numbers only in starting cells
const crosswordMatrix = [
  //0  1   2   3   4   5   6   7   8   9  10  11  12  13  14
  [" "," "," "," "," "," "," ","10"," "," "," "," "," "," "," "], // 0
  [" "," "," "," "," ","3"," "," "," "," "," "," "," "," "," "], // 1
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 2
  [" ","1"," "," "," "," "," "," "," "," "," "," "," "," "," "], // 3
  [" "," ","6"," "," "," "," "," "," "," ","5"," "," "," "," "], // 4
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 5
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 6
  ["8"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 7
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 8
  ["9"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 9
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 10
  [" ","7"," "," "," "," "," "," "," "," "," "," "," "," "," "], // 11
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 12
  ["2"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 13
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "]  // 14
];

// Actual word matrix with letters
const wordMatrix = [
  //0  1   2   3   4   5   6   7   8   9  10  11  12  13  14
  [" "," "," "," "," "," "," "," ","P","E","A","C","E"," "," "], // 0
  [" "," "," "," "," "," ","I","N","D","E","P","E","N","D","E"], // 1
  [" "," "," "," "," "," "," "," "," "," "," "," ","C"," "," "], // 2
  [" "," ","F","R","E","E","D","O","M"," "," "," ","E"," "," "], // 3
  [" "," "," ","F","L","A","G"," ","I"," "," ","S","O","L","D"], // 4
  [" "," "," "," "," "," "," "," ","L"," "," "," "," "," ","I"], // 5
  [" "," "," "," "," "," "," "," ","I"," "," "," "," "," ","E"], // 6
  [" ","H","O","L","I","D","A","Y","T"," "," "," "," "," ","R"], // 7
  [" "," "," "," "," "," "," "," ","A"," "," "," "," "," "," "], // 8
  [" ","V","I","C","T","O","R","Y","R"," "," "," "," "," "," "], // 9
  [" "," "," "," "," "," "," "," ","Y"," "," "," "," "," "," "], // 10
  [" "," ","A","P","R","I","L"," "," "," "," "," "," "," "," "], // 11
  [" "," "," "," "," "," "," "," ","P"," "," "," "," "," "," "], // 12
  [" ","R","E","U","N","I","F","I","C","A","T","I","O","N"," "], // 13
  [" "," "," "," "," "," "," "," ","R"," "," "," "," "," "," "]  // 14
];

// Updated word positions to start from actual letter cells  
const wordPositions = {
  1: { row: 3, col: 2, direction: "across", length: 7 }, // FREEDOM
  2: { row: 13, col: 1, direction: "across", length: 13 }, // REUNIFICATION
  3: { row: 1, col: 6, direction: "across", length: 11 }, // INDEPENDENCE
  4: { row: 4, col: 8, direction: "down", length: 8 }, // MILITARY
  5: { row: 4, col: 11, direction: "across", length: 7 }, // SOLDIER
  6: { row: 4, col: 3, direction: "across", length: 4 }, // FLAG
  7: { row: 11, col: 2, direction: "across", length: 5 }, // APRIL
  8: { row: 7, col: 1, direction: "across", length: 7 }, // HOLIDAY
  9: { row: 9, col: 1, direction: "across", length: 7 }, // VICTORY
  10: { row: 0, col: 8, direction: "across", length: 5 }, // PEACE
};

// Hints with proper format
const hints = {
  1: "Freedom – The ability to do what you want without being controlled",
  2: "Reunification – A special day when two parts of a country become one again",
  3: "Independence – When a country is free to rule itself",
  4: "Military Parade – Soldiers march together to celebrate something important",
  5: "Soldier – A person who fights for their country",
  6: "Flag – A piece of cloth with colors and shapes that stands for a country",
  7: "April – The month of Vietnam War's end (April 30th)",
  8: "Holiday – A day when many people get off work to celebrate something important",
  9: "Victory – Winning a battle or a competition",
  10: "Peace – When there is no fighting or war"
};

// Word answers with emoji
const wordAnswers = {
  1: "FREEDOM",
  2: "REUNIFICATION",
  3: "INDEPENDENCE",
  4: "MILITARY",
  5: "SOLDIER",
  6: "FLAG",
  7: "APRIL",
  8: "HOLIDAY",
  9: "VICTORY",
  10: "PEACE"
};

const wordEmojis = {
  "FREEDOM": "🗽",
  "REUNIFICATION": "🤝",
  "INDEPENDENCE": "🏛️",
  "MILITARY": "⚔️",
  "SOLDIER": "💂",
  "FLAG": "🚩",
  "APRIL": "📅",
  "HOLIDAY": "🎉",
  "VICTORY": "🏆",
  "PEACE": "☮️",
  "PARADE": "🎊"
};