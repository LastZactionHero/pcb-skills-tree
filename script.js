// ===== PCB SKILLS TREE INTERACTIVE SYSTEM =====
// Cyberpunk RPG-style skill progression with prerequisites

class PCBSkillTree {
    constructor() {
        this.unlockedSkills = new Set();
        this.totalSkills = 42;
        this.skillData = this.initializeSkillData();
        this.init();
    }

    init() {
        this.loadProgress();
        this.bindEvents();
        this.updateSkillStates();
        this.updateProgress();
        this.addWelcomeMessage();
    }

    // === SKILL DATA DEFINITIONS ===
    initializeSkillData() {
        return {
            // Tier 1: Rookie Apprentice
            'pcb-anatomy': {
                name: 'PCB Anatomy',
                description: 'Understanding the fundamental structure of printed circuit boards, including substrate materials, copper layers, and via types. Learn about FR4, copper thickness, and layer stackup basics.',
                prerequisites: [],
                tier: 1,
                category: 'Foundation'
            },
            'component-tech': {
                name: 'Component Technology',
                description: 'Master the differences between Through-Hole Technology (THT) and Surface Mount Device (SMD) components. Understand package types, thermal characteristics, and assembly considerations.',
                prerequisites: ['pcb-anatomy'],
                tier: 1,
                category: 'Foundation'
            },
            'footprint-library': {
                name: 'Footprint Library',
                description: 'Create and manage component footprints with proper land patterns. Master IPC standards for component placement and soldering reliability.',
                prerequisites: ['component-tech'],
                tier: 1,
                category: 'Foundation'
            },
            'schematic-mastery': {
                name: 'Schematic Mastery',
                description: 'Design clear, readable schematics with proper symbol creation and hierarchical design principles. Understand electrical rules and best practices.',
                prerequisites: [],
                tier: 1,
                category: 'Workflow'
            },
            'netlist-control': {
                name: 'Netlist Control',
                description: 'Manage electrical connections between components through proper net naming, bus structures, and design rule checking.',
                prerequisites: ['schematic-mastery'],
                tier: 1,
                category: 'Workflow'
            },
            'ecad-platform': {
                name: 'ECAD Platform',
                description: 'Achieve proficiency in Electronic Computer-Aided Design tools like KiCad, Altium, or Eagle. Master libraries, design rules, and workflow optimization.',
                prerequisites: ['netlist-control'],
                tier: 1,
                category: 'Workflow'
            },
            'gerber-standard': {
                name: 'Gerber Standard',
                description: 'Generate manufacturing-ready Gerber files, drill files, and pick-and-place data. Understand RS-274X format and fabrication requirements.',
                prerequisites: ['ecad-platform'],
                tier: 1,
                category: 'Workflow'
            },

            // Tier 2: Pro Journeyman
            'strategic-planning': {
                name: 'Strategic Planning',
                description: 'Develop systematic approaches to component placement considering signal flow, thermal management, and assembly constraints.',
                prerequisites: ['footprint-library', 'gerber-standard'],
                tier: 2,
                category: '2-Layer'
            },
            'power-decoupling': {
                name: 'Power Decoupling',
                description: 'Design effective power supply decoupling networks with bypass capacitors, understanding ESR, ESL, and frequency response.',
                prerequisites: ['strategic-planning'],
                tier: 2,
                category: '2-Layer'
            },
            'trace-routing': {
                name: 'Trace Routing',
                description: 'Master trace width calculations for current carrying capacity, voltage drop, and impedance control. Understand copper thickness effects.',
                prerequisites: ['power-decoupling'],
                tier: 2,
                category: '2-Layer'
            },
            'orthogonal-design': {
                name: 'Orthogonal Design',
                description: 'Implement Manhattan routing techniques with 45-degree and 90-degree angles for clean, manufacturable layouts.',
                prerequisites: ['trace-routing'],
                tier: 2,
                category: '2-Layer'
            },
            'ground-pour': {
                name: 'Ground Pour',
                description: 'Create effective ground planes with proper copper pour techniques, island avoidance, and return path optimization.',
                prerequisites: ['orthogonal-design'],
                tier: 2,
                category: '2-Layer'
            },
            'thermal-relief': {
                name: 'Thermal Relief',
                description: 'Design thermal relief patterns for component attachment while maintaining electrical connectivity and heat dissipation.',
                prerequisites: ['ground-pour'],
                tier: 2,
                category: '2-Layer'
            },
            'dfm-cost': {
                name: 'DFM: Cost Control',
                description: 'Optimize designs for manufacturing cost through panel utilization, layer count management, and process selection.',
                prerequisites: ['thermal-relief'],
                tier: 2,
                category: '2-Layer'
            },
            'dft-test': {
                name: 'DFT: Test Access',
                description: 'Design testability into PCBs with proper test point placement, boundary scan considerations, and debug accessibility.',
                prerequisites: ['orthogonal-design'],
                tier: 2,
                category: '2-Layer'
            },
            'power-planes': {
                name: 'Power Planes',
                description: 'Design dedicated power and ground planes for improved power delivery and EMI reduction in multilayer boards.',
                prerequisites: ['strategic-planning'],
                tier: 2,
                category: 'Multilayer'
            },
            '4layer-stack': {
                name: '4-Layer Stack',
                description: 'Design controlled impedance 4-layer stackups with proper prepreg and core selection for signal integrity.',
                prerequisites: ['power-planes'],
                tier: 2,
                category: 'Multilayer'
            },
            'emc-design': {
                name: 'EMC Design',
                description: 'Implement electromagnetic compatibility techniques including proper grounding, shielding, and noise reduction strategies.',
                prerequisites: ['4layer-stack'],
                tier: 2,
                category: 'Multilayer'
            },
            'return-paths': {
                name: 'Return Paths',
                description: 'Understand current return path analysis and ensure continuous ground planes for high-speed signal integrity.',
                prerequisites: ['emc-design'],
                tier: 2,
                category: 'Multilayer'
            },
            'path-discontinuity': {
                name: 'Path Discontinuity',
                description: 'Identify and eliminate return path discontinuities that cause EMI and signal integrity issues.',
                prerequisites: ['return-paths'],
                tier: 2,
                category: 'Multilayer'
            },
            'stitching-vias': {
                name: 'Stitching Vias',
                description: 'Design via stitching patterns to maintain ground plane continuity and reduce ground bounce in multilayer designs.',
                prerequisites: ['path-discontinuity'],
                tier: 2,
                category: 'Multilayer'
            },

            // Tier 3: Veteran Specialist
            'transmission-lines': {
                name: 'Transmission Lines',
                description: 'Master transmission line theory including characteristic impedance, propagation delay, and wave behavior on PCB traces.',
                prerequisites: ['4layer-stack'],
                tier: 3,
                category: 'Signal Integrity'
            },
            'controlled-impedance': {
                name: 'Controlled Impedance',
                description: 'Design and specify controlled impedance traces with proper stackup design and field solver verification.',
                prerequisites: ['transmission-lines'],
                tier: 3,
                category: 'Signal Integrity'
            },
            'differential-pairs': {
                name: 'Differential Pairs',
                description: 'Route high-speed differential signals with proper spacing, length matching, and common-mode noise rejection.',
                prerequisites: ['controlled-impedance'],
                tier: 3,
                category: 'Signal Integrity'
            },
            'crosstalk-defense': {
                name: 'Crosstalk Defense',
                description: 'Minimize crosstalk between adjacent traces through spacing rules, guard traces, and layer assignment strategies.',
                prerequisites: ['differential-pairs'],
                tier: 3,
                category: 'Signal Integrity'
            },
            'pdn-system': {
                name: 'PDN System',
                description: 'Design power distribution networks as complete systems considering impedance, decoupling, and load requirements.',
                prerequisites: ['power-planes'],
                tier: 3,
                category: 'Power Integrity'
            },
            'pdn-impedance': {
                name: 'PDN Impedance',
                description: 'Analyze and control power distribution network impedance across frequency spectrum for clean power delivery.',
                prerequisites: ['pdn-system'],
                tier: 3,
                category: 'Power Integrity'
            },
            'multi-value-caps': {
                name: 'Multi-Value Capacitors',
                description: 'Design decoupling networks with multiple capacitor values to achieve broadband impedance control.',
                prerequisites: ['pdn-impedance'],
                tier: 3,
                category: 'Power Integrity'
            },
            'plane-capacitance': {
                name: 'Plane Capacitance',
                description: 'Utilize intrinsic capacitance between power and ground planes as part of the overall decoupling strategy.',
                prerequisites: ['multi-value-caps'],
                tier: 3,
                category: 'Power Integrity'
            },
            'bga-fanout': {
                name: 'BGA Fanout',
                description: 'Master escape routing techniques for high pin-count BGA packages using microvias and HDI technology.',
                prerequisites: ['4layer-stack'],
                tier: 3,
                category: 'HDI'
            },
            'via-in-pad': {
                name: 'Via-in-Pad',
                description: 'Implement via-in-pad technology for space-constrained designs with proper via filling and reliability considerations.',
                prerequisites: ['bga-fanout'],
                tier: 3,
                category: 'HDI'
            },
            'microvias': {
                name: 'Microvias',
                description: 'Design with microvias for high-density interconnect applications, understanding aspect ratios and reliability.',
                prerequisites: ['via-in-pad'],
                tier: 3,
                category: 'HDI'
            },
            'sequential-build': {
                name: 'Sequential Build',
                description: 'Design multilayer boards with sequential lamination processes for advanced HDI applications.',
                prerequisites: ['microvias'],
                tier: 3,
                category: 'HDI'
            },
            'microvia-reliability': {
                name: 'Microvia Reliability',
                description: 'Understand microvia failure mechanisms and design for long-term reliability in thermal cycling.',
                prerequisites: ['sequential-build'],
                tier: 3,
                category: 'HDI'
            },

            // Tier 4: Master Architect
            'signal-groups': {
                name: 'Signal Groups',
                description: 'Organize high-speed memory signals into groups with proper routing strategies and timing considerations.',
                prerequisites: ['crosstalk-defense'],
                tier: 4,
                category: 'DDR Memory'
            },
            'length-matching': {
                name: 'Length Matching',
                description: 'Achieve precise length matching for DDR memory interfaces to meet setup and hold time requirements.',
                prerequisites: ['signal-groups'],
                tier: 4,
                category: 'DDR Memory'
            },
            'topology-design': {
                name: 'Topology Design',
                description: 'Design optimal routing topologies including T-point, daisy chain, and fly-by configurations for memory interfaces.',
                prerequisites: ['length-matching'],
                tier: 4,
                category: 'DDR Memory'
            },
            'serpentine-tuning': {
                name: 'Serpentine Tuning',
                description: 'Master serpentine delay line design with proper spacing and tuning techniques for timing closure.',
                prerequisites: ['topology-design'],
                tier: 4,
                category: 'DDR Memory'
            },
            'vtt-termination': {
                name: 'VTT Termination',
                description: 'Implement voltage-tracking termination schemes for DDR memory systems with proper power delivery.',
                prerequisites: ['serpentine-tuning'],
                tier: 4,
                category: 'DDR Memory'
            },
            'low-loss-materials': {
                name: 'Low-Loss Materials',
                description: 'Select and specify low-loss dielectric materials for high-frequency RF and microwave applications.',
                prerequisites: ['crosstalk-defense'],
                tier: 4,
                category: 'RF & Microwave'
            },
            '50ohm-universe': {
                name: '50Ω Universe',
                description: 'Master the 50-ohm impedance standard for RF systems including measurement and verification techniques.',
                prerequisites: ['low-loss-materials'],
                tier: 4,
                category: 'RF & Microwave'
            },
            'rf-shielding': {
                name: 'RF Shielding',
                description: 'Design effective RF shielding and isolation chambers for sensitive circuits and interference reduction.',
                prerequisites: ['50ohm-universe'],
                tier: 4,
                category: 'RF & Microwave'
            },
            'rf-via-stitching': {
                name: 'RF Via Stitching',
                description: 'Implement specialized via stitching patterns for RF ground continuity and mode suppression.',
                prerequisites: ['rf-shielding'],
                tier: 4,
                category: 'RF & Microwave'
            },
            'pcb-antenna': {
                name: 'PCB Antenna',
                description: 'Design integrated PCB antennas including patch, dipole, and loop antennas with proper matching networks.',
                prerequisites: ['rf-via-stitching'],
                tier: 4,
                category: 'RF & Microwave'
            },
            'panelization': {
                name: 'Panelization',
                description: 'Optimize production panels for manufacturing efficiency, yield improvement, and cost reduction.',
                prerequisites: ['dfm-cost'],
                tier: 4,
                category: 'Advanced DFM'
            },
            'via-treatments': {
                name: 'Via Treatments',
                description: 'Specify advanced via treatments including via filling, capping, and tenting for reliability and performance.',
                prerequisites: ['panelization'],
                tier: 4,
                category: 'Advanced DFM'
            },
            'fab-drawing': {
                name: 'Fabrication Drawing',
                description: 'Create comprehensive fabrication drawings with complete specifications, notes, and quality requirements.',
                prerequisites: ['via-treatments'],
                tier: 4,
                category: 'Advanced DFM'
            },
            'complete-package': {
                name: 'Complete Package',
                description: 'Deliver production-ready design packages with all necessary files, documentation, and manufacturing data.',
                prerequisites: ['fab-drawing'],
                tier: 4,
                category: 'Advanced DFM'
            },

            // Tier 5: Grandmaster Legend
            'open-source-analysis': {
                name: 'Open Source Analysis',
                description: 'Master the art of reverse engineering PCB designs from open-source hardware and existing products. Develop circuit archaeology skills to understand design decisions and extract knowledge from real-world implementations.',
                prerequisites: ['vtt-termination', 'pcb-antenna'],
                tier: 5,
                category: 'Legendary'
            },
            'full-cycle-mastery': {
                name: 'Full-Cycle Mastery',
                description: 'Achieve complete ownership of the PCB design process from initial concept through production and field deployment. Master business, technical, and project management aspects of hardware development.',
                prerequisites: ['open-source-analysis'],
                tier: 5,
                category: 'Legendary'
            }
        };
    }

