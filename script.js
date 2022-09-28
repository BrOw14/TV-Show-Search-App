const form = document.querySelector('#searchForm');
const imgs = document.querySelector('#imgs');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    imgs.innerHTML = '';
    const searchTerm = form.elements.query.value;
    const config = { params: {q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    console.log(res.data);
    form.elements.query.value = '';
})

const makeImages = (shows) => {
    for (let result of shows){
        if (result.show.image) {
            const site = document.createElement('a');
            const div = document.createElement('div')
            const img = document.createElement('IMG');
            const title = document.createElement('span');
            div.classList.add('divItems')
            img.src = result.show.image.medium;
            img.classList.add('items');
            title.innerText = result.show.name;
            site.append(img);
            site.href = result.show.officialSite;
            site.target = '_blank'
            div.append(site);
            div.append(title);
            imgs.append(div);
        }
    }
}