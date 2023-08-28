document.addEventListener("DOMContentLoaded", function () {
  const imagesToLoad = document.querySelectorAll("img[data-src]");

  const options = {
    threshold: 0.5, // Intersection ratio at which the image will be loaded
  };

  const loadImage = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {
      image.removeAttribute("data-src");
    };
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  imagesToLoad.forEach((image) => {
    imageObserver.observe(image);
  });
});
