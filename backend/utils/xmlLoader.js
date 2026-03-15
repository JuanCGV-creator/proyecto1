const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');

const parser = new xml2js.Parser({ explicitArray: false });

function loadProductsFromXML() {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../data/productos.xml');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error("Error reading XML file:", err);
                return reject(err);
            }

            parser.parseString(data, (err, result) => {
                if (err) {
                    console.error("Error parsing XML:", err);
                    return reject(err);
                }

                // Ensure result.productos.producto is always an array
                let products = result.productos.producto;
                if (!Array.isArray(products)) {
                    products = [products];
                }

                // Normalize products
                products = products.map(p => ({
                    id: p.$ && p.$.id ? p.$.id : p.id,
                    nombre: p.nombre,
                    categoria: p.categoria,
                    precio: parseFloat(p.precio) || 0,
                    stock: parseInt(p.stock) || 0
                }));

                resolve(products);
            });
        });
    });
}



function saveProductsToXML(products) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '../data/productos.xml');

        // Convert to XML structure
        // Root: <productos> Item: <producto>
        const builder = new xml2js.Builder({
            rootName: 'productos',
            headless: true,
            renderOpts: { pretty: true, indent: '    ', newline: '\n' }
        });

        // Map internal product structure to XML-friendly object if necessary
        // Current internal: { id, nombre, categoria, precio, stock }
        // We probably want attributes for id like <producto id="101">
        const xmlObj = {
            producto: products.map(p => ({
                $: { id: p.id },
                nombre: p.nombre,
                categoria: p.categoria,
                precio: p.precio,
                stock: p.stock
            }))
        };

        try {
            const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + builder.buildObject(xmlObj);
            fs.writeFile(filePath, xml, (err) => {
                if (err) {
                    console.error("Error writing XML:", err);
                    return reject(err);
                }
                resolve(true);
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = { loadProductsFromXML, saveProductsToXML };
