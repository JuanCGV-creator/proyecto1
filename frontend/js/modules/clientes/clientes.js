export function renderClientes() {
    return `
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
}
