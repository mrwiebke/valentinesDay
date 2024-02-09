
document.addEventListener("DOMContentLoaded", function () {
    const text = document.querySelectorAll('.balloons h1 span');
    const balloonAnimationDuration = text.length * 100;
    const delayBeforeCouponsText = balloonAnimationDuration + 7000;

    text.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = 1;
            letter.style.transform = 'translateY(-50px)';
        }, index * 100);
    });

    setTimeout(() => {
        document.querySelector('.balloons').remove();
    }, delayBeforeCouponsText); // Remove the balloons after the delay

    const agreeCheckbox = document.getElementById('agreeTerms');
    const redeemButtons = document.querySelectorAll('.coupon button');

// Add an event listener to the checkbox
agreeCheckbox.addEventListener('change', function() {
    // Toggle button IDs based on checkbox state
    toggleRedemptionButtons(this.checked);
    // Update checkbox status in localStorage
    localStorage.setItem('termsAndConditionsAccepted', this.checked);
});
    window.addEventListener('load', function() {
        const isChecked = localStorage.getItem('termsAndConditionsAccepted') === 'true';
        agreeCheckbox.checked = isChecked;
        toggleRedemptionButtons(isChecked);
        displayRedemptionDates();
    });

    function toggleRedemptionButtons(checked) {
        redeemButtons.forEach(button => {
            const couponContainer = button.closest('.coupon');
            if (couponContainer) { // Check if button's parent with class 'coupon' exists
                const couponId = couponContainer.id;
                button.id = checked ? `activeButton-${couponId}` : `disabledButton-${couponId}`;
                button.disabled = !checked;
                localStorage.setItem(button.id, button.disabled);
            }
        });
    }
    
    function updateCheckboxStatus(isChecked) {
        localStorage.setItem('termsAndConditionsAccepted', isChecked);
    }

    function displayRedemptionDates() {
        const coupons = document.querySelectorAll('.coupon');
        coupons.forEach(coupon => {
            const couponId = coupon.id;
            const redemptionDate = localStorage.getItem(`redemptionDate-${couponId}`);
            if (redemptionDate) {
                // Check if redemption date paragraph already exists
                if (!coupon.querySelector('.redemptionDate')) {
                    coupon.innerHTML += `<p class="redemptionDate">Redeemed on ${redemptionDate}</p>`;
                }
            }
        });
    }
    
});

let couponCounter = 1;

function createCoupon(title, description) {
    const couponContainer = document.getElementById('couponDisplay');
    const container = document.createElement('div');
    container.classList.add('coupon');
    const couponId = `coupon${couponCounter}`;
    container.id = couponId;
    const titleElement = document.createElement('h2');
    titleElement.innerHTML = `<b>${title}</b>`;
    container.appendChild(titleElement);
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    container.appendChild(descriptionElement);
    const redeemButton = document.createElement('button');
    redeemButton.textContent = 'Redeem';
    redeemButton.classList.add('redeemButton'); // Add the redeemButton class
    redeemButton.addEventListener('click', function() {
        redeemCoupon(container);
    });
    container.appendChild(redeemButton);
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.classList.add('resetButton'); // Add the resetButton class
    resetButton.addEventListener('click', function() {
        resetRedemption(container);
    });
    container.appendChild(resetButton);
    couponContainer.appendChild(container);
    couponCounter++;
    return container;
}


function resetRedemption(coupon) {
    const redemptionParagraph = coupon.querySelector('.redemptionDate');
    if (redemptionParagraph) {
        redemptionParagraph.remove();
        // Also, remove the redemption date from localStorage
        const couponId = coupon.id;
        localStorage.removeItem(`redemptionDate-${couponId}`);
    }
}

function redeemCoupon(coupon) {
    const currentDate = new Date();
    const redemptionDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    coupon.innerHTML += `<p class="redemptionDate">Redeemed on ${redemptionDate}</p>`;
    const couponId = coupon.id;
    localStorage.setItem(`redemptionDate-${couponId}`, redemptionDate);
}

const couponContainer = document.getElementById('couponDisplay');

