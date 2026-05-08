# Cyber-Lotto - Cyberpunk Double Color Ball Simulator

## 🌐 Language Switch
- **English Version**: This document
- [中文版本](./README_zh.md)

---

## 1. Project Overview

Cyber-Lotto is a static single-page application (SPA) deployed on GitHub Pages. It simulates the Chinese Welfare Lottery "Double Color Ball" game with a cyberpunk visual style.

**Core Principle**: This is purely a luck-testing game with no real money transactions, no recharge options, and no user login system.

## 2. Core Rules & Logic

### 2.1 Asset System
- **Initialization**: User balance resets to **20 points** on each page load/refresh.
- **Persistence**: No LocalStorage or database; balance resets on refresh.
- **Consumption**: 2 points deducted per bet.
- **Rewards**: Points added based on winning rules:
  - First Prize: +5,000,000
  - Second Prize: +1,000,000
  - Third Prize: +3,000
  - Fourth Prize: +200
  - Fifth Prize: +10
  - Sixth Prize: +5

### 2.2 Betting Logic
- **Betting Modes**:
  - **Single Bet**: 6 red balls, 1 blue ball.
  - **Combination Bet**: 7-20 red balls, 2-16 blue balls. System auto-calculates total bets.
- **Number Selection**:
  - **Manual Selection**: Click numbers to select/deselect.
  - **Random Selection**: Click button for random numbers (supports combination parameters).
  - **Unlimited Random**: Users can keep clicking until satisfied.
- **Multiplier**:
  - Default 1x, max 99x.
  - **Cost Formula**: `Total Points = Bets × 2 × Multiplier`.
  - **Reward Formula**: `Total Reward = Single Bet Reward × Winning Bets × Multiplier`.
- **Order Confirmation**:
  1. Click "Generate Order" after selecting numbers.
  2. System calculates total bets and cost.
  3. **Balance Check**: If `Total Cost > Current Balance`, show cyber-style warning with glitch effect.
  4. Confirm order, deduct balance, enter drawing phase.

### 2.3 Drawing Logic
- **Trigger**: Automatically switches to drawing interface after successful bet.
- **Randomness**: Results are completely random.
- **Process**:
  - Two drawing machines (red ball machine left, blue ball machine right).
  - **Phase 1 (Red Balls)**: Draw 1 red ball every **10 seconds**, total 6 balls.
  - **Phase 2 (Blue Ball)**: Draw 1 blue ball after red balls.
  - **Total Duration**: ~70 seconds.
- **Animation Details**:
  - Balls have physical collision or cyber-floating effects.
  - Balls slide through chute to display area, numbers gradually sharpen.
  - Progress bar with countdown.

## 3. UI/UX Design Specifications

### 3.1 Visual Style
- **Theme**: Cyberpunk / Neon Technology
- **Color Scheme**:
  - Background: Deep black `#050505` or dark blue `#0a0e14`
  - Red Balls: Neon red `#ff2a6d` with glow effect when selected/drawn
  - Blue Balls: Neon cyan `#05d9e8` with glow effect when selected/drawn
  - Text: White/light gray, highlighted info in bright yellow or green

### 3.2 Page Layout

**State A: Number Selection Hall**
- **Top**: Logo + Asset display (large font)
- **Middle**:
  - Left: Red ball pool (33 balls, grid layout)
  - Right: Blue ball pool (16 balls, grid layout)
  - Bottom floating bar: Selected numbers preview + multiplier selector + [Clear] [Random] [Confirm Order] buttons
- **Modals**: Order confirmation modal, insufficient balance warning

**State B: Drawing Scene**
- **Top**: Period number + "Drawing in progress..." status
- **Middle**:
  - Dual drawing machine animation area
  - Drawn numbers display (ordered)
- **Bottom**: Progress hint (e.g., "Red Ball 3/6, next ball in 8s")

**State C: Result Settlement**
- Auto-pops after drawing
- **Comparison Display**: User numbers vs winning numbers, matched numbers highlighted
- **Settlement Info**: Prize level, winning bets, total reward
- **Action**: [Back to Selection] button

## 4. Technical Requirements

- **Tech Stack**: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+)
- **State Management**: Simple JS objects for `asset`, `selectedBalls`, `winningBalls`, `gameState`
- **Animation**:
  - CSS Keyframes for glow and shake effects
  - JavaScript `setInterval` for drawing timeline
- **Math Calculations**:
  - Combination formula C(n, m) for calculating bets
  - Prize checking algorithm

## 5. Project Structure

```
Cyber-Lotto/
├── index.html          # Main HTML file
├── style.css           # Cyberpunk style sheet
├── main.js             # Core game logic
├── i18n.js             # Internationalization module
├── locales/            # Translation files
│   ├── en.json         # English translations
│   ├── zh-Hans.json    # Simplified Chinese translations
│   └── zh-Hant.json    # Traditional Chinese translations
├── README.md           # Documentation (English)
├── README.en.md        # Documentation (English)
├── README.zh.md        # Documentation (Chinese)
└── requirement.md      # Original requirements
```

## 6. Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Cyber-Lotto.git
   cd Cyber-Lotto
   ```

2. **Open in browser**:
   - Simply open `index.html` in your browser
   - Or use a local server for better experience:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

3. **Access**:
   - Local: `http://localhost:8000`
   - GitHub Pages: `https://your-username.github.io/Cyber-Lotto/`

## 7. Features

- 🎯 Single and combination betting modes
- 🎲 Random number generation
- 🔢 Multiplier system (1x - 99x)
- 🎬 Cyberpunk visual style with neon effects
- 🎰 Animated drawing machines
- 🌍 Multi-language support (English, Simplified Chinese, Traditional Chinese)
- 📊 Real-time asset tracking

## 8. Contribution

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Submit a pull request

## 9. License

This project is for educational and entertainment purposes only. It is not affiliated with any official lottery organization.

---

*Built with cyberpunk aesthetics and pure JavaScript magic ✨*
