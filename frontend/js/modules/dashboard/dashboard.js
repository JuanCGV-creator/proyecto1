export function renderDashboard() {
    return `
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
}
