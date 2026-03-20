export function renderFacturacion() {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3>Historial de Facturación</h3>
            <button class="btn-primary" id="btnNuevaFactura"><i class="fas fa-plus"></i> Nueva Factura</button>
        </div>
        
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
                <td><button class="btn-primary btn-sm"><i class="fas fa-download"></i> PDF</button></td>
            </tr>
            <tr>
                <td><strong>#FAC-1024</strong></td>
                <td>Empresa ABC Ltda</td>
                <td>26 Nov 2025</td>
                <td>$2.500.000</td>
                <td><span class="badge badge-warning">Pendiente</span></td>
                <td><button class="btn-primary btn-sm"><i class="fas fa-download"></i> PDF</button></td>
            </tr>
        </table>
    `;
}

export function renderNuevaFactura() {
    return `
        <div class="invoice-container">
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
                    <div class="form form-clean">
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
                    <div class="form form-clean">
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
                    </tbody>
                </table>
                <button class="btn-primary btn-sm"><i class="fas fa-plus"></i> Agregar Ítem</button>
            </div>

            <div class="invoice-footer">
                <div class="invoice-totals">
                    <div class="total-row"><span>Subtotal:</span><span>$0</span></div>
                    <div class="total-row final"><span>TOTAL A PAGAR:</span><span>$0</span></div>
                </div>
            </div>

            <div class="mt-40 text-center">
                <button class="btn-primary btn-lg"><i class="fas fa-save"></i> Guardar y Generar Factura</button>
                <button class="btn-danger ml-10" id="btnCancelarFactura">Cancelar</button>
            </div>
        </div>
    `;
}
