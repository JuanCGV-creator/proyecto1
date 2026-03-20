export function renderProductosXml() {
    return `
        <div class="product-header">
            <h3><i class="fas fa-file-code"></i> Productos XML</h3>
            <div class="header-actions">
                <button class="btn-primary" id="btnNuevoProductoXml"><i class="fas fa-plus"></i> Nuevo Producto XML</button>
                <button class="btn-primary ml-10" id="btnRecargarXml"><i class="fas fa-sync"></i> Recargar</button>
            </div>
        </div>

        <div class="filters-container mt-15 mb-15">
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" id="xmlSearchInput" placeholder="Buscar por nombre o código...">
            </div>
        </div>

        <div id="xmlProductsLoading" class="loading-container text-center">
            <i class="fas fa-spinner fa-spin" class="loading-icon text-primary icon-xl"></i>
            <p>Cargando productos XML...</p>
        </div>

        <div id="xmlProductsContainer" class="products-grid"></div>
        
        <div id="xmlProductModal" class="modal">
            <div class="modal-content">
                <span class="close-modal-xml">&times;</span>
                <h3 id="modalTitleXml">Nuevo Producto XML</h3>
                <form id="productFormXml">
                    <input type="hidden" id="prodIdXml">
                    <div class="form-group mb-15">
                        <label for="prodNombreXml">Nombre</label>
                        <input type="text" id="prodNombreXml" class="form-control" required>
                    </div>
                    <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label for="prodCodigoXml">Código</label>
                            <input type="text" id="prodCodigoXml" class="form-control" required>
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="prodCategoriaXml">Categoría</label>
                            <input type="text" id="prodCategoriaXml" class="form-control">
                        </div>
                    </div>
                    <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label for="prodPrecioXml">Precio</label>
                            <input type="number" id="prodPrecioXml" class="form-control" min="0" required>
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="prodStockXml">Stock</label>
                            <input type="number" id="prodStockXml" class="form-control" min="0" required>
                        </div>
                    </div>
                    <div class="form-actions text-right mt-20">
                        <button type="button" class="btn-secondary mr-10 btn-cancelar-xml">Cancelar</button>
                        <button type="submit" class="btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

export async function initProductosXml() {
    setupEventListeners();
    await fetchProductsXml();
}

function setupEventListeners() {
    document.getElementById('btnNuevoProductoXml')?.addEventListener('click', () => openProductXmlModal());
    document.getElementById('btnRecargarXml')?.addEventListener('click', () => initProductosXml());
    document.getElementById('xmlSearchInput')?.addEventListener('keyup', filterProductsXml);
    document.querySelector('.close-modal-xml')?.addEventListener('click', closeProductXmlModal);
    document.querySelector('.btn-cancelar-xml')?.addEventListener('click', closeProductXmlModal);
    document.getElementById('productFormXml')?.addEventListener('submit', saveProductXml);
}

async function fetchProductsXml() {
    try {
        const response = await fetch('/api/productosxml');
        const data = await response.json();
        window.allProductsXml = data.productos || [];
        renderXmlProductsList(window.allProductsXml);
        document.getElementById('xmlProductsLoading').style.display = 'none';
    } catch (error) {
        document.getElementById('xmlProductsLoading').innerHTML = `
            <i class="fas fa-exclamation-triangle text-danger icon-xl"></i>
            <p class="text-danger mt-10">Error al cargar productos XML: ${error.message}</p>
        `;
    }
}

function renderXmlProductsList(products) {
    const container = document.getElementById('xmlProductsContainer');
    if (!container) return;

    container.innerHTML = products.length === 0 
        ? '<div class="loading-container label-sm" style="grid-column: 1/-1;">No se encontraron productos.</div>'
        : '';

    products.forEach(product => {
        const id = product.id || 'N/A';
        const stock = parseInt(product.stock) || 0;
        let stockClass = stock <= 0 ? 'badge-stock-danger' : (stock <= 10 ? 'badge-stock-warning' : 'badge-stock-success');
        let stockText = stock <= 0 ? 'Agotado' : (stock <= 10 ? 'Bajo Stock' : 'En Stock');

        const card = document.createElement('div');
        card.className = 'product-card-item';
        card.innerHTML = `
            <div class="prod-header" style="justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">
                <span class="prod-id" style="font-weight: bold; color: #555;">#${id}</span>
                <span class="prod-badge ${stockClass}">${stockText}</span>
            </div>
            <div class="prod-title" style="font-size: 1.1rem; min-height: 45px; margin-bottom: 10px;">${product.nombre}</div>
            <div class="prod-category" style="color: #666; font-size: 0.85rem;"><i class="fas fa-tag text-primary"></i> ${product.categoria}</div>
            <div class="prod-details" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd;">
                <div class="prod-price" style="font-size: 1.25rem; font-weight: bold; color: var(--success);">$${parseInt(product.precio).toLocaleString()}</div>
                <div class="prod-stock" style="font-size: 0.9rem; color: #555;"><strong>${stock}</strong> un.</div>
            </div>
            <div class="mt-15" style="display: flex; gap: 10px; justify-content: flex-end; border-top: 1px solid #eee; padding-top: 10px;">
                 <button class="btn-text-primary btn-edit-xml" data-id="${id}"><i class="fas fa-edit"></i> Editar</button>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.btn-edit-xml').forEach(btn => {
        btn.addEventListener('click', (e) => openProductXmlModal(e.currentTarget.dataset.id));
    });
}

function filterProductsXml() {
    const searchTerm = document.getElementById('xmlSearchInput').value.toLowerCase();
    const filtered = window.allProductsXml.filter(p => 
        (p.nombre || '').toLowerCase().includes(searchTerm) || 
        (p.codigo || '').toString().toLowerCase().includes(searchTerm)
    );
    renderXmlProductsList(filtered);
}

function openProductXmlModal(id = null) {
    const modal = document.getElementById('xmlProductModal');
    document.getElementById('productFormXml').reset();
    document.getElementById('prodIdXml').value = '';

    if (id) {
        const product = window.allProductsXml.find(p => p.id == id);
        if (product) {
            document.getElementById('modalTitleXml').textContent = 'Editar Producto XML';
            document.getElementById('prodIdXml').value = product.id;
            document.getElementById('prodNombreXml').value = product.nombre;
            document.getElementById('prodCodigoXml').value = product.codigo || '';
            document.getElementById('prodCategoriaXml').value = product.categoria;
            document.getElementById('prodPrecioXml').value = product.precio;
            document.getElementById('prodStockXml').value = product.stock;
        }
    }
    modal.style.display = 'flex';
}

function closeProductXmlModal() {
    document.getElementById('xmlProductModal').style.display = 'none';
}

async function saveProductXml(event) {
    event.preventDefault();
    const id = document.getElementById('prodIdXml').value;
    const payload = {
        nombre: document.getElementById('prodNombreXml').value,
        codigo: document.getElementById('prodCodigoXml').value,
        categoria: document.getElementById('prodCategoriaXml').value,
        precio: document.getElementById('prodPrecioXml').value,
        stock: document.getElementById('prodStockXml').value
    };

    let url = '/api/productosxml';
    let method = id ? 'PUT' : 'POST';
    if (id) url += `/${id}`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            closeProductXmlModal();
            initProductosXml();
        } else {
            alert('Error al guardar producto XML');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
}
