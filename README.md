# 🔧⚡ PCB Design Skills Tree - Pitt Viper Edition

A gamified, interactive skill tree for mastering PCB (Printed Circuit Board) design, styled with a bold cyberpunk aesthetic featuring electric neon colors and vibrant glowing elements on a dark background.

![PCB Skills Tree Preview](preview.png)

## 🎮 Features

### **RPG-Style Progression System**
- **5 Tiers** from Rookie Apprentice to Grandmaster Legend
- **42 Skills** covering complete PCB design mastery
- **Prerequisites System** - unlock skills in logical progression
- **Progress Tracking** with visual progress bar
- **Local Storage** persistence - your progress is saved

### **Pitt Viper Cyberpunk Aesthetic**
- **Electric Neon Glow Effects** in cyan, magenta, green, and yellow
- **Circuit Board Style Connections** with animated flowing energy
- **Multi-layered Background Grid** with pulsing neon elements
- **Futuristic Typography** using Orbitron and Exo 2 fonts
- **Geometric Skill Nodes** with clipped corners and tier-specific colors
- **Vibrant Particle Effects** with rainbow neon trails

### **Interactive Elements**
- **Click to Unlock** available skills
- **Hover Tooltips** showing prerequisites or status
- **Skill Detail Modals** with comprehensive descriptions
- **Sound Effects** for skill unlocks
- **Keyboard Shortcuts** (Ctrl+R to reset, Esc to close modals)
- **Tier Completion Notifications**

### **Educational Content**
- **Foundation Skills**: PCB anatomy, schematics, ECAD tools
- **2-Layer Mastery**: Component placement, routing, DFM
- **Multilayer Techniques**: Power planes, EMC, return paths
- **Advanced Specialization**: Signal integrity, power integrity, HDI
- **Master Level**: DDR memory, RF design, advanced DFM
- **Legendary Skills**: Reverse engineering, full-cycle ownership

## 🚀 Quick Start

### Option 1: Simple File Opening
1. Clone or download this repository
2. Open `index.html` directly in your web browser
3. Start unlocking skills from Tier 1!

### Option 2: Local Development Server
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd pcb_skills_tree
   ```

2. Install a simple HTTP server:
   ```bash
   # Using Node.js
   npm install -g http-server
   http-server
   
   # Or using Python 3
   python -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   ```

3. Open your browser to `http://localhost:8000`

### Option 3: Using Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎯 How to Use

### **Getting Started**
1. **Start with Tier 1** - Foundation skills have no prerequisites
2. **Click available skills** (highlighted in green) to unlock them
3. **Read skill descriptions** by clicking on any skill node
4. **Progress naturally** through the tiers as prerequisites are met

### **Skill States**
- 🟢 **Available** (green glow) - Can be unlocked now
- 🟡 **Unlocked** (golden) - Already mastered
- 🔒 **Locked** (dim) - Prerequisites not met

### **Navigation Tips**
- **Hover** over skills to see prerequisites or status
- **Click any skill** to view detailed information
- **Use Ctrl+R** to reset all progress (with confirmation)
- **Press Escape** to close modal windows

## 🛠️ Technical Details

### **Built With**
- **Pure HTML5/CSS3/JavaScript** - No frameworks required
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Custom Properties** for consistent theming
- **Web Audio API** for unlock sound effects
- **LocalStorage API** for progress persistence

### **Browser Compatibility**
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (responsive design)

### **Performance**
- **Lightweight** - No external dependencies
- **Optimized animations** using CSS transforms
- **Efficient DOM manipulation** with vanilla JavaScript
- **Progressive enhancement** - works without JavaScript

## 📁 File Structure

```
pcb_skills_tree/
├── index.html          # Main HTML structure
├── styles.css          # Cyberpunk styling with golden glow effects
├── script.js           # Interactive skill tree functionality
├── skills_tree.mermaid # Original Mermaid diagram (reference)
├── STYLE.md           # Aesthetic design guidelines
└── README.md          # This file
```

## 🎨 Customization

### **Color Scheme**
Edit CSS custom properties in `styles.css`:
```css
:root {
  --color-primary: #00ffff;        /* Electric cyan */
  --color-primary-bright: #ff00ff; /* Hot magenta */
  --color-accent: #00ff00;         /* Electric green */
  --color-neon-yellow: #ffff00;    /* Neon yellow */
  --color-background: #0a0a0a;     /* Dark background */
  /* ... more Pitt Viper colors */
}
```

### **Adding New Skills**
1. **Update HTML structure** in `index.html`
2. **Add skill data** to `skillData` object in `script.js`
3. **Define prerequisites** and descriptions
4. **Test the progression flow**

### **Modifying Animations**
- **Glow effects**: Adjust `--glow-*` CSS variables
- **Background grid**: Modify `@keyframes gridShift`
- **Skill unlocks**: Edit `showSkillUnlockedEffect()` method

## 🧠 Skill Tree Overview

### **Tier 1: Rookie Apprentice (Level 1-10)**
- **Circuit Foundation**: PCB anatomy, components, footprints
- **Digital Workflow**: Schematics, netlists, ECAD tools, Gerber output

### **Tier 2: Pro Journeyman (Level 11-25)**
- **2-Layer Mastery**: Strategic placement through test access
- **Multilayer Core**: Power planes through via stitching

### **Tier 3: Veteran Specialist (Level 26-35)**
- **Signal Integrity**: Transmission lines through crosstalk defense
- **Power Integrity**: PDN systems through plane capacitance
- **HDI Techniques**: BGA fanout through microvia reliability

### **Tier 4: Master Architect (Level 36-40)**
- **DDR Memory Specialist**: Signal grouping through VTT termination
- **RF & Microwave Specialist**: Low-loss materials through PCB antennas
- **Advanced DFM Specialist**: Panelization through complete packages

### **Tier 5: Grandmaster Legend (Level 41-42)**
- **Open Source Analysis**: Reverse engineering and circuit archaeology
- **Full-Cycle Mastery**: Complete ownership from concept to production

## 🚧 Development Roadmap

- [ ] **Achievement System** with badges and milestones
- [ ] **Skill Recommendations** based on current progress
- [ ] **Learning Resources** linked to each skill
- [ ] **Export Progress** feature for sharing
- [ ] **Multiple Themes** (Matrix, Neon, Industrial)
- [ ] **Mobile App** version

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- **Add new skills** or improve descriptions
- **Enhance the visual design** and animations
- **Improve accessibility** features
- **Fix bugs** or optimize performance
- **Add new themes** or customization options

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **PCB Design Community** for inspiration and knowledge
- **Cyberpunk Aesthetic** from sci-fi gaming culture
- **Open Source Hardware** projects for real-world examples
- **Web Design Community** for CSS techniques and animations

---

**Start your journey to PCB mastery! 🔧⚡**

*"From rookie apprentice to grandmaster legend - unlock the secrets of electronic circuit design."* 