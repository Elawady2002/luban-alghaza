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

  const customCareProducts = [
    {
      title: "شامبو بخلاصة اللبان (100 مل)",
      price: "35.00",
      oldPrice: "70.00",
      discount: "50% off",
      img: "/assets/image-9.png",
      href: "/product/1",
      origHref: "/product/1"
    },
    {
      title: "صابون اللبان الحوجري",
      price: "35.00",
      oldPrice: "60.00",
      discount: "40% off",
      img: "/assets/image-17.png",
      href: "/product/6",
      origHref: "/product/6"
    },
    {
      title: "شامبو بخلاصة اللبان (300 مل)",
      price: "59.00",
      oldPrice: null,
      discount: null,
      img: "/assets/image-15.png",
      href: "/product/8",
      origHref: "/product/8"
    },
    {
      title: "سائل إستحمام بخلاصة اللبان (300 مل)",
      price: "49.00",
      oldPrice: null,
      discount: null,
      img: "/assets/image-10.png",
      href: "/product/14",
      origHref: "/product/14"
    }
  ];

  const customFoodProducts = [
    {
      title: "ماء اللبان العماني",
      price: "15.00",
      oldPrice: null,
      discount: null,
      img: "/assets/image-20.png",
      href: "/product/3",
      origHref: "/product/3"
    },
    {
      title: "اللبان الحوجري للعلاج والأكل والشرب",
      price: "469.00",
      oldPrice: null,
      discount: null,
      img: "/assets/image-11.png",
      href: "/product/13",
      origHref: "/product/13"
    }
  ];

  function startCyclingHashtags() {
    if (window.customHashtagsInterval) return;
    window.customHashtagsInterval = setInterval(() => {
      document.querySelectorAll('.group').forEach(card => {
        const messages = card._cyclingTexts;
        if (!messages || messages.length <= 1) return;
        
        card._currentTextIdx = (card._currentTextIdx + 1) % messages.length;
        const badgeSpan = card.querySelector('.custom-cycling-red-badge span');
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
      return 'اشتر 2 واحصل على 1 مجاناً';
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

  function renderProductCard(p) {
    const oldPriceHtml = p.oldPrice ? `
      <span class="text-[12px] md:text-[13px] text-gray-400 line-through mr-1 font-normal leading-none mb-[2px]">${p.oldPrice}</span>
    ` : '';

    // Fixed ratings and counts for visual consistency and premium look
    let rating, count;
    if (p.href.includes('product/1')) { rating = '4.8'; count = '226'; }
    else if (p.href.includes('product/6')) { rating = '4.9'; count = '555'; }
    else if (p.href.includes('product/8')) { rating = '4.7'; count = '148'; }
    else if (p.href.includes('product/14')) { rating = '4.8'; count = '312'; }
    else if (p.href.includes('product/3')) { rating = '4.9'; count = '589'; }
    else { rating = '4.8'; count = '412'; }

    const starsHtml = `
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star fill-[#dca843] text-[#dca843]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star fill-[#dca843] text-[#dca843]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star fill-[#dca843] text-[#dca843]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star fill-[#dca843] text-[#dca843]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star fill-[#dca843] text-[#dca843]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
    `;

    return `
      <div class="flex flex-col group bg-white lg:rounded-[20px] pb-4 lg:pb-3 border-b lg:border border-gray-200 lg:border-gray-100 last:border-b-0 lg:hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 p-3 lg:p-3 h-full relative" data-orig-href="${p.origHref}" data-discount="${p.discount || ''}">
        <div class="flex flex-row lg:flex-col flex-1 gap-4 lg:gap-0 h-full">
          <a class="block shrink-0 w-[135px] md:w-[180px] lg:w-full lg:pt-4 relative min-h-[135px] custom-product-detail-link" href="${p.href}">
            <div class="relative h-[135px] md:h-[180px] lg:h-auto aspect-square lg:mb-4 flex justify-center items-center p-2 rounded-[12px] lg:rounded-2xl bg-gray-50/50 group-hover:bg-brand-light/30 transition-colors w-full">
              <img alt="${p.title}" class="w-[90%] h-[90%] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" src="${p.img}">
            </div>
          </a>
          <div class="text-right lg:text-center flex flex-col flex-1 py-1">
            <a class="block flex-col flex-1 h-full flex mt-0 custom-product-detail-link" href="${p.href}">
              <h3 class="font-bold text-gray-800 text-[14px] md:text-[16px] lg:text-[14px] leading-relaxed lg:leading-snug mb-1 lg:mb-2 line-clamp-2 min-h-0 lg:min-h-[40px] group-hover:text-brand-primary transition-colors">${p.title}</h3>
              <div class="flex items-center justify-start lg:justify-center gap-1 mb-1.5 lg:mb-3 flex-row-reverse w-fit lg:w-full" dir="ltr">
                ${starsHtml}
                <span class="text-[11px] md:text-[12px] lg:text-[11px] font-medium text-gray-500 ml-1">(${count})</span>
              </div>
              
              <!-- Injected components -->
              <div class="custom-card-extras">
                ${(getBundleCount(p.title) ? `
                  <div class="custom-bundle-badge">
                    <span>📦 يحتوي على ${getBundleCount(p.title)} قطع</span>
                  </div>
                ` : '')}
                
                ${(getProductOffer(p.title) ? `
                  <div class="custom-offer-tag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag text-[#1f3729]"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.586 8.586a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828z"></path><path d="M7.5 7.5h.01"></path></svg>
                    <span class="custom-offer-tag-text">${getProductOffer(p.title)}</span>
                  </div>
                ` : '')}

                <div class="custom-countdown-timer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span class="custom-countdown-timer-value">00:00:00</span>
                </div>
              </div>
 
               <p class="text-[11px] md:text-[12px] text-gray-500 lg:hidden mb-2">تم شراء 100+ سلعة مؤخراً</p>.172a2 2 0 0 0 0-2.828z"></path><path d="M7.5 7.5h.01"></path></svg>
                      <span class="custom-offer-tag-text">${getProductOffer(p.title)}</span>
                    </div>
                  ` : '')}

                  <div class="custom-countdown-timer flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span class="custom-countdown-timer-value">00:00:00</span>
                  </div>
                </div>
              </div>

              <p class="text-[11px] md:text-[12px] text-gray-500 lg:hidden mb-2">تم شراء 100+ سلعة مؤخراً</p>
              <div class="flex items-end justify-start lg:justify-center gap-1.5 mb-1.5 font-bold flex-row-reverse mt-auto lg:mt-auto w-fit lg:w-full" dir="ltr">
                <span class="text-[18px] md:text-[20px] lg:text-[16px] text-gray-900 leading-none">${p.price}</span>
                <span class="text-[12px] md:text-[13px] lg:text-[13px] text-gray-900 leading-none mb-[2px]">ر.س</span>
                ${oldPriceHtml}
              </div>
              <p class="text-[11px] md:text-[12px] text-gray-700 lg:hidden mt-2">توصيل مجاني <span class="font-bold whitespace-nowrap">غداً</span></p>
            </a>
            <div class="mt-auto pt-3 hidden lg:block">
              <button class="w-full bg-brand-primary hover:bg-brand-secondary text-white text-[14px] font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 custom-add-to-cart-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
                <span>أضف للسلة</span>
              </button>
              <button class="w-full border border-[#1f3729] text-[#1f3729] hover:bg-[#1f3729]/5 text-[14px] font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 custom-add-sample-btn">
                <span>أضف عيّنة بـ 9.00 ر.س</span>
                <span>🧪</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderCustomSection(title, productsList) {
    const cardsHtml = productsList.map(p => renderProductCard(p)).join('');
    return `
      <div class="max-w-[1280px] mx-auto px-4">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl md:text-3xl font-serif font-bold text-gray-900">${title}</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-6 lg:gap-y-12 bg-white md:bg-transparent rounded-2xl md:rounded-none border border-gray-100 md:border-0 overflow-hidden md:overflow-visible">
          ${cardsHtml}
        </div>
      </div>
    `;
  }

  function bindCustomSectionEvents(sectionContainer) {
    sectionContainer.querySelectorAll('.custom-add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('[data-orig-href]');
        if (!card) return;
        const origHref = card.getAttribute('data-orig-href');
        
        const originalCards = Array.from(document.querySelectorAll('section:not(.custom-section-care):not(.custom-section-food) a[href="' + origHref + '"]'));
        const originalCard = originalCards.find(a => a.closest('.group'));
        if (originalCard) {
          const originalBtn = originalCard.closest('.group').querySelector('button');
          if (originalBtn) {
            originalBtn.click();
            const btnSpan = btn.querySelector('span');
            const originalText = btnSpan.textContent;
            btnSpan.textContent = 'تم الإضافة ✓';
            btn.classList.add('bg-green-600');
            setTimeout(() => {
              btnSpan.textContent = originalText;
              btn.classList.remove('bg-green-600');
            }, 1500);
          }
        } else {
          window.location.href = origHref;
        }
      });
    });

    sectionContainer.querySelectorAll('.custom-add-sample-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        const btnSpan = btn.querySelector('span');
        const originalText = btnSpan.textContent;
        btnSpan.textContent = 'تم إضافة العينة ✓';
        btn.classList.remove('text-[#1f3729]', 'border-[#1f3729]');
        btn.classList.add('bg-green-600', 'text-white', 'border-green-600');
        
        window.dispatchEvent(new CustomEvent("open-cart"));
        
        setTimeout(() => {
          btnSpan.textContent = originalText;
          btn.classList.add('text-[#1f3729]', 'border-[#1f3729]');
          btn.classList.remove('bg-green-600', 'text-white', 'border-green-600');
        }, 1500);
      });
    });

    sectionContainer.querySelectorAll('.custom-product-detail-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = link.closest('[data-orig-href]');
        if (!card) return;
        const origHref = card.getAttribute('data-orig-href');
        
        const dummyLink = document.querySelector('header a');
        if (dummyLink) {
          const originalHref = dummyLink.getAttribute('href');
          dummyLink.setAttribute('href', origHref);
          dummyLink.click();
          setTimeout(() => {
            dummyLink.setAttribute('href', originalHref);
          }, 50);
        } else {
          window.location.href = origHref;
        }
      });
    });
  }

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

        // Hide search button icon on desktop
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
            const promo = document.querySelector('section').nextElementSibling;
            if (promo) {
              promo.scrollIntoView({ behavior: 'smooth' });
            }
          });
          offersList.appendChild(featuredLink);

          // 8. عرض القطعة الثانية
          const secondOffer = document.createElement('div');
          secondOffer.className = 'custom-nav-dropdown-trigger cursor-pointer hover:text-brand-primary transition-colors';
          secondOffer.innerHTML = `
            <span>القطعة الثانية</span>
            <div class="custom-nav-dropdown hidden">
              <div class="p-4 w-[290px]">
                <h5 class="font-bold text-brand-primary text-sm mb-1 text-right">عرض القطعة الثانية 🎁</h5>
                <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">اشتري قطعة واحصل على الثانية بخصم 20%!</p>
                <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-shop-now-btn">تسوق العرض الآن</button>
              </div>
            </div>
          `;
          secondOffer.querySelector('button').addEventListener('click', () => {
            const promo = document.querySelector('section').nextElementSibling;
            if (promo) promo.scrollIntoView({ behavior: 'smooth' });
          });
          offersList.appendChild(secondOffer);

          // 9. العرض الثلاثي
          const tripleOffer = document.createElement('div');
          tripleOffer.className = 'custom-nav-dropdown-trigger cursor-pointer hover:text-brand-primary transition-colors';
          tripleOffer.innerHTML = `
            <span>العرض الثلاثي</span>
            <div class="custom-nav-dropdown hidden">
              <div class="p-4 w-[290px]">
                <h5 class="font-bold text-brand-primary text-sm mb-1 text-right">العرض الثلاثي 🌟</h5>
                <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">اشتري 2 واحصل على الثالث بخصم 50%!</p>
                <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-shop-now-btn">تسوق العرض الآن</button>
              </div>
            </div>
          `;
          tripleOffer.querySelector('button').addEventListener('click', () => {
            const promo = document.querySelector('section').nextElementSibling;
            if (promo) promo.scrollIntoView({ behavior: 'smooth' });
          });
          offersList.appendChild(tripleOffer);

          // 10. عروض الولاء
          const loyaltyOffer = document.createElement('div');
          loyaltyOffer.className = 'custom-nav-dropdown-trigger cursor-pointer hover:text-brand-primary transition-colors';
          loyaltyOffer.innerHTML = `
            <span>عروض الولاء</span>
            <div class="custom-nav-dropdown hidden">
              <div class="p-4 w-[290px]">
                <h5 class="font-bold text-brand-primary text-sm mb-1.5 text-right">عروض الولاء والحصرية (Status & Loyalty) 💎</h5>
                <p class="text-xs text-gray-600 leading-relaxed mb-3 text-right">• نقاط مضاعفة: احصل على ضعف النقاط عند الشراء بـ 200 ريال.</p>
                <button class="w-full py-1.5 bg-brand-primary text-white text-xs font-bold rounded-lg hover:bg-brand-secondary transition-colors custom-shop-now-btn">عرض التفاصيل</button>
              </div>
            </div>
          `;
          loyaltyOffer.querySelector('button').addEventListener('click', () => {
            alert("عروض الولاء: نقاطك الحالية تعطيك مزايا حصرية وخصومات عند الوصول للمستوى الفضي أو الذهبي!");
          });
          offersList.appendChild(loyaltyOffer);

          subNavContainer.appendChild(pagesList);
          subNavContainer.appendChild(offersList);
        }
        subNav.appendChild(subNavContainer);

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


    // 3. Restructure Top Bar Announcement Slider
    const topBarContainer = document.querySelector('.bg-brand-primary .max-w-7xl');
    if (topBarContainer && !topBarContainer.classList.contains('restructured-topbar')) {
      const phoneContainer = topBarContainer.firstElementChild;
      if (phoneContainer) {
        const sliderWrapper = document.createElement('div');
        sliderWrapper.className = 'flex-1 flex items-center';
        sliderWrapper.innerHTML = `
          <div class="custom-announcement-slider">
            <div class="custom-announcement-track">
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </span>
                <span>خصم 15% عند شراء 3 قطع</span>
              </div>
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011 1v2.5a.5.5 0 01-.5.5H11.5a.5.5 0 01-.5-.5v-.5h-4v.5a.5.5 0 01-.5.5H5.5a.5.5 0 01-.5-.5v-2.5a1 1 0 011-1h2m8 0h1.5a1.5 1.5 0 011.5 1.5V13M17 16a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </span>
                <span>خصم 25% + شحن مجاني عند شراء 6 قطع</span>
              </div>
              <div class="custom-announcement-item">
                <span class="custom-announcement-bullet flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
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

    // 4. Restructure Trust Bar
    const banner = document.querySelector('section');
    if (banner && !document.querySelector('.custom-trust-bar')) {
      const promoBar = banner.nextElementSibling;
      if (promoBar) {
        const trustBar = document.createElement('div');
        trustBar.className = 'custom-trust-bar max-w-[1400px] mx-auto px-4';
        trustBar.innerHTML = `
          <div class="custom-trust-container flex flex-col lg:flex-row items-center gap-8 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <!-- Right side: Title & Description -->
            <div class="custom-trust-info flex-1 text-right">
              <div class="flex items-center gap-2 mb-2 justify-start" dir="rtl">
                <span class="text-brand-primary flex items-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </span>
                <h4 class="text-lg font-extrabold text-brand-primary">ضمان الجودة من لبان الغزال</h4>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed text-right">
                جودة يمكنك الوثوق بها. جميع منتجاتنا طبيعية 100% ومستخرجة مباشرة من أشجار اللبان الحوجري في عُمان، ومحضرة وفق أعلى معايير النقاء والتعبئة لضمان احتفاظها بخصائصها العلاجية والجمالية.
              </p>
            </div>
            
            <!-- Left side: 4 Badges Grid -->
            <div class="custom-trust-badges flex-[2] grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <div class="custom-trust-card bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div class="custom-icon-wrapper">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h5 class="font-bold text-gray-900 text-sm mb-1">منتجات أصيلة</h5>
                <span class="text-xs text-gray-500">حوجري عماني 100%</span>
              </div>
              <div class="custom-trust-card bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div class="custom-icon-wrapper">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6m-3 0v4m-3.5 12h7a1.5 1.5 0 001.5-1.5v-6.5a1.5 1.5 0 00-.44-1.06L13.5 7.94V5h-3v2.94L7.94 9.94A1.5 1.5 0 007.5 11v6.5A1.5 1.5 0 009 19z" />
                  </svg>
                </div>
                <h5 class="font-bold text-gray-900 text-sm mb-1">مكونات نقية</h5>
                <span class="text-xs text-gray-500">مختبرة وخالية من الإضافات</span>
              </div>
              <div class="custom-trust-card bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div class="custom-icon-wrapper">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                  </svg>
                </div>
                <h5 class="font-bold text-gray-900 text-sm mb-1">حفظ احترافي</h5>
                <span class="text-xs text-gray-500">عبوات تحمي الخواص الطبيعية</span>
              </div>
              <div class="custom-trust-card bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div class="custom-icon-wrapper">
                  <svg class="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                </div>
                <h5 class="font-bold text-gray-900 text-sm mb-1">مرونة التعويض</h5>
                <span class="text-xs text-gray-500">سياسة استرجاع سهلة ومريحة</span>
              </div>
            </div>
          </div>
        `;
        promoBar.parentNode.insertBefore(trustBar, promoBar.nextSibling);
      }
    }

    // 5. Restructure Categories Section (Shop by Category)
    const categoryHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.trim() === 'تسوق حسب الفئة');
    if (categoryHeading && !document.querySelector('.custom-categories-grid')) {
      const originalGrid = categoryHeading.nextElementSibling;
      if (originalGrid && !originalGrid.classList.contains('custom-categories-grid')) {
        // Hide original grid
        originalGrid.style.display = 'none';
        
        // Find original links for mapping click state filters
        const origLinks = Array.from(originalGrid.querySelectorAll('a'));
        const origLinksMap = {};
        origLinks.forEach(link => {
          const name = link.textContent.trim();
          origLinksMap[name] = link;
        });

        // Create the custom 6 columns categories container
        const customGrid = document.createElement('div');
        customGrid.className = 'custom-categories-grid flex flex-row overflow-x-auto hide-scrollbar gap-3 lg:grid lg:gap-4 -mx-4 px-4 lg:mx-0 lg:px-0 pb-2 lg:pb-0 w-full';
        
        const categoriesData = [
          {
            name: "اللبان الحوجري للبخور",
            origName: "اللبان الحوجري للبخور",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z"/></svg>`
          },
          {
            name: "اللبان الحوجري المعطر",
            origName: "اللبان الحوجري المعطر",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flower2 w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]"><path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/></svg>`
          },
          {
            name: "لبان حوجري للأكل",
            origName: "اللبان الحوجري للأكل والشرب",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-leaf w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 5.5a7 7 0 0 1-7 7h-3"/><path d="M19 9H7a4 4 0 0 0-4 4v2"/></svg>`
          },
          {
            name: "العناية الشخصية",
            origName: "منتجات العناية الشخصية بخلاصة اللبان",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-droplet w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`
          },
          {
            name: "الباقات المميزة",
            origName: "باقات اللبان المميزة",
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>`
          },
          {
            name: "العروض والخصومات",
            origName: null,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag w-[20px] h-[20px] lg:w-[28px] lg:h-[28px]"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.586 8.586a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828z"/><path d="M7.5 7.5h.01"/></svg>`
          }
        ];

        customGrid.innerHTML = categoriesData.map(cat => `
          <a href="#" class="flex flex-row lg:flex-col items-center lg:justify-center px-5 py-2 lg:p-6 border border-gray-100 rounded-full lg:rounded-xl hover:border-brand-secondary hover:shadow-md transition-all group bg-white shrink-0 h-[48px] lg:h-auto">
            <div class="flex items-center justify-center text-brand-secondary ml-2.5 lg:ml-0 lg:mb-3 group-hover:scale-110 transition-transform">
              ${cat.icon}
            </div>
            <span class="text-[14px] lg:text-sm font-medium text-gray-700 text-center lg:px-2 leading-relaxed whitespace-nowrap lg:whitespace-normal">${cat.name}</span>
          </a>
        `).join('');

        // Map clicks to the hidden React list anchors
        customGrid.querySelectorAll('a').forEach((a, index) => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = categoriesData[index];
            if (cat.origName) {
              const origLink = origLinksMap[cat.origName];
              if (origLink) origLink.click();
            } else {
              // Offers category clicks -> scroll to promotions
              const promo = document.querySelector('section').nextElementSibling;
              if (promo) promo.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });

        originalGrid.parentNode.insertBefore(customGrid, originalGrid.nextSibling);
      }
    }

    // 6. Restructure Homepage Layout & Sections
    const categoryHeadingSection = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.trim() === 'تسوق حسب الفئة')?.closest('section');
    if (categoryHeadingSection) {
      const sectionsParent = categoryHeadingSection.closest('.flex-grow');
      if (sectionsParent) {
        // Find existing sections
        const heroSection = sectionsParent.querySelector('section:first-of-type');
        const promoBar = Array.from(sectionsParent.children).find(c => c.textContent.includes('مشتريات أكثر = توفير أكبر') && c.tagName === 'DIV');
        const trustBar = sectionsParent.querySelector('.custom-trust-bar');
        const categoriesSection = categoryHeadingSection;
        const mostRequestedSection = Array.from(sectionsParent.querySelectorAll('section')).find(s => s.querySelector('h2')?.textContent?.trim()?.includes('الأكثر طلباً'));
        const packagesSection = Array.from(sectionsParent.querySelectorAll('section')).find(s => s.querySelector('h2')?.textContent?.trim()?.includes('الباقات') || s.querySelector('h2')?.textContent?.trim()?.includes('وفّر أكثر'));
        const reviewsSection = Array.from(sectionsParent.querySelectorAll('section')).find(s => s.querySelector('h2')?.textContent?.trim()?.includes('آراء') || s.querySelector('h2')?.textContent?.trim()?.includes('شهادات'));
        const faqSection = Array.from(sectionsParent.querySelectorAll('section')).find(s => s.querySelector('h2')?.textContent?.trim()?.includes('الأسئلة الشائعة'));
        const footerBadgesSection = Array.from(sectionsParent.querySelectorAll('section')).find(s => s.querySelector('h3')?.textContent?.trim()?.includes('توصيل خلال'));

        // 6.1 Create Banner 1 (between الأكثر طلباً and الباقات)
        let banner1 = sectionsParent.querySelector('.custom-banner-divider-1');
        if (!banner1) {
          banner1 = document.createElement('div');
          banner1.className = 'custom-banner-divider-1 custom-home-banner-wrapper';
          banner1.innerHTML = `
            <a href="#" class="custom-home-banner-link">
              <img src="/assets/banner4.png" alt="عروض باقات لبان الغزال" class="custom-home-banner-img" />
            </a>
          `;
          banner1.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            if (packagesSection) packagesSection.scrollIntoView({ behavior: 'smooth' });
          });
        }

        // 6.2 Create Section 3: منتجات العناية الشخصية
        let careSection = sectionsParent.querySelector('.custom-section-care');
        if (!careSection) {
          careSection = document.createElement('section');
          careSection.className = 'custom-section-care py-12 relative bg-transparent';
          careSection.innerHTML = renderCustomSection("منتجات العناية الشخصية بخلاصة اللبان", customCareProducts);
          bindCustomSectionEvents(careSection);
        }

        // 6.3 Create Banner 2 (between العناية الشخصية and الأكل والشرب)
        let banner2 = sectionsParent.querySelector('.custom-banner-divider-2');
        if (!banner2) {
          banner2 = document.createElement('div');
          banner2.className = 'custom-banner-divider-2 custom-home-banner-wrapper';
          banner2.innerHTML = `
            <a href="#" class="custom-home-banner-link">
              <img src="/assets/image-8.png" alt="لبان حوجري أصلي للأكل" class="custom-home-banner-img" />
            </a>
          `;
          banner2.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            const foodSec = document.querySelector('.custom-section-food');
            if (foodSec) foodSec.scrollIntoView({ behavior: 'smooth' });
          });
        }

        // 6.4 Create Section 4: اللبان الحوجري للاكل والشرب
        let foodSection = sectionsParent.querySelector('.custom-section-food');
        if (!foodSection) {
          foodSection = document.createElement('section');
          foodSection.className = 'custom-section-food py-12 relative bg-transparent';
          foodSection.innerHTML = renderCustomSection("اللبان الحوجري للأكل والشرب", customFoodProducts);
          bindCustomSectionEvents(foodSection);
        }

        // 6.5 Reorder DOM Elements if needed
        const desiredChildren = [
          heroSection,
          promoBar,
          trustBar,
          categoriesSection,
          mostRequestedSection,
          banner1,
          packagesSection,
          careSection,
          banner2,
          foodSection,
          reviewsSection,
          faqSection,
          footerBadgesSection
        ].filter(Boolean);

        const currentChildren = Array.from(sectionsParent.children);
        let needsReorder = false;
        let desiredIdx = 0;
        for (let i = 0; i < currentChildren.length; i++) {
          const currentChild = currentChildren[i];
          if (desiredChildren.includes(currentChild)) {
            if (desiredChildren[desiredIdx] !== currentChild) {
              needsReorder = true;
              break;
            }
            desiredIdx++;
          }
        }

        if (needsReorder) {
          desiredChildren.forEach(child => {
            sectionsParent.appendChild(child);
          });
        }
      }
    }

    // 7. Inject modifications and sample buttons into original React product cards
    document.querySelectorAll('.group').forEach(card => {
      try {
        // Find the card title
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const title = titleEl.textContent.trim();
        
        // 7.1 Inject Cycling Red Badge in Image Wrapper
        let discountText = card.getAttribute('data-discount');
        if (!discountText) {
          const discountEl = card.querySelector('.bg-\\[\\#ff4757\\], [class*="bg-[#ff4757]"], .absolute.top-1.left-1, .absolute.top-3.left-0');
          if (discountEl) {
            discountText = discountEl.textContent.trim();
            discountEl.style.display = 'none'; // Hide original static discount badge
          }
        }

        if (!card._cyclingTexts) {
          const messages = [];
          if (discountText) {
            messages.push(`${discountText} 🔥`);
          }
          messages.push('#بيخلص_بسرعة ⚡');
          messages.push('#وصل_حديثاً ✨');
          messages.push('#الأكثر_مبيعاً 🌟');

          card._cyclingTexts = messages;
          card._currentTextIdx = 0;
        }

        const img = card.querySelector('img');
        if (img && img.parentElement) {
          const imgWrapper = img.parentElement;
          if (window.getComputedStyle(imgWrapper).position === 'static') {
            imgWrapper.style.position = 'relative';
          }
          if (!imgWrapper.querySelector('.custom-cycling-red-badge')) {
            const cyclingBadge = document.createElement('div');
            cyclingBadge.className = 'custom-cycling-red-badge absolute top-2 left-2 z-10 pointer-events-none';
            cyclingBadge.innerHTML = `
              <span class="bg-[#ff4757] text-white text-[10px] md:text-[11px] font-bold px-2.5 py-0.75 rounded-full shadow-sm animate-pulse" style="display: inline-block; transition: opacity 0.3s ease;">
                ${card._cyclingTexts[0]}
              </span>
            `;
            imgWrapper.appendChild(cyclingBadge);
          }
        }

        // 7.2 Inject Bundle Badge, Offer Tag, and Countdown Timer inside card details
        const detailContainer = titleEl.parentElement;
        if (detailContainer) {
          let insertRef = titleEl;
          if (titleEl.nextElementSibling && (titleEl.nextElementSibling.querySelector('svg') || titleEl.nextElementSibling.textContent.includes('('))) {
            insertRef = titleEl.nextElementSibling;
          }

          let extrasWrapper = detailContainer.querySelector('.custom-card-extras');
          if (!extrasWrapper) {
            extrasWrapper = document.createElement('div');
            extrasWrapper.className = 'custom-card-extras';
            
            const bundleCount = getBundleCount(title);
            const bundleHtml = bundleCount ? `
              <div class="custom-bundle-badge">
                <span>📦 يحتوي على ${bundleCount} قطع</span>
              </div>
            ` : '';

            const offerText = getProductOffer(title);
            const offerHtml = offerText ? `
              <div class="custom-offer-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tag text-[#1f3729]"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.586 8.586a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828z"></path><path d="M7.5 7.5h.01"></path></svg>
                <span class="custom-offer-tag-text">${offerText}</span>
              </div>
            ` : '';

            extrasWrapper.innerHTML = `
              ${bundleHtml}
              ${offerHtml}
              <div class="custom-countdown-timer">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span class="custom-countdown-timer-value">00:00:00</span>
              </div>
            `;
            insertRef.parentNode.insertBefore(extrasWrapper, insertRef.nextSibling);
          }
        }

        // Find the add to cart button in the card (either in custom or original layout)
        let addToCartBtn = null;
        card.querySelectorAll('button').forEach(btn => {
          if (btn.textContent.includes('أضف للسلة') || btn.textContent.includes('أضف إلى السلة') || btn.textContent.includes('نقل للسلة')) {
            addToCartBtn = btn;
          }
        });
        if (!addToCartBtn) return;
        
        const btnContainer = addToCartBtn.parentElement;
        if (!btnContainer) return;
        
        // Check if the sample button is already injected
        if (btnContainer.querySelector('.custom-add-sample-btn')) return;
        
        // Create and inject the button
        const sampleBtn = document.createElement('button');
        sampleBtn.className = 'w-full border border-[#1f3729] text-[#1f3729] hover:bg-[#1f3729]/5 text-[14px] font-bold py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 custom-add-sample-btn';
        sampleBtn.innerHTML = `
          <span>أضف عيّنة بـ 9.00 ر.س</span>
          <span>🧪</span>
        `;
        
        btnContainer.appendChild(sampleBtn);
        
        // Bind event listener to the sample button
        sampleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          
          // Show success animation on the button
          const textSpan = sampleBtn.querySelector('span');
          const originalText = textSpan.textContent;
          textSpan.textContent = 'تم إضافة العينة ✓';
          sampleBtn.classList.remove('text-[#1f3729]', 'border-[#1f3729]');
          sampleBtn.classList.add('bg-green-600', 'text-white', 'border-green-600');
          
          // Trigger open-cart event to open the cart
          window.dispatchEvent(new CustomEvent("open-cart"));
          
          setTimeout(() => {
            textSpan.textContent = originalText;
            sampleBtn.classList.add('text-[#1f3729]', 'border-[#1f3729]');
            sampleBtn.classList.remove('bg-green-600', 'text-white', 'border-green-600');
          }, 1500);
        });
      } catch (err) {
        console.error("Error processing original product card:", err);
      }
    });
  }

  // Monitor DOM modifications for SPA page updates
  const domObserver = new MutationObserver(() => {
    initRestructuring();
    startCyclingHashtags();
    startCountdownTimer();
  });
  domObserver.observe(document.body, { childList: true, subtree: true });

  // Backup Interval Poll
  setInterval(() => {
    initRestructuring();
    startCyclingHashtags();
    startCountdownTimer();
  }, 400);

  // Run on window load
  window.addEventListener('load', () => {
    initRestructuring();
    startCyclingHashtags();
    startCountdownTimer();
  });
  initRestructuring();
  startCyclingHashtags();
  startCountdownTimer();
})();