    // === EVENT BINDING ===
    bindEvents() {
        // Skill node clicks
        document.querySelectorAll('.skill-node').forEach(node => {
            node.addEventListener('click', (e) => this.handleSkillClick(e));
            node.addEventListener('mouseenter', (e) => this.handleSkillHover(e));
        });

        // Modal events
        const modal = document.getElementById('skill-modal');
        const closeBtn = modal.querySelector('.close');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Reset progress button (for testing)
        this.addResetButton();
    }

    // === SKILL INTERACTION HANDLERS ===
    handleSkillClick(event) {
        const skillNode = event.currentTarget;
        const skillId = skillNode.dataset.skill;
        const skillInfo = this.skillData[skillId];

        if (!skillInfo) return;

        if (this.canUnlockSkill(skillId)) {
            this.unlockSkill(skillId);
            this.showSkillUnlockedEffect(skillNode);
        }
        
        this.showSkillModal(skillId, skillInfo);
    }

    handleSkillHover(event) {
        const skillNode = event.currentTarget;
        const skillId = skillNode.dataset.skill;
        
        if (this.unlockedSkills.has(skillId)) {
            this.addTooltip(skillNode, 'Mastered ✓');
        } else if (this.canUnlockSkill(skillId)) {
            this.addTooltip(skillNode, 'Click to unlock!');
        } else {
            const missing = this.getMissingPrerequisites(skillId);
            this.addTooltip(skillNode, `Requires: ${missing.join(', ')}`);
        }
    }

