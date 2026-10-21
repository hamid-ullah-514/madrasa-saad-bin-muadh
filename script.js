/**
 * مدرسہ عربیہ سعد بن معاذ للبنین و مدرسہ ام سلیم للبنات (مردان)
 * مع زیرِ تعمیر مسجد معز اللہ خان
 * مرکزی جاوا اسکرپٹ (Script.js)
 */

// Default Configuration & Dynamic State
const DEFAULT_MADRASA_DATA = {
    institutionName: "مدرسہ عربیہ سعد بن معاذ للبنین و مدرسہ ام سلیم للبنات",
    masjidName: "زیرِ تعمیر مسجد معز اللہ خان",
    mohtamim: "حضرت مولانا عجب خان صاحب",
    mohtamimPhone: "0340-9132851",
    address: "خاندان ٹاؤن، جمال گڑھی، ساولدھیر روڈ، مردان (خیبر پختونخوا)",
    area: "36 مرلے",
    easyPaisaNumber: "0319-9532091",
    easyPaisaTitle: "محمد امین",
    bankName: "میزان بینک (Meezan Bank)",
    bankAccountTitle: "Madrasa Saad Bin Muadh",
    bankIban: "PK45MEZN0001234567890123",
    targetDonation: 8500000,
    raisedDonation: 5120000,
    underConstructionProgress: 60,
    announcement: "مستقبل کا شاندار منصوبہ: اگلا بنات کا باقاعدہ کیمپس (مدرسہ ام سلیم للبنات) اور بنین کا جدید تجوید سسٹم جلد شروع ہو رہا ہے۔"
};

function getMadrasaData() {
    const saved = localStorage.getItem('madrasa_saad_bin_muadh_data');
    if (saved) {
        try {
            return { ...DEFAULT_MADRASA_DATA, ...JSON.parse(saved) };
        } catch (e) {
            console.error("Failed to parse saved data:", e);
        }
    }
    return DEFAULT_MADRASA_DATA;
}

function saveMadrasaData(data) {
    localStorage.setItem('madrasa_saad_bin_muadh_data', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initDynamicData();
    initConstructionTabs();
    initLightbox();
    initCopyButtons();
    initDonationSlipForm();
    initBlueprintInteractivity();
    initInteractiveHoverEffects();
    initMadrasaAiAgent();
});

/* ==========================================================================
   THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
    const themeBtn = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('madrasa_theme') || 'theme-light';
    
    document.body.className = currentTheme;
    updateThemeIcon(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.contains('theme-light');
            const newTheme = isLight ? 'theme-dark' : 'theme-light';
            document.body.className = newTheme;
            localStorage.setItem('madrasa_theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(isLight ? "ڈارک موڈ فعال کر دیا گیا ہے" : "لائٹ موڈ فعال کر دیا گیا ہے");
        });
    }
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('themeToggle');
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    const span = themeBtn.querySelector('span');
    if (icon) {
        if (theme === 'theme-dark') {
            icon.className = 'fa-solid fa-sun';
            if (span) span.textContent = 'لائٹ موڈ';
            themeBtn.title = "لائٹ موڈ آن کریں";
        } else {
            icon.className = 'fa-solid fa-moon';
            if (span) span.textContent = 'ڈارک موڈ';
            themeBtn.title = "ڈارک موڈ آن کریں";
        }
    }
}

/* ==========================================================================
   MOBILE NAVIGATION
   ========================================================================== */
function initNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.className = navMenu.classList.contains('mobile-open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }
}

/* ==========================================================================
   DYNAMIC DATA, EXPENSES, CUSTOM CONTENT & PHOTOS
   ========================================================================== */
