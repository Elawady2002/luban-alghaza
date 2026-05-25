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
              
              <!-- Injected components -->
              <div class="custom-card-extras">
                ${(getBundleCount(p.title) ? `
                  <div class="custom-bundle-badge">
                    <span>يحتوي على ${getBundleCount(p.title)} قطع</span>
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

              <p class="text-[11px] md:text-[12px] text-gray-500 lg:hidden mb-2">تم شراء 100+ سلعة مؤخراً</p>
              
              <!-- Custom Price and Stars Row side by side -->
              <div class="custom-price-stars-row">
                <div class="custom-price-container">
                  <span class="text-[18px] md:text-[20px] lg:text-[16px] font-bold leading-none">${p.price}</span>
                  <span class="text-[12px] md:text-[13px] lg:text-[13px] leading-none mb-[2px]">ر.س</span>
                  ${oldPriceHtml}
                </div>
                <div class="custom-stars-container" dir="ltr">
                  <div class="flex items-center gap-0.5">
                    ${starsHtml}
                  </div>
                  <span>(${count})</span>
                </div>
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
            messages.push(discountText);
          }
          messages.push('#بيخلص_بسرعة');
          messages.push('#وصل_حديثاً');
          messages.push('#الأكثر_مبيعاً');

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
                <span>يحوي على ${bundleCount} قطع</span>
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

        // 7.3 Restructure stars and price to be side-by-side in custom-price-stars-row
        let starsEl = card.querySelector('div.flex.items-center.justify-start.lg\\:justify-center.gap-1.mb-1\\.5');
        if (!starsEl) {
          card.querySelectorAll('div').forEach(div => {
            if (div.querySelector('.lucide-star') && !div.closest('.custom-price-stars-row') && div.children.length >= 2) {
              starsEl = div;
            }
          });
        }

        let priceEl = card.querySelector('div.flex.items-end.justify-start.lg\\:justify-center.gap-1\\.5.mb-1\\.5');
        if (!priceEl) {
          card.querySelectorAll('div').forEach(div => {
            if (div.textContent.includes('ر.س') && !div.querySelector('button') && !div.classList.contains('custom-price-stars-row') && !div.closest('.custom-price-stars-row') && div.children.length >= 2) {
              priceEl = div;
            }
          });
        }

        if (starsEl && priceEl) {
          let row = card.querySelector('.custom-price-stars-row');
          if (!row) {
            row = document.createElement('div');
            row.className = 'custom-price-stars-row';
            row.setAttribute('dir', 'rtl');
            
            priceEl.parentNode.insertBefore(row, priceEl);
            
            starsEl.className = 'custom-stars-container';
            starsEl.setAttribute('dir', 'ltr');
            starsEl.style.flexDirection = 'row';
            starsEl.style.display = 'flex';
            
            priceEl.className = 'custom-price-container';
            priceEl.setAttribute('dir', 'rtl');
            
            row.appendChild(priceEl);
            row.appendChild(starsEl);
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
        `;
        
        btnContainer.appendChild(sampleBtn);
        
        // Bind event listener to the sample button
        sampleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          
          // Show success animation on the button
          const textSpan = sampleBtn.querySelector('span');
          const originalText = textSpan.textContent;
          textSpan.textContent = 'تم إضافة العينة';
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
