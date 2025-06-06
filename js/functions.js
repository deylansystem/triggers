const allFunctions = [
      // 1. Sumar Dos Números
      {
        name: "Sumar Dos Números",
        create_function: {
          enunciado: "Crea una función llamada `sumar` que retorne la suma de dos enteros.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir función", correct: "CREATE FUNCTION sumar(x INT, y INT)" },
            { hint: "Tipo de retorno", correct: "RETURNS INT" },
            { hint: "Determinismo", correct: "DETERMINISTIC" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Devolver resultado", correct: "RETURN x + y;" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE FUNCTION sumar(x INT, y INT)",
            "RETURNS INT",
            "DETERMINISTIC",
            "BEGIN",
            "RETURN x + y;",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta la función creada con valores 5 y 3.",
          estructura: [
            { hint: "Comenzar consulta", correct: "SELECT" },
            { hint: "Nombre de la función", correct: "sumar(5, 3)" },
            { hint: "Finalizar", correct: ";" }
          ],
          fragments: ["SELECT", "sumar(5, 3)", ";"],
          consoleOutput: `
+--------------+
| sumar(5, 3) |
+--------------+
|            8 |
+--------------+
`
        },
        delete_function: {
          enunciado: "Elimina la función creada.",
          estructura: [
            { hint: "Borrar función", correct: "DROP FUNCTION IF EXISTS sumar;" }
          ],
          fragments: ["DROP FUNCTION IF EXISTS sumar;"]
        }
      },

      // 2. Nombre Completo
      {
        name: "Nombre Completo",
        create_function: {
          enunciado: "Crea una función llamada `nombre_completo` que devuelva el nombre completo concatenado.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir función", correct: "CREATE FUNCTION nombre_completo(nombre VARCHAR(50), apellido VARCHAR(50))" },
            { hint: "Tipo de retorno", correct: "RETURNS VARCHAR(100)" },
            { hint: "Determinismo", correct: "DETERMINISTIC" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Devolver resultado", correct: "RETURN CONCAT(nombre, ' ', apellido);" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE FUNCTION nombre_completo(nombre VARCHAR(50), apellido VARCHAR(50))",
            "RETURNS VARCHAR(100)",
            "DETERMINISTIC",
            "BEGIN",
            "RETURN CONCAT(nombre, ' ', apellido);",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Llama a la función con ('Carlos', 'Pérez').",
          estructura: [
            { hint: "Comenzar consulta", correct: "SELECT" },
            { hint: "Nombre de la función", correct: "nombre_completo('Carlos', 'Pérez')" },
            { hint: "Finalizar", correct: ";" }
          ],
          fragments: ["SELECT", "nombre_completo('Carlos', 'Pérez')", ";"],
          consoleOutput: `
+------------------------------+
| nombre_completo('Carlos','Pérez') |
+------------------------------+
| Carlos Pérez                 |
+------------------------------+
`
        },
        delete_function: {
          enunciado: "Elimina la función creada.",
          estructura: [
            { hint: "Borrar función", correct: "DROP FUNCTION IF EXISTS nombre_completo;" }
          ],
          fragments: ["DROP FUNCTION IF EXISTS nombre_completo;"]
        }
      },

      // 3. Promedio Edad por Raza
      {
        name: "Promedio Edad por Raza",
        create_function: {
          enunciado: "Crea una función que reciba una raza y devuelva la edad promedio.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir función", correct: "CREATE FUNCTION promedio_edad_por_raza(raza VARCHAR(30))" },
            { hint: "Tipo de retorno", correct: "RETURNS FLOAT" },
            { hint: "Determinismo", correct: "DETERMINISTIC" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Declarar variable", correct: "DECLARE edad_promedio FLOAT;" },
            { hint: "Consulta", correct: "SELECT AVG(m.edad) INTO edad_promedio FROM mascotas m WHERE m.raza = raza;" },
            { hint: "Devolver resultado", correct: "RETURN edad_promedio;" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE FUNCTION promedio_edad_por_raza(raza VARCHAR(30))",
            "RETURNS FLOAT",
            "DETERMINISTIC",
            "BEGIN",
            "DECLARE edad_promedio FLOAT;",
            "SELECT AVG(m.edad) INTO edad_promedio FROM mascotas m WHERE m.raza = raza;",
            "RETURN edad_promedio;",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta la función con raza 'Labrador'.",
          estructura: [
            { hint: "Consulta", correct: "SELECT" },
            { hint: "Función", correct: "promedio_edad_por_raza('Labrador')" },
            { hint: "Finalizar", correct: ";" }
          ],
          fragments: ["SELECT", "promedio_edad_por_raza('Labrador')", ";"],
          consoleOutput: `
+------------------------------+
| promedio_edad_por_raza('Labrador') |
+------------------------------+
|                           5.4 |
+------------------------------+
`
        },
        delete_function: {
          enunciado: "Elimina la función `promedio_edad_por_raza`.",
          estructura: [
            { hint: "Borrar función", correct: "DROP FUNCTION IF EXISTS promedio_edad_por_raza;" }
          ],
          fragments: ["DROP FUNCTION IF EXISTS promedio_edad_por_raza;"]
        }
      },

      // 4. Validar Formato Email
      {
        name: "Validar Formato Email",
        create_function: {
          enunciado: "Crea una función que valide si un email tiene formato válido.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir función", correct: "CREATE FUNCTION validar_email(email VARCHAR(100))" },
            { hint: "Tipo de retorno", correct: "RETURNS BOOLEAN" },
            { hint: "Determinismo", correct: "DETERMINISTIC" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Condición REGEXP", correct: "RETURN email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$';" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE FUNCTION validar_email(email VARCHAR(100))",
            "RETURNS BOOLEAN",
            "DETERMINISTIC",
            "BEGIN",
            "RETURN email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$';",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta la función con emails válidos e inválidos.",
          estructura: [
            { hint: "Email válido", correct: "SELECT validar_email('carlos@example.com');" },
            { hint: "Email inválido", correct: "SELECT validar_email('invalidoemail');"}
          ],
          fragments: ["SELECT", "validar_email('carlos@example.com');", "SELECT", "validar_email('invalidoemail');"],
          consoleOutput: `
+------------------------------+
| validar_email('carlos@example.com') |
+------------------------------+
|                            1   |
+------------------------------+

+------------------------------+
| validar_email('invalidoemail') |
+------------------------------+
|                            0   |
+------------------------------+
`
        },
        delete_function: {
          enunciado: "Elimina la función de validación de emails.",
          estructura: [
            { hint: "Borrar función", correct: "DROP FUNCTION IF EXISTS validar_email;" }
          ],
          fragments: ["DROP FUNCTION IF EXISTS validar_email;"]
        }
      },

      // 5. Contar Visitas por Mascota
      {
        name: "Contar Visitas por Mascota",
        create_function: {
          enunciado: "Crea una función que cuente las visitas de una mascota.",
          estructura: [
            { hint: "Delimitador", correct: "DELIMITER $$" },
            { hint: "Definir función", correct: "CREATE FUNCTION contar_visitas(mascota_id INT)" },
            { hint: "Tipo de retorno", correct: "RETURNS INT" },
            { hint: "Determinismo", correct: "DETERMINISTIC" },
            { hint: "Inicio del bloque", correct: "BEGIN" },
            { hint: "Declarar variable", correct: "DECLARE total INT;" },
            { hint: "Consulta", correct: "SELECT COUNT(*) INTO total FROM visitas WHERE mascota_id = mascota_id;" },
            { hint: "Devolver resultado", correct: "RETURN total;" },
            { hint: "Fin del bloque", correct: "END $$" },
            { hint: "Restablecer delimitador", correct: "DELIMITER ;" }
          ],
          fragments: [
            "DELIMITER $$",
            "CREATE FUNCTION contar_visitas(mascota_id INT)",
            "RETURNS INT",
            "DETERMINISTIC",
            "BEGIN",
            "DECLARE total INT;",
            "SELECT COUNT(*) INTO total FROM visitas WHERE mascota_id = mascota_id;",
            "RETURN total;",
            "END $$",
            "DELIMITER ;"
          ]
        },
        execute: {
          enunciado: "Ejecuta la función para mascota ID = 1.",
          estructura: [
            { hint: "Ejecutar función", correct: "SELECT contar_visitas(1);" }
          ],
          fragments: ["SELECT contar_visitas(1);"],
          consoleOutput: `
+------------------+
| contar_visitas(1) |
+------------------+
|                4 |
+------------------+
`
        },
        delete_function: {
          enunciado: "Elimina la función `contar_visitas`.",
          estructura: [
            { hint: "Borrar función", correct: "DROP FUNCTION IF EXISTS contar_visitas;" }
          ],
          fragments: ["DROP FUNCTION IF EXISTS contar_visitas;"]
        }
      }
    ];

    let currentFunctionIndex = 0;
    let currentPhase = "create_function";
    let score = 0;

    const phaseText = document.getElementById("phaseText");
    const functionNameText = document.getElementById("functionNameText");
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
      const func = allFunctions[currentFunctionIndex];
      let data;

      if (currentPhase === "create_function") {
        data = func.create_function;
        phaseText.textContent = "Crear Función";
      } else if (currentPhase === "execute") {
        data = func.execute;
        phaseText.textContent = "Ejecutar Función";
      } else if (currentPhase === "delete_function") {
        data = func.delete_function;
        phaseText.textContent = "Eliminar Función";
      }

      functionNameText.textContent = func.name;
      enunciadoDiv.textContent = data.enunciado;
      fragmentsDiv.innerHTML = "";
      targetsDiv.innerHTML = "";

      // Zonas objetivo
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

        let resultMessage = '';
        let consoleOutput = '';

        if (currentPhase === "create_function") {
          resultMessage = "✅ Función creada correctamente.";
          consoleOutput = "Query OK, 0 rows affected (0.01 sec)";
        } else if (currentPhase === "execute") {
          resultMessage = "✅ Consulta ejecutada.";
          consoleOutput = data.consoleOutput || "No hay salida definida.";
        } else if (currentPhase === "delete_function") {
          resultMessage = "🗑️ Función eliminada.";
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
      const keys = Object.keys(allFunctions[currentFunctionIndex]);
      const currentIndex = keys.indexOf(currentPhase);

      if (currentIndex < keys.length - 1) {
        currentPhase = keys[currentIndex + 1];
      } else {
        if (currentFunctionIndex < allFunctions.length - 1) {
          currentFunctionIndex++;
          currentPhase = "create_function";
          Swal.fire({
            title: '🎉 ¡Función completada!',
            text: 'Pasando a la siguiente...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: '🏆 ¡Todas las funciones completadas!',
            text: 'Has terminado todos los ejercicios.',
            icon: 'success',
            confirmButtonText: 'Volver a empezar'
          }).then(() => {
            currentFunctionIndex = 0;
            currentPhase = "create_function";
            score = 0;
            scoreSpan.textContent = 0;
            loadCurrentPhase();
          });
        }
      }

      loadCurrentPhase();
    }

    function restartBtnHandler() {
      currentFunctionIndex = 0;
      currentPhase = "create_function";
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
