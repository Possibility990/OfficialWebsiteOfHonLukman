const fs = require('fs')
const path = require('path');
const News = require('../models/news')


exports.newsDetails =  async (req, res, next) => {
    console.log('news details hit')
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).send('News ID is required');
        }

        const newsItem = await News.findById(id);

        if (!newsItem) {
            return res.status(404).send('News not found');
        }

        // Find the first section containing an image
        const previewImage = newsItem.sections.find(
            section => section.image
        )?.image;

        // Read the Webpack-generated HTML
       const htmlPath = path.join(
    __dirname,
    '../public/newsDetails.html'
);

        let html = await fs.promises.readFile(htmlPath, 'utf8');
     

        // Prepare metadata
        const title = escapeHtml(newsItem.title);
        const description = escapeHtml(newsItem.curiosityGap);
        const image = previewImage || 'https://mudasiru.com/images/homebg2.jpg';
        const url = `https://mudasiru.com/newsDetails.html?id=${encodeURIComponent(id)}`;
         
        // for local testing
    //    const url = `http://localhost:5000/newsDetails.html?id=${encodeURIComponent(id)}`;

        // Insert Open Graph metadata
        const metadata = `
            <meta property="og:type" content="article">
            <meta property="og:title" content="${title}">
            <meta property="og:description" content="${description}">
            <meta property="og:image" content="${escapeHtml(image)}">
            <meta property="og:url" content="${escapeHtml(url)}">
            <meta property="og:site_name" content="Hon. L&K Official Website">
            <meta name="twitter:card" content="summary_large_image">
        `;

       html = html
    .replace('__OG_TITLE__', title)
    .replace('__OG_DESCRIPTION__', description)
    .replace('__OG_IMAGE__', escapeHtml(image))
    .replace('__OG_URL__', escapeHtml(url));
   

        res.set('Content-Type', 'text/html');
        res.send(html);
    

    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to load news article');
    }
};


function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[char]);
}