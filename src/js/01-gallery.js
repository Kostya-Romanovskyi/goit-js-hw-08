// Add imports above this line\

//added simplelightBox library
import SimpleLightbox from 'simplelightbox';

//added styles for library`s markup
import 'simplelightbox/dist/simple-lightbox.min.css';

//backend
import { galleryItems } from './gallery-items';

// Change code below this line
const galary = document.querySelector('.gallery');

const itemsMarkup = onCreateGalaryElements();

// створення розмітки елементів галереї
function onCreateGalaryElements() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
             <a class="gallery__item" href="${original}">
                 <img class="gallery__image" 
                 loading="lazy"
                   src="${preview}" 
                   alt="${description}" />
            </a>
                </div>`;
    })
    .join('');
}

galary.innerHTML = itemsMarkup;

// Підключення та налаштування бібліотеки
var lightbox = new SimpleLightbox('.gallery a', {
  showCounter: false,
  captionsData: 'alt',
  captionDelay: 250,
  widthRatio: 0.9,
  heightRatio: 0.9,
});
console.log(galleryItems);
