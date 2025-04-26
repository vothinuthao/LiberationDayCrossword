// Final crossword matrix with better word intersection
const crosswordMatrix = [
  //0  1   2   3   4   5   6   7   8   9  10  11  12  13  14
  [" "," "," "," "," "," "," ","10","P","E","A","C","E"," "," "], // 0
  [" "," "," "," "," ","3","I","N","D","E","P","E","N","D","E"], // 1
  [" "," "," "," "," "," "," "," "," "," "," "," ","C"," "," "], // 2
  [" ","1","F","R","E","E","D","O","M"," "," "," ","E"," "," "], // 3
  [" "," ","6","F","L","A","G"," ","I"," ","5","S","O","L","D"], // 4
  [" "," "," "," "," "," "," "," ","L"," "," "," "," "," ","I"], // 5
  [" "," "," "," "," "," "," "," ","I"," "," "," "," "," ","E"], // 6
  ["8","H","O","L","I","D","A","Y","T"," "," "," "," "," ","R"], // 7
  [" "," "," "," "," "," "," "," ","A"," "," "," "," "," "," "], // 8
  ["9","V","I","C","T","O","R","Y","R"," "," "," "," "," "," "], // 9
  [" "," "," "," "," "," "," "," ","Y"," "," "," "," "," "," "], // 10
  [" ","7","A","P","R","I","L"," "," "," "," "," "," "," "," "], // 11
  [" "," "," "," "," "," "," "," ","P"," "," "," "," "," "," "], // 12
  ["2","R","E","U","N","I","F","I","C","A","T","I","O","N"," "], // 13
  [" "," "," "," "," "," "," "," ","R"," "," "," "," "," "," "]  // 14
];

// Updated word positions with correct coordinates  
const wordPositions = {
  1: { row: 3, col: 1, direction: "across", length: 7 }, // FREEDOM
  2: { row: 13, col: 0, direction: "across", length: 13 }, // REUNIFICATION
  3: { row: 1, col: 5, direction: "across", length: 11 }, // INDEPENDENCE
  4: { row: 4, col: 8, direction: "down", length: 8 }, // MILITARY (Parade starting from M)
  5: { row: 4, col: 10, direction: "across", length: 7 }, // SOLDIER
  6: { row: 4, col: 2, direction: "across", length: 4 }, // FLAG
  7: { row: 11, col: 1, direction: "across", length: 5 }, // APRIL
  8: { row: 7, col: 0, direction: "across", length: 7 }, // HOLIDAY
  9: { row: 9, col: 0, direction: "across", length: 7 }, // VICTORY
  10: { row: 0, col: 7, direction: "across", length: 5 }, // PEACE
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