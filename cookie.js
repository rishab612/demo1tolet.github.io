// Select elements
const cookieCard = document.getElementById('cookieCard');
const cookieModal = document.getElementById('cookieModal');
const acceptAllBtn = document.getElementById('acceptAll');
const rejectAllBtn = document.getElementById('rejectAll');
const customizeBtn = document.getElementById('customize');
const savePreferencesBtn = document.getElementById('savePreferences');
const saveEssentialBtn = document.getElementById('saveEssential');
const closeModalBtn = document.getElementById('closeModal');

// Show cookie card if consent is not set
if (!getCookie('cookieConsent')) {
    cookieCard.style.display = 'block';
}

// Accept all cookies and load external scripts
acceptAllBtn.addEventListener('click', function () {
    setCookie('cookieConsent', 'all', 365);
    cookieCard.style.display = 'none';
    loadScripts();
    alert('All cookies accepted.');
});

// Reject all cookies
rejectAllBtn.addEventListener('click', function () {
    eraseCookie('cookieConsent');
    cookieModal.style.display = 'none';
    cookieCard.style.display = 'none';
    alert('Cookies rejected.');
});

// Open customization modal
customizeBtn.addEventListener('click', function () {
    cookieModal.style.display = 'block';
    cookieCard.style.display = 'none';
});

// Save essential cookies only
saveEssentialBtn.addEventListener('click', function () {
    setCookie('cookieConsent', 'essential', 365);
    cookieModal.style.display = 'none';
    alert('Essential cookies saved.');
});

// Save customized preferences and load selected scripts
savePreferencesBtn.addEventListener('click', function () {
    let cookieValue = 'essential'; // Start with essential cookies
    let selectedCookies = [];

    if (document.getElementById('analyticsCookies').checked) {
        cookieValue += ',analytics';
        selectedCookies.push('Analytics Cookies');
        loadAnalyticsScript();
    }
    if (document.getElementById('marketingCookies').checked) {
        cookieValue += ',marketing';
        selectedCookies.push('Marketing Cookies');
        loadMarketingScript();
    }

    setCookie('cookieConsent', cookieValue, 365);
    cookieModal.style.display = 'none';

    // Log user selections
    console.log('User selected:', selectedCookies);
    alert('Preferences saved: ' + selectedCookies.join(', '));
});

// Close modal
closeModalBtn.addEventListener('click', function () {
    cookieModal.style.display = 'none';
    cookieCard.style.display = 'block'; // Show cookie card again
});

// Cookie helper functions
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Function to load scripts conditionally
function loadScripts() {
    loadAnalyticsScript();
    loadMarketingScript();
}

// Load analytics script
function loadAnalyticsScript() {
    let script = document.createElement('script');
    script.src = 'https://www.google-analytics.com/analytics.js'; // Example script
    document.head.appendChild(script);
}

// Load marketing script
function loadMarketingScript() {
    let script = document.createElement('script');
    script.src = 'https://www.marketing-service.com/script.js'; // Example script
    document.head.appendChild(script);
}
