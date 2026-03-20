export function renderProductos() {
    return `
        <div class="product-header">
            <h3><i class="fas fa-box-open"></i> Gestión de Productos</h3>
            <div class="header-actions">
                <button class="btn-primary" id="btnNuevoProducto"><i class="fas fa-plus"></i> Nuevo Producto</button>
            </div>
        </div>

        <div class="filters-container mt-15 mb-15">
            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" id="productSearchInput" placeholder="Buscar por nombre o código...">
            </div>
        </div>

        <div id="productsLoading" class="loading-container text-center">
            <i class="fas fa-spinner fa-spin" class="loading-icon text-primary icon-xl"></i>
            <p>Cargando productos...</p>
        </div>

        <div id="productsContainer" class="products-grid"></div>
        
        <button class="fab" id="fabNuevoProducto">
            <i class="fas fa-plus"></i>
        </button>

        <div id="productModal" class="modal">
            <div class="modal-content" style="max-width: 600px;">
                <span class="close-modal">&times;</span>
                <h3 id="modalTitle">Nuevo Producto</h3>
                <form id="productForm">
                    <input type="hidden" id="prodId">
                    <div class="form-group mb-15">
                        <label for="prodNombre">Nombre del Producto *</label>
                        <input type="text" id="prodNombre" class="form-control" required maxlength="120">
                    </div>
                    <div class="form-group mb-15">
                        <label for="prodDescripcion">Descripción</label>
                        <textarea id="prodDescripcion" class="form-control" rows="2"></textarea>
                    </div>
                    <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label for="prodCodigo">Código *</label>
                            <input type="text" id="prodCodigo" class="form-control" required maxlength="50">
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="prodCategoria">Categoría</label>
                            <input type="text" id="prodCategoria" class="form-control" list="categoriasList" maxlength="100">
                            <datalist id="categoriasList">
                                <option value="Automotriz">
                                <option value="Repuestos">
                                <option value="Herramientas">
                            </datalist>
                        </div>
                    </div>
                    <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label for="prodPrecio">Precio *</label>
                            <input type="number" id="prodPrecio" class="form-control" min="0" step="0.01" required>
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="prodEstado">Estado</label>
                            <select id="prodEstado" class="form-select">
                                <option value="ACTIVO">Activo</option>
                                <option value="INACTIVO">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                        <div class="form-group" style="flex: 1;">
                            <label for="prodStock">Stock Actual</label>
                            <input type="number" id="prodStock" class="form-control" min="0" value="0">
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="prodStockMin">Stock Mínimo</label>
                            <input type="number" id="prodStockMin" class="form-control" min="0" value="5">
                        </div>
                        <div class="form-group" style="flex: 1;">
                            <label for="prodUnidad">Unidad de Medida</label>
                            <select id="prodUnidad" class="form-select">
                                <option value="UNIDAD">Unidad</option>
                                <option value="LITRO">Litro</option>
                                <option value="GALON">Galón</option>
                                <option value="CAJA">Caja</option>
                                <option value="KG">Kilogramo</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-actions text-right mt-20">
                        <button type="button" class="btn-secondary mr-10 btn-cancelar">Cancelar</button>
                        <button type="submit" class="btn-primary">Guardar Producto</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

export async function initProductos() {
    setupEventListeners();
    await fetchProducts();
}

function setupEventListeners() {
    document.getElementById('btnNuevoProducto')?.addEventListener('click', () => openProductModal());
    document.getElementById('fabNuevoProducto')?.addEventListener('click', () => openProductModal());
    document.getElementById('productSearchInput')?.addEventListener('keyup', filterProducts);
    document.querySelector('.close-modal')?.addEventListener('click', closeProductModal);
    document.querySelector('.btn-cancelar')?.addEventListener('click', closeProductModal);
    document.getElementById('productForm')?.addEventListener('submit', saveProduct);
}

async function fetchProducts() {
    try {
        const response = await fetch('/api/productos');
        const data = await response.json();
        window.allProducts = data.productos || [];
        renderProductsList(window.allProducts);
        document.getElementById('productsLoading').style.display = 'none';
    } catch (error) {
        document.getElementById('productsLoading').innerHTML = `
            <i class="fas fa-exclamation-triangle text-danger icon-xl"></i>
            <p class="text-danger mt-10">Error al cargar productos: ${error.message}</p>
            <button class="btn-primary mt-10" id="btnReintentar"><i class="fas fa-sync"></i> Reintentar</button>
        `;
        document.getElementById('btnReintentar')?.addEventListener('click', () => initProductos());
    }
}

function renderProductsList(products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = products.length === 0 
        ? '<div class="loading-container label-sm" style="grid-column: 1/-1;">No se encontraron productos.</div>'
        : '';

    products.forEach(product => {
        const id = product.id_producto || product.id || 'N/A';
        const nombre = product.nombre_producto || product.nombre || 'Sin nombre';
        const codigo = product.codigo_producto || product.codigo || 'S/C';
        const precio = product.precio || 0;
        const stock = parseInt(product.stock) || 0;
        const stock_min = parseInt(product.stock_minimo) || 5;
        const estado = product.estado || 'ACTIVO';
        const unidad = product.unidad_medida || 'UNIDAD';

        let stockClass = "badge-stock-success";
        let stockText = 'En Stock';
        if (stock <= 0) { stockClass = 'badge-stock-danger'; stockText = 'Agotado'; }
        else if (stock <= stock_min) { stockClass = 'badge-stock-warning'; stockText = 'Bajo Stock'; }

        const card = document.createElement('div');
        card.className = 'product-card-item';
        card.style.position = 'relative';
        if (estado === 'INACTIVO') card.style.opacity = '0.7';

        card.innerHTML = `
            <div class="prod-header" style="justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">
                <span class="prod-id" style="font-weight: bold; color: #555;">${codigo}</span>
                <span class="prod-badge ${stockClass}">${stockText}</span>
            </div>
            <div class="prod-title" style="font-size: 1.1rem; min-height: 45px; margin-bottom: 10px;">${nombre}</div>
            <div class="prod-category" style="color: #666; font-size: 0.85rem;"><i class="fas fa-tag text-primary"></i> ${product.categoria || 'N/A'} | ${estado}</div>
            
            <div class="prod-details" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd;">
                <div class="prod-price" style="font-size: 1.25rem; font-weight: bold; color: var(--success);">$${parseFloat(precio).toLocaleString()}</div>
                <div class="prod-stock" style="font-size: 0.9rem; color: #555;"><strong>${stock}</strong> <span style="font-size: 0.75rem;">${unidad}</span></div>
            </div>
            
            <div class="mt-15" style="display: flex; gap: 10px; justify-content: flex-end; border-top: 1px solid #eee; padding-top: 10px;">
                 <button class="btn-text-primary btn-edit-prod" data-id="${id}"><i class="fas fa-edit"></i> Editar</button>
                 <button class="btn-text-danger btn-delete-prod" data-id="${id}" data-nombre="${nombre.replace(/'/g, "\\'")}"><i class="fas fa-trash"></i> Eliminar</button>
            </div>
        `;
        container.appendChild(card);
    });

    // Add event listeners for dynamic buttons
    document.querySelectorAll('.btn-edit-prod').forEach(btn => {
        btn.addEventListener('click', (e) => openProductModal(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.btn-delete-prod').forEach(btn => {
        btn.addEventListener('click', (e) => deleteProduct(e.currentTarget.dataset.id, e.currentTarget.dataset.nombre));
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearchInput').value.toLowerCase();
    const filtered = window.allProducts.filter(p => {
        const matchName = (p.nombre_producto || p.nombre || '').toLowerCase().includes(searchTerm);
        const matchCode = (p.codigo_producto || p.codigo || '').toString().toLowerCase().includes(searchTerm);
        return matchName || matchCode;
    });
    renderProductsList(filtered);
}

function openProductModal(id = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');

    form.reset();
    document.getElementById('prodId').value = '';

    if (id) {
        const product = window.allProducts.find(p => p.id_producto == id || p.id == id);
        if (product) {
            title.textContent = 'Editar Producto';
            document.getElementById('prodId').value = product.id_producto || product.id;
            document.getElementById('prodNombre').value = product.nombre_producto;
            document.getElementById('prodDescripcion').value = product.descripcion || '';
            document.getElementById('prodCodigo').value = product.codigo_producto;
            document.getElementById('prodCategoria').value = product.categoria || '';
            document.getElementById('prodPrecio').value = product.precio;
            document.getElementById('prodStock').value = product.stock;
            document.getElementById('prodStockMin').value = product.stock_minimo || 5;
            document.getElementById('prodUnidad').value = product.unidad_medida || 'UNIDAD';
            document.getElementById('prodEstado').value = product.estado || 'ACTIVO';
        }
    } else {
        title.textContent = 'Nuevo Producto';
    }
    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.style.display = 'none';
}

async function saveProduct(event) {
    event.preventDefault();
    const btnSubmit = event.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    const originalText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

    const id = document.getElementById('prodId').value;
    const payload = {
        nombre_producto: document.getElementById('prodNombre').value.trim(),
        descripcion: document.getElementById('prodDescripcion').value.trim(),
        codigo_producto: document.getElementById('prodCodigo').value.trim(),
        categoria: document.getElementById('prodCategoria').value.trim(),
        precio: parseFloat(document.getElementById('prodPrecio').value),
        stock: parseInt(document.getElementById('prodStock').value) || 0,
        stock_minimo: parseInt(document.getElementById('prodStockMin').value) || 5,
        unidad_medida: document.getElementById('prodUnidad').value,
        estado: document.getElementById('prodEstado').value
    };

    let url = '/api/productos';
    let method = 'POST';
    if (id) {
        url += `/${id}`;
        method = 'PUT';
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.success || response.ok) {
            closeProductModal();
            initProductos(); // Reload
            alert(`Producto ${id ? 'actualizado' : 'creado'} correctamente.`);
        } else {
            alert('Error al guardar: ' + (result.error || 'Desconocido'));
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión al guardar el producto');
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalText;
    }
}

async function deleteProduct(id, nombre) {
    if (!confirm(`¿Estás seguro que deseas eliminar el producto: ${nombre}? \nEsta acción no se puede deshacer.`)) return;

    try {
        const response = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
        const result = await response.json();
        if (result.success || response.ok) {
            initProductos();
            alert('Producto eliminado correctamente');
        } else {
            alert('Error al eliminar: ' + (result.error || 'Desconocido'));
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión al eliminar el producto');
    }
}
