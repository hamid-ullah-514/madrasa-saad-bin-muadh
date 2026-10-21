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
   DYNAMIC DATA & DONATION CALCULATIONS
   ========================================================================== */
function initDynamicData() {
    const data = getMadrasaData();

    // Update announcement ticker
    const tickerEl = document.getElementById('dynamicAnnouncement');
    if (tickerEl) tickerEl.textContent = data.announcement;

    // Update addresses
    document.querySelectorAll('.js-madrasa-address').forEach(el => {
        el.textContent = data.address;
    });

    // Update Mohtamim phone (0340-9132851)
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

    // Update EasyPaisa info (0319-9532091, Title: Muhammad Ameen)
    document.querySelectorAll('.js-easypaisa-number').forEach(el => {
        el.textContent = data.easyPaisaNumber;
    });

    document.querySelectorAll('.js-easypaisa-title').forEach(el => {
        el.textContent = data.easyPaisaTitle;
    });

    // Update Donation numbers
    const targetEl = document.getElementById('donationTargetDisplay');
    const raisedEl = document.getElementById('donationRaisedDisplay');
    const remainingEl = document.getElementById('donationRemainingDisplay');
    const progressBar = document.getElementById('donationProgressBar');
    const percentEl = document.getElementById('donationPercentDisplay');

    const target = data.targetDonation;
    const raised = data.raisedDonation;
    const remaining = Math.max(0, target - raised);
    const percent = Math.min(100, Math.round((raised / target) * 100));

    if (targetEl) targetEl.textContent = `PKR ${target.toLocaleString('en-US')}`;
    if (raisedEl) raisedEl.textContent = `PKR ${raised.toLocaleString('en-US')}`;
    if (remainingEl) remainingEl.textContent = `PKR ${remaining.toLocaleString('en-US')}`;
    if (percentEl) percentEl.textContent = `${percent}%`;

    if (progressBar) {
        setTimeout(() => {
            progressBar.style.width = `${percent}%`;
        }, 300);
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
