// Conexión a la base de datos SQLite
var db = openDatabase('carros_db', '1.0', 'Base de datos de Carros', 2 * 1024 * 1024);

// Función para crear la tabla en la base de datos si no existe
function crearTablaCarros() {
    db.transaction(function (tx) {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS carros (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, fecha_mantenimiento DATE NOT NULL, intervalo_mantenimiento INTEGER NOT NULL)',
            [],
            function (tx, result) {
                console.log('Tabla de carros creada correctamente.');
            },
            function (tx, error) {
                console.error('Error al crear la tabla de carros:', error.message);
            }
        );
    });
}

// Función para agregar un nuevo carro a la base de datos
function agregarCarro(carro) {
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO carros (nombre, fecha_mantenimiento, intervalo_mantenimiento) VALUES (?, ?, ?)',
            [carro.nombre, carro.fecha_mantenimiento, carro.intervalo_mantenimiento],
            function (tx, result) {
                console.log('Carro agregado correctamente.');
                updateCarList();
            },
            function (tx, error) {
                console.error('Error al agregar el carro:', error.message);
            }
        );
    });
}

// Función para actualizar un carro existente en la base de datos
function actualizarCarro(carro) {
    db.transaction(function (tx) {
        tx.executeSql(
            'UPDATE carros SET nombre = ?, fecha_mantenimiento = ?, intervalo_mantenimiento = ? WHERE id = ?',
            [carro.nombre, carro.fecha_mantenimiento, carro.intervalo_mantenimiento, carro.id],
            function (tx, result) {
                console.log('Carro actualizado correctamente.');
                updateCarList();
            },
            function (tx, error) {
                console.error('Error al actualizar el carro:', error.message);
            }
        );
    });
}

// Función para eliminar un carro de la base de datos
function eliminarCarro(idCarro) {
    db.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM carros WHERE id = ?',
            [idCarro],
            function (tx, result) {
                console.log('Carro eliminado correctamente.');
                updateCarList();
            },
            function (tx, error) {
                console.error('Error al eliminar el carro:', error.message);
            }
        );
    });
}

// Función para obtener todos los carros de la base de datos
function obtenerCarros(callback) {
    db.transaction(function (tx) {
        tx.executeSql(
            'SELECT * FROM carros',
            [],
            function (tx, result) {
                var carros = [];
                for (var i = 0; i < result.rows.length; i++) {
                    var row = result.rows.item(i);
                    carros.push({
                        id: row.id,
                        nombre: row.nombre,
                        fecha_mantenimiento: row.fecha_mantenimiento,
                        intervalo_mantenimiento: row.intervalo_mantenimiento,
                    });
                }
                callback(carros);
            },
            function (tx, error) {
                console.error('Error al obtener los carros:', error.message);
                callback([]);
            }
        );
    });
}

// Llamamos a la función para crear la tabla al cargar la página
crearTablaCarros();
