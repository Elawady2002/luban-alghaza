/* Custom JS implementations for Luban Al-Ghazal Restructuring */

(function () {
  const products = [
    {id: 1, title: "شامبو بخلاصة اللبان (100 مل)", price: 35, image: "/assets/image-9.png", category: "منتجات العناية الشخصية"},
    {id: 2, title: "روتين النعومة بعد الاستحمام", price: 40, image: "/assets/image-21.png", category: "الباقات"},
    {id: 3, title: "اللبان الحوجري للبخور - حب صغير", price: 79, image: "/assets/image-13.png", category: "اللبان الحوجري للبخور"},
    {id: 4, title: "باقة أساسيات الجيم و السفر", price: 99, image: "/assets/image-18.png", category: "الباقات"},
    {id: 5, title: "ماء اللبان العماني", price: 15, image: "/assets/image-20.png", category: "اللبان الحوجري للأكل والشرب"},
    {id: 6, title: "صابون اللبان الحوجري", price: 35, image: "/assets/image-17.png", category: "منتجات العناية الشخصية"},
    {id: 7, title: "شامبو بخلاصة اللبان (300 مل)", price: 59, image: "/assets/image-15.png", category: "منتجات العناية الشخصية"},
    {id: 8, title: "اللبان الحوجري للبخور (ربع-كيلو)", price: 79, image: "/assets/image-13.png", category: "اللبان الحوجري للبخور"},
    {id: 9, title: "سائل إستحمام بخلاصة اللبان (300 مل)", price: 49, image: "/assets/image-10.png", category: "منتجات العناية الشخصية"},
    {id: 10, title: "اللبان الحوجري للعلاج والأكل والشرب", price: 469, image: "/assets/image-11.png", category: "اللبان الحوجري للأكل والشرب"},
    {id: 11, title: "باقة الترطيب الصيفي", price: 65, image: "/assets/image-14.png", category: "الباقات"},
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

  function getProductOffer(title) {
    if (!title) return null;
    const lower = title.toLowerCase();
    if (lower.includes('شامبو') && lower.includes('300')) {
      return 'خصم 20% على العبوة الثانية';
    }
    if (lower.includes('صابون')) {
      return 'اشتر 2 واحصل على 1 مجانا';
    }
    if (lower.includes('شامبو') && lower.includes('100')) {
      return 'خصم 50% على الحبة الثانية';
    }
    if (lower.includes('باقة') || lower.includes('روتين')) {
      return 'خصم إضافي 10% لفترة محدودة';
    }
    if (lower.includes('بخور') || lower.includes('اللبان الحوجري للبخور')) {
      return 'اشتر قطعة واحصل على الثانية بخصم 50%';
    }
    return 'اشتر 2 واحصل على شحن مجاني';
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

  // Cycling badge text on card image (no emojis)
  function startCyclingHashtags() {
    if (window.customHashtagsInterval) return;
    window.customHashtagsInterval = setInterval(() => {
      document.querySelectorAll('.group').forEach(card => {
        const messages = card._cyclingTexts;
        if (!messages || messages.length <= 1) return;
        
        card._currentTextIdx = (card._currentTextIdx + 1) % messages.length;
        const badgeSpan = card.querySelector('.custom-cycling-badge');
        if (badgeSpan) {
          badgeSpan.style.opacity = '0';
          setTimeout(() => {
            badgeSpan.textContent = messages[card._currentTextIdx];
            badgeSpan.style.opacity = '1';
          }, 300);
        }
      });
    }, 2500);
  }

  // Smooth Scroll
  function scrollToOffers() {
    const packagesSection = Array.from(document.querySelectorAll('h2')).find(
      h => h.textContent.trim().includes('الباقات') || h.textContent.trim().includes('وفّر')
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
            <button class="flex items-center gap-1 text-[12px] font-bold text-gray-600 border border-gray-200/80 rounded-full px-2.5 py-1 bg-white transition-colors shadow-sm">
              <span class="custom-country-flag">${savedFlag}</span>
              <span class="custom-country-text">${savedCurrency}</span>
              <svg class="w-3.5 h-3.5 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div class="custom-country-dropdown hidden">
              <div class="custom-country-option ${savedCountry === 'SA' ? 'active' : ''}" data-country="SA" data-currency="SAR" data-flag="🇸🇦" data-name="السعودية">
                <span>🇸🇦</span>
                <span>السعودية (ر.س)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'OM' ? 'active' : ''}" data-country="OM" data-currency="OMR" data-flag="🇴🇲" data-name="عُمان">
                <span>🇴🇲</span>
                <span>عُمان (ر.ع)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'AE' ? 'active' : ''}" data-country="AE" data-currency="AED" data-flag="🇦🇪" data-name="الإمارات">
                <span>🇦🇪</span>
                <span>الإمارات (د.إ)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'KW' ? 'active' : ''}" data-country="KW" data-currency="KWD" data-flag="🇰🇼" data-name="الكويت">
                <span>🇰🇼</span>
                <span>الكويت (د.ك)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'QA' ? 'active' : ''}" data-country="QA" data-currency="QAR" data-flag="🇶🇦" data-name="قطر">
                <span>🇶🇦</span>
                <span>قطر (ر.ق)</span>
              </div>
              <div class="custom-country-option ${savedCountry === 'BH' ? 'active' : ''}" data-country="BH" data-currency="BHD" data-flag="🇧🇭" data-name="البحرين">
                <span>🇧🇭</span>
                <span>البحرين (د.ب)</span>
              </div>
            </div>
          `;
          
          logoWrapper.insertBefore(countrySelector, logoLink.nextSibling);

          const btn = countrySelector.querySelector('button');
          const dropdown = countrySelector.querySelector('.custom-country-dropdown');
          
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
            btn.querySelector('svg').classList.toggle('rotate-180');
          });

          document.addEventListener('click', () => {
            dropdown.classList.add('hidden');
            btn.querySelector('svg').classList.remove('rotate-180');
          });

          const options = countrySelector.querySelectorAll('.custom-country-option');
          options.forEach(opt => {
            opt.addEventListener('click', () => {
              const country = opt.getAttribute('data-country');
              const currency = opt.getAttribute('data-currency');
              const flag = opt.getAttribute('data-flag');
              const name = opt.getAttribute('data-name');

              localStorage.setItem('custom_country', country);
              localStorage.setItem('custom_currency', currency);
              localStorage.setItem('custom_flag', flag);
              localStorage.setItem('custom_name', name);

              btn.querySelector('.custom-country-flag').textContent = flag;
              btn.querySelector('.custom-country-text').textContent = currency;

              options.forEach(o => o.classList.remove('active'));
              opt.classList.add('active');
              dropdown.classList.add('hidden');
              btn.querySelector('svg').classList.remove('rotate-180');
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

          // 1. الرئيسية
          const homeItem = createNavItem('الرئيسية');
          if (homeItem) pagesList.appendChild(homeItem);

          // 2. المنتجات
          const shopItem = createNavItem('المنتجات');
          if (shopItem) pagesList.appendChild(shopItem);

          // 3. اصنع صندوقك
          const boxItem = createNavItem('اصنع صندوقك');
          if (boxItem) pagesList.appendChild(boxItem);

          // 4. تتبع الطلب
          const trackItem = createNavItem('تتبع الطلب');
          if (trackItem) pagesList.appendChild(trackItem);

          // 5. المدونة
          const blogItem = createNavItem('المدونة');
          if (blogItem) pagesList.appendChild(blogItem);

          // 6. تواصل معنا
          const contactItem = createNavItem('تواصل معنا');
          if (contactItem) pagesList.appendChild(contactItem);

          // 7. عروض مميزة (Featured red link)
          const featuredLink = document.createElement('a');
          featuredLink.textContent = 'عروض مميزة';
          featuredLink.href = '#';
          featuredLink.className = 'custom-featured-link transition-colors';
          featuredLink.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToOffers();
          });
          offersList.appendChild(featuredLink);

          // 8. عرض القطعة الثانية
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

          // 9. العرض الثلاثي
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

          // 10. عروض الولاء
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

          const filtered = products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
          if (filtered.length === 0) {
            searchDropdown.innerHTML = '<div class="p-4 text-center text-gray-500 text-sm font-medium">لم يتم العثور على نتائج</div>';
          } else {
            searchDropdown.innerHTML = filtered.map(p => `
              <div class="custom-search-item" data-id="${p.id}">
                <img src="${p.image}" class="custom-search-item-image" />
                <div class="custom-search-item-info">
                  <h4 class="custom-search-item-title">${p.title}</h4>
                  <span class="custom-search-item-category">${p.category}</span>
                </div>
                <span class="custom-search-item-price">${p.price} ر.س</span>
              </div>
            `).join('');

            searchDropdown.querySelectorAll('.custom-search-item').forEach(item => {
              item.addEventListener('click', () => {
                const id = item.getAttribute('data-id');
                searchDropdown.classList.add('hidden');
                searchInput.value = '';
                
                // Simulate React Router SPA click for navigation
                const dummyLink = document.querySelector('header a');
                if (dummyLink) {
                  const originalHref = dummyLink.getAttribute('href');
                  dummyLink.setAttribute('href', `/product/${id}`);
                  dummyLink.click();
                  setTimeout(() => {
                    dummyLink.setAttribute('href', originalHref);
                  }, 50);
                } else {
                  window.location.href = `/product/${id}`;
                }
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
                <span>خصم 15% عند شراء 3 قطع</span>
              </div>
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2.5a.5.5 0 01-.5.5H11.5a.5.5 0 01-.5-.5v-.5h-4v.5a.5.5 0 01-.5.5H5.5a.5.5 0 01-.5-.5v-2.5a1 1 0 011-1h2m8 0h1.5a1.5 1.5 0 011.5 1.5V13M17 16a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </span>
                <span>خصم 25% + شحن مجاني عند شراء 6 قطع</span>
              </div>
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet">
                  <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </span>
                <span>خصم 35% + شحن مجاني عند شراء 12 قطعة</span>
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

    // 3. Restructure Product Cards
    document.querySelectorAll('.group:not(.restructured-card)').forEach(card => {
      try {
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const title = titleEl.textContent.trim();

        // 3.1 Cycling Badge on Image Wrapper (No Emojis)
        const img = card.querySelector('img');
        if (img && img.parentElement) {
          const imgWrapper = img.parentElement;
          if (window.getComputedStyle(imgWrapper).position === 'static') {
            imgWrapper.style.position = 'relative';
          }
          if (!imgWrapper.querySelector('.custom-cycling-badge-wrapper')) {
            const badgeWrapper = document.createElement('div');
            badgeWrapper.className = 'custom-cycling-badge-wrapper';

            // Find original static discount badge
            let discountText = '';
            const origDiscountEl = card.querySelector('.bg-\\[\\#ff4757\\], [class*="bg-[#ff4757]"]');
            if (origDiscountEl) {
              discountText = origDiscountEl.textContent.trim();
            }

            const messages = [];
            if (discountText) {
              messages.push(discountText);
            } else {
              messages.push('خصم مميز');
            }
            messages.push('#بيخلص_بسرعة');
            messages.push('#وصل_حديثا');
            messages.push('#الاقوى_مبيعا');

            card._cyclingTexts = messages;
            card._currentTextIdx = 0;

            badgeWrapper.innerHTML = `
              <span class="custom-cycling-badge" style="transition: opacity 0.3s ease-in-out;">
                ${messages[0]}
              </span>
            `;
            imgWrapper.appendChild(badgeWrapper);
          }
        }

        // 3.2 Extras Container (Bundle Badge, Offer Tag, Countdown Timer)
        let extras = card.querySelector('.custom-card-extras');
        if (!extras) {
          extras = document.createElement('div');
          extras.className = 'custom-card-extras';

          const bundleCount = getBundleCount(title);
          const bundleHtml = bundleCount ? `
            <div class="custom-bundle-badge">
              <span>يحتوي على ${bundleCount} قطع</span>
            </div>
          ` : '';

          const offerText = getProductOffer(title);
          const offerHtml = offerText ? `
            <div class="custom-offer-tag">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag text-[#1f3729]"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.586 8.586a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828z"></path><path d="M7.5 7.5h.01"></path></svg>
              <span class="custom-offer-tag-text">${offerText}</span>
            </div>
          ` : '';

          const timerHtml = `
            <div class="custom-countdown-timer">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span class="custom-countdown-timer-value">00:00:00</span>
            </div>
          `;

          extras.innerHTML = `
            ${bundleHtml}
            <div class="custom-extras-row">
              ${offerHtml ? `<div>${offerHtml}</div>` : ''}
              <div>${timerHtml}</div>
            </div>
          `;

          // Insert below title
          titleEl.parentNode.insertBefore(extras, titleEl.nextSibling);
        }

        // 3.3 Price and Stars side-by-side
        const starsDiv = card.querySelector('div[dir="ltr"]');
        const priceDiv = Array.from(card.querySelectorAll('div')).find(
          div => div.textContent.includes('ر.س') && div.classList.contains('font-bold')
        );

        if (starsDiv && priceDiv) {
          let row = card.querySelector('.custom-price-stars-row');
          if (!row) {
            row = document.createElement('div');
            row.className = 'custom-price-stars-row';

            priceDiv.parentNode.insertBefore(row, priceDiv);
            row.appendChild(priceDiv);
            row.appendChild(starsDiv);
          }
        }

        // 3.4 Sample Button
        const addToCartBtn = Array.from(card.querySelectorAll('button')).find(
          btn => btn.textContent.includes('أضف للسلة') || btn.textContent.includes('أضف إلى السلة') || btn.textContent.includes('نقل للسلة')
        );
        if (addToCartBtn && addToCartBtn.parentElement) {
          const btnContainer = addToCartBtn.parentElement;
          if (!btnContainer.querySelector('.custom-add-sample-btn')) {
            const sampleBtn = document.createElement('button');
            sampleBtn.className = 'custom-add-sample-btn';
            sampleBtn.innerHTML = `<span>أضف عينة بـ 9.00 ر.س</span>`;
            btnContainer.appendChild(sampleBtn);

            sampleBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();

              const textSpan = sampleBtn.querySelector('span');
              textSpan.textContent = 'تم إضافة العينة';
              sampleBtn.classList.add('bg-green-600');

              window.dispatchEvent(new CustomEvent("open-cart"));

              setTimeout(() => {
                textSpan.textContent = 'أضف عينة بـ 9.00 ر.س';
                sampleBtn.classList.remove('bg-green-600');
              }, 1500);
            });
          }
        }

        card.classList.add('restructured-card');
      } catch (err) {
        console.error("Error customizing product card:", err);
      }
    });
  }

  // Monitor DOM modifications for SPA page updates
  const domObserver = new MutationObserver(() => {
    initRestructuring();
  });
  domObserver.observe(document.body, { childList: true, subtree: true });

  // Pollers & Intervals
  setInterval(initRestructuring, 400);
  setInterval(cycleBadges, 2500);
  startCyclingHashtags();
  startCountdownTimer();

  window.addEventListener('load', () => {
    initRestructuring();
  });
  initRestructuring();
})();