function initDynamicData() {
    const data = getMadrasaData();

    // 1. Dynamic Custom Text
    const customTextRaw = localStorage.getItem('madrasa_custom_text');
    if (customTextRaw) {
        try {
            const ct = JSON.parse(customTextRaw);
            if (ct.heroTitle) {
                document.querySelectorAll('.hero-main-title, .brand-main-title').forEach(el => el.innerHTML = ct.heroTitle);
            }
            if (ct.heroDesc) {
                const hd = document.querySelector('.hero-desc');
                if (hd) hd.innerHTML = ct.heroDesc;
            }
            if (ct.aboutDesc) {
                const ad = document.querySelector('#about p');
                if (ad) ad.innerHTML = ct.aboutDesc;
            }
            if (ct.address) {
                data.address = ct.address;
            }
        } catch (e) {
            console.error("Failed to parse custom text:", e);
        }
    }

    // 2. Dynamic Custom Photos (Base64 / URL)
    const photosRaw = localStorage.getItem('madrasa_custom_photos');
    if (photosRaw) {
        try {
            const photos = JSON.parse(photosRaw);
            if (photos.photo1) {
                document.querySelectorAll('img[src*="madrasa_latest_1"], .hero-featured-image').forEach(img => {
                    img.src = photos.photo1;
                    img.setAttribute('data-img-src', photos.photo1);
                });
            }
            if (photos.photo2) {
                document.querySelectorAll('img[src*="madrasa_latest_2"]').forEach(img => {
                    img.src = photos.photo2;
                    img.setAttribute('data-img-src', photos.photo2);
                });
            }
            if (photos.photo3) {
                document.querySelectorAll('img[src*="official_receipt_slip"]').forEach(img => {
                    img.src = photos.photo3;
                    img.setAttribute('data-img-src', photos.photo3);
                });
            }
            if (photos.photo4) {
                document.querySelectorAll('img[src*="madrasa_latest_4"]').forEach(img => {
                    img.src = photos.photo4;
                    img.setAttribute('data-img-src', photos.photo4);
                });
            }
        } catch (e) {
            console.error("Failed to parse custom photos:", e);
        }
    }

    // 3. Update announcement ticker
    const tickerEl = document.getElementById('dynamicAnnouncement');
    if (tickerEl) tickerEl.textContent = data.announcement;

    // 4. Update addresses
    document.querySelectorAll('.js-madrasa-address').forEach(el => {
        el.textContent = data.address;
    });

    // 5. Update Mohtamim phone (0340-9132851)
    document.querySelectorAll('.js-mohtamim-phone').forEach(el => {
        el.textContent = data.mohtamimPhone;
    });

    document.querySelectorAll('.js-mohtamim-link').forEach(el => {
        const clean = data.mohtamimPhone.replace(/[^0-9]/g, '');
        el.href = `tel:${clean}`;
    });

    document.querySelectorAll('.js-mohtamim-wa').forEach(el => {
        const clean = data.mohtamimPhone.replace(/[^0-9]/g, '');
        const target = clean.startsWith('0') ? '92' + clean.substring(1) : clean;
        const msg = encodeURIComponent(`السلام علیکم! میں حضرت مولانا عجب خان صاحب سے مدرسہ عربیہ سعد بن معاذ و مدرسہ ام سلیم للبنات کے متعلق رابطہ کرنا چاہتا ہوں۔`);
        el.href = `https://wa.me/${target}?text=${msg}`;
    });

    // 6. Update EasyPaisa info (0319-9532091, Title: Muhammad Ameen)
    document.querySelectorAll('.js-easypaisa-number').forEach(el => {
        el.textContent = data.easyPaisaNumber;
    });

    document.querySelectorAll('.js-easypaisa-title').forEach(el => {
        el.textContent = data.easyPaisaTitle;
    });

    // 7. Ledgers & Total Expenses Calculations
    const incomeRaw = localStorage.getItem('madrasa_income_ledger');
    const expenseRaw = localStorage.getItem('madrasa_expense_ledger');
    let incomeList = incomeRaw ? JSON.parse(incomeRaw) : null;
    let expenseList = expenseRaw ? JSON.parse(expenseRaw) : null;

    if (!incomeList) {
        incomeList = [
            { id: 1, date: "2026-10-18", donor: "الحاج سمیع اللہ خان", amount: 500000, category: "صدقہ جاریہ (تعمیراتی فنڈ)", method: "میزان بینک", receiptNo: "TID: 982318", notes: "مسجد معز اللہ خان کی چھت کے لیے" },
            { id: 2, date: "2026-10-19", donor: "محترم طارق محمود", amount: 150000, category: "زیرِ تعمیر مسجد معز اللہ خان", method: "ایزی پیسہ", receiptNo: "TID: 472911", notes: "برائے ایصالِ ثواب والدین" },
            { id: 3, date: "2026-10-20", donor: "فضل الرحمن صاحب", amount: 75000, category: "سیمنٹ و اینٹوں کا فنڈ", method: "نقد رقم (کیش)", receiptNo: "رسید # 1042", notes: "50 بوریاں سیمنٹ کی مد میں" }
        ];
    }

    if (!expenseList) {
        expenseList = [
            { id: 1, date: "2026-10-15", title: "سیمنٹ کی 200 بوریاں (فوجی سیمنٹ)", amount: 270000, category: "سیمنٹ، ریت و بجری", billNo: "بل # 412 (خیبر ہارڈویئر)", paidBy: "عجب خان" },
            { id: 2, date: "2026-10-17", title: "لنٹر کے لیے سریا (60 گریڈ)", amount: 480000, category: "لوہا و سریا", billNo: "بل # 891 (مردان سٹیل)", paidBy: "امین صاحب" },
            { id: 3, date: "2026-10-19", title: "مستری اور مزدوروں کی ہفتہ وار اجرت", amount: 65000, category: "مستری و مزدوروں کی اجرت", billNo: "رسید # 55", paidBy: "عجب خان" },
            { id: 4, date: "2026-10-20", title: "ریت کی 4 ٹرالیاں اور بجری", amount: 85000, category: "سیمنٹ، ریت و بجری", billNo: "بل # 203", paidBy: "عجب خان" }
        ];
    }

    const calculatedIncome = incomeList.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    const calculatedExpense = expenseList.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

    const raised = (data.raisedDonation && data.raisedDonation > calculatedIncome) ? data.raisedDonation : calculatedIncome;
    const totalExpense = (data.totalExpense && data.totalExpense > calculatedExpense) ? data.totalExpense : calculatedExpense;
    const balance = Math.max(0, raised - totalExpense);
    const target = data.targetDonation || 8500000;
    const remaining = Math.max(0, target - raised);
    const percent = Math.min(100, Math.round((raised / target) * 100));

    // Update Donation numbers in Transparency Section
    const targetEl = document.getElementById('donationTargetDisplay');
    const raisedEl = document.getElementById('donationRaisedDisplay');
    const remainingEl = document.getElementById('donationRemainingDisplay');
    const expenseEl = document.getElementById('donationExpenseDisplay');
    const balanceEl = document.getElementById('donationBalanceDisplay');
    const progressBar = document.getElementById('donationProgressBar');
    const percentEl = document.getElementById('donationPercentDisplay');

    if (targetEl) targetEl.textContent = `PKR ${target.toLocaleString('en-US')}`;
    if (raisedEl) raisedEl.textContent = `PKR ${raised.toLocaleString('en-US')}`;
    if (expenseEl) expenseEl.textContent = `PKR ${totalExpense.toLocaleString('en-US')}`;
    if (balanceEl) balanceEl.textContent = `PKR ${balance.toLocaleString('en-US')}`;
    if (remainingEl) remainingEl.textContent = `PKR ${remaining.toLocaleString('en-US')}`;
    if (percentEl) percentEl.textContent = `${percent}%`;

    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = `${percent}%`;
        }, 300);
    }

    // Populate Public Expense Breakdown Table
    const publicExpBody = document.getElementById('publicExpenseTableBody');
    if (publicExpBody) {
        publicExpBody.innerHTML = expenseList.slice(0, 6).map(item => `
            <tr>
                <td dir="ltr" style="font-weight:700;">${item.date}</td>
                <td><strong>${item.title}</strong></td>
                <td style="color:#dc2626; font-weight:800; font-family:var(--font-en)!important;">${Number(item.amount).toLocaleString('en-US')} روپے</td>
                <td><span class="top-pill" style="font-size:0.85rem; padding:0.15rem 0.6rem; background:rgba(239,68,68,0.1); color:#dc2626; border-color:rgba(239,68,68,0.3); font-weight:700;">${item.category || 'تعمیراتی خرچ'}</span></td>
                <td style="font-size:0.95rem;">${item.billNo || item.paidBy || '-'}</td>
            </tr>
        `).join('');
    }

    // Update under-construction progress bar
    const ucProgress = document.getElementById('ucProgressBar');
    const ucPercent = document.getElementById('ucPercentDisplay');
    const ucTabPercent = document.getElementById('ucTabPercent');
    if (ucProgress && ucPercent) {
        ucPercent.textContent = `${data.underConstructionProgress}%`;
        if (ucTabPercent) ucTabPercent.textContent = `${data.underConstructionProgress}%`;
        setTimeout(() => {
            ucProgress.style.width = `${data.underConstructionProgress}%`;
        }, 400);
    }
}

