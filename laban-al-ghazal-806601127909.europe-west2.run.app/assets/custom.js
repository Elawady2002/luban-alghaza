/* Custom JS implementations for Luban Al-Ghazal Restructuring - Aligned with Figma */

(function () {
  // 8 Products matching Figma design exactly (titles from Figma data-name, images from Figma code)
  const figmaProducts = [
    {
      id: 1,
      title: "سيروم اللبان المرطب",
      price: 35.00,
      oldPrice: 70.00,
      image: "assets/a91f38300b34a9c71a21a0cc510bfdca6aa3ca48.png",
      ratingsCount: 452,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    },
    {
      id: 2,
      title: "كريم التجديد الطبيعي",
      price: 48.00,
      oldPrice: 96.00,
      image: "assets/1387c02012cb15312a2a646f433eae41e9ee5aef.png",
      ratingsCount: 491,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    },
    {
      id: 3,
      title: "زيت الأرغان الصافي",
      price: 35.00,
      oldPrice: 70.00,
      image: "assets/3d585c3f328b897e7f7aa3e990637e7770034606.png",
      ratingsCount: 197,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    },
    {
      id: 4,
      title: "غسول منعش بالورد",
      price: 35.00,
      oldPrice: 70.00,
      image: "assets/f29bfa41035b6626ee1623802805b47d8f637c46.png",
      ratingsCount: 197,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    },
    {
      id: 5,
      title: "أساس ناعم ومرطب",
      price: 35.00,
      oldPrice: 70.00,
      image: "assets/85b0c42fdd990f088d91a22645c608ffc1f8f219.png",
      ratingsCount: 240,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    },
    {
      id: 6,
      title: "كريم ترطيب مكثف",
      price: 35.00,
      oldPrice: 70.00,
      image: "assets/da665fdd799bbe1dc31a41d234876b85d4acd454.png",
      ratingsCount: 186,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    },
    {
      id: 7,
      title: "خلاصة نباتية للعافية",
      price: 35.00,
      oldPrice: 70.00,
      image: "assets/d252affb401b53a657df88b7067f3d656b6794a5.png",
      ratingsCount: 92,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    },
    {
      id: 8,
      title: "صابون طبيعي باللبان",
      price: 35.00,
      oldPrice: 70.00,
      image: "assets/5149199c5b5b21708ef1322339a11380f6e76874.png",
      ratingsCount: 310,
      badge: "#بيخلص_بسرعة",
      offer: "اشتر 2 واحصل على شحن مجاني",
      stars: 5
    }
  ];

  // Helper Functions for Cards
  function getBundleCount(title) {
    if (!title) return null;
    const lower = title.toLowerCase();
    if (lower.includes('جيم') || lower.includes('سفر')) return 3;
    if (lower.includes('نعومة') || lower.includes('النعومة')) return 2;
    if (lower.includes('ترطيب') || lower.includes('الترطيب')) return 2;
    if (lower.includes('باقة') || lower.includes('روتين') || lower.includes('صندوق') || lower.includes('مجموعة')) return 2;
    return null;
  }

  // Timer target configuration
  let countdownTargetTime = localStorage.getItem('custom_countdown_target');
  if (!countdownTargetTime || parseInt(countdownTargetTime) < Date.now()) {
    countdownTargetTime = Date.now() + 4 * 60 * 60 * 1000 + 15 * 60 * 1000 + 32 * 1000;
    localStorage.setItem('custom_countdown_target', countdownTargetTime.toString());
  }

  function startCountdownTimer() {
    if (window.customCountdownInterval) return;
    window.customCountdownInterval = setInterval(() => {
      const now = Date.now();
      const diff = parseInt(countdownTargetTime) - now;
      if (diff <= 0) {
        const newTarget = Date.now() + 4 * 60 * 60 * 1000;
        localStorage.setItem('custom_countdown_target', newTarget.toString());
        countdownTargetTime = newTarget.toString();
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const hoursStr = String(hours).padStart(2, '0');
      const minutesStr = String(minutes).padStart(2, '0');
      const secondsStr = String(seconds).padStart(2, '0');

      document.querySelectorAll('.custom-countdown-timer-value').forEach(el => {
        el.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
      });
    }, 1000);
  }

  // Smooth Scroll
  function scrollToOffers() {
    const packagesSection = Array.from(document.querySelectorAll('h2')).find(
      h => h.textContent.trim().includes('الأكثر طلباً') || h.textContent.trim().includes('المنتجات')
    );
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Main Restructuring Orchestrator
  function initRestructuring() {
    // 1. Restructure Header
    const header = document.querySelector('header');
    if (header && !header.classList.contains('restructured')) {
      const nav = header.querySelector('nav');
      const headerContainer = header.querySelector('.max-w-7xl');
      const headerRightIcons = header.querySelector('.flex.items-center.gap-4.lg\\:gap-5');

      if (headerContainer && headerRightIcons) {
        // 1.1 Country Selector (next to the logo)
        const logoWrapper = header.querySelector('.flex.items-center.gap-4');
        const logoLink = logoWrapper ? logoWrapper.querySelector('a[href="/"]') : null;
        if (logoLink && !logoWrapper.querySelector('.custom-country-selector')) {
          const countrySelector = document.createElement('div');
          countrySelector.className = 'custom-country-selector hidden lg:block';
          
          const savedCountry = localStorage.getItem('custom_country') || 'SA';
          const savedCurrency = localStorage.getItem('custom_currency') || 'SAR';
          const savedFlag = localStorage.getItem('custom_flag') || '🇸🇦';
          const savedName = localStorage.getItem('custom_name') || 'السعودية';

          countrySelector.innerHTML = `
            <button class="custom-sar-btn">
              <img src="assets/chevron_down.svg" class="custom-sar-chevron" alt="arrow" />
              <span class="custom-sar-text">${savedCurrency}</span>
              <img src="assets/flag_sa.svg" class="custom-sar-flag" alt="${savedName}" />
            </button>
            <div class="custom-country-dropdown hidden">
              <div class="custom-country-option ${savedCountry === 'SA' ? 'active' : ''}" data-country="SA" data-currency="SAR" data-flag-src="assets/flag_sa.svg" data-name="السعودية">
                <img src="assets/flag_sa.svg" width="18" height="14" style="border-radius:3px;" alt="🇸🇦"/>
                <span>السعودية (SAR)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'OM' ? 'active' : ''}" data-country="OM" data-currency="OMR" data-flag-src="" data-name="عُمان">
                <span style="font-size:16px;">🇴🇲</span>
                <span>عُمان (OMR)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'AE' ? 'active' : ''}" data-country="AE" data-currency="AED" data-flag-src="" data-name="الإمارات">
                <span style="font-size:16px;">🇦🇪</span>
                <span>الإمارات (AED)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'KW' ? 'active' : ''}" data-country="KW" data-currency="KWD" data-flag-src="" data-name="الكويت">
                <span style="font-size:16px;">🇰🇼</span>
                <span>الكويت (KWD)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'QA' ? 'active' : ''}" data-country="QA" data-currency="QAR" data-flag-src="" data-name="قطر">
                <span style="font-size:16px;">🇶🇦</span>
                <span>قطر (QAR)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'BH' ? 'active' : ''}" data-country="BH" data-currency="BHD" data-flag-src="" data-name="البحرين">
                <span style="font-size:16px;">🇧🇭</span>
                <span>البحرين (BHD)</span>
              </div>
            </div>
          `;
          
          logoWrapper.insertBefore(countrySelector, logoLink.nextSibling);

          const btn = countrySelector.querySelector('button');
          const dropdown = countrySelector.querySelector('.custom-country-dropdown');
          const chevronImg = btn.querySelector('.custom-sar-chevron');
          
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
            chevronImg.classList.toggle('custom-sar-chevron-open');
          });

          document.addEventListener('click', () => {
            dropdown.classList.add('hidden');
            chevronImg.classList.remove('custom-sar-chevron-open');
          });

          const options = countrySelector.querySelectorAll('.custom-country-option');
          options.forEach(opt => {
            opt.addEventListener('click', () => {
              const country = opt.getAttribute('data-country');
              const currency = opt.getAttribute('data-currency');
              const flagSrc = opt.getAttribute('data-flag-src');
              const name = opt.getAttribute('data-name');

              localStorage.setItem('custom_country', country);
              localStorage.setItem('custom_currency', currency);
              localStorage.setItem('custom_flag', flagSrc || '');
              localStorage.setItem('custom_name', name);

              // Update text
              btn.querySelector('.custom-sar-text').textContent = currency;
              // Update flag img if flagSrc is provided
              const flagImg = btn.querySelector('.custom-sar-flag');
              if (flagSrc) {
                flagImg.src = flagSrc;
                flagImg.alt = name;
                flagImg.style.display = '';
              } else {
                // For countries without SVG flag, show emoji in a span instead
                flagImg.style.display = 'none';
                let emojiEl = btn.querySelector('.custom-sar-flag-emoji');
                if (!emojiEl) {
                  emojiEl = document.createElement('span');
                  emojiEl.className = 'custom-sar-flag-emoji';
                  btn.appendChild(emojiEl);
                }
                const flagEmojis = {OM:'🇴🇲', AE:'🇦🇪', KW:'🇰🇼', QA:'🇶🇦', BH:'🇧🇭'};
                emojiEl.textContent = flagEmojis[country] || '';
              }

              options.forEach(o => o.classList.remove('active'));
              opt.classList.add('active');
              dropdown.classList.add('hidden');
              chevronImg.classList.remove('custom-sar-chevron-open');
            });
          });
        }

        // Create custom search input container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'custom-search-container hidden lg:block';
        searchContainer.innerHTML = `
          <div class="custom-search-input-wrapper">
            <input type="text" placeholder="ابحث عن منتج..." class="custom-search-input" />
            <svg class="custom-search-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <div class="custom-search-dropdown hidden"></div>
          </div>
        `;

        // Hide original search button icon on desktop
        const searchButton = headerRightIcons.querySelector('button');
        if (searchButton) {
          searchButton.classList.add('lg:hidden');
        }

        // Hide original nav inside header on desktop
        if (nav) {
          nav.classList.add('lg:hidden');
        }

        // Insert new search container before icons
        headerContainer.insertBefore(searchContainer, headerRightIcons);

        // Create Sub-navigation bar
        const subNav = document.createElement('div');
        subNav.className = 'sub-navbar hidden lg:block';
        const subNavContainer = document.createElement('div');
        subNavContainer.className = 'max-w-7xl mx-auto px-4 flex justify-between items-center w-full';

        if (nav) {
          const pagesList = document.createElement('div');
          pagesList.className = 'pages-list flex items-center gap-8 text-[15px] font-medium text-gray-600';

          const offersList = document.createElement('div');
          offersList.className = 'offers-list flex items-center gap-8 text-[15px] font-medium text-gray-600';

          const originalLinks = nav.querySelectorAll('a');
          const originalLinksMap = {};
          originalLinks.forEach((link) => {
            const text = link.textContent.trim();
            originalLinksMap[text] = link;
          });

          const createNavItem = (text) => {
            const origLink = originalLinksMap[text];
            if (!origLink) return null;
            const a = document.createElement('a');
            a.textContent = text;
            a.href = origLink.getAttribute('href') || '#';
            a.className = origLink.className.includes('text-gray-900') 
              ? 'text-brand-primary font-bold hover:text-brand-primary transition-colors'
              : 'hover:text-brand-primary transition-colors';
            a.addEventListener('click', (e) => {
              e.preventDefault();
              origLink.click();
            });
            return a;
          };

          // Navigation list links matching Figma
          const homeItem = createNavItem('الرئيسية');
          if (homeItem) pagesList.appendChild(homeItem);

          const shopItem = createNavItem('المنتجات');
          if (shopItem) pagesList.appendChild(shopItem);

          const boxItem = createNavItem('اصنع صندوقك');
          if (boxItem) pagesList.appendChild(boxItem);

          const trackItem = createNavItem('تتبع الطلب');
          if (trackItem) pagesList.appendChild(trackItem);

          const blogItem = createNavItem('المدونة');
          if (blogItem) pagesList.appendChild(blogItem);

          const contactItem = createNavItem('تواصل معنا');
          if (contactItem) pagesList.appendChild(contactItem);

          // Featured links
          const featuredLink = document.createElement('a');
          featuredLink.textContent = 'عروض مميزة';
          featuredLink.href = '#';
          featuredLink.className = 'custom-featured-link transition-colors';
          featuredLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToOffers();
          });
          offersList.appendChild(featuredLink);

          const secondOffer = document.createElement('div');
          secondOffer.className = 'custom-nav-dropdown-trigger cursor-pointer hover:text-brand-primary transition-colors';
          secondOffer.innerHTML = `
            <span>القطعة الثانية</span>
            <div class="custom-nav-dropdown hidden">
              <div class="p-4 w-[290px]">
                <h5 class="font-bold text-brand-primary text-sm mb-1 text-right">عرض القطعة الثانية</h5>
                <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">اشتري قطعة واحصل على الثانية بخصم 20%!</p>
                <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-shop-now-btn">تسوق العرض الآن</button>
              </div>
            </div>
          `;
          secondOffer.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            scrollToOffers();
          });
          offersList.appendChild(secondOffer);

          const tripleOffer = document.createElement('div');
          tripleOffer.className = 'custom-nav-dropdown-trigger cursor-pointer hover:text-brand-primary transition-colors';
          tripleOffer.innerHTML = `
            <span>العرض الثلاثي</span>
            <div class="custom-nav-dropdown hidden">
              <div class="p-4 w-[290px]">
                <h5 class="font-bold text-brand-primary text-sm mb-1 text-right">العرض الثلاثي المميز</h5>
                <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">اشتري قطعتين واحصل على الثالثة بخصم 50%!</p>
                <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-shop-now-btn">تسوق العرض الآن</button>
              </div>
            </div>
          `;
          tripleOffer.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            scrollToOffers();
          });
          offersList.appendChild(tripleOffer);

          const loyaltyOffer = document.createElement('div');
          loyaltyOffer.className = 'custom-nav-dropdown-trigger cursor-pointer hover:text-brand-primary transition-colors';
          loyaltyOffer.innerHTML = `
            <span>عروض الولاء</span>
            <div class="custom-nav-dropdown hidden">
              <div class="p-4 w-[290px]">
                <h5 class="font-bold text-brand-primary text-sm mb-1.5 text-right">عروض الولاء والحصرية</h5>
                <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">• نقاط مضاعفة: احصل على ضعف النقاط عند الشراء بـ 200 ريال.</p>
                <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-loyalty-btn">عرض التفاصيل</button>
              </div>
            </div>
          `;
          loyaltyOffer.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            alert("عروض الولاء: نقاطك الحالية تعطيك مزايا حصرية وخصومات عند الوصول للمستوى الفضي أو الذهبي!");
          });
          offersList.appendChild(loyaltyOffer);

          subNavContainer.appendChild(pagesList);
          subNavContainer.appendChild(offersList);
        }
        subNav.appendChild(subNavContainer);

        // Remove any existing duplicates of subNav first
        const oldSubNav = document.querySelector('.sub-navbar');
        if (oldSubNav) {
          oldSubNav.remove();
        }

        // Insert subNav below header
        header.parentNode.insertBefore(subNav, header.nextSibling);

        // Setup Autocomplete search events
        const searchInput = searchContainer.querySelector('.custom-search-input');
        const searchDropdown = searchContainer.querySelector('.custom-search-dropdown');

        searchInput.addEventListener('input', (e) => {
          const q = e.target.value.trim().toLowerCase();
          if (q.length === 0) {
            searchDropdown.classList.add('hidden');
            return;
          }

          const filtered = figmaProducts.filter(p => p.title.toLowerCase().includes(q));
          if (filtered.length === 0) {
            searchDropdown.innerHTML = '<div class="p-4 text-center text-gray-500 text-sm font-medium">لم يتم العثور على نتائج</div>';
          } else {
            searchDropdown.innerHTML = filtered.map(p => `
              <div class="custom-search-item" data-id="${p.id}">
                <img src="${p.image}" class="custom-search-item-image" />
                <div class="custom-search-item-info">
                  <h4 class="custom-search-item-title">${p.title}</h4>
                  <span class="custom-search-item-category">منتجات العناية بالبشرة</span>
                </div>
                <span class="custom-search-item-price">${p.price} ر.س</span>
              </div>
            `).join('');

            searchDropdown.querySelectorAll('.custom-search-item').forEach(item => {
              item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                searchDropdown.classList.add('hidden');
                searchInput.value = '';
                window.location.href = `/product/${id}`;
              });
            });
          }
          searchDropdown.classList.remove('hidden');
        });

        // Close dropdown clicking outside
        document.addEventListener('click', (e) => {
          if (!searchContainer.contains(e.target)) {
            searchDropdown.classList.add('hidden');
          }
        });

        header.classList.add('restructured');
      }
    }

    // 2. Restructure Top Bar Announcement Slider
    const topBarContainer = document.querySelector('.bg-brand-primary .max-w-7xl');
    if (topBarContainer && !topBarContainer.classList.contains('restructured-topbar')) {
      const phoneContainer = topBarContainer.firstElementChild;
      if (phoneContainer) {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'flex-1 flex items-center justify-center';
        sliderWrapper.innerHTML = `
          <div class="custom-announcement-slider">
            <div class="custom-announcement-track">
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </span>
                <span>خصم 25% + شحن مجاني عند شراء 6 قطع</span>
              </div>
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2.5a.5.5 0 01-.5.5H11.5a.5.5 0 01-.5-.5v-.5h-4v.5a.5.5 0 01-.5.5H5.5a.5.5 0 01-.5-.5v-2.5a1 1 0 011-1h2m8 0h1.5a1.5 1.5 0 011.5 1.5V13M17 16a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </span>
                <span>خصم 35% + شحن مجاني عند شراء 12 قطعة</span>
              </div>
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </span>
                <span class="text-[#bce17a] font-extrabold ml-1">سجل الآن</span>
                <span>سجل واحصل على خصم 20% على طلبك الأول.</span>
              </div>
            </div>
          </div>
        `;
        topBarContainer.replaceChild(sliderWrapper, phoneContainer);
        topBarContainer.classList.add('restructured-topbar');

        if (window.customTopbarInterval) {
          clearInterval(window.customTopbarInterval);
        }
        let currentIndex = 0;
        const track = sliderWrapper.querySelector('.custom-announcement-track');
        const itemsCount = 3;
        
        window.customTopbarInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % itemsCount;
          if (track) {
            track.style.transform = `translateY(-${currentIndex * 20}px)`;
          }
        }, 3000);
      }
    }

    // 3. Restructure Categories Section (تسوق حسب الفئة) - 6 items with Figma PNG icons
    const catHeading = Array.from(document.querySelectorAll('h2')).find(
      h => h.textContent.trim().includes('تسوق حسب الفئة')
    );
    if (catHeading) {
      const catContainer = catHeading.nextElementSibling;
      if (catContainer && !catContainer.classList.contains('restructured-categories')) {
        catContainer.className = 'custom-categories-grid';
        catContainer.innerHTML = `
          <a href="/shop?category=اللبان الحوجري للبخور" class="custom-category-card">
            <img src="assets/da6bc2cfdba7ca87610d8046e00d8cc316277731.png" class="custom-category-img" alt="اللبان الحوجري للبخور" />
            <span class="custom-category-title">اللبان الحوجري للبخور</span>
          </a>
          <a href="/shop?category=اللبان الحوجري المعطر" class="custom-category-card">
            <img src="assets/b6ef5c100d2d0d6323890bfb5befada8c3dea354.png" class="custom-category-img" alt="اللبان الحوجري المعطر" />
            <span class="custom-category-title">اللبان الحوجري المعطر</span>
          </a>
          <a href="/shop?category=لبان حوجري للأكل" class="custom-category-card">
            <img src="assets/50d816aa01e947e379c021c56313fced28936145.png" class="custom-category-img" alt="لبان حوجري للأكل" />
            <span class="custom-category-title">لبان حوجري للأكل</span>
          </a>
          <a href="/shop?category=العناية الشخصية" class="custom-category-card">
            <img src="assets/159e18c7b4bfbf5762adb2154e2c2a3d3b24d244.png" class="custom-category-img" alt="العناية الشخصية" />
            <span class="custom-category-title">العناية الشخصية</span>
          </a>
          <a href="/shop?category=الباقات المميزة" class="custom-category-card">
            <img src="assets/eb63b36c11ea4ffc8ab58155143370ecfbb3a147.png" class="custom-category-img" alt="الباقات المميزة" />
            <span class="custom-category-title">الباقات المميزة</span>
          </a>
          <a href="/shop?category=العروض والخصومات" class="custom-category-card">
            <img src="assets/c79baf2df9cc95de93c0d9eacc95f0ccb284ec04.png" class="custom-category-img" alt="العروض والخصومات" />
            <span class="custom-category-title">العروض والخصومات</span>
          </a>
        `;
        catContainer.classList.add('restructured-categories');
      }
    }

    // 4. Restructure Product Grid to render exactly 8 Figma products
    const prodHeading = Array.from(document.querySelectorAll('h2')).find(
      h => h.textContent.trim().includes('الأكثر طلباً هذا الأسبوع')
    );
    if (prodHeading) {
      const headingWrapper = prodHeading.closest('.flex');
      if (headingWrapper) {
        const prodGrid = headingWrapper.nextElementSibling;
        if (prodGrid && !prodGrid.classList.contains('restructured-grid')) {
          prodGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white md:bg-transparent rounded-2xl md:rounded-none border border-gray-100 md:border-0 overflow-hidden md:overflow-visible';
          
          prodGrid.innerHTML = figmaProducts.map(p => `
            <div class="flex flex-col group bg-white lg:rounded-[20px] pb-4 lg:pb-3 border border-gray-100 lg:hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 p-3 h-full relative restructured-card">
              <div class="absolute top-3 left-3 z-10 pointer-events-none custom-cycling-badge-wrapper">
                <span class="custom-cycling-badge">${p.badge}</span>
              </div>
              <div class="flex flex-col flex-1 gap-4 h-full">
                <a class="block shrink-0 w-full relative aspect-square flex justify-center items-center p-2 rounded-[12px] lg:rounded-2xl bg-gray-50/50 group-hover:bg-brand-light/30 transition-colors" href="/product/${p.id}">
                  <img alt="${p.title}" class="w-[90%] h-[90%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" src="${p.image}">
                  <div class="hidden lg:flex absolute top-2 right-2 flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button class="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-brand-primary hover:bg-brand-light shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
                    </button>
                  </div>
                </a>
                <div class="text-right flex flex-col flex-1 py-1">
                  <a class="block flex-col flex-1 h-full flex mt-0" href="/product/${p.id}">
                    <h3 class="font-bold text-gray-800 text-[14px] md:text-[16px] lg:text-[14px] leading-relaxed lg:leading-snug mb-1 line-clamp-2 group-hover:text-brand-primary transition-colors">${p.title}</h3>
                    
                    <!-- Extras: Bundle/Offer tags and Countdown timer -->
                    <div class="custom-card-extras">
                      <div class="custom-extras-row">
                        <div>
                          <div class="custom-offer-tag">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag text-[#1f3729]"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.586 8.586a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828z"></path><path d="M7.5 7.5h.01"></path></svg>
                            <span class="custom-offer-tag-text">${p.offer}</span>
                          </div>
                        </div>
                        <div>
                          <div class="custom-countdown-timer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            <span class="custom-countdown-timer-value">00:00:00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Prices and Stars side-by-side -->
                    <div class="custom-price-stars-row">
                      <div class="flex items-end gap-1.5 font-bold flex-row-reverse" dir="ltr">
                        <span class="text-[18px] md:text-[20px] lg:text-[16px] text-gray-900 leading-none">${p.price.toFixed(2)}</span>
                        <span class="text-[12px] md:text-[13px] lg:text-[13px] text-gray-900 leading-none mb-[2px]">ر.س</span>
                        <span class="text-[12px] md:text-[13px] text-gray-400 line-through mr-1 font-normal leading-none mb-[2px]">${p.oldPrice.toFixed(2)}</span>
                      </div>
                      <div class="flex items-center gap-1 flex-row-reverse" dir="ltr">
                        ${Array.from({ length: p.stars }).map(() => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star fill-[#dca843] text-[#dca843]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>`).join('')}
                        <span class="text-[11px] md:text-[12px] lg:text-[11px] font-medium text-gray-500 ml-1">(${p.ratingsCount})</span>
                      </div>
                    </div>
                  </a>
                  
                  <!-- Add to Cart and Sample Buttons -->
                  <div class="mt-auto pt-3">
                    <button class="w-full bg-brand-primary hover:bg-brand-secondary text-white text-[14px] font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 custom-add-to-cart-btn" data-id="${p.id}">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                      <span>أضف للسلة</span>
                    </button>
                    <button class="custom-add-sample-btn" data-id="${p.id}">
                      <span>أضف عينة بـ 9.00 ر.س</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('');
          
          prodGrid.classList.add('restructured-grid');
          
          // Wire up event listeners
          prodGrid.querySelectorAll('.custom-add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              const id = btn.getAttribute('data-id');
              const item = figmaProducts.find(p => p.id === parseInt(id));
              if (item) {
                alert(`تم إضافة "${item.title}" إلى السلة!`);
                window.dispatchEvent(new CustomEvent("open-cart"));
              }
            });
          });
          
          prodGrid.querySelectorAll('.custom-add-sample-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              const id = btn.getAttribute('data-id');
              const item = figmaProducts.find(p => p.id === parseInt(id));
              if (item) {
                const textSpan = btn.querySelector('span');
                textSpan.textContent = 'تم إضافة العينة';
                btn.classList.add('bg-green-600');
                
                window.dispatchEvent(new CustomEvent("open-cart"));
                
                setTimeout(() => {
                  textSpan.textContent = 'أضف عينة بـ 9.00 ر.س';
                  btn.classList.remove('bg-green-600');
                }, 1500);
              }
            });
          });
        }
      }
    }
  }

  // Monitor DOM modifications for React state mounts
  const domObserver = new MutationObserver(() => {
    initRestructuring();
  });
  domObserver.observe(document.body, { childList: true, subtree: true });

  // Intervals and countdowns
  setInterval(initRestructuring, 400);
  startCountdownTimer();

  window.addEventListener('load', () => {
    initRestructuring();
  });
  initRestructuring();
})();
