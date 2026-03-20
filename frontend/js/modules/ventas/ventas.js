export function renderVentas() {
    return `
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
}
