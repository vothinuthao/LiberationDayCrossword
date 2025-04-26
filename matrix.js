const crosswordMatrix = [
  //0  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17
  ["1"," "," ","2"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 0
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," ","3"," "," "], // 1
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 2
  [" "," ","4"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 3
  [" "," "," "," ","5"," "," "," "," "," "," "," "," "," "," "," "," "," "], // 4
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 5
  [" "," "," "," "," "," "," "," "," "," "," ","7"," "," "," "," "," "," "], // 6
  [" ","6"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 7
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 8
  ["8"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 9
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 10
  ["9"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 11
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 12
  [" ","10"," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 13
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 14
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 15
];

// Ma trận từ với các chữ cái đúng theo hình ảnh
const wordMatrix = [
  //0  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17
  ["R","E","U","N","I","F","I","C","A","T","I","O","N","D","A","Y"," "," "], // 0
  [" "," "," ","A"," "," "," "," "," "," "," "," "," "," "," ","F"," "," "], // 1
  [" "," "," ","T"," "," "," "," "," "," "," "," "," "," "," ","R"," "," "], // 2
  [" "," ","M","I","L","I","T","A","R","Y","P","A","R","A","D","E"," "," ",], // 3
  [" "," "," ","O","I","N","D","E","P","E","N","D","E","N","C","E"," "," "], // 4
  [" "," "," ","N"," "," "," "," "," "," "," "," "," "," "," ","D"," "," "], // 5
  [" "," "," ","A"," "," "," "," "," "," "," ","V","I","C","T","O","R","Y"], // 6
  [" ","S","O","L","D","I","E","R"," "," "," "," "," "," "," ","M"," "," "], // 7
  [" "," "," ","H"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 8
  ["F"," "," ","O"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 14
  ["L"," "," ","L"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 14
  ["A","P","R","I","L","3","0","T","H"," "," "," "," "," "," "," "," "," "], // 9
  ["G"," "," ","D"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 11
  [" ","P","E","A","C","E"," "," "," "," "," "," "," "," "," "," "," "," "], // 12
  [" "," "," ","Y"," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 13
  [" "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "," "], // 14
];

// Cập nhật vị trí các từ cho ma trận mới
const wordPositions = {
  1: { row: 0, col: 0, direction: "across", length: 16 }, // REUNIFICATION DAY
  2: { row: 0, col: 3, direction: "down", length: 14 }, // NATIONAL HOLIDAY
  3: { row: 1, col: 15, direction: "down", length: 7 }, // FREEDOM
  4: { row: 3, col: 4, direction: "across", length: 14 }, // MILITARY PARADE
  5: { row: 5, col: 5, direction: "across", length: 12 }, // INDEPENDENCE
  6: { row: 6, col: 3, direction: "across", length: 7 }, // SOLDIER
  7: { row: 6, col: 12, direction: "across", length: 7 }, // VICTORY
  8: { row: 7, col: 0, direction: "down", length: 4 }, // FLAG
  9: { row: 9, col: 0, direction: "across", length: 9 }, // APRIL 30TH
  10: { row: 10, col: 2, direction: "across", length: 5 }, // PEACE
};

// Cập nhật hints với format đúng của hình ảnh
const hints = {
  1: "A special day when two parts of a country become one again",
  2: "A day when many people get off work to celebrate something important",  
  3: "The ability to do what you want without being controlled",
  4: "Soldiers march together to celebrate something important",
  5: "When a country is free to rule itself",
  6: "A person who fights for their country",
  7: "Winning a battle or a competition",
  8: "A piece of cloth with colors and shapes that stands for a country",
  9: "The day when the Vietnam War ended",
  10: "When there is no fighting or war"
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