export function renderDistribucion() {
    return `
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
                </div>
            </div>

            <div>
                <h3>Mapa de Ruta en Vivo</h3>
                <div class="map-placeholder h-500">
                    <div class="text-center">
                        <i class="fas fa-map-marked-alt icon-xl mb-20"></i>
                        <br>
                        Vista de Mapa Interactivo
                        <br>
                        <small>(Integración con Google Maps API)</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}