    handleKeyboard(event) {
        if (event.key === 'Escape') {
            this.closeModal();
        } else if (event.key === 'r' && event.ctrlKey) {
            event.preventDefault();
            this.resetProgress();
        }
    }

    // === SKILL LOGIC ===
    canUnlockSkill(skillId) {
        if (this.unlockedSkills.has(skillId)) return false;
        
        const skill = this.skillData[skillId];
        if (!skill) return false;

        // Special logic for Open Source Analysis - allow unlocking with any 2 of the 3 master specializations
        if (skillId === 'open-source-analysis') {
            const masterSkills = ['vtt-termination', 'pcb-antenna', 'complete-package'];
            const unlockedMasterSkills = masterSkills.filter(skill => this.unlockedSkills.has(skill));
            return unlockedMasterSkills.length >= 2;
        }

        return skill.prerequisites.every(prereq => this.unlockedSkills.has(prereq));
    }

    getMissingPrerequisites(skillId) {
        const skill = this.skillData[skillId];
        if (!skill) return [];

        // Special logic for Open Source Analysis
        if (skillId === 'open-source-analysis') {
            const masterSkills = ['vtt-termination', 'pcb-antenna', 'complete-package'];
            const unlockedMasterSkills = masterSkills.filter(skill => this.unlockedSkills.has(skill));
            if (unlockedMasterSkills.length >= 2) return [];
            return [`Need any 2 of: DDR Memory, RF Design, or Advanced DFM mastery`];
        }

        return skill.prerequisites.filter(prereq => !this.unlockedSkills.has(prereq))
            .map(prereq => this.skillData[prereq]?.name || prereq);
    }