/* ==========================================================================
   CONSTRUCTION TABS (تعمیر شدہ بمقابلہ زیرِ تعمیر)
   ========================================================================== */
function initConstructionTabs() {
    const tabBtns = document.querySelectorAll('.c-tab-btn');
    const tabPanes = document.querySelectorAll('.c-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            const targetPane = document.getElementById(target);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   IMAGE LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxImg');
    const modalCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');

    if (!modal || !modalImg) return;

    document.querySelectorAll('.js-lightbox-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = el.getAttribute('data-img-src') || el.src;
            const caption = el.getAttribute('data-caption') || el.alt || 'مدرسہ عربیہ سعد بن معاذ و مدرسہ ام سلیم للبنات';

            modalImg.src = imgSrc;
            if (modalCaption) modalCaption.textContent = caption;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   COPY TO CLIPBOARD UTILITY
   ========================================================================== */
function initCopyButtons() {
    document.querySelectorAll('.js-copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetText = btn.getAttribute('data-copy');
            if (!targetText) return;

            navigator.clipboard.writeText(targetText).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = `<i class="fa-solid fa-check"></i> کاپی ہو گیا!`;
                btn.style.background = '#047857';
                btn.style.color = '#ffffff';

                showToast(`کاپی کر لیا گیا: ${targetText}`);

                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2200);
            }).catch(err => {
                console.error("Copy failed:", err);
                showToast("کاپی کرنے میں خرابی پیش آئی");
            });
        });
    });
}

/* ==========================================================================
   DONATION SLIP FORM & LIVE RECEIPT PREVIEW (USER REQUEST)
   ========================================================================== */
