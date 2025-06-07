const allProcedures = [
      // 1. Insertar Nuevo Cliente
      {
        name: "Insertar Nuevo Cliente",
        create_procedure: {
          enunciado: "Crea un procedimiento llamado `insertar_cliente` que inserte un nuevo cliente.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Crear procedimiento", correct: "CREATE PROCEDURE insertar_cliente(nombre VARCHAR(100), email VARCHAR(100))" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Insertar registro", correct: "INSERT INTO clientes (nombre, email) VALUES (nombre, email);" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE PROCEDURE insertar_cliente(nombre VARCHAR(100), email VARCHAR(100))",
            "BEGIN",
            "INSERT INTO clientes (nombre, email) VALUES (nombre, email);",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta el procedimiento con ('Carlos', 'carlos@example.com')",
          estructura: [
            { hint: "Llamar procedimiento", correct: "CALL insertar_cliente('Carlos', 'carlos@example.com');" }
          ],
          fragments: ["CALL insertar_cliente('Carlos', 'carlos@example.com');"],
          consoleOutput: "Query OK, 1 row affected (0.01 sec)"
        },
        delete_procedure: {
          enunciado: "Elimina el procedimiento `insertar_cliente`.",
          estructura: [
            { hint: "Borrar procedimiento", correct: "DROP PROCEDURE IF EXISTS insertar_cliente;" }
          ],
          fragments: ["DROP PROCEDURE IF EXISTS insertar_cliente;"]
        }
      },

      // 2. Actualizar Salario de Empleado
      {
        name: "Actualizar Salario de Empleado",
        create_procedure: {
          enunciado: "Crea un procedimiento que actualice el salario de un empleado.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir procedimiento", correct: "CREATE PROCEDURE actualizar_salario(id INT, nuevo_salario DECIMAL(10,2))" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Actualizar registro", correct: "UPDATE empleados SET salario = nuevo_salario WHERE id = id;" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE PROCEDURE actualizar_salario(id INT, nuevo_salario DECIMAL(10,2))",
            "BEGIN",
            "UPDATE empleados SET salario = nuevo_salario WHERE id = id;",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta el procedimiento para empleado ID = 1 y salario = 2500.00",
          estructura: [
            { hint: "Ejecutar procedimiento", correct: "CALL actualizar_salario(1, 2500.00);" }
          ],
          fragments: ["CALL actualizar_salario(1, 2500.00);"],
          consoleOutput: "Query OK, 1 row affected (0.01 sec)"
        },
        delete_procedure: {
          enunciado: "Elimina el procedimiento `actualizar_salario`.",
          estructura: [
            { hint: "Borrar procedimiento", correct: "DROP PROCEDURE IF EXISTS actualizar_salario;" }
          ],
          fragments: ["DROP PROCEDURE IF EXISTS actualizar_salario;"]
        }
      },

      // 3. Contar Usuarios por Rol
      {
        name: "Contar Usuarios por Rol",
        create_procedure: {
          enunciado: "Crea un procedimiento que cuente los usuarios por rol.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir procedimiento", correct: "CREATE PROCEDURE contar_usuarios_por_rol(rol VARCHAR(50), OUT total INT)" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Contar usuarios", correct: "SELECT COUNT(*) INTO total FROM usuarios WHERE rol = rol;" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE PROCEDURE contar_usuarios_por_rol(rol VARCHAR(50), OUT total INT)",
            "BEGIN",
            "SELECT COUNT(*) INTO total FROM usuarios WHERE rol = rol;",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta el procedimiento para rol 'admin'.",
          estructura: [
            { hint: "Declarar variable", correct: "SET @total = 0;" },
            { hint: "Llamar procedimiento", correct: "CALL contar_usuarios_por_rol('admin', @total);" },
            { hint: "Mostrar resultado", correct: "SELECT @total;" }
          ],
          fragments: ["SET @total = 0;", "CALL contar_usuarios_por_rol('admin', @total);", "SELECT @total;"],
          consoleOutput: "+--------+\n| @total |\n+--------+\n|     12 |\n+--------+"
        },
        delete_procedure: {
          enunciado: "Elimina el procedimiento `contar_usuarios_por_rol`.",
          estructura: [
            { hint: "Borrar procedimiento", correct: "DROP PROCEDURE IF EXISTS contar_usuarios_por_rol;" }
          ],
          fragments: ["DROP PROCEDURE IF EXISTS contar_usuarios_por_rol;"]
        }
      },

      // 4. Validar y Crear Usuario
      {
        name: "Validar y Crear Usuario",
        create_procedure: {
          enunciado: "Crea un procedimiento que valide y cree un usuario si el email es válido.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir procedimiento", correct: "CREATE PROCEDURE crear_usuario_si_valido(nombre VARCHAR(100), email VARCHAR(100))" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Condición REGEXP", correct: "IF email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$' THEN" },
            { hint: "Insertar usuario", correct: "INSERT INTO usuarios (nombre, email) VALUES (nombre, email);" },
            { hint: "Fin condición", correct: "END IF;" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE PROCEDURE crear_usuario_si_valido(nombre VARCHAR(100), email VARCHAR(100))",
            "BEGIN",
            "IF email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$' THEN",
            "INSERT INTO usuarios (nombre, email) VALUES (nombre, email);",
            "END IF;",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Llama al procedimiento con email válido e inválido.",
          estructura: [
            { hint: "Email válido", correct: "CALL crear_usuario_si_valido('Ana', 'ana@example.com');" },
            { hint: "Email inválido", correct: "CALL crear_usuario_si_valido('Roberto', 'invalidoemail');"}
          ],
          fragments: ["CALL crear_usuario_si_valido('Ana', 'ana@example.com');", "CALL crear_usuario_si_valido('Roberto', 'invalidoemail');"],
          consoleOutput: "Query OK, 1 row affected (0.01 sec)\nQuery OK, 0 rows affected (0.01 sec)"
        },
        delete_procedure: {
          enunciado: "Elimina el procedimiento `crear_usuario_si_valido`.",
          estructura: [
            { hint: "Borrar procedimiento", correct: "DROP PROCEDURE IF EXISTS crear_usuario_si_valido;" }
          ],
          fragments: ["DROP PROCEDURE IF EXISTS crear_usuario_si_valido;"]
        }
      },

      // 5. Borrar Usuarios Inactivos
      {
        name: "Borrar Usuarios Inactivos",
        create_procedure: {
          enunciado: "Crea un procedimiento que borre usuarios que no han iniciado sesión en 90 días.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir procedimiento", correct: "CREATE PROCEDURE borrar_usuarios_inactivos()" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Borrar registros", correct: "DELETE FROM usuarios WHERE ultima_conexion < DATE_SUB(NOW(), INTERVAL 90 DAY);" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE PROCEDURE borrar_usuarios_inactivos()",
            "BEGIN",
            "DELETE FROM usuarios WHERE ultima_conexion < DATE_SUB(NOW(), INTERVAL 90 DAY);",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta el procedimiento para borrar usuarios inactivos.",
          estructura: [
            { hint: "Llamar procedimiento", correct: "CALL borrar_usuarios_inactivos();" }
          ],
          fragments: ["CALL borrar_usuarios_inactivos();"],
          consoleOutput: "Query OK, 3 rows affected (0.01 sec)"
        },
        delete_procedure: {
          enunciado: "Elimina el procedimiento `borrar_usuarios_inactivos`.",
          estructura: [
            { hint: "Borrar procedimiento", correct: "DROP PROCEDURE IF EXISTS borrar_usuarios_inactivos;" }
          ],
          fragments: ["DROP PROCEDURE IF EXISTS borrar_usuarios_inactivos;"]
        }
      }
    ];

    let currentProcIndex = 0;
    let currentPhase = "create_procedure";
    let score = 0;

    const phaseText = document.getElementById("phaseText");
    const procNameText = document.getElementById("procNameText");
    const enunciadoDiv = document.getElementById("enunciado");
    const targetsDiv = document.getElementById("targets");
    const fragmentsDiv = document.getElementById("fragments");
    const timerSpan = document.getElementById("timer");
    const scoreSpan = document.getElementById("score");
    const difficultySelect = document.getElementById("difficulty");

    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");

    let audioInitialized = false;

    document.addEventListener("click", () => {
      if (!audioInitialized) {
        correctSound.play().then(() => correctSound.pause());
        wrongSound.play().then(() => wrongSound.pause());
        audioInitialized = true;
      }
    }, { once: true });

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
      const proc = allProcedures[currentProcIndex];
      let data;

      if (currentPhase === "create_procedure") {
        data = proc.create_procedure;
        phaseText.textContent = "Crear Procedimiento";
      } else if (currentPhase === "execute") {
        data = proc.execute;
        phaseText.textContent = "Ejecutar Procedimiento";
      } else if (currentPhase === "delete_procedure") {
        data = proc.delete_procedure;
        phaseText.textContent = "Eliminar Procedimiento";
      }

      procNameText.textContent = proc.name;
      enunciadoDiv.textContent = data.enunciado;
      fragmentsDiv.innerHTML = "";
      targetsDiv.innerHTML = "";

      data.estructura.forEach((linea) => {
        const drop = document.createElement("div");
        drop.className = "drop-target border-2 border-dashed p-2 rounded code-line border-gray-500";
        drop.dataset.hint = linea.hint;
        drop.ondragover = e => e.preventDefault();
        drop.ondrop = e => {
          const dragged = e.dataTransfer.getData("text");
          if (dragged === linea.correct) {
            drop.textContent = dragged;
            drop.classList.add("bg-green-900");
            correctSound.play();
            drop.ondrop = null;
            [...fragmentsDiv.children].forEach(el => {
              if (el.textContent === dragged) el.remove();
            });
            score += 10;
            scoreSpan.textContent = score;
            checkCompletion(data);
          } else {
            drop.classList.add("bg-red-100");
            setTimeout(() => drop.classList.remove("bg-red-100"), 1000);
            wrongSound.play().catch(() => {});
          }
        };
        targetsDiv.appendChild(drop);
      });

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
        correctSound.play().catch(() => {});

        let resultMessage = '';
        let consoleOutput = '';

        if (currentPhase === "create_procedure") {
          resultMessage = "✅ Procedimiento creado correctamente.";
          consoleOutput = "Query OK, 0 rows affected (0.01 sec)";
        } else if (currentPhase === "execute") {
          resultMessage = "✅ Procedimiento ejecutado.";
          consoleOutput = data.consoleOutput || "No hay salida definida.";
        } else if (currentPhase === "delete_procedure") {
          resultMessage = "🗑️ Procedimiento eliminado.";
          consoleOutput = "Query OK, 0 rows affected (0.01 sec)";
        }

        Swal.fire({
          title: '✅ Fase completada',
          html: `<strong>${resultMessage}</strong><br/><pre class="bg-gray-800 text-green-400 p-3 rounded mt-2">${consoleOutput}</pre>`,
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then(() => nextPhase());
      }
    }

    function nextPhase() {
      const keys = Object.keys(allProcedures[currentProcIndex]);
      const currentIndex = keys.indexOf(currentPhase);

      if (currentIndex < keys.length - 1) {
        currentPhase = keys[currentIndex + 1];
      } else {
        if (currentProcIndex < allProcedures.length - 1) {
          currentProcIndex++;
          currentPhase = "create_procedure";
          Swal.fire({
            title: '🎉 ¡Procedimiento completado!',
            text: 'Pasando a la siguiente...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: '🏆 ¡Todos los procedimientos completados!',
            text: 'Has terminado todos los ejercicios.',
            icon: 'success',
            confirmButtonText: 'Volver a empezar'
          }).then(() => {
            currentProcIndex = 0;
            currentPhase = "create_procedure";
            score = 0;
            scoreSpan.textContent = 0;
            loadCurrentPhase();
          });
        }
      }

      loadCurrentPhase();
    }

    function restartBtnHandler() {
      currentProcIndex = 0;
      currentPhase = "create_procedure";
      score = 0;
      scoreSpan.textContent = 0;
      loadCurrentPhase();
    }

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
          loadCurrentPhase();
        } else {
          difficultySelect.value = localStorage.getItem("lastDifficulty") || "intermedio";
        }
      });

      localStorage.setItem("lastDifficulty", difficultySelect.value);
    });

    document.getElementById("restartBtn").addEventListener("click", restartBtnHandler);

    document.addEventListener("DOMContentLoaded", () => {
      const lastLevel = localStorage.getItem("lastDifficulty") || "intermedio";
      difficultySelect.value = lastLevel;
      loadCurrentPhase();
    });
