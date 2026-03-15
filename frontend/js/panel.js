// --- Obtener referencias del DOM ---
const panelContent = document.getElementById("panelContent");
const tituloModulo = document.getElementById("tituloModulo");
const menuItems = document.querySelectorAll(".menu li");

// --- Cargar contenido dinámico ---
async function loadView(modulo) {
    // Actualizar título
    // tituloModulo.textContent = modulo.charAt(0).toUpperCase() + modulo.slice(1);

    // Actualizar clase activa en el menú
    menuItems.forEach(item => item.classList.remove("active"));
    const activeItem = Array.from(menuItems).find(item => item.getAttribute("onclick").includes(modulo));
    if (activeItem) activeItem.classList.add("active");

    switch (modulo) {
        case "dashboard":
            panelContent.innerHTML = `
                <div class="dashboard">
                    <div class="card" class="card-primary">
                        <div class="card-title" class="text-light">Ingresos Totales</div>
                        <div class="count" class="text-white">$12.5M</div>
                        <i class="fas fa-dollar-sign card-icon" class="icon-opacity"></i>
                    </div>
                    <div class="card">
                        <div class="card-title">Clientes Activos</div>
                        <div class="count">1,240</div>
                        <i class="fas fa-users card-icon"></i>
                    </div>
                    <div class="card">
                        <div class="card-title">Ventas del Mes</div>
                        <div class="count">345</div>
                        <i class="fas fa-shopping-cart card-icon"></i>
                    </div>
                    <div class="card">
                        <div class="card-title">Envíos en Ruta</div>
                        <div class="count">28</div>
                        <i class="fas fa-truck card-icon"></i>
                    </div>
                </div>

                <div class="dashboard-layout">
                    <!-- Tabla de Actividad -->
                    <div>
                        <h3 class="section-title">📦 Últimos Movimientos</h3>
                        <table class="data-table">
                            <tr><th>ID</th><th>Usuario</th><th>Acción</th><th>Estado</th></tr>
                            <tr><td>#1023</td><td>Juan Pérez</td><td>Nueva venta</td><td><span class="badge badge-success">Completado</span></td></tr>
                            <tr><td>#1024</td><td>Ana Gómez</td><td>Registro cliente</td><td><span class="badge badge-info">Nuevo</span></td></tr>
                            <tr><td>#1025</td><td>Carlos Ruiz</td><td>Envío despachado</td><td><span class="badge badge-warning">En Ruta</span></td></tr>
                            <tr><td>#1026</td><td>Maria Diaz</td><td>Devolución</td><td><span class="badge badge-danger">Pendiente</span></td></tr>
                            <tr><td>#1027</td><td>Pedro Alva</td><td>Pago factura</td><td><span class="badge badge-success">Completado</span></td></tr>
                        </table>
                    </div>

                    <!-- Gráficos / Estadísticas -->
                    <div class="chart-container">
                        <h3 class="section-title">📊 Metas Mensuales</h3>
                        
                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Ventas</span>
                                <span>85%</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill" style="width: 85%;"></div>
                            </div>
                        </div>

                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Nuevos Clientes</span>
                                <span>60%</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill bg-success" style="width: 60%;"></div>
                            </div>
                        </div>

                        <div class="progress-item">
                            <div class="progress-label">
                                <span>Envíos a Tiempo</span>
                                <span>92%</span>
                            </div>
                            <div class="progress-bar-bg">
                                <div class="progress-bar-fill bg-warning" style="width: 92%;"></div>
                            </div>
                        </div>

                        <div class="mt-30 text-center">
                            <button class="btn-primary btn-block">Ver Reporte Completo</button>
                        </div>
                    </div>
                </div>
            `;
            break;

        case "clientes":
            panelContent.innerHTML = `
                <div class="header-actions">
                    <h3>Gestión de Clientes</h3>
                    <button class="btn-primary"><i class="fas fa-user-plus"></i> Nuevo Cliente</button>
                </div>

                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar cliente por nombre, cédula o correo...">
                </div>

                <table class="data-table">
                    <tr><th>Cliente</th><th>Contacto</th><th>Ubicación</th><th>Estado</th><th>Acciones</th></tr>
                    <tr>
                        <td><strong>Carlos Pérez</strong><br><small>CC: 123456789</small></td>
                        <td>carlos@mail.com<br>310 123 4567</td>
                        <td>Bogotá, Calle 100 #15-20</td>
                        <td><span class="badge badge-success">Activo</span></td>
                        <td>
                            <button class="btn-icon btn-edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon btn-delete ml-10"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Maria Rodriguez</strong><br><small>CC: 987654321</small></td>
                        <td>maria@mail.com<br>320 987 6543</td>
                        <td>Medellín, Cra 70 #30-10</td>
                        <td><span class="badge badge-warning">Pendiente</span></td>
                        <td>
                            <button class="btn-icon btn-edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon btn-delete ml-10"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                </table>
            `;
            break;

        case "productos":
            panelContent.innerHTML = `
                <div class="product-header">
                    <h3><i class="fas fa-box-open"></i> Gestión de Productos</h3>
                    <div class="header-actions">
                        <button class="btn-primary" onclick="openProductModal()"><i class="fas fa-plus"></i> Nuevo Producto</button>
                    </div>
                </div>

                <!-- Search and Filters -->
                <div class="filters-container mt-15 mb-15">
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="productSearchInput" placeholder="Buscar por nombre o código..." onkeyup="filterProducts()">
                    </div>
                </div>

                <!-- Product List (Responsive Grid/Table) -->
                <div id="productsLoading" class="loading-container text-center">
                    <i class="fas fa-spinner fa-spin" class="loading-icon text-primary icon-xl"></i>
                    <p>Cargando productos...</p>
                </div>

                <div id="productsContainer" class="products-grid">
                    <!-- Products will be rendered here as Cards -->
                </div>
                
                <!-- Floating Action Button -->
                <button class="fab" onclick="openProductModal()">
                    <i class="fas fa-plus"></i>
                </button>

                <!-- Product Modal -->
                <div id="productModal" class="modal">
                    <div class="modal-content" style="max-width: 600px;">
                        <span class="close-modal" onclick="closeProductModal()">&times;</span>
                        <h3 id="modalTitle">Nuevo Producto</h3>
                        <form id="productForm" onsubmit="saveProduct(event)">
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
                                <button type="button" class="btn-secondary mr-10" onclick="closeProductModal()">Cancelar</button>
                                <button type="submit" class="btn-primary">Guardar Producto</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            // Fetch products from API
            fetch('/api/productos')
                .then(response => response.json())
                .then(data => {
                    window.allProducts = data.productos || [];
                    renderProducts(window.allProducts);
                    document.getElementById('productsLoading').style.display = 'none';
                })
                .catch(error => {
                    document.getElementById('productsLoading').innerHTML =
                        '<i class="fas fa-exclamation-triangle" class="loading-icon text-danger icon-xl"></i>' +
                        '<p class="text-danger mt-10">Error al cargar productos: ' + error.message + '</p>' +
                        '<button class="btn-primary mt-10" onclick="loadView(\'productos\')"><i class="fas fa-sync"></i> Reintentar</button>';
                });
            break;

        case "productosxml":
            panelContent.innerHTML = `
                <div class="product-header">
                    <h3><i class="fas fa-file-code"></i> Productos XML</h3>
                    <div class="header-actions">
                        <button class="btn-primary" onclick="openProductXmlModal()"><i class="fas fa-plus"></i> Nuevo Producto XML</button>
                        <button class="btn-primary" onclick="loadView('productosxml')" style="margin-left: 10px;"><i class="fas fa-sync"></i> Recargar</button>
                    </div>
                </div>

                <div class="filters-container mt-15 mb-15">
                    <div class="search-bar">
                        <i class="fas fa-search"></i>
                        <input type="text" id="productSearchInput" placeholder="Buscar por nombre o código..." onkeyup="filterProductsXml()">
                    </div>
                </div>

                <div id="xmlProductsLoading" class="loading-container text-center">
                    <i class="fas fa-spinner fa-spin" class="loading-icon text-primary icon-xl"></i>
                    <p>Cargando productos XML...</p>
                </div>

                <div id="productsContainer" class="products-grid">
                    <!-- Products will be rendered here -->
                </div>
                
                <!-- Product Modal XML -->
                <div id="productModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal" onclick="closeProductXmlModal()">&times;</span>
                        <h3 id="modalTitle">Nuevo Producto XML</h3>
                        <form id="productForm" onsubmit="saveProductXml(event)">
                            <input type="hidden" id="prodId">
                            
                            <div class="form-group mb-15">
                                <label for="prodNombre">Nombre</label>
                                <input type="text" id="prodNombre" class="form-control" required>
                            </div>

                            <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <div class="form-group" style="flex: 1;">
                                    <label for="prodCodigo">Código</label>
                                    <input type="text" id="prodCodigo" class="form-control" required>
                                </div>
                                <div class="form-group" style="flex: 1;">
                                    <label for="prodCategoria">Categoría</label>
                                    <input type="text" id="prodCategoria" class="form-control" list="categoriasList">
                                </div>
                            </div>

                            <div class="form-row" style="display: flex; gap: 15px; margin-bottom: 15px;">
                                <div class="form-group" style="flex: 1;">
                                    <label for="prodPrecio">Precio</label>
                                    <input type="number" id="prodPrecio" class="form-control" min="0" required>
                                </div>
                                <div class="form-group" style="flex: 1;">
                                    <label for="prodStock">Stock</label>
                                    <input type="number" id="prodStock" class="form-control" min="0" required>
                                </div>
                            </div>

                            <div class="form-actions text-right mt-20">
                                <button type="button" class="btn-secondary mr-10" onclick="closeProductXmlModal()">Cancelar</button>
                                <button type="submit" class="btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

            fetch('/api/productosxml')
                .then(response => response.json())
                .then(data => {
                    window.allProductsXml = data.productos || [];
                    renderProductsXml(window.allProductsXml);
                    document.getElementById('xmlProductsLoading').style.display = 'none';
                })
                .catch(error => {
                    document.getElementById('xmlProductsLoading').innerHTML =
                        '<i class="fas fa-exclamation-triangle" class="loading-icon text-danger icon-xl"></i>' +
                        '<p class="text-danger mt-10">Error al cargar productos: ' + error.message + '</p>' +
                        '<button class="btn-primary mt-10" onclick="loadView(\'productosxml\')"><i class="fas fa-sync"></i> Reintentar</button>';
                });
            break;

        case "ventas":
            panelContent.innerHTML = `
                            <div class="pos-container">
                    <div class="products-section">
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Buscar productos para la venta...">
                        </div>
                        <div class="product-grid">
                            <!-- Productos de ejemplo -->
                            <div class="product-card">
                                <i class="fas fa-oil-can" class="product-icon text-primary mb-10"></i>
                                <h4>Aceite 20W50</h4>
                                <p class="text-success fw-bold">$32.000</p>
                            </div>
                            <div class="product-card">
                                <i class="fas fa-car-battery" class="product-icon text-primary mb-10"></i>
                                <h4>Batería 12V</h4>
                                <p class="text-success fw-bold">$250.000</p>
                            </div>
                            <div class="product-card">
                                <i class="fas fa-tools" class="product-icon text-primary mb-10"></i>
                                <h4>Kit Herramientas</h4>
                                <p class="text-success fw-bold">$85.000</p>
                            </div>
                            <div class="product-card">
                                <i class="fas fa-filter" class="product-icon text-primary mb-10"></i>
                                <h4>Filtro Aire</h4>
                                <p class="text-success fw-bold">$15.000</p>
                            </div>
                             <div class="product-card">
                                <i class="fas fa-pump-soap" class="product-icon text-primary mb-10"></i>
                                <h4>Líquido Frenos</h4>
                                <p class="text-success fw-bold">$12.000</p>
                            </div>
                        </div>
                    </div>

                    <div class="cart-panel">
                        <h3><i class="fas fa-shopping-cart"></i> Carrito</h3>
                        <div class="my-15">
                            <label class="label-sm">Cliente:</label>
                            <select class="form-select">
                                <option>Consumidor Final</option>
                                <option>Carlos Pérez</option>
                            </select>
                        </div>
                        
                        <div class="cart-items">
                            <div class="cart-item">
                                <span>1x Aceite 20W50</span>
                                <strong>$32.000</strong>
                            </div>
                            <div class="cart-item">
                                <span>2x Filtro Aire</span>
                                <strong>$30.000</strong>
                            </div>
                        </div>

                        <div class="cart-total">
                            Total: $62.000
                        </div>
                        <button class="btn-primary btn-block mt-15">
                            <i class="fas fa-check"></i> Finalizar Venta
                        </button>
                    </div>
                </div >
                            `;
            break;

        case "facturacion":
            panelContent.innerHTML = `
                            <div style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Historial de Facturación</h3>
                    <button class="btn-primary" onclick="loadView('nueva-factura')"><i class="fas fa-plus"></i> Nueva Factura</button>
                </div >
                
                <div class="search-bar">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Buscar factura por ID o cliente...">
                </div>

                <table class="data-table">
                    <tr><th>ID Factura</th><th>Cliente</th><th>Fecha</th><th>Monto</th><th>Estado</th><th>Acciones</th></tr>
                    <tr>
                        <td><strong>#FAC-1023</strong></td>
                        <td>Juan Pérez</td>
                        <td>25 Nov 2025</td>
                        <td>$150.000</td>
                        <td><span class="badge badge-success">Pagada</span></td>
                        <td><button class="btn-primary" class="btn-sm"><i class="fas fa-download"></i> PDF</button></td>
                    </tr>
                    <tr>
                        <td><strong>#FAC-1024</strong></td>
                        <td>Empresa ABC Ltda</td>
                        <td>26 Nov 2025</td>
                        <td>$2.500.000</td>
                        <td><span class="badge badge-warning">Pendiente</span></td>
                        <td><button class="btn-primary" class="btn-sm"><i class="fas fa-download"></i> PDF</button></td>
                    </tr>
                </table>
                        `;
            break;

        case "nueva-factura":
            panelContent.innerHTML = `
                            < div class="invoice-container" >
                    <div class="invoice-header">
                        <div class="company-info">
                            <h2>MI EMPRESA S.A.S.</h2>
                            <p>NIT: 900.123.456-7</p>
                            <p>Dirección: Calle 100 # 15-20, Bogotá</p>
                            <p>Teléfono: (601) 123 4567</p>
                            <p><strong>Resolución DIAN No. 18760000001 de 2024-01-01</strong></p>
                            <p>Rango autorizado: FAC-1000 a FAC-5000</p>
                        </div>
                        <div class="invoice-details">
                            <h3>FACTURA DE VENTA</h3>
                            <p><strong>No. FAC-1025</strong></p>
                            <p>Fecha de Emisión: <input type="date" value="${new Date().toISOString().split('T')[0]}" class="input-sm"></p>
                            <p>Fecha de Vencimiento: <input type="date" class="input-sm"></p>
                        </div>
                    </div>

                    <div class="invoice-grid">
                        <div class="invoice-section">
                            <h4>Datos del Cliente</h4>
                            <div class="form" class="form-clean">
                                <label>Nombre / Razón Social</label>
                                <input type="text" placeholder="Ej: Juan Pérez">
                                <label>NIT / C.C.</label>
                                <input type="text" placeholder="Ej: 123456789">
                                <label>Dirección</label>
                                <input type="text" placeholder="Dirección completa">
                                <label>Teléfono</label>
                                <input type="text" placeholder="Teléfono de contacto">
                            </div>
                        </div>
                        <div class="invoice-section">
                            <h4>Forma de Pago</h4>
                            <div class="form" class="form-clean">
                                <label>Medio de Pago</label>
                                <select>
                                    <option>Efectivo</option>
                                    <option>Transferencia Bancaria</option>
                                    <option>Tarjeta de Crédito</option>
                                    <option>Crédito 30 Días</option>
                                </select>
                                <label>Vendedor</label>
                                <input type="text" value="Administrador" readonly>
                                <label>Observaciones</label>
                                <textarea rows="2" placeholder="Notas adicionales..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="invoice-section">
                        <h4>Detalle de Productos</h4>
                        <table class="invoice-items-table">
                            <thead>
                                <tr>
                                    <th class="w-10">Cód.</th>
                                    <th class="w-40">Descripción</th>
                                    <th class="w-10">Cant.</th>
                                    <th class="w-20">Vr. Unitario</th>
                                    <th class="w-20">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type="text" placeholder="001"></td>
                                    <td><input type="text" placeholder="Producto ejemplo"></td>
                                    <td><input type="number" value="1"></td>
                                    <td><input type="number" placeholder="0"></td>
                                    <td>$0</td>
                                </tr>
                                <tr>
                                    <td><input type="text" placeholder="002"></td>
                                    <td><input type="text" placeholder=""></td>
                                    <td><input type="number" value="1"></td>
                                    <td><input type="number" placeholder="0"></td>
                                    <td>$0</td>
                                </tr>
                            </tbody>
                        </table>
                        <button class="btn-primary" class="btn-sm"><i class="fas fa-plus"></i> Agregar Ítem</button>
                    </div>

                    <div class="invoice-footer">
                        <div class="invoice-totals">
                            <div class="total-row">
                                <span>Subtotal:</span>
                                <span>$0</span>
                            </div>
                            <div class="total-row">
                                <span>Descuento:</span>
                                <span>$0</span>
                            </div>
                            <div class="total-row">
                                <span>IVA (19%):</span>
                                <span>$0</span>
                            </div>
                            <div class="total-row final">
                                <span>TOTAL A PAGAR:</span>
                                <span>$0</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-40 text-center">
                        <button class="btn-primary" class="btn-primary btn-lg"><i class="fas fa-save"></i> Guardar y Generar Factura</button>
                        <button class="btn-danger ml-10" onclick="loadView('facturacion')">Cancelar</button>
                    </div>
                </div>
            `;
            break;

        case "distribucion":
            panelContent.innerHTML = `
                <div class="grid-2col gap-30">
                    <div>
                        <h3>Seguimiento de Envíos</h3>
                        <div class="search-bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Número de guía...">
                        </div>

                        <div class="timeline">
                            <div class="timeline-item">
                                <div class="timeline-date">Hoy, 10:30 AM</div>
                                <div class="timeline-content">
                                    <strong>Entregado</strong>
                                    <p>El paquete fue recibido por Carlos Pérez.</p>
                                    <span class="badge badge-success">Completado</span>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-date">Hoy, 08:15 AM</div>
                                <div class="timeline-content">
                                    <strong>En Ruta de Entrega</strong>
                                    <p>El conductor va en camino a la dirección de destino.</p>
                                    <span class="badge badge-info">En Camino</span>
                                </div>
                            </div>
                             <div class="timeline-item">
                                <div class="timeline-date">Ayer, 04:00 PM</div>
                                <div class="timeline-content">
                                    <strong>Salida de Centro de Distribución</strong>
                                    <p>El paquete ha salido de la bodega principal.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3>Mapa de Ruta en Vivo</h3>
                        <div class="map-placeholder" class="h-500">
                            <div class="text-center">
                                <i class="fas fa-map-marked-alt" class="icon-xl mb-20"></i>
                                <br>
                                Vista de Mapa Interactivo
                                <br>
                                <small>(Integración con Google Maps API)</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;

        case "notificaciones":
            panelContent.innerHTML = `
                <h3>Centro de Notificaciones</h3>

                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-date">Hace 5 minutos</div>
                        <div class="timeline-content">
                            <strong><i class="fas fa-check-circle" class="text-success"></i> Pago Recibido</strong>
                            <p>Se ha confirmado el pago de la factura #FAC-1023 por $150.000.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Hace 1 hora</div>
                        <div class="timeline-content">
                            <strong><i class="fas fa-box" class="text-info"></i> Stock Bajo</strong>
                            <p>El producto "Filtro de Aire" tiene menos de 5 unidades disponibles.</p>
                            <span class="badge badge-warning">Alerta de Stock</span>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date">Hace 3 horas</div>
                        <div class="timeline-content">
                            <strong><i class="fas fa-user-plus" class="text-primary"></i> Nuevo Usuario</strong>
                            <p>Bienvenido al sistema, Administrador.</p>
                        </div>
                    </div>
                </div>
            `;
            break;

        default:
            panelContent.innerHTML = "<p>Módulo no encontrado.</p>";
            break;
    }
}

// --- Logout ---
function cerrarSesion() {
    location.href = "/login";
}

// --- Toggle Sidebar (Mobile) ---
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("active");
}

// --- Cargar módulo inicial ---

// --- PRODUCT 2.0 LOGIC ---

function renderProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<div class="loading-container label-sm" style="grid-column: 1/-1;">No se encontraron productos.</div>';
        return;
    }

    products.forEach(product => {
        // Adapt fields to match MySQL columns: id_producto, nombre_producto, codigo_producto
        const id = product.id_producto || product.id || 'N/A';
        const nombre = product.nombre_producto || product.nombre || 'Sin nombre';
        const codigo = product.codigo_producto || product.codigo || 'S/C';
        const categoria = product.categoria || 'N/A';
        const precio = product.precio || 0;
        const stock = parseInt(product.stock) || 0;
        const stock_min = parseInt(product.stock_minimo) || 5;
        const estado = product.estado || 'ACTIVO';
        const unidad = product.unidad_medida || 'UNIDAD';

        let stockClass = "badge-stock-success";
        let stockText = 'En Stock';
        if (stock <= 0) { stockClass = 'badge-stock-danger'; stockText = 'Agotado'; }
        else if (stock <= stock_min) { stockClass = 'badge-stock-warning'; stockText = 'Bajo Stock'; }

        // Card Template
        const card = document.createElement('div');
        card.className = 'product-card-item';
        card.style.position = 'relative';
        if (estado === 'INACTIVO') {
            card.style.opacity = '0.7';
        }

        card.innerHTML = `
            <div class="prod-header" style="justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">
                <span class="prod-id" style="font-weight: bold; color: #555;">${codigo}</span>
                <span class="prod-badge" class="${stockClass}">${stockText}</span>
            </div>
            <div class="prod-title" style="font-size: 1.1rem; min-height: 45px; margin-bottom: 10px;">${nombre}</div>
            <div class="prod-category" style="color: #666; font-size: 0.85rem;"><i class="fas fa-tag text-primary"></i> ${categoria} | ${estado}</div>
            
            <div class="prod-details" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd;">
                <div class="prod-price" style="font-size: 1.25rem; font-weight: bold; color: var(--success);">$${parseFloat(precio).toLocaleString()}</div>
                <div class="prod-stock" style="font-size: 0.9rem; color: #555;"><strong>${stock}</strong> <span style="font-size: 0.75rem;">${unidad}</span></div>
            </div>
            
            <div class="mt-15" style="display: flex; gap: 10px; justify-content: flex-end; border-top: 1px solid #eee; padding-top: 10px;">
                 <button onclick="openProductModal('${id}')" class="btn-text-primary" style="background: none; border: none; cursor: pointer; color: var(--primary); font-weight: bold;"><i class="fas fa-edit"></i> Editar</button>
                 <button onclick="deleteProduct('${id}', '${nombre.replace(/'/g, "\\'")}')" class="btn-text-danger" style="background: none; border: none; cursor: pointer; color: var(--danger); font-weight: bold;"><i class="fas fa-trash"></i> Eliminar</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('productSearchInput').value.toLowerCase();

    const filtered = window.allProducts.filter(p => {
        const matchName = (p.nombre_producto || p.nombre || '').toLowerCase().includes(searchTerm);
        const matchCode = (p.codigo_producto || p.codigo || '').toString().toLowerCase().includes(searchTerm);
        return matchName || matchCode;
    });

    renderProducts(filtered);
}