const coupon1 = createCoupon("Homemade meal + dessert of your choice", "Redeemable for any homemade dinner and dessert no matter the time or difficulty required to make it.");
const coupon2 = createCoupon("Dinner at Texas de Brazil on me", "lets go eat some meeeeeeeaaaaattttt");
const coupon3 = createCoupon("Full body massage", "lemme massage those greek god like muscles.");
const coupon4 = createCoupon("Running date", "Let's go for a run, you pick the distance (unfortunately I pick the pace because I am slow)");
const coupon5 = createCoupon("Movie night", "you pick the movie I plan everything else :) - need at least 2 hr heads up to do some gathering");
const coupon6 = createCoupon("Dinner or lunch at resteraunt of your choice", "the fun part is you can choose what I wear, no matter how silly");
const coupon7 = createCoupon("Redeem for a saucy pic", "i will send boobies or something of the like - you will enjoy whatever it is");
const coupon8 = createCoupon("Designated driver", "neither of us drink much but if there is ever a time you want to whip this out, I'll get you home safe and sound");
const coupon9 = createCoupon("Nap with no interruptions", "Nap time with no alarms or me waking you up. sleep for as long as you'd like. (you can use this if you fall asleep while watching tv)");
const coupon10 = createCoupon("Yes day", "I'll say yes to whatever you want today");
const coupon11 = createCoupon("Another massage!", "you can't go wrong having 2 coupons for this. I'll enjoy it as much as you do");
const coupon12 = createCoupon("I'll buy and deliver you some cornnuts", "Use this coupon and enjoy your cornnut addiction guilt free.");
const coupon13 = createCoupon("Re-first Date", "I'll make pizza and we can do a puzzle (I promise it won't be hard and you can even tell me you hate it the whole time and I'll still have sex with you - you dont't have to lie lol.) NOTICE: I will not be dropping any glass jars at the store");
const coupon14 = createCoupon("Double Down", "Reuse any card");


// Get the checkbox element
const agreeCheckbox = document.getElementById('agreeTerms');

// Get all the coupon redemption buttons
const redeemButtons = document.querySelectorAll('.coupon button');

function toggleRedemptionButtons(checked) {
    redeemButtons.forEach(button => {
        const couponContainer = button.parentElement;
        if (couponContainer) { // Check if button has a parent element
            const couponId = couponContainer.id;
            const buttonIdPrefix = button.textContent === 'Redeem' ? 'redeemButton' : 'resetButton';
            button.id = checked ? `${buttonIdPrefix}-${couponId}` : `disabledButton-${couponId}`;
            button.disabled = !checked;
            localStorage.setItem(button.id, button.disabled);
        }
    });
}


// Call toggleButtonIds initially to set button IDs based on checkbox state
toggleRedemptionButtons(agreeCheckbox);


// Add an event listener to the checkbox
agreeCheckbox.addEventListener('change', function() {
    // Toggle button IDs based on checkbox state
    toggleRedemptionButtons(this.checked);
    // Update checkbox status in localStorage
    localStorage.setItem('termsAndConditionsAccepted', this.checked);
});

// On page load, set the checkbox state and button states based on localStorage
window.addEventListener('load', function() {
    // Retrieve checkbox state from local storage
    const isChecked = localStorage.getItem('termsAndConditionsAccepted') === 'true';
    agreeCheckbox.checked = isChecked;

    // Set button IDs based on checkbox state
    toggleRedemptionButtons(isChecked);

    // Retrieve redemption dates from local storage and display them
    const coupons = document.querySelectorAll('.coupon');
    coupons.forEach(coupon => {
        const couponId = coupon.id;
        const redemptionDate = localStorage.getItem(`redemptionDate-${couponId}`);
        if (redemptionDate) {
            coupon.innerHTML += `<p class="redemptionDate">Redeemed on ${redemptionDate}</p>`;
        }
    });
});

// Event listener for reset buttons
couponContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('resetButton')) {
        const coupon = event.target.parentElement;
        resetRedemption(coupon);
    }
});

function resetRedemption(coupon) {
    const redemptionParagraph = coupon.querySelector('.redemptionDate');
    if (redemptionParagraph) {
        redemptionParagraph.remove();
        // Also, remove the redemption date from localStorage
        const couponId = coupon.id;
        localStorage.removeItem(`redemptionDate-${couponId}`);
    }
}

function clearLocalStorage() {
    localStorage.clear();
}
