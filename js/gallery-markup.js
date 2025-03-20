import images from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryItemsMarkup(images);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join("");
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  const imageEl = evt.target;

  if (!imageEl.classList.contains("gallery-image")) {
    return;
  }

  createModal(imageEl.dataset.source);
}

function createModal(element) {
  const instance = basicLightbox.create(
    `
	<img src="${element}">
`,
    {
      handler: null,
      onShow(instance) {
        this.handler = closeModal.bind(instance);
        document.addEventListener("keydown", this.handler);
      },

      onClose() {
        document.removeEventListener("keydown", this.handler);
      },
    }
  );

  instance.show();
}

function closeModal(evt) {
  if (evt.code === "Escape") {
    this.close();
  }
}
