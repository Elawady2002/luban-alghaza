/* Custom JavaScript Logic for Luban Al-Ghazal Customizations */

(function () {
  // Product Helpers
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

  // Timer Initialization
  let countdownTargetTime = localStorage.getItem('custom_countdown_target');
  if (!countdownTargetTime || parseInt(countdownTargetTime) < Date.now()) {
    countdownTargetTime = Date.now() + 4 * 60 * 60 * 1000 + 15 * 60 * 1000 + 32 * 1000;
    localStorage.setItem('custom_countdown_target', countdownTargetTime.toString());
  }

  function updateTimers() {
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
  }

  // Cycling Badges on Image
  function cycleBadges() {
    document.querySelectorAll('.group').forEach(card => {
      const messages = card._cyclingTexts;
      if (!messages || messages.length <= 1) return;
      card._currentTextIdx = (card._currentTextIdx + 1) % messages.length;
      const badge = card.querySelector('.custom-cycling-badge');
      if (badge) {
        badge.style.opacity = '0';
        setTimeout(() => {
          badge.textContent = messages[card._currentTextIdx];
          badge.style.opacity = '1';
        }, 300);
      }
    });
  }

  // Scroll logic
  function scrollToOffers() {
    const packagesSection = Array.from(document.querySelectorAll('h2')).find(
      h => h.textContent.trim().includes('الباقات') || h.textContent.trim().includes('وفّر')
    );
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Navigation Offers Injection
  function setupNavOffers(nav) {
    if (nav.classList.contains('restructured-nav') || nav.querySelector('.custom-featured-link')) return;

    // 1. Featured Red Link
    const featuredLink = document.createElement('a');
    featuredLink.textContent = 'عروض مميزة';
    featuredLink.href = '#';
    featuredLink.className = 'custom-featured-link hover:text-[#c53030] transition-colors font-bold text-sm mx-2';
    featuredLink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToOffers();
    });
    nav.appendChild(featuredLink);

    // 2. Dropdown 1: القطعة الثانية
    const secondOffer = document.createElement('div');
    secondOffer.className = 'custom-nav-dropdown-trigger text-gray-700 hover:text-brand-primary transition-colors text-sm font-medium mx-2';
    secondOffer.innerHTML = `
      <span>القطعة الثانية</span>
      <div class="custom-nav-dropdown hidden">
        <div class="p-4 w-[280px]">
          <h5 class="font-bold text-brand-primary text-sm mb-1 text-right">عرض القطعة الثانية</h5>
          <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">اشتري قطعة واحصل على الثانية بخصم 20%!</p>
          <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-shop-now-btn">تسوق العرض الآن</button>
        </div>
      </div>
    `;
    secondOffer.querySelector('.custom-shop-now-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      scrollToOffers();
    });
    nav.appendChild(secondOffer);

    // 3. Dropdown 2: العرض الثلاثي
    const tripleOffer = document.createElement('div');
    tripleOffer.className = 'custom-nav-dropdown-trigger text-gray-700 hover:text-brand-primary transition-colors text-sm font-medium mx-2';
    tripleOffer.innerHTML = `
      <span>العرض الثلاثي</span>
      <div class="custom-nav-dropdown hidden">
        <div class="p-4 w-[280px]">
          <h5 class="font-bold text-brand-primary text-sm mb-1 text-right">العرض الثلاثي المميز</h5>
          <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">اشتري قطعتين واحصل على الثالثة بخصم 50%!</p>
          <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-shop-now-btn">تسوق العرض الآن</button>
        </div>
      </div>
    `;
    tripleOffer.querySelector('.custom-shop-now-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      scrollToOffers();
    });
    nav.appendChild(tripleOffer);

    // 4. Dropdown 3: عروض الولاء
    const loyaltyOffer = document.createElement('div');
    loyaltyOffer.className = 'custom-nav-dropdown-trigger text-gray-700 hover:text-brand-primary transition-colors text-sm font-medium mx-2';
    loyaltyOffer.innerHTML = `
      <span>عروض الولاء</span>
      <div class="custom-nav-dropdown hidden">
        <div class="p-4 w-[280px]">
          <h5 class="font-bold text-brand-primary text-sm mb-1.5 text-right">عروض الولاء والحصرية</h5>
          <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">• نقاط مضاعفة: احصل على ضعف النقاط عند الشراء بـ 200 ريال.</p>
          <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-loyalty-details-btn">عرض التفاصيل</button>
        </div>
      </div>
    `;
    loyaltyOffer.querySelector('.custom-loyalty-details-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      alert("عروض الولاء: نقاطك الحالية تمنحك مزايا حصرية وخصومات عند الوصول للمستوى الفضي أو الذهبي!");
    });
    nav.appendChild(loyaltyOffer);

    nav.classList.add('restructured-nav');
  }

  // Restructure Top Bar Slider
  function setupTopbarSlider() {
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
  }

  // Restructure Product Cards
  function setupProductCards() {
    document.querySelectorAll('.group:not(.restructured-card)').forEach(card => {
      try {
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const title = titleEl.textContent.trim();

        // 1. Cycling Badge on image wrapper
        const img = card.querySelector('img');
        if (img && img.parentElement) {
          const imgWrapper = img.parentElement;
          if (window.getComputedStyle(imgWrapper).position === 'static') {
            imgWrapper.style.position = 'relative';
          }
          if (!imgWrapper.querySelector('.custom-cycling-badge-wrapper')) {
            const badgeWrapper = document.createElement('div');
            badgeWrapper.className = 'custom-cycling-badge-wrapper';

            // Find original static discount
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

        // 2. Extras Container (Bundle Badge, Offer Tag, Countdown Timer)
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

        // 3. Price and Stars side-by-side
        const starsDiv = card.querySelector('div[dir="ltr"]');
        const priceDiv = Array.from(card.querySelectorAll('div')).find(
          div => div.textContent.includes('ر.س') && div.classList.contains('font-bold')
        );

        if (starsDiv && priceDiv) {
          let row = card.querySelector('.custom-price-stars-row');
          if (!row) {
            row = document.createElement('div');
            row.className = 'custom-price-stars-row';

            // Insert row where priceDiv originally was, then move both containers inside it
            priceDiv.parentNode.insertBefore(row, priceDiv);
            row.appendChild(priceDiv);
            row.appendChild(starsDiv);
          }
        }

        // 4. Sample Button
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

  // Main Restructuring Orchestrator
  function initRestructuring() {
    // Restructure Top Bar Slider
    setupTopbarSlider();

    // Restructure Navigation Offers (Original Header Nav)
    const header = document.querySelector('header');
    if (header) {
      const nav = header.querySelector('nav');
      if (nav) {
        setupNavOffers(nav);
      }
    }

    // Restructure Cards
    setupProductCards();
  }

  // Mutator and Pollers for SPA React Updates
  const observer = new MutationObserver(() => {
    initRestructuring();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setInterval(initRestructuring, 400);
  setInterval(cycleBadges, 2500);
  setInterval(updateTimers, 1000);

  window.addEventListener('load', () => {
    initRestructuring();
  });
  initRestructuring();
})();
