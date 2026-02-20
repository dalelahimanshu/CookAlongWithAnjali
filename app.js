const appState = {
  user: null,
  subscribed: false,
};

const kitchenMessages = [
  {
    text: "Ghar ka khana hi sabse achha hota hai.",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80"
  },
  {
    text: "Food connects hearts.",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80"
  },
  {
    text: "Even quick recipes can carry big emotions.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  },
  {
    text: "We cook fast, but with feeling.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  },
  {
    text: "We keep it simple, healthy, and homely.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    text: "Let us recreate childhood tastes, family dinners, and warm memories, one easy recipe at a time.",
    image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80"
  },
];

const latestRecipes = [
  {
    title: "Gatte Ki Sabzi",
    image: "assets/images/gatte-ki-sabzi.jpg",
    note: "Rajasthan special comfort recipe",
  },
  {
    title: "Dal Tadka & Jeera Rice",
    image: "assets/images/dal-tadka-jeera-rice.jpg",
    note: "Weeknight classic ghar ka khana",
  },
  {
    title: "Spinach Corn Sandwich",
    image: "assets/images/spinach-corn-sandwich.jpg",
    note: "Quick office-day breakfast",
  },
  {
    title: "Chole Bhature",
    image: "assets/images/chole-bhature.jpg",
    note: "Weekend family favorite",
  },
  {
    title: "What I Ate in My Office",
    image: "assets/images/office-meals-episode-1.jpg",
    note: "Real meals for busy professionals",
    premiumOnly: true,
    badge: "PREMIUM",
  },
];

const freeRecipes = [
  {
    title: "Spinach Corn Sandwich",
    level: "Easy",
    time: "15 min",
    image: "assets/images/poha.png",
  },
  {
    title: "Dal Tadka & Jeera Rice",
    level: "Easy",
    time: "35 min",
    image: "assets/images/dal-baati.png",
  },
  {
    title: "Gatte Ki Sabzi",
    level: "Medium",
    time: "40 min",
    image: "assets/images/gatte-ki-sabzi.jpg",
  },
];

const premiumRecipes = [
  {
    title: "Chole Bhature Master Recipe",
    level: "Advanced",
    time: "60 min",
    image: "assets/images/chole-bhature.jpg",
  },
  {
    title: "North Indian Comfort Meal Plan",
    level: "Medium",
    time: "75 min",
    image: "assets/images/rajma.png",
  },
  {
    title: "Regional Special Weekend Menu",
    level: "Medium",
    time: "90 min",
    image: "assets/images/gatte-ki-sabzi.jpg",
  },
  {
    title: "Office Meal Video Series",
    level: "Premium",
    time: "20 min",
    image: "assets/images/office-meals-episode-1.jpg",
  },
];

const comingSoonItems = [
  {
    title: "Rajasthani Kadhi",
    image: "assets/images/rajasthani-kadhi.png",
    note: "Rich yogurt-based gravy with soft besan dumplings",
  },
  {
    title: "Gatte ki Sabji",
    image: "assets/images/gatte-ki-sabzi.jpg",
    note: "Traditional besan dumplings in rich Rajasthani gravy",
  },
  {
    title: "Kanda Poha",
    image: "assets/images/poha.png",
    note: "Light and flavorful breakfast-style poha with peanuts and lemon",
  },
];

const fallbackRecipeImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

const el = {
  carousel: document.getElementById("recipeCarousel"),
  messageCarousel: document.getElementById("messageCarousel"),
  comingSoonCarousel: document.getElementById("comingSoonCarousel"),
  freeRecipes: document.getElementById("freeRecipes"),
  premiumRecipes: document.getElementById("premiumRecipes"),
  premiumSection: document.getElementById("premiumSection"),
  youtubeVideosGrid: document.getElementById("youtubeVideosGrid"),
  youtubeShortsGrid: document.getElementById("youtubeShortsGrid"),
  loginBtn: document.getElementById("loginBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  subscribeBtn: document.getElementById("subscribeBtn"),
  authModal: document.getElementById("authModal"),
  closeModal: document.getElementById("closeModal"),
  googleLogin: document.getElementById("googleLogin"),
  facebookLogin: document.getElementById("facebookLogin"),
  authMessage: document.getElementById("authMessage"),
  anjaliProfileTrigger: document.getElementById("anjaliProfileTrigger"),
  anjaliSidePanel: document.getElementById("anjaliSidePanel"),
  anjaliPanelBackdrop: document.getElementById("anjaliPanelBackdrop"),
  closeAnjaliPanel: document.getElementById("closeAnjaliPanel"),
};

function getVisibleUpdates() {
  const loggedIn = Boolean(appState.user);
  return latestRecipes.filter((item) => !item.premiumOnly || loggedIn);
}

let currentSlide = 0;
let currentRecipeSlide = 0;
let currentComingSlide = 0;
let slideInterval;
let recipeSlideInterval;
let comingSlideInterval;

function renderMessageCarousel(messages) {
  if (!el.messageCarousel) return;

  el.messageCarousel.innerHTML = messages
    .map(
      (msg, index) => `
      <article class="value-card ${index === 0 ? 'active' : ''}" style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${msg.image}'); background-size: cover; background-position: center;">
        <p style="color: white; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${msg.text}</p>
      </article>`
    )
    .join("");

  const dotsContainer = document.getElementById('slideshowDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = messages
      .map((_, index) => `<span class="slideshow-dot ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></span>`)
      .join("");
  }

  startSlideshow();
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.value-card');
  const dots = document.querySelectorAll('.slideshow-dot');
  
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  resetSlideshow();
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.value-card');
  const dots = document.querySelectorAll('.slideshow-dot');
  
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = index;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  resetSlideshow();
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function resetSlideshow() {
  clearInterval(slideInterval);
  startSlideshow();
}

window.changeSlide = changeSlide;
window.goToSlide = goToSlide;

function changeRecipeSlide(direction) {
  const slides = document.querySelectorAll('#recipeCarousel .carousel-card');
  const dots = document.querySelectorAll('#recipeSlideshowDots .slideshow-dot');
  
  if (!slides.length) return;
  
  slides[currentRecipeSlide].classList.remove('active');
  dots[currentRecipeSlide].classList.remove('active');
  
  currentRecipeSlide = (currentRecipeSlide + direction + slides.length) % slides.length;
  
  slides[currentRecipeSlide].classList.add('active');
  dots[currentRecipeSlide].classList.add('active');
  
  resetRecipeSlideshow();
}

function goToRecipeSlide(index) {
  const slides = document.querySelectorAll('#recipeCarousel .carousel-card');
  const dots = document.querySelectorAll('#recipeSlideshowDots .slideshow-dot');
  
  if (!slides.length) return;
  
  slides[currentRecipeSlide].classList.remove('active');
  dots[currentRecipeSlide].classList.remove('active');
  
  currentRecipeSlide = index;
  
  slides[currentRecipeSlide].classList.add('active');
  dots[currentRecipeSlide].classList.add('active');
  
  resetRecipeSlideshow();
}

function startRecipeSlideshow() {
  recipeSlideInterval = setInterval(() => {
    changeRecipeSlide(1);
  }, 5000);
}

function resetRecipeSlideshow() {
  clearInterval(recipeSlideInterval);
  startRecipeSlideshow();
}

window.changeRecipeSlide = changeRecipeSlide;
window.goToRecipeSlide = goToRecipeSlide;

function renderComingSoonCarousel(items) {
  const container = el.comingSoonCarousel;
  if (!container) return;

  container.innerHTML = items
    .map(
      (item, index) => `
      <article class="carousel-card ${index === 0 ? 'active' : ''}" style="background: linear-gradient(135deg, #fff 0%, #f5f5f5 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 1.5rem;">
        <img src="${item.image}" alt="${item.title}" style="width: 80%; max-width: 200px; border-radius: 12px; margin-bottom: 1rem;" onerror="this.src='${fallbackRecipeImage}'" />
        <h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">${item.title}</h3>
        <p class="small" style="color: var(--muted);">${item.note}</p>
      </article>`
    )
    .join("");

  const dotsContainer = document.getElementById('comingSlideshowDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = items
      .map((_, index) => `<span class="slideshow-dot ${index === 0 ? 'active' : ''}" onclick="goToComingSlide(${index})"></span>`)
      .join("");
  }

  startComingSlideshow();
}

function changeComingSlide(direction) {
  const slides = document.querySelectorAll('#comingSoonCarousel .carousel-card');
  const dots = document.querySelectorAll('#comingSlideshowDots .slideshow-dot');
  
  if (!slides.length) return;
  
  slides[currentComingSlide].classList.remove('active');
  dots[currentComingSlide].classList.remove('active');
  
  currentComingSlide = (currentComingSlide + direction + slides.length) % slides.length;
  
  slides[currentComingSlide].classList.add('active');
  dots[currentComingSlide].classList.add('active');
  
  resetComingSlideshow();
}

function goToComingSlide(index) {
  const slides = document.querySelectorAll('#comingSoonCarousel .carousel-card');
  const dots = document.querySelectorAll('#comingSlideshowDots .slideshow-dot');
  
  if (!slides.length) return;
  
  slides[currentComingSlide].classList.remove('active');
  dots[currentComingSlide].classList.remove('active');
  
  currentComingSlide = index;
  
  slides[currentComingSlide].classList.add('active');
  dots[currentComingSlide].classList.add('active');
  
  resetComingSlideshow();
}

function startComingSlideshow() {
  comingSlideInterval = setInterval(() => {
    changeComingSlide(1);
  }, 5000);
}

function resetComingSlideshow() {
  clearInterval(comingSlideInterval);
  startComingSlideshow();
}

window.changeComingSlide = changeComingSlide;
window.goToComingSlide = goToComingSlide;

function renderCarousel(items) {
  if (!el.carousel) return;

  el.carousel.innerHTML = items
    .map(
      (item, index) => `
      <article class="carousel-card ${index === 0 ? 'active' : ''}" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.image}'); background-size: cover; background-position: center; display: flex; flex-direction: column;">
        ${item.premiumOnly ? `<span class="premium-pill" title="Login required">${item.badge || "PREMIUM"}</span>` : ""}
        <div class="card-body" style="background: rgba(255,255,255,0.95); margin-top: auto;">
          <h3>${item.title}</h3>
          <p class="small">${item.note}</p>
        </div>
      </article>`
    )
    .join("");

  const dotsContainer = document.getElementById('recipeSlideshowDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = items
      .map((_, index) => `<span class="slideshow-dot ${index === 0 ? 'active' : ''}" onclick="goToRecipeSlide(${index})"></span>`)
      .join("");
  }

  startRecipeSlideshow();
}

function renderRecipeGrid(container, recipes) {
  container.innerHTML = recipes
    .map(
      (recipe) => `
      <article class="recipe-card">
        <img src="${recipe.image || fallbackRecipeImage}" alt="${recipe.title}" loading="lazy" onerror="this.src='${fallbackRecipeImage}'" />
        <div class="card-body">
          <h3>${recipe.title}</h3>
          <p class="small">${recipe.level} • ${recipe.time}</p>
        </div>
      </article>`
    )
    .join("");
}

function renderYoutubeGrid(container, items, emptyMessage) {
  console.log('renderYoutubeGrid called:', container?.id, 'items:', items.length);
  if (!container) return;

  if (!items.length) {
    // Show static fallback content instead of error message
    if (container.id === 'youtubeVideosGrid') {
      container.innerHTML = `
        <a href="https://youtube.com/@cookalongwithanjali" target="_blank" rel="noreferrer" class="video-card-link">
          <article class="video-card">
            <img src="assets/images/gatte-ki-sabzi.jpg" alt="Gatte Ki Sabzi" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80'" />
            <div class="card-body">
              <h3>Gatte Ki Sabzi</h3>
              <p class="small">Traditional Rajasthani Recipe</p>
            </div>
          </article>
        </a>
        <a href="https://youtube.com/@cookalongwithanjali" target="_blank" rel="noreferrer" class="video-card-link">
          <article class="video-card">
            <img src="assets/images/dal-tadka-jeera-rice.jpg" alt="Dal Tadka & Jeera Rice" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80'" />
            <div class="card-body">
              <h3>Dal Tadka & Jeera Rice</h3>
              <p class="small">Comfort Food Classic</p>
            </div>
          </article>
        </a>
        <a href="https://youtube.com/@cookalongwithanjali" target="_blank" rel="noreferrer" class="video-card-link">
          <article class="video-card">
            <img src="assets/images/chole-bhature.jpg" alt="Chole Bhature" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=900&q=80'" />
            <div class="card-body">
              <h3>Chole Bhature</h3>
              <p class="small">Weekend Special</p>
            </div>
          </article>
        </a>
      `;
    } else if (container.id === 'youtubeShortsGrid') {
      container.innerHTML = `
        <a href="https://youtube.com/@cookalongwithanjali" target="_blank" rel="noreferrer" class="shorts-card-link">
          <article class="shorts-card">
            <img src="assets/images/poha.png" alt="Quick Poha" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80'" />
            <div class="card-body">
              <h3>Quick Poha</h3>
              <p class="small">15 min breakfast</p>
            </div>
          </article>
        </a>
        <a href="https://youtube.com/@cookalongwithanjali" target="_blank" rel="noreferrer" class="shorts-card-link">
          <article class="shorts-card">
            <img src="assets/images/spinach-corn-sandwich.jpg" alt="Spinach Corn Sandwich" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80'" />
            <div class="card-body">
              <h3>Spinach Corn Sandwich</h3>
              <p class="small">Quick snack idea</p>
            </div>
          </article>
        </a>
        <a href="https://youtube.com/@cookalongwithanjali" target="_blank" rel="noreferrer" class="shorts-card-link">
          <article class="shorts-card">
            <img src="assets/images/rajasthani-kadhi.png" alt="Rajasthani Kadhi" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80'" />
            <div class="card-body">
              <h3>Rajasthani Kadhi</h3>
              <p class="small">Traditional recipe</p>
            </div>
          </article>
        </a>
      `;
    }
    return;
  }

  const isShorts = container.id === 'youtubeShortsGrid';
  const linkClass = isShorts ? 'shorts-card-link' : 'video-card-link';
  const cardClass = isShorts ? 'shorts-card' : 'video-card';

  container.innerHTML = items
    .map(
      (video) => `
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer" class="${linkClass}">
        <article class="${cardClass}">
          <img src="${video.thumb}" alt="${video.title}" loading="lazy" />
          <div class="card-body">
            <h3>${video.title}</h3>
            <p class="small">${video.views.toLocaleString()} views</p>
          </div>
        </article>
      </a>`
    )
    .join("");
}

function setAuthMessage(message, isError = false) {
  el.authMessage.textContent = message;
  el.authMessage.style.color = isError ? "#b23316" : "#41674f";
}

function toggleAuthModal(open) {
  el.authModal.classList.toggle("hidden", !open);
  el.authModal.setAttribute("aria-hidden", String(!open));
  if (!open) setAuthMessage("");
}

function toggleAnjaliPanel(open) {
  if (!el.anjaliSidePanel || !el.anjaliPanelBackdrop) return;

  el.anjaliPanelBackdrop.classList.toggle("hidden", !open);
  el.anjaliSidePanel.classList.toggle("hidden", !open);
  requestAnimationFrame(() => {
    el.anjaliSidePanel.classList.toggle("open", open);
  });
  el.anjaliSidePanel.setAttribute("aria-hidden", String(!open));
}


function updateUiForUser() {
  const loggedIn = Boolean(appState.user);
  el.loginBtn.classList.toggle("hidden", loggedIn);
  el.logoutBtn.classList.toggle("hidden", !loggedIn);
  el.subscribeBtn.classList.toggle("hidden", !loggedIn || appState.subscribed);
  el.premiumSection.classList.toggle("hidden", !appState.subscribed);
  renderCarousel(getVisibleUpdates());
}

async function loadSubscriptionStatus(uid) {
  const storageKey = `cwa_member_${uid}`;
  appState.subscribed = localStorage.getItem(storageKey) === "true";
  updateUiForUser();
}

async function resolveChannelIdByHandle(apiKey, handle) {
  const cleanHandle = (handle || "").replace(/^@/, "").trim();
  if (!cleanHandle) return null;

  const channelSearchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  channelSearchUrl.searchParams.set("key", apiKey);
  channelSearchUrl.searchParams.set("part", "snippet");
  channelSearchUrl.searchParams.set("type", "channel");
  channelSearchUrl.searchParams.set("maxResults", "1");
  channelSearchUrl.searchParams.set("q", cleanHandle);

  const res = await fetch(channelSearchUrl);
  if (!res.ok) return null;
  const json = await res.json();
  return json.items?.[0]?.snippet?.channelId || null;
}

function parseDurationSeconds(duration) {
  const match = duration?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function isShortVideo(item) {
  const title = (item.snippet?.title || "").toLowerCase();
  const durationSec = parseDurationSeconds(item.contentDetails?.duration || "");
  return title.includes("#shorts") || (durationSec > 0 && durationSec <= 65);
}

async function fetchYouTubeContent() {
  const missingConfigMessage =
    "Add YOUTUBE_CONFIG.apiKey in config.js. Optionally set channelId or channelHandle.";

  if (!window.YOUTUBE_CONFIG || !window.YOUTUBE_CONFIG.apiKey || window.YOUTUBE_CONFIG.apiKey.startsWith("YOUR_")) {
    renderYoutubeGrid(el.youtubeVideosGrid, [], missingConfigMessage);
    renderYoutubeGrid(el.youtubeShortsGrid, [], missingConfigMessage);
    return;
  }

  const { apiKey, maxResults } = window.YOUTUBE_CONFIG;
  let channelId = window.YOUTUBE_CONFIG.channelId;

  if (!channelId && window.YOUTUBE_CONFIG.channelHandle) {
    channelId = await resolveChannelIdByHandle(apiKey, window.YOUTUBE_CONFIG.channelHandle);
  }

  if (!channelId) {
    renderYoutubeGrid(el.youtubeVideosGrid, [], "Could not resolve channel from handle. Add channelId in config.js.");
    renderYoutubeGrid(el.youtubeShortsGrid, [], "Could not resolve channel from handle. Add channelId in config.js.");
    return;
  }

  try {
    const searchUrl = new URL("https://www.googleapis.com/youtube/v3/search");
    searchUrl.searchParams.set("key", apiKey);
    searchUrl.searchParams.set("channelId", channelId);
    searchUrl.searchParams.set("part", "snippet");
    searchUrl.searchParams.set("order", "date");
    searchUrl.searchParams.set("maxResults", String(maxResults || 30));
    searchUrl.searchParams.set("type", "video");

    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) {
      console.error('Search API failed:', searchRes.status);
      throw new Error("Could not fetch channel videos");
    }
    const searchJson = await searchRes.json();
    const ids = (searchJson.items || []).map((item) => item.id.videoId).filter(Boolean);

    if (!ids.length) {
      console.log('No video IDs found');
      renderYoutubeGrid(el.youtubeVideosGrid, [], "No videos found on channel.");
      renderYoutubeGrid(el.youtubeShortsGrid, [], "No shorts found on channel.");
      return;
    }

    const videoUrl = new URL("https://www.googleapis.com/youtube/v3/videos");
    videoUrl.searchParams.set("key", apiKey);
    videoUrl.searchParams.set("id", ids.join(","));
    videoUrl.searchParams.set("part", "snippet,statistics,contentDetails");

    const videoRes = await fetch(videoUrl);
    if (!videoRes.ok) {
      console.error('Videos API failed:', videoRes.status);
      throw new Error("Could not fetch video stats");
    }
    const videoJson = await videoRes.json();

    const normalized = (videoJson.items || []).map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
      views: Number(item.statistics?.viewCount || 0),
      isShort: isShortVideo(item),
    }));

    const topVideos = normalized
      .filter((item) => !item.isShort)
      .sort((a, b) => b.views - a.views)
      .slice(0, 4);

    const topShorts = normalized
      .filter((item) => item.isShort)
      .sort((a, b) => b.views - a.views)
      .slice(0, 4);

    console.log('Videos loaded:', topVideos.length, 'Shorts loaded:', topShorts.length);
    renderYoutubeGrid(el.youtubeVideosGrid, topVideos, "No long-form videos found.");
    renderYoutubeGrid(el.youtubeShortsGrid, topShorts, "No shorts found yet.");
  } catch (err) {
    console.error('YouTube fetch error:', err);
    renderYoutubeGrid(el.youtubeVideosGrid, [], "Could not load videos. Check API key/quota/channel settings.");
    renderYoutubeGrid(el.youtubeShortsGrid, [], "Could not load shorts. Check API key/quota/channel settings.");
  }
}

function initStaticContent() {
  renderMessageCarousel(kitchenMessages);
  renderCarousel(getVisibleUpdates());
  renderComingSoonCarousel(comingSoonItems);
  if (el.freeRecipes) renderRecipeGrid(el.freeRecipes, freeRecipes);
  if (el.premiumRecipes) renderRecipeGrid(el.premiumRecipes, premiumRecipes);
  renderYoutubeGrid(el.youtubeVideosGrid, [], "");
  renderYoutubeGrid(el.youtubeShortsGrid, [], "");
}

function initAuthHandlers() {
  if (!window.firebase || !auth) return;

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  el.loginBtn.addEventListener("click", () => toggleAuthModal(true));
  el.closeModal.addEventListener("click", () => toggleAuthModal(false));

  if (el.anjaliProfileTrigger && el.anjaliSidePanel) {
    el.anjaliProfileTrigger.addEventListener("click", () => toggleAnjaliPanel(true));
    el.anjaliProfileTrigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleAnjaliPanel(true);
      }
    });
    el.closeAnjaliPanel?.addEventListener("click", () => toggleAnjaliPanel(false));
    el.anjaliPanelBackdrop?.addEventListener("click", () => toggleAnjaliPanel(false));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") toggleAnjaliPanel(false);
    });
  }

  el.googleLogin.addEventListener("click", async () => {
    try {
      await auth.signInWithPopup(googleProvider);
      toggleAuthModal(false);
    } catch (err) {
      setAuthMessage(err.message, true);
    }
  });

  el.facebookLogin.addEventListener("click", async () => {
    try {
      await auth.signInWithPopup(facebookProvider);
      toggleAuthModal(false);
    } catch (err) {
      setAuthMessage(err.message, true);
    }
  });

  el.logoutBtn.addEventListener("click", async () => {
    await auth.signOut();
  });

  el.subscribeBtn.addEventListener("click", async () => {
    if (!appState.user) {
      alert("Please log in first.");
      return;
    }
    const storageKey = `cwa_member_${appState.user.uid}`;
    localStorage.setItem(storageKey, "true");
    appState.subscribed = true;
    updateUiForUser();
    alert("Free membership activated. Premium content unlocked.");
  });
}

function initAuthStateObserver() {
  if (!auth) return;

  auth.onAuthStateChanged(async (user) => {
    appState.user = user;

    if (user) {
      await loadSubscriptionStatus(user.uid);
    } else {
      appState.subscribed = false;
      updateUiForUser();
    }
  });
}

let auth = null;
if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey) {
  firebase.initializeApp(window.FIREBASE_CONFIG);
  auth = firebase.auth();
} else {
  console.warn("Missing Firebase values in config.js. Login/free membership is disabled.");
  el.loginBtn.disabled = true;
  el.loginBtn.textContent = "Login Disabled";
}

initStaticContent();
initAuthHandlers();
initAuthStateObserver();
fetchYouTubeContent();