    unlockSkill(skillId) {
        this.unlockedSkills.add(skillId);
        this.saveProgress();
        this.updateSkillStates();
        this.updateProgress();
        this.playUnlockSound();
        
        // Check for tier completion
        this.checkTierCompletion();
    }

    // === UI UPDATES ===
    updateSkillStates() {
        document.querySelectorAll('.skill-node').forEach(node => {
            const skillId = node.dataset.skill;
            
            // Remove all state classes
            node.classList.remove('locked', 'available', 'unlocked');
            
            if (this.unlockedSkills.has(skillId)) {
                node.classList.add('unlocked');
            } else if (this.canUnlockSkill(skillId)) {
                node.classList.add('available');
            } else {
                node.classList.add('locked');
            }
        });
    }

    updateProgress() {
        const unlockedCount = this.unlockedSkills.size;
        const progressPercent = (unlockedCount / this.totalSkills) * 100;
        
        document.getElementById('skills-count').textContent = unlockedCount;
        document.querySelector('.progress-fill').style.width = `${progressPercent}%`;
        document.querySelector('.progress-fill').dataset.progress = progressPercent;
    }

    // === MODAL SYSTEM ===
    showSkillModal(skillId, skillInfo) {
        const modal = document.getElementById('skill-modal');
        const skillNode = document.querySelector(`[data-skill="${skillId}"]`);
        
        // Populate modal content
        modal.querySelector('.skill-detail-icon').textContent = skillNode.querySelector('.skill-icon').textContent;
        modal.querySelector('.skill-detail-name').textContent = skillInfo.name;
        modal.querySelector('.skill-detail-subtitle').textContent = skillNode.querySelector('.skill-subtitle').textContent;
        modal.querySelector('.skill-detail-level').textContent = `Level ${skillNode.querySelector('.skill-level').textContent}`;
        
        // Description
        const descriptionEl = modal.querySelector('.skill-detail-description');
        descriptionEl.innerHTML = `<h4>Description</h4><p>${skillInfo.description}</p>`;
        
        // Prerequisites
        const prereqEl = modal.querySelector('.skill-detail-prerequisites');
        if (skillInfo.prerequisites.length > 0) {
            const prereqNames = skillInfo.prerequisites.map(id => this.skillData[id]?.name || id);
            prereqEl.innerHTML = `<h4>Prerequisites</h4><ul>${prereqNames.map(name => `<li>${name}</li>`).join('')}</ul>`;
        } else {
            prereqEl.innerHTML = '<h4>Prerequisites</h4><p>None - Starting skill</p>';
        }
        
        // What this unlocks
        const unlocksEl = modal.querySelector('.skill-detail-unlocks');
        const unlocks = this.getSkillsUnlockedBy(skillId);
        if (unlocks.length > 0) {
            unlocksEl.innerHTML = `<h4>Unlocks</h4><ul>${unlocks.map(name => `<li>${name}</li>`).join('')}</ul>`;
        } else {
            unlocksEl.innerHTML = '<h4>Unlocks</h4><p>This is a capstone skill</p>';
        }
        
        modal.style.display = 'block';
        
        // Add modal animation
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }

