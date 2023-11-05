fs = require('fs');
var name = 'phonelisting.json';
var m = JSON.parse(fs.readFileSync(name).toString());
let path = './phone_default_images/'
m.forEach(function(p){
    //populate to avoid null
    // if (p.disabled == '') {
    //     p.disabled = 'No'
    // } else {
    //     p.disabled = 'Yes'
    // }
    //p.disabled = 'No'

    //rename reviews as rating
    // p.ratings = p.reviews
    // delete p.reviews

    //console.log(p.title)
    //
    // //rename image to images
    // p.images = p.image
    // delete p.image
    //
    // //change images field
    // fs.readdirSync(path).forEach(file => {
    //     //Print file name
    //     if (file.toString().includes('jpeg')) {
    //         //console.log(file.toString().replace('.jpeg', ''))
    //         if (p.brand.toString() == file.toString().replace('.jpeg', '')) {
    //             p.images =file
    //             //console.log('../../../../dataset_dev/'+ file)
    //             //console.log(p.brand.toString() + " file " + file.toString().replace('.jpeg', ''))
    //         }
    //     }
    //
    // })
    //
    // //rename reviews to ratings
    //p.ratings = p.reviews
    // delete p.reviews
    //
    //rename rating to star
    //
    // p.ratings.forEach(r => {
    //     // r.star = r.rating
    //     // delete r.rating
    //     //console.log(r.star)
    //
    //     if (r.hasOwnProperty('hidden') ) {
    //         if (r.hidden== '') {
    //             r.hidden = 'No'
    //
    //         }
    //         console.log(p)
    //
    //
    //     }
    // })
    //console.log(p)
    //
    // //shorten title
    // if (p.title.toString().split(' ').length > 6) {
    //     //console.log(p.title.toString())
    //     //console.log(p.title.toString().split(' ').slice(0, 6).join(' '))
    //     p.title = p.title.toString().split(' ').slice(0, 6).join(' ')
    // }
    // //beatify title
    //p.title = p.title.toString().replace(/[\W_]+/g," ")
    //
    // //add slug
    //p.slug = p.title.toLowerCase() + p.seller + p.stock
});
fs.writeFileSync(name, JSON.stringify(m));





