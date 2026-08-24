// Central theme customization script for SkyEagle Studio
// Immediately evaluate theme preferences to avoid Flash of Unstyled Content (FOUC)
(function() {
    const savedMode = localStorage.getItem('theme-mode') || 'night';
    const savedColor = localStorage.getItem('theme-color') || 'blue';
    document.documentElement.className = `theme-mode-${savedMode} theme-color-${savedColor}`;
})();

document.addEventListener('DOMContentLoaded', () => {
    // Style configurations for theme widget
    const styles = `
        /* Floating Customizer Button */
        .theme-widget-trigger {
            position: fixed;
            left: 25px;
            bottom: 25px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(10, 10, 10, 0.85);
            border: 2px solid var(--primary, #00f0ff);
            color: var(--primary, #00f0ff);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            cursor: pointer;
            z-index: 1005;
            box-shadow: 0 0 15px rgba(var(--primary-rgb, 0, 240, 255), 0.35);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(5px);
        }
        .theme-widget-trigger:hover {
            transform: scale(1.1) rotate(45deg);
            box-shadow: 0 0 25px rgba(var(--primary-rgb, 0, 240, 255), 0.55);
        }
        
        /* Customizer Panel Drawer */
        .theme-config-panel {
            position: fixed;
            left: 25px;
            bottom: 90px;
            width: 300px;
            background: #0d0d0f;
            border: 1px solid #1c1c1f;
            border-radius: 12px;
            padding: 22px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95);
            z-index: 1005;
            opacity: 0;
            transform: scale(0.9) translateY(10px);
            transform-origin: left bottom;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(10px);
        }
        .theme-config-panel.active {
            opacity: 1;
            transform: scale(1) translateY(0);
            pointer-events: auto;
        }
        
        .theme-config-panel h3 {
            font-family: 'Orbitron', sans-serif;
            color: #fff;
            font-size: 0.8rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            border-bottom: 1px solid #1c1c1f;
            padding-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .theme-config-panel h3 i {
            color: var(--primary, #00f0ff);
        }
        
        /* Modes Selector */
        .theme-modes-row {
            display: flex;
            gap: 8px;
            margin-bottom: 22px;
        }
        .theme-mode-btn {
            flex: 1;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid #1c1c1f;
            border-radius: 6px;
            color: #777;
            padding: 10px 0;
            font-size: 0.7rem;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            transition: all 0.3s;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
        }
        .theme-mode-btn:hover {
            background: rgba(255, 255, 255, 0.06);
            color: #fff;
        }
        .theme-mode-btn.active {
            border-color: var(--primary, #00f0ff);
            color: var(--primary, #00f0ff);
            background: rgba(var(--primary-rgb, 0, 240, 255), 0.04);
            box-shadow: 0 0 10px rgba(var(--primary-rgb, 0, 240, 255), 0.15);
        }
        
        /* Accent Colors Selector */
        .theme-colors-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
        }
        .theme-color-dot {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
            justify-self: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .theme-color-dot::after {
            content: '';
            position: absolute;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: currentColor;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .theme-color-dot:hover {
            transform: scale(1.15);
        }
        .theme-color-dot.active {
            border-color: var(--primary, #00f0ff);
            box-shadow: 0 0 12px rgba(var(--primary-rgb, 0, 240, 255), 0.25);
        }

        /* Mode Overrides on light theme panels */
        .theme-mode-light .theme-config-panel {
            background: #ffffff;
            border-color: #e9ecef;
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        .theme-mode-light .theme-config-panel h3 {
            color: #000;
            border-bottom-color: #f1f3f5;
        }
        .theme-mode-light .theme-mode-btn {
            background: #f8f9fa;
            border-color: #e9ecef;
            color: #666;
        }
        .theme-mode-light .theme-mode-btn:hover {
            background: #e9ecef;
            color: #000;
        }
        .theme-mode-light .theme-widget-trigger {
            background: #ffffff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        /* Mobile Slide-Up bottom Drawer Layout */
        @media (max-width: 600px) {
            .theme-widget-trigger {
                left: 20px;
                bottom: 20px;
            }
            .theme-config-panel {
                left: 0 !important;
                bottom: 0 !important;
                width: 100% !important;
                border-radius: 20px 20px 0 0 !important;
                transform-origin: bottom center !important;
                transform: translateY(100%) !important;
                padding: 25px 20px 35px !important;
                box-shadow: 0 -10px 30px rgba(0,0,0,0.7) !important;
            }
            .theme-config-panel.active {
                transform: translateY(0) !important;
            }
            .theme-mode-light .theme-config-panel {
                box-shadow: 0 -10px 30px rgba(0,0,0,0.08) !important;
            }
        }
    `;

    // 1. Inject Styles dynamically into page head
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    // 2. Create Floating customizer widget
    const trigger = document.createElement('button');
    trigger.className = 'theme-widget-trigger';
    trigger.setAttribute('aria-label', 'Open Visual Customizer');
    trigger.innerHTML = '<i class="fas fa-palette"></i>';

    const panel = document.createElement('div');
    panel.className = 'theme-config-panel';
    panel.innerHTML = `
        <h3><i class="fas fa-sliders"></i> Visual Settings</h3>
        <div class="theme-modes-row">
            <button class="theme-mode-btn" data-mode="light">
                <i class="fas fa-sun"></i>
                <span>Light</span>
            </button>
            <button class="theme-mode-btn" data-mode="dark">
                <i class="fas fa-moon"></i>
                <span>Dark</span>
            </button>
            <button class="theme-mode-btn" data-mode="night">
                <i class="fas fa-star-and-crescent"></i>
                <span>Night</span>
            </button>
        </div>

        <h3><i class="fas fa-fill-drip"></i> Accent Theme</h3>
        <div class="theme-colors-grid">
            <div class="theme-color-dot" data-color="blue" style="color:#00f0ff;"></div>
            <div class="theme-color-dot" data-color="magenta" style="color:#ff00f7;"></div>
            <div class="theme-color-dot" data-color="green" style="color:#00ff66;"></div>
            <div class="theme-color-dot" data-color="gold" style="color:#ffd700;"></div>
            <div class="theme-color-dot" data-color="red" style="color:#ff3b30;"></div>
            <div class="theme-color-dot" data-color="purple" style="color:#af52de;"></div>
            <div class="theme-color-dot" data-color="orange" style="color:#ff9500;"></div>
            <div class="theme-color-dot" data-color="silver" style="color:#e5e5ea;"></div>
        </div>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    // 3. Toggle panel
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        panel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
            panel.classList.remove('active');
        }
    });

    // 4. Mode switcher listener
    const modeBtns = panel.querySelectorAll('.theme-mode-btn');
    const currentMode = localStorage.getItem('theme-mode') || 'night';
    
    // Highlight active mode initially
    modeBtns.forEach(btn => {
        if (btn.getAttribute('data-mode') === currentMode) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const selectedMode = btn.getAttribute('data-mode');
            localStorage.setItem('theme-mode', selectedMode);
            updateHtmlThemeClasses();
        });
    });

    // 5. Color switcher listener
    const colorDots = panel.querySelectorAll('.theme-color-dot');
    const currentColor = localStorage.getItem('theme-color') || 'blue';

    // Highlight active color initially
    colorDots.forEach(dot => {
        if (dot.getAttribute('data-color') === currentColor) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            
            const selectedColor = dot.getAttribute('data-color');
            localStorage.setItem('theme-color', selectedColor);
            updateHtmlThemeClasses();
        });
    });

    // Update class names on document element
    function updateHtmlThemeClasses() {
        const activeMode = localStorage.getItem('theme-mode') || 'night';
        const activeColor = localStorage.getItem('theme-color') || 'blue';
        document.documentElement.className = `theme-mode-${activeMode} theme-color-${activeColor}`;
    }
});