    closeModal() {
        const modal = document.getElementById('skill-modal');
        modal.style.display = 'none';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        modal.querySelector('.modal-content').style.opacity = '0';
    }

    getSkillsUnlockedBy(skillId) {
        return Object.entries(this.skillData)
            .filter(([id, skill]) => skill.prerequisites.includes(skillId))
            .map(([id, skill]) => skill.name);
    }

    // === EFFECTS & ANIMATIONS ===
    showSkillUnlockedEffect(skillNode) {
        // Create unlock effect with random Pitt Viper color
        const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff8000'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const effect = document.createElement('div');
        effect.className = 'unlock-effect';
        effect.innerHTML = '⚡ UNLOCKED! ⚡';
        effect.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            color: ${randomColor};
            font-weight: bold;
            font-size: 0.9rem;
            text-shadow: 0 0 10px ${randomColor}, 0 0 20px ${randomColor};
            animation: unlockFloat 2s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // Add animation keyframes
        if (!document.querySelector('#unlock-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'unlock-animation-styles';
            style.textContent = `
                @keyframes unlockFloat {
                    0% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        skillNode.style.position = 'relative';
        skillNode.appendChild(effect);
        
        setTimeout(() => effect.remove(), 2000);
    }

    addTooltip(element, text) {
        this.removeTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-surface);
            color: var(--color-text);
            padding: 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            white-space: nowrap;
            border: 1px solid var(--color-primary-dim);
            z-index: 1000;
            margin-bottom: 5px;
            box-shadow: var(--glow-subtle);
        `;
        
        element.style.position = 'relative';
        element.appendChild(tooltip);
        
        setTimeout(() => this.removeTooltip(), 3000);
    }

    removeTooltip() {
        document.querySelectorAll('.skill-tooltip').forEach(tooltip => tooltip.remove());
    }

    // === PERSISTENCE ===
    saveProgress() {
        localStorage.setItem('pcb-skills-progress', JSON.stringify([...this.unlockedSkills]));
    }

    loadProgress() {
        const saved = localStorage.getItem('pcb-skills-progress');
        if (saved) {
            this.unlockedSkills = new Set(JSON.parse(saved));
        }
    }

    resetProgress() {
        if (confirm('Reset all progress? This cannot be undone.')) {
            this.unlockedSkills.clear();
            this.saveProgress();
            this.updateSkillStates();
            this.updateProgress();
        }
    }

    // === UTILITY METHODS ===
    checkTierCompletion() {
        const tierSkills = {
            1: ['pcb-anatomy', 'component-tech', 'footprint-library', 'schematic-mastery', 'netlist-control', 'ecad-platform', 'gerber-standard'],
            2: ['strategic-planning', 'power-decoupling', 'trace-routing', 'orthogonal-design', 'ground-pour', 'thermal-relief', 'dfm-cost', 'dft-test', 'power-planes', '4layer-stack', 'emc-design', 'return-paths', 'path-discontinuity', 'stitching-vias'],
            3: ['transmission-lines', 'controlled-impedance', 'differential-pairs', 'crosstalk-defense', 'pdn-system', 'pdn-impedance', 'multi-value-caps', 'plane-capacitance', 'bga-fanout', 'via-in-pad', 'microvias', 'sequential-build', 'microvia-reliability'],
            4: ['signal-groups', 'length-matching', 'topology-design', 'serpentine-tuning', 'vtt-termination', 'low-loss-materials', '50ohm-universe', 'rf-shielding', 'rf-via-stitching', 'pcb-antenna', 'panelization', 'via-treatments', 'fab-drawing', 'complete-package'],
            5: ['open-source-analysis', 'full-cycle-mastery']
        };

        for (const [tier, skills] of Object.entries(tierSkills)) {
            const completed = skills.every(skill => this.unlockedSkills.has(skill));
            if (completed && !this.hasShownTierCompletion(tier)) {
                this.showTierCompletionMessage(tier);
                this.markTierCompletionShown(tier);
            }
        }
    }

    hasShownTierCompletion(tier) {
        const shown = localStorage.getItem('pcb-skills-tier-completions') || '[]';
        return JSON.parse(shown).includes(tier);
    }

    markTierCompletionShown(tier) {
        const shown = JSON.parse(localStorage.getItem('pcb-skills-tier-completions') || '[]');
        shown.push(tier);
        localStorage.setItem('pcb-skills-tier-completions', JSON.stringify(shown));
    }

    showTierCompletionMessage(tier) {
        const tierNames = {
            1: 'Rookie Apprentice',
            2: 'Pro Journeyman', 
            3: 'Veteran Specialist',
            4: 'Master Architect',
            5: 'Grandmaster Legend'
        };
        
        alert(`🎉 Congratulations! You've completed Tier ${tier}: ${tierNames[tier]}! 🎉`);
    }

    playUnlockSound() {
        // Create a simple unlock sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // Fallback if Web Audio API is not available
            console.log('Skill unlocked!');
        }
    }

    addWelcomeMessage() {
        if (!localStorage.getItem('pcb-skills-visited')) {
            setTimeout(() => {
                alert('Welcome to the PCB Design Skills Tree! 🔧⚡\n\nClick on available skills (highlighted in green) to unlock them.\nStart with the foundation skills in Tier 1.\n\nUse Ctrl+R to reset progress.');
                localStorage.setItem('pcb-skills-visited', 'true');
            }, 1000);
        }
    }

    addResetButton() {
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Reset Progress';
        resetBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-warning);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.8rem;
            z-index: 1000;
        `;
        resetBtn.addEventListener('click', () => this.resetProgress());
        document.body.appendChild(resetBtn);
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    new PCBSkillTree();
});

// === ADDITIONAL UTILITIES ===
// Smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Add some dynamic background effects
function addBackgroundParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 100 + 50
        };
    }
    
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Pitt Viper neon colors for particles
        const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff8000'];
        
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            if (particle.life <= 0 || particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
                particles[index] = createParticle();
                particles[index].color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            if (!particle.color) {
                particle.color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.globalAlpha = particle.life / 100;
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 3;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
            ctx.stroke();
            
            // Reset shadow
            ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Add particles after page load
setTimeout(addBackgroundParticles, 2000); 