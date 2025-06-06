const allTriggers = [
      {
        name: "Auditoría de Visitas",
        create_table: {
          enunciado: "Crea una tabla llamada `auditoria_visitas` para registrar operaciones sobre las visitas.",
          estructura: [
            { hint: "Eliminar si existe", correct: "DROP TABLE IF EXISTS auditoria_visitas;" },
            { hint: "Crear tabla", correct: "CREATE TABLE auditoria_visitas (" },
            { hint: "Columna operación", correct: "operacion VARCHAR(50)," },
            { hint: "Columna mascota_id", correct: "mascota_id INT," },
            { hint: "Columna veterinario_id", correct: "veterinario_id INT," },
            { hint: "Columna fecha", correct: "fecha DATETIME," },
            { hint: "Columna cliente", correct: "cliente VARCHAR(200)" },
            { hint: "Cerrar paréntesis", correct: ");" }
          ],
          fragments: [
            "DROP TABLE IF EXISTS auditoria_visitas;",
            "CREATE TABLE auditoria_visitas (",
            "operacion VARCHAR(50),",
            "mascota_id INT,",
            "veterinario_id INT,",
            "fecha DATETIME,",
            "cliente VARCHAR(200)",
            ");"
          ]
        },
        create_trigger: {
          enunciado: "Crea un trigger `after_insert_visitas` que registre cada nueva visita en la tabla de auditoría.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Crear trigger", correct: "CREATE TRIGGER after_insert_visitas" },
            { hint: "Después de insertar", correct: "AFTER INSERT ON visitas" },
            { hint: "Por cada fila", correct: "FOR EACH ROW" },
            { hint: "Inicio bloque", correct: "BEGIN" },
            { hint: "Insertar registro - Tabla", correct: "INSERT INTO auditoria_visitas" },
            { hint: "Columnas", correct: "(operacion, mascota_id, veterinario_id, fecha, cliente)" },
            { hint: "Valores", correct: "VALUES ('INSERT', NEW.mascota_id, NEW.veterinario_id, NOW(), CURRENT_USER());" },
            { hint: "Fin bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE TRIGGER after_insert_visitas",
            "AFTER INSERT ON visitas",
            "FOR EACH ROW",
            "BEGIN",
            "INSERT INTO auditoria_visitas",
            "(operacion, mascota_id, veterinario_id, fecha, cliente)",
            "VALUES ('INSERT', NEW.mascota_id, NEW.veterinario_id, NOW(), CURRENT_USER());",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Realiza una inserción en `visitas` y consulta la tabla de auditoría.",
          estructura: [
            { hint: "Inserción - Comando", correct: "INSERT INTO" },
            { hint: "Tabla y columnas", correct: "visitas (mascota_id, veterinario_id)" },
            { hint: "Valores", correct: "VALUES (1, 1);" },
            { hint: "Consulta auditoría", correct: "SELECT * FROM auditoria_visitas;" }
          ],
          fragments: [
            "INSERT INTO",
            "visitas (mascota_id, veterinario_id)",
            "VALUES (1, 1);",
            "SELECT * FROM auditoria_visitas;"
          ]
        },
        drop: {
          enunciado: "Elimina el trigger y la tabla de auditoría.",
          estructura: [
            { hint: "Borrar trigger", correct: "DROP TRIGGER after_insert_visitas;" },
            { hint: "Borrar tabla", correct: "DROP TABLE auditoria_visitas;" }
          ],
          fragments: [
            "DROP TRIGGER after_insert_visitas;",
            "DROP TABLE auditoria_visitas;"
          ]
        }
      },
      {
        name: "Validar Edad Antes de Insertar",
        create_table: {
          enunciado: "Crea una tabla llamada `logs_validacion` para registrar errores de validación.",
          estructura: [
            { hint: "Eliminar si existe", correct: "DROP TABLE IF EXISTS logs_validacion;" },
            { hint: "Crear tabla", correct: "CREATE TABLE logs_validacion (" },
            { hint: "ID", correct: "id INT AUTO_INCREMENT PRIMARY KEY," },
            { hint: "Mensaje", correct: "mensaje VARCHAR(255)," },
            { hint: "Fecha", correct: "fecha DATETIME" },
            { hint: "Cerrar paréntesis", correct: ");" }
          ],
          fragments: [
            "DROP TABLE IF EXISTS logs_validacion;",
            "CREATE TABLE logs_validacion (",
            "id INT AUTO_INCREMENT PRIMARY KEY,",
            "mensaje VARCHAR(255),",
            "fecha DATETIME",
            ");"
          ]
        },
        create_trigger: {
          enunciado: "Crea un trigger que evite insertar usuarios con edad negativa.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Crear trigger", correct: "CREATE TRIGGER validar_datos_antes_insertar" },
            { hint: "Antes de insertar", correct: "BEFORE INSERT ON usuarios" },
            { hint: "Por cada fila", correct: "FOR EACH ROW" },
            { hint: "Inicio bloque", correct: "BEGIN" },
            { hint: "Condición IF", correct: "IF NEW.edad < 0 THEN" },
            { hint: "Insertar log", correct: "INSERT INTO logs_validacion (mensaje, fecha)" },
            { hint: "Valores log", correct: "VALUES ('Edad negativa no permitida', NOW());" },
            { hint: "Lanzar error", correct: "SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La edad no puede ser negativa';" },
            { hint: "Fin condición", correct: "END IF;" },
            { hint: "Fin bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE TRIGGER validar_datos_antes_insertar",
            "BEFORE INSERT ON usuarios",
            "FOR EACH ROW",
            "BEGIN",
            "IF NEW.edad < 0 THEN",
            "INSERT INTO logs_validacion (mensaje, fecha)",
            "VALUES ('Edad negativa no permitida', NOW());",
            "SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La edad no puede ser negativa';",
            "END IF;",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Intenta insertar un usuario con edad negativa y verifica el log.",
          estructura: [
            { hint: "Inserción - Comando", correct: "INSERT INTO" },
            { hint: "Tabla y columnas", correct: "usuarios (nombre, edad)" },
            { hint: "Valores", correct: "VALUES ('Ana', -5);" },
            { hint: "Consulta log", correct: "SELECT * FROM logs_validacion;" }
          ],
          fragments: [
            "INSERT INTO",
            "usuarios (nombre, edad)",
            "VALUES ('Ana', -5);",
            "SELECT * FROM logs_validacion;"
          ]
        },
        drop: {
          enunciado: "Elimina el trigger y la tabla de logs.",
          estructura: [
            { hint: "Borrar trigger", correct: "DROP TRIGGER validar_datos_antes_insertar;" },
            { hint: "Borrar tabla", correct: "DROP TABLE logs_validacion;" }
          ],
          fragments: [
            "DROP TRIGGER validar_datos_antes_insertar;",
            "DROP TABLE logs_validacion;"
          ]
        }
      },
      {
        name: "Registro de Actualizaciones",
        create_table: {
          enunciado: "Crea una tabla `registro_actualizaciones` para registrar cambios en usuarios.",
          estructura: [
            { hint: "Eliminar si existe", correct: "DROP TABLE IF EXISTS registro_actualizaciones;" },
            { hint: "Crear tabla", correct: "CREATE TABLE registro_actualizaciones (" },
            { hint: "ID", correct: "id INT AUTO_INCREMENT PRIMARY KEY," },
            { hint: "Nombre anterior", correct: "nombre_anterior VARCHAR(100)," },
            { hint: "Nombre nuevo", correct: "nombre_nuevo VARCHAR(100)," },
            { hint: "Fecha", correct: "fecha DATETIME" },
            { hint: "Cerrar paréntesis", correct: ");" }
          ],
          fragments: [
            "DROP TABLE IF EXISTS registro_actualizaciones;",
            "CREATE TABLE registro_actualizaciones (",
            "id INT AUTO_INCREMENT PRIMARY KEY,",
            "nombre_anterior VARCHAR(100),",
            "nombre_nuevo VARCHAR(100),",
            "fecha DATETIME",
            ");"
          ]
        },
        create_trigger: {
          enunciado: "Crea un trigger que registre los cambios en nombres de usuarios.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Crear trigger", correct: "CREATE TRIGGER registrar_cambios_usuarios" },
            { hint: "Después de actualizar", correct: "AFTER UPDATE ON usuarios" },
            { hint: "Por cada fila", correct: "FOR EACH ROW" },
            { hint: "Inicio bloque", correct: "BEGIN" },
            { hint: "Insertar cambio", correct: "INSERT INTO registro_actualizaciones (nombre_anterior, nombre_nuevo, fecha)" },
            { hint: "Valores cambio", correct: "VALUES (OLD.nombre, NEW.nombre, NOW());" },
            { hint: "Fin bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE TRIGGER registrar_cambios_usuarios",
            "AFTER UPDATE ON usuarios",
            "FOR EACH ROW",
            "BEGIN",
            "INSERT INTO registro_actualizaciones (nombre_anterior, nombre_nuevo, fecha)",
            "VALUES (OLD.nombre, NEW.nombre, NOW());",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Actualiza un usuario y verifica el registro de cambios.",
          estructura: [
            { hint: "Actualizar usuario", correct: "UPDATE usuarios SET nombre = 'Carlos' WHERE id = 1;" },
            { hint: "Consultar registro", correct: "SELECT * FROM registro_actualizaciones;" }
          ],
          fragments: [
            "UPDATE usuarios SET nombre = 'Carlos' WHERE id = 1;",
            "SELECT * FROM registro_actualizaciones;"
          ]
        },
        drop: {
          enunciado: "Elimina el trigger y la tabla de registro.",
          estructura: [
            { hint: "Borrar trigger", correct: "DROP TRIGGER registrar_cambios_usuarios;" },
            { hint: "Borrar tabla", correct: "DROP TABLE registro_actualizaciones;" }
          ],
          fragments: [
            "DROP TRIGGER registrar_cambios_usuarios;",
            "DROP TABLE registro_actualizaciones;"
          ]
        }
      }
    ];

    let currentTriggerIndex = 0;
    let currentPhase = "create_table";
    let score = 0;

    const phaseText = document.getElementById("phaseText");
    const triggerNameText = document.getElementById("triggerNameText");
    const enunciadoDiv = document.getElementById("enunciado");
    const targetsDiv = document.getElementById("targets");
    const fragmentsDiv = document.getElementById("fragments");
    const timerSpan = document.getElementById("timer");
    const scoreSpan = document.getElementById("score");
    const difficultySelect = document.getElementById("difficulty");

    function startTimer() {
      let time;

      const level = difficultySelect.value;

      if (level === "principiante") time = 120;
      else if (level === "intermedio") time = 60;
      else if (level === "avanzado") time = 30;

      timerSpan.textContent = time;
      clearInterval(window.timer);

      window.timer = setInterval(() => {
        time--;
        timerSpan.textContent = time;
        if (time <= 0) {
          clearInterval(window.timer);
          Swal.fire({
            title: '⏱️ ¡Tiempo agotado!',
            text: 'Se reiniciará el ejercicio.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          }).then(() => loadCurrentPhase());
        }
      }, 1000);
    }

    function loadCurrentPhase() {
      const trigger = allTriggers[currentTriggerIndex];
      let data;

      if (currentPhase === "create_table") {
        data = trigger.create_table;
        phaseText.textContent = "Crear Tabla";
      } else if (currentPhase === "create_trigger") {
        data = trigger.create_trigger;
        phaseText.textContent = "Crear Trigger";
      } else if (currentPhase === "execute") {
        data = trigger.execute;
        phaseText.textContent = "Ejecutar Acción";
      } else if (currentPhase === "drop") {
        data = trigger.drop;
        phaseText.textContent = "Borrar Trigger y Tabla";
      }

      triggerNameText.textContent = trigger.name;
      enunciadoDiv.textContent = data.enunciado;
      fragmentsDiv.innerHTML = "";
      targetsDiv.innerHTML = "";

      // Crear zonas objetivo
      data.estructura.forEach((linea) => {
        const drop = document.createElement("div");
        drop.className = "drop-target border-2 border-dashed p-2 rounded code-line border-gray-500";
        drop.dataset.hint = linea.hint;
        drop.ondragover = e => e.preventDefault();
        drop.ondrop = e => {
          const dragged = e.dataTransfer.getData("text");
          if (dragged === linea.correct) {
            drop.textContent = dragged;
            drop.classList.add("bg-green-900"); // ✅ Ahora es green-900
            correctSound.play();
            drop.ondrop = null;
            [...fragmentsDiv.children].forEach(el => {
              if (el.textContent === dragged) el.remove();
            });
            score += 10; // ✅ Sumar puntos
            scoreSpan.textContent = score;
            checkCompletion(data);
          } else {
            drop.classList.add("bg-red-100");
            wrongSound.play();
            setTimeout(() => drop.classList.remove("bg-red-100"), 1000);
          }
        };
        targetsDiv.appendChild(drop);
      });

      // Fragmentos desordenados
      const shuffled = [...data.fragments].sort(() => 0.5 - Math.random());
      shuffled.forEach(text => {
        const el = document.createElement("div");
        el.textContent = text;
        el.draggable = true;
        el.className = "bg-blue-900 p-2 rounded cursor-move mb-1";
        el.ondragstart = e => e.dataTransfer.setData("text", text);
        fragmentsDiv.appendChild(el);
      });

      startTimer();
    }

    function checkCompletion(data) {
      const filled = [...targetsDiv.children].length === data.estructura.length &&
                     [...targetsDiv.children].every(el => el.textContent.trim() !== "");

      if (filled) {
        clearInterval(window.timer);
        Swal.fire({
          title: '✅ Fase completada',
          html: `<strong>Todos los fragmentos colocados correctamente.</strong><br/>
                  <pre class="bg-gray-800 text-green-400 p-3 rounded mt-2">Query OK, 0 rows affected (0.01 sec)</pre>`,
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(() => nextPhase());
      }
    }

    function nextPhase() {
      const keys = Object.keys(allTriggers[currentTriggerIndex]);
      const currentIndex = keys.indexOf(currentPhase);

      if (currentIndex < keys.length - 1 && keys[currentIndex + 1] !== "delete") {
        currentPhase = keys[currentIndex + 1];
      } else {
        if (currentTriggerIndex < allTriggers.length - 1) {
          currentTriggerIndex++;
          currentPhase = "create_table";
          Swal.fire({
            title: '🎉 ¡Ejercicio completado!',
            text: 'Pasando al siguiente...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: '🏆 ¡Todos los triggers completados!',
            text: '¡Has terminado todos los ejercicios!',
            icon: 'success',
            confirmButtonText: 'Volver a empezar'
          }).then(() => {
            currentTriggerIndex = 0;
            currentPhase = "create_table";
            score = 0;
            scoreSpan.textContent = 0;
            loadCurrentPhase();
          });
        }
      }

      loadCurrentPhase();
    }

    function restartBtnHandler() {
      currentTriggerIndex = 0;
      currentPhase = "create_table";
      score = 0;
      scoreSpan.textContent = 0;
      loadCurrentPhase();
    }

    // Manejo de dificultad
    difficultySelect.addEventListener("change", () => {
      Swal.fire({
        title: '🔄 ¿Reiniciar ejercicio?',
        text: 'Cambiar el nivel reiniciará la actividad.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          loadCurrentPhase(); // Vuelve a cargar con el nuevo nivel
        } else {
          difficultySelect.value = localStorage.getItem("lastDifficulty") || "intermedio";
        }
      });

      localStorage.setItem("lastDifficulty", difficultySelect.value);
    });

    document.getElementById("restartBtn").addEventListener("click", restartBtnHandler);

    document.addEventListener("DOMContentLoaded", () => {
      loadCurrentPhase();
    });