// Modal & Form Logic
function openProductModal(id = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');

    // Reset Form
    form.reset();
    document.getElementById('prodId').value = '';

    if (id) {
        // Edit Mode
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
        // Create Mode
        title.textContent = 'Nuevo Producto';
    }

    modal.style.display = 'flex';
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

async function saveProduct(event) {
    event.preventDefault();
    const btnSubmit = event.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

    const id = document.getElementById('prodId').value;

    // Preparar el payload mapeando a las columnas de BD
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
            loadView('productos'); // Reload list
            alert(`Producto ${id ? 'actualizado' : 'creado'} correctamente.`);
        } else {
            alert('Error al guardar: ' + (result.error || 'Desconocido'));
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión al guardar el producto');
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Guardar Producto';
    }
}

async function deleteProduct(id, nombre) {
    if (!confirm(`¿Estás seguro que deseas eliminar el producto: ${nombre}? Esta acción no se puede deshacer.`)) {
        return;
    }

    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success || response.ok) {
            loadView('productos');
            alert('Producto eliminado correctamente');
        } else {
            alert('Error al eliminar: ' + (result.error || 'Desconocido'));
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión al eliminar el producto');
    }
}

// --- PRODUCT XML LOGIC ORIGINAL ---
function renderProductsXml(products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (products.length === 0) {
        container.innerHTML = '<div class="loading-container label-sm" style="grid-column: 1/-1;">No se encontraron productos.</div>';
        return;
    }

    products.forEach(product => {
        const id = product.id || 'N/A';
        const nombre = product.nombre || 'Sin nombre';
        const categoria = product.categoria || 'Sin categoría';
        const precio = product.precio || 0;
        const stock = parseInt(product.stock) || 0;

        let stockClass = "badge-stock-success";
        let stockText = 'En Stock';
        if (stock <= 0) { stockClass = 'badge-stock-danger'; stockText = 'Agotado'; }
        else if (stock <= 10) { stockClass = 'badge-stock-warning'; stockText = 'Bajo Stock'; }

        const card = document.createElement('div');
        card.className = 'product-card-item';
        card.innerHTML = `
            <div class="prod-header" style="justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">
                <span class="prod-id" style="font-weight: bold; color: #555;">#${id}</span>
                <span class="prod-badge" class="${stockClass}">${stockText}</span>
            </div>
            <div class="prod-title" style="font-size: 1.1rem; min-height: 45px; margin-bottom: 10px;">${nombre}</div>
            <div class="prod-category" style="color: #666; font-size: 0.85rem;"><i class="fas fa-tag text-primary"></i> ${categoria}</div>
            
            <div class="prod-details" style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd;">
                <div class="prod-price" style="font-size: 1.25rem; font-weight: bold; color: var(--success);">$${parseInt(precio).toLocaleString()}</div>
                <div class="prod-stock" style="font-size: 0.9rem; color: #555;"><strong>${stock}</strong> un.</div>
            </div>
            
            <div class="mt-15" style="display: flex; gap: 10px; justify-content: flex-end; border-top: 1px solid #eee; padding-top: 10px;">
                 <button onclick="openProductXmlModal('${id}')" class="btn-text-primary" style="background: none; border: none; cursor: pointer; color: var(--primary); font-weight: bold;"><i class="fas fa-edit"></i> Editar</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterProductsXml() {
    const searchTerm = document.getElementById('productSearchInput').value.toLowerCase();
    const filtered = window.allProductsXml.filter(p => {
        const matchName = (p.nombre || '').toLowerCase().includes(searchTerm);
        const matchCode = (p.codigo || '').toString().toLowerCase().includes(searchTerm);
        return matchName || matchCode;
    });
    renderProductsXml(filtered);
}

function openProductXmlModal(id = null) {
    const modal = document.getElementById('productModal');
    const title = document.getElementById('modalTitle');
    const form = document.getElementById('productForm');

    form.reset();
    document.getElementById('prodId').value = '';

    if (id) {
        const product = window.allProductsXml.find(p => p.id == id);
        if (product) {
            title.textContent = 'Editar Producto XML';
            document.getElementById('prodId').value = product.id;
            document.getElementById('prodNombre').value = product.nombre;
            document.getElementById('prodCodigo').value = product.codigo || '';
            document.getElementById('prodCategoria').value = product.categoria;
            document.getElementById('prodPrecio').value = product.precio;
            document.getElementById('prodStock').value = product.stock;
        }
    } else {
        title.textContent = 'Nuevo Producto XML';
    }
    modal.style.display = 'flex';
}

function closeProductXmlModal() {
    document.getElementById('productModal').style.display = 'none';
}

async function saveProductXml(event) {
    event.preventDefault();
    const id = document.getElementById('prodId').value;
    const nombre = document.getElementById('prodNombre').value;
    const codigo = document.getElementById('prodCodigo').value;
    const categoria = document.getElementById('prodCategoria').value;
    const precio = document.getElementById('prodPrecio').value;
    const stock = document.getElementById('prodStock').value;

    const payload = { nombre, codigo, categoria, precio, stock };
    let url = '/api/productosxml';
    let method = 'POST';
    if (id) { url += `/${id}`; method = 'PUT'; }

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (result.success || response.ok) {
            closeProductXmlModal();
            loadView('productosxml');
        } else {
            alert('Error al guardar: ' + (result.error || 'Desconocido'));
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
}


// Close modal if clicked outside
window.onclick = function (event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        closeProductModal();
    }
}

