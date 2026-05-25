/* ============================================================
   script.js — Dr. Syed Mujtaba ul Hassan Academic Website
   Professional Academic Theme — Harvard/Stanford style
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== THEME / COLOR MODE SWITCHER ====================
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    // Check saved preference or default to light
    const savedTheme = localStorage.getItem('theme-mode') || 'light';
    setThemeMode(savedTheme);

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            setThemeMode(theme);
        });
    });

    function setThemeMode(mode) {
        // Remove all theme classes
        document.body.classList.remove('theme-dark', 'theme-light', 'theme-color');
        // Add new class
        document.body.classList.add(`theme-${mode}`);
        
        // Update active class on buttons
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Hide particles in light mode for a cleaner look
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            if (mode === 'light') {
                particlesContainer.style.display = 'none';
            } else {
                particlesContainer.style.display = 'block';
                if (particlesContainer.innerHTML === '') {
                    initParticles();
                }
            }
        }
        
        // Save preference
        localStorage.setItem('theme-mode', mode);
    }

    // ==================== PARTICLE SYSTEM ====================
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const size = Math.random() * 3 + 1;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
                particle.style.animationDelay = (Math.random() * 5) + 's';
                particle.style.opacity = Math.random() * 0.3 + 0.1;
                const colors = ['#8C1515', '#D4AF37', '#FF8A65', '#34D399'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particlesContainer.appendChild(particle);
            }
        }
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Add scrolled class to navbar
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ==================== HAMBURGER MENU ====================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== ANIMATED COUNTERS ====================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };
            updateCounter();
        });
        countersAnimated = true;
    }

    // ==================== SCROLL ANIMATIONS (Intersection Observer) ====================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation when about section is in view
                if (entry.target.closest('.about-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==================== PUBLICATION FILTERS ====================
    const filterBtns = document.querySelectorAll('.pub-filter');
    const pubCards = document.querySelectorAll('.pub-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            pubCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==================== AWARDS TAB TOGGLING ====================
    const awardTabBtns = document.querySelectorAll('.award-tab-btn');
    const awardTabContents = document.querySelectorAll('.awards-tab-content');

    awardTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            awardTabBtns.forEach(b => b.classList.remove('active'));
            awardTabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show target content
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ==================== STUDENTS CATEGORY FILTER ====================
    const studentFilterBtns = document.querySelectorAll('.student-filter-btn');
    const studentCards = document.querySelectorAll('.student-card');

    studentFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            studentFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            studentCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==================== RESEARCH CARD HOVER COLOR ====================
    document.querySelectorAll('.research-card').forEach(card => {
        const color = card.getAttribute('data-color');
        const topBar = card.querySelector('.research-card-top');
        if (topBar && color) {
            topBar.style.background = `linear-gradient(90deg, ${color}, transparent)`;
        }
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = color + '55';
            card.style.boxShadow = `0 8px 40px ${color}11, inset 0 1px 0 ${color}22`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(0,0,0,0.06)';
            card.style.boxShadow = 'none';
        });
    });

    // ==================== CONTACT FORM HANDLER ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'var(--clr-cyan)';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }

    // ==================== SCROLL INDICATOR HIDE ON SCROLL ====================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // ==================== TILT EFFECT ON HERO IMAGE ====================
    const heroImageContainer = document.querySelector('.hero-image-container');
    if (heroImageContainer && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
            heroImageContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // ==================== DYNAMIC CLOCK & CALENDAR ====================
    const liveClock = document.getElementById('liveClock');
    const liveDate = document.getElementById('liveDate');
    const miniCalendar = document.getElementById('miniCalendar');
    const hourHand = document.getElementById('hourHand');
    const minHand = document.getElementById('minHand');
    const secHand = document.getElementById('secHand');

    function updateClock() {
        const now = new Date();
        if (liveClock) {
            liveClock.textContent = now.toLocaleTimeString('en-US', { hour12: true });
        }
        
        // Update mechanical hands
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        const secDeg = seconds * 6;
        const minDeg = (minutes * 6) + (seconds * 0.1);
        const hourDeg = ((hours % 12) * 30) + (minutes * 0.5);
        
        if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
        if (minHand) minHand.style.transform = `rotate(${minDeg}deg)`;
        if (secHand) secHand.style.transform = `rotate(${secDeg}deg)`;
    }

    if (liveClock && liveDate) {
        setInterval(updateClock, 1000);
        updateClock();
        
        const now = new Date();
        liveDate.textContent = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    if (miniCalendar) {
        renderCalendar();
    }

    function renderCalendar() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        
        const monthNames = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];
        
        const holidays = {
            "1-5": "Kashmir Day (Feb 5)",
            "2-23": "Pakistan Day (Mar 23)",
            "4-1": "Labor Day (May 1)",
            "7-14": "Independence Day (Aug 14)",
            "10-9": "Iqbal Day (Nov 9)",
            "11-25": "Quaid-e-Azam Day / Christmas (Dec 25)"
        };

        const firstDayIndex = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
        
        let html = `
            <div class="calendar-month-year">${monthNames[month]} ${year}</div>
            <div class="calendar-weekdays">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div class="calendar-days">
        `;
        
        for (let i = 0; i < firstDayIndex; i++) {
            html += `<div class="empty"></div>`;
        }
        
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${month}-${day}`;
            const isToday = day === now.getDate();
            const dayOfWeek = new Date(year, month, day).getDay();
            const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
            
            let classes = [];
            let titleAttr = '';
            
            if (isToday) classes.push('today');
            if (isWeekend) classes.push('weekend');
            if (holidays[dateStr]) {
                classes.push('holiday');
                titleAttr = `title="${holidays[dateStr]}"`;
            }
            
            const classStr = classes.length > 0 ? `class="${classes.join(' ')}"` : '';
            html += `<div ${classStr} ${titleAttr}>${day}</div>`;
        }
        
        html += `</div>`;
        miniCalendar.innerHTML = html;
    }

    // ==================== DYNAMIC MATERIALS SCIENCE FUN FACTS ====================
    const factContent = document.getElementById('factContent');
    const nextFactBtn = document.getElementById('nextFactBtn');
    const factCard = document.getElementById('factCard');

    const scienceFacts = [
        "Topological insulators act as electrical insulators in their interior but conduct electricity perfectly on their surface, completely immune to resistance.",
        "Spider silk super-contracts when exposed to moisture, twisting with enough torsional force to act as a high-performance mechanical actuator.",
        "Twisting bilayer graphene sheets at a precise 'magic angle' (1.1 degrees) alters electron flow and induces instant, zero-resistance superconductivity.",
        "Time crystals represent a phase of matter that exhibits periodic motion in its ground state without absorbing or releasing any external energy.",
        "Kagome metals feature atoms arranged in a Star of David lattice, forcing electrons to flow in a synchronized, exotic 'quantum choreography'.",
        "Nitinol (Nickel-Titanium shape memory alloy) can be bent severely but returns to its exact original pre-deformed shape upon mild heating.",
        "Silica aerogels, known as 'frozen smoke', are 99.8% air, yet can insulate against extreme torch heat and support thousands of times their weight.",
        "Ultrathin sheets of 2D MXenes (titanium carbides) only a few atoms thick can shield sensitive electronics from electromagnetic waves better than thick metals.",
        "Amorphous metals (metallic glasses) lack the ordered crystalline structure of normal metals, making them twice as strong and highly corrosion-resistant."
    ];

    if (factContent) {
        const todayDate = new Date().getDate();
        let currentFactIndex = todayDate % scienceFacts.length;
        factContent.textContent = scienceFacts[currentFactIndex];

        if (nextFactBtn) {
            nextFactBtn.addEventListener('click', () => {
                factContent.style.opacity = 0;
                setTimeout(() => {
                    currentFactIndex = (currentFactIndex + 1) % scienceFacts.length;
                    factContent.textContent = scienceFacts[currentFactIndex];
                    factContent.style.opacity = 1;
                }, 250);
            });
        }

        if (factCard) {
            factCard.addEventListener('mouseenter', () => {
                factCard.style.borderColor = 'var(--clr-pink)';
            });
            factCard.addEventListener('mouseleave', () => {
                factCard.style.borderColor = '';
            });
        }
    }

    // ==================== DYNAMIC YEAR IN FOOTER ====================
    const yearSpans = document.querySelectorAll('.footer-bottom p');
    yearSpans.forEach(p => {
        p.innerHTML = p.innerHTML.replace('2026', new Date().getFullYear());
    });

    // ==================== 3D SPACE JOURNEY GALAXY VIEW ====================
    const btnGalaxyView = document.getElementById('btnGalaxyView');
    const galaxyView = document.getElementById('galaxyView');
    const galaxyBg1 = document.getElementById('galaxyBg1');
    const galaxyBg2 = document.getElementById('galaxyBg2');
    const btnExitGalaxy = document.getElementById('btnExitGalaxy');
    const btnMuteSpace = document.getElementById('btnMuteSpace');
    const radarStops = document.querySelectorAll('.radar-stop');
    const stopScreens = document.querySelectorAll('.terminal-stop-screen');
    const spaceStarfield = document.getElementById('spaceStarfield');
    const radarShip = document.getElementById('radarShip');

    let currentStationIndex = 0;
    const maxStations = 8;
    let spaceMusicContext = null;
    let spaceDroneNodes = [];
    let spaceMusicMuted = true;
    let warpActive = false;
    let starfieldSpeedMultiplier = 1;

    // Coordinate positions of stops on the radar map for the ship to fly to
    const spaceBackgrounds = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920', // Stop 1: Earth Launchpad
        'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1920', // Stop 2: Low Earth Orbit
        'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1920', // Stop 3: Lunar Relay Hub
        'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1920', // Stop 4: Asteroid Belt
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1920', // Stop 5: Deep Space Observatory
        'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=1920', // Stop 6: Phobos Gateway
        'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1920', // Stop 7: Martian Orbit
        'https://images.unsplash.com/photo-1612892483236-42d68a57623d?q=80&w=1920'  // Stop 8: Mars Colony Surface
    ];

    const stopPositions = [
        { bottom: '5%', left: '50%', rotate: '-45deg' },
        { bottom: '18%', left: '34%', rotate: '-60deg' },
        { bottom: '31%', left: '24%', rotate: '-90deg' },
        { bottom: '44%', left: '28%', rotate: '-45deg' },
        { bottom: '57%', left: '42%', rotate: '45deg' },
        { bottom: '70%', left: '58%', rotate: '60deg' },
        { bottom: '83%', left: '72%', rotate: '30deg' },
        { bottom: '95%', left: '80%', rotate: '0deg' }
    ];

    if (btnGalaxyView && galaxyView) {
        btnGalaxyView.addEventListener('click', () => {
            galaxyView.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateActiveStation(0);
            
            if (!spaceMusicMuted) {
                initSpaceSynth();
            }
        });
    }

    if (btnExitGalaxy) {
        btnExitGalaxy.addEventListener('click', () => {
            closeGalaxyView();
        });
    }

    window.exitGalaxyAndScroll = function(targetId) {
        closeGalaxyView();
        setTimeout(() => {
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 150);
    };

    function closeGalaxyView() {
        if (galaxyView) {
            galaxyView.classList.remove('active');
        }
        document.body.style.overflow = '';
        muteSpaceMusic();
        if (btnMuteSpace) {
            btnMuteSpace.innerHTML = '<i class="fas fa-volume-mute"></i> Sound On';
            spaceMusicMuted = true;
        }
    }

    // Dynamic Sound synthesis
    function initSpaceSynth() {
        try {
            if (!spaceMusicContext) {
                spaceMusicContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (spaceMusicContext.state === 'suspended') {
                spaceMusicContext.resume();
            }

            stopSpaceSynth();

            // Low frequency synthesizer drone hum
            const oscRoot = spaceMusicContext.createOscillator();
            const oscHarmonic = spaceMusicContext.createOscillator();
            const filter = spaceMusicContext.createBiquadFilter();
            const lfo = spaceMusicContext.createOscillator();
            const lfoGain = spaceMusicContext.createGain();
            const mainGain = spaceMusicContext.createGain();

            oscRoot.type = 'sawtooth';
            oscRoot.frequency.value = 65.41; // C2

            oscHarmonic.type = 'triangle';
            oscHarmonic.frequency.value = 98.0; // G2 (Harmonic fifth)

            filter.type = 'lowpass';
            filter.frequency.value = 180;
            filter.Q.value = 5;

            lfo.type = 'sine';
            lfo.frequency.value = 0.08; 
            lfoGain.gain.value = 100;

            mainGain.gain.value = 0.28; 

            lfo.connect(lfoGain);
            lfoGain.connect(filter.frequency);

            oscRoot.connect(filter);
            oscHarmonic.connect(filter);
            filter.connect(mainGain);
            mainGain.connect(spaceMusicContext.destination);

            lfo.start();
            oscRoot.start();
            oscHarmonic.start();

            spaceDroneNodes = [oscRoot, oscHarmonic, lfo];
        } catch (e) {
            console.error("Web Audio API not allowed or blocked: ", e);
        }
    }

    function stopSpaceSynth() {
        spaceDroneNodes.forEach(node => {
            try {
                node.stop();
            } catch (e) {}
        });
        spaceDroneNodes = [];
    }

    function muteSpaceMusic() {
        stopSpaceSynth();
    }

    if (btnMuteSpace) {
        btnMuteSpace.addEventListener('click', () => {
            if (spaceMusicMuted) {
                spaceMusicMuted = false;
                initSpaceSynth();
                btnMuteSpace.innerHTML = '<i class="fas fa-volume-up"></i> Sound Off';
            } else {
                spaceMusicMuted = true;
                muteSpaceMusic();
                btnMuteSpace.innerHTML = '<i class="fas fa-volume-mute"></i> Sound On';
            }
        });
    }
    function updateActiveStation(index) {
        if (index < 0 || index >= maxStations) return;
        currentStationIndex = index;

        // Change background image of the galaxy view dynamically with morph transition
        if (galaxyBg1 && galaxyBg2 && spaceBackgrounds[index]) {
            const nextImg = spaceBackgrounds[index];
            const isBg1Active = galaxyBg1.classList.contains('active');
            const activeBg = isBg1Active ? galaxyBg1 : galaxyBg2;
            const inactiveBg = isBg1Active ? galaxyBg2 : galaxyBg1;

            inactiveBg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75)), url('${nextImg}')`;
            inactiveBg.classList.add('active');
            activeBg.classList.remove('active');
        }

        // Trigger Warp Trail effect
        warpActive = true;
        starfieldSpeedMultiplier = 6.5; 
        setTimeout(() => {
            warpActive = false;
        }, 850);

        // Move ship icon
        if (radarShip) {
            radarShip.style.bottom = stopPositions[index].bottom;
            radarShip.style.left = stopPositions[index].left;
            radarShip.style.transform = `translate(-50%, -50%) rotate(${stopPositions[index].rotate})`;
        }

        // Highlight map nodes
        radarStops.forEach((stop, idx) => {
            if (idx === index) {
                stop.classList.add('active');
            } else {
                stop.classList.remove('active');
            }
        });

        // Toggle text screens
        stopScreens.forEach((screen, idx) => {
            if (idx === index) {
                screen.classList.add('active');
            } else {
                screen.classList.remove('active');
            }
        });
    }

    radarStops.forEach(stop => {
        stop.addEventListener('click', () => {
            const targetIndex = parseInt(stop.getAttribute('data-index'));
            updateActiveStation(targetIndex);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (!galaxyView || !galaxyView.classList.contains('active')) return;
        
        if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (currentStationIndex < maxStations - 1) {
                updateActiveStation(currentStationIndex + 1);
            }
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentStationIndex > 0) {
                updateActiveStation(currentStationIndex - 1);
            }
        }
    });

    let lastWheelTime = 0;
    if (galaxyView) {
        galaxyView.addEventListener('wheel', (e) => {
            e.preventDefault();
            const now = Date.now();
            if (now - lastWheelTime < 600) return; 
            lastWheelTime = now;

            if (e.deltaY > 0) {
                if (currentStationIndex < maxStations - 1) {
                    updateActiveStation(currentStationIndex + 1);
                }
            } else {
                if (currentStationIndex > 0) {
                    updateActiveStation(currentStationIndex - 1);
                }
            }
        }, { passive: false });
    }

});