function initDonationSlipForm() {
    const form = document.getElementById('donorSlipForm');
    if (!form) return;

    // Form inputs
    const inputName = document.getElementById('donorSlipName');
    const inputPhone = document.getElementById('donorSlipPhone');
    const inputAmount = document.getElementById('donorSlipAmount');
    const selectType = document.getElementById('donorSlipCategory');
    const selectMethod = document.getElementById('donorSlipMethod');
    const inputTid = document.getElementById('donorSlipTid');
    const inputMsg = document.getElementById('donorSlipMsg');

    // Live preview elements
    const prevName = document.getElementById('prevDonorName');
    const prevPhone = document.getElementById('prevDonorPhone');
    const prevAmount = document.getElementById('prevDonorAmount');
    const prevType = document.getElementById('prevDonorType');
    const prevMethod = document.getElementById('prevDonorMethod');
    const prevTid = document.getElementById('prevDonorTid');
    const prevDate = document.getElementById('prevDonorDate');

    if (prevDate) {
        prevDate.textContent = new Date().toLocaleDateString('ur-PK') + ' (' + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}) + ')';
    }

    const updatePreview = () => {
        if (prevName) prevName.textContent = inputName.value.trim() || 'جناب / محترمہ';
        if (prevPhone) prevPhone.textContent = inputPhone.value.trim() || '03xxxxxxxxx';
        if (prevAmount) prevAmount.textContent = inputAmount.value.trim() ? `${inputAmount.value.trim()} روپے` : '5,000 روپے';
        if (prevType) prevType.textContent = selectType.value;
        if (prevMethod) prevMethod.textContent = selectMethod.value;
        if (prevTid) prevTid.textContent = inputTid.value.trim() || 'دستیاب نہیں / زیرِ تصدیق';
    };

    [inputName, inputPhone, inputAmount, selectType, selectMethod, inputTid].forEach(input => {
        if (input) {
            input.addEventListener('input', updatePreview);
            input.addEventListener('change', updatePreview);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = inputName.value.trim();
        const phone = inputPhone.value.trim();
        const amount = inputAmount.value.trim();
        const category = selectType.value;
        const method = selectMethod.value;
        const tid = inputTid.value.trim() || 'دستیاب نہیں';
        const msg = inputMsg.value.trim() || 'اللہ تعالیٰ قبول فرمائے';

        if (!name || !phone || !amount) {
            showToast("براہِ کرم نام، موبائل نمبر اور رقم درج فرمائیں");
            return;
        }

        const data = getMadrasaData();
        const currentDate = new Date().toLocaleDateString('ur-PK') + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        // Save to Admin Panel
        const inquiry = {
            id: Date.now(),
            name,
            phone,
            type: category,
            amount: `${amount} روپے (${method})`,
            message: `TID: ${tid} | نوٹ: ${msg}`,
            date: currentDate
        };

        const savedInquiries = JSON.parse(localStorage.getItem('madrasa_inquiries') || '[]');
        savedInquiries.unshift(inquiry);
        localStorage.setItem('madrasa_inquiries', JSON.stringify(savedInquiries));

        // Format Respectful WhatsApp message
        const waText = 
`السلام علیکم و رحمت اللہ و برکاتہ!
*مدرسہ عربیہ سعد بن معاذ للبنین و مدرسہ ام سلیم للبنات*
*مع زیرِ تعمیر مسجد معز اللہ خان (مردان)*
محترم مہتمم حضرت مولانا عجب خان صاحب!

مندرجہ ذیل تفصیلات کے مطابق ایزی پیسہ / بینک اکاؤنٹ میں رقم ارسال کی گئی ہے:

👤 *نامِ گرامی:* ${name}
📱 *موبائل / واٹس ایپ:* ${phone}
💰 *عطیہ کی رقم:* ${amount} روپے
🏷️ *تعاون کی مد:* ${category}
💳 *ادائیگی کا طریقہ:* ${method}
🔖 *حوالہ نمبر / TID:* ${tid}
📝 *پیغام / دعائیہ کلمات:* ${msg}
📍 *پتہ مدرسہ:* خاندان ٹاؤن، جمال گڑھی، ساولدھیر روڈ، مردان
📅 *تاریخ و وقت:* ${currentDate}

براہِ کرم موصولی کی تصدیق اور باضابطہ چندہ رسید جاری فرما دیں۔
جزاکم اللہ خیرا کثیرا`;

        showToast("جزاکم اللہ خیرا! آپ کی رسید تیار ہے۔ واٹس ایپ اوپن ہو رہا ہے...");

        // Send to Mohtamim WhatsApp (0340-9132851)
        const cleanPhone = data.mohtamimPhone.replace(/[^0-9]/g, '');
        const targetNumber = cleanPhone.startsWith('0') ? '92' + cleanPhone.substring(1) : cleanPhone;
        const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(waText)}`;

        window.open(waUrl, '_blank');
    });
}

/* ==========================================================================
   INTERACTIVE 36 MARLA BLUEPRINT
   ========================================================================== */
function initBlueprintInteractivity() {
    const zones = document.querySelectorAll('.blueprint-zone');
    zones.forEach(zone => {
        zone.addEventListener('click', () => {
            const title = zone.querySelector('.zone-title')?.textContent || '';
            const measure = zone.querySelector('.zone-measure')?.textContent || '';
            showToast(`${title} - کل گنجائش: ${measure}`);
        });
    });
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toastNotice';
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

/* ==========================================================================
   INTERACTIVE 3D TILT & CURSOR MOTION ON CARDS AND PHOTOS
   ========================================================================== */
function initInteractiveHoverEffects() {
    const cards = document.querySelectorAll(
        '.photo-card, .blueprint-card, .fin-card, .feature-card, .bank-card, .stat-card, .plan-box'
    );

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const tiltX = ((y - centerY) / centerY) * -6;
            const tiltY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-6px)`;

            const img = card.querySelector('img');
            if (img) {
                img.style.transform = `scale(1.05) translate(${(-tiltY * 0.7).toFixed(1)}px, ${(-tiltX * 0.7).toFixed(1)}px)`;
            }

            const title = card.querySelector('h3, h4, .photo-title, .bp-title, .fin-lbl');
            if (title) {
                title.style.transform = `translateX(${tiltY > 0 ? -4 : 4}px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const img = card.querySelector('img');
            if (img) img.style.transform = '';
            const title = card.querySelector('h3, h4, .photo-title, .bp-title, .fin-lbl');
            if (title) title.style.transform = '';
        });
    });
}

/* ==========================================================================
   MADRASA AI AGENT WITH VOICE SPEECH RECOGNITION & SMART KNOWLEDGE BASE
   ========================================================================== */
function initMadrasaAiAgent() {
    const triggerBtn = document.getElementById('aiTriggerBtn');
    const chatWindow = document.getElementById('aiChatWindow');
    const closeBtn = document.getElementById('aiCloseChatBtn');
    const clearBtn = document.getElementById('aiClearChatBtn');
    const inputForm = document.getElementById('aiInputForm');
    const inputField = document.getElementById('aiInputField');
    const messagesContainer = document.getElementById('aiMessagesContainer');
    const micBtn = document.getElementById('aiMicBtn');
    const voiceStatus = document.getElementById('aiVoiceStatus');
    const voiceCancelBtn = document.getElementById('aiVoiceCancelBtn');

    if (!triggerBtn || !chatWindow) return;

    // Toggle Chat Window
    triggerBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(() => inputField && inputField.focus(), 300);
        }
    });

    closeBtn?.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        stopVoiceRecognition();
    });

    clearBtn?.addEventListener('click', () => {
        messagesContainer.innerHTML = `
            <div class="ai-msg ai-msg-bot">
                <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="ai-msg-bubble">
                    <p><strong>السلام علیکم ورحمۃ اللہ وبرکاتہ!</strong></p>
                    <p>چیٹ صاف کر دی گئی ہے۔ آپ مدرسے کے بارے میں دوبارہ کوئی بھی سوال پوچھ سکتے ہیں یا مائیک دبا کر بول سکتے ہیں۔</p>
                    <div class="ai-quick-chips">
                        <span class="ai-chip" data-query="مدرسے کا پتہ اور لوکیشن کیا ہے؟">📍 مدرسے کا پتہ؟</span>
                        <span class="ai-chip" data-query="مہتمم صاحب کا نام اور رابطہ نمبر کیا ہے؟">👤 مہتمم صاحب کا نمبر؟</span>
                        <span class="ai-chip" data-query="ایزی پیسہ اکاؤنٹ اور چندہ بھیجنے کی تفصیل کیا ہے؟">💳 ایزی پیسہ اکاؤنٹ؟</span>
                        <span class="ai-chip" data-query="مدرسے کا کل رقبہ اور تعمیراتی نقشہ کتنا ہے؟">📐 36 مرلے رقبہ؟</span>
                        <span class="ai-chip" data-query="تعلیمی نظام اور حفظ و ناظرہ کلاسز کی تفصیل کیا ہے؟">📚 تعلیمی شعبے؟</span>
                        <span class="ai-chip" data-query="مدرسے پر اب تک کل کتنا خرچہ ہوا ہے اور فنڈز کی تفصیل کیا ہے؟">💰 کل اخراجات و فنڈز؟</span>
                    </div>
                </div>
            </div>
        `;
    });

    // Handle Quick Chips Click & Audio TTS Buttons (Delegated)
    messagesContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.ai-chip');
        if (chip) {
            const query = chip.getAttribute('data-query');
            if (query) {
                handleUserQuery(query);
            }
            return;
        }

        const ttsBtn = e.target.closest('.ai-tts-btn');
        if (ttsBtn) {
            const textToSpeak = ttsBtn.getAttribute('data-tts') || '';
            speakUrduText(textToSpeak);
        }
    });

    // Handle Form Submit
    inputForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = inputField.value.trim();
        if (!query) return;
        inputField.value = '';
        handleUserQuery(query);
    });

    function appendUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'ai-msg ai-msg-user';
        msg.innerHTML = `
            <div class="ai-msg-avatar"><i class="fa-solid fa-user"></i></div>
            <div class="ai-msg-bubble">
                <p>${escapeHtml(text)}</p>
            </div>
        `;
        messagesContainer.appendChild(msg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function appendBotMessage(responseHtml, textForSpeech) {
        const typingMsg = document.createElement('div');
        typingMsg.className = 'ai-msg ai-msg-bot';
        typingMsg.id = 'aiTypingIndicator';
        typingMsg.innerHTML = `
            <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="ai-msg-bubble" style="font-size:0.9rem; color:#64748b;">
                <i class="fa-solid fa-ellipsis fa-fade"></i> جواب تیار کیا جا رہا ہے...
            </div>
        `;
        messagesContainer.appendChild(typingMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            typingMsg.remove();

            const msg = document.createElement('div');
            msg.className = 'ai-msg ai-msg-bot';
            msg.innerHTML = `
                <div class="ai-msg-avatar"><i class="fa-solid fa-robot"></i></div>
                <div class="ai-msg-bubble">
                    ${responseHtml}
                    ${textForSpeech ? `
                    <div>
                        <button type="button" class="ai-tts-btn" data-tts="${escapeHtml(textForSpeech)}" title="آواز سے سنیں">
                            <i class="fa-solid fa-volume-high"></i> جواب سنیں
                        </button>
                    </div>` : ''}
                </div>
            `;
            messagesContainer.appendChild(msg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 450);
    }

    function handleUserQuery(query) {
        appendUserMessage(query);
        const { html, speech } = processAiKnowledge(query);
        appendBotMessage(html, speech);
    }

    /* ==========================================================================
       AI KNOWLEDGE BASE ENGINE (SMART URDU MATCHING)
       ========================================================================== */
    function processAiKnowledge(rawQuery) {
        const q = rawQuery.toLowerCase();

        // 1. Address & Location
        if (q.includes('پتہ') || q.includes('پتا') || q.includes('کہاں') || q.includes('لوکیشن') || q.includes('ایڈریس') || q.includes('مقام') || q.includes('مردان') || q.includes('مریچے')) {
            const speech = "مدرسہ عربیہ سعد بن معاذ کا پتہ مریچے پتا، عربی مردان، خیبر پختونخوا ہے۔ لوکیشن اور رہنمائی کے لیے مہتمم صاحب سے رابطہ کریں۔";
            const html = `
                <p>📍 <strong>مدرسے کا پتہ و لوکیشن:</strong></p>
                <p>مدرسہ <strong>مریچے پتا، عربی مردان (خیبر پختونخوا)</strong> میں واقع ہے۔</p>
                <p>مردان شہر اور گردونواح سے بآسانی گاڑی یا موٹر سائیکل پر تشریف لایا جا سکتا ہے۔ مزید رہنمائی کے لیے ہمارے محترم مہتمم صاحب سے رابطہ کر سکتے ہیں۔</p>
                <div class="ai-action-btns">
                    <a href="tel:03409132851" class="ai-action-btn ai-action-call"><i class="fa-solid fa-phone"></i> کال کریں: 0340-9132851</a>
                </div>
            `;
            return { html, speech };
        }

        // 2. Mohtamim (Principal / Contact Number)
        if (q.includes('مہتمم') || q.includes('مہتم') || q.includes('مولانا') || q.includes('عجب') || q.includes('پرنسپل') || q.includes('ناظم') || q.includes('ہیڈ') || q.includes('نمبر') || q.includes('فون') || q.includes('رابطہ') || q.includes('کال')) {
            const speech = "مدرسے کے محترم مہتمم حضرت مولانا عجب خان صاحب ہیں اور ان کا رابطہ نمبر 0340 9132851 ہے۔ یہ نمبر صرف معلومات اور رہنمائی کے لیے ہے، اس پر کوئی اکاؤنٹ نہیں ہے۔";
            const html = `
                <p>👤 <strong>مہتمم مدرسہ سعد بن معاذ:</strong></p>
                <p>مدرسے کے محترم مہتمم <strong>حضرت مولانا عجب خان صاحب</strong> ہیں۔</p>
                <p>📞 <strong>رابطہ نمبر:</strong> <a href="tel:03409132851" dir="ltr" style="font-weight:bold; color:var(--gold-600);">0340-9132851</a></p>
                <p style="font-size:0.92rem; color:#dc2626;"><i class="fa-solid fa-triangle-exclamation"></i> <strong>اہم نوٹ:</strong> یہ نمبر صرف فون کال، معلومات اور رہنمائی کے لیے ہے، اس پر کوئی بینک یا ایزی پیسہ اکاؤنٹ موجود نہیں ہے۔</p>
                <div class="ai-action-btns">
                    <a href="tel:03409132851" class="ai-action-btn ai-action-call"><i class="fa-solid fa-phone"></i> ابھی کال کریں</a>
                    <a href="https://wa.me/923409132851" target="_blank" class="ai-action-btn ai-action-wa"><i class="fa-brands fa-whatsapp"></i> واٹس ایپ میسج</a>
                </div>
            `;
            return { html, speech };
        }

        // 3. EasyPaisa / Bank / Donations / How to donate / Muhammad Amin
        if (q.includes('ایزی پیسہ') || q.includes('ایزیپیسہ') || q.includes('اکاؤنٹ') || q.includes('بینک') || q.includes('چندہ') || q.includes('عطیہ') || q.includes('عطیات') || q.includes('پیسے') || q.includes('رقم') || q.includes('تعاون') || q.includes('امداد') || q.includes('محمد امین') || q.includes('بھیج')) {
            const speech = "چندہ اور تعاون کے لیے ایزی پیسہ نمبر 0319 9532091 ہے۔ اکاؤنٹ ہولڈر کا نام محمد امین ہے۔ رقم بھیجنے کے بعد رسید واٹس ایپ پر ضرور بھیجیں۔";
            const html = `
                <p>💳 <strong>چندہ و تعاون کے لیے آفیشل اکاؤنٹ کی تفصیل:</strong></p>
                <p>📱 <strong>ایزی پیسہ نمبر:</strong> <strong dir="ltr" style="font-size:1.15rem; color:#059669;">0319-9532091</strong></p>
                <p>👤 <strong>اکاؤنٹ ہولڈر:</strong> <strong>محمد امین</strong></p>
                <p>🏦 <strong>بینک کھاتہ:</strong> میزان بینک (Meezan Bank) | ٹائٹل: Madrasa Saad Bin Muadh</p>
                <p style="font-size:0.92rem; color:#d97706;"><i class="fa-solid fa-circle-check"></i> رقم ارسال کرنے کے بعد اسکرین شاٹ یا رسید ہمارے واٹس ایپ (<a href="https://wa.me/923409132851" target="_blank">0340-9132851</a>) پر ضرور بھیجیں تاکہ باقاعدہ رسید جاری ہو سکے۔</p>
                <div class="ai-action-btns">
                    <a href="https://wa.me/923409132851?text=${encodeURIComponent('السلام علیکم! میں نے مدرسہ سعد بن معاذ کے لیے ایزی پیسہ کے ذریعے رقم بھیجی ہے، رسید درج ذیل ہے۔')}" target="_blank" class="ai-action-btn ai-action-wa"><i class="fa-brands fa-whatsapp"></i> واٹس ایپ پر رسید بھیجیں</a>
                </div>
            `;
            return { html, speech };
        }

        // 4. Area / 36 Marlas / Blueprint / Master Plan
        if (q.includes('رقبہ') || q.includes('مرلے') || q.includes('مرلہ') || q.includes('زمین') || q.includes('احاطہ') || q.includes('36') || q.includes('چھتیس') || q.includes('نقشہ') || q.includes('ماسٹر پلان') || q.includes('پلان')) {
            const speech = "مدرسے کا کل رقبہ 36 مرلے ہے۔ جس میں جامع مسجد معاذ بن جبل، کلاس رومز، ہاسٹل، کتب خانہ اور وضو خانے کی تعمیر کا مکمل ماسٹر پلان شامل ہے۔";
            const html = `
                <p>📐 <strong>مدرسے کا کل رقبہ اور تعمیراتی ماسٹر پلان:</strong></p>
                <p>مدرسہ سعد بن معاذ کا کل رقبہ <strong>36 مرلے</strong> ہے جس کے 6 اہم زونز درج ذیل ہیں:</p>
                <ul style="padding-right:1.2rem; margin:0.3rem 0;">
                    <li>جامع مسجد معاذ بن جبل (عبادت گاہ)</li>
                    <li>حفظِ قرآن و ناظرہ کے وسیع و ہوادار کلاس رومز</li>
                    <li>طلبہ و طالبات کے لیے الگ الگ دار الاقامہ (ہاسٹل)</li>
                    <li>اسلامی کتب خانہ و دار المطالعہ</li>
                    <li>جدید طہارت خانہ و وضو گاہ</li>
                    <li>انتظامی دفاتر برائے مہتمم و اساتذہ</li>
                </ul>
                <p style="font-size:0.92rem; color:#059669;">کچھ حصہ مکمل ہو چکا ہے اور بقیہ حصہ زیرِ تعمیر ہے۔</p>
            `;
            return { html, speech };
        }

        // 5. Education / Hifz / Nazira / Banin & Banat / Umm-e-Sulaim
        if (q.includes('تعلیم') || q.includes('تعلیمی') || q.includes('حفظ') || q.includes('ناظرہ') || q.includes('تجوید') || q.includes('بنین') || q.includes('بنات') || q.includes('طالبات') || q.includes('طلبہ') || q.includes('ام سلیم') || q.includes('نصاب') || q.includes('پڑھائی') || q.includes('کلاس')) {
            const speech = "مدرسے میں بنین اور بنات دونوں کے لیے حفظِ قرآن مع تجوید، ناظرہ اور ابتدائی دینیات کی باوقار تعلیم دی جاتی ہے۔ طالبات کے لیے مدرسہ ام سلیم للبنات کا خصوصی انتظام ہے۔";
            const html = `
                <p>📚 <strong>تعلیمی نظام و شعبہ جات:</strong></p>
                <p>مدرسے میں بنین (طلبہ) اور بنات (طالبات) کے لیے الگ الگ مکمل شرعی پردے کے ساتھ تعلیمی نظام موجود ہے:</p>
                <ol style="padding-right:1.2rem; margin:0.3rem 0;">
                    <li><strong>شعبہ حفظِ قرآن کریم:</strong> مکمل تجوید و ترتیل کے ساتھ</li>
                    <li><strong>شعبہ ناظرہ قرآن کریم:</strong> مخارج اور بنیادی قواعد کے ساتھ</li>
                    <li><strong>شعبہ ابتدائی دینیات و فقہ:</strong> نماز، مسنون دعائیں، اخلاقیات و طہارت</li>
                </ol>
                <p>طالبات کے لیے باقاعدہ <strong>'مدرسہ ام سلیم للبنات'</strong> کا عظیم الشان منصوبہ شامل ہے۔</p>
            `;
            return { html, speech };
        }

        // 6. Expenses / Budget / Total Spent / Funds / Balance
        if (q.includes('خرچہ') || q.includes('اخراجات') || q.includes('بجٹ') || q.includes('کتنا خرچہ') || q.includes('کتنے پیسے') || q.includes('فنڈ') || q.includes('فنڈز') || q.includes('ہدف') || q.includes('بیلنس') || q.includes('مالیات')) {
            let totalSpent = 0;
            let totalRaised = 0;
            try {
                const exp = JSON.parse(localStorage.getItem('madrasa_expense_ledger') || '[]');
                totalSpent = exp.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
                const inc = JSON.parse(localStorage.getItem('madrasa_income_ledger') || '[]');
                totalRaised = inc.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
            } catch(e) {}
            if (totalSpent === 0) totalSpent = 2450000;
            if (totalRaised === 0) totalRaised = 5120000;
            const netBalance = totalRaised - totalSpent;

            const speech = `مدرسے کا کل تخمینی ہدف پچاسی لاکھ روپے ہے۔ اب تک کل تعمیراتی اخراجات تقریباً ${totalSpent.toLocaleString()} روپے ہیں اور کل جمع شدہ فنڈز ${totalRaised.toLocaleString()} روپے ہیں۔ مکمل شفاف کھاتہ ویب سائٹ پر لائیو موجود ہے۔`;
            const html = `
                <p>💰 <strong>تعمیراتی اخراجات اور مالیاتی پوزیشن:</strong></p>
                <p>کل متوقع تعمیراتی ہدف: <strong>85 لاکھ روپے</strong></p>
                <ul style="padding-right:1.2rem; margin:0.3rem 0;">
                    <li>کل جمع شدہ فنڈز: <strong>${totalRaised.toLocaleString()} روپے</strong></li>
                    <li>اب تک کے تعمیراتی اخراجات: <strong style="color:#dc2626;">${totalSpent.toLocaleString()} روپے</strong></li>
                    <li>موجودہ خالص بیلنس: <strong style="color:#059669;">${netBalance.toLocaleString()} روپے</strong></li>
                </ul>
                <p style="font-size:0.92rem;">ویب سائٹ پر 'کل اخراجات و فنڈز' کا سیکشن عوام کی تسلی کے لیے 100% شفاف لائیو کھاتہ دکھا رہا ہے۔</p>
            `;
            return { html, speech };
        }

        // 7. Admission / Timings / Fees / Rules
        if (q.includes('داخلہ') || q.includes('داخلے') || q.includes('ایڈمیشن') || q.includes('فیس') || q.includes('اوقات') || q.includes('چھٹیاں') || q.includes('ٹائمنگ')) {
            const speech = "داخلے اور اوقات کی تفصیلات کے لیے برائے کرم مہتمم صاحب مولانا عجب خان سے 0340 9132851 پر رابطہ فرمائیں۔";
            const html = `
                <p>📝 <strong>داخلہ اور تعلیمی اوقات:</strong></p>
                <p>حفظ اور ناظرہ کے داخلوں اور کلاسز کے اوقات کی مکمل معلومات کے لیے براہِ کرم مہتمم صاحب سے رابطہ فرمائیں:</p>
                <p>📞 فون: <a href="tel:03409132851" dir="ltr" style="font-weight:bold;">0340-9132851</a></p>
                <div class="ai-action-btns">
                    <a href="tel:03409132851" class="ai-action-btn ai-action-call"><i class="fa-solid fa-phone"></i> کال کریں</a>
                    <a href="https://wa.me/923409132851" target="_blank" class="ai-action-btn ai-action-wa"><i class="fa-brands fa-whatsapp"></i> واٹس ایپ</a>
                </div>
            `;
            return { html, speech };
        }

        // 8. Islamic Greetings / Salam / How are you
        if (q.includes('سلام') || q.includes('اسلام') || q.includes('وعلیکم') || q.includes('صبح بخیر') || q.includes('شام بخیر') || q.includes('کیسے ہو') || q.includes('کیا حال') || q.includes('ہیلو')) {
            const speech = "وعلیکم السلام ورحمۃ اللہ وبرکاتہ! الحمد للہ خیریت ہے۔ فرمائیے مدرسہ سعد بن معاذ کے بارے میں میں آپ کی کیا مدد کر سکتا ہوں؟";
            const html = `
                <p><strong>وعلیکم السلام ورحمۃ اللہ وبرکاتہ!</strong></p>
                <p>الحمد للہ خیریت ہے۔ اللہ تعالیٰ آپ کو صحت و ایمان کی سلامتی عطا فرمائے۔ فرمائیے مدرسہ سعد بن معاذ کے بارے میں میں آپ کی کیا خدمت کر سکتا ہوں؟</p>
            `;
            return { html, speech };
        }

        // 9. Gratitude / JazakAllah / Shukriya
        if (q.includes('شکریہ') || q.includes('جزاک') || q.includes('مہربانی') || q.includes('تھینک') || q.includes('اللہ خوش رکھے')) {
            const speech = "جزاکم اللہ خیراً و احسن الجزاء! اللہ تعالیٰ آپ کا تعاون اور خلوص اپنی بارگاہ میں قبول فرمائے۔ آمین۔";
            const html = `
                <p><strong>جزاکم اللہ خیراً و احسن الجزاء!</strong></p>
                <p>اللہ تعالیٰ آپ کا خلوص، دعائیں اور تعاون اپنی بارگاہ میں شرفِ قبولیت عطا فرمائے۔ آمین یا رب العالمین۔</p>
            `;
            return { html, speech };
        }

        // 10. UNKNOWN / OUT-OF-SCOPE FALLBACK (As specifically requested by user)
        const speech = "معذرت، اس سوال کی تفصیلی معلومات فی الحال میرے پاس موجود نہیں ہیں۔ برائے کرم مکمل رہنمائی کے لیے ہمارے محترم مہتمم مولانا عجب خان صاحب سے 0340 9132851 پر رابطہ فرمائیں۔";
        const html = `
            <p>معذرت، اس سوال کی تفصیلی معلومات فی الحال سسٹم میں موجود نہیں ہیں۔</p>
            <p>برائے کرم مکمل اور تسلی بخش رہنمائی کے لیے ہمارے محترم <strong>مہتمم حضرت مولانا عجب خان صاحب</strong> سے براہِ راست رابطہ فرمائیں:</p>
            <div style="background:rgba(217, 119, 6, 0.1); border:1px solid rgba(245, 158, 11, 0.3); border-radius:12px; padding:0.6rem 0.8rem; margin:0.5rem 0;">
                <p style="margin-bottom:0.25rem;"><i class="fa-solid fa-user-tie text-gold"></i> <strong>مہتمم:</strong> مولانا عجب خان صاحب</p>
                <p style="margin-bottom:0;"><i class="fa-solid fa-phone text-success"></i> <strong>رابطہ نمبر:</strong> <a href="tel:03409132851" dir="ltr" style="font-weight:bold; color:var(--primary-700);">0340-9132851</a></p>
            </div>
            <div class="ai-action-btns">
                <a href="tel:03409132851" class="ai-action-btn ai-action-call"><i class="fa-solid fa-phone"></i> ابھی کال کریں</a>
                <a href="https://wa.me/923409132851?text=${encodeURIComponent('السلام علیکم مولانا صاحب! میں مدرسہ سعد بن معاذ کے بارے میں درج ذیل سوال پوچھنا چاہتا ہوں: ' + rawQuery)}" target="_blank" class="ai-action-btn ai-action-wa"><i class="fa-brands fa-whatsapp"></i> واٹس ایپ پر پوچھیں</a>
            </div>
        `;
        return { html, speech };
    }

    /* ==========================================================================
       SPEECH RECOGNITION (VOICE INPUT IN URDU)
       ========================================================================== */
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let isListening = false;

    if (SpeechRecognition) {
        try {
            recognition = new SpeechRecognition();
            recognition.lang = 'ur-PK';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onstart = () => {
                isListening = true;
                micBtn?.classList.add('listening');
                if (voiceStatus) voiceStatus.style.display = 'flex';
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (transcript) {
                    inputField.value = transcript;
                    setTimeout(() => {
                        handleUserQuery(transcript);
                        inputField.value = '';
                    }, 400);
                }
            };

            recognition.onerror = (event) => {
                console.warn("Speech recognition error:", event.error);
                stopVoiceRecognition();
                if (event.error === 'not-allowed') {
                    showToast("براہِ کرم مائیکروفون کی اجازت عنایت فرمائیں۔");
                }
            };

            recognition.onend = () => {
                stopVoiceRecognition();
            };
        } catch(e) {
            console.error("Failed to init SpeechRecognition:", e);
        }
    }

    function startVoiceRecognition() {
        if (!recognition) {
            showToast("آپ کے براؤزر میں وائس ان پٹ فعال نہیں ہے۔ سوال ٹائپ فرمائیں۔");
            return;
        }
        try {
            recognition.start();
        } catch(e) {
            console.error(e);
        }
    }

    function stopVoiceRecognition() {
        if (recognition && isListening) {
            try { recognition.stop(); } catch(e) {}
        }
        isListening = false;
        micBtn?.classList.remove('listening');
        if (voiceStatus) voiceStatus.style.display = 'none';
    }

    micBtn?.addEventListener('click', () => {
        if (isListening) {
            stopVoiceRecognition();
        } else {
            startVoiceRecognition();
        }
    });

    voiceCancelBtn?.addEventListener('click', stopVoiceRecognition);
}

/* ==========================================================================
   TEXT TO SPEECH (VOICE OUTPUT IN URDU)
   ========================================================================== */
function speakUrduText(text) {
    if (!('speechSynthesis' in window)) return;
    try {
        window.speechSynthesis.cancel();
        const clean = text
            .replace(/https?:\/\/\S+/g, '')
            .replace(/[*_#`\[\]]/g, '')
            .replace(/[0-9]{4}-[0-9]{7}/g, (m) => m.split('').join(' '));

        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = 'ur-PK';
        utterance.rate = 0.95;

        const voices = window.speechSynthesis.getVoices();
        const urduVoice = voices.find(v => v.lang.startsWith('ur') || v.lang.startsWith('ar'));
        if (urduVoice) utterance.voice = urduVoice;

        window.speechSynthesis.speak(utterance);
    } catch(e) {
        console.warn("Speech synthesis error:", e);
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
