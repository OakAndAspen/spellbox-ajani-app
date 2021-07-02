export default function (context, inject) {
    const imgSrc = (path) => require('~/assets/images/' + path);
    inject('imgSrc', imgSrc);
}
